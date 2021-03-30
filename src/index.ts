import fs from "fs";
// import { parse } from "@iarna/toml"
const config = fs.readFileSync("config.toml");
console.log(config);
// import { checks } from "./core/bootchecks";
