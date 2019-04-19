

var url='http://139.196.16.229:10000'
//吴松接口的地址（在下面的路径前加url例如：export const URL_login = url+ '/api/login';）

//登陆
export const URL_login = url+ '/api/login';

//注册
export const URL_register = url+ '/api/register';

//忘记密码
export const URL_reset_password = url+ '/api/reset_password';

//修改密码
export const URL_modify_password =  '/api/modify_password';

//发送短信  /api/get_verification_code/{mobile}
export const URL_get_verification_code = '/api/get_verification_code/';
//注册公司

export const URL_vendor_account_profile_company = '/api/vendor/account/profile/company';

//根据名字查询公司

export const URL_vendor_account_query_company = '/api/vendor/account/query/company';


//图片解析
 export const URL_vin_screenshot_analysis =url+'/api/vin/screenshot/analysis'
//获取autogroup
export const URL_vin_find_autogroups =url+'/api/vin/find/autogroups'
//零件识别接口图片解析
export const URL_parts_screenshot_analysis =url+'/api/parts/screenshot/analysis'
//昵称获取标准名:
export const URL_std_for_stdname ='/std_for_stdname'
//订单中心
export const URL_ai_order_list ='/api/ai/order/list'
//获取车型的主要特征
export const URL_vin_find_auto ='/api/vin/find/auto'
//截屏报价
export const URL_id_and_std_search ='/id_and_std_search'
//对外库存共享
export const URL_share_for_me ='/share_for_me'
//商品列表
export const URL_api_parts_sku_list=url+'/api/parts/sku/list'
//商品列表上下架
export const URL_api_parts_sku_onlineParts=url+'/api/parts/sku/onlineParts'
//商品列表删除
export const URL_api_parts_sku_delete=url+'/api/parts/sku/delete'
//商品新增
export const URL_api_parts_sku_getMarker=url+'/api/parts/sku/getMarker'
//模糊查询零件
export const URL_api_parts_sku_getStdNameList=url+'/api/parts/sku/getStdNameList'
//获取配件品质
export const URL_api_parts_sku_getConfigQualitys=url+'/api/parts/sku/getConfigQualitys'
//获取质保期限
export const URL_api_parts_sku_getConfigWarrantys=url+'/api/parts/sku/getConfigWarrantys'
//商品保存提交
export const URL_api_parts_sku_save=url+'/api/parts/sku/save'
//商品图片的提交
export const URL_api_parts_sku_uploadPartImg=url+'/api/parts/sku/uploadPartImg'
//新增商品获取picId
export const URL_api_parts_sku_getPicId=url+'/api/parts/sku/getPicId'
//修改商品的详情页接口
export const URL_api_parts_sku_info=url+'/api/parts/sku/info'
//提交修改
export const URL_api_parts_sku_update=url+'/api/parts/sku/update'
export const URL_Brand_models='/brand_maker'
//个人设置页面
export const URL_api_vendor_account_info=url+'/api/vendor/account/info'
//公司设置
export const URL_api_vendor_account_companyInfo=url+'/api/vendor/account/companyInfo'
//修改密码
export const URL_api_reset_password=url+'/api/reset_password'
//短信验证码
export const URL_api_get_verification_code=url+'/api/get_verification_code'
