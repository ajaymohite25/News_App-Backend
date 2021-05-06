import express from "express";
import { userModel } from "../../model/mongoDB/dbSchema.js";
import jwt from "jsonwebtoken";
import md5 from "md5";

const router = express.Router();
const expiresIn = 58 * 60 * 1000; //58 MINs

router.post("/", (req, res, next) => {
  const user = req.body;
  const jwttoken = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECREAT,
    { expiresIn: "1h" }
  );
  // console.log(user);
  userModel
    .findOne({ email: user.email })
    .then((doc) => {
      if (!doc) {
        user.refreshtoken = md5(user.email);
        userModel
          .create(user)
          .then((doc) => {
            res.json({
              name: doc.name,
              objId: doc._id,
              refreshtoken: doc.refreshtoken,
              jwt: jwttoken,
              expiresin: Date.now() + expiresIn,
            });
          })
          .catch((err) => {
            next(err.message);
          });
      } else {
        res.json({
          name: doc.name,
          objId: doc._id,
          refreshtoken: doc.refreshtoken,
          jwt: jwttoken,
          expiresin: Date.now() + expiresIn,
        });
      }
    })
    .catch((err) => {
      // console.log(err);
      next(err.message);
    });
});

router.get("/refreshtoken", (req, res) => {
  const refreshtoken = req.headers.refreshtoken;
  if (refreshtoken) {
    userModel.findOne({ refreshtoken: refreshtoken }).then((doc) => {
      if (doc) {
        const jwttoken = jwt.sign(
          {
            email: doc.email,
          },
          process.env.JWT_SECREAT,
          { expiresIn: "1h" }
        );
        res.json({ jwt: jwttoken, expiresin: Date.now() + expiresIn });
      } else {
        res.status(400).json("tokeninvalid");
      }
    });
  } else res.status(400).json("tokennotpresent");
});

export default router;
