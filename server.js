import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./controllers/routes/signIn.js";
import userLands from "./controllers/routes/userLands.js";
import postingLand from "./controllers/routes/postingLand.js";
import isAuth from "./model/isAuth.js";
import { landModel } from "./model/mongoDB/dbSchema.js";
import cors from "cors";
dotenv.config();

const app = express();

//INITIAL MIDDLEWEAR
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//DB SETUP
const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

//ROUTES

//SIGIN
app.use("/signin", authRoute);

//GET LANDS
app.use("/alllands", express.static("optimizLandImg"));
app.get("/alllands", (req, res) => {
  let temp = [];

  landModel.find({}, { __v: 0 }, (err, lands) => {
    lands.forEach((doc) => {
      temp.push(doc);
    });
    res.json({ lands: temp });
  });
});

// POSTING LAND
app.use("/user/post", postingLand);

//USER POSTED LANDS
app.use("/user/lands", isAuth, userLands);

//
app.get("/", (req, res) => {
  res.json("hi");
});

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: err.message });
});

const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log("SERVER STARTED");
});
