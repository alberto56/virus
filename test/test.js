import test from 'ava'

const my = require("/mycode/utilitaires.js")

test('fonction bougerVers() test', t => {
  t.true(my.utilitaires().bougerVers(2, 100, 18) == 20);
  t.true(my.utilitaires().bougerVers(540, 1000, 20) == 560);
  t.true(my.utilitaires().bougerVers(0, 100, 1) == 1);
  t.true(my.utilitaires().bougerVers(100, 80, 2) == 98);
})
