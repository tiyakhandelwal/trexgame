var trex,treximage,trexdead,trexdeadimage,ground,groundimage,invisibleground;
var cloudimage,cloudgroup;
var ob1,ob2,ob3,ob4,ob5,ob6,obgroup;
var score;
var PLAY,END,gamestate;
var Gameover,Gameoverimage,restart,restartimage;
var jump,die,checkpoint;

function preload(){
treximage=loadAnimation("trex1.png","trex3.png"," trex4.png") ; 
 groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  Gameoverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
  trexdeadimage=loadAnimation("trex_collided.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
 trex = createSprite (50,150,10,10);
 trex.addAnimation("running",treximage); 
 ground = createSprite (300,180,600,10);
  ground.addImage("ground",groundimage);
  
  ground.x = ground.width/2;
  trex.scale=0.5;
  invisibleground= createSprite(300,190,600,10);
   invisibleground.visible=false;
  score=0;
  
  PLAY=1;
  END=0;
  gamestate=PLAY;
   cloudgroup=new Group();
  obgroup=new Group();
  
  trex.setCollider("circle",0,0,40);
  restart=createSprite(300,100,10,10);
  restart.addImage(restartimage);
  restart.scale=0.5;
  Gameover=createSprite(300,50,10,10);
  Gameover.addImage(Gameoverimage);
  Gameover.scale=0.6
  
  trex.addAnimation("dead",trexdeadimage);
  
}

function draw() {
 background(180) ;
  
  if(gamestate===PLAY){
    ground.velocityX = -3;
    if(ground.x<0){
      ground.x = ground.width/2; 
  }
    
    if(keyDown("space")&& trex.y>=161){
      trex.velocityY = -10 
      jump.play(); 
    }
    
    trex.velocityY = trex.velocityY+0.8; 
    
    score=score+Math.round(getFrameRate()/60) ;
    if(score%100===0&&score>0){
    checkpoint.play();
    } 
      spawnob(); 
      spawnClouds();
    
    if(trex.isTouching(obgroup)){
      gamestate=END;
      die.play();
    }
    Gameover.visible=false;
    restart.visible=false;
  }
  
  else if(gamestate===END){
    ground.velocityX= 0;
    obgroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obgroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    Gameover.visible=true;
    restart.visible=true;
    trex.changeAnimation("dead",trexdeadimage);
    
  }
  if(mousePressedOver(restart)){
    reset();
  }
 textSize(20);
  text("Score:"+ score, 400,50);
  
  trex.collide( invisibleground);
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
  }
    
}

function spawnob(){
  if(frameCount % 60===0){
    var obstacle=createSprite(600,161,10,10)
    obstacle.velocityX=-3;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(ob1);
        break;
        case 2:obstacle.addImage(ob2);
        break;
        case 3:obstacle.addImage(ob3);
        break;
        case 4:obstacle.addImage(ob4);
        break;
        case 5:obstacle.addImage(ob5);
        break;
        case 6:obstacle.addImage(ob6);
        break;
        default:break;
    }
    obstacle.scale=0.5;
    
    obstacle.lifetime=200;
    
    obgroup.add(obstacle);
  }

}

function reset(){
    gamestate=PLAY;
    cloudgroup.destroyEach();
    obgroup.destroyEach();
    trex.changeAnimation("running",treximage);
    score=0;
  }
  
