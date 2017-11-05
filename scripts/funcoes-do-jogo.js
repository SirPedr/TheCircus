/*-------------------------funções auxiliares---------------------------------*/

/* função que retorna a altura computada de um elemento */
function pegaLargura(idClasseElemento){
  let el = document.querySelector(idClasseElemento);
  return parseInt(window.getComputedStyle(el).width);
}

/* função que retorna a largura computada de um elemento */
function pegaAltura(idClasseElemento){
  let el = document.querySelector(idClasseElemento);
  return parseInt(window.getComputedStyle(el).height);
}

/*---------------------funções que manipulam classes--------------------------*/

/* cloca os inimigos na fase a e b são, respctivamente, o numero de inimigos que deve atirar e bater*/
function inicializaInimigos(a, b){
  let alvos = document.querySelectorAll('.morto');
  let alvosMelee = document.querySelectorAll('.morto-melee');

  for(let l = 0; l < a; l++){
    alvos[l].classList.remove('morto');
    alvos[l].classList.add('atira');
  }
  for(l = 0; l < b; l++){
    alvosMelee[l].classList.remove('morto-melee');
    alvosMelee[l].classList.add('bate');
  }
}

/* remove a imagem e "faz" a animação de desaparecer*/
function morto(e){
  let acertado = e.currentTarget;
  if(acertado.classList.contains('atira')){
    acertado.classList.add('morto');
    acertado.addEventListener('animationend', function(){
      acertado.style.display = "none";
      acertado.classList.remove('atira');
    });
  }
  else if(acertado.classList.contains('bate')){
    acertado.classList.add('morto-melee');
    acertado.addEventListener('animationend', function(){
      acertado.style.display = "none";
      acertado.classList.remove('bate');
    });
  }
  jogador.inimigosMortos = jogador.inimigosMortos + 1;
  if(jogador.arma === "espada"){
    let alvos = document.querySelectorAll('.atira');
    for(let alvo of alvos){
      alvo.removeEventListener('mouseenter', morto);
    }
  }
}

/* remove as bolas do boss */
function desativaDivBoss(e){
  if(jogador.danoBoss % 5 === 0 && jogador.danoBoss !== 0){
      let acertado = e.currentTarget;
      jogador.danoBoss = jogador.danoBoss + 1;
      jogador.bolasDestruidas = jogador.bolasDestruidas + 1;
      acertado.classList.remove('divsBossAtiva');
      acertado.classList.add('divsBossDesativada');
      if(jogador.bolasDestruidas === 12){
        vitoriaSobBoss(jogador);
      }
      else if(jogador.bolasDestruidas % 4 === 0 && jogador.bolasDestruidas !== 0){
        ataqueDoBoss(jogador);
      }
  }
  else{
    jogador.danoBoss = jogador.danoBoss + 1;
  }
}

/*--------------funções com ações (tempo, ganhar, salvar, etc)----------------*/

/* verificar se o jogador ganhou a e b são os mesmos valores que foram passados na função que inicializa os inimigos*/
function vitoria(a, b){
  if(jogador.inimigosMortos === a + b){
    let musicaFundoEl = document.querySelector('#musica-fundo');
    jogador.fase = jogador.fase + 1;
    clearInterval(intervalosDoJogo.clearTempo);
    clearInterval(intervalosDoJogo.clearDerrota);
    clearInterval(intervalosDoJogo.clearVitoria);
    clearInterval(intervalosDoJogo.clearAnimacao);
    clearInterval(intervalosDoJogo.clearTempoParado);
    document.querySelector('html').removeEventListener('mousemove', verificarMouse);
    document.querySelector('#atirar').removeEventListener('mousedown', diminuiClicksJogador);
    salvar(jogador);
    musicaFundoEl.src = "musicas/vitoria.mp3";
    musicaFundoEl.loop = 1;
    setTimeout(function () {
      window.location.replace('historia.html');
    }, 8700);
  }
}

/* verificar se o jogador perdeu */
function derrota(jogador){
  if(jogador.tempo <= 0 || jogador.vida <= 0 || jogador.clicks <= 0){
    window.location.replace("game-over.html");
  }
}

