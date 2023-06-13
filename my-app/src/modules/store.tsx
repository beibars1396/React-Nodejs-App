import { routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import createRootReducer from './reducers';
import initializers from "./initializers";
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from '@redux-devtools/extension';

const history = createBrowserHistory();
let store: any;

export function configureStore(preloadedState?: any){
    const middlewares = [
        thunkMiddleware,
        routerMiddleware(history)
    ].filter(Boolean);

    store = createStore(
        createRootReducer(history),
        preloadedState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    for(const initializer of initializers) {
        initializer(store);
    }

    return store;
}

export function getHistory() {
    return history;
}

export default function getStore() {
    return store;
}