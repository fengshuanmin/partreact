import React,{Component} from 'react';
import $ from 'jquery'
import _ from 'lodash';
import {Card,Input,Button,Switch,Table,Modal,Pagination,Icon,Carousel,} from 'antd';
import Net from "../../utils/net/Net";
import {
    URL_api_parts_sku_delete,
    URL_api_parts_sku_onlineParts,
    URL_id_and_std_search,
    URL_share_for_other,
    URL_search_sku,
    URL_share_for_price
} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";

export default class Stocklist extends Component{

    constructor(props){
        super(props)
        this.state={
            pjId:'',
            pjId1:'',
            page:1,
            limit:'10',
            loading:true,
            listdata: [],
            count: 0
        }
    }
    pjevent=(e)=>{
        this.setState({
            pjId:e.target.value
        })
    }
    pjevent1=(e)=>{
        this.setState({
            pjId1:e.target.value
        })
    }
    updata=(record)=>{
        localStorage.setItem('goodsId',record.id)
        this.props.history.push('/app/goodsupdate',record.id)
    }
    delect=(record)=>{
        console.log(record)
        console.log(this.state)
        const confirm=Modal.confirm;
        var self=this
        confirm({
            title: '提示',
            content: '请否确认删除该数据？',
            onOk() {
                $.ajax({
                    url:URL_share_for_other,
                    type:'post',
                    data:{
                        part_sku_id:record.id,
                        v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                        rm:'1'
                    },
                    success:(res)=>{
                        console.log(res)
                        if(res[0].code=='1'){
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
        if(record.pic_url){
            var picdat=record.pic_url
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
    query=()=>{
        var lastC=this.refs.partId.value;
        var lastB=this.refs.partname.value;
        this.setState({
            loading:true,
            partIds:lastC,
            partNames:lastB,
        })
        $.ajax({
            url:URL_share_for_other,
            type:'post',
            data:{
                v_id:USER_INFO_GET().companyId||'',
                page:1,
                limit:this.state.limit,
                v_oe:lastC,
                v_part_name:lastB,
                shared_type:'o'
            },
            success:(res)=>{
                // console.log(res)
                // console.log(res.message)
                // var {listdata=[]}=this.state
                // listdata=res[0].message
                if(res[0].code=='1'){
                    console.log('list', res[0].message);
                    this.setState({
                        loading:false,
                        listdata: res[0].message || [],
                        total:res[0].num,
                        page:parseInt(res[0].page),
                    })
                }
            }
        })
    }
    allcloseshare=()=>{
        $.ajax({
            url:URL_share_for_other,
            type:'post',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                is_shared:'0',
                shared_type:'o',
                v_oe:this.state.partIds,
                v_part_name:this.state.partNames,
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code=='1'){
                    this.dataajax(this.state.page,this.state.limit)
                }
            }

        })
    }
    allopenshare=()=>{
        $.ajax({
            url:URL_share_for_other,
            type:'post',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                is_shared:'1',
                shared_type:'o',
                v_oe:this.state.partIds,
                v_part_name:this.state.partNames,
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code=='1'){
                    this.dataajax(this.state.page,this.state.limit)
                }
            }

        })
    }
    allcloseprice=()=>{
        $.ajax({
            url:URL_share_for_price,
            type:'post',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                is_shared_pricevisible:'0',
                v_oe:this.state.partIds,
                v_part_name:this.state.partNames,
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code=='1'){
                    this.dataajax(this.state.page,this.state.limit)
                }
            }

        })
    }
    allopenprice=()=>{
        $.ajax({
            url:URL_share_for_price,
            type:'post',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                is_shared_pricevisible:'1',
                v_oe:this.state.partIds,
                v_part_name:this.state.partNames,
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code=='1'){
                    this.dataajax(this.state.page,this.state.limit)
                }
            }

        })
    }
    change=(record)=>{
        console.log(record)
        /*this.setState({
            isOnline:!record.isOnline
        })*/
        var is_shared=''
        if(record.is_shared==0){
            is_shared=1
        }else{
            is_shared=0
        }
        // var isOnline=!(record.isOnline)
        console.log(is_shared)
        $.ajax({
            url:URL_share_for_other,
            type:'post',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                is_shared:is_shared,
                part_sku_id:record.id,
                v_oe:this.state.partIds,
                v_part_name:this.state.partNames,
                shared_type:'o'
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code==1){
                    this.dataajax(this.state.page,this.state.limit)
                }
            }

        })
    }
    change1=(record)=>{
        console.log(record)
        /*this.setState({
            isOnline:!record.isOnline
        })*/
        var is_shared_pricevisible=''
        if(record.is_shared_pricevisible==0){
            is_shared_pricevisible=1
        }else{
            is_shared_pricevisible=0
        }
        // var isOnline=!(record.isOnline)
        console.log(is_shared_pricevisible)
        $.ajax({
            url:URL_share_for_price,
            type:'post',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                is_shared_pricevisible:is_shared_pricevisible,
                part_sku_id:record.id,
                v_oe:this.state.partIds,
                v_part_name:this.state.partNames,
                shared_type:'o',
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code==1){
                    this.dataajax(this.state.page,this.state.limit)
                }
            }

        })
    }
    handlepagesize=(val)=>{
        this.setState({
            loading:true
        })
        $.ajax({
            url:URL_share_for_other,
            type:'post',
            data:{
                v_id:USER_INFO_GET().companyId||'',
                page:val,
                limit:this.state.limit,
                v_oe:this.state.partIds,
                v_part_name:this.state.partNames,
                shared_type:'o'
            },
            success:(res)=>{
                console.log(res)
                console.log(res.message)
                // var {listdata=[]}=this.state
                // listdata=res[0].message
                if(res[0].code=='1'){
                    console.log('list', res[0].message);
                    this.setState({
                        loading:false,
                        listdata: res[0].message || [],
                        total:res[0].num,
                        page:parseInt(res[0].page),
                    })
                }
            }
        })
    }
    dataajax=(page,limit)=>{
        this.setState({
            loading:true
        })
        $.ajax({
            url:URL_share_for_other,
            type:'post',
            data:{
                v_id:USER_INFO_GET().companyId||'',
                page:page,
                limit:limit,
                v_oe:this.state.partIds,
                v_part_name:this.state.partNames,
                shared_type:'o'
            },
            success:(res)=>{
                // console.log(res)
                // console.log(res.message)
                // var {listdata=[]}=this.state
                // listdata=res[0].message
                if(res[0].code=='1'){
                    console.log('list', res[0].message);
                    this.setState({
                        loading:false,
                        listdata: res[0].message || [],
                        total:res[0].num,
                        page:parseInt(res[0].page),
                    }, () => {
                        const { count } = this.state;
                        this.setState({
                            count: count + 1
                        })
                    })
                }
            }
        })
    }
    back=()=>{
        // window.history.back()
        this.setState({
            flag:false
        })
    }
    componentDidMount(){
        this.dataajax(this.state.page,this.state.limit)
        if(localStorage.getItem('vehistateList')){
            localStorage.removeItem('groupId','')
            localStorage.removeItem('nicknames','')
            localStorage.removeItem('vehistateList','')
            localStorage.removeItem('partystateList','')
        }
    }
    render(){
        const lunboSetting = {
            dots: true,
            lazyLoad: true,
            autoplay:true,
        };
        const columns = [
            { title: '序号', key: 'text',  align:'center',render:(text,record,index)=>`${index+1}`},
            { title: '配件名称', key: 'vendor_partname',align:'center',render: (text,record,index) =>
                    <span key='vendor_partnamea'>{(record.vendor_partname==''||record.vendor_partname==null)?'-':record.vendor_partname}</span>
            },
            { title: '零件号', key: 'vendor_oe',align:'center',render: (text,record,index) =>
                    <span key='vendor_oea'>{(record.vendor_oe==''||record.vendor_oe==null)?'-':record.vendor_oe}</span>
            },
            { title: '品质', key: 'vendor_partquality',align:'center',render: (text,record,index) =>
                    <span key="vendor_partqualitya">{(record.vendor_partquality==''||record.vendor_partquality==null)?'-':record.vendor_partquality}</span>
            },
            { title: '品牌/产地', key: 'vendor_partbrand',align:'center',render: (text,record,index) =>
                    <span key='vendor_partbranda'>{(record.vendor_partbrand==''||record.vendor_partbrand==null)?'-':record.vendor_partbrand}</span>
            },
            { title: '质保期限', key: 'vendor_partwarranty',align:'center',render: (text,record,index) =>
                    <span key='vendor_partwarrantya'>{(record.vendor_partwarranty==''||record.vendor_partwarranty==null)?'-':record.vendor_partwarranty}</span>
            },
            { title: '调货价格', key: 'shared_pricestd',align:'center',render: (text,record,index) =>
                    <span key="pricea">{(record.shared_pricestd==''||record.shared_pricestd==null)?'-':record.shared_pricestd}</span>
            },
            { title: '是否共享', key: 'is_shared',align:'center', render: (text,record,index) =>
                    <Switch key='isSharea' checked={record.is_shared=='0'?false:true} onChange={this.change.bind(this,record)} />
            },
            { title: '是否显示价格', key: 'is_shared_pricevisible',align:'center',render: (text,record,index) =>
                    <Switch key="isShowPricea" checked={record.is_shared_pricevisible=='0'?false:true} onChange={this.change1.bind(this,record)} /> },
            {
                title: '操作', dataIndex: 'x', key: 'x',align:'center', render: (text,record,index) =>
                <div key="audit">
                    {/*<span onClick={this.updata} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>修改</span>*/}
                    <span onClick={this.pict.bind(this,record)} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>商品图片</span>
                    <span onClick={this.delect.bind(this,record)} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>删除</span>
                </div>,
            },
        ];
        console.log(this.state.listdata)
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
            </div>:
            <div style={{marginTop:20,width:'100%'}}>
                <Card style={{minHeight:300}}>
                    <div style={{
                        width: '100%',
                        display:'inline-block'
                    }}>
                        <input className='spaninp' placeholder='请输入零件号' type="text" ref="partId"/>
                        <input className='spaninp' placeholder='请输入配件名' type="text" ref="partname"/>
                        <Button type="primary" style={{marginBottom: '20px'}} onClick={this.query}>搜索</Button>
                        <Button type="primary" style={{marginBottom: '20px',}} onClick={this.allcloseshare}>全部禁止共享</Button>
                        <Button type="primary" style={{marginBottom: '20px',}} onClick={this.allopenshare}>全部开启共享</Button>
                        <Button type="primary" style={{marginBottom: '20px',}} onClick={this.allcloseprice}>全部隐藏价格</Button>
                        <Button type="primary" style={{marginBottom: '20px',}} onClick={this.allopenprice}>全部开启价格</Button>
                    </div>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={this.state.listdata}
                        pagination={ false }
                        loading={this.state.loading}
                    />
                    <Pagination onChange={this.handlepagesize} current={this.state.page} total={this.state.total} />,
                </Card>

            </div>
            }
        </div>
        )
    }
}
