import React from "react";
import "./cssFiles/newCard.css";

function HomeCard(props) {
  return (
    <div
      className="myHomeCard"
      style={{ height: `${props.landDetail.imgurl ? "30rem" : "15rem"}` }}
    >
      {props.landDetail.imgurl ? (
        <img className="myHomeCardImg" src={props.landDetail.imgurl} alt="" />
      ) : null}
      <div className="myHomeCardItems">
        <p className="myHomeItem mylandCardItemName">
          Name of Land:{props.landDetail.name}
        </p>
        <p className="myHomeNameItem mylandCardItemName">
          Area : {props.landDetail.area}
        </p>
        <p className=" mylandCardItemName">City : {props.landDetail.city}</p>
        <p className=" mylandCardItemName">State : {props.landDetail.state}</p>
        <p className=" mylandCardItemName">
          Country : {props.landDetail.country}
        </p>
      </div>
    </div>
  );
}

export default HomeCard;
