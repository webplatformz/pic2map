const API_ROOT = `http://${window.location.host}/api`;

export function getTrip(key) {
    return fetch(`${API_ROOT}/workspace/${key}`);
}