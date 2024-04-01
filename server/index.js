const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//routers
const usersRouter = require("./routes/users");
const petsRouter = require("./routes/pets");

app.use("/auth", usersRouter);
app.use("/pets", petsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});