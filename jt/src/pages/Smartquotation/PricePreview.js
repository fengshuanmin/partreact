import React,{Component} from 'react';
import $ from 'jquery'
import {Modal,Row, Col,Button, Card, List, Checkbox,Input,Table} from 'antd';
import {URL_id_and_std_search,URL_modify_price} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";


export default class PricePreview extends Component{

    constructor(props){
        super(props)
        this.state={
            showChangePrice:false
        }

    }
    change=(record)=>{
        console.log(record)
        this.setState({
            changAstate:true
        })
        localStorage.setItem('Aid',record.id)
        // this.changePrice(record.skuoe,'A')
    }
    sureA=()=>{
        var reid=localStorage.getItem('Aid')
        var lastA=this.refs.partId.value;
        $.ajax({
            url:URL_modify_price,
            type:'POST',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                part_sku_id:reid,
                price:lastA,
                p_typed:'A'
            },
            success:(res)=>{
                console.log(res[0].code)
                if(res[0].code=='1'){
                    this.setState({
                        changAstate:false
                    })
                    this.dataajax()
                }

            }
        })
    }
    change1=(record)=>{
        this.setState({
            changBstate:true
        })
        localStorage.setItem('Bid',record.id)
    }
    sureB=()=>{
        var reid=localStorage.getItem('Bid')
        var lastB=this.refs.partId1.value;
        $.ajax({
            url:URL_modify_price,
            type:'POST',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                part_sku_id:reid,
                price:lastB,
                p_typed:'B'
            },
            success:(res)=>{
                if(res[0].code=='1'){
                    this.setState({
                        changBstate:false
                    })
                    this.dataajax()
                }

            }
        })
    }
    change2=(record)=>{
        this.setState({
            changCstate:true
        })
        localStorage.setItem('Cid',record.id)
    }
    sureC=()=>{
        var reid=localStorage.getItem('Cid')
        var lastC=this.refs.partId2.value;
        $.ajax({
            url:URL_modify_price,
            type:'POST',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                part_sku_id:reid,
                price:lastC,
                p_typed:'C'
            },
            success:(res)=>{
                if(res[0].code=='1'){
                    this.setState({
                        changCstate:false
                    })
                    this.dataajax()
                }

            }
        })
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    dataajax=()=>{
        var groupId=localStorage.getItem('groupId')
        var stdNames=localStorage.getItem('nicknames')
        console.log(groupId,stdNames)
        var dat={
            gid:groupId,
            std:stdNames
        }
        $.ajax({
            url:URL_id_and_std_search,
            type:'POST',
            data:{
                gid:groupId,
                std:stdNames
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code=='1'){
                    console.log('a1b2')
                    var data=res[0].date,arr=[]
                    data.map((item,index)=>{
                        console.log(item)
                        item.messages.map((item1)=>{
                            arr.push(item1)
                        })
                    })
                    console.log(arr)
                    this.setState({
                        listdata:arr
                    })
                }
            }
        })

    }
    componentWillMount(){
        this.dataajax()
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [

            // { dataIndex: 'check', key: 'check',align:'center',render: () =><Checkbox  defaultChecked onChange={this.change} /> },

            { title: '序号',key:'text',render:(text,record,index)=>`${index+1}`,align:'center'},
            { title: '标准件名称', dataIndex: 'stdname', key: 'stdname',align:'center' ,render: (text,record,index) =>
                    <span key="pjname">{(record.stdname==''||record.stdname==null)?'-':record.stdname}</span>
            },
            { title: '标准零件名', dataIndex: 'skuoe', key: 'skuoe',align:'center' ,render: (text,record,index) =>
                    <span key="partid">{(record.skuoe==''||record.skuoe==null)?'-':record.skuoe}</span>
            },
            { title: '配件特征', dataIndex: 'description', key: 'description',align:'center' ,render: (text,record,index) =>
                    <span key="Partquality">{(record.description==''||record.description==null)?'-':record.description}</span>
            },
            { title: '品质', dataIndex: 'quality', key: 'quality',align:'center' ,render: (text,record,index) =>
                    <span key="Partquality">{(record.quality==''||record.quality==null)?'-':record.quality}</span>
            },
            /* { title: '图片', dataIndex: 'vendorAutobrand', key: 'vendorPartbrand',align:'center' ,render: (text,record,index) =>
                     <span key="autobrand">{(record.vendorAutobrand==''||record.vendorAutobrand==null)?'-':record.vendorAutobrand}</span>
             },*/
            // { title: '产地', dataIndex: 'vendorPartmaker', key: 'vendorPartmaker',align:'center' },
            /* { title: '售后', dataIndex: 'vendorPartwarranty', key: 'vendorPartwarranty',align:'center',render: (text,record,index) =>
                     <span key="Partwarranty">{(record.vendorPartwarranty==''||record.vendorPartwarranty==null)?'-':record.vendorPartwarranty}</span>
             },*/
            { title: 'C类价格', key: 'retail_pricemax',align:'center',render: (text,record,index) =>
                    <span key="Pricemax">{(record.retail_pricemax==''||record.retail_pricemax==null)?'0':record.retail_pricemax}
                        <Checkbox onChange={this.change.bind(this,record)}></Checkbox>
                    </span>
            },
            { title: 'B类价格', key: 'retail_pricemid',align:'center',render: (text,record,index) =>
                    <span key="Pricemid">{(record.retail_pricemid==''||record.retail_pricemid==null)?'0':record.retail_pricemid}
                        <Checkbox onChange={this.change1.bind(this,record)}></Checkbox>
                    </span>
            },
            { title: 'A类价格', key: 'retail_pricemin',align:'center',render: (text,record,index) =>
                    <span key="Pricemin">{(record.retail_pricemin==''||record.retail_pricemin==null)?'0':record.retail_pricemin}
                        <Checkbox onChange={this.change2.bind(this,record)}></Checkbox>
                    </span>

            }
            // {
            //     title: '操作', dataIndex: '', key: 'x',align:'center', render: () =><div><span onClick={this.updata} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>修改</span><span onClick={this.delect} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>删除</span><span onClick={this.pict} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>图片</span></div>,
            // },
        ];
        return (
            <div style={{minWidth:900}}>
                <div style={{width:'100%',background:'#fff',border:'1px solid #ccc',padding:'20px 0',position:'relative'}}>
                    <Table
                        columns={columns}
                        dataSource={this.state.listdata}
                        pagination={false}
                    />
                    {this.state.changAstate&&
                    <div style={{position:'absolute',top:'30%',left:'40%',textAlign:'center',background:'#fff',width:'20%',height:'120px'}}>
                        <h5 style={{marginTop:'5%'}}>修改价格</h5>
                        <input style={{height:'25px',margin:'10px 0',border:'1px solid #ccc',borderRadius:'5px',outline:'none'}} ref="partId" type="text"/>
                        <Button size="small" onClick={()=>{this.setState({changAstate:false})}}>取消</Button>
                        <Button size="small" onClick={this.sureA}>确定</Button>
                    </div>
                    }
                    {this.state.changBstate&&
                    <div style={{position:'absolute',top:'30%',left:'40%',textAlign:'center',background:'#fff',width:'20%',height:'120px'}}>
                        <h5 style={{marginTop:'5%'}}>修改价格</h5>
                        <input style={{height:'25px',margin:'10px 0',border:'1px solid #ccc',borderRadius:'5px',outline:'none'}} ref="partId1" type="text"/>
                        <Button size="small" onClick={()=>{this.setState({changBstate:false})}}>取消</Button>
                        <Button size="small" onClick={this.sureB}>确定</Button>
                    </div>
                    }
                    {this.state.changCstate&&
                    <div style={{position:'absolute',top:'30%',left:'40%',textAlign:'center',background:'#fff',width:'20%',height:'120px'}}>
                        <h5 style={{marginTop:'5%'}}>修改价格</h5>
                        <input style={{height:'25px',margin:'10px 0',border:'1px solid #ccc',borderRadius:'5px',outline:'none'}} ref="partId2" type="text"/>
                        <Button size="small" onClick={()=>{this.setState({changCstate:false})}}>取消</Button>
                        <Button size="small" onClick={this.sureC}>确定</Button>

                    </div>

                    }
                </div>



            </div>


        );
    }
}