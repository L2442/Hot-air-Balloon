var balloon,balloonImage1,balloonImage2;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
}

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  var balloonPosition = database.ref("ball/position");
  balloonPosition.set({
      'x' : position.x + x,
      'y' : position.y + y
  })
}
