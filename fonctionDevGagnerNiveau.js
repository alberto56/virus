function fonctionDevGagnerNiveau(niveau) {
  var objet = Object.create(fonctionDevAbstrait());

  objet.etiquetteBouton = function() {
    return "Gagner niveau";
  };

  objet.action = function() {
    alert('Gagner niveau');
  };

  return objet;
}
