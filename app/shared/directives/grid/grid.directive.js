module.exports = function(app) {

    'use strict';

    app.directive('rtGrid', ['$parse', '$compile',
            '$templateCache', '$templateRequest', '$http', '$timeout', 'gridSortComparator',
            function($parse, $compile, $templateCache, $templateRequest, $http, $timeout, gridSortComparator) {
                return {
                    restrict: 'EA',
                    scope: {
                        data: '=',
                        columns: '=',
                        gridOptions: '=',
                        itemRenderers: '=',
                        onApplyFilter: '&',
                        onSelectRow: '&'
                    },
                    bindToController: true,
                    controllerAs: 'grid',
                    transclude: false,
                    templateUrl: 'app/shared/directives/grid/grid.tpl.html',
                    controller: function($scope, $element, $parse, $filter, $attrs) {
                        var vm = this;
                        vm.currentPage = 1;
                        vm.morePageCount = 0;
                        vm.totalPages = 1;
                        vm.hasItemsToLoad = true;
                        vm.itemsPerPages = [10, 25, 50, 100];
                        vm.itemsByPage = NaN; //default 5;
                        vm.filteredResult = [];

                        var displayGetter = $parse('data');
                        var displaySetter = displayGetter.assign;
                        var filter = $filter('filter');
                        var orderBy = $filter('orderBy');
                        var genericFilter = $filter('gridGenericFilter');
                        var dataOptions = $element.data();
                        var defaultDataOptions = {
                            ascendingOrder: "ascending order",
                            collapsed: "Show details",
                            descendingOrder: "descending order",
                            expanded: "Hide details",
                            nodata: "No data"
                        };

                        dataOptions = angular.extend(defaultDataOptions, dataOptions);

                        var sortingParams = {
                            reverse: true,
                            dataField: ''
                        };

                        var defaultGridOptions = {
                            initialized: false,
                            isSelectable: true,
                            rowClass: '',
                            bindWay: 2,
                            tableId: $element.attr('id') || 'rt-grid',
                            collapsibleId: 'tbl-collspse',
                            _accordionRowTemplateUrl: 'tableAccordionRow-tpl.html',
                            rowTemplateUrl: 'defaultTableRowTemplate-tpl.html',
                            _rowTemplateUrl: 'defaultTableRowTemplate-tpl.html',
                            simpleGridRowTemplateUrl: 'defaultSimpleTableRowTemplate-tpl.html',
                            selectedItem: vm.selectedItem,
                            onRowSelect: onRowSelect,
                            dataOptions: dataOptions,
                            enablePagination: false,
                            // Expose this value to business controller
                            pagination: {
                                offset: 1,
                                itemsByPage: 10
                            },
                            sortBy: sortBy,
                            itemsByPage: 10,
                            scrollLimit: 10,
                            sortComparator: gridSortComparator,
                            simpleGrid: false //No custom item Renderer need
                        };

                        // Default table state

                        vm.tableState = {
                            sort: {},
                            pagination: {}
                        };

                        vm.tblCaption = 'Table not sorted';
                        vm.tblLoad = false;

                        var hasFilter = angular.isFunction(vm.onApplyFilter());
                        vm.selectedItem = null;

                        //vm.gridOptions is not working when controller As syntax used
                        var dewatch = $scope.$watch('grid.gridOptions', function(newVal, oldVal) {
                            // if (newVal != oldVal) {
                            // if (newVal) {
                            //     vm.gridOptions = angular.extend(defaultGridOptions, $scope.grid.gridOptions); //TODO
                            // } else {
                            //     vm.gridOptions = defaultGridOptions;
                            // }
                            // vm.itemsByPage = vm.gridOptions.enablePagination ? vm.gridOptions.itemsByPage : NaN;
                            // vm.compileTableContent();

                            if (newVal) {
                                dewatch(); //Important 30 sec to 8 sec performance improvement
                                vm.gridOptions = angular.extend(defaultGridOptions, $scope.grid.gridOptions); //TODO
                                vm.itemsByPage = vm.gridOptions.enablePagination ? vm.gridOptions.itemsByPage : NaN;
                                vm.compileTableContent();
                            }

                        }, false); //Important

                        function onRowSelect(index, canTriggerClick) {
                            if (!vm.data) {
                                return;
                            }

                            angular.forEach(vm.data, function(row, idx) {
                                row.selected = false;
                            });

                            if (vm.data.length > index) {
                                vm.data[index].selected = vm.gridOptions.isSelectable;
                                vm.selectedItem = vm.data[index];
                                vm.gridOptions.selectedItem = vm.selectedItem;

                                if (canTriggerClick) {
                                    vm.onRowClick(vm.selectedItem);
                                }
                            }
                        }

                        function isAccordionTable() {
                            return vm.gridOptions.enablePagination || vm.gridOptions.accordionRowTemplateUrl;
                        }

                        vm.onRowClick = function(item, $event) {

                            // if (vm.selectedItem === item && vm.selectedItem.selected === item.selected) {
                            //     return;
                            // }
                            if (isAccordionTable()) {
                                item.expand = !item.expand;
                            }

                            if (vm.selectedItem) {
                                vm.selectedItem.selected = false;
                            }

                            item.selected = vm.gridOptions.isSelectable;

                            vm.selectedItem = item;
                            vm.gridOptions.selectedItem = vm.selectedItem;

                            if (angular.isFunction(vm.onSelectRow())) {
                                vm.onSelectRow()(item, $event);
                            }
                        };

                        vm.criteriaMatch = function(items) {
                            var results;
                            if (hasFilter) {
                                results = vm.onApplyFilter()(items);
                                // vm.currentPage = 1;
                                return results;
                            }
                            return items;
                        };

                        vm.slice = function(offset, itemsByPage) {

                        }

                        vm.pipe = function() {

                        }

                        vm.hasPrevPage = function() {
                            if (!vm.currentPage) {
                                return false;
                            }
                            if (+vm.currentPage === 1) {
                                return false;
                            }
                            return true;
                        }

                        vm.hasNextPage = function() {
                            if (!vm.currentPage) {
                                return false;
                            }
                            if (+vm.currentPage === +vm.totalPages) {
                                return false;
                            }
                            return true;
                        }

                        vm.gotoPrevPage = function() {
                            vm.currentPage = +vm.currentPage - 1;
                            updatePaginationState();
                        }

                        vm.gotoNextPage = function() {
                            vm.currentPage = +vm.currentPage + 1;
                            updatePaginationState();
                        }

                        vm.onChangeItemPerPage = function() {
                            vm.currentPage = 1;
                            vm.totalPages = Math.ceil(vm.filteredResult.length / vm.itemsByPage);
                            updatePaginationState();
                        }

                        vm.onCurrentPageChange = function() {
                            updatePaginationState();
                        }

                        vm.totalNumOfPages = function() {
                            var totalPages = Math.ceil(vm.filteredResult.length / vm.itemsByPage);

                            //When filtered out the data need to change the current page 
                            //in order to avoid empty page
                            if (vm.totalPages !== totalPages) {
                                vm.currentPage = 1;
                            }
                            vm.totalPages = totalPages;
                            return vm.totalPages;
                        }

                        vm.loadMore = function(reqPage, noOfRows) {
                            if (vm.data.length > vm.itemsByPage) {
                                vm.itemsByPage += vm.itemsByPage;
                            }
                        }

                        vm.hasItemsToLoad = function() {
                            return vm.data && vm.data.length > vm.itemsByPage;
                        }

                        function updatePaginationState() {
                            vm.gridOptions.pagination.offset = vm.currentPage;
                            vm.gridOptions.pagination.itemsByPage = vm.itemsByPage;
                        }

                        vm.sortBy = sortBy;

                        function sortBy(column, $event) {
                            var sortedResult;

                            if (!column.sort) {
                                return;
                            }

                            if (sortingParams.dataField === column.dataField) {
                                sortingParams.reverse = !sortingParams.reverse;
                            }

                            if (column.sortFunction) {
                                // sortedResult = column.sortFunction(vm.safeCopy, column);
                                sortedResult = vm.data.sort(column.sortFunction);

                                if (sortedResult) {
                                    vm.tableState.sort.column = column;
                                    vm.data = sortingParams.reverse ? sortedResult.reverse() : sortedResult;
                                }
                            } else {
                                vm.tableState.sort.column = column;
                                vm.data = orderBy(vm.data, vm.tableState.sort.column.dataField, sortingParams.reverse);
                            }

                            angular.forEach(vm.columns, function(col) {
                                col.sorted = '';
                                if (col.sort) {
                                    col.sorted = 'unsorted';
                                    col.toggleSortIcon = 'glyphicon glyphicon-sort';
                                }
                            });

                            sortingParams.dataField = column.dataField;

                            //Will use caption directive
                            vm.sortedColumn = column;
                            vm.tblCaption = 'Table sorted by ';
                            vm.tblLoad = true;

                            column.toggleSortIcon = sortingParams.reverse ? 'glyphicon glyphicon-menu-up' : 'glyphicon glyphicon-menu-down';
                            column.isOrdered = !sortingParams.reverse;

                            column.ariaSort = column.isOrdered ? 'ascending' : 'descending';
                            column.sortState = column.isOrdered ? dataOptions.ascendingOrder : dataOptions.descendingOrder;
                        };
                    },
                    link: function(scope, elem, attr, ctrl) {

                        // elem.addClass('table--generic');
                        elem.attr('role', 'grid');
                        var BINDING_EXP = 'BINDING_EXP';
                        var promise = null;

                        ctrl.compileTableContent = function() {
                                // scope.$watch('grid.gridOptions', function(newVal, oldVal) {

                                if (!scope.grid.gridOptions) {
                                    return;
                                }
                                var $table = elem;
                                var $tbody = elem.find('tbody');

                                $tbody.empty(); //clear all contents 

                                var gridOptions = scope.grid.gridOptions;
                                var gridDefaultRowTemplateUrl = gridOptions.rowTemplateUrl;
                                var isAccordionRow = gridOptions.accordionRowTemplateUrl;

                                if (isAccordionRow) {
                                    gridDefaultRowTemplateUrl = gridOptions.accordionRowTemplateUrl;
                                } else if (gridOptions.simpleGrid) {
                                    gridDefaultRowTemplateUrl = gridOptions.simpleGridRowTemplateUrl;
                                }

                                $templateRequest(gridDefaultRowTemplateUrl).then(function(html) {
                                    var accordionRowTemplate = $templateCache.get('tableAccordionRow-tpl.html');
                                    var accordionRowAtttrs = $templateCache.get('accordionRowAttrsTemplate.html');
                                    var rowTemplate = $templateCache.get('tableRowAttrsTemplate.html');
                                    var cellTemplate = $templateCache.get('tableCellAttrsTemplate.html');
                                    var paginationTemplate = $templateCache.get('tablePaginationTemplate.html');
                                    var simpleGridRowTemplate = $templateCache.get('defaultSimpleTableRowTemplate-tpl.html');

                                    //Trick local comes as uppercase where after concat in build environment it as lowercase.
                                    var tpl = html.toUpperCase();

                                    if (isAccordionRow && accordionRowTemplate.indexOf("ACCORDION_CUSTOM_ROW_TPL") === -1) {
                                        throw 'Custom accrodion row template must have ACCORDION_CUSTOM_ROW_TPL attribute';
                                    }

                                    if (isAccordionRow) {
                                        html = accordionRowTemplate.replace("ACCORDION_CUSTOM_ROW_TPL", html);
                                    }

                                    if (gridOptions.simpleGrid) {
                                        var bindingExpression = gridOptions.bindWay == 1 ? '::' : '';
                                        html = simpleGridRowTemplate.replace(BINDING_EXP, bindingExpression);
                                    }

                                    var $tbl = angular.element(html);

                                    //Simple grid do not have this features
                                    //Simple Grid with bind type 1, 2 ways


                                    var $trElem = $tbl.siblings('tr[ROW_DEFAULT_ATTRS]');
                                    var $tdElem = $trElem.find('td[CELL_DEFAULT_ATTRS]');

                                    ctrl.addAttrsToElement($trElem, rowTemplate);
                                    ctrl.addAttrsToElement($tdElem, cellTemplate);

                                    if (isAccordionRow) {
                                        var $accordionTrElem = $tbl.siblings("tr:eq(0)"); //Actuallly 1st indexed
                                        ctrl.addAttrsToElement($accordionTrElem, accordionRowAtttrs);
                                    }


                                    // elem.find('tfoot').append(paginationTemplate);
                                    // $compile(elem.find('tfoot'))(scope);

                                    $tbody.append($tbl);
                                    $compile($tbl)(scope);
                                });
                                // }); //End of scope
                            } //End of scope

                        ctrl.addAttrsToElement = function($target, customTpl) {
                            var $customAttrs = angular.element(customTpl),
                                attrsList = $customAttrs[0].attributes;

                            angular.forEach(attrsList, function(item) {
                                if (item.nodeName === 'class') {
                                    $target.addClass(item.nodeValue);
                                } else {
                                    $target.attr(item.nodeName, item.nodeValue);
                                }
                            });
                        }
                    }
                };
            }
        ])
        .directive('tblGridItemRenderer', ['$compile', '$parse', function($compile, $parse) {
            return {
                restrict: 'A',
                // require: '^rtGrid',
                scope: {
                    item: '=',
                    column: '=',
                    rowIndex: '@',
                    itemRenderers: '=',
                    gridOptions: '=',
                    data: "=",
                    filteredResult: '='
                },
                compile: function(tElem, tAttr, transclude) {
                    return function(scope, elem, attr, ctrl) {

                        // scope.$watch('gridOptions', function() {

                        if (!scope.gridOptions)
                            return;

                        var isTwoWayBindRequired = scope.gridOptions.bindWay === 2;

                        isTwoWayBindRequired = isTwoWayBindRequired || scope.column.bindWay === 2;

                        if (!('item' in attr.$attr && 'column' in attr.$attr)) {
                            throw Error('item or column property is mandatory in row template directive');
                        }

                        scope.$watch('item', function(newVal, oldVal) {
                            scope.itemValue = $parse(scope.column.dataField)(scope.item);
                            scope.itemValue = scope.itemValue=='null' ? '--' : scope.itemValue;
                        }, false); //isTwoWayBindRequired

                        // scope.$watchGroup(['itemRenderers', 'gridOptions'], function(newVal, oldVal) {
                        var itemRenderers = scope.itemRenderers || {};
                        var gridOptions = scope.gridOptions || {};

                        // var itemRenderers = newVal[0] || {};
                        // var gridOptions = newVal[1] || {};
                        var bindWay = scope.column.bindWay || gridOptions.bindWay || 2;
                        var filterText = scope.column.filterText || '';
                        var defaultItemRenderer;

                        // if (bindWay === 1) {
                        //     defaultItemRenderer = gridOptions.defaultItemRenderer || 'tbl-default-one-way-binding-item-renderer';
                        // } else {
                        //     defaultItemRenderer = gridOptions.defaultItemRenderer || 'tbl-default-item-renderer';
                        // }

                        defaultItemRenderer = gridOptions.defaultItemRenderer || 'tbl-default-item-renderer';

                        var rendererDirective = itemRenderers && itemRenderers[scope.column.dataField] || defaultItemRenderer;
                        var tpl = '<' + rendererDirective + ' bind-way="' + bindWay + '" filter-text="' + filterText + '" >';

                        var rendererElem = angular.element(tpl);

                        scope.$evalAsync(function() {
                            elem.append(rendererElem);
                            $compile(rendererElem)(scope);
                        });
                        // });
                        // });
                    };
                }
            };
        }])
        .directive('rtGridHeaderItemRenderer', ['$compile', '$parse', function($compile, $parse) {
            return {
                restrict: 'A',
                // scope: {
                //     column: '=',
                //     gridOptions: '='
                // },
                compile: function(tElem, tAttr, transclude) {
                    return function(scope, elem, attr) {

                        scope.$watchGroup(['grid.gridOptions'], function(newVal, oldVal) {
                            scope.gridOptions = newVal[0];

                            if (!scope.gridOptions)
                                return;

                            if (!scope.col)
                                return;

                            if (!('column' in attr.$attr)) {
                                throw Error('Column property is mandatory in header renderer directive');
                            }

                            scope.itemValue = scope.col.headerText;

                            var rendererDirective = scope.col.headerRenderer || 'rt-default-header-renderer';
                            var tpl = '<' + rendererDirective + ' column="col" grid-options="gridOptions" ' + '/>';

                            var rendererElem = angular.element(tpl);

                            //scope.$evalAsync(function() {
                            elem.append(rendererElem);
                            $compile(rendererElem)(scope);
                            // });
                        });
                    };
                }
            };
        }])
        .directive('tblDefaultOneWayBindingItemRenderer', [function() {
            return {
                restrict: 'E',
                template: '{{::itemValue}}'
            };
        }])
        .directive('tblDefaultItemRenderer', ['$compile', function($compile) {
            var complieTimes = 1;
            var linkTimes = 1;
            return {
                restrict: 'E',
                template: '{{itemValue}}',
                compile: function(tElem, tAttr, transclude) {
                    return function(scope, elem, attr) {
                        if (tAttr.bindWay == 1) {
                            tElem[0].innerHTML = '{{::itemValue}}';
                        }

                        if (tAttr.filterText) {
                            tElem[0].innerHTML = tElem[0].innerHTML.replace('}}', tAttr.filterText + '}}');
                        }
                        $compile(elem.contents())(scope);
                    };
                }
            };
        }])
        .directive('rtDefaultHeaderRenderer', [function() {
            return {
                restrict: 'E',
                template: '<rt-sort-column></rt-sort-column>'
            };
        }])
        .directive('tblCustomItemRenderer', [function() {
            return {
                restrict: 'EA',
                template: '<div>{{itemValue}}</div>',
            };
        }])
        .directive('rtGridRenderCompleted', function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function() {
                            scope.$emit('rtGridRenderCompleted');
                        });
                    }
                }
            };
        });
}