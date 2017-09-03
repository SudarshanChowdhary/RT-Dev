AdminController.$inject = ['$state', '$scope', '$log'];

function AdminController($state, $scope, $log) {
    var vmadm = this;
    vmadm.admindata = [{
        "image": "images/folder.png",
        "title": "Repository Folder",
        "subtitle": "Create | Modify | Delete",
        "id": "1"
    }, {
        "image": "images/team.png",
        "title": "Team",
        "subtitle": "Create | Modify | Delete",
        "id": "2"
    }, {
        "image": "images/spotlight.png",
        "title": "Spotlight",
        "subtitle": "Create | Modify | Delete",
        "id": "3"
    }, {
        "image": "images/ticket.png",
        "title": "Tickets",
        "subtitle": "Create | Modify | Delete",
        "id": "4"
    }];
    // Variable Definitions
    // Function Definitions
    vmadm.init = init;
    vmadm.adminClick = adminClick;
    init();
    /**
     * init
     * Intializing On Load Services for Set Up Client Page
     */
    function init() {}

    function adminClick(id) {
        switch (id) {
            case '1':
                $state.go('root.admin.folder');
                break;
            case '2':
                $state.go('root.admin.team');
                break;
            case '3':
                $state.go('root.admin.spotlight');
                break;
            case '4':
                $state.go('root.admin.ticket');
                break;
        }
    }
}
module.exports = AdminController;