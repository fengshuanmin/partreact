
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

export default class  AddGoods extends Component{

    constructor(props){
        super(props);
        this.state={
            loading: false,
            partList:{
                stdnameId:'',
                stdname:'',
                vendorOe:'',
                vendorReplacedOe:'',
                vendorDescription:'',
                vendorAutomodel:'',
                vendorPartquality:'',
                vendorPartbrand:'',
                vendorPartmaker:'',
                vendorPartwarranty:'',
                retailPricemax:'',
                retailPricemid:'',
                retailPricemin:'',
                sharedPricestd:'',
                picId:'',
                picList:''
            },
            partlistname:'',
            partnameflag:false,
            picList:[]
        }
    }
    partListevent=(e)=>{
        this.setState({
            partlistname:e.target.value
        })
        console.log(USER_INFO_GET()&&USER_INFO_GET().appToken||'')
        $.ajax({
            url:URL_api_parts_sku_getStdNameList,
            type:'post',
            data:{stdname:e.target.value},
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                if(res.code==0){
                    this.setState({
                        partnameflag:true,
                        partnameList:res.stdNameList
                    })
                }

            }

        })
    }
    itempart=(item)=>{
        console.log(item)
        const { partList = [] } = this.state;
        partList.stdnameId=item.stdnameIdTk
        partList.stdname=item.stdname
        this.setState({
            partList,
            partnameflag:false,
            partlistname:item.stdname
        });
    }
    ljhevent=(e)=>{
        const { partList = [] } = this.state;
        partList.vendorOe=e.target.value
        this.setState({
            partList
        });
    }
    bfevent=(e)=>{
        const { partList = [] } = this.state;
        partList.vendorReplacedOe=e.target.value
        this.setState({
            partList
        });
    }
    textevent=(e)=>{
        const { partList = [] } = this.state;
        partList.vendorDescription=e.target.value
        this.setState({
            partList
        });
    }
    brandevent=(e)=>{
        const { partList = [] } = this.state;
        partList.vendorAutomodel=e.target.value
        this.setState({
            partList
        });
    }
    partquality=(e)=>{
        console.log(e)
        const { partList = [] } = this.state;
        partList.vendorPartquality=e
        this.setState({
            partList
        });
    }
    modelevent=(e)=>{
        const { partList = [] } = this.state;
        partList.vendorPartbrand=e.target.value
        this.setState({
            partList
        });
    }
    partaddrevent=(e)=>{
        const { partList = [] } = this.state;
        partList.vendorPartmaker=e.target.value
        this.setState({
            partList
        });
    }
    exitevent=(e)=>{
        const { partList = [] } = this.state;
        partList.vendorPartwarranty=e
        this.setState({
            partList
        });
    }
    pricemaxenent=(e)=>{
        const { partList = [] } = this.state;
        partList.retailPricemax=e.target.value
        this.setState({
            partList
        });
    }
    pricemidenent=(e)=>{
        const { partList = [] } = this.state;
        partList.retailPricemid=e.target.value
        this.setState({
            partList
        });
    }
    priceminenent=(e)=>{
        const { partList = [] } = this.state;
        partList.retailPricemin=e.target.value
        this.setState({
            partList
        });
    }
    pricecomenent=(e)=>{
        const { partList = [] } = this.state;
        partList.sharedPricestd=e.target.value
        this.setState({
            partList
        });
    }
    back =()=>{
        window.history.back()
    }
    getBase64=(img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    onDrop=(file)=>{
        this.getBase64(file, imageUrl => this.setState({
            imageUrl,
            loading: false,
        }));
        let f = new FormData();
        f.append('part-image-file',file)
        Net.upload({url:URL_api_parts_sku_uploadPartImg+'?type=1&&picId='+this.state.partList.picId,data:f},res=>{
            console.log(res)
            if(res.code==0){
                var {picList=[]}=this.state
                picList.push(res.pictureMerchandise.id)
                this.setState({
                    picList
                })
            }
        },err=>{
            if(err.status=='500'){
                alert('登陆失效，请重新登录')
                this.props.history.push('/login')
            }
        })
    }
    onDrop1=(file)=>{
        this.getBase64(file, imageUrl1 => this.setState({
            imageUrl1,
            loading: false,
        }));
        let f = new FormData();
        f.append('part-image-file',file)
        Net.upload({url:URL_api_parts_sku_uploadPartImg+'?type=2&&picId='+this.state.partList.picId,data:f},res=>{
            console.log(res)
            if(res.code==0){
                var {picList=[]}=this.state
                picList.push(res.pictureMerchandise.id)
                this.setState({
                    picList
                })
            }
        },err=>{
            if(err.status=='500'){
                alert('登陆失效，请重新登录')
                this.props.history.push('/login')
            }
        })
    }
    onDrop2=(file)=>{
        this.getBase64(file, imageUrl2 => this.setState({
            imageUrl2,
            loading: false,
        }));
        let f = new FormData();
        f.append('part-image-file',file)
        Net.upload({url:URL_api_parts_sku_uploadPartImg+'?type=3&&picId='+this.state.partList.picId,data:f},res=>{
            console.log(res)
            if(res.code==0){
                var {picList=[]}=this.state
                picList.push(res.pictureMerchandise.id)
                this.setState({
                    imageUrl2:res.pictureMerchandise.url,
                    picList
                })
            }
        },err=>{
            if(err.status=='500'){
                alert('登陆失效，请重新登录')
                this.props.history.push('/login')
            }
        })
    }
    onDrop3=(file)=>{
        this.getBase64(file, imageUrl3 => this.setState({
            imageUrl3,
            loading: false,
        }));
        let f = new FormData();
        f.append('part-image-file',file)
        Net.upload({url:URL_api_parts_sku_uploadPartImg+'?type=4&&picId='+this.state.partList.picId,data:f},res=>{
            console.log(res)
            if(res.code==0){
                var {picList=[]}=this.state
                picList.push(res.pictureMerchandise.id)
                this.setState({
                    imageUrl3:res.pictureMerchandise.url,
                    picList
                })
            }
        },err=>{
            if(err.status=='500'){
                alert('登陆失效，请重新登录')
                this.props.history.push('/login')
            }
        })
    }
    handleChange = (info) => {
        /*if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }*/
    }
    handleChange1 = (info) => {
        /*if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }*/
    }
    handleChange2 = (info) => {
        /*if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }*/
    }
    handleChange3 = (info) => {
        /*if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }*/
    }
    loadcomfir=()=>{
        console.log('loadcomfir')
        const {partList={}}=this.state
        var pis=[]
        this.state.picList.map((item,index)=>{
            pis.push(item)
        })
        var piclist=pis.join(',')
        console.log(piclist)
        partList.picList=piclist
        this.setState({
            partList
        })
        console.log(this.state.partList)
        if(!this.state.partList.stdname){
            alert('请填写配件名称')
        }else if(!this.state.partList.vendorOe){
            alert('请填写零件号')
        }else if(!this.state.partList.vendorPartquality){
            alert('请选择配件品质')
        }else{
            $.ajax({
                url:URL_api_parts_sku_save,
                type:'post',
                data:JSON.stringify(this.state.partList),
                headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||'','Content-Type':'application/json;charset=UTF-8'},
                success:(res)=>{
                    console.log(res)
                    if(res.code==0){
                        alert('商品新增成功')
                        this.picevent()
                        var {partList={}}=this.state
                        partList={}
                        this.setState({
                            partList,
                            partlistname:'',
                            partnameflag:false,
                            imageUrl:'',
                            imageUrl1:'',
                            imageUrl2:'',
                            imageUrl3:''
                        })
                    }
                },
                error:(err)=>{
                    if(err.status=='500'){
                        alert('登陆失效，请重新登录')
                        this.props.history.push('/login')
                    }
                }

            })
        }
    }
    comfir=()=>{
        $.ajax({
            url:URL_api_parts_sku_save,
            type:'post',
            data:JSON.stringify(this.state.partList),
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||'','Content-Type':'application/json;charset=UTF-8'},
            success:(res)=>{
                console.log(res)
                if(res.code==0){
                    window.history.back()
                }

            },
            error:(err)=>{
                if(err.status=='500'){
                    alert('登陆失效，请重新登录')
                    this.props.history.push('/login')
                }
            }

        })
    }
    picevent=()=>{
        $.ajax({
            url:URL_api_parts_sku_getPicId,
            type:'get',
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                if(res.code==0){
                    const {partList}=this.state
                    partList.picId=res.picId
                    this.setState({
                        partList
                    })
                }
            },
            error:(err)=>{
                if(err.status=='500'){
                    alert('登陆失效，请重新登录')
                    this.props.history.push('/login')
                }
            }
        })
    }
    componentDidMount(){
        this.picevent()
        $.ajax({
            url:URL_api_parts_sku_getConfigQualitys,
            type:'get',
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                if(res.code==0){
                    this.setState({
                        qualityList:res.qualityList
                    })
                }
            },
            error:(err)=>{
                if(err.status=='500'){
                    alert('登陆失效，请重新登录')
                    this.props.history.push('/login')
                }
            }

        })
        $.ajax({
            url:URL_api_parts_sku_getConfigWarrantys,
            type:'get',
            headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
            success:(res)=>{
                console.log(res)
                if(res.code==0){
                    this.setState({
                        partwarrantyList:res.warrantyList
                    })
                }
            },
            error:(err)=>{
                if(err.status=='500'){
                    alert('登陆失效，请重新登录')
                    this.props.history.push('/login')
                }
            }

        })
    }

    render(){
        console.log(this.state)
        const Option = Select.Option
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text" style={{fontSize:'10px',color:'#777777'}}>包装图</div>
            </div>
        );
        const uploadButton1 = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text" style={{fontSize:'10px',color:'#777777'}}>标签图</div>
            </div>
        );
        const uploadButton2 = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text" style={{fontSize:'10px',color:'#777777'}}>外观图</div>
            </div>
        );
        const uploadButton3 = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text" style={{fontSize:'10px',color:'#777777'}}>核心特征图</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const imageUrl1 = this.state.imageUrl1;
        const imageUrl2 = this.state.imageUrl2;
        const imageUrl3 = this.state.imageUrl3;
        return(
            <div style={{width:'100%',minHeight:500,maxHeight:800,marginTop:'20px',background:'#fff'}}>
                <div style={{width:'100%',float:'left'}}>
                    <div style={{
                        display: 'inline-block',
                        width: '48%',
                        marginLeft: '1%',
                        marginTop: '20px',
                        float: 'left'
                    }}>
                        <div className="spantotal">
                            <span className="spanlabel">配件编号</span>
                            <input className="spaninput" disabled type="text" value={this.state.partList.stdnameId||''}/>
                        </div>
                        <div className="spantotal" style={{position:'relative'}}>
                            <span className="spanlabel">配件名称<span style={{color:'red'}}>(*)</span></span>
                            <input className="spaninput" onChange={this.partListevent}  type="text" value={this.state.partlistname||''} />
                            {this.state.partnameflag&& <div className="partnamediv">
                                <ul>
                                    {this.state.partnameList.map((item,index)=>{
                                        return(
                                            <li style={{cursor:'pointer'}} key={index} onClick={this.itempart.bind(this,item)}>
                                                {item.stdname}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>}
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel">零件号<span style={{color:'red'}}>(*)</span></span>
                            <input className="spaninput" onChange={this.ljhevent} type="text" value={this.state.partList.vendorOe||''}/>
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel">替换零件号</span>
                            <input className="spaninput" onChange={this.bfevent} type="text" value={this.state.partList.vendorReplacedOe||''}/>
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel">配件描述</span>
                            <input className="spaninput" onChange={this.textevent} type="text" value={this.state.partList.vendorDescription||''}/>
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel">适配车型</span>
                            <input className="spaninput" onChange={this.brandevent} type="text" value={this.state.partList.vendorAutomodel||''}/>
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel">配件品质<span style={{color:'red'}}>(*)</span></span>
                            <Select className="spaninput" value={this.state.partList.vendorPartquality||''} onChange={this.partquality}>
                                {this.state.qualityList&&this.state.qualityList.map((item,index)=>{
                                    return(
                                        <Option key={index} value={item.Qualtiy_Name}>{item.Qualtiy_Name||''}</Option>
                                    )
                                })}
                            </Select>
                            {/*<input className="spaninput" onChange={this.quityevent} type="text" value={this.state.partList.vendorPartquality}/>*/}
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel">品牌</span>
                            <input className="spaninput" onChange={this.modelevent} type="text" value={this.state.partList.vendorPartbrand||''}/>
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel">产地</span>
                            <input className="spaninput" onChange={this.partaddrevent} type="text" value={this.state.partList.vendorPartmaker||''}/>
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel">质保期限</span>
                            <Select className="spaninput" value={this.state.partList.vendorPartwarranty||''} onChange={this.exitevent}>
                                {this.state.partwarrantyList&&this.state.partwarrantyList.map((item,index)=>{
                                    return(
                                        <Option key={index} value={item.Warranty_Name}>{item.Warranty_Name||''}</Option>
                                    )
                                })}
                            </Select>
                            {/*<input className="spaninput" onChange={this.exitevent} type="text" value={this.state.partList.vendorPartwarranty}/>*/}
                        </div>
                    </div>
                    <div style={{
                        display: 'inline-block',
                        width: '48%',
                        marginTop: '20px',
                        marginLeft: '1%',
                        float: 'left'
                    }} className="imgpic">
                        <div className="spantotal">
                            <span className="spanlabel" style={{color: '#FF040D', fontSize: '14px'}}>Max零售价(最高)</span>
                            <input className="spaninput" onChange={this.pricemaxenent} type="text" value={this.state.partList.retailPricemax||''}/>
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel" style={{color: '#FF040D', fontSize: '14px'}}>Mid零售价(中等)</span>
                            <input className="spaninput" onChange={this.pricemidenent} type="text" value={this.state.partList.retailPricemid||''}/>
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel" style={{color: '#FF040D', fontSize: '14px'}}>Min零售价(最低)</span>
                            <input className="spaninput" onChange={this.priceminenent} type="text" value={this.state.partList.retailPricemin||''}/>
                        </div>
                        <div className="spantotal">
                            <span className="spanlabel" style={{color: '#FF040D', fontSize: '14px'}}>同行调货价(最低)</span>
                            <input className="spaninput" onChange={this.pricecomenent} type="text" value={this.state.partList.sharedPricestd||''}/>
                        </div>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={this.onDrop}
                            // onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar"/> : uploadButton}
                        </Upload>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={this.onDrop1}
                            // beforeUpload={beforeUpload}
                            onChange={this.handleChange1}
                        >
                            {imageUrl1 ? <img src={imageUrl1} alt="avatar"/> : uploadButton1}
                        </Upload>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={this.onDrop2}
                            // beforeUpload={beforeUpload}
                            onChange={this.handleChange2}
                        >
                            {imageUrl2 ? <img src={imageUrl2} alt="avatar"/> : uploadButton2}
                        </Upload>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={this.onDrop3}
                            // beforeUpload={beforeUpload}
                            onChange={this.handleChange3}
                        >
                            {imageUrl3 ? <img src={imageUrl3} alt="avatar"/> : uploadButton3}
                        </Upload>
                        <div style={{textAlign:'right',float:'left',marginTop:'70px',width:'100%'}}>
                            <Button type="primary" onClick={this.loadcomfir}>保存并新建</Button>
                            <Button type="primary" onClick={this.comfir}>保存</Button>
                            <Button type="primary" onClick={this.back}>返回</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
