import React, {Component} from 'react';
import {URL_Auto_repair, URL_my_favorite_repair_shop} from '../../utils/net/Url'
import $ from 'jquery';
import {Card, Button, Pagination} from "antd";
import {USER_INFO_GET} from "../../utils/storeInfo";

export default class MyCollection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listdata: [],
            loading: true,
            page: '1',
            limit: '10',
            name:'',
            count:0,
            province:'',
            city:'',
        }
    }

    getBase64=(img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    rect=()=>{
        var lastA=this.refs.cityId.value;
        var lastB=this.refs.province.value;
        var the =this
        this.setState({
            City:lastA,
            provinced:lastB
        })


        $.ajax({
            url:URL_my_favorite_repair_shop,
            type:'post',
            data:{
                province:lastB,
                city:lastA,
                page:1,
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                limit:this.state.limit,
                s_type:'pc'
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code=='1'){
                    the.setState({
                        listdata:res[0].messages,
                        total:res[0].num,
                        page:parseInt(res[0].page),
                        limit:res[0].limit
                    })
                }
            }

        })
        console.log(the.state.listdata);
        this.setState({
            listdata: []
        })
    }
    query=()=>{
        var lastC=this.refs.nameId.value;
        var lastA=this.refs.cityId.value;
        var lastB=this.refs.province.value;
        var that =this
        this.setState({
            Name:lastC,
            City:lastA,
            provinced:lastB
        })


        $.ajax({
            url:URL_my_favorite_repair_shop,
            type:'post',
            data:{
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                name:lastC,
                page:1,
                limit:this.state.limit
            },
            success:(res)=>{
                console.log(res)
                if(res[0].code=='1'){
                    that.setState({
                        listdata:res[0].messages,
                        total:res[0].num,
                        page:parseInt(res[0].page),
                        limit:res[0].limit
                    })
                }
            }

        })
        console.log(that.state.listdata);
        this.setState({
            listdata: []
        })
    }

    dataajax=(page,limit)=>{

        this.setState({
            loading:true
        })
        $.ajax({
            url:URL_my_favorite_repair_shop,
            type:'post',
            data:{
                // c_id :USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                page:page,
                limit:limit,

            },
            success:(res)=>{
                console.log(res)
                console.log(res.messages)
                if(res[0]){
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
    Collection=(item)=> {
        this.setState({
            loading: true
        })
        $.ajax({
            url: URL_my_favorite_repair_shop,
            type: 'post',
            data: {
                v_id: USER_INFO_GET() && USER_INFO_GET().companyId || '',
                workshop_cn_id: item.id,
            }
        })
    }
    componentDidMount() {
        this.dataajax(this.state.page,this.state.limit)
        if(localStorage.getItem('vehistateList')){
            localStorage.removeItem('groupId','')
            localStorage.removeItem('nicknames','')
            localStorage.removeItem('vehistateList','')
            localStorage.removeItem('partystateList','')
        }
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
    handlepagesize=(val)=>{
        this.setState({
            loading:true
        })
        if(!this.state.City&&!this.state.provinced) {
            $.ajax({
                url: URL_my_favorite_repair_shop,
                type: 'post',
                data: {
                    page: val,
                    limit: this.state.limit,
                    name: this.state.Name,
                    province: this.state.provinced,
                    city: this.state.City,
                    v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                },
                success: (res) => {
                    console.log(res)
                    console.log(res.message)
                    // var {listdata=[]}=this.state
                    // listdata=res[0].message
                    if (res[0].code == '1') {
                        console.log('list', res[0].message);
                        this.setState({
                            loading: false,
                            listdata: res[0].messages || [],
                            total: res[0].num,
                            page: parseInt(res[0].page),

                        })
                    }
                }
            })
        }else{
            $.ajax({
                url: URL_my_favorite_repair_shop,
                type: 'post',
                data: {
                    page: val,
                    limit: this.state.limit,
                    province: this.state.provinced,
                    city: this.state.City,
                    s_type:'pc',
                    v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                },
                success: (res) => {
                    console.log(res)
                    console.log(res.message)
                    // var {listdata=[]}=this.state
                    // listdata=res[0].message
                    if (res[0].code == '1') {
                        console.log('list', res[0].message);
                        this.setState({
                            loading: false,
                            listdata: res[0].messages || [],
                            total: res[0].num,
                            page: parseInt(res[0].page),

                        })
                    }
                }
            })
        }
    }
    render() {
        return (
            <div >
                <Card>
                    <h1 style={{textAlign: "center"}}>我的收藏 </h1>
                    <p style={{textAlign: "center"}}>
                        The Coverall Dtabase for china Auto Service Industry </p>
                    <div style={{marginTop: 25}}>
                        <input className="spaninp" type="text" placeholder='省/市/自治区' ref="province"/>
                        <input className="spaninp" type="text" placeholder='城市'ref="cityId"/>
                        <Button
                            type="primary" onClick={this.rect}> 搜索 </Button>
                        <input className="spaninp" type="text" placeholder='修理厂名称'
                               style={{marginLeft: 20, width: 300}} ref="nameId"/>
                        <Button type="primary" onClick={this.query}> 搜索 </Button>
                    </div>
                    {this.state.listdata && this.state.listdata.map((item, index) => {
                        return(

                            <div key={index}>
                                <ul>
                                    <li style={{position: "relative",paddingLeft: 210}}>
                                        <div style={{ display: 'inline-block',left: 20}}>
                                            <img src={item.picture} alt="暂无图片" style={{height: 150, width: 200,position:"absolute",left: 20,top:20}}/>
                                        </div>
                                        <div>

                                            <div style={{width: "70%", display: 'inline-block',maginBotoom:200}}>
                                                <div style={{width: "100%", textAlign: "right", display: 'inline-block'}}>
                                                    <span onClick={this.Collection.bind(this,item)}  style={{cursor:"pointer"}}> 取消收藏</span>
                                                    <span> | </span>
                                                    <span style={{cursor:"pointer"}}> 地图 </span>
                                                </div>
                                                <div style={{paddingLeft: 50}}>
                                                    <div >
                                                        <h1 id='name' dataIndex='name' key='name'>
                                                            {item.name}
                                                        </h1>
                                                    </div>


                                                    {item.di_tag!='Null'&&<div>
                                                        <span>经营范围:&nbsp;{item.di_tag}</span>
                                                    </div>}



                                                    <span>&nbsp;</span>
                                                    <div>
                                                        <span>地址:&nbsp;</span>
                                                        <span >{item.Province}</span>
                                                        <span id='city' dataIndex='city' key='city'>{item.city}</span>
                                                        <span>{item.country}-</span>
                                                        <span>{item.adress}</span>
                                                    </div>
                                                    <span>&nbsp;</span>
                                                    <div>
                                                        <span>电话:</span>
                                                        {item.di_tag!='Null'&&<span>{item.mobile},</span>}

                                                        <span>{item.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div style={{marginTop:25,width:"100%"}}><hr style={{borderTop:"#555555"}}/></div>
                            </div>

                        )
                    })}
                    <Pagination onChange={this.handlepagesize} defaultCurrent={this.state.page} total={this.state.total}  />
                </Card>
            </div>
        )
    }
}

