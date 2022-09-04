// Criação das variaveis do jogo
var surfista
var pontuacao = 0
var obstaculo1, obstaculo2, obstaculo3, obstaculo4
var surfistaanimation
var PLAY=1;
var END=0;
var gameState=PLAY;
var mar
var caixa
var caixaimg,marimg
var grupodecaixa
var grupodeobstaculos 
// Carregamento das imagens e animação
function preload(){
  //carregamento animação surfista correndo
surfistaanimation=loadAnimation("Capturar direita.PNG","frente.PNG","Capturar.PNG")
  obstaculo1=loadImage("Capturar pedra.PNG");
  obstaculo2=loadImage("carinha do jet-ski.PNG");
  obstaculo3=loadImage("madeira.PNG");
  obstaculo4=loadImage("tufão.PNG");
  caixaimg=loadImage("caixa.PNG")
marimg=loadImage("mar.PNG.webp")
}
// Criando a configuração do jogo
function setup(){
  // Criando a tela do jogo
  createCanvas(windowWidth,windowHeight);
  mar=createSprite(width/2,height/2,width,height);
 mar.addImage(marimg);
  //crie um sprite de surfista
  surfista = createSprite(width/2,50,20,50);
  // Adicionar a animação
  surfista.addAnimation("running", surfistaanimation);
  surfista.scale=0.5;
  grupodeobstaculos=new Group();
  grupodecaixa=new Group()
  surfista.setCollider("rectangle",0,0,40,surfista.height);
  surfista.debug=true;
  
}
// Criando os desenhos e tudo que repete ao longo do jogo
function draw(){
  // para criar fundo
  background("white");
  textSize(25)
  text("Pontuação:"+pontuacao,500,50);
  
if(gameState===PLAY){
  pontuacao=pontuacao+Math.round(getFrameRate()/60)
 mar.velocityY=-(2+pontuacao /500);
  if (mar.y<height/3){
   mar.y =mar.height/2;
    
  }
  
    //para o salto do surfista
    if (keyDown(RIGHT_ARROW)){
      surfista.x+=5}
      if (keyDown(LEFT_ARROW)){
        surfista.x-=5}
    gerarCaixas()
    gerarobstaculos();
  
    // Gravidade do surfista.
if(grupodeobstaculos.isTouching(surfista)){
  gameState=END;
  //surfista.velocityY=-12;
}
}
else if(gameState===END){
 mar.velocityY=0;
  grupodeobstaculos.setVelocityXEach(0)
 grupodeobstaculos.setLifetimeEach(-1);
surfista.velocityY=0;
} 
  drawSprites();
}

function gerarCaixas(){
  if(frameCount%60===0){
   caixa=createSprite(width+20,height+10,40,10);
   caixa.velocityY=-3; 
   caixa.addImage(caixaimg);
   caixa.x=Math.round(random(0,width));
   caixa.lifetime=height/3;
    surfista.depth=caixa.depth;
  surfista.depth=surfista.depth+1;
  grupodecaixa.add (caixa);
  }


}
function gerarobstaculos(){
if(frameCount%300===0){
  var obstaculo = createSprite(random(0,width),height+10,10,40)
  obstaculo.velocityY=-(2+pontuacao /500);
  var rand = Math.round(random(1,4));
  switch(rand){
    case 1: obstaculo.addImage(obstaculo1);
    break;
    case 2: obstaculo.addImage(obstaculo2);
    break;
    case 3: obstaculo.addImage(obstaculo3);
    break;
    case 4: obstaculo.addImage(obstaculo4);
    break;
    default:break;
    
  } 
  obstaculo.lifetime=height/obstaculo.velocityY;
  grupodeobstaculos.add(obstaculo);
}

}