/* coloca delay, posições e tempo aleatorio nos inimigos */
function animaAleatorio(idAlvo, idConteiner, max, minL, minH){
  let elementosAlvos = document.querySelectorAll(idAlvo);
  let larguraDoConteiner = pegaLargura(idConteiner);
  let alturaDoConteiner = pegaAltura(idConteiner);
  let minTran = Math.ceil(1);
  let maxTran = Math.floor(3);

  for(let elementoAlvo of elementosAlvos){
    let larguraDoEl = pegaLargura(idAlvo);
    let alturaDoEl = pegaAltura(idAlvo);
    elementoAlvo.style.left = (Math.random() * ((larguraDoConteiner - larguraDoEl - max) - minL) + minL) + 'px'; /* 1°numero = o "maximo", 2° e 3°numero = o minimmo que anda */
    elementoAlvo.style.top = (Math.random() * ((alturaDoConteiner - alturaDoEl) - minH) + minH) + 'px';
    elementoAlvo.style.transitionDelay = Math.random() + "s";
    elementoAlvo.style.transitionTimeDuration = Math.floor(Math.random() * (maxTran - minTran)) + minTran + "s";
  }
}

/* chamada varias vezes para alterar as posições dos alvos */
function animacao(jogador){
  if(jogador.fase === 4){
    /* anima o semi-boss */
    animaAleatorio('.semi-boss', '#atirar', 120, 10, 45);
  }
  /* anima os alvos */
  animaAleatorio('.atira', '#atirar', 120, 10, 45);
  /* anima os inimigos melee */
  animaAleatorio('.bate', '#bater', 80, 10, 25);
}

/* reduzir o tempo do relogio */
function diminuiTempo(jogador){
  let tempo = document.querySelector('#tempo');
  jogador.tempo = jogador.tempo - 1;
  tempo.innerHTML = jogador.tempo + "s";
}

/* salvar o jogo */
function salvar(jogador){
  localStorage.setItem('save', JSON.stringify(jogador));
}

/* carregar o save e retorna o objeto */
function carregar(jogador){
  jogador = localStorage.getItem('save');
  jogador = JSON.parse(jogador);
  return jogador;
}

/* verifica se o mouse esta parado e reduz o tempo max dele parado */
function verificarMouse(){
  let contadorEl = document.querySelector('#contador-parado');
  let htmlEl = document.querySelector('html');
  clearInterval(intervalosDoJogo.clearTempoParado);
  jogador.parado = 15;
  contadorEl.innerHTML = jogador.parado + "s";
  intervalosDoJogo.clearTempoParado = setInterval(function(){
    jogador.parado = jogador.parado - 1;
    contadorEl.innerHTML = jogador.parado + "s";
    if(jogador.parado <= 0){
      window.location.replace('game-over.html');
    }
  }, 1000);
}

/* diminui x pontos de vida do jogador */
function diminuiVidaJogador(jogador, x){
  let contadorVidaEl = document.querySelector('#contador-vida');
  jogador.vida = jogador.vida - x;
  contadorVidaEl.innerHTML = jogador.vida;
}

/* diminui 1 no contador de clicks do jogo */
function diminuiClicksJogador(){
  let contadorClicksEl = document.querySelector('#contador-clicks');
  if(jogador.arma === "metralhadora"){
    intervalosDoJogo.clearTiroMetralhadora = setInterval(function(){
      jogador.clicks = jogador.clicks - 1;
      contadorClicksEl.innerHTML = jogador.clicks;
    }, 200);
  }
  else{
    jogador.clicks = jogador.clicks - 1;
    contadorClicksEl.innerHTML = jogador.clicks;
  }
}
/*----------------------------funções das armas ------------------------------*/

function bater(){
  if(jogador.fase != 5){
    let alvosMelee = document.querySelectorAll('.bate');

    for(let alvoMelee of alvosMelee){
      alvoMelee.addEventListener('mouseenter', morto);
    }
  }
  else{
    let bolaAmarelaEl = document.querySelector('#bola-amarela');

    bolaAmarelaEl.addEventListener('mouseenter', desativaDivBoss);
  }
}

