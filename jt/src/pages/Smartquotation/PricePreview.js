import React, {Component} from 'react';
import $ from 'jquery'
import {Modal, Row, Col, Button, Card, List, Checkbox, Input, Table, Icon} from 'antd';
import {URL_id_and_std_search, URL_modify_price} from "../../utils/net/Url";
import Checked from '../../style/imgs/checked.png'
import noChecked from '../../style/imgs/nochecked.png'
import {USER_INFO_GET} from "../../utils/storeInfo";

require('../../style/lib/goodscss.css');

export default class PricePreview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showChangePrice: false
        }
    }

    change = (item,item1) => {
        console.log(item)
        console.log(item1)
        if (item1.checkedboxa == false) {
            item1.checkedboxa = true
            item1.checkedboxb = false
            item1.checkedboxc = false
        } else {
            item1.checkedboxa = false
            item1.checkedboxb = false
            item1.checkedboxc = false
        }
        this.state.listdata.map((ite,idx)=>{
            ite.messages[0]&&ite.messages.map((ite1,idx1)=>{
                if(ite1.id==item1.id){
                    ite1=item1
                }
            })
        })
        var {listdata=[]}=this.state
        this.setState({
            listdata
        })
        // item.message
    }
    changicona = (item1) => {
        this.setState({
            changAstate: true
        })
        localStorage.setItem('Aid', item1.id)
    }
    sureA = () => {
        var reid = localStorage.getItem('Aid')
        var lastA = this.refs.partId.value;
        var pa = {}
        this.state.listdata.map((item2, index2) => {
            item2.checkedboxa = false
            if (item2.id == reid) {
                pa = item2
            }
        })
        $.ajax({
            url: URL_modify_price,
            type: 'POST',
            data: {
                v_id: USER_INFO_GET() && USER_INFO_GET().companyId || '',
                part_sku_id: reid,
                price: lastA,
                p_typed: 'A'
            },
            success: (res) => {
                if (res[0].code == '1') {
                    this.setState({
                        changAstate: false
                    })
                    this.dataajax()
                }

            }
        })
    }
    change1 = (item,item1) => {
        if (item1.checkedboxb == false) {
            item1.checkedboxa = false
            item1.checkedboxb = true
            item1.checkedboxc = false
        } else {
            item1.checkedboxa = false
            item1.checkedboxb = false
            item1.checkedboxc = false
        }
        this.state.listdata.map((ite,idx)=>{
            ite.messages[0]&&ite.messages.map((ite1,idx1)=>{
                if(ite1.id==item1.id){
                    ite1=item1
                }
            })
        })
        var {listdata=[]}=this.state
        this.setState({
            listdata
        })
    }
    changiconb = (item) => {
        this.setState({
            changBstate: true
        })
        localStorage.setItem('Bid', item.id)
    }
    sureB = () => {
        var reid = localStorage.getItem('Bid')
        var lastB = this.refs.partId1.value;
        var pa = {}
        this.state.listdata.map((item3, index3) => {
            item3.checkedboxb = false
            if (item3.id == reid) {
                pa = item3
            }
        })
        $.ajax({
            url: URL_modify_price,
            type: 'POST',
            data: {
                v_id: USER_INFO_GET() && USER_INFO_GET().companyId || '',
                part_sku_id: reid,
                price: lastB,
                p_typed: 'B'
            },
            success: (res) => {
                if (res[0].code == '1') {
                    this.setState({
                        changBstate: false
                    })
                    this.dataajax()
                }

            }
        })
    }
    change2 = (item,item1) => {
        if (item1.checkedboxc == false) {
            item1.checkedboxa = false
            item1.checkedboxb = false
            item1.checkedboxc = true
        } else {
            item1.checkedboxa = false
            item1.checkedboxb = false
            item1.checkedboxc = false
        }
        this.state.listdata.map((ite,idx)=>{
            ite.messages[0]&&ite.messages.map((ite1,idx1)=>{
                if(ite1.id==item1.id){
                    ite1=item1
                }
            })
        })
        var {listdata=[]}=this.state
        this.setState({
            listdata
        })
    }
    changiconc = (item) => {
        this.setState({
            changCstate: true
        })
        localStorage.setItem('Cid', item.id)
    }
    sureC = () => {
        var reid = localStorage.getItem('Cid')
        var lastC = this.refs.partId2.value;
        var pa = {}
        this.state.listdata.map((item4, index4) => {
            item4.checkedboxc = false
            if (item4.id == reid) {
                pa = item4
            }
        })
        $.ajax({
            url: URL_modify_price,
            type: 'POST',
            data: {
                v_id: USER_INFO_GET() && USER_INFO_GET().companyId || '',
                part_sku_id: reid,
                price: lastC,
                p_typed: 'C'
            },
            success: (res) => {
                if (res[0].code == '1') {
                    this.setState({
                        changCstate: false
                    })
                    this.dataajax()
                }

            }
        })
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }
    dataajax = () => {
        var groupId = localStorage.getItem('groupId')
        var stdNames = localStorage.getItem('nicknames')
        var stdn = stdNames.replace(/，/g, ',')
        console.log(groupId, stdn)
        var dat = {
            gid: groupId,
            std: stdn
        }
        this.setState({
            loading: true
        })
        $.ajax({
            url: URL_id_and_std_search,
            type: 'POST',
            data: {
                gid: groupId,
                std: stdn
            },
            success: (res) => {
                this.setState({
                    loading: false
                })
                if (res[0]) {
                    var data = res, arr = [], arraya = []
                    data.map((item, index) => {
                        item.messages.map((item1) => {
                            item1.checkedboxa = false
                            item1.checkedboxb = false
                            item1.checkedboxc = false
                        })
                    })
                    var {listdata = []} = this.state
                    listdata = data
                    this.setState({
                        listdata
                    })
                }
            }
        })

    }
    txt = () => {
        var txtarr = []
        this.state.listdata.map((item, index) => {
            item.messages.map((item1, index1) => {
                if (item1.checkedboxa == true || item1.checkedboxb == true || item1.checkedboxc == true) {
                    txtarr.push(item1)
                }
            })
        })
        if (txtarr.length > 0) {
            this.setState({
                txtflag: true,
                txtdata: txtarr
            })
        }

    }
    closetxt = () => {
        this.setState({
            txtflag: false
        })
    }
    componentWillMount() {
        this.dataajax()
    }

    render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div style={{minWidth: 900}} className="priceflex">
                <div style={{
                    width: '100%',
                    background: '#fff',
                    border: '1px solid #ccc',
                    padding: '20px 0',
                    position: 'relative'
                }}>
                    <div style={{width: '100%', display: 'block',}}>
                        <p style={{width: '4%', display: 'inline-block', textAlign: 'center'}}>序号</p>
                        <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>标准名称</p>
                        <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>标准OE号</p>
                        <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>配件特征</p>
                        <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>品质</p>
                        <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>配件品牌</p>
                        <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>配件产地</p>
                        <p style={{width: '8%', display: 'inline-block', textAlign: 'center'}}>最高零售价</p>
                        <p style={{width: '8%', display: 'inline-block', textAlign: 'center'}}>中间零售价</p>
                        <p style={{width: '8%', display: 'inline-block', textAlign: 'center'}}>最低零售价</p>
                        <p style={{width: '12%', display: 'inline-block', textAlign: 'center'}}>来源</p>
                    </div>
                    {this.state.listdata && this.state.listdata.map((item, index) => {
                        return (
                            <div key={index}>
                                <div style={{width: '100%', display: 'block', background: '#D4F0FF'}}>
                                    <p style={{
                                        width: '4%',
                                        display: 'inline-block',
                                        textAlign: 'center'
                                    }}>{index + 1}</p>
                                    <p style={{
                                        width: '10%',
                                        display: 'inline-block',
                                        textAlign: 'center'
                                    }}>{item.on.stdname}</p>
                                    <p style={{
                                        width: '10%',
                                        display: 'inline-block',
                                        textAlign: 'center'
                                    }}>{item.on.skuoe}</p>
                                    <p style={{
                                        width: '10%',
                                        display: 'inline-block',
                                        textAlign: 'center'
                                    }}>{item.on.description ? item.on.description : '-'}</p>
                                    <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}></p>
                                    <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}></p>
                                    <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}></p>
                                    <p style={{width: '8%', display: 'inline-block', textAlign: 'center'}}></p>
                                    <p style={{width: '8%', display: 'inline-block', textAlign: 'center'}}></p>
                                    <p style={{width: '8%', display: 'inline-block', textAlign: 'center'}}></p>
                                    <p style={{width: '12%', display: 'inline-block', textAlign: 'center'}}></p>
                                </div>
                                {item.messages[0] ? item.messages.map((item1, index1) => {
                                    console.log(item1)
                                    return (
                                        <div style={{width: '100%', display: 'block', borderBottom: '1px solid #efefef'}} key={index1}>
                                            <p style={{width: '4%', display: 'inline-block', textAlign: 'center'}}>
                                                {/*<input type="radio" disabled={false} Checked={(item1.checkedboxa==1||item1.checkedboxb==1||item1.checkedboxc==1)? true : false}/>*/}
                                            </p>
                                            <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>
                                                {/*<span>{(item1.stdname == '' || item1.stdname == null) ? '-' : item1.stdname}</span>*/}
                                            </p>
                                            <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>
                                                <span>{(item1.skuoe == '' || item1.skuoe == null) ? '-' : item1.skuoe}</span>
                                            </p>
                                            <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>
                                                <span>{(item1.description == '' || item1.description == null) ? '-' : item1.description}</span>
                                            </p>
                                            <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>
                                                <span>{(item1.quality == '' || item1.quality == null) ? '-' : item1.quality}</span>
                                            </p>
                                            <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>
                                                <span>{(item1.brand == '' || item1.brand == null) ? '-' : item1.brand}</span>
                                            </p>
                                            <p style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>
                                                <span>{(item1.maker == '' || item1.maker == null) ? '-' : item1.maker}</span>
                                            </p>
                                            <p style={{width: '8%', display: 'inline-block', textAlign: 'center'}}>
                                                <span style={{width: '100%', display: 'flex'}}>
                                                <span style={{flex: '1', width: '100%'}}>
                                                    <span
                                                        style={{paddingRight: '10%'}}>{(item1.retail_pricemax == '' || item1.retail_pricemax == null) ? '0' : item1.retail_pricemax}</span>
                                                    <Icon type="edit" onClick={this.changicona.bind(this, item1)}/>
                                                </span>
                                                {item1.checkedboxa == true ?
                                                    <img src={Checked} alt="" style={{width: '16px', height: '16px'}}
                                                         onClick={this.change.bind(this, item,item1)}/> :
                                                    <img src={noChecked} alt="" style={{width: '16px', height: '16px'}}
                                                         onClick={this.change.bind(this,item, item1)}/>
                                                }
                                                </span>
                                            </p>
                                            <p style={{width: '8%', display: 'inline-block', textAlign: 'center'}}>
                                                <span style={{width: '100%', display: 'flex'}}>
                                                    <span style={{flex: '1', width: '100%'}}>
                                                        <span
                                                            style={{paddingRight: '10%'}}>{(item1.retail_pricemid == '' || item1.retail_pricemid == null) ? '0' : item1.retail_pricemid}</span>
                                                        <Icon type="edit" onClick={this.changiconb.bind(this, item1)}/>
                                                    </span>
                                                    {item1.checkedboxb == true ?
                                                        <img src={Checked} alt="" style={{width: '16px', height: '16px'}}
                                                             onClick={this.change1.bind(this,item, item1)}/> :
                                                        <img src={noChecked} alt="" style={{width: '16px', height: '16px'}}
                                                             onClick={this.change1.bind(this,item, item1)}/>}
                                                 </span>
                                            </p>
                                            <p style={{width: '8%', display: 'inline-block', textAlign: 'center'}}>
                                                <span style={{width: '100%', display: 'flex'}}>
                                                    <span style={{flex: '1', width: '100%'}}>
                                                        <span
                                                            style={{paddingRight: '10%'}}>{(item1.retail_pricemin == '' || item1.retail_pricemin == null) ? '0' : item.retail_pricemin}</span>
                                                        <Icon type="edit" onClick={this.changiconc.bind(this, item1)}/>
                                                    </span>
                                                    {item1.checkedboxc == true ?
                                                        <img src={Checked} alt="" style={{width: '16px', height: '16px'}}
                                                             onClick={this.change2.bind(this, item,item1)}/> :
                                                        <img src={noChecked} alt="" style={{width: '16px', height: '16px'}}
                                                             onClick={this.change2.bind(this, item,item1)}/>
                                                    }
                                                </span>
                                            </p>
                                            <p style={{width: '12%', display: 'inline-block', textAlign: 'center'}}>
                                                <span>{(item1.source == '' || item1.source == null) ? '-' : item1.source}</span>
                                            </p>
                                        </div>
                                    )
                                }) : <div style={{textAlign: 'center'}}><p>该零件号下暂无维护商品</p></div>}
                            </div>
                        )
                    })}
                    {this.state.changAstate &&
                    <div style={{
                        position: 'fixed',
                        top: '30%',
                        left: '40%',
                        textAlign: 'center',
                        background: '#fff',
                        width: '20%',
                        height: '120px'
                    }}>
                        <h5 style={{marginTop: '5%'}}>修改价格</h5>
                        <input style={{
                            height: '25px',
                            margin: '10px auto',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none',
                            display: 'block'
                        }} ref="partId" type="text"/>
                        <Button size="small" onClick={() => {
                            this.setState({changAstate: false})
                        }}>取消</Button>
                        <Button size="small" onClick={this.sureA}>确定</Button>
                    </div>
                    }
                    {this.state.changBstate &&
                    <div style={{
                        position: 'fixed',
                        top: '30%',
                        left: '40%',
                        textAlign: 'center',
                        background: '#fff',
                        width: '20%',
                        height: '120px'
                    }}>
                        <h5 style={{marginTop: '5%'}}>修改价格</h5>
                        <input style={{
                            height: '25px',
                            margin: '10px auto',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none',
                            display: 'block'
                        }} ref="partId1" type="text"/>
                        <Button size="small" onClick={() => {
                            this.setState({changBstate: false})
                        }}>取消</Button>
                        <Button size="small" onClick={this.sureB}>确定</Button>
                    </div>
                    }
                    {this.state.changCstate &&
                    <div style={{
                        position: 'fixed',
                        top: '30%',
                        left: '40%',
                        textAlign: 'center',
                        background: '#fff',
                        width: '20%',
                        height: '120px'
                    }}>
                        <h5 style={{marginTop: '5%'}}>修改价格</h5>
                        <input style={{
                            height: '25px',
                            margin: '10px auto',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none',
                            display: 'block'
                        }} ref="partId2" type="text"/>
                        <Button size="small" onClick={() => {
                            this.setState({changCstate: false})
                        }}>取消</Button>
                        <Button size="small" onClick={this.sureC}>确定</Button>

                    </div>
                    }
                </div>
                <div style={{marginTop: 30}}>
                    <Button type="primary" onClick={this.txt}>TXT文本</Button>
                    <Button type="primary">JPG图片</Button>
                    <Button type="primary">PDF文件</Button>
                    {/*<Button type="primary">H5网页</Button>*/}
                </div>
                {this.state.txtflag &&
                <div style={{
                    width: '50%', height: '260px', position: 'absolute', left: '25%', top: '16%',
                    zIndex: '1', background: '#fff', border: '1px solid #cdcdcd'
                }}>
                    <div style={{width: '100%', height: '30px', borderBottom: '1px solid #ccc', lineHeight: '30px'}}>
                        <h4 style={{display: 'inline-block', width: '95%', textAlign: 'center'}}>价格展示</h4>
                        <div style={{display: 'inline-block', border: '1px solid #cdcdcd', lineHeight: '15px'}}
                             onClick={this.closetxt}>
                            <Icon type="close"/>
                        </div>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '190px',
                        overflow: 'auto',
                        borderBottom: '1px solid #ccc',
                        lineHeight: '30px'
                    }}>
                        <ul style={{paddingLeft: '5px'}} className="txtval">
                            {this.state.txtdata && this.state.txtdata.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <span>{item.stdname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span>{item.skuoe}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span>{item.description}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span>{item.quality}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span>{item.checkedboxa == '1' ? item.retail_pricemax : item.checkedboxb == '1' ? item.retail_pricemid : item.retail_pricemin}元</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div style={{width: '100%', height: '40px', lineHeight: '40px', textAlign: 'center'}}>
                        {/*<span style={{display:'inline-block',width:'70%'}}></span>*/}
                        {/*<span style={{display:'inline-block',marginLeft:'20px',width:'70%'}}><Button type="primary" size="small" onClick={this.copytxt}>复制</Button></span>*/}
                        <Button type="primary" size="small" onClick={this.closetxt}>取消</Button>
                        <Button type="primary" size="small" onClick={this.closetxt}>关闭</Button>
                    </div>
                </div>
                }
            </div>
        );
    }
}