DefectsController.$inject = ['$state', '$scope', '$http','$filter','$sce', 'defectsservice', 'sharedService'];

function DefectsController($state, $scope, $http, $filter,$sce, defectsservice, sharedService) {
    var vmdef = this;
    vmdef.filterDefects = {};
    vmdef.count = 0;
    // vmdef.noDataMsg = '';
    
    // Variable Definitions
    // Function Definitions
   
    vmdef.init = init;
    vmdef.showFilterOptions = showFilterOptions;
    vmdef.populateDefectsDetailsData = populateDefectsDetailsData;
    vmdef.showFilterOptions = showFilterOptions;
    vmdef.populateDefectsFilterData = populateDefectsFilterData;
    vmdef.hideSideFilterOptions = hideSideFilterOptions;
    vmdef.resetFilter = resetFilter;
    vmdef.getDefectsList = getDefectsList;
    vmdef.checkFilterSelection = checkFilterSelection;
    vmdef.searchDefectsTable = searchDefectsTable;
    vmdef.calculateTotalRecords = calculateTotalRecords;
    vmdef.loadMore = loadMore;
    vmdef.exportToExcel = exportToExcel;
    init();
    vmdef.defectsError = false;  
    /**
     * init
     * Intializing On Load Services for Defects Page
     */
    function init() {
        vmdef.defectsFilterQuarter = sharedService.getQuarter();
        vmdef.defectFilterYear = sharedService.getYears();
         vmdef.gridOptions = {
            bindType: 1,
            data: {
                foo: {}
            },
            dataOptions: {
                nodata: 'No data'
            },
            enablePagination: true
        };
        vmdef.getDefectsList();
    }

    function getDefectsList(){
         defectsservice.getDefectsData().then(function(defectsData) {
            if(defectsData && defectsData.errorCode){
                $scope.$emit('alert', {
                message: 'RT Dashboard currently down for Maintenance. We will be back soon. Thank you for your patience.',
                success: false
            });
              vmdef.defectsError = true;  
           }else{
              vmdef.populateDefectsDetailsData(defectsData.defectDetails, defectsData.totalCount);
           }
        });

        }

    function populateDefectsDetailsData(defectsList, count){
        vmdef.gridOptions.dataOptions.nodata = '';
        vmdef.columns = [{
            headerText: 'Ticket Number',
            dataField: 'defectName',
            tdClasses: 'width15',
            thClasses: 'width15',
            sort: true
        }, {
            headerText: 'Description',
            dataField: 'description',
            thClasses: 'width60',
            tdClasses: 'width60'
        }, {
            headerText: 'Business Impact',
            dataField: 'bussinessImpact',
            thClasses: 'width15',
            tdClasses: 'width15',
            sort: true
        },{
            headerText: 'Status',
            dataField: 'status',
            thClasses: 'width10',
            tdClasses: 'width10'
        }];
        vmdef.itemRenderers = {
            'defectName': 'itemname-link-renderer',
            'description': 'defects-summary-item-renderer'
        };
        vmdef.data = defectsList;
        vmdef.dataCopy = angular.copy(vmdef.data);
        vmdef.defectsCount = count;
        if(vmdef.selectedYear && vmdef.selectedQuarter){
            vmdef.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the selected year - &quot;<b>'+vmdef.selectedYear+ '</b>&quot; and Quarter - &quot;<b>'+vmdef.selectedQuarter+ '</b>&quot;. Use filter to find other data');
        }else if(vmdef.selectedYear && !vmdef.selectedQuarter){
            vmdef.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the selected year - &quot;<b>'+vmdef.selectedYear+'</b>&quot;. Use filter to find other data');
        }else{
            vmdef.gridOptions.dataOptions.nodata = 'No data found for the current quarter. Use filter to find other data';
        }
        vmdef.calculateTotalRecords(vmdef.defectsCount);
    }

    function searchDefectsTable(keyword){
        vmdef.count = 0;
        vmdef.count = vmdef.count  + 1;
        $scope.$watch('vmdef.filterDefects.searchKeyword', function(){
             if(keyword && keyword.length == 0){
                        vmdef.data = vmdef.dataCopy;
                    }
                    else if(keyword && keyword.length>=2){

                        // var filteredData;
                            vmdef.data = $filter('filter')(vmdef.data, function(data) {
                              
                            if  (data.defectName == null){
                                data.defectName = "";
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

                                return data.defectName.toString().toLowerCase().indexOf(vmdef.filterDefects.searchKeyword.toLowerCase()) > -1 || data.description.toString().toLowerCase().indexOf(vmdef.filterDefects.searchKeyword.toLowerCase()) > -1 
                                    || data.category.toString().toLowerCase().indexOf(vmdef.filterDefects.searchKeyword.toLowerCase()) > -1 || data.bussinessImpact.toString().toLowerCase().indexOf(vmdef.filterDefects.searchKeyword.toLowerCase()) > -1
                                    || data.status.toString().toLowerCase().indexOf(vmdef.filterDefects.searchKeyword.toLowerCase()) > -1;

                            
                            });
                         vmdef.gridOptions.dataOptions.nodata = $sce.trustAsHtml('No data found for the search keyword &quot;<b>'+keyword+'</b>&quot;');
                    }else{
                        vmdef.data = vmdef.dataCopy;
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

    function populateDefectsFilterData(filterdefects, startIndex){
        vmdef.selectedQuarter = filterdefects.defectQuarter;
        vmdef.selectedYear = filterdefects.defectYear;
        if(filterdefects.defectYear && !filterdefects.defectQuarter){
             defectsservice.getDefectsFilterDetailsByYear(filterdefects.defectYear, startIndex).then(function(resp){
                if(resp && resp.errorCode){
                $scope.$emit('alert', {
                message: resp.message,
                success: false
            });
           }else{
               vmdef.populateDefectsDetailsData(resp.defectDetails, resp.totalCount);
           }
            });
         }else if(filterdefects.defectYear && filterdefects.defectQuarter){
                defectsservice.getDefectsFilterDetailsByQuarter(filterdefects.defectYear, filterdefects.defectQuarter, startIndex).then(function(resp){
                    if(resp && resp.errorCode){
                        $scope.$emit('alert', {
                        message: resp.message,
                        success: false
                    });
           }else{
                   vmdef.populateDefectsDetailsData(resp.defectDetails, resp.totalCount);
               }
                });
        }
         vmdef.filterDefects.searchKeyword = '';
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
        vmdef.filterDefects = {};
        vmdef.selectedYear = '';
        vmdef.selectedQuarter = '';
        vmdef.getDefectsList();
    }

    function checkFilterSelection(filterSelected){
        if(!filterSelected.defectYear){
            return true;
            }
            else{
                return false;
            }
    }

    function calculateTotalRecords(c){
        vmdef.count = 0;
        vmdef.count = vmdef.count  + 1;
        vmdef.nOfIndexs = (Math.round(c / 100));
    }

    function loadMore(i){   
        vmdef.count = vmdef.count  + 1;
        if(vmdef.selectedYear && !vmdef.selectedQuarter){
            defectsservice.getDefectsFilterDetailsByYear(vmdef.selectedYear, (100*i)+1).then(function(resp){
                vmdef.data =  vmdef.data.concat(resp.defectDetails);
            });
        }else if(vmdef.selectedYear && vmdef.selectedQuarter){
            defectsservice.getDefectsFilterDetailsByQuarter(vmdef.selectedYear, vmdef.selectedQuarter, (100*i)+1).then(function(resp){
                vmdef.data =  vmdef.data.concat(resp.defectDetails);
            });
        }else{
             defectsservice.getDefectsData((100*i)+1).then(function(resp){
                vmdef.data =  vmdef.data.concat(resp.defectDetails);
           });
         }
    }

    function exportToExcel(){
        if(vmdef.filterDefects.defectYear && !vmdef.filterDefects.defectQuarter){
            window.location.href = defectsservice.exportToExcelByYear(vmdef.filterDefects.defectYear);
        }else if(vmdef.filterDefects.defectYear && vmdef.filterDefects.defectQuarter){
            window.location.href = defectsservice.exportToExcelByQuarter(vmdef.filterDefects.defectYear, vmdef.filterDefects.defectQuarter);
        }else{
            window.location.href = defectsservice.exportToExcelCurrentQuarter();
        }
    }

}
module.exports = DefectsController;