import mongoose from "mongoose";
import { Logger } from "../utils/Logger";

export class Database {
  private uri: string;
  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri, {
        dbName: "questy-db",
      });

      Logger.success("Connected to database");
    } catch (err) {
      Logger.error("Failed to connect to database");
      Logger.error(err as any);
    }
  }
}
