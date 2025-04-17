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

  saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getLog(level: LogLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}
