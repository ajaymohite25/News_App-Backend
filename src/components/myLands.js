import React, { useState, useEffect } from "react";
import axios from "../axios";
import store from "../redux/store";
import MyLandCard from "./myLandCard";
import "./cssFiles/mylands.css";
import Spinner from "./homescreenSpinner";

function MyLand() {
  const [isLoaded, setLoaded] = useState(false);
  const [myLands, setMyLands] = useState([]);

  useEffect(() => {
    axios({ url: `/user/lands/${store.getState().auth.objId}`, method: "get" })
      .then((data) => {
        setMyLands(data.data.lands);
        setLoaded(true);
      })
      .catch((err) => {
        setLoaded(true);
        window.history.pushState({}, "", "/404");
      });
  }, []);

  function onDelete(landid) {
    const deletedLandArray = myLands.filter((elem) => {
      return elem._id !== landid;
    });

    setMyLands(deletedLandArray);
  }

  function onUpdateName(landid, updatedLand) {
    const updatedLands = myLands.map((elem) => {
      if (elem._id === landid) {
        elem = updatedLand;
      }
      return elem;
    });
    setMyLands(updatedLands);
  }

  return (
    <div>
      {isLoaded ? (
        <div className="mylands">
          {myLands.length ? (
            myLands.map((doc) => {
              return (
                <MyLandCard
                  key={doc._id}
                  landDetail={doc}
                  onDelete={onDelete}
                  onUpdateName={onUpdateName}
                />
              );
            })
          ) : (
            <h1>No poasted land!Please post</h1>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default MyLand;
