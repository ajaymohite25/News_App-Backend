import React from "react";
import Button from "@material-ui/core/Button";
import "./cssFiles/signIn.css";
import googleicon from "./googleicon.svg";

function SignIn() {
  function signin() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  return (
    <div className="signin">
      <img src={googleicon} alt="" />
      <div>
        <Button onClick={signin} variant="contained" color="primary">
          Sign Up via Google
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
