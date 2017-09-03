RepositoryFilter.$inject = ['$sce'];

function RepositoryFilter($sce) {
    return function(htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }
}
module.exports = RepositoryFilter;