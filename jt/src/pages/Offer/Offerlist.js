

import React,{Component} from 'react';
import $ from 'jquery'
import {Card,Input,Button,Switch,Table} from 'antd';
import {URL_share_for_me} from "../../utils/net/Url";


export default class Offerlist extends Component{

    constructor(props){
        super(props)
        this.state={

        }
        this.orderdetail = this.orderdetail.bind(this);
    }
    orderdetail(){
        this.props.history.push('/app/offerdetail')
    }
    componentWillMount(){
        $.ajax({
            url:'http://139.196.16.229:9999/offer_record',
            type:'post',
            data:{
                c_id:'595411d4-cf3c-4068-b626-708ccd1fee5',
                a_id:'8f3ea920-e44d-4d85-ac81-6a493ad72a74'
            },
            success:(res)=>{
                console.log(res)
                console.log(res.message)
                if(res[0].code=='1'){
                    this.setState({
                        listdata:res[0].message
                    })
                }
            }

        })
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
                },
                {
                    key: 4, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 5, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 6, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 7, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 8, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 9, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 10, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 11, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 12, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 13, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 14, name: '张三', pjname:"前保险杠", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                }
            ]
        });
    }
    render(){
        const columns = [
            { title: '订单号', dataIndex: 'name', key: 'name',align:'center' },
            { title: '订单时间', dataIndex: 'pjname', key: 'pjname',align:'center' },
            { title: '车型', dataIndex: 'pjh', key: 'pjh',align:'center' },
            { title: '修理厂', dataIndex: 'pz', key: 'pz',align:'center' },
            { title: '零件数', dataIndex: 'pp', key: 'pp',align:'center' },
            { title: '订单金额', dataIndex: 'zbq', key: 'zbq',align:'center' },
            { title: '订单来源', dataIndex: 'cprice', key: 'cprice',align:'center' },
            { title: '编辑', dataIndex: 'bprice', key: 'bprice',align:'center' },
            {
                title: '操作', dataIndex: '', key: 'x',align:'center', render: () =><div><span onClick={this.orderdetail} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>查看</span></div>,
            },
        ];
        return(
            <div style={{marginTop:20,minWidth:800,maxWidth:1200}}>
                <Card style={{minHeight:300}}>
                    <div>
                        <div style={{
                            width: '40%',
                            marginLeft: '1%',
                            // marginTop: '20px',
                            display:'inline-block'
                        }}>
                            <div className="spantotal">
                                <span className="spanlabel1">按车架号</span>
                                <input className="spaninput" onChange={this.pjevent} type="text" value={this.state.pjId}/>
                            </div>
                        </div>
                        <Button type="primary">查询</Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.state.listdata}
                    />
                </Card>

            </div>
        )
    }
}
