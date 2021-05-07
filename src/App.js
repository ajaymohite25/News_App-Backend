import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home";
import Signin from "./components/signin";
import PostLand from "./components/postLand";
import MyLand from "./components/myLands";
import FullScreenSpinner from "./components/homescreenSpinner";
import Page404 from "./components/page404";
import NavBar from "./components/navBar";
import Store from "./redux/store";
import axios from "./axios";
import {
  loginAuthAction,
  logoutAuthAction,
} from "./redux/ActionCreator/authAction";

function App() {
  const [isLoaded, setLoaded] = useState(false);

  function onAuthChange() {
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const email = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
        .getEmail();
      const name = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
        .getName();

      axios({
        url: "/signin",
        method: "POST",
        data: { name: name, email: email },
      })
        .then((data) => {
          const name = data.data.name;
          const jwt = data.data.jwt;
          const refreshtoken = data.data.refreshtoken;
          const objId = data.data.objId;
          const expiresin = data.data.expiresin;

          window.localStorage.setItem("name", name);
          window.localStorage.setItem("jwt", jwt);
          window.localStorage.setItem("objId", objId);
          window.localStorage.setItem("refreshtoken", refreshtoken);
          window.localStorage.setItem("expiresin", expiresin);

          Store.dispatch(loginAuthAction());

          if (window.location.pathname === "/signin") {
            window.location.replace("/");
          } else {
            window.location.replace(window.location.pathname);
          }
        })
        .catch((err) => {
          window.history.pushState({}, "", "/404"); //try rep 404
        });
    } else {
      Store.dispatch(logoutAuthAction());
      window.location.replace("/");
    }
  }
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "569698617269-uo5u212q0gp66ljj7md6k7dmiete6u21.apps.googleusercontent.com",
          scope: "email profile",
        })
        .then((result) => {
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
          Store.dispatch(loginAuthAction());
          setLoaded(true);
        })
        .catch((err) => {
          setLoaded(true);
          window.history.pushState({}, "", "/404");
          // window.location.replace("/404");
        });
    });
  }, []);

  return (
    <div className="App">
      {isLoaded ? (
        <Router>
          <NavBar />
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/postland" exact component={PostLand} />
          <Route path="/lands" exact component={MyLand} />
          <Route path="/404" exact component={Page404} />
        </Router>
      ) : (
        <FullScreenSpinner />
      )}
    </div>
  );
}

export default App;
