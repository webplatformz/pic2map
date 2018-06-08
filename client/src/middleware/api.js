export const API_ROOT = `http://${window.location.host}/api`;

export function createTrip() {
    return fetch(`${API_ROOT}/trips`, {method: 'POST'});
}

export function deleteTrip(tripId) {
    return fetch(`${API_ROOT}/trips/${tripId}`, {method: 'DELETE'});
}

export function getTrip(key) {
    return fetch(`${API_ROOT}/trips/${key}`);
}


export function postImages(tripId, body) {
    return fetch(`${API_ROOT}/trips/${tripId}/images`, {
        method: 'POST',
        body: body
    });
}

export function deleteImage(tripId, imageId) {
    return fetch(`${API_ROOT}/trips/${tripId}/images/${imageId}`, {method: 'DELETE'});
}