const initialState = {
  name: "",
  jwt: "",
  objId: "",
  refreshtoken: "",
  expiresin: "",
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "login":
      return {
        name: action.payload.name,
        jwt: action.payload.jwt,
        objId: action.payload.objId,
        refreshtoken: action.payload.refreshtoken,
        expiresin: action.payload.expiresin,
      };
    case "logout":
      return {
        name: "",
        jwt: "",
        objId: "",
        refreshtoken: "",
        expiresin: "",
      };
    default:
      return state;
  }
}

export default AuthReducer;
