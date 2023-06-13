import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import auth from './auth/authReducers';

export default (history: any) => combineReducers({
    router: connectRouter(history),
    auth
})