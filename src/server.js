import express from "express";
import bodyParser from "body-parser"; // query parameter
import viewEngine from "./config/viewEngine";
import initWebRouets from "./route/web";
import connectDB from "./config/connectDB"; // connect;
// import cors from "cors";

require("dotenv").config();

let app = express();
// app.use(cors({ credentials: true, origin: true }));
//config app

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));

viewEngine(app);
initWebRouets(app);

connectDB();

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Backend Nodejs is running on http://localhost:${port}`);
});
