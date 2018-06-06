import {combineReducers} from "redux";
import trip from './tripReducer'

const rootReducer = combineReducers({
    trip: trip
});

export default rootReducer;