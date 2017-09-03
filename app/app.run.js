AppRun.$inject = [
    'sharedService', '$state', '$rootScope', '$location', 'checkRepositoryService'
];

function AppRun(sharedService, $state, $rootScope, $location, checkRepositoryService) {
	 $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
  
  		if(toState && toState.name.split('.')[1]=='admin'){
        checkRepositoryService.show();
  			sharedService.getUser().then(function(user){
  		 	if(user.roles && user.roles.length && user.roles.indexOf('admin') > -1){
            checkRepositoryService.show();
	           return
	         }else{
            checkRepositoryService.show();
	         	$state.go('home');
	         }
  		 });
  		}else if(toState && toState.name.split('.')[1]=='repository'){
        checkRepositoryService.hide();
      }else{
        checkRepositoryService.show();
  		}
  		 
	});

   $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
           if(error){
            console.log(error);
            event.preventDefault();
            $state.go('root.error');
           }
        });
    
   $rootScope.currentYear = new Date().getFullYear();
}

module.exports = AppRun;