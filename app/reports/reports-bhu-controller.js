BhuReportsController.$inject = ['$state', '$scope', '$http','$filter','$sce', 'reportservice', 'sharedService'];

function BhuReportsController($state, $scope, $http, $filter,$sce, reportservice, sharedService) {
    var bhureport = this;
    bhureport.filterBhuReport = {};
    bhureport.count = 0;
    // bhureport.noDataMsg = '';
    
    // Variable Definitions
    // Function Definitions
   
    bhureport.init = init;
    bhureport.showFilterOptions = showFilterOptions;
    bhureport.populateBhuReportDetailsData = populateBhuReportDetailsData;
    bhureport.showFilterOptions = showFilterOptions;
    bhureport.populateBhuReportFilterData = populateBhuReportFilterData;
    bhureport.hideSideFilterOptions = hideSideFilterOptions;
    bhureport.resetFilter = resetFilter;
    bhureport.getBhuReportList = getBhuReportList;
    bhureport.checkFilterSelection = checkFilterSelection;
    bhureport.searchBhuReportTable = searchBhuReportTable;
    bhureport.calculateTotalRecords = calculateTotalRecords;
    bhureport.exportToExcel = exportToExcel;
    bhureport.loadQuarterMonths = getMonthsForQuarter;
    bhureport.loadYearQuarter = getQuarterYear;
    init();
    bhureport.bhuReportError = false;  
    //$rootScope.folderName = $state.params.folderName;
    /**
     * init
     * Intializing On Load Services for BhuReport Page
     */
    function init() {
        bhureport.bhurptFilterYear = sharedService.getYears();
        bhureport.bhuReportPhase = sharedService.getPhase();

         bhureport.gridOptions = {
            bindType: 1,
            data: {
                foo: {}
            },
            dataOptions: {
                nodata: 'No data'
            },
            enablePagination: true
        };
        bhureport.getBhuReportList();
    }

    function getBhuReportList(){
         reportservice.getBhuReportData().then(function(bhuReportData) {
             debugger;
            if(bhuReportData && bhuReportData.errorCode){
                $scope.$emit('alert', {
                message: 'RT Dashboard currently down for Maintenance. We will be back soon. Thank you for your patience.',
                success: false
            });
              bhureport.bhuReportError = true;  
           }else{
               if(bhuReportData.bhurptDetails){
                    bhureport.populateBhuReportDetailsData(bhuReportData.bhurptDetails, bhuReportData.totalCount);
               }
           }
        });

        }

    function populateBhuReportDetailsData(bhuReportList, count){
        bhureport.gridOptions.dataOptions.nodata = '';
        bhureport.columns = [
        {
            headerText: 'BHU / IHU',
            dataField: 'bhuId',
            thClasses: 'width5',
            tdClasses: 'width5',
            sort: true,
        }, {
            headerText: 'CURRENT STATUS',
            dataField: 'currentStatus',
            thClasses: 'width5',
            tdClasses: 'width5',
            sort: true
        }, {
            headerText: 'SIZE',
            dataField: 'size',
            //sort: true,
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'NO OF OBJECTS',
            dataField: 'noOfObjects',
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'PROJECT MANAGER',
            dataField: 'projectManager',
            thClasses: 'width10',
            tdClasses: 'width10',
            sort: true,
        },{
            headerText: 'RT SPOC',
            dataField: 'rtsSpoc',
            thClasses: 'width10',
            tdClasses: 'width10',
            sort: true
        },{
            headerText: 'EXTENDED TEAM MEMBERS',
            dataField: 'extteammembers',
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'SCRIPTS SHARED',
            dataField: 'scriptshared',
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'SCRIPTS UTILIZED',
            dataField: 'scriptutilized',
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'SCRIPT EXECUTED',
            dataField: 'scriptexecuted',
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'RT DEFECTS',
            dataField: 'rtdefects',
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'RT MISS',
            dataField: 'rtmiss',
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'WARRANTY ISSUES',
            dataField: 'warrantyissue',
            thClasses: 'width5',
            tdClasses: 'width5',
            sort: true
        },{
            headerText: 'SCRIPT EXECUTED PART OF WARRANTY',
            dataField: 'scriptExcpartOfwarranty',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'NEW SCRIPT RECEIVED',
            dataField: 'newscriptreceived',
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'SCRIPTS MODIFIED',
            dataField: 'scriptsmodified',
            thClasses: 'width5',
            tdClasses: 'width5'
        },{
            headerText: 'EFFORTS UTILIZED',
            dataField: 'efortsutilized',
            thClasses: 'width5',
            tdClasses: 'width5',
            sort: true
        }
    ];
        bhureport.itemRenderers = {
            //link going to appear in grid
            'bhuId': 'bhu-id-link-renderer',
            'currentStatus': 'current-status-link-renderer',
            'warrantyissue': 'warranty-issue-link-renderer',
            'efortsutilized': 'efforts-utilized-link-renderer'
        };
        bhureport.data = bhuReportList ? bhuReportList : [];
        bhureport.dataCopy = angular.copy(bhureport.data);
        debugger;
        bhureport.bhuReportCount = bhuReportList ? bhuReportList.length : 0;

        if(bhureport.selectedYear && bhureport.selectedQuarter && bhureport.selectedMonth){
            bhureport.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the selected year - &quot;<b>'+bhureport.selectedYear+ '</b>&quot; and Quarter - &quot;<b>'+bhureport.selectedQuarter
            + '</b>&quot; and Month - &quot<b>'+bhureport.selectedMonth+ '</b>&quot;. Use filter to find other data');
        }
        else if(bhureport.selectedYear && bhureport.selectedQuarter){
            bhureport.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the selected year - &quot;<b>'+bhureport.selectedYear+ '</b>&quot; and Quarter - &quot;<b>'+bhureport.selectedQuarter+ '</b>&quot;. Use filter to find other data');
        }else if(bhureport.selectedYear && !bhureport.selectedQuarter){
            bhureport.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the selected year - &quot;<b>'+bhureport.selectedYear+'</b>&quot;. Use filter to find other data');
        }else{
            bhureport.gridOptions.dataOptions.nodata = 'No data found for the current quarter. Use filter to find other data';
        }
        bhureport.calculateTotalRecords(bhureport.bhuReportCount);
    }

    function searchBhuReportTable(keyword){
        bhureport.count = 0;
        bhureport.count = bhureport.count  + 1;
        $scope.$watch('bhureport.filterBhuReport.searchKeyword', function(){
             if(keyword && keyword.length == 0){
                        bhureport.data = bhureport.dataCopy;
                }
            else if(keyword && keyword.length>=2){

                        // var filteredData;
                            bhureport.data = $filter('filter')(bhureport.data, function(data) {
                              
                            if  (data.bhuId == null){
                                data.bhuId = "";
                            }
                            
                            if  (data.currentStatus == null){
                                data.currentStatus = "";
                            }

                            if  (data.projectManager == null){
                                data.projectManager = "";
                            }

                            if  (data.rtsSpoc == null){
                                data.rtsSpoc = "";
                            }

                            if  (data.size == null){
                                data.size = "";
                            }
                                return data.bhuId.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1 || data.currentStatus.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1 
                                    || data.projectManager.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1 || data.rtsSpoc.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1
                                    || data.size.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1;
                            });
                         bhureport.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the search keyword &quot;<b>'+keyword+'</b>&quot;');
                    }else{
                        bhureport.data = bhureport.dataCopy;
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

    function populateBhuReportFilterData(filter, startIndex){
      var q =  bhureport.selectedQuarter = filter.bhurptQuarter;
      var y =  bhureport.selectedYear = filter.bhurptYear;
      var p =  bhureport.selectedPhase = filter.bhurptPhase;
      var m = bhureport.selectedMonth = filter.bhurptMonth;
        debugger;

        if(p || y ){
            reportservice.getBhuReportFilterDetails(p, y ,q, m, startIndex).then(function(resp){
               if(resp && resp.errorCode){
               $scope.$emit('alert', {
                   message: resp.message,
                   success: false
                   });
               }
               else {
                   bhureport.populateBhuReportDetailsData(resp.bhurptDetails, resp.totalCount);
               }
           });
        } else{
            $scope.$emit('alert', {
                message: resp.message,
                success: false
            });
        }
        // else if(filter.bhurptYear && !filter.bhurptQuarter){
        //      reportservice.getBhuReportFilterDetailsByYear(filter.bhurptYear, startIndex).then(function(resp){
        //         if(resp && resp.errorCode){
        //         $scope.$emit('alert', {
        //             message: resp.message,
        //             success: false
        //             });
        //         }
        //         else {
        //             bhureport.populateBhuReportDetailsData(resp.bhurptDetails, resp.totalCount);
        //         }
        //     });
        //  }else if(filter.bhurptYear && filter.bhurptQuarter){
        //         reportservice.getBhuReportFilterDetailsByQuarter(filter.bhurptYear, filter.bhurptQuarter, startIndex).then(function(resp){
        //             if(resp && resp.errorCode){
        //                 $scope.$emit('alert', {
        //                 message: resp.message,
        //                 success: false
        //             });
        //             }else{
        //                 bhureport.populateBhuReportDetailsData(resp.bhurptDetails, resp.totalCount);
        //             }
        //         });
        // }
         bhureport.filterBhuReport.searchKeyword = '';
    }

    function getQuarterYear(year){
        if(!isNaN( year)){
            bhureport.bhuReportFilterQuarter = sharedService.getQuarter();
        }
        else{
            bhureport.bhuReportFilterQuarter =[];
        }
    }
    function getMonthsForQuarter(quarter){
       var months = sharedService.getQuarterMonths(quarter);
       bhureport.bhuReportFilterMonth = months;
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

    function resetFilter(){
        bhureport.filterBhuReport = {};
        bhureport.selectedYear = '';
        bhureport.selectedQuarter = '';
        bhureport.selectedPhase = '';
        bhureport.selectedMonth = '';
        bhureport.bhuReportFilterMonth = [];
        bhureport.bhuReportFilterQuarter =[];
        
        bhureport.getBhuReportList();
    }

    function checkFilterSelection(filterSelected){
        if( filterSelected.bhurptYear || filterSelected.bhurptPhase){
                return false;
            }
            else{
                return true;
            }
    }

    function calculateTotalRecords(c){
        bhureport.count = 0;
        bhureport.count = bhureport.count  + 1;
        bhureport.nOfIndexs = (Math.round(c / 100));
    }

    // function loadMore(i){   
    //     bhureport.count = bhureport.count  + 1;
    //     if(bhureport.selectedYear && !bhureport.selectedQuarter){
    //         reportservice.getBhuReportFilterDetailsByYear(bhureport.selectedYear, (100*i)+1).then(function(resp){
    //             bhureport.data =  bhureport.data.concat(resp.bhurptDetails);
    //         });
    //     }else if(bhureport.selectedYear && bhureport.selectedQuarter){
    //         reportservice.getBhuReportFilterDetailsByQuarter(bhureport.selectedYear, bhureport.selectedQuarter, (100*i)+1).then(function(resp){
    //             bhureport.data =  bhureport.data.concat(resp.bhurptDetails);
    //         });
    //     }else{
    //          reportservice.getBhuReportData((100*i)+1).then(function(resp){
    //             bhureport.data =  bhureport.data.concat(resp.bhurptDetails);
    //        });
    //      }
    //  }

    function exportToExcel(){
        var p = bhureport.filterBhuReport.bhurptPhase ? bhureport.filterBhuReport.bhurptPhase : "null";
        var y = bhureport.filterBhuReport.bhurptYear ? bhureport.filterBhuReport.bhurptYear : "null";
        var q = bhureport.filterBhuReport.bhurptQuarter ? bhureport.filterBhuReport.bhurptQuarter : "null";
        var m = bhureport.filterBhuReport.bhurptMonth ? bhureport.filterBhuReport.bhurptMonth : "null" ;

        //this is the common url which will work for any filter
        window.location.href = reportservice.exportExcel(p, y, q, m);

        
        
        // if(p){
        //  if(y && !q){
        //         window.location.href = reportservice.exportToExcelByPhaseAndYear(p, y);
        //     }else if( q && !m){
        //         window.location.href = reportservice.exportToExcelByQuarter(p, y, q);
        //     }else if(y && q && m){
        //         window.location.href = reportservice.exportExcel(p, y, q, m);
        //     }else{
        //         window.location.href = reportservice.exportToExcelByPhase(p);
        //     }
        // }
        // else {
        //     if(y && !q){
        //         window.location.href = reportservice.exportToExcelByYear(y);
        //     }else if(y && q && !m){
        //         window.location.href = reportservice.exportToExcelByQuarter(p, y, q);
        //     }else if(y && q && m){
        //         window.location.href = reportservice.exportExcel(p, y, q, m);
        //     }else{
        //         window.location.href = reportservice.exportToExcelCurrentQuarter();
        //     }
        // }
        // else{
        //     window.location.href = reportservice.exportToExcelCurrentQuarter();
        // }
    }
}
module.exports = BhuReportsController;