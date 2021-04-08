import { log } from "../functions/logger";
import { userID } from "../statics/regex";
import { parseConfig } from "../functions/parse";
const config = parseConfig();
export async function checks() {
  // Exit function to make it easier to exit out when something goes wrong
  const exit = (code: number) => {
    process.exit(code);
  };
  // Check if the owner_ids field has anything if not exit
  if (!config.basic.owner_ids.length) {
    log("The owner field has no ID's", {
      type: "error",
    });
    exit(9);
  }
  // Loops though all the owners and checks if they match the userID regex if not exit
  for (const owner of config.basic.owner_ids) {
    if (!userID.test(owner)) {
      log(
        "Owner ID does not seem to be a proper ID. Please enter a valid user ID",
        {
          type: "error",
        }
      );
      exit(9);
    }
  }
  // Check if the owner_ids field has anything if not exit
  if (!config.basic.prefixes.length) {
    log("The prefix field has no ID's", {
      type: "error",
    });
    exit(9);
  }

  return null;
}
