const express = require("express");
// const http = require("http");
// const mongodb = require("mongodb"); // 몽고 디비
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

require("dotenv/config");

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//DataBase
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const dbname = process.env.DB_NAME;
const url = `mongodb+srv://${username}:${password}@mulief.nlp2o.mongodb.net/${dbname}?retryWrites=true&w=majority`;

//Import Routes
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/user.route");
const uploadsRoute = require("./routes/upload");
const searchRoute = require("./routes/search");
const downloadRoute = require("./routes/download");
//Middlewares
// auth 인증 등 해당 요청이 올 때 마다 사용자 인증 등 미들웨어를 사용하면 매우 유용
// 라우팅 할 때도 사용
app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/upload", uploadsRoute);
app.use("/search", searchRoute);
app.use("/download", downloadRoute);
// app.use("/posts", (req, res) => {
//   res.send("we are on posts!");
//   console.log("This is a middleware running");
// });
//--------------------------------------------------------//

//Routes
app.get("/", (req, res) => {
  res.send("we are on home!");
});

//DataBase connect
mongoose.connect(url, () => {
  console.log("connected to DB!");
});

// mongoose
//   .connect(url)
//   .then(console.log("mongo connected"))
//   .catch((err) => console.log(err));

// MongoClient.connect(url)
//   .then((client) => {
//     console.log("mongo connected");
//     // console.log(client);
//   })
//   .then(
//     //Listen
//     app.listen(3000, () => {
//       console.log("server port 3000 success");
//     })
//   )
//   .catch((err) => console.log(err));

//Listen
app.listen(3000);
