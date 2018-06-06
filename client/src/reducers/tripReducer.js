import {LOAD_TRIP_SUCCESSFUL} from "../actions/tripActions";

const defaultState = {meta: {}, images: []};
export default function tripReducer(state = defaultState, action) {
    switch (action.type) {
        case LOAD_TRIP_SUCCESSFUL:
            return Object.assign({}, action.trip);

        default:
            return state;
    }
}