TeamService.$inject = [
     '$http',
    '$q',
    'spinnerService'
];

function TeamService($http, $q,spinnerService) {
	var teamService = {
        getTeamChart: getTeamChart,
        getSelectedTeamMemberDetails:getSelectedTeamMemberDetails
    };

    return teamService;

    function getTeamChart(group) {
        var def = $q.defer();
         spinnerService.show();
            $http.get("team/teamstructure/"+group)
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

    function getSelectedTeamMemberDetails(email) {
        var def = $q.defer();
         spinnerService.show();
            $http.get("homepage/personphoto?emailId="+email)
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

	
}

module.exports = TeamService;
