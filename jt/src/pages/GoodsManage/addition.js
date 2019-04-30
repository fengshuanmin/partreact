
import React,{Component} from 'react';
import $ from 'jquery'
import {Card,Button,List, Switch, Avatar, Spin,Upload, Icon, Modal,message,Select} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import CustomInput from '../../components/input/CustomInput';
import PropTypes from 'prop-types';
import {
    URL_api_parts_sku_importPartSKu
} from "../../utils/net/Url";
import Net from '../../utils/net/Net';
import {USER_INFO_GET} from '../../utils/storeInfo';
import VehicleType from "../Smartquotation/VehicleType";


/*function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}*/

export default class  Addition extends Component{

    constructor(props){
        super(props);
        this.state={
            loading: false
        }
    }
    downfile=()=>{
        window.open('http://139.196.16.229/excel/template_partsku.xlsx');
    }
    onDrop=(file)=>{
        var history = this.context.router.history
        let f = new FormData();
        f.append('file',file)
        Net.upload({url:URL_api_parts_sku_importPartSKu,data:f},res=>{
            console.log(res)
            if(res.code==0){
                alert('上传成功')
            }else{
                alert('上传失败')
            }
        },err=>{
            if(err.request.status=='401'){
                console.log(this.props)
                alert('登陆失效，请重新登录')
                history.push('/login')
            }
        })
    }
    handleChange=()=>{

    }
    componentDidMount(){

    }
    render(){
        const Dragger = Upload.Dragger;
        const props = {
            action: this.onDrop,
            onChange: this.handleChange,
            multiple: true,
        };
        return(
            <div style={{width:'100%',minHeight:500,maxHeight:800,marginTop:'20px',background:'#fff'}}>
                <div style={{display:'inline-block',width:'20%', height:'160px',border:'1px solid #ccc',
                    margin:'10% 17%',textAlign:'center',float:'left'}} onClick={this.downfile}>
                    <div style={{paddingTop:'45px',fontSize:'30px'}}><Icon type="file" /></div>
                    下载Excel模板
                </div>
                <div style={{display:'inline-block',width:'20%',height:'160px',border:'1px solid #ccc',
                    margin:'10%',textAlign:'center',float:'left'}}>
                    <Dragger {...props} showUploadList={false}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或将文件拖到此处上传</p>
                    </Dragger>,
                </div>
            </div>
        )
    }

}
Addition.contextTypes = {
    router: PropTypes.object.isRequired
}