// console.log(arguments);
// console.log(require('module').wrapper);

//[Option] - module.exports 
const C = require('./test-module-1');
const calci_1 = new C();
console.log(calci_1.add(2,7));

//[Option] - exports
const C1 = require('./test-module-2');
const {add,multiply} = require('./test-module-2');
console.log('Addition', C1.add(2,90));
console.log('Multiply', multiply(2,90));
console.log('Addition 2', add(2,90));

//Caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();