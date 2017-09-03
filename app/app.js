// global dependencies
$ = jQuery = require('jquery');
var angular = require('angular');
require('jquery-ui');
//require('angular-sanitize');
// external or vendor dependencies
require('bootstrap-sass/assets/javascripts/bootstrap');
require('angular-ui-bootstrap');
require('angular-ui-router');
// require('angular-sanitize');
require('ui-select');
require('angular-messages');
// application modules
var layout = require('./layout/layout.module');
var home = require('./home/home.module');
var shared = require('./shared/shared.module');
var repository = require('./repository/repository.module');
var tickets = require('./tickets/tickets.module');
var process = require('./process/process.module');
var team = require('./team/team.module');
var angGrid = require('./shared/directives/grid/grid.module');
var defects = require('./defects/defects.module');
var admin = require('./admin/admin.module');
var angBreadCrumb = require('./shared/breadcrumb/angular-breadcrumb.js');
var reports = require('./reports/reports.module');
var search = require('./search/search.module');
var error = require('./error/error.module');
angular
// application top level module
    .module('rt', [
        // external modules
        'ui.router', 'ui.bootstrap', 'ui.select', 'ncy-angular-breadcrumb',
        // application modules
        home.name,
        layout.name,
        repository.name,
        tickets.name,
        process.name,
        team.name,
        shared.name,
        angGrid.name,
        defects.name,
        admin.name,
        reports.name,
        search.name,
        error.name
    ])
    // configure application routing (root state)
    .config(require('./app.route.js'))
    // configure application breadcrumb options
    .config(function($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
          prefixStateName: 'home',
          template: 'bootstrap3'
        });
      })
    .run(require('./app.run.js')); 
    