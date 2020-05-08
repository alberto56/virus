function objectifCollectibles(niveau) {
  var objet = Object.create(objectifAbstrait(niveau));


  objet.recalculer = function() {
    var quantite = $('.panneau-jeu .collectible').length;
    utilitaires().setInfo('.collectibles-restants', quantite);
      if(quantite <= 0){
        console.log("j'ai gagné!!!");
        //this.continuerJeu();
      }
  }

  objet.activer = function() {

    $('.espace-objectif').append('<span>VOUS DEVEZ PRENDRE <span class="collectibles-restants">' + $('.panneau-jeu .collectible').length + '</span> COLLECTIBLES POUR GAGNER. </span>');
  }

  return objet;
}
