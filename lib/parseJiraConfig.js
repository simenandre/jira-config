const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const parseJiraConfig = async () => {
    if (!fs.existsSync(path.resolve(homedir, ".jira-config.json"))) {
        console.error(
            chalk.bgRed.bold(
              "Jira Config is missing. Setup by running: jira-config setup"
            )
        );
        process.exit();
    }

    const jiraConfig = JSON.parse(
        await fs.readFileSync(path.resolve(homedir, ".jira-config.json"))
    );

    const currentConfig = JSON.parse(
      await fs.readFileSync(path.resolve(homedir, ".jira-cl.json"))
    );

    if (!jiraConfig) {
        console.error(
          chalk.blue.bgRed.bold(
              "Jira Config is missing. Setup by running: jira-config setup"
          )
        );
        process.exit();
    }

    const returnConfig = {};
    
    Object.keys(jiraConfig).map(conf => {
      if (jiraConfig[conf].host) {
        returnConfig[conf] = jiraConfig[conf];
      } else {
        returnConfig[conf] = {
          host: jiraConfig[conf]
        }
      }
    });

    return returnConfig;
}
module.exports = parseJiraConfig;
