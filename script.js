$(document).ready(function () {
  accepterBarreEspacement();
  var jeu = creerNouveauJeu('.jeu');

  var joueur = creerPoint(jeu);
  joueur.creerNouveau();

  joueur.placerAleatoire();
  joueur.devenirJoueur();

  for (i = 0; i < 66; i++) {
    var point = creerPoint(jeu);
    point.creerNouveau();
    point.placerAleatoire();
    if (!point.infecter(4/100)) {
      point.devenirAsymptomatique(30/100);
    }
    point.choisirDestination();
    point.bouger();
  }
});

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
