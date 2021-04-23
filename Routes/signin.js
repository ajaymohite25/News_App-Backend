const express = require("express");
const router = express.Router();
const mongoDb = require("../DataBase/mongoDB").model;
const jwt = require("jsonwebtoken");
const md5 = require("md5");

router.post("/", (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;

  const jwttoken = jwt.sign({ email: email }, process.env.JWT_SECREAT, {
    expiresIn: "1h",
  });

  mongoDb
    .findOne({ email: email })
    .then((data) => {
      if (!data) {
        const refreshtoken = md5(email);
        mongoDb
          .create({
            email: email,
            name: name,
            jwtrefreshtoken: refreshtoken,
          })
          .then((data) => {
            res.json({
              name: data.name,
              refreshtoken: data.jwtrefreshtoken,
              jwt: jwttoken,
              objId: data._id,
              expiresin: Date.now() + 58 * 60 * 1000, //min*sec*ms=ms
            });
          })
          .catch((err) => {
            next({ message: "Creation Of user Failed" });
          });
      } else {
        res.json({
          name: data.name,
          refreshtoken: data.jwtrefreshtoken,
          jwt: jwttoken,
          objId: data._id,
          expiresin: Date.now() + 58 * 60 * 1000,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/refreshtoken", (req, res) => {
  let refreshToken = req.headers.authorization;

  if (refreshToken) {
    mongoDb
      .findOne({ jwtrefreshtoken: refreshToken })
      .then((data) => {
        if (!data) {
          res.json("refresh token not valid");
        } else {
          const jwttoken = jwt.sign(
            { email: data.email },
            process.env.JWT_SECREAT,
            {
              expiresIn: "1h",
            }
          );

          res.json({ jwt: jwttoken, expiresin: Date.now() + 58 * 60 * 1000 }); //58 *
        }
      })
      .catch((err) => {
        next({ message: "refresh token not valid!Please Sign in Again" });
      });
  } else {
    res.json("refresh token not present");
  }
});

exports.signIn = router;
