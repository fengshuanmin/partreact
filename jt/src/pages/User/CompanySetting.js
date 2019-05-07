
import React,{Component} from 'react';
import $ from 'jquery'
import { Card,Form,Button,Table} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import Net from '../../utils/net/Net';
import {URL_api_vendor_account_companyInfo} from '../../utils/net/Url';
import {USER_INFO_GET} from "../../utils/storeInfo";

class  CompanySetting extends Component{

    constructor(props){
        super(props)
        this.state={
            vendorCompany:{

            },
            listdata:[]
        }
    }
    pjevent=()=>{

    }
    componentDidMount(){
        $.ajax({
            url:URL_api_vendor_account_companyInfo,
            type:'get',
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                if(res.code=='0'){
                    this.setState({
                        vendorCompany:res.companyInfoMap.vendorCompany,
                        listdata:res.companyInfoMap.accountList
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
        const columns = [
            { title: '姓名', key: 'name',align:'center',render: (text,record,index) =>
                    <span>{(record.name==''||record.name==null)?'-':record.name}</span>
            },
            { title: '账号', key: 'mobile',align:'center',render: (text,record,index) =>
                    <span>{(record.mobile==''||record.mobile==null)?'-':record.mobile}</span>
            },
            { title: '角色',key: 'roleCode',align:'center',render: (text,record,index) =>
                    <span>{record.roleCode=='1'?'管理员':record.roleCode=='2'?'销售员':record.roleCode=='3'?'财务人员':'-'}</span>
            },
            { title: '负责品牌',key: 'maker',align:'center',render: (text,record,index) =>
                    <span>{(record.maker==''||record.maker==null)?'-':record.maker}</span>
            },
        ];
        return(
            <div style={{width:'100%'}}>
                <BreadcrumbCustom first="公司设置"/>

                <div style={{width:'100%'}} className='tablebottom'>
                    <Card >
                        <div style={{width:'100%'}}>
                            <div style={{
                                width: '100%',
                                marginLeft: '1%',
                                marginBottom: '20px',
                                display:'inline-block'
                            }}>
                                <div style={{width:'50%',float:'left'}}>
                                    <div className="spantotal">
                                        <span className="spanlabel1" style={{lineHeight:'34px'}}>名称：</span>
                                        <input className="spaninput" onChange={this.pjevent} type="text" value={this.state.vendorCompany.name}/>
                                    </div>
                                </div>
                                <div style={{width:'50%',float:'left'}}>
                                    <div className="spantotal">
                                        <span className="spanlabel1" style={{lineHeight:'34px'}}>省份：</span>
                                        <input className="spaninput" onChange={this.pjevent} type="text" value={this.state.vendorCompany.province}/>
                                    </div>
                                </div>
                                <div style={{width:'50%',float:'left'}}>
                                    <div className="spantotal">
                                        <span className="spanlabel1" style={{lineHeight:'34px'}}>城市：</span>
                                        <input className="spaninput" onChange={this.pjevent} type="text" value={this.state.vendorCompany.city}/>
                                    </div>
                                </div>
                                <div style={{width:'50%',float:'left'}}>
                                    <div className="spantotal">
                                        <span className="spanlabel1" style={{lineHeight:'34px'}}>默认地址：</span>
                                        <input className="spaninput" onChange={this.pjevent} type="text" value={this.state.vendorCompany.address}/>
                                    </div>
                                </div>
                                <div style={{width:'50%',float:'left'}}>
                                    <div className="spantotal">
                                        <span className="spanlabel1" style={{lineHeight:'34px'}}>电话：</span>
                                        <input className="spaninput" onChange={this.pjevent} type="text" value={this.state.vendorCompany.phoneNumber}/>
                                    </div>
                                </div>
                                <div style={{width:'50%',float:'left'}}>
                                    <div className="spantotal">
                                        <span className="spanlabel1" style={{lineHeight:'34px'}}>价格：</span>
                                        <input className="spaninput" onChange={this.pjevent} type="text" value={this.state.vendorCompany.pricePreference}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={this.state.listdata}
                            pagination={ false }
                        />
                        {/*<div style={{textAlign:'center',float:'left',marginTop:'20px',width:'100%'}}>*/}
                            {/*<Button  type='primary'>保存更新</Button>*/}
                        {/*</div>*/}
                    </Card>
                </div>

            </div>)
    }

}

export default Form.create()(CompanySetting)