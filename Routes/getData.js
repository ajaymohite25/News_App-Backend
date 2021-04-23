const express = require("express");
const router = express.Router();
const isAuth = require("./isAuth").isAuth;
const axios = require("../axios").axiosInstance;

router.get("/", isAuth, (req, res) => {
  let response = { name: [], author: [], title: [] };

  axios({ url: "/", method: "get" })
    .then((data) => {
      let fetchedData = data.data.articles;
      fetchedData.forEach((doc) => {
        //NO DUPLICATES
        doc.source.name ? response.name.push(doc.source.name) : null;
        doc.author ? response.author.push(doc.author) : null;
        doc.title ? response.title.push(doc.title) : null;
      });

      res.json(response);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

exports.getData = router;
