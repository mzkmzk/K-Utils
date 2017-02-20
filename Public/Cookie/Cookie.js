'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getKeys = Object.names || function (obj) {
    var names = [],
        name = '';
    for (name in obj) {
        if (obj.hasOwnProperty(name)) names.push(name);
    }
    return names;
};
function isPlainObject(value) {
    return !!value && Object.prototype.toString.call(value) === '[object Object]';
}
function isArray(value) {
    return value instanceof Array;
}
function toArray(value) {
    return Array.prototype.slice.call(value);
}
function Cookie() {
    if (!(this instanceof Cookie)) {
        return new Cookie();
    };
}
function decode(str) {
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
}

function encode(str) {
    return encodeURIComponent(str);
}
Cookie.prototype = {
    get: function get(name, space) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';'); //把cookie分割成组    
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]; //取得字符串    
            while (c.charAt(0) == ' ') {
                //判断一下字符串有没有前导空格    
                c = c.substring(1, c.length); //有的话，从第二位开始取    
            }
            //如果含有我们要的name
            if (c.indexOf(nameEQ) == 0) {
                return decode(c.substring(nameEQ.length, c.length)); //解码并截取我们要值    
            }
        }
        return false;
    },
    set: function set(name, value, options) {
        if (isPlainObject(name)) {
            for (var k in name) {
                if (name.hasOwnProperty(k)) this.set(k, name[k], value);
            }
        } else {
            var opt = isPlainObject(options) ? options : { expires: options },
                expires = opt.expires !== undefined ? opt.expires : '',
                expiresType = typeof expires === 'undefined' ? 'undefined' : _typeof(expires),
                path = opt.path !== undefined ? ';path=' + opt.path : ';path=/',
                domain = opt.domain ? ';domain=' + opt.domain : '',
                secure = opt.secure ? ';secure' : '',
                space_name = opt.space ? opt.space : null,
                space = '';

            //过期时间
            if (expiresType === 'string' && expires !== '') expires = new Date(expires);else if (expiresType === 'number') expires = new Date(+new Date() + expires);
            if (expires !== '' && 'toGMTString' in expires) expires = ';expires=' + expires.toGMTString();

            document.cookie = name + "=" + encode(value) + expires + path + domain + secure; //转码并赋值    
        }
    },
    remove: function remove(names) {
        names = isArray(names) ? names : toArray(arguments);
        for (var i = 0, l = names.length; i < l; i++) {
            this.set(names[i], '', -1);
        }
        return names;
    },
    clear: function clear(name) {
        return name ? this.remove(name) : this.remove(getKeys(this.all()));
    },
    all: function all() {
        if (document.cookie === '') return {};
        var cookies = document.cookie.split('; '),
            result = {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var item = cookies[i].split('=');
            result[decode(item[0])] = decode(item[1]);
        }
        return result;
    }
};

var cookie = function cookie(name, value, options) {
    var argm = arguments;
    if (argm.length === 0) return Cookie().all();
    if (argm.length === 1 && name === null) return Cookie().clear();
    if (argm.length === 2 && !value) return Cookie().clear(name);
    if (typeof name == 'string' && !value) return Cookie().get(name);
    if (isPlainObject(name) || argm.length > 1 && name && value) return Cookie().set(name, value, options);
    if (value === null) return Cookie().remove(name);
    return Cookie().all();
};
for (var a in Cookie.prototype) {
    cookie[a] = Cookie.prototype[a];
}exports['default'] = cookie;