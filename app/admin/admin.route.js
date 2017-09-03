AdminRoute.$inject = ['$stateProvider'];

function AdminRoute($stateProvider) {
    $stateProvider.state('root.admin', {
        url: '/admin',
        views: {
            '@root': {
                templateUrl: 'app/admin/templates/admin.html',
                controller: 'AdminController',
                controllerAs: 'vmadm'
            }
        },
        ncyBreadcrumb: {
            label: 'Admin'
        }
    }).state('root.admin.folder', {
        url: '/Folder',
        views: {
            '@root': {
                templateUrl: 'app/admin/templates/adminFolder.html',
                controller: 'AdminFolderController',
                controllerAs: 'vmfol'
            }
        },
        ncyBreadcrumb: {
            label: 'Modify Folder'
        }
    }).state('root.admin.team', {
        url: '/Team',
        views: {
            '@root': {
                templateUrl: 'app/admin/templates/adminTeam.html',
                controller: 'AdminTeamController',
                controllerAs: 'vmtea'
            }
        },
        ncyBreadcrumb: {
            label: 'Modify Team'
        }
    }).state('root.admin.spotlight', {
        url: '/Spotlight',
        views: {
            '@root': {
                templateUrl: 'app/admin/templates/adminSpotlight.html',
                controller: 'AdminSpotlightController',
                controllerAs: 'vmspo'
            }
        },
        ncyBreadcrumb: {
            label: 'Modify Spotlight'
        }
    }).state('root.admin.ticket', {
        url: '/Ticket',
        views: {
            '@root': {
                templateUrl: 'app/admin/templates/adminTicket.html',
                controller: 'AdminTicketController',
                controllerAs: 'vmtic'
            }
        },
        ncyBreadcrumb: {
            label: 'Modify Ticket'
        }
    })
}
module.exports = AdminRoute;