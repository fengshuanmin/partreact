/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import axios from 'axios';
import { message } from 'antd';
import {USER_INFO_GET} from '../utils/storeInfo';

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */


const defaultHeader = {
    appClientType:"BUYER",
    endpointType:"WEB",
    'Content-Type':"application/json;charset=UTF-8",
    appToken:USER_INFO_GET() && USER_INFO_GET().appToken || ''
}



export const get = ({url,params, msg = '接口异常', headers }) =>{

    url = url+"?";
    var has = false;
    for(let key in params){
        has = true
        url = url+key+"="+params[key]+"&"
    }
    url = url.substr(0, url.length - 1)
    return axios({
        url,
        headers:{...defaultHeader,...headers},
        method:'GET',
    }).then(res => res.data).catch(err => {
        console.log(err);
        message.warn(err.response.data.resultMessage||msg);

    });
}


/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({url, params, msg = '接口异常', headers}) =>{

    return axios({
        url,
        headers:{...defaultHeader,...headers},
        method:'POST',
        data:params,
    }).then(res =>{
        console.log(res);
        console.log(JSON.stringify(res));
        return res.data
    }).catch(err => {
        console.log(err);
        console.log(JSON.stringify(err));

        message.warn(err.response.data.resultMessage||msg);
    });

}




