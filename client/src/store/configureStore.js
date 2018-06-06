import rootReducer from "../reducers/index";
import {applyMiddleware, compose, createStore} from "redux";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

// Enable Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant())),
    );
}