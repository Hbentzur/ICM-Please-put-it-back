var camera;
var thresh = 100;

var w = 1024,
    h = 768;

var size = 50;

var Noman;

// Flowers x and y
var x = 10,
    y = 10;


let flowerFrames = [];
let currentFlowerFrame = 0;


function preload() {
    myFont = loadFont('Font/BIG JOHN.otf');


    // Flowers
    /*Flowersanim =
        loadAnimation("Graphic/Flower/Flowers00.png",
            "Graphic/Flower/Flowers01.png",
            "Graphic/Flower/Flowers02.png",
            "Graphic/Flower/Flowers03.png",
            "Graphic/Flower/Flowers04.png",
            "Graphic/Flower/Flowers05.png");*/
    flowerFrames[0] = loadImage("Graphic/Flower/Flowers00.png");
    flowerFrames[1] = loadImage("Graphic/Flower/Flowers01.png");
    flowerFrames[2] = loadImage("Graphic/Flower/Flowers02.png");

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

    // Flowers
    //Flowers = new flowers(x, y);

}

function draw() {

    background(255);

    // Noman attraction Point
    Noman.attractionPoint(3, Wayout.Doorx, Wayout.Doory);

    // Treshold New
    camera.loadPixels();
    for (var y = 0; y < h; y += 10) {
        for (var x = 0; x < w; x += 10) {
            var off = ((y * w) + x) * 4;
            camera.pixels[off],
                camera.pixels[off + 1],
                camera.pixels[off + 2];

            // Flowers
            if (camera.pixels[off + 1] < thresh) {
                fill(0);
                rect(x, y, 10, 10);
                //image(flowerFrames[currentFlowerFrame], x, y);
                //Flowers.show();
            }

            // Noman walking on white pix
            if ((Noman.position.x >= x) && (Noman.position.x <= x + 10)
               && (Noman.position.y >= y) && (Noman.position.y <= y + 10)) {
                if (camera.pixels[off + 1] < thresh) {
                    Noman.maxSpeed = 0;
                } else {
                    Noman.maxSpeed = 3;
                }
            }

        }


    }

    //Door
    Wayout.show();

    currentFlowerFrame++;
    if (currentFlowerFrame > flowerFrames.length - 1) {
        currentFlowerFrame = 0;
    }
    
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


class flowers {
    constructor(Fx, Fy) {
        this.Flowersx = Fx;
        this.Flowersy = Fy;
    }

    show() {
        textFont(myFont);
        fill(0, 0, 255);
        textSize(5);
        text("Flowers", this.Flowersx, this.Flowersy);
    }
}