function pistola(){

  if(jogador.fase !== 5){
    let alvos = document.querySelectorAll('.atira');

    for(let alvo of alvos){
      alvo.addEventListener('click', morto);
    }
  }
  else{
    let bolas = document.querySelectorAll('.divsBossAtiva');
    for(let bola of bolas){
      bola.addEventListener('click', desativaDivBoss);
    }
  }

  bater();
}

function espada(){
  let divAtirar = document.querySelector('#atirar');

  if(jogador.fase !== 5){
    let alvos = document.querySelectorAll('.atira');
    divAtirar.addEventListener('mousedown', function(){
      for(let alvo of alvos){
        alvo.addEventListener('mouseenter', morto);
      }
    });
  }
  else{
    let bolas = document.querySelectorAll('.divsBossAtiva');
    divAtirar.addEventListener('mousedown', function(){
      for(let bola of bolas){
        bola.addEventListener('mouseenter', desativaDivBoss);
      }
    });
  }

  bater();
}

function metralhadora(){
  let divAtirar = document.querySelector('#atirar');
  if(jogador.fase !== 5){
    divAtirar.addEventListener('mousedown', function(){
      let alvos = document.querySelectorAll('.atira');
      for(let alvo of alvos){
        alvo.addEventListener('mouseenter', morto);
      }
    });
  }
  else{
    divAtirar.addEventListener('mousedown', function(){
      let bolas = document.querySelectorAll('.divsBossAtiva');
      for(let bola of bolas){
        bola.addEventListener('mouseenter', desativaDivBoss);
      }
    });
  }
  bater();
}
/*----------------------------funções do semi-boss---------------------------*/

/* faz o semiBoss so tomar dano apos todos inimigos estiverem mortos */
function danoNoSemiBoss(a, b, jogador){
  if(jogador.inimigosMortos === a + b){
    jogador.danoBoss = jogador.danoBoss + 1;
  }
  else{
    /* se o jogador acerta o semi-boss com inimigos em campo toma dano */
    diminuiVidaJogador(jogador, 1);
  }
}

/* vitoria especial caso a fase tenha um semiBoss */
function vitoriaSobSemiBoss(a, b){
  if(jogador.danoBoss >= 10){
    /* coloca a classe que o boss morreu e anima a morte */
    let semiBoss = document.querySelector('.semi-boss');
    semiBoss.classList.add('morto');
    semiBoss.addEventListener('animationend', function(){
      semiBoss.style.display = "none";
      semiBoss.classList.remove('atira');
    });
    /* troca de fase */
    vitoria(a, b);
  }
}

/* spawna um semiBoss */
function colocaSemiBoss(img){
  let semiBoss = document.createElement('img');
  let divAtirar = document.querySelector('#atirar');

  semiBoss.src = img;
  semiBoss.classList.add('semi-boss');
  semiBoss.classList.add('semi-boss-anima');
  semiBoss.draggable = "false";
  semiBoss.style = "user-drag: none; user-select: none -moz-user-select: none; -webkit-user-drag: none; -webkit-user-select: none; -ms-user-select: none;";
  divAtirar.appendChild(semiBoss);
}

/*-------------------------------funções do boss------------------------------*/

/* receba a id que dara a cor, transition e position e  uma divX(atirar ou bater) */
function criaDivDoBoss(id, divX){
  let divBoss = document.createElement('div');
  let conteiner = document.querySelector(divX);

  divBoss.id = id;
  divBoss.classList.add('divsBossAtiva');
  divBoss.draggable = "false";
  divBoss.style = "user-drag: none; user-select: none -moz-user-select: none; -webkit-user-drag: none; -webkit-user-select: none; -ms-user-select: none;";
  conteiner.appendChild(divBoss);
  divBoss.style.width = window.getComputedStyle(divBoss).height;
}

