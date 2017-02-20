'use strict';

exports.__esModule = true;
//参考链接 https://gist.github.com/wjp2013/fff34c063cf0cf227d65 是否为微信
//参考链接 https://deviceatlas.com/blog/list-of-user-agent-strings 各类useragent
//参考链接 https://techblog.willshouse.com/2012/01/03/most-common-user-agents/ 各类useragent
var Brower = function Brower() {},
    brower = new Brower(),
    user_agent = navigator.userAgent.toLowerCase(),
    APP_NAME = {
    'wechat': /micromessenger/,
    'alipay': /alipayclient/
},
    KERNER_NAME = {
    webkit: /(webkit)[ \/]([\w.]+)/,
    opera: /(opera)(?:.*version)?[ \/]([\w.]+)/,
    msie: /(msie) ([\w.]+)/,
    mozilla: /(mozilla)(?:.*? rv:([\w.]+))?/
};

var get_brower_name = function get_brower_name() {
    for (arrtibute in BROWER_NAME_ARRAY) {
        if (!BROWER_NAME_ARRAY.hasOwnProperty(arrtibute)) continue;

        if (BROWER_NAME_ARRAY[arrtibute].test(user_agent)) {
            return arrtibute;
        }
    }
    return '';
};

/**
 * 参考http://www.prodevtips.com/2008/11/20/detecting-flash-player-version-with-javascript/
 */
var get_flash_version = function get_flash_version() {
    // ie
    try {
        try {
            // avoid fp6 minor version lookup issues
            // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
            var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
            try {
                axo.AllowScriptAccess = 'always';
            } catch (e) {
                return '6,0,0';
            }
        } catch (e) {}
        return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
        // other browsers
    } catch (e) {
        try {
            if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
            }
        } catch (e) {}
    }
    return '0,0,0';
};

/**
 * 参考 qq.com
 */
var get_type = function get_type() {
    if (/AppleWebKit.*Mobile/i.test(user_agent) || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(user_agent)) {
        try {
            //if(/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(user_agent)){
            //    return 'wap'
            //    window.location.href="http://xw.qq.com/index.htm";
            if (/iPad/i.test(user_agent)) {
                return 'pad';
            } else {
                return 'wap';
            }
        } catch (e) {}
    }
    return 'pc';
};

/**
 * 浏览器信息
 */
Brower.prototype.get_brower_info = function () {
    var brower_info = {
        app_name: '',
        app_base_version: '',
        app_version: '',
        kernel_name: '',
        kernel_base_version: '',
        kernel_version: '',
        //os_name: '',
        //os_base_version: '',
        //os_version: '',
        flash_base_version: '',
        flash_version: '',
        type: '' //wap pad pc
    };
};

exports['default'] = brower;