//
// /**
//  *                             _ooOoo_
//  *                            o8888888o
//  *                            88" . "88
//  *                            (| -_- |)
//  *                            O\  =  /O
//  *                         ____/`---'\____
//  *                       .'  \\|     |//  `.
//  *                      /  \\|||  :  |||//  \
//  *                     /  _||||| -:- |||||-  \
//  *                     |   | \\\  -  /// |   |
//  *                     | \_|  ''\---/''  |   |
//  *                     \  .-\__  `-`  ___/-. /
//  *                   ___`. .'  /--.--\  `. . __
//  *                ."" '<  `.___\_<|>_/___.'  >'"".
//  *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//  *               \  \ `-.   \_ __\ /__ _/   .-` /  /
//  *          ======`-.____`-.___\_____/___.-`____.-'======
//  *                             `=---='
//  *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//  *                     佛祖保佑        永无BUG
//  *            佛曰:
//  *                   写字楼里写字间，写字间里程序员；
//  *                   程序人员写程序，又拿程序换酒钱。
//  *                   酒醒只在网上坐，酒醉还来网下眠；
//  *                   酒醉酒醒日复日，网上网下年复年。
//  *                   但愿老死电脑间，不愿鞠躬老板前；
//  *                   奔驰宝马贵者趣，公交自行程序员。
//  *                   别人笑我忒疯癫，我笑自己命太贱；
//  *                   不见满街漂亮妹，哪个归得程序员？


import React,{Component} from 'react';
import $ from 'jquery'
import {Card, Input, Button, List, Table, Pagination} from 'antd';
import Net from "../../utils/net/Net";
import {URL_0ffer_history, URL_Order_list} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";
require('../../style/lib/order.css');


export default class Offerdetail extends Component{

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
        // const o_id = '09a86354-c741-4e75-9909-1a6feb659cb0'
        var id=localStorage.getItem('offerid')
        var page= page
        var limit = limit
        $.ajax({
            url:URL_0ffer_history,
            type:'post',
            data:{
                // o_id
                // o_id:ai_offer
                c_id :USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                o_id:id,
                page:page,
                limit:limit

            },
            success:(res)=>{
                console.log(res)
                // console.log(res.message)
                console.log(res[0].on)
                if(res[0].code=='1'){
                    this.setState({
                        listdata:res[0].messages,
                        cardetail:res[0].on,
                        total:res[0].num,
                        page:parseInt(res[0].page),
                    })
                }
            }

        })
    }
    handlepagesize=(val)=>{
        this.dataajax(val,this.state.limit)

    }
    dataajax=(page,limit)=>{
        this.setState({
            loading:true
        })
        var Ai_offer = localStorage.getItem('Ai_offer')
        var id=localStorage.getItem('offerid')
        $.ajax({
            url:URL_0ffer_history,
            type:'post',
            data:{
                o_id :id,
                // c_id:'000fc79e',
                // id:id,
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
        console.log(this.state)
        const columns = [
            { title: '序号',render:(text,record,index)=>`${index+1}`,align:'center'},
            { title: '配件名称', dataIndex: 'part_name', key: 'part_name',align:'center' },
            { title: '零件号', dataIndex: 'oe_code', key: 'oe_code',align:'center' },
            { title: '特征', dataIndex: 'description', key: 'description',align:'center' },
            { title: '品质', dataIndex: 'quality', key: 'quality',align:'center' },
            { title: '质保', dataIndex: 'warranty', key: 'warranty',align:'center' },
            { title: '价格', dataIndex: 'price', key: 'price',align:'center'
            },
            { title: '备注', dataIndex: 'remark', key: 'remark',align:'center',render: (text,record,index) =>
                    <span>{(record.retailPricemax==''||record.retailPricemax==null)?'-':record.retailPricemax}</span>
            },
            /* {
                 title: '操作', dataIndex: '', key: 'x',align:'center', render: () =><div><span onClick={this.orderdetail} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>查看</span></div>,
             },*/
        ];
        return(
            <div style={{marginTop:20,minWidth:800,maxWidth:1400}}>
                <Card>
                    <div style={{width:'100%',background:'#ECF0F5',float:'left',paddingBottom:'15px',marginBottom:'15px'}}>
                        <ul className="orderdetailtitle">
                            <li>车型:{this.state.cardetail.description}</li>
                            <li>报价单号:{this.state.cardetail.id}</li>
                        </ul>
                        <ul className="orderdetailtitle">
                            <li>车架号:{this.state.cardetail.vincode}</li>
                            <li>报价金额:{this.state.cardetail.total_part_amount}</li>
                        </ul>
                        <ul className="orderdetailtitle">
                            <li>零件数:{this.state.cardetail.total_part_quantity}</li>
                            <li>报价来源:{this.state.cardetail.source}</li>
                        </ul>
                    </div>
                    <div style={{width:'100%',float:'left',paddingBottom:'20px',background:'#fff'}}>
                        <Table
                            columns={columns}
                            dataSource={this.state.listdata}
                            pagination={ false }
                        />
                        <Pagination onChange={this.handlepagesize} defaultCurrent={this.state.page} total={this.state.total} />
                    </div>
                    <div style={{textAlign:'center',float:'left',width:'100%'}}>
                        <Button type="primary" onClick={this.back}>返回</Button>
                    </div>
                </Card>
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