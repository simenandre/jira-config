const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const parseJiraConfig = require('./parseJiraConfig');
const changeJiraCLIConfig = async (host) => {
  const currentConfig = JSON.parse(
    await fs.readFileSync(path.resolve(homedir, ".jira-cl.json"))
  );

  const jiraConfig = await parseJiraConfig();
  const config = jiraConfig[host];

  if (!config) {
    return console.error('Config not found');
  }

  currentConfig.host = config.host;
  
  const auth = {
    username: currentConfig.username,
    password: currentConfig.password
  };

  if (!jiraConfig["_defaults"]) {
    const auth = {
      ...jiraConfig["_defaults"].auth
    };
  }

  if (config.auth) {
    const auth = config.auth;
  }

  currentConfig.username = auth.username;
  currentConfig.password = auth.password;

  await fs.writeFileSync(
    path.resolve(homedir, ".jira-cl.json"),
    JSON.stringify(currentConfig, null, 2)
  );
  console.log(`\tChanged to ${currentConfig.host} 🎉`);
};

module.exports = changeJiraCLIConfig;