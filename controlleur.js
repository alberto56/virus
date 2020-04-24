function controlleur() {
  return {
    commencerJeu: function() {
      this.montrerPanneau('ecran-de-bienvenue');
      accepterBarreEspacement();

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
      $('.bouton-niveau-tutoriel').click(function() {
        $('.ecran-de-bienvenue .jeu').remove();
        that.commencerNiveau(niveauTutoriel1());
      });

      for (i = 0; i < 10; ++i) {
        var point = creerPoint(jeuDeBienvenue, niveauBienvenue());
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

    montrerPanneau: function(panneau) {
      $('.panneau-jeu .jeu').remove();
      $('.panneau').hide();
      $('.' + panneau).show();
    },

    continuerJeu: function() {
      this.montrerPanneau('prochain-niveau');
      var that = this;
      $('.bouton-niveau-suivant').click(function() {
        that.commencerNiveau(niveau2());
      });
    },

    gameOver: function() {
      this.montrerPanneau('game-over');

      var that = this;
      setTimeout(function() {
        var that2 = that;
        $('.bouton-prochain-niveau').show().click(function() {
          that2.commencerNiveau(niveau1());
          $('.cache-pour-une-seconde').hide();
        });
      }, 1050);
    },

    commencerNiveau: function(niveau) {
      this.montrerPanneau('panneau-jeu');
      $('.panneau-jeu .jeu').remove();
      var jeu = creerNouveauJeu('.jeu', niveau);

      $('.panneau-jeu .instructions .texte').html(niveau.instructions());
      $('.panneau-jeu .nombre-de-vies').html(niveau.vies());
      if (niveau.tutoriel()) {
        $('.panneau-jeu .niveau-non-tutoriel').remove();
        var that = this;
        $('.retour-bienvenue').click(function() {
          $('.panneau-jeu .jeu').remove();
          that.montrerPanneau('ecran-de-bienvenue');
        });
        if (niveau.niveauPrecedent()) {
          var that = this;
          $('.panneau-jeu .tutoriel-precedent').click(function() {
            $('.panneau-jeu .jeu').remove();
            that.commencerNiveau(niveau.niveauPrecedent());
          });
        }
        else {
          $('.panneau-jeu .tutoriel-precedent').remove();
        }
        if (niveau.niveauSuivant()) {
          var that = this;
          $('.panneau-jeu .tutoriel-suivant').click(function() {
            $('.panneau-jeu .jeu').remove();
            that.commencerNiveau(niveau.niveauSuivant());
          });
        }
        else {
          $('.panneau-jeu .tutoriel-suivant').remove();
        }
      }
      else {
        $('.panneau-jeu .instructions').remove();
      }

      var joueur = creerPoint(jeu, niveau);
      joueur.creerNouveau();
      niveau.placerJoueur(joueur);
      joueur.devenirJoueur();

      for (i = 0; i < niveau.nombredePoints(); ++i) {
        var point = creerPoint(jeu, niveau);
        point.creerNouveau();
        point.placerAleatoire();
        if (i < niveau.infectes()) {
          point.infecter(100/100);
        }
        else if (i < niveau.asymptomatique()) {
          point.devenirAsymptomatique(100/100);
        }
        point.choisirDestination();
        point.bouger($('.panneau-jeu'));
      }

      if (!niveau.tutoriel()) {
        utilitaires().setInfo('temps-restant', 30);
        continuerDecompte(30);
      }
    }
  };
}
