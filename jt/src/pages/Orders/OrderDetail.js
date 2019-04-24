

import React,{Component} from 'react';
import {Card, Input, Button, List, Table, Pagination} from 'antd';
import $ from "jquery";
import {URL_0ffer_history, URL_Order_center} from "../../utils/net/Url";
require('../../style/lib/order.css');

// let nums = [];
// const a_d_id = '1'

// $.ajax({
//
//     url:URL_Order_center,
//     data:{a_d_id},
//     type:'post',
//     async:false,
//
//     // headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
//     success:function (res) {
//
//         console.log(res);
//
//
//         nums=res;
//     }
//
// })
export default class OrderDetail extends Component{

    constructor(props){
        super(props)
        this.state={
            listdata:[],
            cardetail:{},
            page:'1',
            limit:'10',
        }
    }
    back=()=>{
        window.history.back()
    }
    componentWillMount(){
        var ai_offer = localStorage.getItem('ai_offer')
        // const a_d_id = '1'
        $.ajax({
            url:URL_Order_center,
            type:'post',
            data:{
                // a_d_id
                a_d_id: ai_offer
            },
            success:(res)=>{
                console.log(res)
                console.log(res[0].messages)
                console.log(res[0].on)
                if (res[0].code=='1'){
                    this.setState({
                        listdata:res[0].messages,
                        cardetail:res[0].on
                        }

                    )
                }
                /* if(res[0].code=='1'){
                     this.setState({
                         listdata:res[0].message
                     })
                 }*/
                // nums=res;
            }

        })


        this.setState({
            listdata:[
            ],
            on:[]
        });
    }
    handlepagesize=(val)=>{
        this.dataajax(val,this.state.limit)

    }
    dataajax=(page,limit)=>{
        this.setState({
            loading:true
        })
        var ai_offer = localStorage.getItem('ai_offer')
        $.ajax({
            url:URL_Order_center,
            type:'post',
            data:{
                a_d_id : ai_offer,
                // c_id:'000fc79e',
                page:page,
                limit:limit
            },
            success:(res)=>{
                console.log(res)
                console.log(res.message)
                if(res[0].code=='1'){
                    this.setState({
                        loading:false,
                        listdata:res[0].messages,
                        total:res[0].num,
                        page:parseInt(res[0].page),
                    })
                }
            }
        })
    }
    render(){
        const columns = [
            // { title: '序号', dataIndex: 'name', key: 'name',align:'center' },
            { title: '序号',render:(text,record,index)=>`${index+1}`,align:'center'},
            { title: '配件名称', dataIndex: 'part_name', key: 'part_name',align:'center' },
            { title: '零件号', dataIndex: 'oe_code', key: 'oe_code',align:'center' },
            { title: '特征', dataIndex: 'feature', key: 'feature',align:'center' },
            { title: '品质', dataIndex: 'quality', key: 'quality',align:'center' },
            { title: '售后', dataIndex: 'warranty', key: 'warranty',align:'center' },
            { title: '价格', dataIndex: 'include_tax', key: 'include_tax',align:'center',render: (text,record,index) =>
                    <span>{(record.retailPricemax==''||record.retailPricemax==null)?'-':record.retailPricemax}</span>
            },
            { title: '备注', dataIndex: 'remark', key: 'remark',align:'center',render: (text,record,index) =>
                    <span>{(record.retailPricemax==''||record.retailPricemax==null)?'-':record.retailPricemax}</span>
            },
            {
                title: '操作', dataIndex: '', key: 'x',align:'center', render: () =><div><span onClick={this.orderdetail} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>查看</span></div>,
            },
        ];
        return(
            <div style={{marginTop:20,minWidth:1400,maxWidth:1400}}>
                <div style={{width:'100%',background:'#fff',float:'left',paddingBottom:'15px',marginBottom:'15px'}}>
                    <ul className="orderdetailtitle">
                        {/*{this.state.on}*/}
                        <li>车型:{this.state.cardetail.address}</li>
                        <li>修理厂:{this.state.cardetail.repair}</li>
                        <li>订单号:{this.state.cardetail.id}</li>
                    </ul>
                    <ul className="orderdetailtitle">
                        <li>车架号:{this.state.cardetail.vincode}</li>
                        <li>电话:{this.state.cardetail.phone}</li>
                        <li>订单金额:{this.state.cardetail.total_amount}</li>
                    </ul>
                    <ul className="orderdetailtitle">
                        <li>零件数:{this.state.cardetail.total_quantity}</li>
                        <li>地址:{this.state.cardetail.address}</li>
                        <li>订单来源:{this.state.cardetail.source}</li>
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
                <Pagination onChange={this.handlepagesize} defaultCurrent={this.state.page} total={this.state.total} />
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
