require("dotenv").config();

const app = require("./app");
const { dbConnection } = require("./config/db");

const PORT = process.env.PORT || 5000;

dbConnection();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
