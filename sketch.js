var ironman_stand, ironman, ground1, ground2, ground3, ground4, scene, laser, goal, ironmanRight_img, ironmanLeft_stand, ironmanLeft_img, win, win_img, laserGroup, botGroup, jump_sound, shoot_sound;

var count = 0;

var PLAY = 1;
var END = 0;

var bot= 0;

var gameState = PLAY;

function preload(){
  ironman_stand = loadImage("ironman_stand.png");
  ironmanLeft_stand = loadImage("ironleft_stand.png")
  
  ironshot = loadImage("ironshot.png");
  ironshotleft_img = loadImage("ironshotleft.png");  
  
  ironmanRight_img =              loadAnimation("ironright_1.png","ironright_2.png");
  
  ironmanLeft_img = loadAnimation("ironman_left.png", "ironleft_1.png")
  
  laser_img = loadImage("laser.png");
  
  scene_img = loadImage("scene.png");  
  
  prize_img = loadImage("plane_coin.png");
  
  bot1_img = loadAnimation("bot_1.png","bot_2.png");
  
  game_over_img = loadImage("game_over.png");
  
  win_img = loadImage("you win.png");
  
  jump_sound = loadSound("jump_sound.mp3");
  
  shoot_sound = loadSound("shoot_sound.mp3");

  gameover_sound = loadSound("Gameover.mp3");

  win_sound = loadSound("fanfare.mp3"); 
}

function setup(){
  
  createCanvas(1350, 650);
  
  
     scene= createSprite(675, 325,1350,650);
     scene.addImage(scene_img);
     scene.scale = 4;
  
     prize = createSprite(45, 120, 10, 10);
     prize.addImage(prize_img);
     prize.scale= 0.5;
  
     ironman = createSprite(50,600,10,10);
     ironman.addImage(ironman_stand);
     ironman.scale= 0.75
    
     ground= createSprite(700,640,1400,10);
     ground.setCollider("rectangle", 0, 0, 1400, 10);
    
     ground2= createSprite(500,480,1400,10);
     ground3= createSprite(900,320,1400,10);
     ground4= createSprite(500,160,1400,10);
  
     botGroup = createGroup();
     laserGroup = createGroup();

}

 function draw(){
   
   background(0);

   createEdgeSprites();
  // console.log(PLAY);
   
   if(gameState === PLAY){
     //collider
  //ground.setCollider("rectangle",0,0,400,5);
  //stay on ground and in canvas
  ironman.collide(ground);
  //ironman.bounceOff(edges);
  ironman.collide(ground2);
  ironman.collide(ground3);
  ironman.collide(ground4);
  
  // movement
  if(keyDown(RIGHT_ARROW)){
    ironman.x = ironman.x+6;
    ironman.addAnimation("run right",ironmanRight_img);
  }
  
  if(keyDown(LEFT_ARROW)){
    ironman.addAnimation("run left", ironmanLeft_img);
    ironman.x=ironman.x-6;
  }
  
  if(keyWentUp(RIGHT_ARROW) ){
    ironman.addImage(ironman_stand);
  }
  
  if(keyWentUp(LEFT_ARROW)){
    ironman.addImage(ironmanLeft_stand);
  }
  
    //jump when the space key is pressed
    if(keyDown(UP_ARROW)){
      ironman.velocityY = -12 ;
      jump_sound.play();
    }
  
    //add gravity
    ironman.velocityY = ironman.velocityY + 0.6; 
    
  //shoot
  shoot();
  
  spawnBots();
  spawnBots2();
  spawnBots3();
  spawnBots4();
   
  /*Jump1();
  Jump2();
  Jump3();
  Jump4();*/
   
      if(botGroup.isTouching(laserGroup)){
      botGroup.destroyEach(); 
        bot = bot+5;
    }
     
     if(botGroup.isTouching(ironman)){
       gameState = END;
       gameover_sound.play();
     }
     
     else if(ironman.isTouching(prize)){
        win_sound.play();
        prize.visible = false;
        ground.visible = false;
        ground2.visible = false;
        ground3.visible = false;
        ground4.visible = false;
        ironman.visible = false;
        
        botGroup.destroyEach();
        win = createSprite(675, 325, 10, 10);
        win.addImage(win_img);
        win.scale = 2;
     }
   }
   
   if(gameState === END){
          //ironman.visible = false;
           gameover = createSprite(675, 325, 10, 10);
           gameover.addImage(game_over_img);
           gameover.scale = 2;
          /* ironman.destroy();
           botGroup.destroyEach();
           botGroup.velocityXEach = 0;*/
     death();
   }

   ironman.collide(ground);
   //ironman.bounceOff(edges);
   ironman.collide(ground2);
   ironman.collide(ground3);
   ironman.collide(ground4);
   
   drawSprites();
   
   textSize(25);
   fill("black");
   text("Score: "+bot, 1200, 25);
 }
 
  function shoot(){
  if(keyWentDown("space")){
    laser = createSprite(ironman.x,ironman.y,10,10);
    laser.scale=0.5;
    laser.velocityX= 10;
    laser.addImage(laser_img);
    ironman.addImage(ironshot);
    laserGroup.add(laser);
    shoot_sound.play();
    /*  if(ironman.addImage(ironmanLeft_stand)){
        ironman.addImage(ironshotleft_img);
        laser = createSprite(ironman.x,ironman.y,10,10);
        laser.scale=0.5;
        laser.velocityX= 5;
        laser.addImage(laser_img);
        ironman.addImage(ironshot);
        laserGroup.add(laser);
        shoot_sound.play();
      }*/
    }
  }

 function shoot_left(){
  if(ironman.addanimation(ironmanLeft_stand && keyDown("SPACE"))){
      ironman.addImage(ironshotleft_img);
     }
 }

 function spawnBots() {
  if(World.frameCount % 100 === 0) {
    var bot = createSprite(1400, random(540, 600), 10, 40);
    bot.addAnimation("bot", bot1_img);
    bot.velocityX = - (6 + 3*count/100);
    
    //assign scale and lifetime to the obstacle           
    bot.scale = 0.5;
    bot.lifetime = 1400;
    //add each obstacle to the group
    botGroup.add(bot); 
  }
}

 function spawnBots2() {
  if(World.frameCount % 80 === 0) {
    var bot = createSprite(0, 440, 10, 40);
    bot.addAnimation("bot", bot1_img);
    bot.velocityX = + (9 + 3*count/100);
    
    //assign scale and lifetime to the obstacle           
    bot.scale = 0.5;
    bot.lifetime = 1400;
    //add each obstacle to the group
    botGroup.add(bot); 
  }
}
 
