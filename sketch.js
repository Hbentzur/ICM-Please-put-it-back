var capture;
var thresh = 10;

var w = 640,
    h = 480;


var Walk;

function setup() {
    // camera
    capture = createCapture(VIDEO);
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    // No walking sequence
    Walk =
        createSprite(width / 2, height / 2, 60, 60);
    Walk.addAnimation("Graphic/Walk/Walk_1.png", "Graphic/Walk/Walk_2.png", "Graphic/Walk/Walk_3.png");
    Walk.rotateToDirection = true;
    Walk.maxSpeed = 3;

    walker = new No();

}

function draw() {


    //B&W
  capture.loadPixels();
    if (capture.pixels.length > 0) { // don't forget this!
        var pixels = capture.pixels;
        var thresholdAmount = thresh;
        thresholdAmount /= 100.0; // this is the slider range
        thresholdAmount *= 255; // this is the maximum value
        var total = 0;
        var i = 0;
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var redValue = pixels[i];
                var outputValue = 0;
                if (redValue >= thresholdAmount) {
                    outputValue = 255;
                    total++;
                }
                pixels[i++] = outputValue; // set red
                pixels[i++] = outputValue; // set green
                pixels[i++] = outputValue; // set blue
                i++; // skip alpha                
            }
        }

        var n = w * h;
        var ratio = total / n;
        //select('#percentWhite').elt.innerText = int(100 * ratio);
    }
    capture.updatePixels();

    image(capture, 0, 0, 640, 480);
    
        drawSprites();

    // No
    walker.Walk();


}



class No {
    constractor() {
        this.Nox = 10;
        this.Noy = 10;
        this.Nospeed = 1;
    }

    Walk() {
        if (mouseIsPressed) {
            Walk.attractionPoint(10, mouseX, mouseY);
        }
    }


}
