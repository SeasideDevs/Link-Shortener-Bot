import { parse } from "@iarna/toml";
import { readFileSync } from "fs";

export function parseConfig() {
  return parse(
    readFileSync("../config.toml", {
      encoding: "utf-8",
    })
  );
}
