var bg,bgImg;
var player, shooterImg, shooter_shooting;
var z1, z1Img;
var z2Img;
var z3Img;
var w1, w1Img;
var blast , blastImg
var bullet , bulletImg;
var bulletGroup , witchGroup, zombiegroup;
var blood, bloodImg;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImg = loadImage("images/bullet1.png")
  bloodImg = loadImage("images/blood.png")

  bgImg = loadImage("assets/bg.jpeg")
 z1Img = loadAnimation("images/zombie1.png","images/zombie2.png","images/zombie3.png","images/zombie4.png","images/zombie5.png","images/zombie6.png","images/zombie7.png","images/zombie8.png")

 w1Img = loadAnimation("images/w0.png","images/w1.png","images/w2.png","images/w3.png","images/w4.png","images/w5.png","images/w6.png","images/w7.png")

 z2Img = loadAnimation("images/z0.png","images/z1.png","images/z2.png","images/z3.png","images/z4.png","images/z5.png",)

 z3Img = loadAnimation("images/3z -0.png","images/3z -1.png","images/3z -2.png","images/3z -3.png","images/3z -4.png","images/3z -5.png","images/3z -6.png","images/3z -7.png","images/3z -8.png")

 blastImg = loadAnimation("images/s1.png","images/s2.png","images/s3.png","images/s4.png","images/s5.png","images/s6.png","images/s7.png","images/s8.png","images/s9.png","images/s10.png","images/s11.png")
 

}
function zombie(){
  if(frameCount % 300 === 0){
var ghost = createSprite(windowWidth - 100, windowHeight - 90, 20,20)
var any = Math.round(random(1,2));
switch (any){
  case 1 :  ghost.addAnimation("ghost",z1Img);
  break;
  case 2 : ghost.addAnimation("ghost1",z2Img);
  break;
  case 3 : ghost.addAnimation("ghost2",z3Img);
  break;
  default : break;

}

ghost.scale = 0.5;
ghost.velocityX = -2;
ghost.x = random(windowWidth/4, windowWidth);
ghost.y = random(windowHeight/4, windowHeight);
zombieGroup.add(ghost)

  }

}





function witches(){
  if(frameCount % 300 === 0){
    var witch = createSprite(windowWidth - 50, windowHeight - 100, 20,20)
    witch.addAnimation("witch",w1Img);
    witch.scale = 0.6;
    witch.velocityX = -3;
    witch.x = random(windowWidth/4, windowWidth);
    witch.y = random(windowHeight/4, windowHeight);
    witchGroup.add(witch);
    
      }

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   bulletGroup = new Group()
   witchGroup = new Group()
   zombieGroup = new Group()
}

function draw() {
  background(0); 

  



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 shootBullet();

}
if(bulletGroup.collide(witchGroup)){
handleWitchCollsion()

}
if(bulletGroup.collide(zombieGroup)){
  handleGhostCollsion()
  
  }



//player goes back to original standing image once we stop pressing the space bar
 if(keyWentUp("space")){
  player.addImage(shooterImg)
}
zombie();
witches();


drawSprites();

}

function handleWitchCollsion(){
blast = createSprite(bullet.x +30, bullet.y+ 30, 20,20);
blast.addAnimation("blast",blastImg);
blast.life = 30;
bulletGroup.destroyEach();
witchGroup.destroyEach();


}
function handleGhostCollsion(){
  blood = createSprite(bullet.x +20, bullet.y+ 20, 20,20);
  blood.addImage(bloodImg);
  blood.life = 30;
  blood.scale = 0.2;
  bulletGroup.destroyEach();
  zombieGroup.destroyEach();
  
  
  }

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= player.y-25;
  bullet.x = player.x + 55;
  bullet.addImage(bulletImg)
  bullet.scale=0.12 
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}
