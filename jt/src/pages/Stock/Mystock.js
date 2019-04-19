

import React,{Component} from 'react';
import {Card,Input,Button,Switch,Table} from 'antd';


export default class Mystock extends Component{

    constructor(props){
        super(props)
        this.state={

        }
        this.orderdetail = this.orderdetail.bind(this);
    }
    orderdetail(){
        this.props.history.push('/app/orderdetail')
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
            { title: '序号', dataIndex: 'name', key: 'name',align:'center' },
            { title: '配件名称', dataIndex: 'pjname', key: 'pjname',align:'center' },
            { title: '零件号', dataIndex: 'pjh', key: 'pjh',align:'center' },
            { title: '品质', dataIndex: 'pz', key: 'pz',align:'center' },
            { title: '品牌/产地', dataIndex: 'pp', key: 'pp',align:'center' },
            { title: '质保期限', dataIndex: 'zbq', key: 'zbq',align:'center' },
            { title: '调货价格', dataIndex: 'cprice', key: 'cprice',align:'center' },
            {
                title: '操作', dataIndex: '', key: 'x',align:'center',
                render: () =><div>
                    <span onClick={this.pict} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>商品图片</span>
                    <span onClick={this.delect} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>联系卖家</span>
                    <span onClick={this.updata} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>在线下单</span>
                  </div>,
            },
        ];
        return(
            <div style={{marginTop:20,minWidth:800,maxWidth:1200}}>
                <Card style={{minHeight:300}}>
                    <div style={{
                        width: '100%',
                        display:'inline-block'
                    }}>
                        <input className='spaninp' onChange={this.pjevent} placeholder='请输入零件号' type="text" value={this.state.pjId}/>
                        <input className='spaninp' onChange={this.pjevent} placeholder='请输入配件名' type="text" value={this.state.pjId}/>
                        <Button type="primary" style={{marginBottom: '20px'}}>搜索</Button>
                        {/*<Button type="primary" style={{marginBottom: '20px',}}>全部禁止共享</Button>
                        <Button type="primary" style={{marginBottom: '20px',}} >全部开启共享</Button>
                        <Button type="primary" style={{marginBottom: '20px',}}>全部隐藏价格</Button>
                        <Button type="primary" style={{marginBottom: '20px',}}>全部开启价格</Button>*/}
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
