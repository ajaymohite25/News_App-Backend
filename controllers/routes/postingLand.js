import express from "express";
import { userModel, landModel } from "../../model/mongoDB/dbSchema.js";
import isAuth from "../../model/isAuth.js";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const __dirname = dirname.slice(0, dirname.indexOf("controllers") - 1);
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "userLandImgs");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "_" + file.fieldname + "." + file.mimetype.split("/")[1]
    );
  },
});

const opts = {
  storage: storage,
};

//
router.post(
  "/:userid",
  isAuth,
  multer(opts).single("landImg"),
  (req, res, next) => {
    const dbPost = {};
    const userid = req.params.userid;
    const reqstbody = req.body;

    dbPost.name = reqstbody.name;
    dbPost.area = reqstbody.area;
    dbPost.city = reqstbody.city;
    dbPost.state = reqstbody.state;
    dbPost.country = reqstbody.country;

    if (req.file) {
      sharp(
        fileURLToPath(`file:///${__dirname}/userLandImgs/${req.file.filename}`)
      )
        .resize(500, 400)
        .webp({ quality: 75 })
        .toFile(
          fileURLToPath(
            `file:///${__dirname}/optimizLandImg/${
              req.file.filename.split(".")[0]
            }.webp`
          )
        )
        .then(() => {
          fs.unlink(
            fileURLToPath(
              `file:///${__dirname}/userLandImgs/${req.file.filename}`
            ),
            (err) => {
              if (err) {
                next(err);
              }
            }
          );
        })
        .catch((er) => {
          next(er);
        });
      dbPost.imgurl = `${req.protocol}://${req.get("host")}/alllands/${
        req.file.filename.split(".")[0]
      }.webp`;
    } else {
      dbPost.imgurl = "";
    }

    landModel
      .create(dbPost)
      .then(async (landdoc) => {
        const user = await userModel.findOne({ _id: userid });
        user.postedLand.push(landdoc._id);
        user.save((err) => {
          if (err) {
            next(err);
          } else {
            res.status(201).json("success");
          }
        });
      })
      .catch((err) => {
        res.status(400).json("bad request");
      });
  }
);

export default router;
