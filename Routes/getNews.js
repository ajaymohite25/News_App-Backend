const express = require("express");
const router = express.Router();
const axios = require("../axios").axiosInstance;
const isAuth = require("./isAuth").isAuth;

function fetchData(data, req, res, loadNumber) {
  let response = [];
  data.forEach((doc, i) => {
    if (
      doc.source.name &&
      doc.author &&
      doc.title &&
      doc.description &&
      doc.url &&
      doc.urlToImage &&
      doc.publishedAt &&
      doc.content &&
      i < loadNumber * 5
    ) {
      // doc.content = doc.content.slice(0, 150);
      response.push(doc);
    }
  });

  response.sort((a, b) => {
    return b.publishedAt - a.publishedAt;
  });
  res.json(response);
}
//

function fetchFilteredArticles(req, res, next, filter, data) {
  let response = [];
  let checkPrevios = [];
  const filterArray = Object.values(filter);
  //filterarray: [0]-->names,[1]-->authors,[2]-->titles
  data.forEach((doc) => {
    if (
      doc.source.name &&
      doc.author &&
      doc.title &&
      doc.description &&
      doc.url &&
      doc.urlToImage &&
      doc.publishedAt &&
      doc.content
    ) {
      if (filterArray[0].includes(doc.source.name)) {
        response.push(doc);
        checkPrevios.push(doc.source.name);
      }
      if (
        filterArray[1].includes(doc.author) &&
        !checkPrevios.includes(doc.source.name)
      ) {
        response.push(doc);
        checkPrevios.push(doc.source.name);
      }
      if (
        filterArray[2].includes(doc.title) &&
        !checkPrevios.includes(doc.source.name)
      ) {
        response.push(doc);
        checkPrevios.push(doc.source.name);
      }
    }
  });

  res.json(response);
}
//
function fetchSearchedArticles(req, res, next, searchQuery, data) {
  let response = [];

  data.forEach((doc) => {
    if (
      doc.source.name &&
      doc.author &&
      doc.title &&
      doc.description &&
      doc.url &&
      doc.urlToImage &&
      doc.publishedAt &&
      doc.content
    ) {
      if (doc.source.name.toLowerCase() === searchQuery) {
        response.push(doc);
      } else if (doc.author.toLowerCase() === searchQuery) {
        response.push(doc);
      } else if (doc.title.toLowerCase() === searchQuery) {
        response.push(doc);
      }
    }
  });

  res.json(response);
}
// /news
router.post("/", isAuth, (req, res) => {
  const loadNumber = req.body.loadnumber;

  axios({ url: "/", method: "GET" })
    .then((data) => {
      fetchData(data.data.articles, req, res, loadNumber);
    })
    .catch((err) => {
      res.status(500).json("enable to fetch the news");
    });
});
//

router.post("/filter", isAuth, (req, res, next) => {
  const filter = req.body;
  axios({ url: "/", method: "GET" })
    .then((data) => {
      fetchFilteredArticles(req, res, next, filter, data.data.articles);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//
router.get("/searchquery", (req, res, next) => {
  const searchQuery = req.query.searchquery.toLowerCase();

  axios({ url: "/", method: "GET" })
    .then((data) => {
      fetchSearchedArticles(req, res, next, searchQuery, data.data.articles);
    })
    .catch((err) => {
      res.status(501).json(err.message);
    });
});

exports.getNews = router;
