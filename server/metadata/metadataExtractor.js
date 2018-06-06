const exif = require('exif');
const Promise = require('bluebird');

function pickFields(exifData) {
    const lat = convertDMSToDD(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef);
    const lng = convertDMSToDD(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef);
    return {
        location: {
            lat, lng
        },
        timestamp: convertToUnixTs(exifData.exif.CreateDate)
    };
}

function convertDMSToDD(coordinatesArray, direction) {
    const [degrees, minutes, seconds] = coordinatesArray;
    let dd = degrees + minutes / 60 + seconds / (60 * 60);
    if (direction === 'S' || direction === 'W') {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}

function convertToUnixTs(dateString) {
    const [date, time] = dateString.split(' ');

    const dateParts = date.split(':');
    const timeParts = time.split(':');

    return new Date(`${dateParts.join('-')}T${timeParts.join(':')}`).getTime() / 1000;
}

/**
 * extracts coordinates in decimal format and timestamp in unix seconds from given jpg image buffer
 *
 * @param imageBuffer
 */
function extract(imageBuffer) {
    return Promise
        .fromCallback((cb) => new exif.ExifImage({image: imageBuffer}, cb))
        .then(pickFields);
}

module.exports = {
    extract
};