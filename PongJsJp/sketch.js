

// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;


//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10
let alturaRaquete = 90

let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;


//velocidade da bolinha
let velocidadeXBolinha = 10;
let velocidadeYBolinha = 10;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}


function draw() {
  background(255);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente)
  movimentaMinhaRaquete();
  movimenteRaqueteOponente();
  //verificaColisaoRaquete();
  //colisaoMinhaRaqueteBiblioteca();
  //colisaoRaqueteOponenteBiblioteca();
  verificaColisaoRaquete(xRaquete,yRaquete)
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente)
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  fill(0)
  circle(xBolinha,yBolinha,diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  fill(0)
  rect(x,y , comprimentoRaquete, alturaRaquete)
}

//function mostraRaqueteOponente(){ Não precisamos repetir a função para exibir a raquete do oponente. 
//  rect(xRaqueteOponente, yRaqueteOponente, comprimentoRaqueteOponente, alturaRaqueteOponente)
//}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  // limitar a movimentação da para que para não sair da tela.
  yRaquete = constrain(yRaquete, 10, 300)
  
}

function  movimenteRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 -30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  
  calculaChanceDeErrar()
  
  //limitar a movimentação da para que para não sair da tela.
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 300)
  
  
  
  
  // para ser possível jogar de dois no mesmo teclado, ative esta opção.
  //if (keyIsDown(87)){
  //yRaqueteOponente -= 10;
  //}
  //if (keyIsDown(83)){
  // yRaqueteOponente += 10;
  //}
  
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}


//function verificaColisaoRaquete() {
//  if (xBolinha - raio < xRaquete + comprimentoRaquete
//      &&yBolinha - raio < yRaquete + alturaRaquete
//      &&yBolinha + raio > yRaquete){
//    velocidadeXBolinha *= -1;
//  } verificando colisação primeira opção. 

function verificaColisaoRaquete(x,y){ // verificando colisão segunda opção utilizando biblioteca. 
  colidiu = 
    collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1; 
    raquetada.play()  
  }
} 

//function colisaoRaqueteOponenteBiblioteca(x, y){ // Também não é preciso repetir a função. 
// colidiu = 
//  collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
//if (colidiu){
//  velocidadeXBolinha *= -1; 
//   raquetada.play()
//}
//} 

function incluiPlacar(){
  
  stroke(0)
  textAlign(CENTER)
  textSize(18);
  fill(color(138,43,226));
  rect(150,10,40,20);
  fill(0);
  text(meusPontos, 170,26)
  fill(color(138,43,226));
  rect(450,10,40,20);
  fill(0);
  text(pontosOponente, 470,26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}