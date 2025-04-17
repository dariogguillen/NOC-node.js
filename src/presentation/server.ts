import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static run(): void {
    console.log("Server starting...");

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        (): void => console.info("Success callback"),
        (error: string): void => console.error(`Error callback ${error}`),
      ).execute("https://www.google.com");
    });
  }
}
