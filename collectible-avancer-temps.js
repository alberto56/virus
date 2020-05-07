function creerCollectibleAvancerTemps(jeu, niveau) {
  var objet = Object.create(creerCollectible(jeu, niveau));

  objet.activer = function() {
    console.log('bonjour')
    this.avancerTemps()
  };

  objet.avancerTemps=function(){
    utilitaires().setInfo('temps-restant', utilitaires().getInfo("temps-restant")-40);
  };

  objet.bouger($('.panneau-jeu'));

  return objet;
}
