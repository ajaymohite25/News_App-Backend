import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditButton from "./editModal";
import axios from "../axios";
import "./cssFiles/myLandCard.css";

function MyLandCard(props) {
  const [message, setMessage] = useState("");

  function onEdit(name) {
    axios({
      url: "/user/lands/updateland",
      method: "PATCH",
      data: { name: name, landid: props.landDetail._id },
    })
      .then((data) => {
        if (data.data === "11000") {
          setMessage("Name already taken");
          setTimeout(() => {
            setMessage("");
          }, 3000);
          return;
        } else {
          props.onUpdateName(props.landDetail._id, data.data);
        }
      })
      .catch((err) => {
        setMessage("Something went wrong!Name not updated");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  }
  function onDelete() {
    axios({
      url: `/user/lands/delete/${props.landDetail._id}`,
      method: "DELETE",
    })
      .then((data) => {
        if (data.status === 200) {
          props.onDelete(props.landDetail._id);
        }
      })
      .catch((err) => {
        setMessage("Something went wrong!Name not updated");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  }

  return (
    <div
      className="mylandCard"
      style={{ height: `${props.landDetail.imgurl ? "32rem" : "18rem"}` }}
    >
      {props.landDetail.imgurl ? (
        <img className="mylandCardImg" src={props.landDetail.imgurl} alt="" />
      ) : null}

      <div className="mylandCardItems">
        <p style={{ color: "red", padding: "2px", margin: "2px" }}>{message}</p>
        <p className="mylandCardItem mylandCardItemName">
          <span className="mylandcardname">
            {" "}
            Name of Land:{props.landDetail.name}
          </span>
          <span>
            <EditButton name={onEdit} />
          </span>
        </p>
        <p className="mylandCardItem">Area : {props.landDetail.area}</p>
        <p className="mylandCardItem">City : {props.landDetail.city}</p>
        <p className="mylandCardItem">State : {props.landDetail.state}</p>
        <p className="mylandCardItem">Country : {props.landDetail.country}</p>
        <div className="myLandCardDelete">
          <Button
            className="myLandCardDeletebutton"
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyLandCard;
