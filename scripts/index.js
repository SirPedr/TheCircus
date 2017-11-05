let jogarEl = document.querySelector('#jogar');
let divPaiEl = document.querySelector('#opcoes');
let BodyEl = document.querySelector('body')

jogarEl.addEventListener('click',function(){
    divPaiEl.innerHTML = '';

    let campanhaEl = document.createElement('span');
    campanhaEl.innerHTML = '<a href="historia.html">Campanha</a>';
    campanhaEl.classList.add('opcoes-menu');
    divPaiEl.appendChild(campanhaEl);


    let criarFaseEl = document.createElement('span');
    criarFaseEl.innerHTML = '<a href="criar-fase.html">Criar Fase</a>';
    criarFaseEl.classList.add('opcoes-menu');
    divPaiEl.appendChild(criarFaseEl);

    let voltarEl = document.createElement('span');
    voltarEl.innerHTML = '<a href="index.html">Voltar</a>';
    voltarEl.classList.add('voltar');
    BodyEl.appendChild(voltarEl);
});
