


import React,{Component} from 'react';
import $ from 'jquery'
import { Card,Form,Select,Input,Button} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import Net from '../../utils/net/Net';
import {URL_api_vendor_account_info} from '../../utils/net/Url';
import {USER_INFO_GET} from "../../utils/storeInfo";


const { Option } = Select;


class  PersonSetting extends Component{

    constructor(props){
        super(props)
        this.state={
            vendorAccount:{

            }
        }
    }
    pjevent=()=>{

    }
    componentDidMount(){
        $.ajax({
            url:URL_api_vendor_account_info,
            type:'get',
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
console.log(res)
                if(res.code=='0'){
                    this.setState({
                        vendorAccount:res.vendorAccount
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
                <BreadcrumbCustom first="个人设置"/>

                <div style={{maxWidth:900}}>
                    <Card >
                        <div style={{maxWidth:600}}>
                            <div style={{
                                width: '80%',
                                marginLeft: '1%',
                                // marginTop: '20px',
                                display:'inline-block'
                            }}>
                                <div className="spantotal">
                                    <span className="spanlabel1" style={{lineHeight:'34px'}}>姓名：</span>
                                    <input className="spaninput" disabled={true} onChange={this.pjevent} type="text" value={this.state.vendorAccount.name}/>
                                </div>
                                <div className="spantotal">
                                    <span className="spanlabel1" style={{lineHeight:'34px'}}>账号:</span>
                                    <input className="spaninput" disabled={true} onChange={this.pjevent} type="text" value={this.state.vendorAccount.mobile}/>
                                </div>
                                <div className="spantotal">
                                    <span className="spanlabel1" style={{lineHeight:'34px'}}>角色:</span>
                                    <input className="spaninput" disabled={true} onChange={this.pjevent} type="text" value={this.state.vendorAccount.roleCode=='1'?'管理员':this.state.vendorAccount.roleCode=='2'?'销售员':this.state.vendorAccount.roleCode=='3'?'财务人员':'-'}/>
                                </div>
                                <div className="spantotal">
                                    <span className="spanlabel1" style={{lineHeight:'34px'}}>负责品牌:</span>
                                    <input className="spaninput" disabled={true} onChange={this.pjevent} type="text" value={this.state.vendorAccount.maker}/>
                                </div>
                            </div>
                        </div>
                       {/* <div style={{textAlign:'center',float:'left',marginTop:'20px',width:'100%'}}>
                            <Button  type='primary'>保存更新</Button>
                        </div>*/}
                    </Card>

                </div>

            </div>)
    }

}

export default Form.create()(PersonSetting)