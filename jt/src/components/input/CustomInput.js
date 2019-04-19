import React,{Component} from 'react';
import {Input} from 'antd';

export default class CustomInput extends Component{

    constructor(props){
        super(props)

    }

    render(){
        const styleCss = {
            contain:{
                backgroundColor:'#fff',
                height:50,
                width:350,
                display:'flex',
                alignItems:'center',
                flexDirection:'row',
                border:'1px solid #e2e6ee',


            },
            title:{
                backgroundColor:'#f0f4f8',
                height:48,
                width:100,
                margin:'0 auto',
                textAlign:'center',
                lineHeight:'48px'
            },
            input:{
                width:100,
                // border:'none',
                marginLeft:20,
                marginRight:20,
                flex:1

            }


        }

        return(
            <div style={styleCss.contain}>
                <p style={styleCss.title}>
                    {this.props.title || this.props.children}
                </p>
                <Input style={styleCss.input}
                       defaultValue={this.props.defaultValue


                       }/>
            </div>


        )
    }

}


