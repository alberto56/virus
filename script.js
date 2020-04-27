$(document).ready(function () {
  ControlleurFactory.instance().commencerJeu();
});

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
