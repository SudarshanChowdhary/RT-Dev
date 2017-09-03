PhotoService.$inject = [
    '$http'
];

function PhotoService($http) {

    return {
      getPhoto: getPhoto
    };

    function getPhoto(dsEmail) {
        var def = $q.defer();
         spinnerService.show();
            $http.get("personPhoto/"+dsEmail)
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

module.exports = PhotoService;