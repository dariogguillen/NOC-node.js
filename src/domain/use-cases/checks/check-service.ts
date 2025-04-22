import {
  LogEntity,
  LogEntityOptions,
  LogLevel,
} from "../../entities/log.entity";
import { LogRepository } from "../../respository/log.repository";

interface CheckServiceUserCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUserCase {
  // dependency injection
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  /**
   * Validate if a url is available
   *
   * @param url - url to be validated
   * @returns true if the url is available
   *
   */
  public async execute(url: string): Promise<boolean> {
    const options: LogEntityOptions = {
      level: LogLevel.low,
      message: "",
      origin: this.constructor.name,
    };
    try {
      const req = await fetch(url);

      if (!req.ok) throw new Error(`Error on check servie ${url}`);
      const log = new LogEntity({ ...options, message: `${url} working` });
      this.logRepository.saveLog(log);
      this.successCallback();

      return true;
    } catch (error) {
      const log = new LogEntity({
        ...options,
        level: LogLevel.high,
        message: `${url} not working: ${error}`,
      });
      this.logRepository.saveLog(log);
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
