import { combineReducers } from "redux";
import { homeReducer } from "./homeReducer";
import { listItemReducer } from "./listItemReducer";

export default combineReducers({
    homeReducer,
    listItemReducer,
})