

import React,{Component} from 'react';
import {Card,Input,Button,List,Table} from 'antd';
require('../../style/lib/order.css');


export default class Offerdetail extends Component{

    constructor(props){
        super(props)
    }
    back=()=>{
        window.history.back()
    }
    componentWillMount(){
        this.setState({
            listdata:[
                {
                    key: 1, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 2, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 3, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                }
            ]
        });
    }
    render(){
        const columns = [
            { title: '序号', dataIndex: 'name', key: 'name',align:'center' },
            { title: '配件名称', dataIndex: 'pjname', key: 'pjname',align:'center' },
            { title: '零件号', dataIndex: 'pjh', key: 'pjh',align:'center' },
            { title: '特征', dataIndex: 'pz', key: 'pz',align:'center' },
            { title: '品质', dataIndex: 'pp', key: 'pp',align:'center' },
            { title: '售后', dataIndex: 'zbq', key: 'zbq',align:'center' },
            { title: '价格', dataIndex: 'cprice', key: 'cprice',align:'center' },
            { title: '备注', dataIndex: 'bprice', key: 'bprice',align:'center' },
            {
                title: '操作', dataIndex: '', key: 'x',align:'center', render: () =><div><span onClick={this.orderdetail} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>查看</span></div>,
            },
        ];
        return(
            <div style={{marginTop:20,minWidth:800,maxWidth:1200}}>
                <div style={{width:'100%',background:'#fff',float:'left',paddingBottom:'15px',marginBottom:'15px'}}>
                    <ul className="orderdetailtitle">
                        <li>车型:</li>
                        <li>修理厂:</li>
                        <li>订单号:</li>
                    </ul>
                    <ul className="orderdetailtitle">
                        <li>车架号:</li>
                        <li>电话:</li>
                        <li>订单金额:</li>
                    </ul>
                    <ul className="orderdetailtitle">
                        <li>零件数:</li>
                        <li>地址:</li>
                        <li>订单来源:</li>
                    </ul>
                </div>
                <div style={{width:'100%',float:'left',paddingBottom:'20px',background:'#fff'}}>
                    <Table
                        columns={columns}
                        dataSource={this.state.listdata}
                        pagination={ false }
                    />
                    <div style={{textAlign:'center',float:'left',marginTop:'20px',width:'100%'}}>
                        <Button type="primary" onClick={this.back}>返回</Button>
                    </div>
                </div>

                {/*<div style={{
                    display:'flex',flexDirection:'column'
                }}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <p style={{flex:2}}>车型</p>
                        <p style={{flex:2}}>修理厂</p>
                        <p style={{flex:1}}>订单号</p>
                    </div>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <p style={{flex:2}}>车架号</p>
                        <p style={{flex:2}}>电话</p>
                        <p style={{flex:1}}>订单金额</p>
                    </div>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <p style={{flex:2}}>零件数</p>
                        <p style={{flex:2}}>地址</p>
                        <p style={{flex:1}}>订单来源</p>
                    </div>

                </div>
                <Card style={{minHeight:300}}>
                    <div>
                        <div style={{display:'flex',flexDirection:'row',borderBottom:'1px solid #f1f2f7'}}>
                            <p style={{flex:1}}>序号</p>
                            <p style={{flex:1}}>配件名称</p>
                            <p style={{flex:1}}>零件号</p>
                            <p style={{flex:1}}>特征</p>
                            <p style={{flex:1}}>品质</p>
                            <p style={{flex:1}}>价格</p>
                            <p style={{flex:1}}>售后</p>
                        </div>
                        <div>
                            暂无数据
                        </div>
                    </div>
                </Card>
*/}
            </div>
        )
    }
}
