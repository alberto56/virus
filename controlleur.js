function controlleur(jeu) {
  return {
    commencerJeu: function() {
      utilitaires().montrerPanneau('ecran-de-bienvenue');

      var jeu = creerNouveauJeu('.jeu', '.ecran-de-bienvenue');

      $('.ecran-de-bienvenue .jeu .infos').remove();
      $('.ecran-de-bienvenue .jeu').css('background', 'none');

      that = this;
      $('.bouton-prochain-niveau').click(function() {
        that.commencerNiveau();
      });

      for (i = 0; i < 10; ++i) {
        var point = creerPoint(jeu);
        point.creerNouveau();
        point.objet.css('height', '52px');
        point.objet.css('width', '52px');
        point.objet.css('background', 'none');
        point.objet.css('background-image', 'url(images/virus-rose.png)');
        point.objet.attr('data-vitesse', 1);
        point.placerAleatoire();
        point.choisirDestination();
        point.bouger();
      }
    },

    gameOver: function() {
      $('.panneau-jeu .jeu').remove();
      utilitaires().montrerPanneau('game-over');

      that = this;
      $('.bouton-prochain-niveau').click(function() {
        that.commencerNiveau();
      });
    },

    commencerNiveau: function() {
      utilitaires().montrerPanneau('panneau-jeu');
      accepterBarreEspacement();
      var jeu = creerNouveauJeu('.jeu');

      var joueur = creerPoint(jeu);
      joueur.creerNouveau();

      joueur.placerAleatoire();
      joueur.devenirJoueur();

      for (i = 0; i < 66; ++i) {
        var point = creerPoint(jeu);
        point.creerNouveau();
        point.placerAleatoire();
        if (i < 6) {
          point.infecter(100/100);
        }
        else if (i < 30) {
          point.devenirAsymptomatique(100/100);
        }
        point.choisirDestination();
        point.bouger();
      }

      utilitaires().setInfo('temps-restant', 15);
      continuerDecompte(15);
    }
  };
}
