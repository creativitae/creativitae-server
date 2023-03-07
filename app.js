// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const upload = require('./helpers/multer')
const cloudinary = require('./helpers/cloudinary')
const { errorHandler } = require("./middlewares/errorHandler");
const port = 3000

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);


// app.listen(port,() => {
// console.log(`jalan ni ${port}`);
// })
module.exports = app;