/* faz as bolas alternarem de posição formando um traingulo */
function alternaBolasBoss(){
  let bolaAzulEl = document.querySelector('#bola-azul');
  let bolaVermelhaEl = document.querySelector('#bola-vermelho');
  let bolaVerdeEl = document.querySelector('#bola-verde');

  let larguraDaDiv = pegaLargura('#atirar');
  let alturaDaDiv = pegaAltura('#atirar');

  let larguraDaBola = pegaLargura('#bola-azul');
  let alturaDaBola = pegaAltura('#bola-azul');

  let posicao1X = 0 + "px";
  let posicao1Y = alturaDaDiv - alturaDaBola + "px";

  let posicao2X = larguraDaDiv - larguraDaBola + "px";
  let posicao2Y = alturaDaDiv - alturaDaBola + "px";

  let posicao3X = (50/100 * larguraDaDiv) - (larguraDaBola/2) + "px";
  let posicao3Y = 0 + "px";

  if(bolaAzulEl.style.left === posicao1X){
    bolaAzulEl.style.left = posicao2X;
    bolaAzulEl.style.top = posicao2Y;

    bolaVermelhaEl.style.left = posicao3X;
    bolaVermelhaEl.style.top = posicao3Y;

    bolaVerdeEl.style.left = posicao1X;
    bolaVerdeEl.style.top = posicao1Y;
  }
  else if(bolaAzulEl.style.left === posicao2X){
    bolaAzulEl.style.left = posicao3X;
    bolaAzulEl.style.top = posicao3Y;

    bolaVermelhaEl.style.left = posicao1X;
    bolaVermelhaEl.style.top = posicao1Y;

    bolaVerdeEl.style.left = posicao2X;
    bolaVerdeEl.style.top = posicao2Y;
  }
  else{
    bolaAzulEl.style.left = posicao1X;
    bolaAzulEl.style.top = posicao1Y;

    bolaVermelhaEl.style.left = posicao2X;
    bolaVermelhaEl.style.top = posicao2Y;

    bolaVerdeEl.style.left = posicao3X;
    bolaVerdeEl.style.top = posicao3Y;
  }
}

/* aumenta a largura da div de esquiva preparando para o ataque do boss */
function aumentaDivEsquiva(){
  let divInfEl = document.querySelector('#info');
  let divEsquivaEl = document.querySelector('#esquiva');

  divInfEl.style.opacity = 0;
  divInfEl.addEventListener('transitionend', function(){
    divInfEl.style.display = "none";
  });
  divEsquivaEl.style.width = pegaLargura('#bater') + "px";
}

/* vitoria especial ao enfrentar o boss */
function vitoriaSobBoss(jogador){
  let bolasBoss = document.querySelectorAll('.divsBossDesativada');
  let divAtirarEl = document.querySelector('#atirar');
  let divBaterEl = document.querySelector('#bater');
  for(let i = 0; i < bolasBoss.length - 1; i++){
    divAtirarEl.removeChild(bolasBoss[i]);
  }
  divBaterEl.removeChild(bolasBoss[bolasBoss.length - 1]);
  jogador.fase = jogador.fase + 1;
  clearInterval(intervalosDoJogo.clearTempo);
  clearInterval(intervalosDoJogo.clearDerrota);
  clearInterval(intervalosDoJogo.clearTempoParado);
  clearInterval(intervalosDoJogo.clearAnimacao);
  document.querySelector('html').removeEventListener('mousemove', verificarMouse);
  document.querySelector('#atirar').removeEventListener('mousedown', diminuiClicksJogador);
  salvar(jogador);
  musicaFundoEl.src = "musicas/vitoria.mp3";
  musicaFundoEl.loop = 1;
  setTimeout(function () {
    window.location.replace('historia.html');
  }, 8700);
}

