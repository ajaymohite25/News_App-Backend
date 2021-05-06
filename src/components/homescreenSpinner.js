import React from "react";
import Spinner from "react-spinkit";
function homescreenSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "95vw",
        height: "95vh",
      }}
    >
      <Spinner
        style={{ marginTop: "50vh" }}
        name="ball-scale-multiple"
        color="blue"
      />
    </div>
  );
}

export default homescreenSpinner;
