TicketsController.$inject = [    
    '$state',
    '$scope',
    '$http',
    '$sce',
    'ticketservice',
    'ticketFolders',
    '$q',
    'spinnerService',
    'sharedService',
    '$filter'
];

function TicketsController($state, $scope, $http, $sce, ticketservice, ticketFolders, $q, spinnerService, sharedService, $filter) {
    var vmtic = this;
    vmtic.filterTickets = {};
    vmtic.ticketFoldersList = ticketFolders;
     if(ticketFolders && ticketFolders.errorCode){
        $scope.$emit('alert', {
                message: 'RT Dashboard currently down for Maintenance. We will be back soon. Thank you for your patience.',
                success: false
            });
     }
    vmtic.count = 0;
    // vmtic.ticketType = '';
    // Variable Definitions
    
    // Function Definitions
        
    vmtic.init     = init;
    vmtic.getTicketDetails = getTicketDetails;
    vmtic.populateTicketDetailsData = populateTicketDetailsData;
    vmtic.showFilterOptions = showFilterOptions;
    vmtic.ticketFilterQuarter = sharedService.getQuarter();
    vmtic.populateTicketsFilterData = populateTicketsFilterData;
    vmtic.hideSideFilterOptions = hideSideFilterOptions;
    vmtic.resetFilter = resetFilter;
    vmtic.checkFilterSelection = checkFilterSelection;
    vmtic.searchTicketsTable = searchTicketsTable;
    vmtic.calculateTotalRecords = calculateTotalRecords;
    vmtic.loadMore = loadMore;
    vmtic.exportToExcel = exportToExcel;
    
    init();
     if($state.params && $state.params.ticketTypeDetails){
        vmtic.ticketDetails = $state.params.ticketTypeDetails.ticketDetails;
        vmtic.totalTicketTypeCount = $state.params.ticketTypeDetails.totalCount;
        vmtic.populateTicketDetailsData(vmtic.ticketDetails, vmtic.totalTicketTypeCount);
        vmtic.selectedTicketType = $state.params.selTicketType;
    }
    /**
     * init
     * Intializing On Load Services for Tickets Page
     */
    function init(){	
        vmtic.ticketFilterYear = sharedService.getYears();
         vmtic.gridOptions = {
            bindType: 1,
            data: {
                foo: {}
            },
            dataOptions: {
                nodata: 'No data'
            },
            enablePagination: true
            
        };
    }

    function getTicketDetails(ticketType){
        ticketservice.getTicketTypeDetails(ticketType, 1).then(function(resp){
            if(resp && resp.errorCode){
                $scope.$emit('alert', {
                message: resp.message,
                success: false
            });
           }else{
            $state.go('root.ticketfolders.details', {ticketTypeDetails: resp, selTicketType:ticketType});
                }
        });
        
    }

    function populateTicketDetailsData(ticketsList, count){
        vmtic.data = [];
        vmtic.columns = [
                        {
                            headerText: 'Ticket Number',
                            dataField: 'itemName',
                            tdClasses: 'width15',
                            thClasses: 'width15',
                            sort: true
                        },
                        {
                            headerText: 'BHU Id',
                            dataField: 'bhuId',
                            tdClasses: 'width10',
                            thClasses: 'width10',
                            sort: true
                        }, 
                        {
                            headerText: 'Description',
                            dataField: 'description',
                            tdClasses: 'width38',
                            thClasses: 'width38',
                        },
                        {
                            headerText: 'Created On',
                            dataField: 'creationDate',
                            tdClasses: 'width12',
                            thClasses: 'width12',
                            sort: true,
                            initSort: true
                        },
                        {
                            headerText: 'RT Spoc',
                            dataField: 'rtSpoc',
                            tdClasses: 'width12',
                            thClasses: 'width12',
                            sort: true
                        },
                        {
                            headerText: 'Current Status',
                            dataField: 'status',
                            tdClasses: 'width13',
                            thClasses: 'width13',
                            sort: true
                        }
        ];
        vmtic.itemRenderers = {
            'itemName': 'itemname-link-renderer',
            'bhuId':'bhu-id-link-renderer',
            'description': 'desc-item-renderer',
            'creationDate': 'date-format',
            'rtSpoc': 'spoc-details-renderer'
        };

        vmtic.data = ticketsList;
        vmtic.dataCopy = angular.copy(vmtic.data);
        vmtic.dataCount = count;
        if(vmtic.selectedYear && vmtic.selectedQuarter){
            vmtic.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the selected year - &quot;<b>'+vmtic.selectedYear+ '</b>&quot; and Quarter - &quot;<b>'+vmtic.selectedQuarter+ '</b>&quot;. Use filter to find other data');
        }else if(vmtic.selectedYear && !vmtic.selectedQuarter){
            vmtic.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the selected year - &quot;<b>'+vmtic.selectedYear+'</b>&quot;. Use filter to find other data');
        }else{
            vmtic.gridOptions.dataOptions.nodata = 'No data found for the current quarter. Use filter to find other data';
        }
        vmtic.calculateTotalRecords(vmtic.dataCount);
    }

    function searchTicketsTable(keyword){
        vmtic.count = 0;
        vmtic.count = vmtic.count  + 1;
        $scope.$watch('vmtic.filterTickets.searchKeyword', function(){
            if(keyword && keyword.length == 0){
                vmtic.data = vmtic.dataCopy;
            }
            else if(keyword && keyword.length>=2){
                // var filteredData;
            vmtic.data = $filter('filter')(vmtic.data, function(data) {
                  
                if  (data.itemName == null){
                    data.itemName = "";
                }
                
                if  (data.bhuId == null){
                    data.bhuId = "";
                }

                if  (data.description == null){
                    data.description = "";
                }

                if  (data.creationDate == null){
                    data.creationDate = "";
                }

                if  (data.rtSpoc == null){
                    data.rtSpoc = "";
                }

                if  (data.status == null){
                    data.status = "";
                }

                    return data.itemName.toString().toLowerCase().indexOf(vmtic.filterTickets.searchKeyword.toLowerCase()) > -1 || data.bhuId.toString().toLowerCase().indexOf(vmtic.filterTickets.searchKeyword.toLowerCase()) > -1 
                        || data.description.toString().toLowerCase().indexOf(vmtic.filterTickets.searchKeyword.toLowerCase()) > -1 || data.creationDate.toString().toLowerCase().indexOf(vmtic.filterTickets.searchKeyword.toLowerCase()) > -1
                        || data.rtSpoc.toString().toLowerCase().indexOf(vmtic.filterTickets.searchKeyword.toLowerCase()) > -1 || data.status.toString().toLowerCase().indexOf(vmtic.filterTickets.searchKeyword.toLowerCase()) > -1;

                
                });
            vmtic.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the search keyword &quot;<b>'+keyword+'</b>&quot;');
            }else{
                vmtic.data = vmtic.dataCopy;
            }
        });
        
    }

    function showFilterOptions(){
        angular.element('.sidenav').toggleClass('hide');
        angular.element('.sidenav').css({
                      "width": "20%",
                      "float": "left",
                      "padding": "10px"
                    });
        angular.element('.rt-grid__wrapper').css({
                      "width": "80%",
                      "float": "left"
                    });
        angular.element('.filter-by').toggleClass('hide');
    }

    function hideSideFilterOptions(){
        angular.element('.sidenav').toggleClass('hide');
        angular.element('.sidenav').css({
                      "width": "0"
                    });
        angular.element('.rt-grid__wrapper').css({
                      "width": "100%"
                    });
        angular.element('.filter-by').toggleClass('hide');
    }

    function populateTicketsFilterData(filter, startIndex){
        vmtic.selectedQuarter = filter.ticketQuarter;
        vmtic.selectedYear = filter.ticketYear;
        if(filter.ticketYear && !filter.ticketQuarter){
             ticketservice.getTicketFilterDetailsByYear(vmtic.selectedTicketType, filter.ticketYear, startIndex).then(function(resp){
                if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                }else{
               vmtic.populateTicketDetailsData(resp.ticketDetails, resp.totalCount);
           }
            });
         }else if(filter.ticketYear && filter.ticketQuarter){
                ticketservice.getTicketFilterDetailsByQuarter(vmtic.selectedTicketType, filter.ticketYear, filter.ticketQuarter, startIndex).then(function(resp){
                    if(resp && resp.errorCode){
                        $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                    }else{
                   vmtic.populateTicketDetailsData(resp.ticketDetails, resp.totalCount);
                    }
                });
        }
        
         vmtic.filterTickets.searchKeyword = '';
    }
