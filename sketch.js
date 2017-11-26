var camera;
var thresh = 30;

var w = 1024,
    h = 768;

var Noman;

function setup() {

    // camera
    camera = createCapture(VIDEO);
    createCanvas(w, h);
    camera.size(w, h);
    camera.hide();

    // No walking sequence
    Noman =
        createSprite(width / 2, height / 2, 60, 60);
    Noman.addAnimation("Graphic/Walk/Walk_1.png", "Graphic/Walk/Walk_2.png", "Graphic/Walk/Walk_3.png");
    Noman.rotateToDirection = true;
    Noman.maxSpeed = 3;

    walker = new No();

}

function draw() {

    walker.Walk();

    // No
    var newxtwalkerX = walker.Nox + walker.Nospeed;
    var newxtwalkerY = walker.Noy + walker.Nospeed;


    //B&W
    camera.loadPixels();
    if (camera.pixels.length > 0) {
        var pixels = camera.pixels;
        var thresholdAmount = thresh;
        thresholdAmount /= 100.0;
        thresholdAmount *= 255;

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


            pixels[i++] = outputValue; // R
            pixels[i++] = outputValue; // G
            pixels[i++] = outputValue; // B
            i++; // No alpha               
        }
    }

    var n = w * h;
    var ratio = total / n;
}

camera.updatePixels();

image(camera, 0, 0, 1024, 768);

// Animation
drawSprites();




}



class No {
    constractor() {
        this.Nox = 10;
        this.Noy = 10;
        this.Nospeed = 10;
    }

    Walk() {
//        if (mouseIsPressed) {
//            Noman.attractionPoint(3, mouseX, mouseY);
//        }
                this.Nox += this.Nospeed;
                this.Noy += this.Nospeed;
    }


}

class Door {
    constractor() {
        this.Doorx = (random(100, width));
        this.Doory = (random(100, height));
    }




}
