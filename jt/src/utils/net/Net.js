
'use strict';
// import { CHE_BASE_URL_DEV} from "./Url";
// import {Log} from "../utils/Common";
// import {Token_get,LocalStor} from "./Common";
import Axios from "axios";
import {USER_INFO_GET} from '../../utils/storeInfo';

import {fetchData} from "../../action/index";
// import history from "../history";


const NETWORK_ERR = 400;//
const NETWORK_UNVERIFIED = 401;//
const NETWORK_500 = 500;//
const NETWORK_404 = 404;//

const NETWORK_NO_LOGIN = 403;//未登录

const NETWORK_SUCCESS = 200;//


export default class Net {



    /**
     * 网络请求
     * @param
     */
    static send = (data) => {

        console.log('请求data'+JSON.stringify(data));
        console.log(data)
        Axios(data)
            .then((response) => {
                console.log(response)
                return response.data;
            })
            .then((responseJson) => {
                data.call && data.call(responseJson);
            })
            .catch((error) => {

                console.log('错误'+JSON.stringify(error));
                data.err && data.err(error);
            });

    };


    static get(data, call, err) {
        Net.send(_formatParams(data, 'GET', call, err));
    }

    static post(data, call, err) {
        Net.send(_formatParams(data, "POST", call, err));
    }

    static put(data, call, err) {
        Net.send(_formatParams(data, "PUT", call, err));
    }

    static delete(data, call, err) {
        Net.send(_formatParams(data, "DELETE", call, err));
    }
    static upload(data, call, err) {
        console.log(USER_INFO_GET()&&USER_INFO_GET().appToken||'')
        console.log(data)
        Axios.post(data.url,data.data,{headers:{appToken : USER_INFO_GET()&&USER_INFO_GET().appToken||''}}).then(res=>{
            if(res.data){
                call&&call(res.data);
            }
        }).catch(errInfo=>{
            err&& err(errInfo)
        })
    }
}

const _formatParams = (data, method, call, err) => {
    let url = data.url;
    if((method === "GET" || method === "DELETE") && data.params){
        url = url+"?";
        var has = false;
        for(let key in data.params){
            has = true
            url = url+key+"="+data.params[key]+"&"
        }
        if(has){
            url = url.substr(0, url.length - 1)
        }
    }



    let appToken = "";
    if(USER_INFO_GET()  && USER_INFO_GET().appToken){
        appToken = USER_INFO_GET().appToken;
    }
    let headers = {
        appToken,
        appClientType:"VENDOR",
        endpointType:"WEB",
        'Content-Type':"application/json;charset=UTF-8"
    }

    return {
        url,
        data: data.params,
        method,
        call,
        err,
        headers: {...headers,...data.headers}
    }
};

