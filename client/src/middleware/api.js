const API_ROOT = `http://${window.location.host}/api`;

export function createWorkspace(key) {
    return fetch(`${API_ROOT}/workspace`, {method: 'POST'});
}

export function getTrip(key) {
    return fetch(`${API_ROOT}/workspace/${key}`);
}