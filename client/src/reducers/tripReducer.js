import {LOAD_TRIP_SUCCESSFUL} from "../actions/tripActions";

export default function tripReducer(state={}, action) {
    switch (action.type) {

        case LOAD_TRIP_SUCCESSFUL:
            return Object.assign({}, action.trip);

        default:
            return state;
    }
}