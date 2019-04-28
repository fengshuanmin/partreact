


import React,{Component} from 'react';
import $ from 'jquery'
import { Card,Form,Select,Input,Button,Modal} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {URL_api_vendor_account_info,URL_api_reset_password,URL_api_get_verification_code} from '../../utils/net/Url';
import {USER_INFO_GET} from "../../utils/storeInfo";

const { Option } = Select;


class  PwdSetting extends Component{

    constructor(props){
        super(props)
        this.state={
            vendorAccount:{
                username:'',
                verifyCode:'',
                password:''
            },
            password:'',
            flag:true,
            yzmflag:false
        }
    }
    vecode=()=>{
        $.ajax({
            url:URL_api_get_verification_code+'/'+this.state.vendorAccount.username,
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||'','smsServiceType':'RESET_PASS_VERIFY_CODE',
                'appClientType':'VENDOR','Content-Type':'application/json'},
            success:(data)=>{
                console.log(data)
                if(data.success==true){
                    this.setState({
                        flag:false,
                        yzmflag:true,
                        timer:59
                    })
                    var n = setInterval(()=>{
                        var j = this.state.timer;
                        this.setState({
                            timer:j
                        })
                        this.state.timer--;
                        if (this.state.timer <= 0) {
                            clearInterval(n);
                            this.setState({
                                flag:true,
                                yzmflag:false
                            })
                        }
                    }, 1000);
                    this.setState({
                        n:n
                    })
                }else{

                }
            },
            error:(err)=>{
                if(err.status=='401'){
                    alert('登陆失效，请重新登录')
                    this.props.history.push('/login')
                }
            }
        })
    }
    verifyCodeevent=(e)=>{
        const { vendorAccount = [] } = this.state;
        vendorAccount.verifyCode=e.target.value
        this.setState({
            vendorAccount
        });
    }
    newpasswordevent=(e)=>{
        const { vendorAccount = [] } = this.state;
        vendorAccount.password =e.target.value
        this.setState({
            vendorAccount
        });
    }
    comfirevent=(e)=> {
        this.setState({
            password:e.target.value
        });
    }
    comfir=()=>{
        if(this.state.password==this.state.vendorAccount.password){
            $.ajax({
                url:URL_api_reset_password,
                type:'post',
                data:JSON.stringify(this.state.vendorAccount),
                headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||'','appClientType':'VENDOR','Content-Type':'application/json'},
                success:(res)=>{
                    console.log(res)
                    if(res.msg=='修改成功'){
                        const confirm=Modal.confirm;
                        var self=this
                        confirm({title: '提示',
                            content: '密码修改成功'})
                        const {vendorAccount={}}=this.state
                        vendorAccount.verifyCode=''
                        vendorAccount.password=''
                        this.setState({
                            vendorAccount,
                            password:''
                        })
                    }
                },
                error:(err)=>{
                    if(err.status=='401'){
                        alert('登陆失效，请重新登录')
                        this.props.history.push('/login')
                    }
                }
            })
        }else{
            const confirm=Modal.confirm;
            var self=this
            confirm({title: '提示',
                content: '两次密码不一致，请重新输入'})
        }
    }
    componentDidMount(){
        $.ajax({
            url:URL_api_vendor_account_info,
            type:'get',
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                if(res.code=='0'){
                    const {vendorAccount={}}=this.state
                    vendorAccount.username=res.vendorAccount.mobile
                    vendorAccount.password=''
                    this.setState({
                        vendorAccount
                    })
                }
            },
            error:(err)=>{
                if(err.status=='401'){
                    alert('登陆失效，请重新登录')
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){

        const {getFieldDecorator} = this.props.form;
        return(
            <div style={{minWidth:300}}>
                <BreadcrumbCustom first="密码修改"/>

                <div style={{maxWidth:900}}>
                    <Card >
                        <div style={{maxWidth:600}}>
                            <div style={{
                                width: '75%',
                                marginLeft: '1%',
                                // marginTop: '20px',
                                display:'inline-block',
                                float:'left'
                            }}>
                                <div className="spantotal">
                                    <span className="spanlabel1" style={{lineHeight:'34px'}}>账号：</span>
                                    <input className="spaninput" disabled={true} onChange={this.pjevent} type="text" value={this.state.vendorAccount.username||''}/>
                                </div>
                                <div className="spantotal">
                                    <span className="spanlabel1" style={{lineHeight:'34px'}}>验证码:</span>
                                    <input className="spaninput" onChange={this.verifyCodeevent} type="text" value={this.state.vendorAccount.verifyCode||''}/>
                                </div>
                                <div className="spantotal">
                                    <span className="spanlabel1" style={{lineHeight:'34px'}}>输入新密码:</span>
                                    <input className="spaninput" onChange={this.newpasswordevent} type="text" value={this.state.vendorAccount.password||'' }/>
                                </div>
                                <div className="spantotal">
                                    <span className="spanlabel1" style={{lineHeight:'34px'}}>确认新密码:</span>
                                    <input className="spaninput" onChange={this.comfirevent} type="text" value={this.state.password||'' }/>
                                </div>
                            </div>
                            <div>
                                {/*<span onClick={this.vecode} style={{width:'40%',textAlign:'right',color:'#8C8C8C'}}>*/}
                                {/*<span style={{width:'100%',color:'#5489F2'}} className={this.state.flag?'YZM YZMshow':'YZM YZMnone'}>获取验证码</span>*/}
                                {/*<span style={{width:'100%',fontSize:'0.30rem'}} className={this.state.yzmflag?'YZM YZMtimershow':*/}
                                    {/*'YZM YZMtimernone'}><span style={{fontSize:'0.3rem'}}>({this.state.timer}s)重新获取</span></span>*/}
                                {/*</span>*/}
                                {this.state.flag?<Button type='primary' onClick={this.vecode}>获取验证码</Button>:
                                    <span style={{display:'block'}}><Button type='primary'>({this.state.timer}s)重新获取</Button></span>}
                            </div>
                        </div>
                        <div style={{textAlign:'center',float:'left',marginTop:'20px',width:'100%'}}>
                            <Button  type='primary' onClick={this.comfir}>保存更新</Button>
                        </div>
                    </Card>

                </div>

            </div>)
    }

}

export default Form.create()(PwdSetting)