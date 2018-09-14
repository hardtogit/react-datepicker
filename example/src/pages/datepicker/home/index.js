/**
 * Created by xiangguo .
 * time:2018/1/4 0004.
 * email:413401168@qq.com.
 * use:auto...
 */
import React,{Component} from 'react'
import 'babel-polyfill'
require ("./index.less");
import RegionPicker from "../../../../../lib/regionPicker"
class Index extends Component{
    constructor(props) {
        super(props)
        this.state={
            value1:"",
            value2:"",
            value3:"",
            value4:""
        }
    }
     handleClick=(i)=>{
       this.refs["datePicker"+i].toggle();
    }
    handleConfirm1=(date)=>{
       let str=date.year+"-"+date.month+"-"+date.day
        this.setState({
            value1:str
        })
    }
    handleConfirm2=(date)=>{
        let str=date.h+":"+date.m+":"+date.s
        this.setState({
            value2:str
        })
    }
    handleConfirm3=(date)=>{
        let str=date.year+"-"+date.month+"-"+date.day+"  "+date.h+":"+date.m+":"+date.s
        this.setState({
            value3:str
        })
    }
    render(){
        return(
         <div className="swiper-contanier" style={{position:'fixed',width:'100%',height:'100%'}}>
             <div className="btn" onClick={()=>{this.handleClick(1)}}>{this.state.value1||"选择日期"}</div>
             <RegionPicker ref="datePicker1" optionGroups={["province",'city','region']}></RegionPicker>
        </div>

        )
    }
}
export default Index