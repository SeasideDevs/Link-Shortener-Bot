import { readFileSync } from "fs";
import { parse } from "@iarna/toml";

export function parseConfig() {
  return parse(
    readFileSync(__dirname + "/../config.toml", {
      encoding: "utf-8",
    })
  );
}
