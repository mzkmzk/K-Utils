//const common = require('../../Public/Common/Common')
import brower from '../../Src/Brower/Brower'



describe('app_info', () => {
    test('wechat android', () => {
        expect( brower.get_app_info( 'mozilla/5.0 (linux; u; android 4.1.2; zh-cn; mi-one plus build/jzo54k) applewebkit/534.30 (khtml, like gecko) version/4.0 mobile safari/534.30 micromessenger/5.0.1.352' ))
            .toEqual({
                app_name: 'wechat',
                app_base_version: 5,
                app_version: '5.0.1.352'
            })
    })

    test('wechat iphone', () => {
        expect( brower.get_app_info( 'mozilla/5.0 (iphone; cpu iphone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206 micromessenger/5.0' ))
            .toEqual({
                app_name: 'wechat',
                app_base_version: 5,
                app_version: '5.0'
            })
    })

    test('alipapa', () => {
        expect( brower.get_app_info( ' Mozilla/5.0 (Linux; U; Android 5.1.1; en-us; KIW-AL10 Build/HONORKIW-AL10) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/1.0.0.100 U3/0.8.0 Mobile Safari/534.30 AlipayDefined(nt:WIFI,ws:360|592|3.0) AliApp(AP/9.5.3.030408) AlipayClient/9.5.3.030408 Language/zh-Hans ' ))
            .toEqual({
                app_name: 'alipay',
                app_base_version: 9,
                app_version: '9.5.3.030408'
            })
    })
})

// IE Edge Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393
// IE 11 Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3; rv:11.0) like Gecko
// IE 10 Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3)
// IE 9 Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3)"
// IE 8 Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3)


describe('kernel_info', () => {
    test('ie 8', () => {
        expect( brower.get_kernel_info( 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3' ))
            .toEqual({
                kernel_name: 'msie',
                kernel_base_version: 8,
                kernel_version: '8.0'
            })
    })

    test('ie 9', () => {
        expect( brower.get_kernel_info( 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3)' ))
            .toEqual({
                kernel_name: 'msie',
                kernel_base_version: 9,
                kernel_version: '9.0'
            })
    })

    test('ie 10', () => {
        expect( brower.get_kernel_info( ' Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3)' ))
            .toEqual({
                kernel_name: 'msie',
                kernel_base_version: 10,
                kernel_version: '10.0'
            })
    })

    test('ie 11', () => {
        expect( brower.get_kernel_info( 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; InfoPath.3; rv:11.0) like Gecko' ))
            .toEqual({
                kernel_name: 'msie',
                kernel_base_version: 11,
                kernel_version: '11.0'
            })
    })

    test('ie Edge', () => {
        expect( brower.get_kernel_info( 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393' ))
            .toEqual({
                kernel_name: 'webkit',
                kernel_base_version: 537,
                kernel_version: '537.36'
            })
    })
    
    //win 10 firefox Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0
    //mac firefox Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:51.0) Gecko/20100101 Firefox/51.0
    test('firefox',() => {
         expect( brower.get_kernel_info( 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0' ))
            .toEqual({
                kernel_name: 'mozilla',
                kernel_base_version: 50,
                kernel_version: '50.0'
            })
    })
})