/*------------------------------------O jogo----------------------------------*/

var intervalosDoJogo = {
  clearTempo: null,
  clearTempoParado: null,
  clearDerrota: null,
  clearAnimacao: null,
  clearVitoria: null,
  clearAtaque: null,
  clearTiroMetralhadora: null,
  clearFuga: null
};

var jogador = {
  fase: 0, /* fase que o jogador esta */
  personagem: "",
  arma: "", /* arma escolhida na pagina de brinquedos */
  inimigosMortos: 0, /* numero de inimigos mortos que zera a cada fase */
  vida: 15, /* vida do jogador. So utilizada com inimigos diferenciados */
  danoBoss: 0, /* dano de bosses e semi-bosses */
  bolasDestruidas: 0, /* Parte especial para o boss */
  clicks: 100, /* numero maximo de clicks de cada fase */
  parado: 15, /* tempo maximo que o mouse pode ficar parado */
  tempo: 120 /* tempo ate o fim da fase */
};

var fase = {
  alvo: "",
  alvoMelee: "",
  imgFundo: "",
  musicaFundo: "",
  a: [0, 0, 0, 0, 0],
  m: [0, 0, 0, 0, 0]
};

jogador = carregar(jogador);
if(jogador === null){
  window.location.replace('brinquedos.html');
}

if(jogador != null && jogador.fase > 0 && jogador.fase < 7 && jogador.arma !== ""){
  switch (jogador.fase) {
    case 1:
      criaFase("url('imgs/fundos/fase-1.jpg')", "musicas/level-1.mp3", "imgs/inimigos/balao.png", "", 3, 3, 3, 3, 3, 0, 0, 0, 0, 0); /*15*/
    break;

    case 2:
      criaFase("url('imgs/fundos/fase-2.jpg')", "musicas/level-2.mp3", "imgs/inimigos/palhaco-mal.png", "imgs/inimigos/cartola-do-mago.png", 3, 3, 2, 4, 2, 2, 2, 4, 2, 2); /*25*/
    break;

    case 3:
      criaFase("url('imgs/fundos/fase-3.jpg')", "musicas/level-3.mp3", "imgs/inimigos/palhaco2.png", "imgs/inimigos/palhaco3.png", 4, 1, 3, 2, 3, 5, 3, 4, 2, 3); /*30*/
    break;

    case 4:
      criaFase("url('imgs/fundos/boss.png')", "musicas/semi-boss.mp3", "imgs/inimigos/palhaco-mal2.png", "imgs/inimigos/cavera.png", 4, 7, 4, 3, 6, 4, 2, 4, 5, 1); /*40*/
      defineMaxClick(jogador, 42);
      colocaSemiBoss("imgs/inimigos/leao.png");
      clearInterval(intervalosDoJogo.clearVitoria);
      intervalosDoJogo.clearVitoria = setInterval(function(){vitoriaSobSemiBoss(20, 20)}, 1500);

      let semiBoss = document.querySelector('.semi-boss'); /* Não prescisa ser All pq só tera 1 sempre */

      if(jogador.arma == "espada"){
        espada();
        semiBoss.addEventListener('mouseup', function(){danoNoSemiBoss(20, 20, jogador)});
      }
      else if(jogador.arma == "pistola"){
        pistola();
        semiBoss.addEventListener('click', function(){danoNoSemiBoss(20, 20, jogador)});
      }
      else if(jogador.arma == "metralhadora"){
        metralhadora();
        semiBoss.addEventListener('mouseenter', function(){danoNoSemiBoss(20, 20, jogador)});
      }
    break;

    case 5:
      jogador.bolasDestruidas = 0;
      criaDivDoBoss("bola-azul", '#atirar');
      criaDivDoBoss("bola-verde", '#atirar');
      criaDivDoBoss("bola-vermelho", '#atirar');
      criaDivDoBoss("bola-amarela", '#bater');
      criaFase("url('imgs/fundos/boss-pistola.png')", "musicas/boss.mp3", "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      defineMaxClick(jogador, 70);
      alternaBolasBoss();
      clearInterval(intervalosDoJogo.clearAnimacao);
      clearInterval(intervalosDoJogo.clearVitoria);
      intervalosDoJogo.clearAnimacao = setInterval(function(){alternaBolasBoss()}, 1500);
    break;

    /* fase personalizada */
    case 6:
      fase = localStorage.getItem('fase-personalizada');
      fase = JSON.parse(fase);
      for(let i = 0; i < 5; i++){
        fase.a[i] = parseInt(fase.a[i]);
      }
      for(i = 0; i < 5; i++){
        fase.m[i] = parseInt(fase.m[i]);
      }
      criaFase(fase.imgFundo, fase.musicaFundo, fase.alvo, fase.alvoMelee,
                fase.a[0], fase.a[1], fase.a[2], fase.a[3], fase.a[4],
                fase.m[0], fase.m[1], fase.m[2], fase.m[3], fase.m[4]);
      clearInterval(intervalosDoJogo.clearVitoria);
      intervalosDoJogo.clearVitoria = setInterval(function(){
        if(jogador.inimigosMortos === (fase.a[0] + fase.a[1] + fase.a[2] + fase.a[3] + fase.a[4]) + (fase.m[0] + fase.m[1] + fase.m[2] + fase.m[3] + fase.m[4])){
          let musicaFundoEl = document.querySelector('#musica-fundo');
          jogador.fase = 0;
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
            window.location.replace('criar-fase.html');
          }, 8700);
        }
      }, 1500);
    break;
  }
}
else{
  window.location.replace("brinquedos.html");
}
