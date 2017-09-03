var layout = require('../layout/layout.module');

var home = angular
    .module('rt.home', [])
    .config(require('./home.route'))
    .controller('HomeController', require('./home.controller'));

module.exports = home;