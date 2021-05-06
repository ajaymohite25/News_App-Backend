import React, { useState, useEffect } from "react";
import axios from "../axios";
import HomeCard from "./homeCard";
import "./cssFiles/home.css";
import Spinner from "./homescreenSpinner";

function Home() {
  const [isloaded, setLoaded] = useState(false);
  const [Lands, setLands] = useState([]);

  useEffect(() => {
    axios({ url: "/alllands", method: "get" })
      .then((data) => {
        setLands(data.data.lands);
        setLoaded(true);
      })
      .catch((err) => {
        setLoaded(true);
        window.history.pushState({}, "", "/404");
      });
  }, []);

  return (
    <>
      {isloaded ? (
        <div className="home">
          <h3 className="homeTitle">All Lands</h3>
          <div className="homeCardContainer">
            {Lands.length ? (
              Lands.map((doc, i) => {
                return <HomeCard key={doc._id} landDetail={doc} />;
              })
            ) : (
              <h1>No Lands to watch</h1>
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Home;
