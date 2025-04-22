import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/respository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLog(level: LogLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLog(level);
  }
}
