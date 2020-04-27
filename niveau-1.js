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
    nombredePoints: function(){
      return 66;
    },
    vies: function(){
      return 3;
    },
    instructions: function(){
      return "";
    },
    duree: function() {
      return 30;
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
    }
  }
}
