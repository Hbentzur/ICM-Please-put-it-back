var camera;
var thresh = 30;

var w = 1024,
    h = 768;

var Noman;

var cellsize = 30;

let flowerFrames = [];
let currentFlowerFrame = 0;


// New black pix
let flowerX = [];

// 2D arrey
let currentpic = [];
var currentpixcolor = 0;


function preload() {
    myFont = loadFont('Font/BIG JOHN.otf');


    // Flowers
    flowerFrames[0] = loadImage("Graphic/Flower/Flowers00.png");
    flowerFrames[1] = loadImage("Graphic/Flower/Flowers01.png");
    flowerFrames[2] = loadImage("Graphic/Flower/Flowers02.png");
    flowerFrames[3] = loadImage("Graphic/Flower/Flowers03.png");
    flowerFrames[4] = loadImage("Graphic/Flower/Flowers04.png");
    flowerFrames[5] = loadImage("Graphic/Flower/Flowers05.png");
    flowerFrames[6] = loadImage("Graphic/Flower/Flowers06.png");
    flowerFrames[7] = loadImage("Graphic/Flower/Flowers07.png");
    flowerFrames[8] = loadImage("Graphic/Flower/Flowers08.png");
    flowerFrames[9] = loadImage("Graphic/Flower/Flowers09.png");
    flowerFrames[10] = loadImage("Graphic/Flower/Flowers10.png");
    flowerFrames[11] = loadImage("Graphic/Flower/Flowers11.png");
    flowerFrames[12] = loadImage("Graphic/Flower/Flowers12.png");
    flowerFrames[13] = loadImage("Graphic/Flower/Flowers13.png");
    flowerFrames[14] = loadImage("Graphic/Flower/Flowers14.png");
    flowerFrames[15] = loadImage("Graphic/Flower/Flowers15.png");
    flowerFrames[16] = loadImage("Graphic/Flower/Flowers16.png");
    flowerFrames[17] = loadImage("Graphic/Flower/Flowers17.png");
    flowerFrames[18] = loadImage("Graphic/Flower/Flowers18.png");
    flowerFrames[19] = loadImage("Graphic/Flower/Flowers19.png");
    flowerFrames[20] = loadImage("Graphic/Flower/Flowers20.png");
    flowerFrames[21] = loadImage("Graphic/Flower/Flowers21.png");
    flowerFrames[22] = loadImage("Graphic/Flower/Flowers22.png");

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
    Flowers = new flowers();

    for (var i = 0; i < h; i += cellsize) {
        for (var j = 0; j < w; j += cellsize) {
            currentpic[i] = [];
            currentpic[i][j] = currentpixcolor;
        }
    }
}

function draw() {

    background(255);

    // Noman attraction Point
    Noman.attractionPoint(3, Wayout.Doorx, Wayout.Doory);

    // Treshold New
    camera.loadPixels();
    for (var y = 0; y < h; y += cellsize) {
        for (var x = 0; x < w; x += cellsize) {
            var off = ((y * w) + x) * 4;
            camera.pixels[off],
                camera.pixels[off + 1],
                camera.pixels[off + 2];

            // Flowers
            if (camera.pixels[off + 1] < thresh) {
                Flowers.Flowersx = x;
                Flowers.Flowersy = y;
                Flowers.show();

                // New black pix
                flowerX.push(x);

                if (flowerX.length > 5) {
                    flowerX.splice(5);
                }


                // 2D arrey
                for (var i = 0; i < h; i += cellsize) {
                    for (var j = 0; j < w; j += cellsize) {
                        if (camera.pixels[off + 1] < thresh) {
                            currentpixcolor = 1;
                        } else if (camera.pixels[off + 1] > thresh) {
                            currentpixcolor = 0;
                        }
                        currentpic[i] = currentpixcolor;
                        currentpic[j] = currentpixcolor;
                    }

                }


            }

            // Noman walking on white pix
            if ((Noman.position.x >= x) && (Noman.position.x <= x + 10) &&
                (Noman.position.y >= y) && (Noman.position.y <= y + 10)) {
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

    // Flowers
    Flowers.flowercount();

    //    console.log(currentpic.length);

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
    constructor(Sz) {
        this.Flowersx = this.Flowersx;
        this.Flowersy = this.Flowersy;
        this.Flowersize = Sz;
    }

    show() {
        imageMode(CENTER);
        image(flowerFrames[currentFlowerFrame], this.Flowersx, this.Flowersy, this.Flowersize, this.Flowersize);

    }

    flowercount() {
        // Flowers Arrey
        currentFlowerFrame++;
        if (currentFlowerFrame > flowerFrames.length - 1) {
            currentFlowerFrame = 0;
        }

    }

}
