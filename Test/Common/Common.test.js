//const common = require('../../Public/Common/Common')
import common from '../../Public/Common/Common'
const TEST_URL = {
    'common': 'http://xunlei.com/a/b?name=404&author=mzk#ahaha'
}
//console.log(window);
test('get_url_info',() => {
    var url_info = common.get_url_info( TEST_URL.common );
    expect(url_info).toEqual({
        is_url: true,
        protocol: 'http', //
        hostname: 'xunlei.com',
        port: 80,
        pathname: ['a','b'],
        search: {
            name: '404',
            author: 'mzk'
        },
        hash: 'ahaha',
        host: 'xunlei.com'
    });
})