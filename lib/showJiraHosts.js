// const chalk = require("chalk");
const Table = require("cli-table3");
const parseJiraConfig = require("./parseJiraConfig");
const showJiraHosts = async () => {
  const jiraConfig = await parseJiraConfig();
  var table = new Table({
    head: ["Name", "Host", "Has Auth?"],
  });
  Object.keys(jiraConfig).map(conf => {
    if (conf !== '_defaults') {
        table.push([conf, jiraConfig[conf].host, jiraConfig[conf].auth ? true : false]);
    }
  });
  console.log(table.toString());
};
module.exports = showJiraHosts;