/* ativa e desativa o ataque do boss */
function ataqueDoBoss(jogador){
  aumentaDivEsquiva();
  let divEsquivaEl = document.querySelector('#esquiva');
  /* cria as bolinhas brancas que causam dano */
  for(let i = 0; i < 25; i++){
    let dano = document.createElement('div');
    dano.classList.add('danoBoss');
    divEsquivaEl.appendChild(dano);
    dano.style.width = pegaAltura('.danoBoss') + "px"; /* fazer um circulo */
    dano.addEventListener('mouseover', function(){
      diminuiVidaJogador(jogador, 2);
    });
  }
  /* cria a bolinha azul que para o ataque */
  let acabaAtaque = document.createElement('div');
  acabaAtaque.id = "acabaAtaque";
  acabaAtaque.classList.add('danoBoss');
  divEsquivaEl.appendChild(acabaAtaque);
  acabaAtaque.style.width = pegaAltura('#acabaAtaque') + "px";
  /* faz as animações das bolinhas */
  intervalosDoJogo.clearAtaque = setInterval(function(){animaAleatorio('.danoBoss', '#esquiva', 0, 0, 0)}, 1000);

  /* não deixa o cara sair da div de esquiva */
  divEsquivaEl.addEventListener('mouseout', reduzVida);
  divEsquivaEl.addEventListener('mousemove', paraReduzVida);

  /* coloca o envento que para o ataque na bolinha azul */
  acabaAtaque.addEventListener('mouseenter', function(){
    let bolasEl = document.querySelectorAll('.divsBossDesativada');
    for(let bolaEl of bolasEl){
      bolaEl.classList.remove('divsBossDesativada');
      bolaEl.classList.add('divsBossAtiva');
    }
    let divEsquivaEl = document.querySelector('#esquiva');
    let danosEl = document.querySelectorAll('.danoBoss');
    let divInfEl = document.querySelector('#info');
    for(let danoEl of danosEl){
      divEsquivaEl.removeChild(danoEl);
    }
    divEsquivaEl.style.width = "22%";
    divInfEl.style.display = "flex";
    divInfEl.style.opacity = 1;
    clearInterval(intervalosDoJogo.clearAtaque);
    clearInterval(intervalosDoJogo.clearFuga);
    divEsquivaEl.removeEventListener('mouseout', reduzVida);
    divEsquivaEl.removeEventListener('mousemove', paraReduzVida);
  });
}

/* os duas abaixo foram colocadas aqui para o removeEventListener funcionar */
function reduzVida(){
  intervalosDoJogo.clearFuga = setInterval(function(){
    diminuiVidaJogador(jogador, 1);
  }, 1000);
}
function paraReduzVida(){
  clearInterval(intervalosDoJogo.clearFuga);
}
/*--------------------funções que montam as fazes do jogo---------------------*/
/* fala a quantidade maxima de clicks que pode ser dado */

/* fala o maximo de clicks que pode ter em cada fase */
function defineMaxClick(jogador, x){
  let contadorClicksEl = document.querySelector('#contador-clicks');
  if(jogador.arma === "metralhadora"){
    jogador.clicks = Math.round(x + (x/5));
    contadorClicksEl.innerHTML = jogador.clicks;
  }
  else{
    jogador.clicks = x;
    contadorClicksEl.innerHTML = jogador.clicks;
  }
}

/* colca A inimigos de qualquer tipo */
function colocaInimigo(div, classe, img, animacao, a){
  let divEl = document.querySelector(div);
  for(let i = 0; i < a; i++){
    let inimimgoEl = document.createElement('img');
    inimimgoEl.src = img;
    inimimgoEl.classList.add(classe);
    inimimgoEl.classList.add(animacao);
    /* unico jeito de não deixar arrastar */
    inimimgoEl.draggable = "false";
    inimimgoEl.style = "user-drag: none; user-select: none -moz-user-select: none; -webkit-user-drag: none; -webkit-user-select: none; -ms-user-select: none;";
    divEl.appendChild(inimimgoEl);
  }
}

/* remove todos os inimigos do HTML */
function removeInimigos(){
  let alvos = document.querySelectorAll('.morto');
  let alvosMelee =  document.querySelectorAll('.morto-melee');
  let divBater = document.querySelector('#bater');
  let divAtirar = document.querySelector('#atirar');

  for(let alvo of alvos){
    divAtirar.removeChild(alvo);
  }
  for(let alvoMelee of alvosMelee){
    divBater.removeChild(alvoMelee);
  }
}

