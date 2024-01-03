const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(price) => "goods"
 * addColumn(count) => "goods"
 *
 */

const info = {
  revision: 11,
  name: "addedTablesForGood",
  created: "2023-11-17T16:29:27.057Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "goods",
      "price",
      { type: Sequelize.FLOAT, field: "price" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "goods",
      "count",
      { type: Sequelize.INTEGER, field: "count" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["goods", "price", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["goods", "count", { transaction }],
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
