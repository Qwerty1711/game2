var player1, player2, coin
function preload(){

}

function setup(){
  createCanvas(500,500);

  player1 = createSprite(250,400,25,25)
  player1.shapeColor = "red"
  player2 = createSprite(250,400,25,25)
  player2.shapeColor = "blue"
  score1 = 0
  score2 = 0

  edges = createGroup()
  edgesInfo = [
    {x:250,y:505,width:500,height:10},
    {x:510,y:250,width:20,height:1000},
    {x:-10,y:250,width:20,height:1000},
  ]
  addToGroup(edgesInfo,edges)

  platforms = createGroup()
  platformsInfo = [
    {x:250,y:300,width:250,height:10},
    {x:250,y:450,width:500,height:100},
  ]
  addToGroup(platformsInfo,platforms)

  var coin = createSprite(Math.round(random(0,500)),Math.round(random(0,400)),20,20)
  coin.shapeColor = "yellow"

}

function draw(){
  background("black");
  playerY(player1,87)
  playerY(player2,38)
  if (player1.isTouching(coin)) {
    score1 +=1
  }
  drawSprites()
  playerX(player2,37,39)
  playerX(player1,65,68)
  player1.bounce(player2)
  player2.bounce(player1)
}



function addToGroup(info,group){
  for (let index = 0; index < info.length; index++) {
    var sprite = createSprite(info[index].x,info[index].y,info[index].width,info[index].height)
    group.add(sprite)

  }
}
function playerY(player,upKey){
  if (player.velocityY <= 15) {
    player.velocityY += 1
  }
  player.collide(edges)
  if (player.isTouching(platforms)&&player.velocityY > 1) {
    player.collide(platforms)
    if (keyDown(upKey)) {
      player.velocityY = -25
    }
  }
  drawSprites();
}
function playerX(player,leftKey,rightKey){
  if (keyDown(leftKey)) {
    player.velocityX -= 5
  }
  if (keyDown(rightKey)) {
    player.velocityX += 5
  }
  player.velocityX *= 0.8
}