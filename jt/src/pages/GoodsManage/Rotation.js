
import React,{Component} from 'react';
import { Carousel,Icon,Button } from 'antd';
require('../../style/lib/rotation.css');

export default class  Rotation extends Component{

    constructor(props){
        super(props);
        this.state={
            loading: false,
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.back = this.back.bind(this);

    }
    back(){
        window.history.back()
    }
    next() {
        this.slider.slick.slickNext();
    }
    prev() {
        this.slider.slick.slickPrev();
    }
    render(){
        const lunboSetting = {
            dots: true,
            lazyLoad: true,
            autoplay:true,
        };
        return(
           <div style={{width:'100%',minHeight:500,maxHeight:800,marginTop:'20px',background:'#fff'}}>
               {/*<div style={{width:'100%'}}>
                   <Button type="primary" onClick={this.back}>返回</Button>
               </div>*/}
               <div style={{width:'600px',margin:'15px auto 0',position:'relative',paddingTop:'15px'}}>
                   <Carousel {...lunboSetting} ref={el => (this.slider = el)}>
                       <div><h3>1</h3></div>
                       <div><h3>2</h3></div>
                       <div><h3>3</h3></div>
                       <div><h3>4</h3></div>
                   </Carousel>
                   <Icon type="arrow-left" onClick={this.prev}/>
                   <Icon type="arrow-right" onClick={this.next}/>
               </div>
               <div style={{width:'600px',margin:'15px auto',textAlign:'right'}}>
                   <Button type="primary" onClick={this.back}>返回</Button>
               </div>
           </div>
        )
    }

}