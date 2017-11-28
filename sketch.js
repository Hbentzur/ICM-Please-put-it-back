var camera;
var thresh = 70;

var w = 1024,
    h = 768;

var size = 50;

var Noman;

function preload() {
    myFont = loadFont('Font/BIG JOHN.otf');

}

function setup() {

    // camera
    camera = createCapture(VIDEO);
    createCanvas(w, h);
    camera.size(w, h);
    camera.hide();

    // Noman walking sequence animation
    Noman =
        createSprite(width / 2, height / 2, 60, 60);
    Noman.addAnimation("Graphic/Walk/Walk_1.png", "Graphic/Walk/Walk_2.png", "Graphic/Walk/Walk_3.png");
    Noman.rotateToDirection = true;
    Noman.maxSpeed = 3;


    // Door
    Wayout = new wayout();

}

function draw() {

    // Noman attraction Point
    Noman.attractionPoint(3, Wayout.Doorx, Wayout.Doory);


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

                // Noman walking on white pix
                if (x == floor(Noman.position.x)) {
                    if (outputValue == 0) {
                        Noman.maxSpeed = 0;
                    } else {
                        Noman.maxSpeed = 3;

                    }
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

    console.log(pixels);

    image(camera, 0, 0, w, h);

    //Door
    Wayout.show();

    // Animation
    drawSprites();


}


class wayout {
    constructor() {
        this.Doorx = random(30, w);
        this.Doory = random(30, h);
    }

    show() {
        textFont(myFont);
        fill(222, 198, 42);
        textSize(30);
        text("Exit", this.Doorx, this.Doory);
    }

}

class Flowers {
    constructor() {
        this.Flowerx = random(30, w);
        this.Flowery = random(30, h);
    }

}
