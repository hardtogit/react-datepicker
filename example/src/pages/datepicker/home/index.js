/**
 * Created by xiangguo .
 * time:2018/1/4 0004.
 * email:413401168@qq.com.
 * use:auto...
 */
import React,{Component} from 'react'
require ("./index.less");
import DatePicker from "react-datepicker-mobile"
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
         <div className="swiper-contanier">
             <div className="btn" onClick={()=>{this.handleClick(1)}}>{this.state.value1||"选择日期"}</div>
             <DatePicker ref="datePicker1" value="2014-04-02" labels="year,month,day" onConfirm={this.handleConfirm1}></DatePicker>
             <div className="btn" onClick={()=>{this.handleClick(2)}}>{this.state.value2||"选择时间"}</div>
             <DatePicker ref="datePicker2"  labels="h,m,s" onConfirm={this.handleConfirm2}></DatePicker>
             <div className="btn" onClick={()=>{this.handleClick(3)}}>{this.state.value3||"全部时间"}</div>
             <DatePicker ref="datePicker3"  labels="year,month,day,h,m,s" onConfirm={this.handleConfirm3}></DatePicker>
        </div>

        )
    }
}
export default Index