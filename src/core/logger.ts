import chalk from "chalk";
type LoggerOptions = {
  type: "fatal" | "info" | "error" | "success" | "shard" | "importantinfo";
};
export function log(msg: string, data: LoggerOptions): any {
  if (!msg) {
    return new TypeError("No message provided.");
  }
  if (!data) {
    return new TypeError("No data provided.");
  }

  const loggers = [
    {
      name: "fatal",
      friendlyName: "Fatal Error",
      log: () => {
        console.log(chalk.bgRedBright("FATAL ERROR"), msg);
      },
    },
    {
      name: "info",
      friendlyName: "Information",
      log: () => {
        console.log(chalk.whiteBright("INFO"), msg);
      },
    },
    {
      name: "error",
      friendlyName: "Regular Error",
      log: () => {
        console.log(chalk.redBright("ERROR", msg));
      },
    },
    {
      name: "success",
      friendlyName: "Success",
      log: () => {
        console.log(chalk.greenBright("SUCCESS"), msg);
      },
    },
    {
      name: "shard",
      friendlyName: "Shard Info",
      log: () => {
        console.log(chalk.magentaBright("SHARD INFO"), msg);
      },
    },
    {
      name: "importantinfo",
      friendlyName: "Important Info",
      log: () => {
        console.log(chalk.bgBlueBright("IMPORTANT INFO"), msg);
      },
    },
  ];

  const validTypes = loggers.map((logger) => logger.name);
  const logData = validTypes.indexOf(data.type);
  loggers[logData].log()
  return null;
}