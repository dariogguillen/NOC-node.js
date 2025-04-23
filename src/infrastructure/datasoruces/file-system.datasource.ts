import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";

export const logs = {
  path: "logs/",
  low: { filename: "logs-low.log", path: "logs/logs-low.log" },
  medium: { filename: "logs-medium.log", path: "logs/logs-medium.log" },
  high: { filename: "logs-high.log", path: "logs/logs-high.log" },
};

export class FileSystemDataSource implements LogDatasource {
  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles: () => void = (): void => {
    if (!fs.existsSync(logs.path)) {
      fs.mkdirSync(logs.path);
    }
    [logs.low.path, logs.medium.path, logs.high.path].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "");
      }
    });
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;

    if (log.level === LogLevel.low) {
      return fs.appendFileSync(logs.low.path, logAsJson);
    } else if (log.level === LogLevel.medium) {
      return fs.appendFileSync(logs.medium.path, logAsJson);
    } else {
      return fs.appendFileSync(logs.high.path, logAsJson);
    }
  }

  private getLogsFromFile: (path: string) => LogEntity[] = (
    path: string,
  ): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const log = content.split("\n").map(LogEntity.fromJson);

    return log;
  };
  async getLog(level: LogLevel): Promise<LogEntity[]> {
    switch (level) {
      case LogLevel.low:
        return this.getLogsFromFile(logs.low.path);
      case LogLevel.medium:
        return this.getLogsFromFile(logs.medium.path);
      case LogLevel.high:
        return this.getLogsFromFile(logs.high.path);

      default:
        throw new Error(`${level} level not found`);
    }
  }
}
