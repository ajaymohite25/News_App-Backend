import { createStore, combineReducers } from "redux";
import authReducer from "./Reducers/authReducer";

const Allreducers = combineReducers({ auth: authReducer });

const store = createStore(Allreducers);

export default store;
