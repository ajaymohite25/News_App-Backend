function saveArticle(article) {
  let saveArticles = this.savedArticles;
  saveArticles.push(article);
  saveArticles.sort((a, b) => {
    return b.publishedAt - a.publishedAt;
  });
  this.save();
}

exports.saveArticle = saveArticle;
