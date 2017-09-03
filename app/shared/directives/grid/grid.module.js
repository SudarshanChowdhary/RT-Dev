var rtGrid = angular.module('rtGrid', [ ]);

require('./grid.directive.js')(rtGrid);
require('./grid.filter.js')(rtGrid);
require('./grid.sort.directive.js')(rtGrid);
require('./grid.sort.service.js')(rtGrid);
require('./grid.reorder.directive.js')(rtGrid);
require('./grid.accordion.directive.js')(rtGrid);
require('./grid.pagination.directive.js')(rtGrid);
require('./grid.a11y.directive.js')(rtGrid);

module.exports = rtGrid;
