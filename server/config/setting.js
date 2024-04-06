const fs = require("fs");
const main = require("./main.json");

process.setting = {
  db: {
    username: "postgres",
    password: "postgres",
    database: "swan",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  jwt: "123",
  ...main,
  title: `SACRED task v${main.version}`,
  version: main.version,
};

try {
  const data = fs.readFileSync("./setting.json");
  if (data) {
    const loadData = JSON.parse(data);
    process.setting = {
      ...process.setting,
      ...loadData,
      db: { ...process.setting?.db, ...loadData?.db },
    };
  }
} catch (err) {
  console.error("SETTING", err);
}
