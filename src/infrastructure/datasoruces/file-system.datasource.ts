import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDatasource {
  private readonly logPath: string = "logs/";
  private readonly lowLogsPath: string = "logs/logs-low.log";
  private readonly mediumLogsPath: string = "logs/logs-medium.log";
  private readonly highLogsPath: string = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles: () => void = (): void => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    [this.lowLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, "");
        }
      },
    );
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;

    if (log.level === LogLevel.low) {
      return fs.appendFileSync(this.lowLogsPath, logAsJson);
    } else if (log.level === LogLevel.medium) {
      return fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      return fs.appendFileSync(this.highLogsPath, logAsJson);
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
        return this.getLogsFromFile(this.lowLogsPath);
      case LogLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogLevel.high:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error(`${level} level not found`);
    }
  }
}
