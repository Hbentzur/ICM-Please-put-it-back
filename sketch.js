var capture;
var w = 1280,
    h = 960;

var thresh = 10;

let walker;

function setup() {
    capture = createCapture(VIDEO);
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();
  	walker = new Walker();
    
createSprite(400, 200, 50, 50);

    
    
}


function draw() {
  
  	let newxtwalkerX = walker.x + walker.speed;
  	let newxtwalkerY = walker.y + walker.speed;
    
      drawSprites();

    
  
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
              	
              	
              
              	// here we check whether pixel should be white (255) 
                // or black (0)
                var redValue = pixels[i]; // 120
                var outputValue = 0;
              	// if red value is higher than threshhold, pixel should
                // be white:
                if (redValue >= thresholdAmount) {
                    outputValue = 255;
                    total++;
                }
              
              
              	if(x == newxtwalkerX && y == newxtwalkerY){
                  if (outputValue == 0){
                		walker.speed *= 0;
                  }else{
                      walker.speed = 1;
                  }
                  
                }
              	
              	
              
              
                // now that we have decided whether white or black
                // we updated all color channels of this pixel
                pixels[i++] = outputValue; // set red i == 0, then increases by one
                pixels[i++] = outputValue; // set green
                pixels[i++] = outputValue; // set blue
                i++; // skip alpha                
            }
        }

        var n = w * h;
        var ratio = total / n;
        // select('#percentWhite').elt.innerText = int(100 * ratio);
    }
    capture.updatePixels();
  	
  	image(capture, 0, 0, 1280, 960);
  	
  	walker.update();
  	walker.display();

    
}



class Walker{
  constructor(){
    this.x = 10;
    this.y = 10;
    this.speed = 1;
  }
  update(){
    this.x += this.speed;
    this.y += this.speed;
    
  }
  display(){
    fill(255,0,0);
   	ellipse(this.x, this.y, 10, 10); 
  }
  
}
