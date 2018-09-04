/**
 * Created by xiangguo .
 * time:2018/2/1 0001.
 * email:413401168@qq.com.
 * use:auto...
 */
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Picker from "./Line"
import * as styles from './style'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            open:false,
            valueGroups: {

            },
            optionGroups:{

            },
        };
        this.mappingObj={
            year:'年',
            month:'月',
            day:"日",
            h:"时",
            m:"分",
            s:"秒"
        }
    }
    static propTypes = {
        onConfirm: PropTypes.func.isRequired,
        beginYear:PropTypes.number,//开始年份
        endYear:PropTypes.number,//结束年份
        value:PropTypes.string,//初始值  eg "2018-02-03"
        labels:PropTypes.string //要显示的列 eg "year,month,day,h,m,s"
    };
    static defaultProps= {
        labels:"year,month,day",
        value:"",
        beginYear:2000,
        endYear:2050,
    }
    addStr=(str)=>{
        str=parseInt(str)
        if(str<10){
            return "0"+str.toString()
        }else{
            return str.toString()
        }
    };
    componentDidMount(){
        const dataSource={
            year:{
                list:this.generateNumberArray(this.props.beginYear, this.props.endYear),
                defaultValue:this.props.value.split('-')[0]||new Date().getFullYear().toString(),
                displayValue (item) {
                    return item;
                }
            },
            month: {
                list:this.generateNumberArray(1, 12),
                defaultValue:this.props.value.split('-')[1]|| this.addStr((new Date().getMonth()+1).toString()),
                displayValue (item) {
                    return item;
                }
            },
            day: {
                list:this.returnDays(this.props.value.split('-')[0],this.props.value.split('-')[1])||this.generateNumberArray(1, 31),
                defaultValue:this.props.value.split('-')[2]||this.addStr(new Date().getDate().toString()),
                displayValue (item) {
                    return item;
                }
            },
            h:{
                list:this.generateNumberArray(0, 23),
                defaultValue:this.addStr(new Date().getHours().toString()),
                displayValue (item) {
                    return item;
                }
            },
            m:{
                list:this.generateNumberArray(0, 59),
                defaultValue:this.addStr(new Date().getMinutes().toString()),
                displayValue (item) {
                    return item;
                }
            },
            s:{
                list:this.generateNumberArray(0, 59),
                defaultValue:this.addStr(new Date().getSeconds().toString()),
                displayValue (item) {
                    return item;
                }
            }
        }
        const valueSource={
            year: (new Date().getFullYear()).toString(),
            month: (new Date().getMonth()+1).toString(),
            day:(new Date().getDate()).toString(),
            h:this.addStr(new Date().getHours().toString()),
            m:this.addStr(new Date().getMinutes().toString()),
            s:this.addStr(new Date().getSeconds().toString())
        }
        let selectDataSource={};
        let selectValueSource={}
        let arr=this.props.labels.split(',')
        arr.map((label)=>{
            if(dataSource.hasOwnProperty(label)){
                selectDataSource[label]=dataSource[label]
            }
            if(valueSource.hasOwnProperty(label)){
                selectValueSource[label]=valueSource[label]
            }
        });
        this.setState({
            optionGroups:selectDataSource,
            valueGroups:{
                year:this.props.value.split('-')[0]||new Date().getFullYear().toString(),
                month:this.props.value.split('-')[1]|| this.addStr((new Date().getMonth()+1).toString()),
                day:this.props.value.split('-')[2]||this.addStr(new Date().getDate().toString()),
                h:this.addStr(new Date().getHours().toString()),
                m:this.addStr(new Date().getMinutes().toString()),
                s:this.addStr(new Date().getSeconds().toString())
            }
        })
    }
    generateNumberArray=(begin, end)=> {
        let array = [];
        for (let i = begin; i <= end; i++) {
            array.push((i < 10 ? '0' : '') + i);
        }
        return array;
    };
    isRun=(year)=>{
        if(year%100===0){
            if(year%400==0){
                return true
            }else{
                return false
            }
        }else{
            if(year%4===0){
                return true
            }else{
                return false
            }
        }
    };
    returnDays=(year,month,preMonth)=>{
        if (month === '02') {
            if(this.isRun(year)){
                 return this.generateNumberArray(1, 29)
            }else{
                return this.generateNumberArray(1, 28)
            }
        } else{
            if (['01', '03', '05', '07', '08', '10', '12'].indexOf(month) > -1) {
                return this.generateNumberArray(1, 31)
            } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(month) < 0) {
                return this.generateNumberArray(1, 30)
            }
        }
    };
    handleCancel () {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.toggle()
    }

    handleConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.state.valueGroups);
        }
        this.toggle()
    }
    toggle=()=>{
        this.setState({
            open:!this.state.open
        })
    };
    handleChange = (name, value) => {
        this.setState(({optionGroups,valueGroups}) => {
            const nextState = {
                valueGroups:{
                    ...valueGroups,
                    [name]:value
                }
            };
            if(this.props.labels.split(',').indexOf('day')!=-1){
                if (name === 'year' && valueGroups.month === '02') {
                    if (parseInt(value) % 4 === 0) {
                        nextState.optionGroups = {
                            ...optionGroups,
                            day:{
                                list:this.generateNumberArray(1, 29),
                                defaultValue:valueGroups.day,
                                displayValue (item) {
                                    return item;
                                }
                            }
                        };
                    } else {
                        nextState.optionGroups = {
                            ...optionGroups,
                            day: {
                                list:this.generateNumberArray(1, 28),
                                defaultValue:valueGroups.day,
                                displayValue (item) {
                                    return item;
                                }
                            }
                        };
                    }
                } else if (name === 'month') {
                        nextState.optionGroups = {
                            ...optionGroups,
                            day:{
                                list:this.returnDays(valueGroups.year,value,valueGroups.month),
                                defaultValue:valueGroups.day,
                                displayValue (item) {
                                    return item;
                                }
                            }
                        };

                }else if(name==="day"){
                    nextState.optionGroups = {
                        ...optionGroups,
                        day: {
                            ...optionGroups.day,
                            defaultValue:value,
                        }
                    };
                }
            }
            return nextState;
        });
    };
    componentDidUpdate () {
        if (this.refs.confirmButton &&
            !this.refs.confirmButton.onclick) {

            this.refs.confirmButton.onclick = (e) => {
                e.stopPropagation();
                this.handleConfirm();
            }
            this.refs.cancelButton.onclick =(e) => {
                e.stopPropagation();
                this.handleCancel();
            }
        }
    }
    render () {
        const isZh = !navigator.language ||
            navigator.language.toLowerCase() === 'zh-cn' ||
            navigator.language.toLowerCase() === 'zh';
        let text1 = !isZh ? 'Cancel' : '取消';
        let text2 = !isZh ? 'Finish' : '完成';
        const {optionGroups}=this.state;
        let mstyle={position:"fixed",width:"100%",top:0,bottom:0,display:'none'}
        if(this.state.open){
            mstyle={position:"fixed",width:"100%",top:0,bottom:0,display:'block'}
        }
        return (
            <div style={mstyle} >
                <div style={{position:"relative",width:"100%",height:"100%"}}>
                    <div className='pickerModal' style={this.state.open&&styles.pickerModalActive||styles.pickerModal}>
                        <div className='ui_popup_title' style={styles.ui_popup_title}>
                            <span ref="cancelButton" style={styles.btn_left}>{text1}</span>
                            <span ref="confirmButton" style={styles.btn_right}>{text2}</span>
                        </div>
                        <div className="datePicker_labels" style={styles.datePicker_labels}>
                            {(()=>{
                                let pickerArr=[]
                                for(name in optionGroups){
                                    pickerArr.push(
                                        <div className="datePicker_label" style={styles.datePicker_label}>{this.mappingObj[name]}</div>
                                    )
                                }
                                return pickerArr
                            })()}
                        </div>
                        <div className='ui_popup_content' style={styles.ui_popup_content}>
                            {(()=>{
                                let pickerArr=[]
                                for(name in optionGroups){
                                    pickerArr.push(
                                        <Picker
                                            onChange={this.handleChange}
                                            dataSource={optionGroups[name]}
                                            type={name}
                                        />
                                    )
                                }
                                return pickerArr
                            })()}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Index;