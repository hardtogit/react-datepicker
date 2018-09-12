import React,{Component} from 'react'
import * as  styles from './lineStyle'

class Index extends Component {
    constructor(props){
        super(props);
        this.state={
            activeItem:0,
            transformX:0,
        };
        this.startY=0;
        this.distances=0;
        this.lastMoveTime=0;
        this.lastMoveStart=0;
    }
    static defaultProps={
        dataSource:{list:((start,end)=>{
                        let arr=[];
                        for(let i=start;i<end;i++){
                            arr.push(i)
                        }
                        return arr;
                    })(2000,2050),
                    defaultValue:2010
                    }
    };
    componentDidMount(){
        const {
            dataSource:{
                list,
                defaultValue
            }
        }=this.props;
        let index =list.indexOf(defaultValue);
        if(index!=-1){
            this.setState({
                activeItem:index,
                transformX:20*index,
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.state.activeItem>nextProps.dataSource.list.length-1){
            this.setState({
                activeItem:nextProps.dataSource.list.length-1,
                transformX:(nextProps.dataSource.list.length-1)*20
            })
        }
    }
    updateInertiaParams = (e)=> {
        let point = e.changedTouches ? e.changedTouches[0] : e;
        let nowTime = e.timeStamp || Date.now();
        if (nowTime - this.lastMoveTime > 300) {
            this.lastMoveTime = nowTime;
            this.lastMoveStart = point.pageY;
        }
    };
    countDistance =(e)=>{
        let nowTime = e.timeStamp || Date.now();
        let v = (e.nativeEvent.changedTouches[0].pageY - this.lastMoveStart) / (nowTime - this.lastMoveTime); //最后一段时间手指划动速度
        let dir = v > 0 ? -1 : 1; //加速度方向
        let deceleration = dir * 0.0006 * -1;
        let duration = Math.abs(v / deceleration); // 速度消减至0所需时间
        let dist = v * duration / 2; //最终移动多少

        (function(nowTime, startAngle, distAngle, duration) {
            var frameInterval = 13;
            var stepCount = duration / frameInterval;
            var stepIndex = 0;
            (function inertiaMove() {
                if (self.stopInertiaMove) return;
                var newAngle = self.quartEaseOut(stepIndex, startAngle, distAngle, stepCount);
                self.setAngle(newAngle);
                stepIndex++;
                if (stepIndex > stepCount - 1 || newAngle < self.beginExceed || newAngle > self.endExceed) {
                    self.endScroll();
                    return;
                }
                setTimeout(inertiaMove, frameInterval);
            })();
        })(nowTime, startAngle, distAngle, duration);

    }
    handleTouchStart=(e)=>{
        e.preventDefault();
        this.updateInertiaParams(e);
        this.startY = e.nativeEvent.changedTouches[0].pageY;
        this.distances=this.state.transformX;
    };
    handleTouchMove=(e)=>{
        e.preventDefault();
        this.updateInertiaParams(e);
        let distance=e.nativeEvent.changedTouches[0].pageY-this.startY;
        let result=this.distances-distance/38*20;
        let activeItem=Math.round(result/20);
        if(activeItem>=this.props.dataSource.list.length+1){
            activeItem=this.props.dataSource.list.length+1;
            result=20*activeItem
        }else if(activeItem<=-2){
            activeItem=-2;
            result=20*activeItem
        }
        this.setState({
            transformX:result,
            activeItem:activeItem
        });
    };
    handleTouchEnd=(e)=>{
        //TODO  还未添加缓动效果
        e.preventDefault();
        this.countDistance(e);
        let distance=e.nativeEvent.changedTouches[0].pageY-this.startY;
        let activeItem=Math.round((this.distances-distance/38*20)/20);
        if(activeItem<0){
            activeItem=0
        }else if(activeItem>this.props.dataSource.list.length-1){
            activeItem=this.props.dataSource.list.length-1
        }
        this.setState({
            transformX: 20*activeItem,
            activeItem:activeItem
        });
        this.props.onChange(this.props.type,this.props.dataSource.list[activeItem])
    };
    render(){
        const{
            activeItem,
            transformX
        }=this.state;

        return(
            <div className="picker" style={styles.picker} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd = {this.handleTouchEnd}>
                <div className="pickerInner" style={styles.pickerInner}>
                    <div className="pickerRuleCenter" style={Object.assign(styles.pickerRule,styles.pickerRuleCenter)}> </div>
                    <ul className="pickerList" style={Object.assign({},styles.pickerRule,styles.pickerList,{border:'none',transform:'perspective(1000px) rotateY(0deg) rotateX('+transformX+'deg)',transition:'100ms ease-out'})}>
                        {
                            (() => {
                                let liArry=[];
                                let liStyle={};
                                this.props.dataSource.list.map((item, i) => {
                                    if(Math.abs(activeItem-i)<=4){
                                        liStyle={transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)',visibility:'visible'}
                                        if(activeItem==i){
                                        liStyle={transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)',visibility:'visible',color:'#222'}
                                        }
                                    }else{
                                        liStyle={transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)'}
                                    }
                                    liArry.push (<li key={i} className="pickerLi"
                                                style={Object.assign({}, styles.pickerLi,liStyle)}>{item}</li>)
                                });
                                return liArry
                            })()
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default Index;