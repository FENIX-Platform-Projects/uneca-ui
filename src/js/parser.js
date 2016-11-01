define([
    "jquery"
], function ($) {

    var s = {
        url : ''
    }

    function Parser(conf){

        //var url = 'http://example.com:3000/pathname/?search=test#hash';
        // parser.protocol; // => "http:"
        // parser.hostname; // => "example.com"
        // parser.port;     // => "3000"
        // parser.pathname; // => "/pathname/"
        // parser.search;   // => "?search=test"
        // parser.hash;     // => "#hash"
        // parser.host;     // => "example.com:3000"

        //Countrystat Info
        //lang = language of the ui
        //user = logged user
        //roles = roles of the logged user
        //userInfo = user info(if they're available)
        //country = country ISO3 code
        $.extend(s, conf);
    }

    Parser.prototype._parseURL = function (url) {
        var url = s.url;

        var parser = document.createElement('a'),
            searchObject = {},
            queries, split, i;
        // Let the browser do the work
        parser.href = url;
        // Convert query string to object
        queries = parser.search.replace(/^\?/, '').split('&');
        for (i = 0; i < queries.length; i++) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }

        var parsedUrl = {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            searchObject: searchObject,
            hash: parser.hash
        };

        return parsedUrl;
    }

    return Parser;
});