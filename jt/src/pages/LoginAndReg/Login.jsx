/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import $ from 'jquery'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';
import { PwaInstaller } from '../../components/widget/index';
import {USER_INFO_SAVE} from '../../utils/storeInfo';
import Net from '../../utils/net/Net';
import {loginReq} from '../../action/login';
import axios from 'axios';
import {URL_login} from "../../utils/net/Url";

const FormItem = Form.Item;

class Login extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isRem:true
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;

         dispatch(receiveData(null, 'login'))
    }
    /*componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const {loginInfo,history} = this.props;

        console.log(this.props,'1234');
        console.log(loginInfo)
        console.log(history)
        if(loginInfo &&loginInfo.accountId){
            const {accountId,appToken,companyId} =  loginInfo;
            USER_INFO_SAVE({accountId,appToken,companyId});
            localStorage.setItem('apptoken',loginInfo.appToken)
            history.push('/app/smartquotation');
        }

    }*/
    handleSubmit = (e) => {
        console.log(this.props)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                console.log('123')
                var dat={
                    username:values.userName,password:values.password
                }
                $.ajax({
                    url:URL_login,
                    type:'post',
                    data:JSON.stringify(dat),
                    headers:{"Content-Type":"application/json","appClientType":"VENDOR","appToken":'1'},
                    success:(res)=>{
                        console.log(res)
                        if(res.result==true){
                            let {accountId,companyId,appToken} = res;
                            USER_INFO_SAVE({accountId,companyId,appToken})
                            console.log(this.props)
                            if(localStorage.getItem('vehistateList')){
                                localStorage.removeItem('groupId','')
                                localStorage.removeItem('nicknames','')
                                localStorage.removeItem('vehistateList','')
                                localStorage.removeItem('partystateList','')
                            }
                            this.props.history.push('/app/smartquotation')
                        }else{
                            alert(res.msg)
                        }

                    }
                })
               /* this.setState({
                    isRem:values.remember
                })
                const {dispatch} = this.props;
                dispatch(loginReq({username:values.userName,password:values.password}));

                return
                console.log('Received values of form: ', values);*/
            }
        });
    };
    componentWillUnmount(){
        localStorage.setItem('stateList','')
        localStorage.setItem('groupId','')
        localStorage.setItem('nicknames','')
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login" style={{background:'#d2d6de'}}>
                <div className="login-form" >
                    <div className="login-logo">
                        <span>天鲲Ai</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}

                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                登录
                            </Button>
                            {/*<div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                {/*<span onClick={()=>{
                                    this.props.history.push('./reg')
                                }}>新用户注册</span>*/}
                                <span style={{cursor:'pointer'}} onClick={()=>{
                                    this.props.history.push('./fogetPwd')
                                }}>忘记密码</span>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToPorps = state => ({
    loginInfo:state.loginReducer.loginInfo
});

export default connect(mapStateToPorps)(Form.create()(Login));