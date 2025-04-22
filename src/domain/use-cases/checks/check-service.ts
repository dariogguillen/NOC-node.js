import { LogEntity, LogLevel } from "../../entities/log.entity";
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
    try {
      const req = await fetch(url);

      if (!req.ok) throw new Error(`Error on check servie ${url}`);
      const log = new LogEntity(LogLevel.low, `${url} working`);
      this.logRepository.saveLog(log);
      this.successCallback();

      return true;
    } catch (error) {
      const log = new LogEntity(LogLevel.high, `${url} not working: ${error}`);
      this.logRepository.saveLog(log);
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
