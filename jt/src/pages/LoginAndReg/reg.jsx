/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message ,Row,Col} from 'antd';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchData, receiveData } from '@/action';
import { fetchData } from '@/action';
import { PwaInstaller } from '../../components/widget/index';
import SelCompanyInfo from '../AccountInfo/selectCompanyInfo';




const FormItem = Form.Item;

class Reg extends React.Component {

    constructor(props){
        super(props)
        this.state={
            role:-1,//1 管理员 2 员工
            showSelInfo:false,
        }
    }


    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
      const {get_verification_code} = this.props;
      console.log(get_verification_code)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(values.tel.length !== 11){
                    message.error('请输入正确的手机号');
                }else if(values.password1 !== values.password2){
                    message.error('请保证两次密码相同');
                }else if(this.state.role == '-1'){
                    message.error('请选择角色');
                }else if(values.sure){
                    message.error('请同意注册协议');
                }
                return;
                const { fetchData } = this.props;
                if (values.userName === 'admin' && values.password === 'admin') fetchData({funcName: 'admin', stateName: 'auth'});
                if (values.userName === 'guest' && values.password === 'guest') fetchData({funcName: 'guest', stateName: 'auth'});
            }
        });
    };

    selecteRoles(e,role){

        this.setState({
            role:e,
            showSelInfo:true
        })
        if(e == '1'){

        }else{

        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {dispatch } = this.props;

        return (
            <div className="login">
                <div className="login-form" style={{height:600}}>
                    <div className="login-logo">
                        <span>松果AI智能</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('tel', {
                                rules: [{ required: true, message: '请输入手机号!' }],
                            })(
                                <Input maxLength={11} prefix={<Icon type="phone" style={{ fontSize: 13 }} />} type="tel" placeholder="请输入手机号" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password1', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password2', {
                                rules: [{ required: true, message: '请重复输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请重复输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Row gutter={5}>
                                <Col span={12}>
                                    {getFieldDecorator('captcha', {
                                        rules: [{ required: true, message: '请输入你获取的验证码!' }],
                                    })(
                                        <Input placeholder="请输入验证码" />
                                    )}
                                </Col>
                                <Col span={2}>
                                    <Button onClick={()=>{
                                        dispatch(fetchData({funcName:'get_verification_code',params:{mobile:13262687378}}))
                                    }}>获取验证码</Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <div>
                            <Checkbox checked={this.state.role == 1} onChange={this.selecteRoles.bind(this,1)}>我是管理员</Checkbox>
                            <Checkbox checked={this.state.role == 2} onChange={this.selecteRoles.bind(this,2)}>我是员工</Checkbox>
                        </div>
                        <SelCompanyInfo changeInfo={(num)=>{
                            this.setState({
                                showSelInfo:false,
                                role:num
                            })
                        }} visible={this.state.showSelInfo} role={this.state.role}/>
                        <FormItem>
                            {getFieldDecorator('sure', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>同意注册<span style={{color:'red'}}>条款</span></Checkbox>
                            )}
                        </FormItem>

                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                            注册
                        </Button>
                        <FormItem>
                            <span onClick={()=>{
                                this.props.history.push('./login')

                            }}>返回登录</span>
                        </FormItem>


                    </Form>
                </div>

            </div>
        );
    }
}

const mapStateToPorps = state => {
    const { get_verification_code } = state.httpData;
    return { get_verification_code };
};


export default connect(mapStateToPorps)(Form.create()(Reg));