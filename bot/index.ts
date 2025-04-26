import "reflect-metadata";
import { config } from "dotenv";
import { DiscordBot } from "@bot/DiscordBot";
import { Database } from "@core/database/Database";
import { Logger } from "@core/utils/Logger";

config();

(async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    Logger.error("MONGO_URI não definido no .env");
    process.exit(1);
  }

  const database = new Database(mongoUri);
  await database.connect();

  const bot = new DiscordBot();
  await bot.init();
  bot.start();
})();