function spawnBots3() {
  if(World.frameCount % 60 === 0) {
    var bot = createSprite(1400, random(210, 280), 10, 40);
    bot.addAnimation("bot", bot1_img);
    bot.velocityX = - (12 + 3*count/100);
    
    //assign scale and lifetime to the obstacle           
    bot.scale = 0.5;
    bot.lifetime = 1400;
    //add each obstacle to the group
    botGroup.add(bot); 
  }
}

 function spawnBots4() {
  if(World.frameCount % 40 === 0) {
    var bot = createSprite(1400, random(50, 120), 10, 40);
    bot.addAnimation("bot", bot1_img);
    bot.velocityX = - (15 + 3*count/100);
    
    //assign scale and lifetime to the obstacle           
    bot.scale = 0.5;
    bot.lifetime = 1400;
    //add each obstacle to the group
    botGroup.add(bot); 
  }
}
 function death(){
   if(botGroup.isTouching(ironman)){
     //ironman.visible = false;
     ironman.destroy();
     botGroup.destroyEach();
     botGroup.velocityXEach = 0;
   }
 }

 /*function Jump1(){
   //jump when the space key is pressed
    if(keyDown("UP_ARROW") && ironman.y === 361){
      ironman.velocityY = -12 ;
    }
  
    //add gravity
    ironman.velocityY = ironman.velocityY + 0.6; 
 }

 function Jump2(){
   //jump when the space key is pressed
    if(keyDown("UP_ARROW") && ironman.y === 261){
      ironman.velocityY = -12 ;
    }
  
    //add gravity
    ironman.velocityY = ironman.velocityY + 0.6; 
 }

 function Jump3(){
   //jump when the space key is pressed
    if(keyDown("UP_ARROW") && ironman.y === 161){
      ironman.velocityY = -12 ;
    }
  
    //add gravity
    ironman.velocityY = ironman.velocityY + 0.6; 
 }

 function Jump4(){
   //jump when the space key is pressed
    if(keyDown("UP_ARROW") && ironman.y === 61){
      ironman.velocityY = -12 ;
    }
  
    //add gravity
    ironman.velocityY = ironman.velocityY + 0.6; 
 } */

 