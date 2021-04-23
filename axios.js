const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://server-backend-news.herokuapp.com",
});

exports.axiosInstance = axiosInstance;
