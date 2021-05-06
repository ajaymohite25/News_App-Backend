import axios from "axios";
import store from "./redux/store";
import { loginAuthAction } from "./redux/ActionCreator/authAction";

const axiosInstance = axios.create({
  baseURL: "https://landedwqd.herokuapp.com",
}); //BACKEND API

axiosInstance.interceptors.request.use((req) => {
  const jwt = store.getState().auth.jwt;
  const refreshtoken = store.getState().auth.refreshtoken;
  const expiresin = store.getState().auth.expiresin;
  req.headers.authorization = `Bearer ${jwt}`;

  if (jwt && expiresin < Date.now()) {
    axios({
      url: "https://landedwqd.herokuapp.com/signin/refreshtoken", //BACKEND API
      method: "GET",
      headers: { refreshtoken: refreshtoken },
    })
      .then((data) => {
        const newJwt = data.data.jwt;
        const newExpiresin = data.data.expiresin;

        localStorage.jwt = newJwt;
        localStorage.expiresin = newExpiresin;
        store.dispatch(loginAuthAction());
        req.headers.authorization = `Bearer ${newJwt}`;

        return req;
      })
      .catch((err) => {
        //  window.location.replace("/404");
        window.history.pushState({}, "", "/404");
      });
  } else {
    return req;
  }
});
export default axiosInstance;
