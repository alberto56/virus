$(document).ready(function () {
  controlleur().commencerJeu();
});

function continuerDecompte(secondes) {
  if ((utilitaires().getInfo("temps-restant"))==(0)) {
    controlleur().continuerJeu();
    return;
  }

  if (!$('.panneau-jeu').is(":visible")) {
    return;
  }

  setTimeout(function() {
    if (!utilitaires().getEnPause()) {
      utilitaires().setInfo('temps-restant', --secondes);
    }
    continuerDecompte(secondes);
  }, 1000);
}

function accepterBarreEspacement() {
  $('body').keyup(function(e){
     if(e.keyCode == 32){
       // user has pressed space
       if (utilitaires().getEnPause()) {
         utilitaires().setEnPause(false);
         alert("Votre jeu n'est plus en pause");
       }
       else {
         utilitaires().setEnPause(true);
         alert('Votre jeu est en pause');
       }
     }
  });
}
