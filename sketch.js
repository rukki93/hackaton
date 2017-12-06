var colorList = ['#b47eb3',
                 '#fdf5bf',
                 '#ffd5ff',
                 '#92d1c3',
                 '#8bb8a8']
var myImage;
var myBackground;
var microphone;
var drop = [];

function preload() {
   myImage = loadImage('./assets/myImage.png');
   myBackground = loadImage('./assets/myBackground.png');
   }

function setup() {
   angleMode(DEGREES);
   createCanvas (windowWidth,windowHeight);
   
   microphone = new p5.AudioIn();
   microphone.start();
   
   for (var k=0; k<200; k++) {
   drop[k] = new Drop();
   }
  
}

function draw() {
   
   background(color(colorList[0]));
   backgroundImage(myBackground);
   backgroundImage(myImage);
   
   if(width>height) {
      D=height;
   } else {
     D=width;
   }
   
   var volume = microphone.getLevel();
   console.log(volume);
   
   push();
   translate(windowWidth/2, windowHeight/2);
   fill(color(colorList[0]));
   ellipse(-118*D/730, 18*D/730, 8+volume*800, 20+volume*800);
   ellipse(18*D/730, 25*D/730, 9+volume*800, 25+volume*800);
   
   fill(color(colorList[1]));
   ellipse(-118*D/730, 18*D/730, 5+volume*200, 14+volume*200);
   ellipse(18*D/730, 25*D/730, 5+volume*200, 14+volume*200);
   pop();
   
   for (var k=0; k<200; k++) {
      drop[k].show();
      drop[k].update();
   }
   
   textFont('Meie Script');
   fill('#40544d');
   textSize(50*D/800);
   textAlign(LEFT);
   text('I freakin\' hate Christmas', 8*D/500, 430*D/800);
   text('I hope you hate it too', 725*D/500, 430*D/800)
      
}

function Drop() {
   this.x = random(0,windowWidth);
   this.y = random(0,windowHeight);
   this.show = function() {
      noStroke();
      fill(146, 209, 195, 180);
      ellipse(this.x,this.y,random(6,10),random(6,10));
   }
   
   this.update = function() {
      this.speed = random(1,3);
      this.gravity = 1.1;
      this.y = this.y + this.speed*this.gravity;
      
      if (this.y > windowHeight) {
         this.y = random(0,-windowHeight);
      }
   }
}

function backgroundImage(img) {
    
    var x = 0;
    var y = 0;
    var w = width;
    var h = height;
    // default offset is center
    var offsetX = 0.5;
    var offsetY = 0.5;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    image(img, cx, cy, cw, ch,  x, y, w, h);
}


function windowResized(){
  resizeCanvas(windowWidth,windowWidth);
}