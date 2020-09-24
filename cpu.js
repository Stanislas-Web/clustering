const OS = require('os');

const coeurs = OS.cpus();
console.log(coeurs.length);