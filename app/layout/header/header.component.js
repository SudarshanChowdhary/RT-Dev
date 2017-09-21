HeaderController.$inject = ['$state', 'sharedService', '$scope', '$rootScope'];

function HeaderController($state, sharedService, $scope, $rootScope) {
    var ctrl = this;
    ctrl.$state = $state;
    ctrl.userDetails = {};
    ctrl.fullName = '';
    ctrl.userAvatar = '';
    ctrl.isAdminUser = false;
    ctrl.getTestScripts = getTestScripts;

    sharedService.getUser().then(function(user){
      if(user && user.errorCode){
                $scope.$emit('alert', {
                message: user.message+" please sign in again.",
                success: false
                  });
      }else{
        ctrl.fullName = user.firstName +' '+ user.lastName;
         if(ctrl.fullName){
             var nameStr = ctrl.fullName.split(' ');
            var avatar = '';
            for(var i =0;i<nameStr.length;i++){
                 avatar += nameStr[i].substring(0,1).toUpperCase();
            }
            ctrl.userAvatar = avatar;
         }
         if(user.roles && user.roles.length && user.roles.indexOf('admin') > -1){
          ctrl.isAdminUser = true;
         }
      }     
    });

  function getTestScripts(searchKeyword) {
    	if(searchKeyword.length >= 3 && isNaN(searchKeyword)){
    		sharedService.getSearchTestScripts(searchKeyword).then(function(resp) {
          if(resp && resp.errorCode){
            $scope.$emit('alert', {
                message: resp.message,
                success: false
            });
          }else{
              ctrl.searchResults =resp;
            $state.go('root.search', {searchParam: ctrl.searchResults});
          }          	
        });
    } 
    if(searchKeyword.length >= 5 && !isNaN(searchKeyword)){
        sharedService.getSearchTestScriptsByBhuid(searchKeyword).then(function(resp) {
            if(resp && resp.errorCode){
                $scope.$emit('alert', {
                  message: resp.message,
                  success: false
              });
            }else{
              ctrl.searchResults =resp;
              $state.go('root.search.Bhuid', {searchParam: ctrl.searchResults, bhuid:searchKeyword});
            }
        });
    }
  }
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if((toState && toState.name.split('.')[1]=="search") && ctrl.searchText){
              return
            }else{
              ctrl.searchText = '';
            }
          
    });
 }

module.exports = {
    controller: HeaderController,
    bindings: {},
    templateUrl: 'app/layout/header/header.html'
};