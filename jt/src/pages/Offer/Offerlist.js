

import React,{Component} from 'react';
import {Card,Input,Button,Switch,Table} from 'antd';


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
