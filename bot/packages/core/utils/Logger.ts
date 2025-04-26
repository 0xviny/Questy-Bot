import "colors";

export class Logger {
  static info(message: string) {
    console.log("[INFO]".yellow, message);
  }

  static success(message: string) {
    console.log("[SUCCESS]".green, message);
  }

  static warn(message: string) {
    console.warn("[WARN]".cyan, message);
  }

  static error(message: string) {
    console.error("[ERROR]".red, message);
  }
}
