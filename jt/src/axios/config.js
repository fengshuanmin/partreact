/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth'; // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin'; // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor' // 访问权限接口









//登陆
export const URL_login =  '/api/login';

//注册
export const URL_register =  '/api/register';

//忘记密码
export const URL_reset_password = '/api/reset_password';

//修改密码
export const URL_modify_password = '/api/modify_password';

//发送短信  /api/get_verification_code/{mobile}
export const URL_get_verification_code = '/api/get_verification_code/';
//注册公司

export const URL_vendor_account_profile_company = '/api/vendor/account/profile/company';

//根据名字查询公司

export const URL_vendor_account_query_company = '/api/vendor/account/query/company';






