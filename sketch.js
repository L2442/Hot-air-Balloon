var balloon,balloonImage1,balloonImage2;
var database;
var balloonPosition;

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
  createCanvas(1300,600);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition = database.ref('balloon/balloonPosition');
  balloonPosition.on("value",function(data){
      position = data.val(); 
      balloon.x = position.x;
      balloon.y = position.y;
  });

  textSize(20); 
}


function draw() {
  background(bg);
  balloon.setVelocity(0,0);
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.velocityX = -8;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.velocityX = 8;
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.velocityY = -8;
    balloon.scale = 0.6
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.velocityY = 8;
    balloon.scale = 0.4;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
    database.ref('balloon/position').set({
      'x' : height.x + x,
      'y' : height.y + y
    })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  text("Oops! There was an error!", canvas.x/2, canvas.y/2);
  console.log("There was an error!");
}
