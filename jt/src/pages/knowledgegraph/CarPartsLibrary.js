import React, {Component} from 'react';
//引入Echarts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { Card,Form,Select,Input,Button} from 'antd';
import {URL_Brand_models, URL_Model_Stdoe} from '../../utils/net/Url'
import $ from "jquery";

let Stdoe = [];
const gd = 'CN_VW_CC_Sedan_2010-2012_18T'
$.ajax({

    url:URL_Model_Stdoe,
    data:{gd},
    type:'post',
    async:false,

    // headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
    success:function (res) {

        console.log(res);


        Stdoe=res;
    }

})

class CarPartsLibrary extends Component{
    // constructor(props){
    //     super(props)
    //     this.state={
    //         gd:'CN_VW_CC_Sedan_2010-2012_18T'
    //     }
    //     this.orderdetail = this.orderdetail.bind(this);
    // };
    orderdetail(){
        this.props.history.push('/app/CarPartsLibrary.js')
    }

    componentDidMount(){
        // $.ajax({
        //     url:URL_Model_Stdoe,
        //     data:{gd:this.state.gd},
        //     type:'post',
        //     // headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
        //     success:function (res) {
        //         console.log(res)
        //     }
        // })

        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({

            tooltip:{
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            /*xAxis:{
                data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]},
            yAxis:{},*/
            series:[{
                type: 'tree',

                data: Stdoe,

                top: '10%',
                bottom: '14%',

                layout: 'radial',

                symbol: 'emptyCircle',

                symbolSize: 7,

                initialTreeDepth: 3,

                animationDurationUpdate: 750

            }]

        })
    }
    render() {
        return (
            <div style={{marginTop:40,minWidth:1600,maxWidth:1600}}>
                <Card style={{minHeight:1500}}>
                    <div ><h1 className="h1">车型零件图</h1></div>
                    <div>
                        <div style={{
                            width: '40%',
                            marginLeft: '1%',
                            // marginTop: '20px',
                            display:'inline-block'
                        }}>
                            <div className="PPCdiv">

                                <input className="spanin" placeholder='制造商' onChange={this.pjevent} type="text" />
                                <input className="spanin" placeholder='车型' onChange={this.pjevent} type="text" />
                                <input className="spanin" placeholder='年款' onChange={this.pjevent} type="text" />
                                <input className="spanin" placeholder='排量' onChange={this.pjevent} type="text" />

                            </div>
                        </div>
                        <Button type="primary">展示</Button>
                        <input className="spani" placeholder='车架号' onChange={this.pjevent} type="text" />
                        <Button type="primary">展示</Button>
                    </div>
                    <div id="main" style={{width:1600,height:1600}}></div>
                </Card>

            </div>
        );}


}
export default CarPartsLibrary