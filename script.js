$(document).ready(function () {
  controlleur().commencerJeu();
});

function continuerDecompte(secondes) {
  if ((utilitaires().getInfo("temps-restant"))==(0)) {
    controlleur().continuerJeu();
    return;
  }

  setTimeout(function() {
    utilitaires().setInfo('temps-restant', --secondes);

    continuerDecompte(secondes);
  }, 1000);
}

function accepterBarreEspacement() {
  $('body').keyup(function(e){
     if(e.keyCode == 32){
       // user has pressed space
       if ($('.point').attr('data-vitesse') == "0") {
         $('.point').attr('data-vitesse', 5);
         alert("Votre jeu n'est plus en pause");
       }
       else {
         $('.point').attr('data-vitesse', 0);
         alert('Votre jeu est en pause');
       }
     }
  });
}
