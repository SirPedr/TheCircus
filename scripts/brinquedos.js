var jogador = {
  fase: 0,
  personagem: "",
  arma: "",
  inimigosMortos: 0,
  vida: 15,
  danoBoss: 0,
  bolasDestuidas: 0,
  clicks: 100,
  parado: 15,
  tempo: 200
};

function apareceDivModal(texto){
  let descricao = document.createElement('p');
  let divModalEl = document.querySelector('#div-modal');
  let mascara = document.querySelector('#mascara');
  if(divModalEl.classList.toggle('aparece')){
    mascara.classList.add('clicavel');
    divModalEl.innerHTML = "";
    descricao.innerHTML = texto;
    divModalEl.appendChild(descricao);
  }
}

/* escolha do personagem */
let avatares = document.querySelectorAll('.imgs-personagens');

for(let avatarEl of avatares){
  avatarEl.addEventListener('click', function(e){
    let escolhidoEl = e.currentTarget;
    jogador.personagem = "" + escolhidoEl.src;
    localStorage.setItem('save', JSON.stringify(jogador));
    apareceDivModal("Avatar escolhido. Não se esqueça de escolher o brinquedo.");
  });
}

/* texto ao escolher a arma */
let opcoes = document.querySelectorAll('.opcoes-menu');
let textos = document.querySelector('.descricoes');
let mascara = document.querySelector('#mascara');

mascara.addEventListener('click',function(){
      divEl.classList.remove('aparece');
      mascara.classList.remove('clicavel');
});

for(let opcao of opcoes){
  opcao.addEventListener('click', function(e){
      jogador.arma = e.currentTarget.dataset.arma;
      localStorage.setItem('save', JSON.stringify(jogador));
      if(jogador.arma == "pistola"){
        apareceDivModal("algo mais tradicional . . . muito bem!");
      }
      else if(jogador.arma == "metralhadora"){
        apareceDivModal("Você não quer pensar muito para onde atira, não é mesmo?");
      }
      else{
        apareceDivModal("Você realmente tem a destreza para usar essas espadas?");
      }
  });
}
