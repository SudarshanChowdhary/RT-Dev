var UrlPattern = require('url-pattern');
var config = require('./config-loader')();
var fs = require('fs');
var mockConfig = require('../../' + config.mock.config) || {};

module.exports = function (req, res, next) {
    for (var url in mockConfig) {
        var pattern = new UrlPattern(url);
        var match = pattern.match(req.url);
        if (match) {
            url = mockConfig[url];
            url = (new UrlPattern(url)).stringify(match);
            res.setHeader("Content-Type", "application/json");            
            res.end(JSON.stringify(JSON.parse(fs.readFileSync(config.mock.path + url, 'utf8'))));
            break;
        }
    }
    next();
};