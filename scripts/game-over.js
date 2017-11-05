let tempo = 60;

function reduzContador(){
  let contador = document.querySelector('#contador');

  tempo = tempo - 1;
  contador.innerHTML = tempo;
  if(tempo === 0){
    window.location.replace("index.html");
  }
}

setInterval(function(){reduzContador()}, 1000);
