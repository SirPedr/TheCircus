/* jogador declarado nas funções essencias */

/* coloca a fala de algum personagem na div modal */
function historia(img, texto, titulo){
  let mascaraEl = document.querySelector('#mascara');
  let divModalEl = document.querySelector('#div-modal');
  divModalEl.classList.remove('aparece');
  mascaraEl.classList.remove('clicavel');
  divModalEl.innerHTML = "";
  let mascara = document.querySelector('#mascara');
  let imgEl = document.createElement('img');
  let textoEl = document.createElement('p');
  let tituloEl = document.createElement('p');

  tituloEl.innerHTML = titulo;
  imgEl.id = 'img-personagem';
  imgEl.src = img;
  textoEl.id = 'texto-personagem';
  textoEl.innerHTML = texto;

  divModalEl.appendChild(tituloEl);
  divModalEl.appendChild(imgEl);
  divModalEl.appendChild(textoEl);

  /* Faz a div modal aparecer */
  divModalEl.classList.add('aparece');
  mascaraEl.classList.add('clicavel');
}

/* Função que coloca os dialogos no jogo */
function contaHistoria(falas, personagens, titulo){
  let f = 0;
  let htmlEl = document.querySelector('html');
  historia(personagens[f], falas[f], titulo);
  htmlEl.addEventListener('click', function(){
    f++;
    if(f !== falas.length){
      historia(personagens[f], falas[f], titulo);
    }
    else{
      window.location.replace('jogo.html');
    }
  });
}

jogador = carregar(jogador);

