// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");


app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(router);
app.use(errorHandler);


// app.listen(port,() => {
// console.log(`jalan ni ${port}`);
// })
module.exports = app;
