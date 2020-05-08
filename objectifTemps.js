function objectifTemps(niveau) {
  var objet = Object.create(objectifAbstrait(niveau));

  // Continuer le décompte en retirant un certain nombre de secondes
  // et en faisant la même chose une seconde plus.
  // Par exemple, continuerDecompte(2), si le décompte est actuellement
  // à 10, va initier un décompte qui fera 10...8...6... etc.
  //
  // secondes: le nombre de secondes à retirer chaque seconde jusqu'à la
  // fin du jeu, par exemple 1.
  objet.continuerDecompte = function(secondes) {
    var temps_restant_actuel=utilitaires().getInfo("temps-restant");
    if (temps_restant_actuel <= 0) {
      this.continuerJeu();
      return;
    }

    if (!$('.panneau-jeu').is(":visible")) {
      return;
    }

    var that = this;
    setTimeout(function() {
      if (!utilitaires().getEnPause()) {
        utilitaires().setInfo('temps-restant', utilitaires().getInfo("temps-restant")-secondes);
      }
      that.continuerDecompte(secondes);
    }, 1000);
  },

  objet.activer = function() {
    utilitaires().setInfo('temps-restant', this.niveau.duree());
    this.continuerDecompte(1);

    $('.espace-objectif').append('<span>IL VOUS RESTE <span class="temps-restant">' + this.niveau.duree() + '</span> SECONDES. </span>');
  }

  return objet;
}