if(jogador != null && jogador.fase >= 0 && jogador.fase <= 6 && jogador.arma !== ""){

  /* fazer com que ao clicar no html todo passe a fala */
  let htmlEl = document.querySelector('html');

  /* Variáveis da historia */
  let falas;
  let personagens;
  let titulo;
  let f = 0;  /* Contador das falas */
  /* personagens */
  let guia = "imgs/personagens/amigo.png";
  let mago = "imgs/personagens/mago.png";
  let caraGritando = "imgs/personagens/cara-gritando.png";
  let protagonista = jogador.personagem;

  switch (jogador.fase){
    case 0:
      falas = ["Um pequeno circo chegou na minha cidade e decidi ir brincar nos brinquedos que eles trouxeram. Lá dentro eu escutei um homem gritando:",
                   "Venham todos ver o grande espetáculo no circo! Venham ver o show do grande mágico! Ele está prestes a começar.",
                   "Eu decidi assistir o espetáculo, afinal era de graça. Depois de alguns truques, o mágico disse:",
                   "Para a minha próxima mágica precisarei de um voluntário!",
                   "... ...",
                   "Ninguém respondeu. Então, ele apontou para mim e falou:",
                   "Que tal você, criança? Gostaria de participar desta mágica?",
                   "Eu senti pena do mago porque ninguém estava impressionado com suas mágicas e, então, eu me levantei e fui ajudá-lo.",
                   "Ótimo, aproxime-se. Para o meu próximo truque irei mostrar o que sou capaz de fazer. Farei essa criança desaparecer!",
                   "Aproxime-se da caixa.",
                   "Ele falou isso com uma voz séria e irritada. Eu me aproximei e, ao chegar perto, a caixa começou a brilhar então o mago disse:",
                   "in re sit fallax, in universum est hologram, emere aurum vale"]; /* 12 */
      personagens = [protagonista,
                         caraGritando,
                         protagonista,
                         mago,
                         "",
                         protagonista,
                         mago,
                         protagonista,
                         mago,
                         mago,
                         protagonista,
                         mago]; /* 12 */
      titulo = "Pequeno circo na cidade";
      mudaAmbientacao("url(imgs/fundos/lona-circo.jpg)", "musicas/musica-fundo-index.mp3");
      f = 0;
      historia(personagens[f], falas[f], titulo);
      htmlEl.addEventListener('click', function(){
        f++;
        if(f !== falas.length){
          historia(personagens[f], falas[f], titulo);
        }
        else{
          jogador.fase = jogador.fase + 1;
          salvar(jogador);
          window.location.replace("historia.html");
        }
      });
    break;

    case 1:
      falas = ["Então é assim que o mago prende pessoas aqui!",
                   "Eu não sou a primeira?",
                   "Não. Já houveram várias outras, mas todas elas conseguiram escapar. Porque, convenhamos, esse mago não é um dos melhores.",
                   "Você consegue me tirar daqui?",
                   "Eu consigo te guiar para fora, mas sinto algo diferente em você, talvez você consiga acabar com ele de uma vez por todas.",
                   "O que eu tenho que fazer?",
                   "Bem, nós temos que destruir o avatar do mago nesse mundo. Um avatar é a manifestação física dele aqui, o que o permite usar magias. Se destruirmos o avatar o mago se tornará pior do que já é.",
                   "Que tal uma prática, antes de arriscarmos nossas vidas? Acerte os balões e veremos se você é realmente capaz de enfrentar o mago.",
                   "Mas cuidado, nossa munição não é infinita e não fique parado à toa porque na hora do combate você só será um alvo fácil."]; /* 9 */
      personagens = [guia,
                         protagonista,
                         guia,
                         protagonista,
                         guia,
                         protagonista,
                         guia,
                         guia,
                         guia]; /* 9 */
      titulo = "Um Amigo Dentro da Caixa";
      mudaAmbientacao("url('imgs/fundos/fase-1.jpg')", "");
      contaHistoria(falas, personagens, titulo);
    break;

    case 2:
      falas = ["Ok, nós estamos bem próximo da cidade onde o mago apareceu pela primeira vez.",
                   "Foi lá onde ele aprendeu as suas magias e colocou o seu avatar.",
                   "Para chegarmos até ela devemos passar por essas correntes. O primeiro problema é que elas estão cheias de espectros então acho bom aquela prática com balões ter te ensinado alguma coisa.",
                   "O segundo problema é a altura, porque eu tenho muito medo de cair do alto dessa cidade. Dizem que a queda é tão longa que você não consegue prever quando está chegando no chão e morre de ansiedade antes de se espatifar todo.",
                   "Então por favor segura a minha mão porque não quero cair de jeito nenhum. ;~;"]; /* 5 */
      personagens = [guia,
                     guia,
                     guia,
                     guia,
                     guia,];
      titulo = "Correntes para a cidade";
      mudaAmbientacao("url('imgs/fundos/fase-2.jpg')", "");
      contaHistoria(falas, personagens, titulo);
    break;

    case 3:
      falas = ["Por que o mago faz isso com as pessoas?",
                   "Eu não sei. A primeira vez que ele chegou aqui foi por causa de uma das suas mágias, que deu tão errado que acabou dando certo, então o mago acabou sendo teleportado para cá.",
                   "Aqui, nós o ensinamos a usar magias pegando forças do ambiente do nosso mundo, que sempre regenera a própria mágica.",
                   "Assim ele poderia levar diversão e alegria para as pessoas do seu mundo e acabar tendo sucesso. Nós estávamos fazendo o bem para ele.",
                   "Mas assim que o mago descobriu que nosso mundo era fonte do seu poder, ele o prendeu em uma caixa e o infestou com seus espectros, querendo proteger sua fonte preciosa. O problema é que nós damos o poder dele.",
                   "Então nós reduzimos os poderes do mago, agora ele só pode prender pessoas aqui, e mesmo assim elas escapam.",
                   "Talvez seja por isso que o mago prende as pessoas, pois é a melhor coisa que ele pode mostrar para o público.",
                   "E vocês me escolheram para acabar de uma vez por todas com as maldades dele, certo?",
                   "Eu escolhi você. Meu povo julgou o mago merecedor de conhecer as magias, mas vemos que cometemos um grande erro, basta ver o que ele fez com essa região transformando-a na entrada do seu terrível circo."]; /* 9 */
      personagens = [protagonista,
                         guia,
                         guia,
                         guia,
                         guia,
                         guia,
                         guia,
                         protagonista,
                         guia];
      titulo = "O circo devastado";
      mudaAmbientacao("url('imgs/fundos/fase-3.jpg')", "");
      contaHistoria(falas, personagens, titulo);
    break;

    case 4:
      falas = ["Bem estamos dentro do circo, mais próximos do que nunca da vitória.",
                   "Olha, tenha cuidado com o guardião do avatar. O mago pode ser péssimo, mas não é tão burro.",
                   "O guardião é aquele leão. Ele protege o avatar e só pode ser derrotado assim que for o último em campo. Por isso, tome cuidado ao se aproximar dele pois ele é feroz.",
                   "E só mais uma coisa, eu tenho bastante medo dele, então, vou ficar atrás de você o tempo todo, tá bom?"];
      personagens = [guia,
                     guia,
                     guia,
                     guia,];
      titulo = "O covil do demônio";
      mudaAmbientacao("url('imgs/fundos/boss.png')", "");
      contaHistoria(falas, personagens, titulo);
    break;

    case 5:
      falas = ["Uau, não acredito que você conseguiu!",
                   "Não acredito que chegaríamos tão longe ...",
                   "Quero dizer, tipo ... não é que não acreditava em você ou achava que íamos morrer antes é que...",
                   "Eu entendi.",
                   "... Então, o avatar do mago está diretamente ligado a alma dele, ao destruí-lo ...",
                   "EU VOU MATAR O MAGO?",
                   "NÃO. Você só vai quebrar a ligação dele com esse mundo, como eu disse o avatar é a manifestação física dele aqui. Para haver corpo deve haver uma alma o avatar do mago aqui tem a alma dele, assim como você aqui tem a sua.",
                   "Então para acessar a alma dele você deve liberar a sua também. Ou seja você estará muito mais vulnerável que o normal e suscetível a ataques.",
                   "Mas você se tornou muito habilidoso nesse caminho e eu sei que você consegue desviar dos ataques dele, ok.",
                   "Você deve acertar as 4 bolas que ele tem, assim você estará atingindo os 4 vínculos dele com esse mundo.",
                   "Ao destruir os vínculos ele irá lhe atacar com várias bolas brancas e uma azul. As brancas irão te machucar, mas a azul irá parar o ataque. Além disso não fuja da região de ataque, pois ao ficar fora dela você também irá se machucar."];
      personagens = [guia,
                         guia,
                         guia,
                         protagonista,
                         guia,
                         protagonista,
                         guia,
                         guia,
                         guia,
                         guia,
                         guia];
      titulo = "Avatar Despertado";
      mudaAmbientacao("url('imgs/fundos/boss-pistola.png')", "");
      contaHistoria(falas, personagens, titulo);
    break;

    case 6:
      falas = ["Finalmente ... acabou.",
                   "Sabe, por mais que seja um novo começo, é bem triste ver um amigo partir ...",
                   "Você ajudou todo o meu povo, porém a mim, você ajudou ainda mais. Mostrou que sou capaz de superar muitos medos.",
                   "Para uma criança, você até que é bem maduro ao passar por tudo isso sem medo.",
                   "Venha nos visitar de novo mais tarde. Depois de tudo que você fez, você deveria aproveitar um tempo em nosso mundo, que está finalmente em paz.",
                   "Eu voltaria, mas não sei como?",
                   "Basta dizer as palavras do mago pensando em nosso mundo que você aparecerá aqui. Além disso o tempo passa muito mais rápido aqui, então, toda essa jornada não deve ter sido nem 1 dia em seu mundo.",
                   "EU ESTOU DESAPARECENDO?",
                   "hahaha, você está voltando para casa.",
                   "Muito obrigado por tudo ...",
                   "Adeus ... amigo. :)"];
      personagens = [guia,
                         guia,
                         guia,
                         guia,
                         guia,
                         protagonista,
                         guia,
                         protagonista,
                         guia,
                         guia,
                         guia,];
      titulo = "O Fim";
      mudaAmbientacao("url('imgs/fundos/boss-pistola.png')", "");
      f = 0;
      historia(personagens[f], falas[f], titulo);
      htmlEl.addEventListener('click', function(){
        f++;
        if(f !== falas.length){
          historia(personagens[f], falas[f], titulo);
        }
        else{
          jogador.fase = jogador.fase + 1;
          salvar(jogador);
          window.location.replace("creditos-final.html");
        }
      });
      jogador.fase = -1;
    break;
  }
}
else{
  window.location.replace('brinquedos.html');
}
