const chalk = require("chalk");
const prompt = require("prompt");
const { exec } = require("child_process");
const { existsSync, mkdirSync, copyFileSync } = require("fs");
const { builtinModules } = require("module");

const success = (msg) => {
  if (!msg) {
    throw new TypeError("Missing parameter 'variable'");
  }
  console.log(chalk.greenBright("SUCCESS"), msg);
};

const warn = (msg) => {
  if (!msg) {
    throw new TypeError("Missing parameter 'variable'");
  }
  console.log(chalk.yellowBright("WARN"), msg);
};

const error = (msg) => {
  if (!msg) {
    throw new TypeError("Missing parameter 'variable'");
  }
  console.log(chalk.redBright("ERROR"), msg);
};

if (!existsSync("build")) {
  warn("No build folder found. Creating one now..");
  mkdirSync("build");
  success("Created build folder");
}

if (!existsSync("../build.config.toml")) {
  error(
    "The config.toml file already exists in the build folder! Do you want to update it?"
  );
  const question = "Yes or No? (y/n)";
  prompt.start();
  prompt.get(question, function (err, result) {
    if (err) {
      error("An error occured while attempting to run a prompt!");
    }
    const results = result[question];
    switch (results.toLowerCase()) {
      case "y" | "yes":
        copyFileSync("../src/config.toml", "../build/config.toml");
        success("Updated config file");
        break;
      case "n" | "no":
        warn("The file(s) were not updated; they may be outdated.");
        break;
      default:
        console.log(error("No input(s) provided. Exiting..."));
        process.exit(9);
        break;
    }
  });
}
