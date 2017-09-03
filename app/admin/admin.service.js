AdminService.$inject = ['$http', '$q', 'spinnerService'];

function AdminService($http, $q, spinnerService) {
    var adminService = {
        getAdminData: getAdminData,
        getAdminSpotlightData: getAdminSpotlightData,
        saveAdminSpotLight: saveAdminSpotLight,
        updateAdminSpotLight: updateAdminSpotLight,
        deleteAdminSpotLight: deleteAdminSpotLight,
        getAdminFolderData: getAdminFolderData,
        saveAdminFolder: saveAdminFolder,
        updateAdminFolder: updateAdminFolder,
        deleteAdminFolder: deleteAdminFolder,
        getAdminTeamData: getAdminTeamData,
        saveAdminTeam: saveAdminTeam,
        updateAdminTeam: updateAdminTeam,
        deleteAdminTeam: deleteAdminTeam,
        getAdminTeamDetails: getAdminTeamDetails,
        getAdminTicketData: getAdminTicketData,
        saveAdminTicket: saveAdminTicket,
        updateAdminTicket: updateAdminTicket,
        deleteAdminTicket: deleteAdminTicket
    };
    return adminService;

    function getAdminData() {
        var def = $q.defer();
        spinnerService.show();
        $http.get("/api/admin").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getAdminSpotlightData() {
        var def = $q.defer();
        spinnerService.show();
        $http.get("https://rtdashboardp.rno.apple.com:9012/admin/spotlights").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function saveAdminSpotLight(spotLightData) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'POST',
            url: 'admin/spotlights',
            data: spotLightData
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to save data");
        });
        return def.promise;
    }

    function updateAdminSpotLight(spotLightData) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'PUT',
            url: 'admin/spotlights',
            data: spotLightData
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to save data");
        });
        return def.promise;
    }

    function deleteAdminSpotLight(sId) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'DELETE',
            url: 'admin/spotlights/' + sId
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to delete");
        });
        return def.promise;
    }
    //folder
    function getAdminFolderData() {
        var def = $q.defer();
        spinnerService.show();
        $http.get("admin/folders").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function saveAdminFolder(folderData) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'POST',
            url: 'admin/folders',
            data: folderData
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to save data");
        });
        return def.promise;
    }

    function updateAdminFolder(folderData) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'PUT',
            url: 'admin/folders',
            data: folderData
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to save data");
        });
        return def.promise;
    }

    function deleteAdminFolder(id) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'DELETE',
            url: 'admin/folders/' + id
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to delete");
        });
        return def.promise;
    }

    function getAdminTeamData() {
        var def = $q.defer();
        spinnerService.show();
        $http.get("admin/teamdetails").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getAdminTeamDetails() {
        var def = $q.defer();
        spinnerService.show();
        $http.get("admin/teamtype").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function saveAdminTeam(teamData) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'POST',
            url: 'admin/teamdetails',
            data: teamData
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to save data");
        });
        return def.promise;
    }

    function updateAdminTeam(teamData) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'PUT',
            url: 'admin/teamdetails',
            data: teamData
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to save data");
        });
        return def.promise;
    }

    function deleteAdminTeam(rtTeamMemberId) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'DELETE',
            url: 'admin/teamdetails/' + rtTeamMemberId
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to delete");
        });
        return def.promise;
    }
    //admin ticket

    function getAdminTicketData() {
        var def = $q.defer();
        spinnerService.show();
        $http.get("admin/ticketcategories").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function saveAdminTicket(ticketData) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'POST',
            url: 'admin/ticketcategory',
            data: ticketData
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to save data");
        });
        return def.promise;
    }

    function updateAdminTicket(ticketData) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'PUT',
            url: 'admin/ticketcategory',
            data: ticketData
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to save data");
        });
        return def.promise;
    }

    function deleteAdminTicket(id) {
        var def = $q.defer();
        spinnerService.show();
        $http({
            method: 'DELETE',
            url: 'admin/ticketcategory/' + id
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to delete");
        });
        return def.promise;
    }

}
module.exports = AdminService;