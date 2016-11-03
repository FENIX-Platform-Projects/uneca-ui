define([
    'loglevel',
    'handlebars'
], function (log, Handlebars) {

    module.exports = function (data, context, options) {

        var result = '';

        var firstDone = false;
        var secondDone = false;

        var lang = data.lang;
        var countries_list = data.countries;

        for (var i = 0, length = countries_list.length; i < length; i++) {
            // first
            if (i === 0 || i % 3 === 0) {
                //result+= '<div>';
                result += '<div class="col-md-4 country-item">' +
                    '<div data-country_code ="'+countries_list[i].code+'" data-country_title ="'+countries_list[i].title[lang]+'">'
                    + countries_list[i].title[lang] +'</div></div>';
                firstDone = true;
            } else if (i === 1 || firstDone) {
                result += '<div class="col-md-4 country-item">' +
                    '<div data-country_code ="'+countries_list[i].code+'" data-country_title ="'+countries_list[i].title[lang]+'">'
                    + countries_list[i].title[lang] +'</div></div>';
                firstDone = false;
                secondDone = true;
            } else if (i === 2 || secondDone) {
                result += '<div class="col-md-4 country-item">' +
                    '<div data-country_code ="'+countries_list[i].code+'" data-country_title ="'+countries_list[i].title[lang]+'">'
                    + countries_list[i].title[lang] +'</div></div>';
                //result+= '</div>';
                secondDone = false;
            }
        }
        return new Handlebars.SafeString(result);
    };
}
);