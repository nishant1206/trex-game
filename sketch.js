var trex, trex_running, trex_collided, inv_ground, cloud_img, cloud_load;
var ground, invisibleGround, groundImage, game_state, o1, o2, o3, o4, o5, o6;
var obGroup,cloudGroup, sparrowGroup;

var dino2, sparrow, dino2_img, s_image;

var gameOver, gameOver_img, gameRestart, gameRestart_img;

var score=0;

var count=0;

var cSound, dSound, jSound;

game_state="play";

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
  
  cloud_img = loadImage("cloud.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  dino2=loadAnimation("Dino2.png");
  sparrow=loadImage("Bird.png");
  gameOver_img=loadImage("gameOver.png");
  gameRestart_img=loadImage("restart.png");
  cSound=loadSound("checkPoint.mp3");
  dSound=loadSound("die.mp3");
  jSound=loadSound("jump.mp3");
}

function setup() {
createCanvas(600, 200);

//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided", trex_collided);
trex.scale = 0.5;
trex.addAnimation("Ducking",dino2);
  // trex.debug=true;
  trex.setCollider("circle", 0, 0, 30);
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
inv_ground = createSprite(300,190,600,10);
  
//Creating Groups
obGroup=new Group();
cloudGroup=new Group();
sparrowGroup=new Group();
  
//Adding Dino2 and sparrow Animation
  
  
//Creating Sprites for gameOver and gameRestart
  gameOver=createSprite(300,80);
  gameOver.addImage(gameOver_img);
  gameOver.scale=0.5;
  gameRestart=createSprite(300,120);
  gameRestart.addImage(gameRestart_img);
  gameRestart.scale=0.5;
}

function draw() {
background(255);
  

  if (game_state==="play"){
    
    gameRestart.visible=false;
    gameOver.visible=false;
    
//jump when the space button is pressed
  if (keyDown("space") && trex.y>150){
      trex.velocityY = -10;
      jSound.play();
  }
    
//velocity of ground
    ground.velocityX = -4;
    
trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
    
    // console.log(trex.y);
  clouds();
    if (score>0&& score % 700>0 && score % 700<500){
     
      obstacles();
    
    }
    if(score>0 && score % 700>500 && score % 700<700){
        sparrows();
    }
  // score=score+Math.round(frameRate()/50);
    
    count=count+1;
    score=Math.round(count/5);
  
    //Going to end state of game
  if (obGroup.isTouching(trex)||sparrowGroup.isTouching(trex)){
    game_state="end";
    // trex.velocityY=-12;
    dSound.play();
  }
    
  if (score % 100==0 && score>0){
  
  cSound .play();
  
  }
    
  }
  if (game_state==="end"){
  
    ground.velocityX=0;
    trex.velocityY=0;
    obGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    sparrowGroup.setVelocityXEach(0);
    obGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    sparrowGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    gameRestart.visible=true;
    gameOver.visible=true;
    
    if (mousePressedOver(gameRestart)){
    
      game_state="play";
      obGroup.destroyEach(); 
      sparrowGroup.destroyEach();
      cloudGroup.destroyEach(); 
      trex.changeAnimation("running", trex_running);
      count=0;
    }

  }
  
  //creating Ducking trex
  if (keyWentDown("down")){
  
    trex.changeAnimation("Ducking", dino2);
    trex.scale=0.15;
    
  }
  if (keyWentUp("down")){
  
    trex.changeAnimation("running", trex_running);
    trex.scale=0.5;
    
  }

  
  inv_ground.visible=false;
  
  trex.collide(inv_ground);
  textSize(15);
  text("The score is "+score,450,20);
  
  
drawSprites();
}

function clouds(){

var cloud_load;
  
  if (frameCount % 80==0){
  
cloud_load=createSprite(600,50,20,20);
cloud_load.y=Math.round(random(80,120));
cloud_load.addImage(cloud_img);
cloud_load.scale=0.1;
trex.depth=cloud_load.depth+1;
cloud_load.lifetime=150;
cloud_load.velocityX=-4;
cloudGroup.add(cloud_load);
}
}

function obstacles(){

  if (frameCount % 100==0){
  var obst=createSprite(600,160,20,5);
  obst.velocityX=-6;
  var r=Math.round(random(1,6));
  switch (r){
  
    case 1:
      obst.addImage(o1);
      break;
    case 2:
      obst.addImage(o2);
      break;
    case 3:
      obst.addImage(o3);
      break;
    case 4:
      obst.addImage(o4);
      break;
    case 5:
      obst.addImage(o5);
      break;
    case 6:
      obst.addImage(o1);
      break;
    default:
      break;
  }
obst.scale=0.5;       
obst.collide(inv_ground);
    obGroup.add(obst);
  obst.lifetime=155;
  }
}

function sparrows(){

  
  if (frameCount % 70==0){
  
var sparrow_disp=createSprite(600,50,20,20);
sparrow_disp.y=Math.round(random(120,180));
sparrow_disp.addImage(sparrow);
sparrow_disp.scale=0.1;
sparrow_disp.lifetime=150;
sparrow_disp.velocityX=-4;
sparrowGroup.add(sparrow_disp);
}
}