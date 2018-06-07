const API_ROOT = `http://${window.location.host}/api`;

export function createTrip() {
    return fetch(`${API_ROOT}/trips`, {method: 'POST'});
}

export function deleteTrip(tripId) {
    return fetch(`${API_ROOT}/trips/${tripId}`, {method: 'DELETE'});
}

export function getTrip(key) {
    return fetch(`${API_ROOT}/trips/${key}`);
}