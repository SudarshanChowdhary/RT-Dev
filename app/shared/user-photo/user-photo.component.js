PhotoController.$inject = [
    'photoservice'
];

function PhotoController(photoservice) {
    var ctrl = this;

    ctrl.photo = null;

    photoservice.getPhoto(ctrl.dsid, function (photo) {
        ctrl.photo = photo;
    });
}

var userPhotoComponent = {
    templateUrl: 'app/shared/user-photo/user-photo.html',
    bindings: {
        dsemail: '<',
        className: '@'
    },
    controller: PhotoController
};

module.exports = userPhotoComponent;