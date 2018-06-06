export const LOAD_TRIP_SUCCESSFUL = 'LOAD_TRIP_SUCCESSFUL';

export function loadTripSuccessful(trip) {
    return {type: LOAD_TRIP_SUCCESSFUL, trip};
}