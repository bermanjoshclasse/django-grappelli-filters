
(function($) {

    $(document).ready(function(){


        ////////////////////////////////////////////////////////////////////////
        // prepare functions
        ////////////////////////////////////////////////////////////////////////


        // handle value change
        var urlParams = {};
        (function () {
            var match,
                pl = /\+/g, // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) {
                    return decodeURIComponent(s.replace(pl, " "));
                },
                query = window.location.search.substring(1);

            while (match = search.exec(query))
                urlParams[decode(match[1])] = decode(match[2]);
        })();


        //@TODO make array of filter_queries instead of setting up multiple timers
        window.detect_change = function(filter_query) {
            setTimeout(function(){detect_change(filter_query);}, 100);
            var new_val = $('#id_'+filter_query).val();
            if (detect_change_last_val[filter_query] == -1) {
                detect_change_last_val[filter_query] = new_val;
            }else {
                if (detect_change_last_val[filter_query] !== new_val) {
                    detect_change_last_val[filter_query] = new_val;
                    urlParams[filter_query] = new_val;

                    if (!urlParams[filter_query])
                        delete urlParams[filter_query];

                    url = buildUrl(window.location.href.split('?')[0], urlParams);
                    window.location = url;
                }
            }
        };
        window.detect_change_last_val = [];


        // autocomplete drop-down varies in width, make is fixed - don't seem to be a smarter way :/

        var fix_dropdown_width = function() {
            setTimeout(fix_dropdown_width, 100);
            $('ul.ui-autocomplete').width(200);
        };
        fix_dropdown_width();



        // url helper

        function buildUrl(url, parameters) {
            var qs = "";
            for (var key in parameters) {
                if (!parameters.hasOwnProperty(key)) continue;
                var value = parameters[key];
                qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
            }
            if (qs.length > 0) {
                qs = qs.substring(0, qs.length - 1); //chop-off trailing "&"
                url = url + "?" + qs;
            }
            return url;
        }
    });
})(grp.jQuery);
