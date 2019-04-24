

import React,{Component} from 'react';
import {Card, Input, Button, Switch, Table, Pagination} from 'antd';
import $ from "jquery";
import {URL_Offer_record, URL_Order_list} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";

export default class OrdersManage extends Component{

    constructor(props){
        super(props)
        this.state={
        listdata:[],
            v_code:'',
            pjId:'',
            // step:'1',
            page:1,
            limit:'10',
            loading:true
        }
        this.pjevent = this.pjevent.bind(this);
        this.orderdetail = this.orderdetail.bind(this);
    }
    pjevent(e){
        this.setState({
            pjId:e.target.value
        })}
    // updata=(record)=>{
    //     localStorage.setItem('ordersId',record.id)
    //     this.props.history.push('/app/ordersmanage',record.id)
    // }

    query=()=>{
        var lastC=this.refs.partId.value;
        // const a_o_id = '1'
        var Ai_order = localStorage.getItem('Ai_order')
        var that =this
        console.log(this.state.lastC)
        $.ajax({
            url:URL_Order_list,
            type:'post',
            data:{
                v_code:lastC,
                // a_o_id
                c_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                // v_part_name:lastB,
                // shared_type:'o'
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code=='1'){
                    that.setState({
                        listdata:res[0].messages
                    })
                }
            }

        })
        this.setState({
            listdata: []
        })
        // console.log(this.state.listdata,'11111111111111111111111143243');
    }
    orderdetail(){
        this.props.history.push('/app/orderdetail')
    }
    handlepagesize=(val)=>{
        this.dataajax(val,this.state.limit)

    }
    dataajax=(page,limit)=>{
        this.setState({
            loading:true
        })
        var Ai_offer = localStorage.getItem('Ai_offer')
        $.ajax({
            url:URL_Order_list,
            type:'post',
            data:{
                // a_o_id :USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                c_id :'595411d4-cf3c-4068-b626-708ccd1fee5f',
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
    componentWillMount() {
        this.dataajax(this.state.page,this.state.limit)
        /*if (this.state.step == 1) {
            // const a_o_id = '1'
            var Ai_order = localStorage.getItem('Ai_order')
            $.ajax({
                url: URL_Order_list,
                type: 'post',
                data: {
                    //a_o_id
                    a_o_id: Ai_order
                },
                success: (res) => {
                    console.log(res[0])
                    console.log(res[0].messages, '11111111111111111111111111111111111111')
                    if (res[0].code == '1') {
                        this.setState({
                                listdata: res[0].messages
                            }
                        )
                    }

                }

            });
        }*/
    }

    render(){
        const columns = [
            { title: '订单号', dataIndex: 'id', key: 'id',align:'center'},
            { title: '订单时间', dataIndex: 'created_at', key: 'created_at',align:'center'},
            { title: '车型', dataIndex: 'total_quantity', key: 'total_quantity',align:'center'},
            { title: '修理厂', dataIndex: 'workshop_name', key: 'workshop_name',align:'center'},
            { title: '零件数', dataIndex: 'description', key: 'description',align:'center'},
            { title: '订单金额', dataIndex: 'total_amount', key: 'total_amount',align:'center', },
            {title:'车架号',dataIndex:'v_code',key:'v_code',align:'center',},
            { title: '订单来源', dataIndex: 'cprice', key: 'cprice',align:'center',render: (text,record,index) =>
                    <span>{(record.retailPricemax==''||record.retailPricemax==null)?'微信机器人':record.retailPricemax}</span>
            },
            // { title: '编辑', dataIndex: 'bprice', key: 'bprice',align:'center' },
            {
                title: '操作', dataIndex: '', key: 'x',align:'center', render: () =><div><span onClick={this.orderdetail} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>查看</span></div>,
            },
        ];
        return(
            <div style={{marginTop:20,minWidth:800,maxWidth:1200}}>
                <Card>
                    <div>
                        <div style={{
                            width: '40%',
                            marginLeft: '1%',
                            marginBottom: '20px',
                            display:'inline-block'
                        }}>
                            <div className="spantotal">
                                <span className="spanlabel1" onChange={this.pjevent}>按车架号</span>
                                <input className="spaninput" placeholder='请输入车架号' type="text"  ref="partId" />
                            </div>
                        </div>
                        <Button type="primary" onClick={this.query}>查询</Button>
                    </div>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={this.state.listdata}
                        pagination={ false }
                        loading={this.state.loading}
                    />
                    <Pagination onChange={this.handlepagesize} defaultCurrent={this.state.page} total={this.state.total} />
                </Card>
            </div>
        )
    }
}
