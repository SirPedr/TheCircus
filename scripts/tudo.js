// dá play e pause na musica quando se aperta o botão se som
musicaFundoEl = document.querySelector('#musica-fundo');
if(musicaFundoEl !== null){
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
}

/* Janela Modal */
let botaoI = document.querySelector('#exclamacao');
if(botaoI !== null){
  let divEl = document.querySelector('#div-modal');
  let mascaraEl = document.querySelector('#mascara');

  botaoI.addEventListener('click', function(){
    divEl.classList.add('aparece');
    mascaraEl.classList.add('clicavel');
  });

  mascaraEl.addEventListener('click',function(){
    divEl.classList.remove('aparece');
    mascaraEl.classList.remove('clicavel');
  });
}
