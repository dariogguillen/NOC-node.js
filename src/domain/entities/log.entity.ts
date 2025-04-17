export enum LogLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogLevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }
}
