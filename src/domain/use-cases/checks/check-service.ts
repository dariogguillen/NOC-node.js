interface CheckServiceUserCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUserCase {
  // dependency injection
  constructor(
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

      this.successCallback();

      return true;
    } catch (error) {
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
