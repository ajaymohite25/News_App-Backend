const express = require("express");
const router = express.Router();
const isAuth = require("./isAuth").isAuth;
const mongoDB = require("../DataBase/mongoDB").model;

// /savenews
router.post("/", isAuth, (req, res, next) => {
  const newsArticle = req.body.article;
  const user = req.body.id;
  // console.log(user, newsArticle);
  mongoDB
    .findOne({ _id: user })
    .then((doc) => {
      if (doc) {
        doc.saveArticle(newsArticle);
        res.status(201).json("Saved");
      } else {
        res.status(400).json("Not saved, please try again");
      }
    })
    .catch((err) => {
      res.status(500).json("Not saved, please try again");
    });
});
// /savenews
router.post("/get", isAuth, (req, res, next) => {
  const user = req.body.id;
  mongoDB
    .findOne({ _id: user })
    .then((data) => {
      if (!data) {
        res.status(400).json("try again");
      } else {
        res.json(data.savedArticles);
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/getidentifiers", isAuth, (req, res, next) => {
  const user = req.body.id;
  // console.log(req.body);
  mongoDB
    .findOne({ _id: user })
    .then((data) => {
      if (!data) {
        res.status(400).json("try again");
      } else {
        let response = [];
        data.savedArticles.forEach((doc) => {
          response.push(doc.source.name);
        });

        res.json(response);
      }
    })
    .catch((err) => {
      next(err);
    });
});
//
router.post("/savefilter", isAuth, (req, res, next) => {
  const user = req.body.id;
  let response = { name: [], author: [], title: [] };
  // console.log(req.body);
  mongoDB
    .findOne({ _id: user })
    .then((data) => {
      if (!data) {
        res.status(400).json("try again");
      } else {
        data.savedArticles.forEach((doc) => {
          response.name.push(doc.source.name);
          response.author.push(doc.author);
          response.title.push(doc.title);
        });

        res.json(response);
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/delete", isAuth, (req, res, next) => {
  const user = req.body.id;
  const articleId = req.body.articleId;

  mongoDB
    .findOne({ _id: user })
    .then((doc) => {
      let temp = doc.savedArticles;

      temp = temp.filter((elem) => {
        return elem.source.name !== articleId;
      });

      doc.savedArticles = temp;

      doc.save((err) => {
        if (err) {
          next(err);
        } else {
          // console.log(doc.savedArticles);
          res.json(temp);
        }
      });
    })
    .catch((err) => {
      res.json(err.message);
    });
});

exports.saveNews = router;
