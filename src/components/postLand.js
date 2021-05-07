import React, { useRef, useState } from "react";
import "./cssFiles/postland.css";
import axios from "../axios";
import store from "../redux/store";
import Spinner from "react-spinkit";

function PostLand() {
  const formPostref = useRef();
  const [message, setMessage] = useState("");
  const [colour, setColour] = useState("green");
  const [onformSubmit, setSubmit] = useState(false);

  function onPost(e) {
    e.preventDefault();
    setSubmit(true);
    let formData = new FormData(formPostref.current);
    axios({
      url: `/user/post/${store.getState().auth.objId}`,
      method: "post",
      data: formData,
    })
      .then((data) => {
        if (data.status === 201) {
          setMessage("Successfully posted");
          setColour("green");
          setTimeout(() => {
            setMessage("");
          }, 3000);
          setSubmit(false);
        }
      })
      .catch((err) => {
        setColour("red");
        setMessage("All fields are required or name of land exist");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setSubmit(false);
      });
  }

  return (
    <form
      id="postLandform"
      ref={formPostref}
      onSubmit={onPost}
      className="landDataForm"
      name="postLandform"
    >
      <h3>Post your land</h3>
      <p style={{ color: `${colour}` }}>{message}</p>
      <div className="form-group ">
        <label className="inputformland" htmlFor="exampleInputland">
          Name of land
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputland"
          placeholder="Name of land"
          name="name"
        ></input>
        <label className="inputformland" htmlFor="exampleInputarea">
          Name of area
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputarea"
          placeholder="Name of area"
          name="area"
        ></input>
        <label className="inputformland" htmlFor="exampleInputcity">
          Name of city
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputcity"
          placeholder="Name of city"
          name="city"
        ></input>
        <label className="inputformland" htmlFor="exampleInputstate">
          Name of state
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputstate"
          placeholder="Name of state"
          name="state"
        ></input>
        <label className="inputformland" htmlFor="exampleInputcountry">
          Name of country
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputcountry"
          placeholder="Name of country"
          name="country"
        ></input>
        <label className="inputformland" htmlFor="exampleFormControlFile1">
          Upload img of Land:{" "}
        </label>
        <input
          type="file"
          className="form-control-file "
          id="exampleFormControlFile1"
          accept="image/*"
          name="landImg"
        />
      </div>
      {onformSubmit ? (
        <button type="submit" className="btn btn-primary submitButton">
          <span>
            <Spinner style={{ color: "black" }} />
          </span>
          <span>Submiting...</span>
        </button>
      ) : (
        <button type="submit" className="btn btn-primary submitButton">
          <span>Submit</span>
        </button>
      )}
    </form>
  );
}

export default PostLand;
