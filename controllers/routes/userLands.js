import express from "express";
import { userModel, landModel } from "../../model/mongoDB/dbSchema.js";
import mongoose from "mongoose";

const router = express.Router();
router.use(express.static("userLandImgs"));
//GETIING POSTED LANDS

router.get("/:userid", (req, res, next) => {
  const userId = req.params.userid;

  userModel
    .findOne({ _id: userId })
    .populate("postedLand")
    .then((doc) => {
      if (doc) {
        doc.populate("postedLand");
        res.json({ lands: doc.postedLand });
      } else res.status(400).json("USER ID NOT VALID");
    })
    .catch((err) => {
      res.status(500);
      next(err);
    });
});

//UPDATING LAND NAME
router.patch("/updateland", (req, res, next) => {
  const updatedData = req.body; //{name:--,landid:--}
  // console.log(1);
  landModel
    .findOne({ _id: updatedData.landid })
    .select({ __v: 0 })
    .then((doc) => {
      doc.name = updatedData.name;
      doc.save((err) => {
        if (err) {
          if (err.code === 11000) res.status(200).json("11000");
          else next(err);
        } else {
          res.json(doc);
        }
      });
    })
    .catch((err) => {
      res.status(500);
      next(err);
    });
});

//DELETING LAND
router.delete("/delete/:landid", (req, res, next) => {
  const landid = req.params.landid;

  landModel
    .deleteOne({ _id: landid })
    .then(() => {
      res.status(200).json({ message: "DELETED" });
    })
    .catch((err) => {
      res.status(500);
      next(err);
    });
});

export default router;
