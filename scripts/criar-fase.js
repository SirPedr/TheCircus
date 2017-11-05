/* mostra como vai ficar as imgs e a musica */
let inputAlvoEl = document.querySelector('#img-alvo');
let inputAlvoMeleeEl = document.querySelector('#img-alvo-melee');
let inputImgFundoEl = document.querySelector('#img-fundo');
let inputMusicaFundoEl = document.querySelector('#musica-fundo-input');

inputAlvoEl.addEventListener('change', function(){
  let urlImg = inputAlvoEl.value;
  if(urlImg === ""){
    document.querySelector('#img-alvo-upado').src = "imgs/icones/img-upada.png";
  }
  else{
    document.querySelector('#img-alvo-upado').src = "" + urlImg;
  }
});

inputAlvoMeleeEl.addEventListener('change', function(){
  let urlImg = inputAlvoMeleeEl.value;
  if(urlImg === ""){
    document.querySelector('#img-alvo-melee-upado').src = "imgs/icones/img-upada.png";
  }
  else{
    document.querySelector('#img-alvo-melee-upado').src = "" + urlImg;
  }
});

inputImgFundoEl.addEventListener('change', function(){
  let urlImg = inputImgFundoEl.value;
  if(urlImg === ""){
    document.querySelector('#img-fundo-upado').src = "imgs/icones/img-fundo.png";
  }
  else{
    document.querySelector('#img-fundo-upado').src = "" + urlImg;
  }
});

inputMusicaFundoEl.addEventListener('change', function(){
  let urlMusica = inputMusicaFundoEl.value;
  if(urlMusica === ""){
    document.querySelector('#musica-fundo').src = "musicas/criacao-de-level.mp3";
  }
  else{
    document.querySelector('#musica-fundo').src = "" + urlMusica;
  }
});

/* salva os valores escolhidos para colocar na fase */
let jogarEl = document.querySelector('#jogar');
var fase = {
  alvo: "",
  alvoMelee: "",
  imgFundo: "",
  musicaFundo: "",
  a: [0, 0, 0, 0, 0],
  m: [0, 0, 0, 0, 0]
};
var jogador = {
  fase: 0, /* fase que o jogador esta */
  arma: "", /* arma escolhida na pagina de brinquedos */
  inimigosMortos: 0, /* numero de inimigos mortos que zera a cada fase */
  vida: 15, /* vida do jogador. So utilizada com inimigos diferenciados */
  danoBoss: 0, /* dano de bosses e semi-bosses */
  bolasDestruidas: 0, /* Parte especial para o boss */
  clicks: 100, /* numero maximo de clicks de cada fase */
  parado: 15, /* tempo maximo que o mouse pode ficar parado */
  tempo: 120 /* tempo ate o fim da fase */
};

jogarEl.addEventListener('click', function(){
  let inputNumIniEl = document.querySelectorAll('.animacoes');
  fase.alvo = inputAlvoEl.value;
  fase.alvoMelee = inputAlvoMeleeEl.value;
  fase.imgFundo = "url('" + inputImgFundoEl.value + "')";
  fase.musicaFundo = inputMusicaFundoEl.value;
  for(let i = 0; i < 5; i++){
    fase.a[i] = inputNumIniEl[i].value;
  }
  for(i = 5; i < 10; i++){
    fase.m[i - 5] = inputNumIniEl[i].value;
  }

  jogador = localStorage.getItem('save');
  jogador = JSON.parse(jogador);
  jogador.fase = 6;
  localStorage.setItem('save', JSON.stringify(jogador));
  localStorage.setItem('fase-personalizada', JSON.stringify(fase));
  window.location.replace('jogo.html');
});
