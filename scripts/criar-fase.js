/* jogador declarado nas funções essencias */

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

  jogador = carregar(jogador);
  jogador.fase = 6;
  salvar(jogador);
  localStorage.setItem('fase-personalizada', JSON.stringify(fase));
  window.location.replace('jogo.html');
});
