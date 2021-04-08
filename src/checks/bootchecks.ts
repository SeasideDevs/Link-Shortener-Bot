import { log } from "../functions/logger";
import { parseConfig } from "../functions/parse";
const config = parseConfig();
export async function checks() {
  // Exit function to make it easier to exit out when something goes wrong
  const exit = (code: number) => {
    process.exit(code);
  };
  // Check if the owner_ids field has anything if not exit
  if (!config.owner_ids.size) {
    log("The owner field has no ID's", {
      type: "error",
    });
    process.exit(9);
  }
  return null;
}
