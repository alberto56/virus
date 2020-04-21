function controlleur() {
  return {
    commencerJeu: function() {
      utilitaires().montrerPanneau('ecran-de-bienvenue');

      var jeuDeBienvenue = creerNouveauJeu('.jeu', {
        getNom: function() {
          return 'Bienvenue';
        }
      }, '.ecran-de-bienvenue');

      $('.ecran-de-bienvenue .jeu .infos').remove();
      $('.ecran-de-bienvenue .jeu').css('background', 'none');

      var that = this;
      $('.bouton-prochain-niveau').click(function() {
        $('.ecran-de-bienvenue .jeu').remove();
        that.commencerNiveau(niveau1());
      });

      for (i = 0; i < 10; ++i) {
        var point = creerPoint(jeuDeBienvenue);
        point.creerNouveau();
        point.objet.css('height', '52px');
        point.objet.css('width', '52px');
        point.objet.css('background', 'none');
        point.objet.css('background-image', 'url(images/virus-rose.png)');
        point.objet.attr('data-vitesse', 1);
        point.placerAleatoire();
        point.choisirDestination();
        point.bouger($('.ecran-de-bienvenue'));
      }
    },

    continuerJeu: function() {
      $('.panneau-jeu .jeu').remove();
      utilitaires().montrerPanneau('prochain-niveau');
      var that = this;
      $('.bouton-niveau-suivant').click(function() {
        that.commencerNiveau(niveau2());
      });
    },

    gameOver: function() {
      $('.panneau-jeu .jeu').remove();
      utilitaires().montrerPanneau('game-over');

      var that = this;
      $('.bouton-prochain-niveau').click(function() {
        that.commencerNiveau();
      });
    },

    commencerNiveau: function(niveau) {
      utilitaires().montrerPanneau('panneau-jeu');
      accepterBarreEspacement();
      $('.panneau-jeu .jeu').remove();
      var jeu = creerNouveauJeu('.jeu', niveau);

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
        else if (i < niveau.asymptomatique()) {
          point.devenirAsymptomatique(100/100);
        }
        point.choisirDestination();
        point.bouger($('.panneau-jeu'));
      }

      utilitaires().setInfo('temps-restant', 30);
      continuerDecompte(30);
    }
  };
}
