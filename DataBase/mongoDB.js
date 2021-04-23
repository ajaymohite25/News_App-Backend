const mongoose = require("mongoose");
const saveArticle = require("./saveArticleMethod").saveArticle;
let url = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@tinderclone.g5v0l.mongodb.net/tindercloneDB?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err.message, "DB error");
  });

const schema = {
  email: { type: String, required: [true, "Email not provided"] },
  name: { type: String, required: [true, "Name not provided"] },
  jwtrefreshtoken: { type: String, unique: true },
  savedArticles: Array,
};

const schemaInctance = new mongoose.Schema(schema);

schemaInctance.methods.saveArticle = saveArticle;

const Model = mongoose.model("user", schemaInctance);

exports.model = Model;
