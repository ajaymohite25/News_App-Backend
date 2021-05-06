import mongoose from "mongoose";

const userShemaobj = {
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  refreshtoken: { type: String, unique: true, required: true },
  postedLand: [{ type: mongoose.Schema.Types.ObjectId, ref: "land" }],
};
const landShemaobj = {
  name: { type: String, unique: true, required: true },
  area: { type: String, required: [true, "area not provided"] },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  imgurl: String,
};

const userSchema = new mongoose.Schema(userShemaobj);
const landSchema = new mongoose.Schema(landShemaobj);

const userModel = mongoose.model("customer", userSchema);
const landModel = mongoose.model("land", landSchema);

export { userModel, landModel };
