/* funções e variaveis que mais de um arquivo js utiliza */

var jogador = {
  fase: 0, /* fase que o jogador esta */
  personagem: "", /* personagem escolhido pelo jogador */
  arma: "", /* arma escolhida na pagina de brinquedos */
  inimigosMortos: 0, /* numero de inimigos mortos que zera a cada fase */
  vida: 15, /* vida do jogador. So utilizada com inimigos diferenciados */
  danoBoss: 0, /* dano de bosses e semi-bosses */
  bolasDestruidas: 0, /* Parte especial para o boss */
  clicks: 100, /* numero maximo de clicks de cada fase */
  parado: 15, /* tempo maximo que o mouse pode ficar parado */
  tempo: 120 /* tempo ate o fim da fase */
};

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
