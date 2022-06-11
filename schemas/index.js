const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DB;

// const connect = () => {
//   mongoose.connect(DB, {}).catch((err) => console.log(err));
// };

const connect = () => {
  mongoose.connect(process.env.DB, {
    dbName: "6weeks_hw_miniproj",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).catch((err) => console.log(err));
};
mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});






module.exports = connect;
