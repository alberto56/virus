function niveau1() {
  return {
    getNom: function() {
      return "Niveau 1";
    },
    asymptomatique: function(){
      return 0;
    },
    niveauSuivant: function(){
      return niveau2();
    },
    niveauPrecedent: function(){
      return false;
    },
    preparer: function(jeu) {
      // Ne rien faire, d'autres niveaux peuvent, par exemple, ajouter des
      // nouvelles fonctionalités comme des collectibles ou autres...
      creerCollectibleAvancerTemps(jeu, this);
    },
    nombredePoints: function(){
      return 66;
    },
    vies: function(){
      return 300;
    },
    instructions: function(){
      return "";
    },
    duree: function() {
      return 800;
    },
    invincibleDebut: function(){
      return 3000;
    },
    placerJoueur: function(joueur) {
      // Par exemple, joueur.placerAleatoire();
      joueur.placerCentre();
    },
    tutoriel: function(){
      return false;
    },
    infectes: function(){
      return 6;
    },
    niveauPanneau: function() {
      return false;
    },
    vitesse: function() {
      return 5;
    }

  }
}
