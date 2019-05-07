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

    change = (record) => {
        console.log(record)
        if (record.checkedboxa == '0') {
            record.checkedboxa = '1'
            record.checkedboxb = '0'
            record.checkedboxc = '0'
        } else {
            record.checkedboxa = '0'
        }
        // this.setState({
        //     changAstate: true
        // })
        // localStorage.setItem('Aid', record.id)
        // this.changePrice(record.skuoe,'A')
    }
    changicona = (record) => {
        this.setState({
            changAstate: true
        })
        localStorage.setItem('Aid', record.id)
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
        if (pa.retail_pricemid < lastA) {
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
        } else {
            this.refs.partId.value = ''
            alert('最高零售价不能小于中间零售价')
        }
    }
    change1 = (record) => {
        console.log(record.checkedboxb)
        if (record.checkedboxb == '0') {
            record.checkedboxb = '1'
            record.checkedboxa = '0'
            record.checkedboxc = '0'
        } else {
            record.checkedboxb = '0'
        }
        // this.setState({
        //     changBstate: true
        // })
        // localStorage.setItem('Bid', record.id)
    }
    changiconb = (record) => {
        this.setState({
            changBstate: true
        })
        localStorage.setItem('Bid', record.id)
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
        if (pa.retail_pricemax > lastB && pa.retail_pricemin < lastB) {
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
        } else {
            this.refs.partId1.value = ''
            alert('中间零售价不能大于最高零售价并且不能小于最低零售价')
        }
    }
    change2 = (record) => {
        if (record.checkedboxc == '0') {
            record.checkedboxc = '1'
            record.checkedboxa = '0'
            record.checkedboxb = '0'
        } else {
            record.checkedboxc = '0'
        }
        // this.setState({
        //     changCstate: true
        // })
        // localStorage.setItem('Cid', record.id)
    }
    changiconc = (record) => {
        this.setState({
            changCstate: true
        })
        localStorage.setItem('Cid', record.id)
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
        if (pa.retail_pricemid > lastC) {
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
        } else {
            this.refs.partId2.value = ''
            alert('最低零售价不能大于中间零售价')
        }
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
                            arr.push(item1)
                        })
                    })
                    console.log(arr)
                    arr.map((item1, index1) => {
                        item1.checkedboxa = '0'
                        item1.checkedboxb = '0'
                        item1.checkedboxc = '0'
                    })
                    this.setState({
                        listdata: arr
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
            if (item.checkedboxa == '1' || item.checkedboxb == '1' || item.checkedboxc == '1') {
                txtarr.push(item)
            }
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
                title: '配件特征', dataIndex: 'description', key: 'description', align: 'center', render: (text, record, index) =>
                    <span key="Partquality">{(record.description == '' || record.description == null) ? '-' : record.description}</span>
            },
            {
                title: '品质', dataIndex: 'quality', key: 'quality', align: 'center', render: (text, record, index) =>
                    <span key="Partquality">{(record.quality == '' || record.quality == null) ? '-' : record.quality}</span>
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
             },*/
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
            <div style={{minWidth: 900}}>
                <div style={{
                    width: '100%',
                    background: '#fff',
                    border: '1px solid #ccc',
                    padding: '20px 0',
                    position: 'relative'
                }}>
                    <Table
                        rowKey='id'
                        columns={columns}
                        dataSource={this.state.listdata}
                        pagination={false}
                        loading={this.state.loading}
                    />
                    {this.state.changAstate &&
                    <div style={{
                        position: 'absolute',
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
                            margin: '10px 0',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none'
                        }} ref="partId" type="text"/>
                        <Button size="small" onClick={() => {
                            this.setState({changAstate: false})
                        }}>取消</Button>
                        <Button size="small" onClick={this.sureA}>确定</Button>
                    </div>
                    }
                    {this.state.changBstate &&
                    <div style={{
                        position: 'absolute',
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
                            margin: '10px 0',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none'
                        }} ref="partId1" type="text"/>
                        <Button size="small" onClick={() => {
                            this.setState({changBstate: false})
                        }}>取消</Button>
                        <Button size="small" onClick={this.sureB}>确定</Button>
                    </div>
                    }
                    {this.state.changCstate &&
                    <div style={{
                        position: 'absolute',
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
                            margin: '10px 0',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none'
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
                                            style={{marginRight: '20px'}}>{item.checkedboxa == '1' ? item.retail_pricemax : item.checkedboxb == '1' ? item.retail_pricemid : item.retail_pricemin}</span>
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