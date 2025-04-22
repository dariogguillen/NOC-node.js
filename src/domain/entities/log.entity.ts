export enum LogLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor({
    level,
    message,
    origin,
    createdAt = new Date(),
  }: LogEntityOptions) {
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson: (json: string) => LogEntity = (json: string): LogEntity => {
    const { level, message, createdAt, origin }: LogEntityOptions =
      JSON.parse(json);

    const log = new LogEntity({
      level,
      message,
      origin,
      createdAt: createdAt ? new Date(createdAt) : undefined,
    });

    return log;
  };
}
