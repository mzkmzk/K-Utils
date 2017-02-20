//参考链接 https://gist.github.com/wjp2013/fff34c063cf0cf227d65 是否为微信
//参考链接 https://www.v2ex.com/t/305696 检查是否为支付宝
//参考链接 https://deviceatlas.com/blog/list-of-user-agent-strings 各类useragent
//参考链接 https://techblog.willshouse.com/2012/01/03/most-common-user-agents/ 各类useragent
var Brower = function Brower( user_agent ) {}, 
    brower = new Brower(),
    user_agent = navigator.userAgent.toLowerCase()
    

Brower.prototype.get_app_info = function( user_agent ) {
  
  var APP_NAME = {
        'wechat': /(micromessenger)[ \/]([\w.]+)/i,
        'alipay': /(alipayclient)[ \/]([\w.]+)/i
      },
      name,
      match_result,
      app_info = {
        app_name: '',
        app_base_version: '',
        app_version: '',
      }

  if ( typeof user_agent !== 'string') return app_info
  
  for ( name in APP_NAME ) {

    match_result = user_agent.match( APP_NAME[name] )
    
    if ( match_result !== null ) {
      app_info = {
        app_name: name,
        app_base_version: parseInt(match_result[2]) || '',
        app_version: match_result[2] || ''
      }
      break
    }
  }
  return app_info
}

Brower.prototype.get_kernel_info = function( user_agent ) {
  var KERNEL_NAME = {
        webkit: /(webkit)[ \/]([\w.]+)/i,
        opera: /(opera)(?:.*version)?[ \/]([\w.]+)/i,
        msie: /(?:(msie) ([\w.]+))|(?:(Trident)(?:.*? rv:([\w.]+))?)/i, //前者为IE8 9 10  后者为IE11
        mozilla: /(mozilla)(?:.*? rv:([\w.]+))?/i,
      },
      name,
      match_result,
      kernel_info = {
        kernel_name: '',
        kernel_base_version: '',
        kernel_version: '',
      }

  if ( typeof user_agent !== 'string') return kernel_info
  
  for ( name in KERNEL_NAME ) {

    match_result = user_agent.match( KERNEL_NAME[name] )
    
    if ( match_result !== null ) {
      kernel_info = {
        kernel_name: name,
        kernel_base_version: parseInt(match_result[2]) ||  parseInt(match_result[4]) ||'',
        kernel_version: match_result[2]  || match_result[4] || ''
      }
      break
    }
  }
  return kernel_info
} 

/**
 * 参考http://www.prodevtips.com/2008/11/20/detecting-flash-player-version-with-javascript/
 */
Brower.prototype.get_flash_info = function( ){
  var flash_info = {
    flash_base_version: '',
    flash_version: '',
  }
  // ie
  try {
    try {
      // avoid fp6 minor version lookup issues
      // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
      var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
      try { axo.AllowScriptAccess = 'always'; }
      catch(e) { flash_info.flash_version = '6.0.0'; }
    } catch(e) {}
    flash_info.flash_version =  new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
  // other browsers
  } catch(e) {
    try {
      if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
        flash_info.flash_version =  (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
      }
    } catch(e) {}
  }

  flash_info.flash_version = flash_info.flash_version.replace(',','.');
  flash_info.flash_base_version = parseInt( flash_info.flash_version ) || ''
  return flash_info;
}


Brower.prototype.get_type = function( user_agent ){
    if(/AppleWebKit.*Mobile/i.test(user_agent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(user_agent))){  
      try{
          //if(/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(user_agent)){
          //    return 'wap'
          //    window.location.href="http://xw.qq.com/index.htm";
          if(/iPad/i.test(user_agent)){
              return 'pad'
          }else{
              return 'wap'
          }
      }catch(e){}
    }
    return 'pc';
}


/**
 * 浏览器信息
 */
Brower.prototype.get_brower_info = function( user_agent ) {
    var app_info = this.get_app_info( user_agent ),
        kernel_info  = this.get_kernel_info( user_agent ),
        flash_info = this.get_flash_info( user_agent ),
        type = this.get_type( user_agent ),
        brower_info = {
            app_name: app_info.app_name,
            app_base_version: app_info.app_base_version,
            app_version: app_info.app_version,
            kernel_name: kernel_info.kernel_name,
            kernel_base_version: kernel_info.kernel_base_version,
            kernel_version: kernel_info.kernel_version,
            //os_name: '',
            //os_base_version: '',
            //os_version: '',
            flash_base_version: '',
            flash_version: '',
            type: ''//wap pad pc
        };
    
};

export default brower