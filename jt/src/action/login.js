import React from 'react';
import Net from '../utils/net/Net';
import  {URL_login} from '../utils/net/Url';
import {USER_INFO_SAVE} from '../utils/storeInfo';
import * as types from './actionType';


export const loginReq = params =>{

    return dispatch=>{
        Net.post({url:URL_login,params},res=>{
            if(res.result){
                let {accountId,companyId,appToken} = res;
                USER_INFO_SAVE({accountId,companyId,appToken})
                dispatch({type:types.LOGIN_INFO,data:res})
            }
        },err=>{

        })
    }



}