/* troca a musica e fundo e a imagem */
function mudaAmbientacao(img, audio){
  /* muda o fundo */
  let fundo = document.querySelector('html');
  fundo.style.backgroundImage = img;
  fundo.style.backgroundSize = "cover";
  fundo.style.backgroundRepeat = "no-repeat";

  if(audio !== ""){
    /* muda a musica de fundo */
    let musicaFundoEl = document.querySelector('#musica-fundo');
    musicaFundoEl.src = audio;
  }
}

/* coloca as funçoes basicas da fase e muda o fundo e a musica */
function criaFase(fundo, musicaFundo, imgInimigoA, imgInimigoM, a1, a2, a3, a4, a5, m1, m2, m3, m4, m5){
  jogador.tempo = 120;
  jogador.vida = 15;
  jogador.danoBoss = 0;
  jogador.inimigosMortos = 0;
  jogador.clicks = 0;
  jogador.parado = 15;
  salvar(jogador);
  mudaAmbientacao(fundo, musicaFundo);
  removeInimigos();
  colocaInimigo('#atirar', 'morto', imgInimigoA, 'linear', a1);
  colocaInimigo('#atirar', 'morto', imgInimigoA, 'ease-in', a2);
  colocaInimigo('#atirar', 'morto', imgInimigoA, 'ease-out', a3);
  colocaInimigo('#atirar', 'morto', imgInimigoA, 'ease-in-out', a4);
  colocaInimigo('#atirar', 'morto', imgInimigoA, 'dolly', a5);
  colocaInimigo('#bater', 'morto-melee', imgInimigoM, 'linear', m1);
  colocaInimigo('#bater', 'morto-melee', imgInimigoM, 'ease-in', m2);
  colocaInimigo('#bater', 'morto-melee', imgInimigoM, 'ease-out', m3);
  colocaInimigo('#bater', 'morto-melee', imgInimigoM, 'ease-in-out', m4);
  colocaInimigo('#bater', 'morto-melee', imgInimigoM, 'dolly', m5);
  inicializaInimigos((a1+a2+a3+a4+a5), (m1+m2+m3+m4+m5));
  defineMaxClick(jogador, (a1+a2+a3+a4+a5+5));
  animacao(jogador);
  intervalosDoJogo.clearTempo = setInterval(function(){diminuiTempo(jogador)}, 1000);
  intervalosDoJogo.clearDerrota = setInterval(function(){derrota(jogador)}, 500);
  intervalosDoJogo.clearAnimacao = setInterval(function(){animacao(jogador)}, 1810); /* vai fazer eles mudarem varias vezes e o transition anima*/
  intervalosDoJogo.clearVitoria = setInterval(function(){vitoria((a1+a2+a3+a4+a5), (m1+m2+m3+m4+m5))}, 1500);
  document.querySelector('html').addEventListener('mousemove', verificarMouse);
  let divAtirarEl = document.querySelector('#atirar');

  if(jogador.arma == "espada"){
    divAtirarEl.addEventListener('mousedown', diminuiClicksJogador);
    espada();
  }
  else if(jogador.arma == "pistola"){
    divAtirarEl.addEventListener('mousedown', diminuiClicksJogador);
    pistola();
  }
  else if(jogador.arma == "metralhadora"){
    divAtirarEl.addEventListener('mousedown', diminuiClicksJogador);
    document.querySelector('html').addEventListener('mouseup', function(){
      clearInterval(intervalosDoJogo.clearTiroMetralhadora);
      if(jogador.fase === 5){
        let bolaAzul = document.querySelector('#bola-azul');
        let bolaVermelha = document.querySelector('#bola-verde');
        let bolaVerde = document.querySelector('#bola-vermelha');

        bolaAzul.removeEventListener('mouseenter', desativaDivBoss);
        bolaVermelha.removeEventListener('mouseenter', desativaDivBoss);
        bolaVerde.removeEventListener('mouseenter', desativaDivBoss);
      }
      else{
        let alvos = document.querySelectorAll('.atira');
        for(let alvo of alvos){
          alvo.removeEventListener('mouseenter', morto);
        }
      }
    });
    metralhadora();
  }
}
