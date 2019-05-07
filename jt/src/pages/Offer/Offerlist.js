import React, {Component} from 'react';
import {Card, Input, Button, Switch, Table, Pagination} from 'antd';
import $ from "jquery";
import {URL_Offer_record} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";


// let nums = [];
const c_id = '595411d4-cf3c-4068-b626-708ccd1fee5'
const a_id = '8f3ea920-e44d-4d85-ac81-6a493ad72a74'
// $.ajax({
//
//     url:URL_Offer_record,
//     data:{a_id,c_id},
//     type:'post',
//     async:false,
//
//     // headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
//     success:function (res) {
//
//         console.log(res);
//
//
//         nums=res;
//     }
//
// })
// console.log(nums,'11111111111111111111111111111111111111111111')
export default class Offerlist extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            v_code: '',
            pjId: '',
            c_id: '',
            listtext: [],
            page: 1,
            limit: '10',
            loading: true
        })
        this.orderdetail = this.orderdetail.bind(this);
        this.orderdetail = this.orderdetail.bind(this);
    }

    pjevent(e) {
        this.setState({
            pjId: e.target.value
        })
    }

    query = () => {
        var lastC = this.refs.partId.value;
        // const c_id = 'e5354498-7da9-429c-a66e-3e3f590f3775'
        var that = this
        console.log(this.state.lastC)
        $.ajax({
            url: URL_Offer_record,
            type: 'post',
            data: {
                // v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                // v_id:USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                v_code: lastC,
                c_id: USER_INFO_GET() && USER_INFO_GET().companyId || '',
                // v_part_name:lastB,
                // shared_type:'o'
            },
            success: (res) => {
                console.log(res)
                if (res[0].code == '1') {
                    that.setState({
                        listdata: res[0].messages
                    })
                }
            }

        })
        this.setState({
            listdata: []
        })
    }

    orderdetail(record) {
        localStorage.setItem('offerid', record.id)
        this.props.history.push('/app/offerdetail')
    }

    componentWillMount() {
        this.dataajax(this.state.page, this.state.limit)
        // const c_id = '595411d4-cf3c-4068-b626-708ccd1fee5'
        // const a_id = '8f3ea920-e44d-4d85-ac81-6a493ad72a74'
        /* $.ajax({
             url:URL_Offer_record,
             type:'post',
             data:{
                 c_id:ai_offer
                 // a_id:'8f3ea920-e44d-4d85-ac81-6a493ad72a74'
             },
             success:(res)=>{
                 console.log(res)
                 console.log(res[0].messages)
                 if (res[0]){
                     this.setState({
                         listtext:res[0].messages
                         }
                     )
                 }
                 /!* if(res[0].code=='1'){
                      this.setState({
                          listdata:res[0].message
                      })
                  }*!/
                 // nums=res;
             }

         })

         this.setState({
             listtext:[]
         });*/
    }

    handlepagesize = (val) => {
        this.dataajax(val, this.state.limit)

    }
    dataajax = (page, limit) => {
        this.setState({
            loading: true
        })
        $.ajax({
            url: URL_Offer_record,
            type: 'post',
            data: {
                // c_id :USER_INFO_GET()&&USER_INFO_GET().companyId||'',
                c_id: '595411d4-cf3c-4068-b626-708ccd1fee5f',
                page: page,
                limit: limit
            },
            success: (res) => {
                console.log(res)
                console.log(res.message)
                if (res[0].code == '1') {
                    this.setState({
                        loading: false,
                        listdata: res[0].messages,
                        total: res[0].num,
                        page: parseInt(res[0].page),
                    })
                }
            }
        })
    }

    render() {
        const columns = [
            {title: '报价单号', dataIndex: 'id', key: 'id', align: 'center'},
            {title: '报价时间', dataIndex: 'created_at', key: 'created_at', align: 'center'},
            {title: '报价人员', dataIndex: 'offer_person', key: 'offer_person', align: 'center'},
            {title: '车型', dataIndex: 'description', key: 'description', align: 'center'},
            {title: '车架号', dataIndex: 'vincode', key: 'vincode', align: 'center'},
            {title: '零件数', dataIndex: 'total_part_quantity', key: 'total_part_quantity', align: 'center'},
            {title: '报价金额', dataIndex: 'price', key: 'price', align: 'center'},
            // { title: '订单来源', dataIndex: 'cprice', key: 'cprice',align:'center' },
            {
                title: '编辑',
                dataIndex: '',
                key: 'x',
                align: 'center',
                render: (text, record, index) => <div><span onClick={this.orderdetail.bind(this, record)} style={{
                    padding: '0 3px',
                    cursor: 'pointer',
                    color: '#40a9ff'
                }}>查看</span></div>,
            },
            // {
            //     title: '操作', dataIndex: '', key: 'x',align:'center', render: () =><div><span onClick={this.orderdetail} style={{padding:'0 3px',cursor:'pointer',color:'#40a9ff'}}>查看</span></div>,
            // },
        ];
        return (
            <div style={{marginTop: 20,width:'100%'}}>
                <Card>
                    <div>
                        <div style={{
                            width: '40%',
                            marginLeft: '1%',
                            marginBottom: '20px',
                            display: 'inline-block'
                        }}>
                            <div className="spantotal">
                                <span className="spanlabel1" onChange={this.pjevent}>按车架号</span>
                                <input className="spaninput" placeholder='请输入车架号' type="text" ref="partId"/>
                            </div>
                        </div>
                        <Button type="primary" onClick={this.query}>查询</Button>
                    </div>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={this.state.listdata}
                        pagination={false}
                        loading={this.state.loading}
                    />
                    <Pagination onChange={this.handlepagesize} defaultCurrent={this.state.page}
                                total={this.state.total}/>
                </Card>
            </div>
        )
    }
}
