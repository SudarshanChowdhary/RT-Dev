HomeController.$inject = ['$state', '$scope', '$log', '$filter', '$document', 'adminservice'];

function HomeController($state, $scope, $log, $filter, $document, adminservice) {
    var vmhome = this;
    // Variable Definitions
    
    $('.carousel').carousel({
        interval: 4000
    });
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = vmhome.slides = [];
    var currIndex = 0;
    vmhome.sliderModules = [];
    // Function Definitions
    vmhome.init = init;
    vmhome.getSlidesData = getSlidesData;
    vmhome.populateSliderEvents = populateSliderEvents;
    init();
    /**
     * init
     * Intializing On Load Services for Home Page
     */
    function init() {
      
        vmhome.getSlidesData();
    }

    function getSlidesData() {
        adminservice.getAdminSpotlightData().then(function(adminData) {
            if(adminData.errorCode){
                $scope.$emit('alert', {
                message: adminData.errorCode +" " +adminData.message,
                success: false
            });
            }else{
                 vmhome.populateSliderEvents(adminData);
            }
           
        });
    }

    function populateSliderEvents(spotLightsArray) {
        vmhome.repositoryArr, vmhome.ticketsArr, vmhome.defectsArr , vmhome.teamArr = [];
        angular.forEach(spotLightsArray, function(value, key) {
            vmhome.repositoryArr = $filter('filter')(spotLightsArray, {
                module: 'Repository'
            });
            vmhome.ticketsArr = $filter('filter')(spotLightsArray, {
                module: 'Tickets'
            });
            vmhome.defectsArr = $filter('filter')(spotLightsArray, {
                module: 'Defects'
            });
            vmhome.teamArr = $filter('filter')(spotLightsArray, {
                module: 'Team'
            });
            vmhome.reportsArr = $filter('filter')(spotLightsArray, {
                module: 'Reports'
            });
        });
    }
}
module.exports = HomeController;