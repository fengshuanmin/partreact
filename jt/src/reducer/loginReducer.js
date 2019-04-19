
import * as types from '../action/actionType';



export default function loginReducer (state = {} ,action) {


    switch (action.type){
        case types.LOGIN_INFO:
            return Object.assign({},state,{
                loginInfo:action.data
            })
        default:
            return state;
    }

}