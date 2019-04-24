import React, {Component} from 'react';
//引入Echarts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts-gl'
import {Card,Input,Button,Switch,Table} from 'antd';
import {URL_Brand_models, URL_Part_Adaper} from '../../utils/net/Url';
import $ from 'jquery'

let Adaper = [];
const oe = 'L35D807217GRU'
$.ajax({

    url:URL_Part_Adaper,
    data:{oe},
    type:'post',
    async:false,

    // headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
    success:function (res) {

        console.log(res);


        Adaper=res;
    }

})

class  PartAdaptationDiagram  extends Component{
    
    // constructor(props){
    //     super(props)
    //     this.state={
    //     oe:'L35D807217GRU'
    //     }
    //     this.orderdetail = this.orderdetail.bind(this);
    // };
    orderdetail(){
        this.props.history.push('/app/PartAdaptationDiagram .js')
    }

    componentDidMount(){
        // $.ajax({
        //     url:URL_Part_Adaper,
        //     data:{oe:this.state.oe},
        //     type: 'post',
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

            series:[{
                type: 'tree',

                data: Adaper,

                top: '7%',
                // left: '7%',
                bottom: '1%',
                right: '20%',

                label: {
                    normal: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    }
                },

                leaves: {
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750,


            }]

        })

    }
    render() {
        return (
            <div style={{marginTop:20,minWidth:800,maxWidth:1200}}>
                <Card style={{minHeight:300}}>
                    <div ><h1 className="h1">零件适配知识图谱</h1></div>
                    <div>
                        <div style={{
                            width: '40%',
                            marginLeft: '1%',
                            // marginTop: '20px',
                            display:'inline-block'
                        }}>
                            <div className="spantotal">

                                <input className="spani" placeholder='请输入标准OE号' onChange={this.pjevent} type="text" />
                                <Button type="primary">展示</Button>


                            </div>
                        </div>


                    </div>
                    <div id="main" style={{width:1000,height:600}}></div>
                </Card>

            </div>

        );}


}
export default PartAdaptationDiagram