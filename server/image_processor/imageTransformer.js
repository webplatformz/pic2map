const sharp = require('sharp');

function generateThumb(imageBuffer) {
    function transform2Small(imageBuffer) {
        return sharp(imageBuffer)
            //.rotate()
            .resize(200)
            .toBuffer();
    }
    return transform2Small(imageBuffer);
}

module.exports = {
    generateThumb
};