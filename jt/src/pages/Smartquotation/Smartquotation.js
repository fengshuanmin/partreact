/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import $ from 'jquery'
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import VehicleType  from './VehicleType';
import PartType  from './PartType';
import PricePreview  from './PricePreview';
import {Button, Col, Row, Steps} from "antd";
import Net from "../../utils/net/Net";
import {URL_id_and_std_search, URL_std_for_stdname,URL_test} from "../../utils/net/Url";
import {USER_INFO_GET} from "../../utils/storeInfo";

const Step = Steps.Step;

export default  class Smartquotation extends Component {
    constructor(props){
        super(props)
        this.state = {
            step:1
        }
        this.nextstep=this.nextstep.bind(this)
    }
    nextstep(){
        this.setState({
            step:this.state.step>=3?1:this.state.step+1
        })
        /*$.ajax({
            url:URL_test,
            type:'post',
            data:{
                oe:'L35D807217GRU'
            },
            success:(res)=>{
                console.log(res)
            }

        })*/
    }
    componentWillMount(){

    }
    render() {
        return (
            <div style={{marginTop:'30px'}}>
                {/*<BreadcrumbCustom first="智能报价"  />*/}
                <Row gutter={10} style={{height:60}}>
                    <Col span={12} push={6}>
                        <Steps current={this.state.step-1}>
                            <Step title="车型识别" />
                            <Step title="配件识别" />
                            <Step title="报价预览" />
                        </Steps>
                    </Col>
                </Row>
                {this.state.step == 1?<VehicleType/>:null}
                {this.state.step == 2?<PartType/>:null}
                {this.state.step == 3?<PricePreview/>:null}
                <div style={{textAlign:'right',marginTop:20}}>
                    {this.state.step==3?<Button onClick={()=>{
                        this.setState({
                            step:1
                        })
                    }} type="primary">关闭</Button>:
                    <Button onClick={this.nextstep} type="primary">下一步</Button>}
                </div>
            </div>

        )
    }



}

