

import React,{Component} from 'react';
import $ from 'jquery'
import {Card,Input,Button,Switch,Table,Icon,Carousel,Modal,Pagination} from 'antd';
import Net from "../../utils/net/Net";
import {
    URL_api_parts_sku_delete,
    URL_id_and_std_search,
    URL_share_for_me,
    URL_share_for_other,
    URL_search_sku
} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";


export default class Mystock extends Component{

    constructor(props){
        super(props)
        this.state={
            flag:false,
            page:1,
            limit:'10',
            loading:true
        }
        this.orderdetail = this.orderdetail.bind(this);
    }
    orderdetail(){
        this.props.history.push('/abrand/orderdetail')
    }
    pict=(record)=>{
        console.log(record)
        if(record.picList){
            var picdat=record.picList
            var picarray=picdat.split(",")
            console.log(picarray)
            this.setState({
                picList:picarray,
                flag:true
            })
        }else{
            alert("当前商品没有可展示的图片")
        }
    }
    contant=(record)=>{
        console.log(record)
        const info=Modal.info;
        var self=this
        $.ajax({
            url:URL_share_for_me,
            type:'post',
            data:{
                c_id:USER_INFO_GET().companyId||'',
                connect_seller:record.connect_seller
            },
            success:(res)=>{
                console.log(res)
                // var res=[]
                var res=[{'address': "VendorCompany没找到", 'share_named': "VendorCompany没找到", 'phone': "VendorCompany没找到"}]
                info({
                    title: '联系方式',
                    content: (
                        <div>
                            <p>{res[0].share_named}</p>
                            <p>地址：{res[0].address}</p>
                            <p>电话：{res[0].phone}</p>
                        </div>
                    ),
                    onOk() {},
                });
            }
        })
    }
    onlinepay=(record)=>{
        const info=Modal.info;
        var self=this
        info({
            title: '提示',
            content: (
                <div>
                    在线下单正在开发中，请联系工作人员进行线下下单
                </div>
            ),
            onOk() {},
        });
    }
    query=()=>{
        var lastC=this.refs.partId.value;
        var lastB=this.refs.partname.value;
        console.log(this.state.lastC)
        console.log(this.state.lastB)
        $.ajax({
            url:URL_search_sku,
            type:'post',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                v_oe:lastC,
                v_part_name:lastB,
                shared_type:'m'
            },
            success:(res)=>{
                console.log(res)
                var {listdata=[]}=this.state
                listdata=res[0].message
                if(res[0].code=='1'){
                    this.setState({
                        loading:false,
                        listdata,
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
        $.ajax({
            url:URL_share_for_me,
            type:'post',
            data:{
                c_id:USER_INFO_GET().companyId||'',
                // c_id:'000fc79e',
                page:page,
                limit:limit
            },
            success:(res)=>{
                console.log(res)
                console.log(res.message)
                if(res[0].code=='1'){
                    var {listdata=[]}=this.state
                    listdata=res[0].message
                    if(res[0].code=='1'){
                        this.setState({
                            loading:false,
                            listdata,
                            total:res[0].num,
                            page:parseInt(res[0].page),
                        })
                    }
                }
            }
        })
    }
    componentWillMount(){
        console.log(USER_INFO_GET())
        this.dataajax(this.state.page,this.state.limit)
    }
    render(){
        console.log(this.state)
        const lunboSetting = {
            dots: true,
            lazyLoad: true,
            autoplay:true,
        };
        const columns = [
            { title: '序号',key:'text', align:'center',render:(text,record,index)=>`${index+1}`},
            { title: '配件名称', key: 'stdname',align:'center',render: (text,record,index) =>
                    <span key='partname'>{(record.stdname==''||record.stdname==null)?'-':record.stdname}</span>
            },
            { title: '零件号', key: 'stdnameID',align:'center',render: (text,record,index) =>
                    <span key='partId'>{(record.stdnameID==''||record.stdnameID==null)?'-':record.stdnameID}</span>
            },
            { title: '品质', key: 'quality',align:'center',render: (text,record,index) =>
                    <span key='quali'>{(record.quality==''||record.quality==null)?'-':record.quality}</span>
            },
            { title: '品牌/产地', key: 'brand',align:'center',render: (text,record,index) =>
                    <span key='brands'>{(record.brand==''||record.brand==null)?'-':record.brand}</span>
            },
            { title: '质保期限', key: 'warranty',align:'center',render: (text,record,index) =>
                    <span key='warrantys'>{(record.warranty==''||record.warranty==null)?'-':record.warranty}</span>
            },
            { title: '调货价格', key: 'price',align:'center',render: (text,record,index) =>
                    <span key='prices'>{(record.price==''||record.price==null)?'-':record.price}</span>
            },
            {
                title: '操作', dataIndex: 'x', key: 'x',align:'center', render: (text,record,index) =><div key='editor'>
                    <span onClick={this.pict.bind(this,record)} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>商品图片</span>
                    <span onClick={this.contant.bind(this,record)} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>联系卖家</span>
                    <span onClick={this.onlinepay.bind(this,record)} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>在线下单</span>
                </div>,
            },
        ];
        return(
            <div>
                {this.state.flag&&this.state.flag?<div style={{width:'100%',minHeight:500,maxHeight:800,marginTop:'20px',background:'#fff'}}>
                    <div style={{width:'600px',margin:'15px auto 0',position:'relative',paddingTop:'15px'}}>
                        <Carousel {...lunboSetting} ref={el => (this.slider = el)}>
                            {this.state.picList&&this.state.picList.map((item,index)=>{
                                return(
                                    <div key={index}><img src={item}/></div>
                                )
                            })}
                        </Carousel>
                        <Icon type="arrow-left" onClick={this.prev}/>
                        <Icon type="arrow-right" onClick={this.next}/>
                    </div>
                    <div style={{width:'600px',margin:'15px auto',textAlign:'right'}}>
                        <Button type="primary" onClick={this.back}>返回</Button>
                    </div>
                </div>:<div style={{marginTop:20,minWidth:800,maxWidth:1200}}>
                        <Card style={{minHeight:300}}>
                            <div style={{
                                width: '100%',
                                display:'inline-block'
                            }}>
                                <input className='spaninp' placeholder='请输入零件号' type="text" ref="partId"/>
                                <input className='spaninp' placeholder='请输入配件名' type="text" ref="partname"/>
                                <Button type="primary" style={{marginBottom: '20px'}} onClick={this.query}>搜索</Button>
                                {/*<Button type="primary" style={{marginBottom: '20px',}}>全部禁止共享</Button>
                        <Button type="primary" style={{marginBottom: '20px',}} >全部开启共享</Button>
                        <Button type="primary" style={{marginBottom: '20px',}}>全部隐藏价格</Button>
                        <Button type="primary" style={{marginBottom: '20px',}}>全部开启价格</Button>*/}
                            </div>
                            <Table
                                rowKey="stdnameID"
                                columns={columns}
                                dataSource={this.state.listdata}
                                pagination={ false }
                                loading={this.state.loading}
                            />
                            <Pagination onChange={this.handlepagesize} defaultCurrent={this.state.page} total={this.state.total} />,
                        </Card>
                    </div>
                }
            </div>
        )
    }
}
