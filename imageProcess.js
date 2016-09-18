module.exports = Jimp;

var Jimp = require("jimp");

// open a file called "lenna.png"
console.log(process.argv[2]);
Jimp.read( process.argv[2], function (err, image) {
    if (err) throw err;
    var numGreenPixels = 0;
    var numBrownPixels = 0;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        // x, y is the position of this pixel on the image
        // idx is the position start position of this rgba tuple in the bitmap Buffer
        // this is the image

        var red   = this.bitmap.data[ idx + 0 ];
        var green = this.bitmap.data[ idx + 1 ];
        var blue  = this.bitmap.data[ idx + 2 ];
        var alpha = this.bitmap.data[ idx + 3 ];
        console.log(red + ", " + green + ", " + blue + ", " + alpha);
        if(red < 60 && green < 60 && blue < 60){
            // if the pixel is black
        }
        else if(green > 1.5*red && green > 1.5*blue){
            numGreenPixels++;
        }
        else {
            numBrownPixels++;
        }
        // rgba values run from 0 - 255
        // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
    });
    console.log('Percentage: ' + numBrownPixels/(numGreenPixels+numBrownPixels)*100 + "%");
});
