import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import auth from './auth/authReducers';
import todolist from './todolist/todolistReducer';

export default (history: any) => combineReducers({
    router: connectRouter(history),
    auth,
    todolist
})