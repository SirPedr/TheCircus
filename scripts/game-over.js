let tempo = 60;

setInterval(function(){
  let contador = document.querySelector('#contador');

  tempo = tempo - 1;
  contador.innerHTML = tempo;
  if(tempo === 0){
    window.location.replace("index.html");
  }
}, 1000);
