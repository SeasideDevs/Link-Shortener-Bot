import fs from "fs";
import { parse } from "@iarna/toml";
import { checks } from "./core/bootchecks";
const config = parse(
  fs.readFileSync(__dirname + "/config.toml", { encoding: "utf-8" })
);
