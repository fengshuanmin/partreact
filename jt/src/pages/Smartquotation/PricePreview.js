import React, {Component} from 'react';
import $ from 'jquery'
import {Modal, Row, Col, Button, Card, List, Checkbox, Input, Table, Icon} from 'antd';
import {URL_id_and_std_search, URL_modify_price} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";


export default class PricePreview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showChangePrice: false
        }
    }

    change = (item) => {
        console.log(item)
        if (item.checkedboxa == '0') {
            item.checkedboxa = '1'
            item.checkedboxb = '0'
            item.checkedboxc = '0'
        } else {
            item.checkedboxa = '0'
        }
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
            item2.checkedboxa = '0'
            if (item2.id == reid) {
                pa = item2
            }
        })
        console.log(pa)
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
                console.log(res[0].code)
                if (res[0].code == '1') {
                    this.setState({
                        changAstate: false
                    })
                    this.dataajax()
                }

            }
        })
    }
    change1 = (item) => {
        console.log(item.checkedboxb)
        if (item.checkedboxb == '0') {
            item.checkedboxb = '1'
            item.checkedboxa = '0'
            item.checkedboxc = '0'
        } else {
            item.checkedboxb = '0'
        }
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
            item3.checkedboxb = '0'
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
    change2 = (item) => {
        if (item.checkedboxc == '0') {
            item.checkedboxc = '1'
            item.checkedboxa = '0'
            item.checkedboxb = '0'
        } else {
            item.checkedboxc = '0'
        }
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
            item4.checkedboxc = '0'
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
        console.log('selectedRowKeys changed: ', selectedRowKeys);
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
                console.log(res)
                this.setState({
                    loading: false
                })
                if (res[0]) {
                    console.log('a1b2')
                    var data = res, arr = [], arraya = []
                    console.log(data)
                    data.map((item, index) => {
                        console.log(item)
                        item.messages.map((item1) => {
                            item1.checkedboxa = '0'
                            item1.checkedboxb = '0'
                            item1.checkedboxc = '0'
                        })
                    })
                    /*console.log(arr)
                    arr.map((item1, index1) => {
                        item1.checkedboxa = '0'
                        item1.checkedboxb = '0'
                        item1.checkedboxc = '0'
                    })*/
                    var {listdata=[]}=this.state
                    listdata=data
                    this.setState({
                        listdata
                    })
                }
            }
        })

    }
    txt = () => {
        this.setState({
            txtflag: true
        })
        var txtarr = []
        this.state.listdata.map((item, index) => {
            console.log(item)
            item.messages.map((item1,index1)=>{
                console.log(item1)
                if (item1.checkedboxa == '1' || item1.checkedboxb == '1' || item1.checkedboxc == '1') {
                    txtarr.push(item1)
                }
            })
        })
        console.log(txtarr)
        this.setState({
            txtdata: txtarr
        })
    }
    closetxt = () => {
        this.setState({
            txtflag: false
        })
    }

    renderItem=(item,index)=>{
        return (
            <List.Item key={item + ""}>
                <div style={{width:'100%',display:'block',background:'#D4F0FF'}}>
                    <p style={{width:'4%',display:'inline-block', textAlign: 'center'}}>{index+1}</p>
                    <p style={{width:'10%',display:'inline-block', textAlign: 'center'}}>{item.on.stdname}</p>
                    <p style={{width:'10%',display:'inline-block', textAlign: 'center'}}>{item.on.skuoe}</p>
                    <p style={{width:'10%',display:'inline-block',  textAlign: 'center'}}>{item.on.description ? item.on.description : '-'}</p>
                    <p style={{width:'10%',display:'inline-block', textAlign: 'center'}}></p>
                    <p style={{width:'10%',display:'inline-block', textAlign: 'center'}}></p>
                    <p style={{width:'10%',display:'inline-block',  textAlign: 'center'}}></p>
                    <p style={{width:'8%',display:'inline-block',  textAlign: 'center'}}></p>
                    <p style={{width:'8%',display:'inline-block',  textAlign: 'center'}}></p>
                    <p style={{width:'8%',display:'inline-block',  textAlign: 'center'}}></p>
                    <p style={{width:'12%',display:'inline-block', textAlign: 'center'}}></p>
                </div>
                {item.messages[0] ? item.messages.map((item1, index1) => {
                    return (
                        <div style={{width:'100%',display:'block',borderBottom:'1px solid #efefef' }} key={index1}>
                            <p style={{width:'4%',display:'inline-block', textAlign: 'center'}}>
                                {/*<input type="radio" disabled={false} Checked={(item1.checkedboxa==1||item1.checkedboxb==1||item1.checkedboxc==1)? true : false}/>*/}
                            </p>
                            <p style={{width:'10%',display:'inline-block',  textAlign: 'center'}}>
                                {/*<span>{(item1.stdname == '' || item1.stdname == null) ? '-' : item1.stdname}</span>*/}
                            </p>
                            <p style={{width:'10%',display:'inline-block', textAlign: 'center'}}>
                                <span>{(item1.skuoe == '' || item1.skuoe == null) ? '-' : item1.skuoe}</span>
                            </p>
                            <p style={{width:'10%',display:'inline-block',  textAlign: 'center'}}>
                                {/*<span>{(item1.description == '' || item1.description == null) ? '-' : item1.description}</span>*/}
                            </p>
                            <p style={{width:'10%',display:'inline-block', textAlign: 'center'}}>
                                <span>{(item1.quality == '' || item1.quality == null) ? '-' : item1.quality}</span>
                            </p>
                            <p style={{width:'10%',display:'inline-block', textAlign: 'center'}}>
                                <span>{(item1.brand == '' || item1.brand == null) ? '-' : item1.brand}</span>
                            </p>
                            <p style={{width:'10%',display:'inline-block', textAlign: 'center'}}>
                                <span>{(item1.maker == '' || item1.maker == null) ? '-' : item1.maker}</span>
                            </p>
                            <p style={{width:'8%',display:'inline-block', textAlign: 'center'}}>
                                <span style={{width: '100%', display: 'flex'}}>
                                <span style={{flex: '1', width: '100%'}}>
                                    <span style={{paddingRight: '10%'}}>{(item1.retail_pricemax == '' || item1.retail_pricemax == null) ? '0' : item1.retail_pricemax}</span>
                                    <Icon type="edit" onClick={this.changicona.bind(this, item1)}/>
                                </span>
                                <input type="radio" name={item1.id} Checked={item1.checkedboxa == '1' ? true : false}
                                       onChange={this.change.bind(this, item1)}/>
                                    {/*<Checkbox Checked={record.checkedboxa=='0'?false:true} onChange={this.change.bind(this, record)}></Checkbox>*/}
                                </span>
                            </p>
                            <p style={{width:'8%',display:'inline-block', textAlign: 'center'}}>
                                <span style={{width: '100%', display: 'flex'}}>
                                    <span style={{flex: '1', width: '100%'}}>
                                        <span style={{paddingRight: '10%'}}>{(item1.retail_pricemid == '' || item1.retail_pricemid == null) ? '0' : item1.retail_pricemid}</span>
                                        <Icon type="edit" onClick={this.changiconb.bind(this, item1)}/>
                                    </span>
                                        {/*<Checkbox Checked={record.checkedboxb=='0'?false:true} onChange={this.change1.bind(this, record)}></Checkbox>*/}
                                    <input type="radio" name={item1.id} Checked={item1.checkedboxb == '1' ? true : false}
                                        onChange={this.change1.bind(this, item1)}/>
                                </span>
                            </p>
                            <p style={{width:'8%',display:'inline-block' , textAlign: 'center'}}>
                                <span style={{width: '100%', display: 'flex'}}>
                                <span style={{flex: '1', width: '100%'}}>
                                    <span
                                        style={{paddingRight: '10%'}}>{(item1.retail_pricemin == '' || item1.retail_pricemin == null) ? '0' : item.retail_pricemin}</span>
                                    <Icon type="edit" onClick={this.changiconc.bind(this, item1)}/>
                                </span>
                                <input type="radio" name={item1.id} Checked={item1.checkedboxc == '1' ? true : false}
                                    onChange={this.change2.bind(this, item1)}/>
                                    {/*<Checkbox Checked={record.checkedboxc=='0'?false:true} onChange={this.change2.bind(this, record)}></Checkbox>*/}
                                </span>
                            </p>
                            <p style={{width:'12%',display:'inline-block', textAlign: 'center'}}>
                                <span>{(item1.source == '' || item1.source == null) ? '-' : item1.source}</span>
                            </p>
                        </div>
                    )
                }):<div style={{textAlign:'center'}}><p>该零件号下暂无维护商品</p></div>}
            </List.Item>
        )
    }

    componentWillMount() {
        this.dataajax()
    }

    render() {
        console.log(this.state)
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [

            // { dataIndex: 'check', key: 'check',align:'center',render: () =><Checkbox  defaultChecked onChange={this.change} /> },
            {title: '序号', key: 'text', render: (text, record, index) => `${index + 1}`, align: 'center'},
            {
                title: '标准名称', dataIndex: 'stdname', key: 'stdname', align: 'center', render: (text, record, index) =>
                    <span key="pjname">{(record.stdname == '' || record.stdname == null) ? '-' : record.stdname}</span>
            },
            {
                title: '标准OE号', dataIndex: 'skuoe', key: 'skuoe', align: 'center', render: (text, record, index) =>
                    <span key="partid">{(record.skuoe == '' || record.skuoe == null) ? '-' : record.skuoe}</span>
            },
            {
                title: '配件特征',
                dataIndex: 'description',
                key: 'description',
                align: 'center',
                render: (text, record, index) =>
                    <span
                        key="Partdes">{(record.description == '' || record.description == null) ? '-' : record.description}</span>
            },
            {
                title: '品质', dataIndex: 'quality', key: 'quality', align: 'center', render: (text, record, index) =>
                    <span
                        key="Partquality">{(record.quality == '' || record.quality == null) ? '-' : record.quality}</span>
            },
            {
                title: '配件品牌', dataIndex: 'brand', key: 'brand', align: 'center', render: (text, record, index) =>
                    <span key="pbrand">{(record.brand == '' || record.brand == null) ? '-' : record.brand}</span>
            },
            {
                title: '配件产地', dataIndex: 'maker', key: 'maker', align: 'center', render: (text, record, index) =>
                    <span key="pmaker">{(record.maker == '' || record.maker == null) ? '-' : record.maker}</span>
            },
            /* { title: '图片', dataIndex: 'vendorAutobrand', key: 'vendorPartbrand',align:'center' ,render: (text,record,index) =>
                     <span key="autobrand">{(record.vendorAutobrand==''||record.vendorAutobrand==null)?'-':record.vendorAutobrand}</span>
             },*/
            // { title: '产地', dataIndex: 'vendorPartmaker', key: 'vendorPartmaker',align:'center' },
            /* { title: '售后', dataIndex: 'vendorPartwarranty', key: 'vendorPartwarranty',align:'center',render: (text,record,index) =>
                     <span key="Partwarranty">{(record.vendorPartwarranty==''||record.vendorPartwarranty==null)?'-':record.vendorPartwarranty}</span>
             },*/,
            {
                title: '最高零售价', key: 'retail_pricemax', align: 'center', render: (text, record, index) =>
                    <span style={{width: '100%', display: 'flex'}} key="Pricemax">
                        <span style={{flex: '1', width: '100%'}}>
                            <span
                                style={{paddingRight: '10%'}}>{(record.retail_pricemax == '' || record.retail_pricemax == null) ? '0' : record.retail_pricemax}</span>
                            <Icon type="edit" onClick={this.changicona.bind(this, record)}/>
                        </span>
                        <input type="radio" name={record.id} Checked={record.checkedboxa == '0' ? false : true}
                               onChange={this.change.bind(this, record)}/>
                        {/*<Checkbox Checked={record.checkedboxa=='0'?false:true} onChange={this.change.bind(this, record)}></Checkbox>*/}
                    </span>
            },
            {
                title: '中间零售价', key: 'retail_pricemid', align: 'center', render: (text, record, index) =>
                    <span style={{width: '100%', display: 'flex'}} key="Pricemid">
                        <span style={{flex: '1', width: '100%'}}>
                            <span
                                style={{paddingRight: '10%'}}>{(record.retail_pricemid == '' || record.retail_pricemid == null) ? '0' : record.retail_pricemid}</span>
                            <Icon type="edit" onClick={this.changiconb.bind(this, record)}/>
                        </span>
                        {/*<Checkbox Checked={record.checkedboxb=='0'?false:true} onChange={this.change1.bind(this, record)}></Checkbox>*/}
                        <input type="radio" name={record.id} Checked={record.checkedboxb == '0' ? false : true}
                               onChange={this.change1.bind(this, record)}/>
                    </span>
            },
            {
                title: '最低零售价', key: 'retail_pricemin', align: 'center', render: (text, record, index) =>
                    <span style={{width: '100%', display: 'flex'}} key="Pricemin">
                        <span style={{flex: '1', width: '100%'}}>
                            <span
                                style={{paddingRight: '10%'}}>{(record.retail_pricemin == '' || record.retail_pricemin == null) ? '0' : record.retail_pricemin}</span>
                            <Icon type="edit" onClick={this.changiconc.bind(this, record)}/>
                        </span>
                        <input type="radio" name={record.id} Checked={record.checkedboxc == '0' ? false : true}
                               onChange={this.change2.bind(this, record)}/>
                        {/*<Checkbox Checked={record.checkedboxc=='0'?false:true} onChange={this.change2.bind(this, record)}></Checkbox>*/}
                    </span>

            },
            {
                title: '来源', dataIndex: 'source', key: 'source', align: 'center', render: (text, record, index) =>
                    <span key="sources">{(record.source == '' || record.source == null) ? '-' : record.source}

            </span>,
            },
            // {
            //     title: '操作', dataIndex: '', key: 'x',align:'center', render: () =><div><span onClick={this.updata} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>修改</span><span onClick={this.delect} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>删除</span><span onClick={this.pict} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>图片</span></div>,
            // },
        ];
        return (
            <div style={{minWidth: 900}} className="priceflex">
                <div style={{
                    width: '100%',
                    background: '#fff',
                    border: '1px solid #ccc',
                    padding: '20px 0',
                    position: 'relative'
                }}>
                    <div style={{width:'100%',display:'block', }}>
                        <p style={{width:'4%',display:'inline-block',  textAlign: 'center'}}>序号</p>
                        <p style={{width:'10%',display:'inline-block',  textAlign: 'center'}}>标准名称</p>
                        <p style={{width:'10%', display:'inline-block', textAlign: 'center'}}>标准OE号</p>
                        <p style={{width:'10%',display:'inline-block',  textAlign: 'center'}}>配件特征</p>
                        <p style={{width:'10%',display:'inline-block',  textAlign: 'center'}}>品质</p>
                        <p style={{width:'10%',display:'inline-block',  textAlign: 'center'}}>配件品牌</p>
                        <p style={{width:'10%',display:'inline-block',  textAlign: 'center'}}>配件产地</p>
                        <p style={{width:'8%',display:'inline-block', textAlign: 'center'}}>最高零售价</p>
                        <p style={{width:'8%',display:'inline-block',  textAlign: 'center'}}>中间零售价</p>
                        <p style={{width:'8%',display:'inline-block',  textAlign: 'center'}}>最低零售价</p>
                        <p style={{width:'12%', display:'inline-block', textAlign: 'center'}}>来源</p>
                    </div>
                    <List
                        dataSource={this.state.listdata}
                        renderItem={this.renderItem}
                    >
                    </List>
                    {/* <Table
                        rowKey='id'
                        columns={columns}
                        dataSource={this.state.listdata}
                        pagination={false}
                        loading={this.state.loading}
                    />*/}
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
                                        <span style={{marginRight: '20px'}}>{item.stdname}</span>
                                        <span style={{marginRight: '20px'}}>{item.skuoe}</span>
                                        <span style={{marginRight: '20px'}}>{item.description}</span>
                                        <span style={{marginRight: '20px'}}>{item.quality}</span>
                                        <span
                                            style={{marginRight: '20px'}}>{item.checkedboxa == '1' ? item.retail_pricemax : item.checkedboxb == '1' ? item.retail_pricemid : item.retail_pricemin}元</span>
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