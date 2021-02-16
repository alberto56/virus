function fonctionDevPerdreNiveau(niveau) {
  var objet = Object.create(fonctionDevAbstrait());

  objet.etiquetteBouton = function() {
    return "Perdre niveau";
  };

  objet.action = function() {
    alert('Perdre niveau');
  };

  return objet;
}
