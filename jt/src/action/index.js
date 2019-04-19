/**
 * Created by 叶子 on 2017/7/30.
 */
import * as type from './actionType';
import * as http from '../axios/index';

//生成请求的action
const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});

//生成接收的action
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});

/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    return http[funcName](params).then(res =>{
        console.log(res);
        return dispatch(receiveData(res, stateName))
    } );
};

