BhuReportsController.$inject = ['$state', '$scope', '$http','$filter','$sce', 'reportservice', 'sharedService','$rootScope'];

function BhuReportsController($state, $scope, $http, $filter,$sce, reportservice, sharedService, $rootScope) {
    var bhureport = this;
    bhureport.filterBhuReport = {};
    bhureport.count = 0;
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
        angular.element('.table--fixed').css({
            "width": sharedService.getWindowWidth() > 1500 ? "100%" : "1700px"
          });
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
            if(bhuReportData && bhuReportData.errorCode){
                $scope.$emit('alert', {
                message: 'RT Dashboard currently down for Maintenance. We will be back soon. Thank you for your patience.',
                success: false
            });
              bhureport.bhuReportError = true;  
           }else{
               if(bhuReportData.bhurptDetails){
                if(!$rootScope.teamMembers){
                    sharedService.getTeamMembers().then(function(user){
                        bhureport.populateBhuReportDetailsData(bhuReportData.bhurptDetails, bhuReportData.totalCount);
                    });
                }else{
                    bhureport.populateBhuReportDetailsData(bhuReportData.bhurptDetails, bhuReportData.totalCount);
                }
             }
           }
        });
    }

    function populateBhuReportDetailsData(bhuReportList, count){
        bhureport.gridOptions.dataOptions.nodata = '';
            bhureport.columns = [
            {
                headerText: 'BHU/IHU#',
                dataField: 'bhuId',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            }, {
                headerText: 'Current Status',
                dataField: 'currentStatus',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            }, {
                headerText: 'Size',
                dataField: 'size',
                //sort: true,
                thClasses: 'width5',
                tdClasses: 'width5'
            },{
                headerText: 'Impacted Objects',
                dataField: 'noOfObjects',
                thClasses: 'width5',
                tdClasses: 'width5'
            },{
                headerText: 'Project Manager',
                dataField: 'projectManager',
                thClasses: 'width10',
                tdClasses: 'width10',
                sort: true
            },{
                headerText: 'RT Spoc',
                dataField: 'rtsSpoc',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            },{
                headerText: 'Extended Team Members',
                dataField: 'extteammembers',
                thClasses: 'width10',
                tdClasses: 'width10'
            },{
                headerText: 'Scripts Shared',
                dataField: 'scriptshared',
                thClasses: 'width5',
                tdClasses: 'width5'
            },{
                headerText: 'Scripts Utilized',
                dataField: 'scriptutilized',
                thClasses: 'width5',
                tdClasses: 'width5'
            },{
                headerText: 'Scripts Executed',
                dataField: 'scriptexecuted',
                thClasses: 'width5',
                tdClasses: 'width5'
            },{
                headerText: 'RT Defects',
                dataField: 'rtdefects',
                thClasses: 'width5',
                tdClasses: 'width5'
            },{
                headerText: 'RT Miss',
                dataField: 'rtmiss',
                thClasses: 'width5',
                tdClasses: 'width5'
            },{
                headerText: 'Warranty Issues',
                dataField: 'warrantyissue',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            },{
                headerText: 'Scripts Executed as part of Warranty',
                dataField: 'scriptExcpartOfwarranty',
                thClasses: 'width10',
                tdClasses: 'width10'
            },{
                headerText: 'Scripts Modified',
                dataField: 'scriptsmodified',
                thClasses: 'width5',
                tdClasses: 'width5'
            }
        ];

        if($rootScope.isTeamMember == true || ($rootScope.userRoles && $rootScope.userRoles.indexOf("admin")> -1)){
            var colm15 = bhureport.columns[14];
            bhureport.columns[14] = {
                headerText: 'New Scripts Received',
                dataField: 'newscriptreceived',
                thClasses: 'width5',
                tdClasses: 'width5'
            };
            bhureport.columns[15] = colm15;
            bhureport.columns.push({
                headerText: 'Efforts Utilized',
                dataField: 'efortsutilized',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            });
        }else if($rootScope.isTeamMember==false){
            var colm15 = bhureport.columns[14];
            bhureport.columns[14] = {
                headerText: 'New Script Received',
                dataField: 'newscriptreceived',
                thClasses: 'width10',
                tdClasses: 'width10'
            };
            bhureport.columns[15] = colm15;
        }

        bhureport.itemRenderers = {
            //link going to appear in grid
            'bhuId': 'reportbhu-id-link-renderer',//reportbhu-id-link-renderer
            'currentStatus': 'current-status-link-renderer',
            'warrantyissue': 'warranty-issue-link-renderer',
            'efortsutilized': 'efforts-utilized-link-renderer'
        };

        bhureport.data = bhuReportList ? bhuReportList : [];
        bhureport.dataCopy = angular.copy(bhureport.data);
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
                      "float": "left",
                      "overflow": "scroll"
                    });
        angular.element('.table--fixed').css({
            "width": sharedService.getWindowWidth() > 1500 ? "100%" : "1700px"
        })
        angular.element('.grid-filter').toggleClass('hide');
    }

    function hideSideFilterOptions( ){
        angular.element('.sidenav').toggleClass('hide');
        angular.element('.sidenav').css({
                      "width": "0"
                    });
        angular.element('.rt-grid__wrapper').css({
                      "width": "100%"
                    });
         angular.element('.table--fixed').css({
            "width": sharedService.getWindowWidth() > 1500 ? "100%" : "1700px"
          });
        angular.element('.grid-filter').toggleClass('hide');
    }

    function populateBhuReportFilterData(filter, startIndex){
      var q =  bhureport.selectedQuarter = filter.bhurptQuarter;
      var y =  bhureport.selectedYear = filter.bhurptYear;
      var p =  bhureport.selectedPhase = filter.bhurptPhase;
      var m = bhureport.selectedMonth = filter.bhurptMonth;

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

    function exportToExcel(){
        var phase = bhureport.filterBhuReport.bhurptPhase;
        var p = phase ? (phase.split(" ").length >1 ? phase.substr(0, phase.indexOf(" ")) :phase ): "0";
        var y = bhureport.filterBhuReport.bhurptYear ? bhureport.filterBhuReport.bhurptYear : "0";
        var q = bhureport.filterBhuReport.bhurptQuarter ? bhureport.filterBhuReport.bhurptQuarter : "0";
        var m = bhureport.filterBhuReport.bhurptMonth ? bhureport.filterBhuReport.bhurptMonth : "0" ;

        //this is the common url which will work for any filter
        window.location.href = reportservice.exportExcel(p, y, q, m);
    }
}
module.exports = BhuReportsController;