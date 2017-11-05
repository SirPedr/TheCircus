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
  tempo: 200 /* tempo ate o fim da fase */
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

  divModalEl.classList.add('aparece');
  mascaraEl.classList.add('clicavel');
  mascaraEl.addEventListener('click',function(){
      divModalEl.classList.remove('aparece');
      mascaraEl.classList.remove('clicavel');
  });
}

/* personagens */
let guia = "imgs/personagens/amigo.png";
let mago = "imgs/personagens/mago.png";
let caraGritando = "imgs/personagens/cara-gritando.png";
jogador = carregar(jogador);
if(jogador === null){
  window.location.replace('brinquedos.html');
}
let protagonista = jogador.personagem;

function historiaFase0(){
  let titulo = "Pequeno circo na cidade";
  let mascaraEl = document.querySelector('#mascara');
  historia(protagonista, "Um pequeno circo chegou na minha cidade e decidi ir brincar nos brinquedos que eles trouxeram. Lá dentro eu escutei um homem gritando:", titulo);
    mascaraEl.addEventListener('click', function(){
      historia(caraGritando, "Venham todos ver o grande espetáculo no circo! Venham ver o show do grande mágico! Ele está prestes a começar.", titulo);
      mascaraEl.addEventListener('click', function(){
        historia(protagonista, "Eu decidi assistir o espetáculo, afinal era de graça. Depois de alguns truques, o mágico disse:", titulo);
          mascaraEl.addEventListener('click', function(){
            historia(mago, "Para a minha próxima mágica precisarei de um voluntário!", titulo);
            mascaraEl.addEventListener('click', function(){
              historia("", "... ...", titulo);
              mascaraEl.addEventListener('click', function(){
                historia(protagonista, "Ninguém respondeu. Então, ele apontou para mim e falou:", titulo);
                mascaraEl.addEventListener('click', function(){
                  historia(mago, "Que tal você, criança? Gostaria de participar desta mágica?", titulo);
                  mascaraEl.addEventListener('click', function(){
                    historia(protagonista, "Eu senti pena do mago porque ninguém estava impressionado com suas mágicas e, então, eu me levantei e fui ajudá-lo.", titulo);
                    mascaraEl.addEventListener('click', function(){
                      historia(mago, "Ótimo, aproxime-se. Para o meu próximo truque irei mostrar o que sou capaz de fazer. Farei essa criança desaparecer!", titulo);
                      mascaraEl.addEventListener('click', function(){
                        historia(mago, "Aproxime-se da caixa.", titulo);
                        mascaraEl.addEventListener('click', function(){
                          historia(protagonista, "Ele falou isso com uma voz séria e irritada. Eu me aproximei e, ao chegar perto, a caixa começou a brilhar então o mago disse:", titulo);
                          mascaraEl.addEventListener('click', function(){
                            historia(mago, "in re sit fallax, in universum est hologram, emere aurum vale", titulo);
                            mascaraEl.addEventListener('click', function(){
                              jogador.fase = jogador.fase + 1;
                              salvar(jogador);
                              window.location.replace("historia.html");
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
}

function historiaFase1(){
  let titulo = "Um Amigo Dentro da Caixa";
  let mascaraEl = document.querySelector('#mascara');
  historia(guia, "Então é assim que o mago prende pessoas aqui!", titulo);
  mascaraEl.addEventListener('click', function(){
    historia(protagonista, "Eu não sou a primeira?", titulo);
    mascaraEl.addEventListener('click', function(){
      historia(guia, "Não. Já houveram várias outras, mas todas elas conseguiram escapar. Porque, convenhamos, esse mago não é um dos melhores.", titulo);
      mascaraEl.addEventListener('click', function(){
        historia(protagonista, "Você consegue me tirar daqui?", titulo);
        mascaraEl.addEventListener('click', function(){
          historia(guia, "Eu consigo te guiar para fora, mas sinto algo diferente em você, talvez você consiga acabar com ele de uma vez por todas.", titulo);
          mascaraEl.addEventListener('click', function(){
            historia(protagonista, "O que eu tenho que fazer?", titulo);
            mascaraEl.addEventListener('click', function(){
              historia(guia, "Bem, nós temos que destruir o avatar do mago nesse mundo. Um avatar é a manifestação física dele aqui, o que o permite usar magias. Se destruirmos o avatar o mago se tornará pior do que já é.", titulo);
              mascaraEl.addEventListener('click', function(){
                historia(guia, "Que tal uma prática, antes de arriscarmos nossas vidas? Acerte os balões e veremos se você é realmente capaz de enfrentar o mago.", titulo);
                mascaraEl.addEventListener('click', function(){
                  historia(guia, "Mas cuidado, nossa munição não é infinita e não fique parado à toa porque na hora do combate você só será um alvo fácil.", titulo);
                  mascaraEl.addEventListener('click', function(){
                    window.location.replace('jogo.html');
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function historiaFase2(){
  let titulo = "Correntes para a cidade";
  let mascaraEl = document.querySelector('#mascara');
  historia(guia, "Ok, nós estamos bem próximo da cidade onde o mago apareceu pela primeira vez.", titulo);
  mascaraEl.addEventListener('click', function(){
    historia(guia, "Foi lá onde ele aprendeu as suas magias e colocou o seu avatar.", titulo);
    mascaraEl.addEventListener('click', function(){
      historia(guia, "Para chegarmos até ela devemos passar por essas correntes. O primeiro problema é que elas estão cheias de espectros então acho bom aquela prática com balões ter te ensinado alguma coisa.", titulo);
      mascaraEl.addEventListener('click', function(){
        historia(guia, "O segundo problema é a altura, porque eu tenho muito medo de cair do alto dessa cidade. Dizem que a queda é tão longa que você não consegue prever quando está chegando no chão e morre de ansiedade antes de se espatifar todo.", titulo);
        mascaraEl.addEventListener('click', function(){
          historia(guia, "Então por favor segura a minha mão porque não quero cair de jeito nenhum. ;~;", titulo);
          mascaraEl.addEventListener('click', function(){
            window.location.replace('jogo.html');
          });
        });
      });
    });
  });
}

function historiaFase3(){
  let titulo = "O circo devastado";
  let mascaraEl = document.querySelector('#mascara');
  historia(protagonista, "Por que o mago faz isso com as pessoas?", titulo);
  mascaraEl.addEventListener('click', function(){
    historia(guia, "Eu não sei. A primeira vez que ele chegou aqui foi por causa de uma das suas mágias, que deu tão errado que acabou dando certo, então o mago acabou sendo teleportado para cá.", titulo);
    mascaraEl.addEventListener('click', function(){
      historia(guia, "Aqui, nós o ensinamos a usar magias pegando forças do ambiente do nosso mundo, que sempre regenera a própria mágica.", titulo);
      mascaraEl.addEventListener('click', function(){
        historia(guia, "Assim ele poderia levar diversão e alegria para as pessoas do seu mundo e acabar tendo sucesso. Nós estávamos fazendo o bem para ele.", titulo);
        mascaraEl.addEventListener('click', function(){
          historia(guia, "Mas assim que o mago descobriu que nosso mundo era fonte do seu poder, ele o prendeu em uma caixa e o infestou com seus espectros, querendo proteger sua fonte preciosa. O problema é que nós damos o poder dele.", titulo);
          mascaraEl.addEventListener('click', function(){
            historia(guia, "Então nós reduzimos os poderes do mago, agora ele só pode prender pessoas aqui, e mesmo assim elas escapam.", titulo);
            mascaraEl.addEventListener('click', function(){
              historia(guia, "Talvez seja por isso que o mago prende as pessoas, pois é a melhor coisa que ele pode mostrar para o público.", titulo);
              mascaraEl.addEventListener('click', function(){
                historia(protagonista, "E vocês me escolheram para acabar de uma vez por todas com as maldades dele, certo?", titulo);
                mascaraEl.addEventListener('click', function(){
                  historia(guia, "Eu escolhi você. Meu povo julgou o mago merecedor de conhecer as magias, mas vemos que cometemos um grande erro, basta ver o que ele fez com essa região transformando-a na entrada do seu terrível circo.", titulo);
                  mascaraEl.addEventListener('click', function(){
                      window.location.replace('jogo.html');
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function historiaFase4(){
  let titulo = "O covil do demônio";
  let mascaraEl = document.querySelector('#mascara');
  historia(guia, "Bem estamos dentro do circo, mais próximos do que nunca da vitória.", titulo);
  mascaraEl.addEventListener('click', function(){
    historia(guia, "Olha, tenha cuidado com o guardião do avatar. O mago pode ser péssimo, mas não é tão burro.", titulo);
    mascaraEl.addEventListener('click', function(){
      historia(guia, "O guardião é aquele leão. Ele protege o avatar e só pode ser derrotado assim que for o último em campo. Por isso, tome cuidado ao se aproximar dele pois ele é feroz.", titulo);
      mascaraEl.addEventListener('click', function(){
        historia(guia, "E só mais uma coisa, eu tenho bastante medo dele, então, vou ficar atrás de você o tempo todo, tá bom?", titulo);
        mascaraEl.addEventListener('click', function(){
          window.location.replace('jogo.html');
        });
      });
    });
  });
}

function historiaFase5(){
  let titulo = "Avatar Despertado";
  let mascaraEl = document.querySelector('#mascara');
  historia(guia, "Uau, não acredito que você conseguiu!", titulo);
  mascaraEl.addEventListener('click', function(){
    historia(guia, "Não acredito que chegaríamos tão longe ...", titulo);
    mascaraEl.addEventListener('click', function(){
      historia(guia, "Quero dizer, tipo ... não é que não acreditava em você ou achava que íamos morrer antes é que...", titulo);
      mascaraEl.addEventListener('click', function(){
        historia(protagonista, "Eu entendi.", titulo);
        mascaraEl.addEventListener('click', function(){
          historia(guia, "... Então, o avatar do mago está diretamente ligado a alma dele, ao destruí-lo ...", titulo);
          mascaraEl.addEventListener('click', function(){
            historia(protagonista, "EU VOU MATAR O MAGO?", titulo);
            mascaraEl.addEventListener('click', function(){
              historia(guia, "NÃO. Você só vai quebrar a ligação dele com esse mundo, como eu disse o avatar é a manifestação física dele aqui. Para haver corpo deve haver uma alma o avatar do mago aqui tem a alma dele, assim como você aqui tem a sua.", titulo);
              mascaraEl.addEventListener('click', function(){
                historia(guia, "Então para acessar a alma dele você deve liberar a sua também. Ou seja você estará muito mais vulnerável que o normal e suscetível a ataques.", titulo);
                mascaraEl.addEventListener('click', function(){
                  historia(guia, "Mas você se tornou muito habilidoso nesse caminho e eu sei que você consegue desviar dos ataques dele, ok.", titulo);
                  mascaraEl.addEventListener('click', function(){
                    historia(guia, "Você deve acertar as 4 bolas que ele tem, assim você estará atingindo os 4 vínculos dele com esse mundo.", titulo);
                    mascaraEl.addEventListener('click', function(){
                      historia(guia, "Ao destruir os vínculos a alma dele se mostrá. Ela é uma bola azul, basta encostar nela que o ataque do mago irá acabar. Além disso não fuja da região de ataque, pois ao ficar fora dela você irá se machucar.", titulo);
                      mascaraEl.addEventListener('click', function(){
                        window.location.replace('jogo.html');
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function historiaFase6(){
  let titulo = "O Fim";
  let mascaraEl = document.querySelector('#mascara');
  historia(guia, "Finalmente ... acabou.", titulo);
  mascaraEl.addEventListener('click', function(){
    historia(guia, "Sabe, por mais que seja um novo começo, é bem triste ver um amigo partir ...", titulo);
    mascaraEl.addEventListener('click', function(){
      historia(guia, "Você ajudou todo o meu povo, porém a mim, você ajudou ainda mais. Mostrou que sou capaz de superar muitos medos.", titulo);
      mascaraEl.addEventListener('click', function(){
        historia(guia, "Para uma criança, você até que é bem maduro ao passar por tudo isso sem medo.", titulo);
        mascaraEl.addEventListener('click', function(){
          historia(guia, "Venha nos visitar de novo mais tarde. Depois de tudo que você fez, você deveria aproveitar um tempo em nosso mundo, que está finalmente em paz.", titulo);
          mascaraEl.addEventListener('click', function(){
            historia(protagonista, "Eu voltaria, mas não sei como?", titulo);
            mascaraEl.addEventListener('click', function(){
              historia(guia, "Basta dizer as palavras do mago pensando em nosso mundo que você aparecerá aqui. Além disso o tempo passa muito mais rápido aqui, então, toda essa jornada não deve ter sido nem 1 dia em seu mundo.", titulo);
              mascaraEl.addEventListener('click', function(){
                historia(protagonista, "EU ESTOU DESAPARECENDO?", titulo);
                mascaraEl.addEventListener('click', function(){
                  historia(guia, "hahaha, você está voltando para casa.", titulo);
                  mascaraEl.addEventListener('click', function(){
                    historia(guia, "Muito obrigado por tudo ...", titulo);
                    mascaraEl.addEventListener('click', function(){
                      historia(guia, "Adeus ... amigo. :)", titulo);
                      mascaraEl.addEventListener('click', function(){
                        jogador.fase = jogador.fase + 1;
                        salvar(jogador);
                        window.location.replace("creditos-final.html");
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

// dá play e pause na musica quando se aperta o botão se som

let musicaFundoEl = document.querySelector('#musica-fundo');
let somEl = document.querySelector('#som');
let i = 0;

somEl.addEventListener('click',function(){
  i++;
  if (i%2 == 0 ) {
    musicaFundoEl.play();
    somEl.src = "imgs/icones/som.png"
  }else {
    musicaFundoEl.pause();
    somEl.src = "imgs/icones/mudo.png";
  }
});

jogador = carregar(jogador);

if(jogador != null && jogador.fase >= 0 && jogador.fase <= 6){
  switch (jogador.fase){
    case 0:
      mudaAmbientacao("url(imgs/fundos/lona-circo.jpg)", "musicas/musica-fundo-index.mp3");
      historiaFase0();
    break;

    case 1:
      mudaAmbientacao("url('imgs/fundos/fase-1.jpg')", "");
      historiaFase1();
    break;

    case 2:
      mudaAmbientacao("url('imgs/fundos/fase-2.jpg')", "");
      historiaFase2();
    break;

    case 3:
      mudaAmbientacao("url('imgs/fundos/fase-3.jpg')", "");
      historiaFase3();
    break;

    case 4:
      mudaAmbientacao("url('imgs/fundos/boss.png')", "");
      historiaFase4();
    break;

    case 5:
      mudaAmbientacao("url('imgs/fundos/boss-pistola.png')", "");
      historiaFase5();
    break;

    case 6:
      mudaAmbientacao("url('imgs/fundos/boss-pistola.png')", "");
      historiaFase6();
      jogador.fase = -1;
    break;
  }
}
else{
  window.location.replace('brinquedos.html');
}
