import React, {Component} from 'react';
import $ from 'jquery'
import PropTypes from 'prop-types';
import {Row, Col, Card, Button, Input, Upload, Icon, message, List} from 'antd'
import beauty from '@/style/imgs/beauty.jpg';
import Net from "../../utils/net/Net";
import {URL_api_parts_sku_save, URL_parts_screenshot_analysis, URL_std_for_stdname} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";
import {post} from "../../axios/tools";
import VehicleType from "./VehicleType";

const {TextArea} = Input;


export default class PartType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUrl: '',
            imgUrl: '',
            textvalue: []


        }

        this.textchange = this.textchange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.Nc = this.Nc.bind(this);
    }

    Nc() {
        var array = []
        var ar = typeof this.state.textvalue
        if (ar == "string") {
            var txtvalue = this.state.textvalue.replace(/，/g, ',')
            console.log(txtvalue)
            array = txtvalue.split(',')
            console.log(array)
        } else {
            array = this.state.textvalue
        }
        // // var array=this.state.textvalue
        var arr = array.join(',')
        var dat = {stdnames: arr}
        $.ajax({
            url: URL_std_for_stdname,
            // url:'http://139.196.16.229:9999/std_for_stdname',
            type: 'post',
            data: {stdnames: arr},
            success: (res) => {
                console.log(res)
                if (res[0].code == 1) {
                    this.setState({
                        nickname: res[0].stdname
                    })

                    localStorage.setItem('nicknames', res[0].stdname)
                }
            }

        })
        /* Net.post({url:URL_std_for_stdname,params:dat},res=>{
             console.log(res)
             this.setState({
                 nickname:res.resultContent
             })
             localStorage.setItem('nicknames',res.resultContent)
         })*/
    }

    // handleTextareaChange(e){
    //     var str = e.target.value
    //     var reg = /,$/gi;
    //     str = str.replace(reg,",\r\n");
    //     this.setState({
    //         textareaValue: str
    //     })
    // }
    textchange(e) {
        this.setState({
            textvalue: e.target.value
        })
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    onDrop(file) {
        console.log(file);
        var history = this.context.router.history
        this.getBase64(file, imageUrl => this.setState({
            imageUrl,
            loading: false,
        }));
        console.log(this.state.imageUrl)
        let f = new FormData();
        f.append('editormd-image-file', file)
        console.log(f)
        Net.upload({url: URL_parts_screenshot_analysis, data: f}, res => {
            // console.log(res)
            // var str=res.resultContent.join(',')
            // var newstr=str.replace(/,/g,'\n');
            this.setState({
                textvalue: res.resultContent
            })
        }, err => {
            if (err.request.status == '401') {
                alert('登陆失效，请重新登录')
                history.push('/login')
            }
        })


    }

    /*
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
        localStorage.setItem('nickname',this.state.nickname)

    }

     */
    render() {
        const uploadButton = (
            <div style={{minHeight: 430, maxHeight: 700, width: "100%"}}>
                <div style={{paddingTop: '200px'}}><Icon type={this.state.loading ? 'loading' : 'plus'}/></div>
                <div className="ant-upload-text">点击上传配件图片</div>

            </div>
        );
        /*const uploadButton = (
            <img src={this.state.imageUrl?this.state.imageUrl:beauty} alt="" style={{height: 180,width:"100%"}}/>
        );*/
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <Row>

                    <Card bordered={false} bodyStyle={{minHeight: 400, maxHeight: 700}}>

                        <Col span={1} style={{textAlign: 'center', marginTop: 280}}></Col>
                        <div>
                            <Col span={8} style={{right: 10}}>

                                <p>截屏识别</p>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    // className="avatar-uploader"
                                    showUploadList={false}
                                    action={this.onDrop}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} style={{height: 180, width: "100%"}}
                                                     alt="avatar"/> : uploadButton}
                                </Upload>
                                <div style={{marginTop: 30, textAlign: 'right'}}>
                                    <Button type="primary">截屏</Button>
                                </div>
                                {/*<img src={beauty} alt="" style={{height: 180,width:"100%"}} />*/}
                                {/*<div style={{marginTop:30}}>*/}
                                {/*<Button type="primary">配件截屏</Button>*/}
                                {/*</div>*/}
                            </Col>
                            <Col span={1} style={{textAlign: 'center', marginTop: 280}}><Icon type="caret-right"/></Col>
                            <Col span={6}>

                                <p>手动修改</p>
                                <TextArea style={{minHeight: 446, maxHeight: 900, width: "100%"}}
                                          value={this.state.textvalue} onChange={this.textchange} rows={10}/>
                                <div style={{marginTop: 30, textAlign: 'right'}}>
                                    <Button type="primary" onClick={this.Nc}>启动标准化</Button>
                                </div>

                            </Col>
                            <Col span={1} style={{textAlign: 'center', marginTop: 280}}><Icon type="caret-right"/></Col>
                            <Col span={6}>


                                <p>标准名称</p>
                                <div style={{border: '1px solid ', minHeight: 446, maxHeight: 700, right: 100}}>
                                    <ul>
                                        {this.state.nickname && this.state.nickname.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    {item}
                                                </li>
                                            )
                                        })}
                                    </ul>

                                </div>


                            </Col>
                        </div>
                    </Card>
                </Row>
            </div>
        );
    }

}
PartType.contextTypes = {
    router: PropTypes.object.isRequired
}