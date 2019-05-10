import React, {Component} from 'react';
import {URL_Auto_repair} from '../../utils/net/Url'
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
            name: '',
            count: 0,
            province: '',
            city: ''
        }
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    rect = () => {
        var lastA = this.refs.cityId.value;
        var lastB = this.refs.province.value;
        var the = this
        this.setState({
            City: lastA,
            provinced: lastB
        })


        $.ajax({
            url: URL_Auto_repair,
            type: 'post',
            data: {
                province: lastB,
                city: lastA,
                page: 1,
                limit: this.state.limit,
                s_type: 'pc'
            },
            success: (res) => {
                console.log(res)
                if (res[0].code == '1') {
                    the.setState({
                        listdata: res[0].messages,
                        total: res[0].num,
                        page: parseInt(res[0].page),
                        limit: res[0].limit
                    })
                }
            }

        })
        console.log(the.state.listdata);
        this.setState({
            listdata: []
        })
    }
    // Collectio=()=>{
    //
    // }

    query = () => {
        var lastC = this.refs.nameId.value;
        var lastA = this.refs.cityId.value;
        var lastB = this.refs.province.value;
        var that = this
        this.setState({
            Name: lastC,
            City: lastA,
            provinced: lastB
        })


        $.ajax({
            url: URL_Auto_repair,
            type: 'post',
            data: {
                province: lastB,
                city: lastA,
                name: lastC,
                page: 1,
                limit: this.state.limit
            },
            success: (res) => {
                console.log(res)
                if (res[0].code == '1') {
                    that.setState({
                        listdata: res[0].messages,
                        total: res[0].num,
                        page: parseInt(res[0].page),
                        limit: res[0].limit
                    })
                }
            }

        })
        console.log(that.state.listdata);
        this.setState({
            listdata: []
        })
    }

    componentWillMount() {
        this.dataajax(this.state.page, this.state.limit)
    }

    Collection = (item) => {
        this.setState({
            loading: true
        })
        $.ajax({
            url: URL_Auto_repair,
            type: 'post',
            data: {
                vendor_id: USER_INFO_GET() && USER_INFO_GET().companyId || '',

            }
        })
    }

    dataajax = (page, limit) => {
        this.setState({
            loading: true
        })
        $.ajax({
            url: URL_Auto_repair,
            type: 'post',
            data: {
                page: page,
                limit: limit,
                static: 'bad'
            },
            success: (res) => {
                console.log(res)
                console.log(res[0].messages)
                if (res[0].code == '1') {
                    this.setState({
                        listdata: res[0].messages,
                        loading: false,
                        total: res[0].num,
                        page: parseInt(res[0].page),
                        // name: res[0].messages[0].name
                    })
                    console.log(this.state.listdata[0].name);
                    console.log(this.state.name)
                }
            }

        })
        // this.setState({
        //     listName:this.state.listdata[0]
        // })
        // console.log(this.state.listName)

    }
    // Collection=(valu)=>{
    //     this.setState({
    //         loading:true
    //     })
    //     if (){}
    // }
    componentWillMount() {
        this.dataajax(this.state.page, this.state.limit)
    }

    handlepagesize = (val) => {
        this.setState({
            loading: true
        })
        if (!this.state.City && !this.state.provinced) {
            $.ajax({
                url: URL_Auto_repair,
                type: 'post',
                data: {
                    page: val,
                    limit: this.state.limit,
                    name: this.state.Name,
                    province: this.state.provinced,
                    city: this.state.City
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
        } else {
            $.ajax({
                url: URL_Auto_repair,
                type: 'post',
                data: {
                    page: val,
                    limit: this.state.limit,
                    province: this.state.provinced,
                    city: this.state.City,
                    s_type: 'pc'
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

    componentDidMount() {
        console.log(this.props)
        console.log(this.state)
        this.dataajax(this.state.page, this.state.limit)
    }

    render() {
        return (
            <div>
                <Card>
                    <h1 style={{textAlign: "center"}}>汽修数据总库 </h1>
                    <p style={{textAlign: "center"}}>
                        The Coverall Dtabase for china Auto Service Industry </p>
                    <div style={{marginTop: 25}}>
                        <input className="spaninp" type="text" placeholder='省/市/自治区' ref="province"/>
                        <input className="spaninp" type="text" placeholder='城市' ref="cityId"/>
                        <Button
                            type="primary" onClick={this.rect}> 搜索 </Button>
                        <input className="spaninp" type="text" placeholder='修理厂名称'
                               style={{marginLeft: 20, width: 300}} ref="nameId"/>
                        <Button type="primary" onClick={this.query}> 搜索 </Button>
                    </div>
                    {this.state.listdata && this.state.listdata.map((item, index) => {
                        return (

                            <div key={index}>
                                <ul>
                                    <li style={{position: "relative", paddingLeft: 210}}>
                                        <div style={{display: 'inline-block', left: 20}}>
                                            <img src={item.picture} alt="暂无图片" style={{
                                                height: 150,
                                                width: 200,
                                                position: "absolute",
                                                left: 20,
                                                top: 50
                                            }}/>
                                        </div>
                                        <div>

                                            <div style={{width: "70%", display: 'inline-block', maginBotoom: 200}}>
                                                <div style={{
                                                    width: "100%",
                                                    textAlign: "right",
                                                    display: 'inline-block'
                                                }}>
                                                    <a href="JavaScript:void(0)" onChange={this.Collection.bind(this,item)}> 收藏 </a>
                                                    <span> | </span>
                                                    <a> 地图 </a>
                                                    <span> | </span>
                                                    <a> 附近 </a>
                                                </div>
                                                <div style={{paddingLeft: 50}}>
                                                    <div>
                                                        <h1 id='name' dataIndex='name' key='name'>
                                                            {item.name}
                                                        </h1>
                                                    </div>
                                                    <div>
                                                        <span>{item.di_tag}:</span>
                                                        <span>{item.opening_hour}</span>
                                                    </div>
                                                    <span>&nbsp;</span>
                                                    <div>
                                                        <span id='Province' dataIndex='Province'
                                                              key='Province'>{item.Province}:</span>
                                                        <span id='city' dataIndex='city' key='city'>{item.city}</span>
                                                        <span>{item.country}</span>
                                                        <span>{item.adress}</span>
                                                    </div>
                                                    <span>&nbsp;</span>
                                                    <div>
                                                        <span>{item.mobile}:</span>
                                                        <span>{item.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        )
                    })}
                    <Pagination onChange={this.handlepagesize} defaultCurrent={this.state.page}
                                total={this.state.total}/>
                </Card>
            </div>
        )
    }
}

