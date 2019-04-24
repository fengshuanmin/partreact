
import React,{Component} from 'react';
import $ from 'jquery'
import {Card,Button,List, Switch, Avatar, Spin,Upload, Icon, Modal,message,Select} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import CustomInput from '../../components/input/CustomInput';
import {
    URL_api_parts_sku_getStdNameList,
    URL_api_parts_sku_getConfigQualitys,
    URL_api_parts_sku_getConfigWarrantys,
    URL_api_parts_sku_uploadPartImg,
    URL_api_parts_sku_getPicId,
    URL_api_parts_sku_save, URL_api_parts_sku_update
} from "../../utils/net/Url";
import Net from '../../utils/net/Net';
import {USER_INFO_GET} from '../../utils/storeInfo';


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
        window.open('');
    }
    handleChange=()=>{

    }
    componentDidMount(){

    }
    render(){
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
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
                    <Upload {...props} fileList={this.state.fileList}>
                        <Button>
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                </div>
            </div>
        )
    }

}
