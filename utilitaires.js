function utilitaires() {
  return {
    mapKeycodeDir: function(code) {
      switch (code) {
        case 39:
          return 'right';
        case 37:
          return 'left';
        case 38:
          return 'up';
        case 40:
          return 'down';
        default:
          return '';
      }
    },

    bougerVers: function(start, dest, vitesse) {
      if (dest > start) {
        return start + Math.min(vitesse, dest - start);
      }
      else if (dest < start) {
        return start + Math.max(vitesse * -1, dest - start);
      }
      else {
        return start;
      }
    },

    obstacleEntrePoints: function(depart, arrivee, pos_obstacle) {
      if (depart.x == arrivee.x && depart.y == arrivee.y) {
        return false;
      }

      // Voir
      // https://stackoverflow.com/questions/11907947/how-to-check-if-a-point-lies-on-a-line-between-2-other-points

      var dxc = pos_obstacle.x - depart.x;
      var dyc = pos_obstacle.y - depart.y;

      var dxl = arrivee.x - depart.x;
      var dyl = arrivee.y - depart.y;

      cross = dxc * dyl - dyc * dxl;

      if (cross != 0) {
        // on n'est pas sur la même ligne.
        return false;
      }

      return this.chiffreEntreDeuxChiffres(depart.x, arrivee.x, pos_obstacle.x) && this.chiffreEntreDeuxChiffres(depart.y, arrivee.y, pos_obstacle.y);
    },

    // Par exemple, si
    // départ est {x: 1077, y: 155}
    // arrivée est {x: 1127, y: 155}
    // et x est 1110
    // je m'attends à la réponse 155.
    yCorrespondantAX: function(depart, arrivee, x) {
      if (arrivee.x == depart.x) {
        throw "impossible"
      }

      if (depart.y == arrivee.y) {
        return depart.y;
      }

      // par exemple, r = 1077 + 0.
      var r = Math.min(depart.x, arrivee.x) + (Math.abs(arrivee.y - depart.y) * (x - Math.min(depart.x, arrivee.x)) / Math.abs(arrivee.x - depart.x));
      // console.log(r);
      return r;
    },

    obstacleBloqueChemin: function (dep_x, dep_y, arr_x, arr_y, obst_top, obst_bottom, obst_left, obst_right) {

      if (obst_right < obst_left || obst_top < obst_bottom) {

        return false;
      }
      if (obst_right < Math.min(dep_x, arr_x) || obst_left > Math.max(dep_x, arr_x)) {

        return false;
      }
      if (obst_top < Math.min(dep_y, arr_y) || obst_bottom > Math.max(dep_y, arr_y)) {

        return false;
      }
      // Trouver l'intersection avec le bottom
      // si x est le bottom, c'est quoi le y?
      if (dep_y !== arr_y) {
        var x = this.yCorrespondantAX({x: dep_y, y: dep_x}, {x: arr_y, y: arr_x}, obst_bottom);

        if (this.chiffreEntreDeuxChiffres(obst_left, obst_right, x)) {
          return true;
        }

        var x = this.yCorrespondantAX({x: dep_y, y: dep_x}, {x: arr_y, y: arr_x}, obst_top);
        if (this.chiffreEntreDeuxChiffres(obst_left, obst_right, x)) {
          return true;
        }
      }

      if (dep_x !== arr_x) {
        // Par exemple, pour 1077, 155, 1127, 155, avec 1110, je m'attends à
        // la reponse 155.
        var y = this.yCorrespondantAX({x: dep_x, y: dep_y}, {x: arr_x, y: arr_y}, obst_left);

        if (this.chiffreEntreDeuxChiffres(obst_top, obst_bottom, y)) {
          return true;
        }

        var y = this.yCorrespondantAX({x: dep_x, y: dep_y}, {x: arr_x, y: arr_y}, obst_right);
        if (this.chiffreEntreDeuxChiffres(obst_top, obst_bottom, y)) {
          return true;
        }
      }

      return false;
    },

    chiffreEntreDeuxChiffres: function (depart, arrivee, obstacle) {
      return obstacle >= Math.min(depart, arrivee) && obstacle <= Math.max(depart, arrivee);
    },

    trouverVoisins: function(top, left, rayon, identifiant = '.point[data-infecte=non]') {
      return $('.panneau-jeu ' + identifiant).filter(function() {
        return $(this).position().top <= top + rayon &&
          $(this).position().top >= top - rayon &&
          $(this).position().left <= left + rayon &&
          $(this).position().left >= left - rayon;
      });
    },

    getEnPause: function() {
      return $('body').attr('data-en-pause') == 'oui' ? true : false;
    },

    setEnPause: function(pause) {
      $('body').attr('data-en-pause', pause ? 'oui' : 'non');
    },

    getInfo: function(parametre) {
      return $('.infos .' + parametre).html();
    },

    // afficher une information
    // parametre: le nom de la classe, sans point, par exemple:
    // "collectibles-restants".
    setInfo: function(parametre, valeur) {
      return $('.infos .' + parametre).html(valeur);
    }
  }
}

// Required for unit tests.
if (typeof module !== "undefined") {
  module.exports = {
    utilitaires: utilitaires
  }
}
