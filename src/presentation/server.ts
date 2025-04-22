import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasoruces/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);

export class Server {
  public static run(): void {
    console.log("Server starting...");

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        fileSystemLogRepository,
        (): void => console.info("Success callback"),
        (error: string): void => console.error(`Error callback ${error}`),
      ).execute("https://www.google.com");
    });
  }
}