function resetFilter(){
        vmtic.filterTickets = {};
        ticketservice.getTicketTypeDetails(vmtic.selectedTicketType, 1).then(function(resp){
            if(resp && resp.errorCode){
                $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
            }else{
                vmtic.ticketDetails = resp.ticketDetails;
             vmtic.totalTicketTypeCount = resp.totalCount;
             vmtic.populateTicketDetailsData(vmtic.ticketDetails, vmtic.totalTicketTypeCount);
            }
        });
        vmtic.selectedQuarter = '';
        vmtic.selectedYear = '';
    }

    function checkFilterSelection(filterSelected){
        if(!filterSelected.ticketYear){
            return true;
            }
            else{
                return false;
            }
    }

    function calculateTotalRecords(c){
        vmtic.count = 0;
        vmtic.count = vmtic.count  + 1;
        vmtic.nOfIndexs = (Math.round(c / 100));
    }

    function loadMore(i){
        vmtic.count = vmtic.count  + 1;
        if(vmtic.selectedYear && !vmtic.selectedQuarter){
            ticketservice.getTicketFilterDetailsByYear(vmtic.selectedTicketType, vmtic.selectedYear, (100*i)+1).then(function(resp){
                if(resp && resp.errorCode){
                        $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                }else{
                    vmtic.data =  vmtic.data.concat(resp.ticketDetails);
                }
                
            });
        }else if(vmtic.selectedYear && vmtic.selectedQuarter){
            ticketservice.getTicketFilterDetailsByQuarter(vmtic.selectedTicketType, vmtic.selectedYear, vmtic.selectedQuarter, (100*i)+1).then(function(resp){
                if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                }else{
                    vmtic.data =  vmtic.data.concat(resp.ticketDetails);
                }
            });
        }else{
             ticketservice.getTicketTypeDetails(vmtic.selectedTicketType, (100*i)+1).then(function(resp){
                if(resp && resp.errorCode){
                        $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                }else{
                    vmtic.data =  vmtic.data.concat(resp.ticketDetails);
                }   
           });
         }
    }

    function exportToExcel(){
         if(vmtic.filterTickets.ticketYear && !vmtic.filterTickets.ticketQuarter){
            window.location.href = ticketservice.exportToExcelByYear(vmtic.selectedTicketType, vmtic.filterTickets.ticketYear);
        }else if(vmtic.filterTickets.ticketYear && vmtic.filterTickets.ticketQuarter){
            window.location.href = ticketservice.exportToExcelByQuarter(vmtic.selectedTicketType, vmtic.filterTickets.ticketYear, vmtic.filterTickets.ticketQuarter);
        }else{
            window.location.href = ticketservice.exportToExcelCurrentQuarter(vmtic.selectedTicketType);
        }
    }
}

module.exports = TicketsController;
