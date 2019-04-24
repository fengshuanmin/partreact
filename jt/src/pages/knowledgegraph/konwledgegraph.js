import React, {Component} from 'react';
//引入Echarts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/tree';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {Button, Card} from "antd";
import {URL_Brand_models} from '../../utils/net/Url'
import Net from '../../utils/net/Net'
import {Brand_models} from '../../axios/index';
import { get,post } from '../../axios/tools';
import axios from 'axios'
import {USER_INFO_GET} from "../../utils/storeInfo";
import $ from "jquery"

// let asd={};
let nums = [];
const mk = '进口奥迪'
$.ajax({

    url:URL_Brand_models,
    data:{mk},
    type:'post',
    async:false,

    // headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
    success: (res)=> {

        console.log(res[0],'12121212121212222222222222222222221111111111');


            nums=res;
        }

})
// var array = [0,1,2,3,4];
// array.forEach(function (item,index) {
//
// })
// let data = {"mk":"进口奥迪"};
// axios.post('URL_Brand_models/brand_maker',data)
//     .then(res=>{
//         console.log('res=>',res);
//     })

class konwledgegraph extends Component{

    // constructor(props){
    //     super(props)
    //     this.state={
    //     // mk:'进口奥迪',
    //         // data:asd
    //         nums:nums
    //     }
    //     this.orderdetail = this.orderdetail.bind(this);
    // };
    orderdetail(){
        this.props.history.push('/app/konwledgegraph.js')
    }

    componentDidMount(){
        // const mk= '进口奥迪'
        // $.ajax({
        //
        //     url:URL_Brand_models,
        //     data:{mk},
        //     type:'post',
        //     async:false,
        //
        //     // headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
        //     success: (res)=> {
        //
        //         console.log(res);
        //         if (res[0]){
        //             this.setState({
        //                     nums:res[0].children
        //                 }
        //             )
        //         }
        //
        //         // nums=res;
        //     }
        //
        //
        // })
        //
        // this.setState({
        //     nums:[]
        // })
    // $(function () {
    //     var data=[];
    //     function setOption(data) {
    //         var myChat = echarts.init(document.getElementById('main'))
    //         var option={
    //             tooltip:{
    //                 trigger: 'item',
    //                 triggerOn: 'mousemove'
    //             },
    //
    //             series:[{
    //                 type: 'tree',
    //
    //                 // data: [this.state.data],
    //                 data:this.state.nums,
    //
    //                 top: '30%',
    //                 bottom: '14%',
    //
    //                 layout: 'radial',
    //
    //                 symbol: 'emptyCircle',
    //
    //                 symbolSize: 7,
    //
    //                 initialTreeDepth: 3,
    //
    //                 animationDurationUpdate: 750
    //
    //             }]
    //         }
    //         myChart.setOption(option);
    //     }
    //     $.ajax({
    //         url:URL_Brand_models,
    //         type:'post',
    //         dataType:'JSON',
    //         success:function (objdata) {
    //             for (var i=0;i<objdata.length;i++){
    //                 var dId = parseInt(objdata[i].id);
    //                 var dName
    //             }
    //         }
    //     })
    // })

       // $.ajax({
       //
       //     url:URL_Brand_models,
       //     data:{mk:this.state.mk},
       //     type:'post',
       //     async:false,
       //
       //     // headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
       //     success:function (res) {
       //
       //         console.log(res);
       //       nums = res;
       //      if (res == 'success'){
       //          var obj = eval(res.iteam);
       //          for (var i=0;i<obj.length;i++){
       //              nums.push(obj[i].num);
       //          }
       //      }
       //     },
       //
       //
       //
       // })

                // var str = res;
                    // for (var i = 0;i<str.length;i++){
                    //     nums.push(str[i].num)
                    // }
                    // if (res == 'success'){
                    //     var obj = eval(res.iteam);
                    //     for (var i=0;i<obj.length;i++){
                    //         nums.push(obj[i].num);
                    //     }
                    //     // myChart.setOption({
                    //     //     series:[{
                    //     //         type: 'tree',
                    //     //
                    //     //         // data: [this.state.data],
                    //     //         data:res.res,
                    //     //
                    //     //         top: '30%',
                    //     //         bottom: '14%',
                    //     //
                    //     //         layout: 'radial',
                    //     //
                    //     //         symbol: 'emptyCircle',
                    //     //
                    //     //         symbolSize: 7,
                    //     //
                    //     //         initialTreeDepth: 3,
                    //     //
                    //     //         animationDurationUpdate: 750
                    //     //
                    //     //     }]
                    //     // })
                // },



        // $.ajax({
        //
        //     url:URL_Brand_models,
        //     data:{mk:this.state.mk},
        //     type:'post',
        //     async:false,
        //
        //     // headers:{appToken:USER_INFO_GET()&&USER_INFO_GET().appToken||''},
        //     function (res) {
        //
        //         console.log(res);
        //         myChart.setOption({
        //             xAxis: {
        //                 data: res.categories
        //             },
        //             series: [{

        //                 type: 'tree',
        //
        //                 // data: [this.state.data],
        //                 data:res.res,
        //
        //                 top: '30%',
        //                 bottom: '14%',
        //
        //                 layout: 'radial',
        //
        //                 symbol: 'emptyCircle',
        //
        //                 symbolSize: 7,
        //
        //                 initialTreeDepth: 3,
        //
        //                 animationDurationUpdate: 750
        //             }]
        //         });
        //     },
        //
        //
        //
        // })
        console.log(nums,"11111111111111111111111111111111111111111111")



            console.log(nums,">>>>>>>>>>>>>>");

        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({


            tooltip:{
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            // xAxis: {
            //     data: []
            // },
            // yAxis: {},
            series:[{
                type: 'tree',

                // data: [this.state.data],
                data:nums,

                top: '200%',
                bottom: '200%',
                // left:'10%',
                // right:'20%',

                layout: 'radial',

                symbol: 'emptyCircle',

                expandAndCollapse:true,
                symbolSize: 5,

                initialTreeDepth: 10,

                animationDurationUpdate: 750

            }]

        })

    }

    render() {
        return (
            <div id="main" style={{width:1200,height:1000}}></div>,
                <div >
                    <Card style={{minHeight:1500}}>
                        <div ><h1 className="h1">品牌车型图</h1></div>
                        <div id="main" style={{width:1600,height:1600}}></div>


                    </Card>

                </div>

        );}


}
export default konwledgegraph


