import React, {Component} from 'react'
import * as  styles from './lineStyle'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0,
            transformX: 0,
            duration:'100ms'
        };
        this.startY = 0;
        this.distances = 0;
        this.transformX = 0;
    }

    static defaultProps = {
        dataSource: {
            list: ((start, end) => {
                let arr = [];
                for (let i = start; i < end; i++) {
                    arr.push(i)
                }
                return arr;
            })(2000, 2050),
            defaultValue: 2010
        }
    };

    componentDidMount() {
        const {
            dataSource: {
                list,
                defaultValue
            }
        } = this.props;
        let index = list.indexOf(defaultValue);
        if (index != -1) {
            this.setState({
                activeItem: index,
                transformX: 20 * index,
            });
            this.transformX = 20 * index;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.activeItem > nextProps.dataSource.list.length - 1) {
            this.setState({
                activeItem: nextProps.dataSource.list.length - 1,
                transformX: (nextProps.dataSource.list.length - 1) * 20
            });
            this.transformX=(nextProps.dataSource.list.length - 1) * 20
        }
    }

    handleTouchStart = (e) => {
        if (e.cancelable) {
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        this.startY = e.nativeEvent.changedTouches[0].pageY;
        this.distances = this.state.transformX;
    };
    handleTouchMove = (e) => {
        if (e.cancelable) {
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        let distance = (e.nativeEvent.changedTouches[0].pageY - this.startY) / 36 * 20;
        let result = this.distances - distance;
        let activeItem = Math.round((this.distances - distance) / 20);
        if (activeItem >= this.props.dataSource.list.length + 1) {
            activeItem = this.props.dataSource.list.length + 1;
            result = 20 * activeItem
        } else if (activeItem <= -2) {
            activeItem = -2;
            result = 20 * activeItem
        }
        this.setState({
            transformX: result,
            activeItem: activeItem
        });
        this.line.style.transform='perspective(1000px) rotateY(0deg) rotateX(' + result + 'deg)'
    };
    handleTouchEnd = (e) => {
        //TODO  还未添加缓动效果
        if (e.cancelable) {
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        let distance = (e.nativeEvent.changedTouches[0].pageY - this.startY) / 36 * 20;
        let activeItem = Math.round((this.distances - distance) / 20);
        if (activeItem < 0) {
            activeItem = 0
        } else if (activeItem > this.props.dataSource.list.length - 1) {
            activeItem = this.props.dataSource.list.length - 1
        }
        this.setState({
            transformX: 20 * activeItem,
            activeItem: activeItem
        });
        this.transformX=20 * activeItem;
        this.props.onChange(this.props.type, this.props.dataSource.list[activeItem])
    };

    render() {
        const {
            activeItem,
            transformX
        } = this.state;

        return (
            <div className="picker" style={styles.picker} onTouchStart={this.handleTouchStart}
                 onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
                <div className="pickerInner" style={styles.pickerInner}>
                    <div className="pickerRuleCenter"
                         style={Object.assign(styles.pickerRule, styles.pickerRuleCenter)}></div>
                    <ul ref={(line) => {
                        this.line = line
                    }} className="pickerList" style={Object.assign({}, styles.pickerRule, styles.pickerList, {
                        border: 'none',
                        transform: 'perspective(1000px) rotateY(0deg) rotateX(' + this.transformX + 'deg)',
                        transitionDuration: 0
                    })}>
                        {
                            (() => {
                                let liArry = [];
                                let liStyle = {};
                                this.props.dataSource.list.map((item, i) => {
                                    if (Math.abs(activeItem - i) <= 4) {
                                        liStyle = {
                                            transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)',
                                            visibility: 'visible'
                                        };
                                        if (activeItem == i) {
                                            liStyle = {
                                                transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)',
                                                visibility: 'visible',
                                                color: '#222'
                                            }
                                        }
                                    } else {
                                        liStyle = {transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)'}
                                    }
                                    liArry.push(<li key={i} className="pickerLi"
                                                    style={Object.assign({}, styles.pickerLi, liStyle)}>{item}</li>)
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