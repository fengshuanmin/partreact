/**
 * Created by 叶子 on 2017/7/31.
 */
import React, {Component} from 'react';
import $ from 'jquery'
import {Row, Col, Card, Steps, Input, Button, List, Upload, Icon, message, Checkbox, Radio, Tabs,Modal} from 'antd';

import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';

import AuthWidget from '@/components/widget/AuthWidget';
import beauty from '@/style/imgs/beauty.jpg';
import beauty2 from '@/style/imgs/404.png';
import InfiniteScroll from 'react-infinite-scroller';
import Dropzone from 'react-dropzone';

import Net from '../../utils/net/Net';
import {
    URL_vin_screenshot_analysis,
    URL_vin_find_autogroups,
    URL_vin_find_auto,
    URL_api_parts_sku_list,
    URL_api_parts_sku_searchMaker,
    URL_api_parts_sku_searchModel,
    URL_api_parts_sku_searchYearRange,
    URL_api_parts_sku_searchCapacity,
    URL_api_parts_sku_searchAutoGroup,
    URL_api_parts_sku_searchModelCode
} from '../../utils/net/Url';
import {USER_INFO_GET} from "../../utils/storeInfo";

require('../../style/lib/vehicle.css');

const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;
export default class VehicleType extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            imageUrl: '',
            imgUrl: '',
            vincode: '',
            actionkey:'1',
            visible:false,
            brandmodel:{},
            autogroupmodel:{},
            serbrandmodel:{}
        }

    }

    vinclick = (e) => {
        console.log(e.target.value)
        this.setState({
            vincode: e.target.value
        })
        console.log(this.state.vincode)
    }
    actions = (e) => {

    }
    handleChange = (e) => {

    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    onDrop = (file) => {
        var history = this.context.router.history
        console.log(file);
        this.getBase64(file, imageUrl => this.setState({
            imageUrl,
            loading: false,
        }));
        let f = new FormData();
        f.append('editormd-image-file', file)
        Net.upload({url: URL_vin_screenshot_analysis, data: f}, res => {
            console.log(res)
            let dat = {vinCode: res.resultContent}
            this.setState({
                vincode: res.resultContent
            })
            console.log(dat)
            if (res.resultContent.length == 17) {
                Net.get({url: URL_vin_find_autogroups + '?vinCode=' + res.resultContent}, res1 => {
                    console.log(res1)
                    console.log(res1.length == 0)
                    if (res1.length == 0) {
                        alert('抱歉，您尚未开通该车型的报价权限，智能报价失败')
                    } else {
                        this.setState({
                            groupdata: res1
                        })
                    }

                }, err => {
                    if (err.request.status == '401') {
                        alert('登陆失效，请重新登录')
                        history.push('/login')
                    }
                })
            } else {
                alert('请补全车架号')
            }
        }, err => {
            if (err.request.status == '401') {
                console.log(this.props)
                alert('登陆失效，请重新登录')
                history.push('/login')
            }
        })
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    vinocr = () => {
        console.log(this.state.vincode)
        console.log(this.props)
        var history = this.context.router.history
        $.ajax({
            url: URL_vin_find_autogroups,
            type: 'post',
            data: {vinCode: this.state.vincode},
            headers: {appToken: USER_INFO_GET() && USER_INFO_GET().appToken || ''},
            success: (res) => {
                console.log(res)
                if (res.length == 0) {
                    alert('您尚未开通该车型权限，车架号解析失败')
                } else {
                    this.setState({
                        groupdata: res,
                        actionkey:'1',
                        markList:[],
                        modelList:[],
                        yearRangeList:[],
                        capacityList:[],
                        brandmodel:{},
                        autogroupmodel:{},
                        serbrandmodel:{}
                    })
                }
            },
            error: (err) => {
                console.log(err)
                console.log(this.props)
                if (err.status == '401') {
                    alert('登陆失效，请重新登录')
                    history.push('/login')
                }
            }

        })
    }
    servervin=()=>{
        var history = this.context.router.history
        $.ajax({
            url: URL_api_parts_sku_searchModelCode+'/'+this.state.vincode,
            type: 'post',
            headers: {appToken: USER_INFO_GET() && USER_INFO_GET().appToken || ''},
            success: (res) => {
                console.log(res)
                this.setState({
                    groupdata1:res,
                    actionkey: '2',
                    markList: [],
                    modelList: [],
                    yearRangeList: [],
                    capacityList: [],
                    brandmodel:{},
                    autogroupmodel:{},
                    serbrandmodel:{}
                })
            },
            error: (err) => {
                console.log(err)
                console.log(this.props)
                if (err.status == '401') {
                    alert('登陆失效，请重新登录')
                    history.push('/login')
                }
            }

        })
    }
    pointcar=()=>{
        console.log(this.state.vincode)
        var history = this.context.router.history
        this.setState({
            visible:true
        })
        $.ajax({
            url: URL_api_parts_sku_searchMaker,
            type: 'post',
            data: {vinCode: this.state.vincode},
            headers: {appToken: USER_INFO_GET() && USER_INFO_GET().appToken || ''},
            success: (res) => {
                console.log(res)
                this.setState({
                    actionkey:'3',
                    markList:res,
                    modelList:[],
                    yearRangeList:[],
                    capacityList:[],
                    groupdata:[],
                    brandmodel:{},
                    autogroupmodel:{},
                    serbrandmodel:{}
                })
            },
            error: (err) => {
                console.log(err)
                console.log(this.props)
                if (err.status == '401') {
                    alert('登陆失效，请重新登录')
                    history.push('/login')
                }
            }

        })
    }
    itemmark=(item1)=>{
        var history = this.context.router.history
        this.setState({
            maker:item1,
        })
        $.ajax({
            url: URL_api_parts_sku_searchModel,
            type: 'post',
            data: {maker:item1},
            headers: {appToken: USER_INFO_GET() && USER_INFO_GET().appToken || ''},
            success: (res) => {
                console.log(res)
                this.setState({
                    modelList:res,
                    yearRangeList:[],
                    capacityList:[]
                })
            },
            error: (err) => {
                console.log(err)
                console.log(this.props)
                if (err.status == '401') {
                    alert('登陆失效，请重新登录')
                    history.push('/login')
                }
            }

        })
    }
    itemmodel=(item2)=>{
        var history = this.context.router.history
        this.setState({
            model:item2.model,
        })
        $.ajax({
            url: URL_api_parts_sku_searchYearRange,
            type: 'post',
            data: {
                maker:this.state.maker,
                model:item2.model
            },
            headers: {appToken: USER_INFO_GET() && USER_INFO_GET().appToken || ''},
            success: (res) => {
                console.log(res)
                this.setState({
                    yearRangeList:res,
                    capacityList:[]
                })
            },
            error: (err) => {
                console.log(err)
                console.log(this.props)
                if (err.status == '401') {
                    alert('登陆失效，请重新登录')
                    history.push('/login')
                }
            }

        })
    }
    itemyearrange=(item3)=>{
        var history = this.context.router.history
        this.setState({
            yearRange:item3.yearRange,
        })
        $.ajax({
            url: URL_api_parts_sku_searchCapacity,
            type: 'post',
            data: {
                maker:this.state.maker,
                model:this.state.model,
                yearRange:item3.yearRange
            },
            headers: {appToken: USER_INFO_GET() && USER_INFO_GET().appToken || ''},
            success: (res) => {
                console.log(res)
                this.setState({
                    capacityList:res
                })
            },
            error: (err) => {
                console.log(err)
                console.log(this.props)
                if (err.status == '401') {
                    alert('登陆失效，请重新登录')
                    history.push('/login')
                }
            }

        })
    }
    itemcapacity=(item4)=>{
        var history = this.context.router.history
        $.ajax({
            url: URL_api_parts_sku_searchAutoGroup,
            type: 'post',
            data: {
                maker:this.state.maker,
                model:this.state.model,
                yearRange:this.state.yearRange,
                capacity:item4.capacity
            },
            headers: {appToken: USER_INFO_GET() && USER_INFO_GET().appToken || ''},
            success: (res) => {
                console.log(res)
                this.setState({
                    visible:false,
                    actionkey:'3',
                    autogroup:res
                })
            },
            error: (err) => {
                console.log(err)
                console.log(this.props)
                if (err.status == '401') {
                    alert('登陆失效，请重新登录')
                    history.push('/login')
                }
            }

        })
    }
    renderItem = (item) => {
        console.log(item)
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (

            <List.Item key={item + ""}>
                <div style={{position: 'relative', width: '100%'}}>

                    {/*上海通用别克  君威  2014款  涡轮增压  自动挡*/}
                    <span>{item.maker} {item.model} {item.yearRange} {item.capacity} {item.transType}</span>
                    <span style={{position: 'absolute', right: '3px'}}><input name="checkbrand" type="radio"
                                                                              onChange={this.onChange.bind(this, item)}/></span>

                    {/*<span style={{position:'absolute',right:'3px'}}><Radio name="checkbrand" onChange={this.onChange.bind(this,item)}/></span>*/}
                    <span style={{position: 'absolute', right: '3px'}}><input name="checkbrand" type="radio"
                                                                              onChange={this.onChange.bind(this, item)}/></span>
                </div>
            </List.Item>
        )
    }
    renderItem1 = (item) => {
        console.log(item)
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (

            <List.Item key={item + ""}>
                <div style={{position: 'relative', width: '100%'}}>

                    {/*上海通用别克  君威  2014款  涡轮增压  自动挡*/}
                    <span>{item.maker} {item.model} {item.yearRange} {item.capacity} {item.transType}</span>
                    <span style={{position: 'absolute', right: '3px'}}><input name="checkbrand" type="radio"
                                                                              onChange={this.onChange1.bind(this, item)}/></span>

                    {/*<span style={{position:'absolute',right:'3px'}}><Radio name="checkbrand" onChange={this.onChange.bind(this,item)}/></span>*/}
                    {/*<span style={{position: 'absolute', right: '3px'}}><input name="checkbrand" type="radio"*/}
                                                                              {/*onChange={this.onChange.bind(this, item)}/></span>*/}
                </div>
            </List.Item>
        )
    }
    renderItem2 = (item) => {
        console.log(item)
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (

            <List.Item key={item + ""}>
                <div style={{position: 'relative', width: '100%'}}>

                    {/*上海通用别克  君威  2014款  涡轮增压  自动挡*/}
                    <span>{item.maker} {item.model} {item.yearRange} {item.capacity} {item.transType}</span>
                    <span style={{position: 'absolute', right: '3px'}}><input name="checkbrand" type="radio"
                                                                              onChange={this.onChange2.bind(this, item)}/></span>

                    {/*<span style={{position:'absolute',right:'3px'}}><Radio name="checkbrand" onChange={this.onChange.bind(this,item)}/></span>*/}
                    {/*<span style={{position: 'absolute', right: '3px'}}><input name="checkbrand" type="radio"*/}
                    {/*onChange={this.onChange.bind(this, item)}/></span>*/}
                </div>
            </List.Item>
        )
    }
    onChange1 = (item) => {
        console.log(item)
        console.log(this.props)
        this.setState({
            brandimg: item.picLink45,
            groupId: item.groupId
        })
        localStorage.setItem('groupId', item.groupId)
        Net.get({url: URL_vin_find_auto + '?modelId=' + item.autoId}, res => {
            console.log(res)
            this.setState({
                serbrandmodel: res,
                name: res
            })
        }, err => {
            console.log(err)
            if (err.request.status == '401') {
                alert('登陆失效，请重新登录')
                this.props.history.push('/login')
            }
        })
    }
    onChange2 = (item) => {
        console.log(item)
        console.log(this.props)
        this.setState({
            brandimg: item.picLink45,
            groupId: item.groupId
        })
        localStorage.setItem('groupId', item.groupId)
        Net.get({url: URL_vin_find_auto + '?modelId=' + item.autoId}, res => {
            console.log(res)
            this.setState({
                autogroupmodel: res,
                name: res
            })
        }, err => {
            console.log(err)
            if (err.request.status == '401') {
                alert('登陆失效，请重新登录')
                this.props.history.push('/login')
            }
        })
    }
    onChange = (item) => {
        console.log(item)
        console.log(this.props)
        this.setState({
            brandimg: item.picLink45,
            groupId: item.groupId
        })
        localStorage.setItem('groupId', item.groupId)
        Net.get({url: URL_vin_find_auto + '?modelId=' + item.autoId}, res => {
            console.log(res)
            this.setState({
                brandmodel: res,
                name: res
            })
        }, err => {
            if (err.request.status == '401') {
                alert('登陆失效，请重新登录')
                this.props.history.push('/login')
            }
        })
    }
    canver = () => {
        /*console.log(document.getElementById('ipt').value)
        this.setState({
            inutval:document.getElementById('ipt').value
        })
        html2canvas(document.getElementById('caver')).then((canvas)=>{
            // this.state.canvas=canvas
            // $('body').append(canvas)
            var html_canvas = canvas.toDataURL("image/jpeg");
            this.setState({
                imgUrl:html_canvas,
            })
            console.log(html_canvas)
        })*/
    }

    componentWillMount() {

        console.log(this.state)
        console.log(this.props)
        console.log(this.context)

        if (localStorage.getItem('vehistateList')) {
            var stateList = localStorage.getItem('vehistateList')
            var stateLists = JSON.parse(stateList)
            this.state = stateLists
        }
    }
  /*  calltab=(e)=>{
console.log(e)
        this.setState({
            actionkey:e,
            markList:[],
            modelList:[],
            yearRangeList:[],
            capacityList:[],
            groupdata:[],
            brandmodel:{}
        })
    }*/
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    componentWillUnmount() {

        localStorage.setItem('vehistateList', JSON.stringify(this.state))
        localStorage.setItem('groupId', this.state.groupId)

    }

    render() {
        console.log(this.state.brandmodel)
        console.log(JSON.stringify(this.state.brandmodel) == "{}")
        console.log(JSON.stringify(this.state.brandmodel) != "{}")
        var brandflag=JSON.stringify(this.state.brandmodel) != "{}"
        var serflag=JSON.stringify(this.state.serbrandmodel) != "{}"
        var autogroupflag=JSON.stringify(this.state.autogroupmodel) != "{}"
        const props = {
            name: 'file',
            multiple: false,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">点击上传车架号图片</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const TabPane = Tabs.TabPane;
        return (
            <AuthWidget
                children={auth => (
                    <div style={{minWidth: 900}}>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Card bordered={false} bodyStyle={{height: 570}}>
                                    <div style={{textAlign: 'center', width: '100%'}}>
                                        <div id="image" style={{height: 100, width: "100%"}}>
                                            {/*<div id="caver" style={{height: 100,width:"100%",lineHeight:'100px'}}>*/}
                                            {/*{this.state.inutval?<div style={{height: 100,width:"100%"}}>{this.state.inutval}</div>:<img src={this.state.imageUrl?this.state.imageUrl:beauty2} alt="" style={{height: 100,width:"100%"}}/>}*/}
                                            {/*</div>*/}
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader1"
                                                showUploadList={false}
                                                action={this.onDrop}
                                                onChange={this.handleChange}
                                            >
                                                {imageUrl ? <img src={imageUrl} style={{height: 100, width: "100%"}}
                                                                 alt="avatar"/> : uploadButton}
                                            </Upload>

                                        </div>

                                        {/*<div id="caver">*/}
                                        {/*<p id="caver1" style={{display:'inline-block'}}>{this.state.inutval}</p>*/}
                                        {/*</div>*/}
                                        <Input size="large" id="ipt" maxLength={17} value={this.state.vincode}
                                               onChange={this.vinclick} placeholder="输入17位车架号"
                                               style={{marginTop: 10, width: "100%"}}/>
                                        <div style={{textAlign: "left", marginTop: 5}}>

                                            <div>
                                                {/*<Button type="primary" onClick={this.canver.bind(this)}>车架号截屏</Button>*/}
                                                <Button type="primary" onClick={this.vinocr}>车型解析</Button>
                                                <Button type="primary" onClick={this.servervin}>搜索车型代码</Button>
                                                <Button type="primary" onClick={this.pointcar}>手动选车</Button>

                                            </div>
                                            {/*<p>解析结果</p>*/}
                                            <Tabs activeKey={this.state.actionkey}>
                                                <TabPane tab="车架号解析" key="1">
                                                    <div style={{width:'100%'}}>
                                                        <div style={{height: "100%", overflow: 'auto'}}>
                                                            <InfiniteScroll
                                                                initialLoad={false}
                                                                pageStart={0}
                                                                loadMore={() => {
                                                                }}
                                                                hasMore={true}
                                                                useWindow={true}
                                                            >
                                                                <List
                                                                    dataSource={this.state.groupdata}
                                                                    renderItem={this.renderItem.bind(this)}
                                                                >
                                                                </List>
                                                            </InfiniteScroll>
                                                        </div>
                                                        {brandflag==true&&
                                                            <div>
                                                                <h4>主要特征</h4>
                                                                <div className="tzdiv">
                                                                    <span>发动机型号：{this.state.brandmodel.engine}</span>
                                                                    <span>前雾灯：{this.state.brandmodel.frontFoglamp}</span>
                                                                </div>
                                                                <div className="tzdiv">
                                                                    <span>变速箱型号：{this.state.brandmodel.transDesc}</span>
                                                                    <span>氙气大灯：{this.state.brandmodel.xenonLight}</span>
                                                                </div>
                                                                <div className="tzdiv">
                                                                    <span>转向助力：{this.state.brandmodel.powerType}</span>
                                                                    <span>LED大灯：{this.state.brandmodel.ledLight}</span>
                                                                </div>
                                                                <div className="tzdiv">
                                                                    <span>驱动方式：{this.state.brandmodel.driveType}</span>
                                                                    <span>全景天窗：{this.state.brandmodel.panoramicSunroof}</span>
                                                                </div>
                                                                <div className="tzdiv">
                                                                    <span>车身：{this.state.brandmodel.bodyType}</span>
                                                                    <span>前轮：{this.state.brandmodel.frontTyre}</span>
                                                                </div>
                                                                <div className="tzdiv">
                                                                    <span>车门：{this.state.brandmodel.doorNo}</span>
                                                                    <span>后轮：{this.state.brandmodel.rearTyre}</span>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </TabPane>
                                                <TabPane tab="车型代码" key="2">
                                                    <div style={{width:'100%',display:'block'}}>
                                                        <div style={{height: "100%", overflow: 'auto'}}>
                                                            <InfiniteScroll
                                                                initialLoad={false}
                                                                pageStart={0}
                                                                loadMore={() => {
                                                                }}
                                                                hasMore={true}
                                                                useWindow={true}
                                                            >
                                                                <List
                                                                    dataSource={this.state.groupdata1}
                                                                    renderItem={this.renderItem1.bind(this)}
                                                                >
                                                                </List>
                                                            </InfiniteScroll>
                                                        </div>
                                                        {serflag&&
                                                        <div>
                                                            <h4>主要特征</h4>
                                                            <div className="tzdiv">
                                                                <span>发动机型号：{this.state.serbrandmodel.engine}</span>
                                                                <span>前雾灯：{this.state.serbrandmodel.frontFoglamp}</span>
                                                            </div>
                                                            <div className="tzdiv">
                                                                <span>变速箱型号：{this.state.serbrandmodel.transDesc}</span>
                                                                <span>氙气大灯：{this.state.serbrandmodel.xenonLight}</span>
                                                            </div>
                                                            <div className="tzdiv">
                                                                <span>转向助力：{this.state.serbrandmodel.powerType}</span>
                                                                <span>LED大灯：{this.state.serbrandmodel.ledLight}</span>
                                                            </div>
                                                            <div className="tzdiv">
                                                                <span>驱动方式：{this.state.serbrandmodel.driveType}</span>
                                                                <span>全景天窗：{this.state.serbrandmodel.panoramicSunroof}</span>
                                                            </div>
                                                            <div className="tzdiv">
                                                                <span>车身：{this.state.serbrandmodel.bodyType}</span>
                                                                <span>前轮：{this.state.serbrandmodel.frontTyre}</span>
                                                            </div>
                                                            <div className="tzdiv">
                                                                <span>车门：{this.state.serbrandmodel.doorNo}</span>
                                                                <span>后轮：{this.state.serbrandmodel.rearTyre}</span>
                                                            </div>
                                                        </div>
                                                        }
                                                    </div>
                                                </TabPane>
                                                <TabPane tab="手动选车" key="3">
                                                    <div style={{width:'100%'}}>
                                                        <div style={{height: "100%", overflow: 'auto'}}>
                                                            <InfiniteScroll
                                                                initialLoad={false}
                                                                pageStart={0}
                                                                loadMore={() => {
                                                                }}
                                                                hasMore={true}
                                                                useWindow={true}
                                                            >
                                                                <List
                                                                    dataSource={this.state.autogroup}
                                                                    renderItem={this.renderItem2.bind(this)}
                                                                >
                                                                </List>
                                                            </InfiniteScroll>
                                                        </div>
                                                    {autogroupflag && <div>
                                                        <h4>主要特征:</h4>
                                                        <div className="tzdiv">
                                                            <span>发动机型号：{this.state.autogroupmodel.engine}</span>
                                                            <span>前雾灯：{this.state.autogroupmodel.frontFoglamp}</span>
                                                        </div>
                                                        <div className="tzdiv">
                                                            <span>变速箱型号：{this.state.autogroupmodel.transDesc}</span>
                                                            <span>氙气大灯：{this.state.autogroupmodel.xenonLight}</span>
                                                        </div>
                                                        <div className="tzdiv">
                                                            <span>转向助力：{this.state.autogroupmodel.powerType}</span>
                                                            <span>LED大灯：{this.state.autogroupmodel.ledLight}</span>
                                                        </div>
                                                        <div className="tzdiv">
                                                            <span>驱动方式：{this.state.autogroupmodel.driveType}</span>
                                                            <span>全景天窗：{this.state.autogroupmodel.panoramicSunroof}</span>
                                                        </div>
                                                        <div className="tzdiv">
                                                            <span>车身：{this.state.autogroupmodel.bodyType}</span>
                                                            <span>前轮：{this.state.autogroupmodel.frontTyre}</span>
                                                        </div>
                                                        <div className="tzdiv">
                                                            <span>车门：{this.state.autogroupmodel.doorNo}</span>
                                                            <span>后轮：{this.state.autogroupmodel.rearTyre}</span>
                                                        </div>
                                                    </div>}
                                                    </div>
                                                </TabPane>
                                            </Tabs>
                                            <div>
                                                <Modal
                                                    title="手动选车"
                                                    visible={this.state.visible}
                                                    onOk={this.handleOk}
                                                    onCancel={this.handleCancel}
                                                    footer={null}
                                                >
                                                    <div>
                                                        <div style={{display:'inline-block',overflow:'auto',padding:'5px'}}>
                                                            <ul style={{height:'200px',padding:'0'}}>
                                                                {this.state.markList&&this.state.markList.map((item1,index1)=>{
                                                                    return(
                                                                        <li key={index1} style={{padding:'5px',cursor:'pointer'}} onClick={this.itemmark.bind(this,item1)}>{item1}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div style={{display:'inline-block',overflow:'auto',padding:'5px'}}>
                                                            <ul style={{height:'200px',padding:'0'}}>
                                                                {this.state.modelList&&this.state.modelList.map((item2,index2)=>{
                                                                    return(
                                                                        <li key={index2} style={{padding:'5px',cursor:'pointer'}} onClick={this.itemmodel.bind(this,item2)}>{item2.model}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div style={{display:'inline-block',overflow:'auto',padding:'5px'}}>
                                                            <ul style={{height:'200px',padding:'0'}}>
                                                                {this.state.yearRangeList&&this.state.yearRangeList.map((item3,index3)=>{
                                                                    return(
                                                                        <li key={index3} style={{padding:'5px',cursor:'pointer'}} onClick={this.itemyearrange.bind(this,item3)}>{item3.yearRange}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div style={{display:'inline-block',overflow:'auto',padding:'5px'}}>
                                                            <ul style={{height:'200px',padding:'0'}}>
                                                                {this.state.capacityList&&this.state.capacityList.map((item4,index4)=>{
                                                                    return(
                                                                        <li key={index4} style={{padding:'5px',cursor:'pointer'}} onClick={this.itemcapacity.bind(this,item4)}>{item4.capacity}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card bordered={false} bodyStyle={{height: 570}}>
                                    <div style={{textAlign: 'center', height: 500, overflow: "hidden"}}>
                                        <img src={this.state.brandimg} alt="" style={{Height: "80%", width: '100%'}}/>

                                    </div>
                                    <div><p
                                        style={{marginTop: 15, textAlign: 'center', overflow: "hidden"}}>请核对以上信息准确性</p>
                                    </div>
                                </Card>
                            </Col>
                        </Row>


                        {/*<Dragger {...props}>*/}
                        {/*<p className="ant-upload-drag-icon">*/}
                        {/*<Icon type="inbox" />*/}
                        {/*</p>*/}
                        {/*<p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                        {/*<p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>*/}
                        {/*</Dragger>*/}
                    </div>
                )}
            />

        )
    }

}

VehicleType.contextTypes = {
    router: PropTypes.object.isRequired
}