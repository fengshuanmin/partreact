/**
 * Created by zhaofg on 2017/12/15.
 *
 * 网络请求相关中间件
 */
'use strict';
import {LOAD_DOING_TYPE, LOAD_DONE_TYPE, LOAD_ERROR_TYPE, LOAD_INIT_TYPE} from "./type";

// 初始状态
const initialState = {
    status: 'init',
};
export default function loadReducer(state = initialState, action) {
    let subState = undefined;
    switch (action.type) {
        case LOAD_INIT_TYPE: // 初始化
            break;
        case LOAD_DOING_TYPE: // 正在请求数据
            break;
        case LOAD_DONE_TYPE: // 数据请求成功
            subState = {data: action.data};
            break;
        case LOAD_ERROR_TYPE: // 数据请求失败
            subState = {error: action.data};
            break;
        default:
            subState = undefined;
    }

    return updateState(action, subState)(state);
}

function updateState(action, newState) {
    newState = newState ? Object.assign({
        status: action.status,
        state: action.type
    }, newState) : newState;
    return (state) => {
        return newState ? Object.assign({}, state, newState) : state;
    }
}