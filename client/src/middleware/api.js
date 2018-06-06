const API_ROOT = 'http://localhost:3000/api/';

export function getTrip(key) {
    return fetch(API_ROOT + 'workspace/' + key);
}