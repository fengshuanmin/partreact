import React,{Component} from 'react';

import {Modal,Row, Col,Button, Card, List, Checkbox,Input,Table} from 'antd';


export default class PricePreview extends Component{

    constructor(props){
        super(props)
        // this.renderItem = this.renderItem.bind(this);;
        this.change = this.change.bind(this);
        this.state={
            showChangePrice:false
        }

    }
    change(){

    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    changePrice(){
        return <Modal
            title="修改金额"
            visible={this.state.showChangePrice}
            onOk={()=>{
                this.setState({
                    showChangePrice:false
                })
            }}
            onCancel={()=>{
                this.setState({
                    showChangePrice:false
                })
            }}
        >
            <Input/>
        </Modal>
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
                }
            ]
        });

    }
    /*renderItem(item){

        if( Math.round(Math.random()*10)%2 == 1){
            return(
                <List.Item key={item+""}>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%'}}>
                        <p style={{width:50,textAlign:'center'}}><Checkbox></Checkbox></p>
                        <p style={{flex:1,textAlign:'center'}}>1</p>
                        <p style={{flex:1,textAlign:'center'}}>前保险杠皮</p>
                        <p style={{flex:1,textAlign:'center'}}>askldakldj</p>
                        <p style={{flex:1,textAlign:'center'}}>带雷达孔</p>
                        <p style={{flex:6,textAlign:'center'}}></p>


                    </div>
                </List.Item>
            )
        }else{
            return(
                <List.Item key={item+""}>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%'}}>
                        <p style={{width:50,textAlign:'center'}}></p>
                        <p style={{flex:1,textAlign:'center'}}><Checkbox></Checkbox></p>
                        <p style={{flex:1,textAlign:'center'}}>前保险杠皮</p>
                        <p style={{flex:1,textAlign:'center'}}>askldadjk</p>
                        <p style={{flex:1,textAlign:'center'}}>带保险杠</p>
                        <p style={{flex:1,textAlign:'center'}}>品质</p>
                        <p style={{flex:1,textAlign:'center'}}>图片</p>
                        <p style={{flex:1,textAlign:'center'}}>售后</p>
                        <p  onDoubleClick={()=>{
                            this.setState({
                                showChangePrice:true
                            })
                        }} style={{flex:1,textAlign:'center',backgroundColor:'red'}}>300<Checkbox></Checkbox></p>

                        <p style={{flex:1,textAlign:'center'}}>400<Checkbox></Checkbox></p>
                        <p style={{flex:1,textAlign:'center'}}>500<Checkbox></Checkbox></p>
                    </div>
                </List.Item>
            )
        }



    }*/

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            // { dataIndex: 'check', key: 'check',align:'center',render: () =><Checkbox  defaultChecked onChange={this.change} /> },
            { title: '序号', dataIndex: 'name', key: 'name',align:'center' },
            { title: '标准件名称', dataIndex: 'pjname', key: 'pjname',align:'center' },
            { title: '标准零件名', dataIndex: 'pjh', key: 'pjh',align:'center' },
            { title: '配件特征', dataIndex: 'pjtz', key: 'pjtz',align:'center' },
            { title: '品质', dataIndex: 'pz', key: 'pz',align:'center' },
            { title: '图片', dataIndex: 'pp', key: 'pp',align:'center' },
            { title: '售后', dataIndex: 'zbq', key: 'zbq',align:'center' },
            /*{ title: 'C类价格', key: 'cprice',align:'center',render: (text,record,index) =>
                    <span></span>
            },*/
            { title: 'C类价格', dataIndex: 'cprice', key: 'cprice',align:'center' },
            { title: 'B类价格', dataIndex: 'bprice', key: 'bprice',align:'center' },
            { title: 'A类价格', dataIndex: 'aprice', key: 'aprice',align:'center' },
            // {
            //     title: '操作', dataIndex: '', key: 'x',align:'center', render: () =><div><span onClick={this.updata} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>修改</span><span onClick={this.delect} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>删除</span><span onClick={this.pict} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>图片</span></div>,
            // },
        ];
        return (
            <div style={{minWidth:900}}>
                {this.changePrice.bind(this)()}
                {/*<Card style={{width:'100%',height:'100%',overflow:'auto'}}>*/}
                    {/*<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <p style={{width:50,textAlign:'center'}}>选中</p>
                        <p style={{flex:1,textAlign:'center'}}>序号</p>
                        <p style={{flex:1,textAlign:'center'}}>标准件名称</p>
                        <p style={{flex:1,textAlign:'center'}}>标准零件名</p>
                        <p style={{flex:1,textAlign:'center'}}>配件特征</p>
                        <p style={{flex:1,textAlign:'center'}}>品质</p>
                        <p style={{flex:1,textAlign:'center'}}>图片</p>
                        <p style={{flex:1,textAlign:'center'}}>售后</p>
                        <p style={{flex:1,textAlign:'center'}}>C类价格<Checkbox></Checkbox></p>
                        <p style={{flex:1,textAlign:'center'}}>B类价格<Checkbox></Checkbox></p>
                        <p style={{flex:1,textAlign:'center'}}>A类价格<Checkbox></Checkbox></p>
                    </div>*/}
                   {/* <List

                        dataSource={[1,2,3,4,5,6,7,8,9,0,11,22,33,44,55,66,77,88,88]}
                        renderItem={this.renderItem}
                    >
                    </List>*/}
                    <div style={{width:'100%',background:'#fff',border:'1px solid #ccc',padding:'20px 0'}}>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={this.state.listdata}
                            pagination={false}
                        />
                    </div>
                <div style={{marginTop:30}}>
                    <Button type="primary">TXT文本</Button>
                    <Button type="primary">JPG图片</Button>
                    <Button type="primary">PDF文件</Button>
                    {/*<Button type="primary">H5网页</Button>*/}


                </div>

                {/*</Card>*/}

            </div>
        );
    }

}