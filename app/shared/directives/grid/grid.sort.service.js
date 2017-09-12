module.exports = function(app) {
    app.factory('gridSortComparator', function() {
        return {
            numericalSort: function sortNumber(prop) {
                return function(a, b) {
                    return a[prop] - b[prop];
                }
            },
            dateSort: function sortDate(prop) {
                return function(a, b) {
                    return new Date(a[prop]).getTime() - new Date(b[prop]).getTime();
                };
            }
        };
    });
}