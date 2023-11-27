//Third party package imports
const dotenv = require("dotenv");
const mongoose = require("mongoose");

/*Loads environment variables. this needs to be configured before requiring app,
else env variables won't be available in app.js*/
dotenv.config();

//imports from project code
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connected succesfully.");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});
