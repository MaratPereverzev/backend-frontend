const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(password) => "users"
 * addColumn(login) => "users"
 *
 */

const info = {
  revision: 4,
  name: "addedLoginAndPasswordFieldsToUser",
  created: "2023-10-28T11:58:48.889Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "users",
      "password",
      { type: Sequelize.TEXT, field: "password" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "login",
      { type: Sequelize.TEXT, field: "login" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["users", "password", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["users", "login", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
