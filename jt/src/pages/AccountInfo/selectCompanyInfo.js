/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input,Cascader,List,AutoComplete } from 'antd';
import {connect} from 'react-redux';
import {fetchData} from '../../action/index'
import {queryCompany} from '../../axios/index';


const FormItem = Form.Item;
const Option = AutoComplete.Option;


const residences = [{
    value: '浙江1',
    label: '浙江2',
    children: [{
        value: '杭州1',
        label: '杭州2',
        children: [{
            value: '西湖1',
            label: '西湖2',
        }],
    }],
}, {
    value: '江苏1',
    label: '江苏2',
    children: [{
        value: '南京1',
        label: '南京2',
        children: [{
            value: '中华门1',
            label: '中华门2',
        }],
    }],
}];


const CompanyInfo = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form,nameList } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={props.role == 1?"创建公司":"加入已有公司"}
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
            >
                {props.role == 1
                    ?<Form layout="vertical">
                        <FormItem label="填写公司">
                            <Input />
                        </FormItem>
                        <FormItem label="选择地区">
                            <Cascader options={residences} />
                        </FormItem>
                        <FormItem label="详细地址">
                            <Input />
                        </FormItem>
                        <FormItem label="联系电话">
                            <Input />
                        </FormItem>
                    </Form>
                    :  <Form layout="vertical" >
                        <FormItem
                            label="输入公司名称搜索"
                            hasFeedback={false}
                            validateStatus="validating"
                            autocomplete='off'
                            style={{backgroundColor:'',marginBottom:0}}
                        >
                            <AutoComplete
                                style={{ width: 300 }}
                                onSearch={(value)=>{
                                    console.log(value);
                                }}
                                onChange={(value)=>{
                                    console.log(value);
                                    const {dispatch} = this.props;
                                    dispatch(fetchData(queryCompany({ funcName:'companyNames',params:{vendorCompanyName:value}})))

                                }}
                                placeholder="输入公司名称"
                            >
                                {nameList.map(name => <Option key={name}>{name}</Option>)}
                            </AutoComplete>
                        </FormItem>
                    </Form>}

            </Modal>
        );
    }
);



class SelCompanyInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
            nameList:[]
        }
    }

    componentDidUpdate(preProps) {

        const {queryCompany} = this.props
        if(queryCompany &&queryCompany.length ){
            this.setState({
                nameList:[1,2,3,4,5,6]
            })

        }

    }

    handleCancel(){
        this.props.changeInfo&&this.props.changeInfo(-1);
        return;
        this.setState({ visible: false });
    };
    handleCreate (){
        this.props.changeInfo&&this.props.changeInfo(-1);
        return;
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef (form) {
        this.form = form;
    };

    render() {
        return (
            <div>
                <Button onClick={()=>{
                    const {dispatch} = this.props;
                    dispatch(fetchData({funcName:'queryCompany',params:{vendorCompanyName:"asd"}}))
                }}>asadas</Button>
                <CompanyInfo
                    {...this.props}
                    nameList={this.state.nameList}
                    ref={this.saveFormRef.bind(this)}
                    visible={this.props.visible}
                    onCancel={this.handleCancel.bind(this)}
                    onCreate={this.handleCreate.bind(this)}
                    changeInfo={this.props.changeInfo.bind(this)}
                />
            </div>
        );
    }
}





export default connect(
    (state)=>{
        const {queryCompany} = state.httpData;
        return {queryCompany}
    }
) (SelCompanyInfo)