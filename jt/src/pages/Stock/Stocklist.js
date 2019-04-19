import React,{Component} from 'react';
import $ from 'jquery'
import {Card,Input,Button,Switch,Table} from 'antd';
import Net from "../../utils/net/Net";
import {URL_id_and_std_search, URL_share_for_me} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";

export default class Stocklist extends Component{

    constructor(props){
        super(props)
        this.state={
            pjId:'',
            pjId1:''
        }
        this.pict = this.pict.bind(this);
        this.pjevent = this.pjevent.bind(this);
        this.pjevent1 = this.pjevent1.bind(this);
        this.change = this.change.bind(this);
        this.change1 = this.change1.bind(this);
        this.updata = this.updata.bind(this);
        this.delect = this.delect.bind(this);
    }
    pjevent(e){
        this.setState({
            pjId:e.target.value
        })
    }
    pjevent1(e){
        this.setState({
            pjId1:e.target.value
        })
    }
    change(){

    }
    change1(){

    }
    updata(){

    }
    pict(){
        this.props.history.push('/app/rotation')
    }
    delect(){

    }
    componentWillMount(){
        $.ajax({
            url:URL_share_for_me,
            type:'post',
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
            }

        })
        this.setState({
            listdata:[
                {
                    key: 1, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 2, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1'
                },
                {
                    key: 3, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 4, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 5, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 6, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 7, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 8, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 9, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 10, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 11, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 12, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 13, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
                },
                {
                    key: 14, name: '李四', pjname:"中网", pjh: 'OX1234', pz: '原厂件',pp:'车享配',zbq:'三个月',cprice:'100',bprice:'95',aprice:'90',sxj:'1',sxj1:'2',
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
            { title: '是否共享', dataIndex: 'sxj', key: 'sxj',align:'center', render: () =><Switch defaultChecked onChange={this.change} /> },
            { title: '是否显示价格', dataIndex: 'sxj1', key: 'sxj1',align:'center', render: () =><Switch defaultChecked onChange={this.change1} /> },
            {
                title: '操作', dataIndex: '', key: 'x',align:'center',
                render: () =><div>
                    <span onClick={this.updata} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>修改</span>
                    <span onClick={this.delect} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>删除</span>
                    <span onClick={this.pict} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>商品图片</span>
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
                        <input className='spaninp' onChange={this.pjevent1} placeholder='请输入配件名' type="text" value={this.state.pjId1}/>
                        <Button type="primary" style={{marginBottom: '20px'}}>搜索</Button>
                        <Button type="primary" style={{marginBottom: '20px',}}>全部禁止共享</Button>
                        <Button type="primary" style={{marginBottom: '20px',}} >全部开启共享</Button>
                        <Button type="primary" style={{marginBottom: '20px',}}>全部隐藏价格</Button>
                        <Button type="primary" style={{marginBottom: '20px',}}>全部开启价格</Button>
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
