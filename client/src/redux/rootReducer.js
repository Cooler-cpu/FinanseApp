import { combineReducers } from "redux";
import { dataReducer } from "./balanseReducer";

export const rootReducer = combineReducers( {
    data: dataReducer,
})