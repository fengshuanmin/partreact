
import React, {Component} from 'react';
import $ from 'jquery'
import {Button,Row,Col,message, Input,Form, Icon,Modal} from 'antd';

import  Net from '../../utils/net/Net';
import {
    URL_api_get_verification_code,
    URL_api_reset_password,
    URL_get_verification_code,
    URL_reset_password
} from '../../utils/net/Url';
import {USER_INFO_GET} from "../../utils/storeInfo";
const FormItem = Form.Item;

 class ForgotPassword extends Component{


    constructor(props){
        super(props)

        this.handleSubmit  = this.handleSubmit.bind(this);
        this.state = {
            btnLoading:false,
            isWait:false,
            btnInfo:'重新发送(60S)',
            tel:''
        }
    }

    timeChange(){
        let count = 60;
        var timer =  setInterval(()=>{
            count --;
            console.log(count);
            if(count >= 0){
                this.setState({
                    btnInfo:'重新发送('+count+'S)'
                })
            }else{
                clearInterval(timer);
                this.setState({
                    isWait:false
                })
            }
        },1000)
    }


    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(err )
            console.log(values )
            if(!err){
                if(values.pwd1 !== values.pwd2){
                    message.warn('两次密码不一样!')
                }else{
                    var dat={
                        username:values.tel,
                        verifyCode:values.captcha,
                        password:values.pwd1
                    }
                    console.log(this.props)
                    $.ajax({
                        url:URL_api_reset_password,
                        type:'post',
                        data:JSON.stringify(dat),
                        headers:{'appClientType':'VENDOR','Content-Type':'application/json'},
                        success:(res)=>{
                            console.log(res)
                            if(res.msg=='修改成功'){
                                const confirm=Modal.confirm;
                                var self=this
                                confirm({
                                    title: '提示',
                                    content: '密码修改成功',
                                    onOk() {
                                        window.history.back()
                                    },
                                    onCancel() {},
                                });
                            }
                        },
                        error:(err)=>{
                            message.warn(err.response.data.resultMessage || '请求失败')
                        }
                    })
                   /* Net.post({url:URL_reset_password,params:{
                        username:values.tel,
                        password:values.pwd1,
                        verifyCode:values.captcha}},res=>{
                    },err=>{
                        message.warn(err.response.data.resultMessage || '请求失败')
                    })*/
                }
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login" style={{background:'#d2d6de'}}>
                <div className="login-form" style={{height:500}}>
                    <div className="login-logo">
                        <span>天鲲Ai</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('tel', {
                                rules: [{ required: true, message: '请输入手机号!' }],
                            })(
                                <Input maxLength={11}  prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="请输入手机号"
                                       onChange={e=>{
                                           this.setState({
                                               tel:e.target.value
                                           })
                                       }}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Row gutter={8} >
                                <Col span={12}>
                                    {getFieldDecorator('captcha', {
                                        rules: [{ required: true, message: '请输入验证码!' }],
                                    })(
                                        <Input maxLength={11} placeholder="请输入验证码" />
                                    )}
                                </Col>
                                <Col span={12}>
                                    <Button disabled={this.state.isWait || this.state.tel.length !== 11} loading={this.state.btnLoading} onClick={()=>{
                                        this.setState({
                                            btnLoading:true
                                        })
                                        $.ajax({
                                            url:URL_api_get_verification_code+'/'+this.state.tel,
                                            headers:{'smsServiceType':'RESET_PASS_VERIFY_CODE',
                                                'appClientType':'VENDOR','Content-Type':'application/json'},
                                            success:(data)=>{
                                                console.log(data)
                                                this.setState({
                                                    btnLoading:false,
                                                    isWait:true
                                                },()=>{
                                                    this.timeChange.bind(this)();
                                                })
                                            },
                                            error:(err)=>{
                                                this.setState({
                                                    btnLoading:false,
                                                    isWait:true
                                                },()=>{
                                                    this.timeChange.bind(this)();
                                                })
                                            }
                                        })
                                       /* Net.get({url:URL_api_get_verification_code+'/'+this.state.tel,headers:{'smsServiceType':'RESET_PASS_VERIFY_CODE',
                                                'appClientType':'VENDOR','Content-Type':'application/json'}},res=>{
                                            this.setState({
                                                btnLoading:false,
                                                isWait:true
                                            },()=>{
                                                this.timeChange.bind(this)();
                                            })
                                        },err=>{
                                            this.setState({
                                                btnLoading:false,
                                                isWait:true
                                            },()=>{
                                                this.timeChange.bind(this)();
                                            })
                                        });*/
                                    }}>{this.state.isWait?this.state.btnInfo:'获取验证码'}</Button>

                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('pwd1', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('pwd2', {
                                rules: [{ required: true, message: '请重复输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请重复输入密码" />
                            )}
                        </FormItem>
                        <Button htmlType="submit" type='primary' style={{width:'100%'}}>重置密码</Button>

                        <p onClick={()=>{
                            if(this.props.history.length>2){
                                this.props.history.goBack();
                            }else{
                                this.props.history.push('./login');
                            }
                        }} style={{marginTop:30,cursor:'pointer'}}>返回登录界面</p>
                    </Form>

                </div>
            </div>
        )
    }

}

export default Form.create()(ForgotPassword)