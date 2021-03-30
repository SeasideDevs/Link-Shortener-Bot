import fs from "fs";
import { parse } from "@iarna/toml";
const config = parse(
  fs.readFileSync(__dirname + "/config.toml", {
    encoding: "utf-8",
  })
);
