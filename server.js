require("dotenv").config();
const express = require("express");
const axios = require("./axios").axiosInstance;
const signIn = require("./Routes/signin").signIn;
const mongoDB = require("./DataBase/mongoDB");
const cors = require("cors");
const app = express();
const getData = require("./Routes/getData").getData;
const getNews = require("./Routes/getNews").getNews;
const saveNewsArticle = require("./Routes/saveNews").saveNews;

//middlewear setup
app.use(cors());
app.use(express.json());

//GETTING TRENDING NEWS
app.get("/", (req, res, next) => {
  let response = [];
  axios({ url: "/", method: "GET" })
    .then((data) => {
      data.data.articles.forEach((doc, i) => {
        if (
          doc.source.name &&
          doc.author &&
          doc.title &&
          doc.description &&
          doc.url &&
          doc.urlToImage &&
          doc.publishedAt &&
          doc.content &&
          i < 6
        ) {
          response.push(doc);
        }
      });
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json([]);
    });
});

//Signin
app.use("/signin", signIn);

//getingIng filter options
app.use("/getdata", getData);

//getting All news limit to 10/page
app.use("/news", getNews);

//saveing news
app.use("/savenews", saveNewsArticle);

//global error handler
app.use((err, req, res, next) => {
  res.json(err.message);
});

//
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log("Server Started");
});
