function loginAuthAction() {
  let response = { type: "login", payload: {} };

  if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
    response.payload.name = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile()
      .getName();
    response.payload.jwt = localStorage.getItem("jwt");
    response.payload.objId = localStorage.getItem("objId");
    response.payload.refreshtoken = localStorage.getItem("refreshtoken");
    response.payload.expiresin = localStorage.getItem("expiresin");
  } else {
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    localStorage.removeItem("objId");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("expiresin"); // if gapi is logout
    response.payload.name = "";
    response.payload.jwt = "";
    response.payload.objId = "";
    response.payload.refreshtoken = "";
    response.payload.expiresin = "";
  }
  return response;
}

function logoutAuthAction() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("name");
  localStorage.removeItem("objId");
  localStorage.removeItem("refreshtoken");
  localStorage.removeItem("expiresin");
  return { type: "logout" };
}

export { loginAuthAction, logoutAuthAction };
