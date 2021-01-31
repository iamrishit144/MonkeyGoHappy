var PLAY = 1;
var END = 0;
var gameState = PLAY

var monkey , monkey_running

var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup

var score = 0

var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,600)
  
  monkey = createSprite(90,440,10,10)
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.2
  
  ground = createSprite(300,540,600,5)
  
  foodGroup = createGroup()
  obstacleGroup = createGroup()
  
  
}


function draw() {
  
  background("lightblue")
  text("Score: "+ score, 500,50);
  if(keyDown("space")&& monkey.y >= 440) {
        monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.debug = true
  
  spawnFood()
  spawnObstacles()
  
  monkey.collide(ground)
  
  if(monkey.isTouching(foodGroup)){
    score = score+1
    foodGroup.destroyEach()
  }
  
  if(monkey.isTouching(obstacleGroup)){
    score = score-2
    obstacleGroup.destroyEach()
  }
  drawSprites()
}

function spawnFood() {
  if(frameCount%100===0){
  banana = createSprite (600,320,30,30)
  banana.addImage(bananaImage)
  banana.scale = 0.15
  banana.velocityX = -6
  foodGroup.add(banana)
  banana.lifetime = 100
  }  
}

function spawnObstacles(){
  if(frameCount%250===0){
    obstacle = createSprite(600,500,10,10)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2
    obstacle.velocityX=-10
    obstacle.debug = true
    obstacleGroup.add(obstacle)
    obstacle.setCollider("circle",0,0,40)
    obstacle.lifetime = 100
  }
}


