'use strict';

exports.__esModule = true;
var Common = function Common() {},
    _common = new Common();

var _is_url = function _is_url(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
};

var _get_url_param = function _get_url_param(search) {
    var result = null,
        tmp = [];
    if (search === '') return result;

    var items = search.substr(1).split('&');
    if (items && items.length !== 0) result = {};
    for (var i = items.length - 1; i >= 0; i--) {
        tmp = items[i].split('=');
        result[tmp[0]] = _common.decode(tmp[1]);
    }
    return result;
};

Common.prototype.get_url_info = function (url) {
    var result = {
        is_url: false, //boolean
        protocol: '', //
        hostname: '',
        port: '',
        pathname: [],
        search: [],
        hash: '',
        host: ''
    },
        parser,
        pathname_array;
    result.is_url = _is_url(url);
    if (!result.is_url) return result;

    parser = document.createElement('a');
    parser.href = url;
    pathname_array = parser.pathname.split('/');

    result.protocol = parser.protocol.replace(':', ''); // http|https
    result.hostname = parser.hostname;
    result.port = parser.port || 80;
    //console.log(pathname_array);
    for (var i = 0; i < pathname_array.length; i++) {
        if (pathname_array[i] !== '') {
            result.pathname.push(pathname_array[i]);
        }
    }

    result.search = _get_url_param(parser.search);
    result.hash = parser.hash.replace('#', '');
    result.host = parser.host;

    return result;
};

Common.prototype.decode = function (str) {
    var r = '';
    try {
        r = decodeURIComponent(decodeURIComponent(str));
    } catch (e) {
        try {
            r = decodeURIComponent(str);
        } catch (e) {
            r = str;
        }
    }
    return r;
};

exports['default'] = _common;