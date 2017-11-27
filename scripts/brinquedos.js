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
    for(let avatarElAux of avatares){
      avatarElAux.classList.remove('escolhida');
    }
    escolhidoEl.classList.add('escolhida');
    jogador.personagem = "" + escolhidoEl.src;
    salvar(jogador);
    apareceDivModal("Avatar escolhido. Não se esqueça de escolher o brinquedo.");
  });
}

/* texto ao escolher a arma */
let opcoes = document.querySelectorAll('.opcoes-menu');
let textos = document.querySelector('.descricoes');
let mascara = document.querySelector('#mascara');

for(let opcao of opcoes){
  opcao.addEventListener('click', function(e){
      jogador.arma = e.currentTarget.dataset.arma;
      for(let aux of opcoes){
        aux.style.borderColor = "white";
      }
      e.currentTarget.style.borderColor = "green";
      salvar(jogador);
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
