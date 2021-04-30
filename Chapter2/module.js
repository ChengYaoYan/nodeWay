const require = require("./commonjs.js");

const dependency = require('./module2');

function log() {
    console.log(`Well done ${dependency.username}`);
}

module.exports.run = () => {
    log()
};