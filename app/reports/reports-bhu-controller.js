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
    bhureport.loadMore = loadMore;
    bhureport.exportToExcel = exportToExcel;
    init();
    bhureport.bhuReportError = false;  
    //$rootScope.folderName = $state.params.folderName;
    /**
     * init
     * Intializing On Load Services for BhuReport Page
     */
    function init() {
        debugger;
        alert("bhu report loaded");
        bhureport.bhuReportFilterQuarter = sharedService.getQuarter();
        bhureport.bhurptFilterYear = sharedService.getYears();
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
        debugger;
         reportservice.getBhuReportData().then(function(bhuReportData) {
            if(bhuReportData && bhuReportData.errorCode){
                $scope.$emit('alert', {
                message: 'RT Dashboard currently down for Maintenance. We will be back soon. Thank you for your patience.',
                success: false
            });
              bhureport.bhuReportError = true;  
           }else{
              bhureport.populateBhuReportDetailsData(bhuReportData.bhurptDetails, bhuReportData.totalCount);
           }
        });

        }

    function populateBhuReportDetailsData(bhuReportList, count){
        debugger;
        bhureport.gridOptions.dataOptions.nodata = '';
        bhureport.columns = [{
            headerText: 'BHU / IHU',
            dataField: 'bhuIhu',
            tdClasses: 'width30',
            thClasses: 'width30',
            sort: true
        }, {
            headerText: 'CURRENT STATUS',
            dataField: 'currentStatus',
            thClasses: 'width60',
            tdClasses: 'width60'
        }, {
            headerText: 'SIZE',
            dataField: 'size',
            thClasses: 'width15',
            tdClasses: 'width15',
            sort: true
        },{
            headerText: 'NO OF OBJECTS',
            dataField: 'noOfObjects',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'PROJECT MANAGER',
            dataField: 'projectManager',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'RT SPOC',
            dataField: 'rtspoc',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'EXTENDED TEAM MEMBERS',
            dataField: 'extendedTeamMembers',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'SCRIPTS SHARED',
            dataField: 'scriptShared',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'SCRIPTS UTILIZED',
            dataField: 'scriptUtilized',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'SCRIPT EXECUTED',
            dataField: 'scriptExecuted',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'RT DEFECTS',
            dataField: 'rtDefects',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'RT MISS',
            dataField: 'rtMiss',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'WARRANTY ISSUES',
            dataField: 'warrantyIssue',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'SCRIPT EXECUTED PART OF WARRANTY',
            dataField: 'scriptExcpartOfwarranty',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'NEW SCRIPT RECEIVED',
            dataField: 'newscriptReceived',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'SCRIPTS MODIFIED',
            dataField: 'scriptsModified',
            thClasses: 'width10',
            tdClasses: 'width10'
        },{
            headerText: 'EFFORTS UTILIZED',
            dataField: 'efortsUtilized',
            thClasses: 'width10',
            tdClasses: 'width10'
        }
    ];
        bhureport.itemRenderers = {
            //link going to appear in grid
            'bhuIhu': 'bhuIhu-link-renderer',
            'currentStatus': 'currentStatus-link-renderer',
            'warrantyIssue':'warrantyIssue-link-renderer'
            //other formatted columns
        };
        // bhureport.data = bhuReportList;
        // bhureport.dataCopy = angular.copy(bhureport.data);
        // bhureport.bhuReportCount = count;
        // if(bhureport.selectedYear && bhureport.selectedQuarter){
        //     bhureport.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the selected year - &quot;<b>'+bhureport.selectedYear+ '</b>&quot; and Quarter - &quot;<b>'+bhureport.selectedQuarter+ '</b>&quot;. Use filter to find other data');
        // }else if(bhureport.selectedYear && !bhureport.selectedQuarter){
        //     bhureport.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the selected year - &quot;<b>'+bhureport.selectedYear+'</b>&quot;. Use filter to find other data');
        // }else{
        //     bhureport.gridOptions.dataOptions.nodata = 'No data found for the current quarter. Use filter to find other data';
        // }
        // bhureport.calculateTotalRecords(bhureport.bhuReportCount);
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
                              
                            if  (data.bhurptName == null){
                                data.bhurptName = "";
                            }
                            
                            if  (data.description == null){
                                data.description = "";
                            }

                            if  (data.category == null){
                                data.category = "";
                            }

                            if  (data.bussinessImpact == null){
                                data.bussinessImpact = "";
                            }

                            if  (data.status == null){
                                data.status = "";
                            }

                                return data.bhurptName.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1 || data.description.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1 
                                    || data.category.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1 || data.bussinessImpact.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1
                                    || data.status.toString().toLowerCase().indexOf(bhureport.filterBhuReport.searchKeyword.toLowerCase()) > -1;

                            
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

    function populateBhuReportFilterData(filterbhuReport, startIndex){
        debugger;
        bhureport.selectedQuarter = filterbhuReport.bhurptQuarter;
        bhureport.selectedYear = filterbhuReport.bhurptYear;
        if(filterbhuReport.bhurptYear && !filterbhuReport.bhurptQuarter){
             reportservice.getBhuReportFilterDetailsByYear(filterbhuReport.bhurptYear, startIndex).then(function(resp){
                if(resp && resp.errorCode){
                $scope.$emit('alert', {
                message: resp.message,
                success: false
            });
           }else{
               bhureport.populateBhuReportDetailsData(resp.bhurptDetails, resp.totalCount);
           }
            });
         }else if(filterbhuReport.bhurptYear && filterbhuReport.bhurptQuarter){
                reportservice.getBhuReportFilterDetailsByQuarter(filterbhuReport.bhurptYear, filterbhuReport.bhurptQuarter, startIndex).then(function(resp){
                    if(resp && resp.errorCode){
                        $scope.$emit('alert', {
                        message: resp.message,
                        success: false
                    });
           }else{
                   bhureport.populateBhuReportDetailsData(resp.bhurptDetails, resp.totalCount);
               }
                });
        }
         bhureport.filterBhuReport.searchKeyword = '';
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
        bhureport.getBhuReportList();
    }

    function checkFilterSelection(filterSelected){
        if(!filterSelected.bhurptYear){
            return true;
            }
            else{
                return false;
            }
    }

    function calculateTotalRecords(c){
        bhureport.count = 0;
        bhureport.count = bhureport.count  + 1;
        bhureport.nOfIndexs = (Math.round(c / 100));
    }

    function loadMore(i){   
        bhureport.count = bhureport.count  + 1;
        if(bhureport.selectedYear && !bhureport.selectedQuarter){
            reportservice.getBhuReportFilterDetailsByYear(bhureport.selectedYear, (100*i)+1).then(function(resp){
                bhureport.data =  bhureport.data.concat(resp.bhurptDetails);
            });
        }else if(bhureport.selectedYear && bhureport.selectedQuarter){
            reportservice.getBhuReportFilterDetailsByQuarter(bhureport.selectedYear, bhureport.selectedQuarter, (100*i)+1).then(function(resp){
                bhureport.data =  bhureport.data.concat(resp.bhurptDetails);
            });
        }else{
             reportservice.getBhuReportData((100*i)+1).then(function(resp){
                bhureport.data =  bhureport.data.concat(resp.bhurptDetails);
           });
         }
    }

    function exportToExcel(){
        if(bhureport.filterBhuReport.bhurptYear && !bhureport.filterBhuReport.bhurptQuarter){
            window.location.href = reportservice.exportToExcelByYear(bhureport.filterBhuReport.bhurptYear);
        }else if(bhureport.filterBhuReport.bhurptYear && bhureport.filterBhuReport.bhurptQuarter){
            window.location.href = reportservice.exportToExcelByQuarter(bhureport.filterBhuReport.bhurptYear, bhureport.filterBhuReport.bhurptQuarter);
        }else{
            window.location.href = reportservice.exportToExcelCurrentQuarter();
        }
    }

}
module.exports = BhuReportsController;