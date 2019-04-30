/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import $ from 'jquery'
import {Row, Col, Card, Steps, Input, Button, List ,Upload, Icon, message, Checkbox,Radio } from 'antd';

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
    URL_api_parts_sku_list
} from '../../utils/net/Url';
import {USER_INFO_GET} from "../../utils/storeInfo";
require('../../style/lib/vehicle.css');


const Dragger  = Upload.Dragger;
export default  class VehicleType extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            imageUrl:'',
            imgUrl:'',
            vincode:''
        }

    }
    vinclick=(e)=>{
        console.log(e.target.value)
        this.setState({
            vincode:e.target.value
        })
        console.log(this.state.vincode)
    }
    actions=(e)=>{

    }
    handleChange=(e)=>{

    }
    getBase64=(img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    onDrop=(file)=>{
        var history = this.context.router.history
        console.log(file);
        this.getBase64(file, imageUrl => this.setState({
            imageUrl,
            loading: false,
        }));
        let f = new FormData();
        f.append('editormd-image-file',file)
        Net.upload({url:URL_vin_screenshot_analysis,data:f},res=>{
            console.log(res)
            let dat={vinCode:res.resultContent}
            this.setState({
                vincode:res.resultContent
            })
            console.log(dat)
            if(res.resultContent.length==17){
                Net.get({url:URL_vin_find_autogroups+'?vinCode='+res.resultContent},res1=>{
                    console.log(res1)
                    console.log(res1.length==0)
                    if(res1.length==0){
                        alert('抱歉，您尚未开通该车型的报价权限，智能报价失败')
                    }else{
                        this.setState({
                            groupdata:res1
                        })
                    }

                },err=>{
                    if(err.request.status=='401'){
                        alert('登陆失效，请重新登录')
                        history.push('/login')
                    }
                })
            }else{
                alert('请补全车架号')
            }
        },err=>{
            if(err.request.status=='401'){
                console.log(this.props)
                alert('登陆失效，请重新登录')
                history.push('/login')
            }
        })
    }
    vinocr=()=>{
        console.log(this.state.vincode)
        console.log(this.props)
        var history = this.context.router.history
        $.ajax({
            url:URL_vin_find_autogroups,
            type:'post',
            data:{vinCode:this.state.vincode},
            headers:{appToken : USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                console.log(res)
                if(res.length==0){
                    alert('抱歉，您尚未开通该车型的报价权限，智能报价失败')
                }else{
                    this.setState({
                        groupdata:res
                    })
                }
            },
            error:(err)=>{
                console.log(err)
                console.log(this.props)
                if(err.status=='401'){
                    alert('登陆失效，请重新登录')
                    history.push('/login')
                }
            }

        })
    }
    renderItem=(item)=>{
        console.log(item)
        return(
            <List.Item key={item+""}>
                <div style={{position:'relative',width:'100%'}}>
                    {/*上海通用别克  君威  2014款  涡轮增压  自动挡*/}
                    <span>{item.brand}  {item.model}  {item.yearRange}   {item.capacity}   {item.transType}</span>
                    <span style={{position:'absolute',right:'3px'}}><Radio onChange={this.onChange.bind(this,item)}/></span>
                </div>
            </List.Item>
        )
    }
    onChange=(item)=>{
        console.log(item)
        this.setState({
            brandimg:item.picLink45,
            groupId:item.groupId
        })
        localStorage.setItem('groupId',item.groupId)
        Net.get({url:URL_vin_find_auto+'?modelId='+item.autoId},res=>{
            console.log(res)
            this.setState({
                brandmodel:res
            })
        },err=>{
            if(err.request.status=='401'){
                alert('登陆失效，请重新登录')
                this.props.history.push('/login')
            }
        })
    }
    canver=()=>{
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
    componentWillMount(){
            console.log(this.state)
            console.log(this.props)
            console.log(this.context)
        if(localStorage.getItem('stateList')) {
            var stateList = localStorage.getItem('stateList')
            var stateLists = JSON.parse(stateList)
            this.state = stateLists
        }
    }
    componentWillUnmount(){
            localStorage.setItem('stateList',JSON.stringify(this.state))
            localStorage.setItem('groupId',this.state.groupId)
    }
    render(){
        console.log(this.state)
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
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">点击上传车架号图片</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <AuthWidget
                children={auth => (
                    <div style={{minWidth:900}}>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Card bordered={false} bodyStyle={{height: 570}}>
                                    <div style={{textAlign: 'center',width:'100%'}}>
                                        <div id="image" style={{height: 100,width:"100%"}}>
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
                                                {imageUrl ? <img src={imageUrl} style={{height: 100,width:"100%"}} alt="avatar" /> : uploadButton}
                                            </Upload>

                                        </div>

                                        {/*<div id="caver">*/}
                                        {/*<p id="caver1" style={{display:'inline-block'}}>{this.state.inutval}</p>*/}
                                        {/*</div>*/}
                                        <Input size="large" id="ipt" maxLength={17} value={this.state.vincode} onChange={this.vinclick} placeholder="输入17位车架号" style={{marginTop:10,width:"100%"}}/>
                                        <div style={{textAlign:"left",marginTop:5}}>

                                            <div>
                                                {/*<Button type="primary" onClick={this.canver.bind(this)}>车架号截屏</Button>*/}
                                                <Button type="primary" onClick={this.vinocr}>车型解析</Button>

                                            </div>
                                            <p>解析结果</p>

                                            <div style={{height:120,overflow:'auto'}}>
                                                <InfiniteScroll
                                                    initialLoad={false}
                                                    pageStart={0}
                                                    loadMore={()=>{}}
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

                                            {this.state.brandmodel&&<div>
                                                <h4>主要特征</h4>
                                                <div className="tzdiv"><span>发动机型号：{this.state.brandmodel.engine}</span><span>前雾灯：{this.state.brandmodel.frontFoglamp}</span></div>
                                                <div className="tzdiv"><span>变速箱型号：{this.state.brandmodel.transDesc}</span><span>氙气大灯：{this.state.brandmodel.xenonLight}</span></div>
                                                <div className="tzdiv"><span>转向助力：{this.state.brandmodel.powerType}</span><span>LED大灯：{this.state.brandmodel.ledLight}</span></div>
                                                <div className="tzdiv"><span>驱动方式：{this.state.brandmodel.driveType}</span><span>全景天窗：{this.state.brandmodel.panoramicSunroof}</span></div>
                                                <div className="tzdiv"><span>车身：{this.state.brandmodel.bodyType}</span><span>前轮：{this.state.brandmodel.frontTyre}</span></div>
                                                <div className="tzdiv"><span>车门：{this.state.brandmodel.doorNo}</span><span>后轮：{this.state.brandmodel.rearTyre}</span></div>
                                            </div>}
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card bordered={false} bodyStyle={{height: 570}}>
                                    <div style={{textAlign:'center'}}>
                                        <img src={this.state.brandimg} alt="" style={{minHeight: 500,maxHeight:700,width:'100%'}} />
                                        <p>以上信息准确性请核对</p>
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