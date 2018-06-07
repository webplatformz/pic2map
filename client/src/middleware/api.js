const API_ROOT = `http://${window.location.host}/api`;

export function createTrip() {
    return fetch(`${API_ROOT}/trips`, {method: 'POST'});
}

export function getTrip(key) {
    return fetch(`${API_ROOT}/trips/${key}`);
}