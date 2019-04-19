/**
 * Created by zhaofg on 2017/9/19.
 *
 * 网络请求相关中间件
 */
'use strict';

import loadReducer from './Request';
import {LOAD_DOING_TYPE, LOAD_DONE_TYPE, LOAD_ERROR_TYPE, LOAD_INIT_TYPE} from "./type";
import Net from  '../../../utils/net/Net'

/**
 * 自定义的网络请求对象
 * @param _fetch
 * @return {function({dispatch?: *, getState: *}): function(*=): function(*=)}
 */
const fetchMiddleware = (_fetch) => {
    return ({dispatch, getState}) => next => action => {
        if (!action.url) {
            return next(action);
        }

        _fetch && _fetch(action)
        return;

        // Middleware 接收了一个 next() 的 dispatch 函数，并返回一个 dispatch 函数，返回的函数会被作为下一个 middleware 的 next()
        next({
            type: LOAD_INIT_TYPE,
            status: action.type,
        });
        next({
            status: action.type,
            ...action
        });

        // 使用自定义的网络请求模块
        // 合并参数
        let data = Object.assign(action, {
            call: (res) => {
                next({
                    type: action.type,
                    data: res
                });

                next({
                    type: LOAD_DONE_TYPE,
                    status: action.type,
                    data: res
                });

                next({
                    type: LOAD_INIT_TYPE,
                    status: action.type
                });
            },
            err: (err) => {
                next({
                    type: LOAD_ERROR_TYPE,
                    status: action.type,
                    data: err
                });

                next({
                    type: LOAD_INIT_TYPE,
                    status: action.type
                });
            }
        });

        _fetch && _fetch(data);
    }
};
export {
    fetchMiddleware,
    loadReducer
};
