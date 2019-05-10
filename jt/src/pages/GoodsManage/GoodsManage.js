import React,{Component} from 'react';
import $ from 'jquery'
import {Card,Button,List, Switch, Avatar, Spin,Table,Carousel,Icon,Pagination,Modal} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import goodupdate  from './Goodupdate';
import axios from 'axios';
import Net from '../../utils/net/Net';
import {URL_api_parts_sku_list,URL_api_parts_sku_onlineParts,URL_api_parts_sku_delete} from '../../utils/net/Url';
import {USER_INFO_GET} from '../../utils/storeInfo';


export default class  GoodsManage extends Component{

    constructor(props){
        super(props)
        this.state=({
            pjId:'',
            listdata:[],
            page:1,
            limit:'10',
            flag:false,
            loading:true
        })
    }
    pjevent=(e)=>{
        this.setState({
            pjId:e.target.value
        })
    }
    query=()=>{
        console.log(USER_INFO_GET())
        var lastC=this.refs.partId.value;
        $.ajax({
            url:URL_api_parts_sku_list,
            type:'post',
            data:{page:this.state.page,limit:this.state.limit,vendorOe:lastC},
            headers:{appToken : USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                console.log(res.page.list)
                if(res.code==0){
                    this.setState({
                        loading:false,
                        listdata: res.page.list,
                        page:parseInt(res.page.currPage),
                        total:res.page.totalPage,
                        limit:res.page.pageSize
                    })
                }
            },
            error:(err)=>{
                if(err.status=='401'){
                    alert('登陆失效，请重新登录')
                    this.props.history.push('/login')
                }
            }

        })
    }
    onPageChange=()=>{

    }
    back=()=>{
        // window.history.back()
        this.setState({
            flag:false
        })
    }
    next=()=>{
        this.slider.slick.slickNext();
    }
    prev=()=>{
        this.slider.slick.slickPrev();
    }
    change=(record)=>{
        console.log(record)
        /*this.setState({
            isOnline:!record.isOnline
        })*/
        var isOnline=''
        if(record.isOnline==0){
            isOnline=1
        }else{
            isOnline=0
        }
        // var isOnline=!(record.isOnline)
        console.log(isOnline)
        $.ajax({
            url:URL_api_parts_sku_onlineParts+'/'+record.id+'/'+isOnline,
            type:'post',
            headers:{appToken : USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                if(res.code==0){
                    this.dataajax(this.state.page,this.state.limit)
                }
            },
            error:(err)=>{
                if(err.status=='401'){
                    alert('登陆失效，请重新登录')
                    this.props.history.push('/login')
                }
            }

        })
    }
    updata=(record)=>{
        localStorage.setItem('goodsId',record.id)
        this.props.history.push('/app/goodsupdate',record.id)
    }
    delect=(record)=>{
        console.log(this.state)
        const confirm=Modal.confirm;
        var self=this
        confirm({
            title: '提示',
            content: '请否确认删除该数据？',
            onOk() {
                $.ajax({
                    url:URL_api_parts_sku_delete+'/'+record.id,
                    type:'post',
                    headers:{appToken : USER_INFO_GET()&&USER_INFO_GET().appToken||''},
                    success:(res)=>{
                        console.log(res)
                        if(res.code==0){
                            console.log(self.state.page)
                            self.dataajax(self.state.page,self.state.limit)
                        }
                    }
                })
            },
            onCancel() {},
        });
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
    add=()=>{
        this.props.history.push('/app/addgoods')
    }
    handlepagesize=(val)=>{
        console.log(val)
        this.dataajax(val,this.state.limit)

    }
    dataajax=(page,limit)=>{
        console.log(USER_INFO_GET())
        $.ajax({
            url:URL_api_parts_sku_list,
            type:'post',
            data:{page:page,limit:limit},
            headers:{appToken : USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                console.log(res.page.list)
                if(res.code==0){
                    this.setState({
                        loading:false,
                        listdata: res.page.list,
                        page:parseInt(res.page.currPage),
                        total:res.page.totalPage,
                        limit:res.page.pageSize
                    })
                }
            },
            error:(err)=>{
                console.log(err)
                console.log(err.status)
                if(err.status=='401'){
                    alert('登陆失效，请重新登录')
                    this.props.history.push('/login')
                }
            }

        })
    }
    componentDidMount(){
        console.log(this.props)
        console.log(this.state)
        if(localStorage.getItem('vehistateList')){
            localStorage.removeItem('groupId','')
            localStorage.removeItem('nicknames','')
            localStorage.removeItem('vehistateList','')
            localStorage.removeItem('partystateList','')
        }
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
            { title: '序号',key:'text',render:(text,record,index)=>`${index+1}`,align:'center'},
            { title: '汽车品牌', dataIndex: 'vendorAutobrand', key: 'vendorAutobrand',align:'center' ,render: (text,record,index) =>
                    <span key="Partmaker">{(record.vendorAutobrand==''||record.vendorAutobrand==null)?'-':record.vendorAutobrand}</span>
            },
            /*{ title: '标准名', dataIndex: 'stdname', key: 'stdname',align:'center' ,render: (text,record,index) =>
                    <span key="pjname">{(record.stdname==''||record.stdname==null)?'-':record.stdname}</span>
            },
            { title: '标准OE号', dataIndex: 'stdOePure', key: 'stdOePure',align:'center' ,render: (text,record,index) =>
                    <span key="pjnameid">{(record.stdOePure==''||record.stdOePure==null)?'-':record.stdOePure}</span>
            },*/
            { title: '配件名称', dataIndex: 'vendorPartname', key: 'vendorPartname',align:'center' ,render: (text,record,index) =>
                    <span key="pjnames">{(record.vendorPartname==''||record.vendorPartname==null)?'-':record.vendorPartname}</span>
            },
            { title: '配件OE号', dataIndex: 'vendorOe', key: 'vendorOe',align:'center' ,render: (text,record,index) =>
                    <span key="partid">{(record.vendorOe==''||record.vendorOe==null)?'-':record.vendorOe}</span>
            },
            { title: '配件品质', dataIndex: 'vendorPartquality', key: 'vendorPartquality',align:'center' ,render: (text,record,index) =>
                    <span key="Partquality">{(record.vendorPartquality==''||record.vendorPartquality==null)?'-':record.vendorPartquality}</span>
            },
            { title: '配件品牌', dataIndex: 'vendorPartbrand', key: 'vendorPartbrand',align:'center' ,render: (text,record,index) =>
                    <span key="autobrand">{(record.vendorPartbrand==''||record.vendorPartbrand==null)?'-':record.vendorPartbrand}</span>
            },
            { title: '配件产地', dataIndex: 'vendorPartmaker', key: 'vendorPartmaker',align:'center' ,render: (text,record,index) =>
                    <span key="automark">{(record.vendorPartmaker==''||record.vendorPartmaker==null)?'-':record.vendorPartmaker}</span>
            },
            // { title: '产地', dataIndex: 'vendorPartmaker', key: 'vendorPartmaker',align:'center' },
            { title: '配件质保', dataIndex: 'vendorPartwarranty', key: 'vendorPartwarranty',align:'center',render: (text,record,index) =>
                    <span key="Partwarranty">{(record.vendorPartwarranty==''||record.vendorPartwarranty==null)?'-':record.vendorPartwarranty}</span>
            },
            { title: '最高零售价', key: 'retailPricemax',align:'center',render: (text,record,index) =>
                    <span key="Pricemax">{(record.retailPricemax==''||record.retailPricemax==null)?'-':record.retailPricemax}</span>
            },
            { title: '中间零售价', key: 'retailPricemid',align:'center',render: (text,record,index) =>
                    <span key="Pricemid">{(record.retailPricemid==''||record.retailPricemid==null)?'-':record.retailPricemid}</span>
            },
            { title: '最低零售价', key: 'retailPricemin',align:'center',render: (text,record,index) =>
                    <span key="Pricemin">{(record.retailPricemin==''||record.retailPricemin==null)?'-':record.retailPricemin}</span>
            },
            { title: '上下架', key: 'sxj',align:'center', render: (text,record,index) =>
                    <Switch key="isline" checked={record.isOnline=='1'?true:false} onChange={this.change.bind(this,record)} /> },
            {
                title: '操作', dataIndex: 'x', key: 'x',align:'center', render: (text,record,index) =><div key="audit">
                    <span onClick={this.updata.bind(this,record)} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>修改</span>
                    <span onClick={this.delect.bind(this,record)} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>删除</span>
                    <span onClick={this.pict.bind(this,record)} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>图片</span>
                </div>,
            },
        ];
        return(
            <div className="goodsdiv">
                {this.state.flag&&this.state.flag?<div style={{width:'100%',minHeight:401,maxHeight:800,marginTop:'20px',background:'#fff'}}>
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
                </div>: <div style={{background:'#fff', marginTop:'20px',padding:'15px'}}>
                    <div>
                        <div style={{
                            width: '40%',
                            marginLeft: '1%',
                            // marginTop: '20px',
                            display:'inline-block'
                        }}>
                            <div className="spantotal">
                                <span className="spanlabel1" style={{lineHeight:'34px'}}>按零件号</span>
                                <input className="spaninput" ref="partId" type="text"/>
                            </div>
                        </div>
                        <Button type="primary" onClick={this.query}>查询</Button>
                        <Button style={{float:'right',marginTop:'10px',marginBottom:'15px'}} onClick={this.add} type="primary">添加</Button>
                    </div>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={this.state.listdata}
                        pagination={ false }
                        loading={this.state.loading}
                    />
                    <Pagination onChange={this.handlepagesize} defaultCurrent={this.state.page} total={this.state.total} />,
                </div>}
            </div>

        )
    }

}