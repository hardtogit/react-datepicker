import React, {Component} from 'react'
import * as  styles from './lineStyle'
import PropTypes from 'prop-types';
// let sum =0;

const quartEaseOut = function (t, b, s, d) {
  return s / (d * d) * (2 * d * t - t * t - 2 * d + 2 * t + 1) + b
};

class Line extends Component {
    static defaultProps = {
      labelProp: 'title',
      valueProp: 'value',
      dataSource: [],
      defaultValue: '',
      onChange: () => {
      },
    };

    constructor(props) {
      super(props);
      this.state = {
        activeItem: 0,
        transformX: 0,
        transition: '0s',
      };
      this.startY = 0;
      this.distances = 0;
      this.lastMoveTime = 0;
      this.lastMoveStart = 0;
      this.timer = 0;
    }

    componentDidMount() {
      const {
        dataSource,
        defaultValue,
        valueProp,
      } = this.props;
      let index = 0;
      if (defaultValue) {
        dataSource.forEach((item, i) => {
          if (item[valueProp] === defaultValue) {
            index = i
          }
        })
      }
      this.setState({
        activeItem: index,
        transformX: 20 * index,
      })

    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.dataSource !== this.props.dataSource) {
        this.setState({
          activeItem: 0,
          transformX: 0,
        })
      }
    }

    updateInertiaParams = (e) => {
      let point = e.changedTouches ? e.changedTouches[0] : e;
      let nowTime = e.timeStamp || Date.now();
      if (nowTime - this.lastMoveTime > 300) {
        this.lastMoveTime = nowTime;
        this.lastMoveStart = point.pageY;
      }
    };
    endScroll = () => {
      let activeItem = Math.round(this.state.transformX / 20);
      if (activeItem < 0) {
        activeItem = 0
      } else if (activeItem > this.props.dataSource.length - 1) {
        activeItem = this.props.dataSource.length - 1
      }
      this.setState({
        transition: '200ms',
      }, () => {
        this.setState({
          transformX: 20 * activeItem,
          activeItem: activeItem,
        })
      });
      setTimeout(() => {
        this.moving = false;
      }, 200);
      this.props.onChange(this.props.dataSource[activeItem])
    };
    countDistance = (e) => {
      let $this = this;
      let nowTime = e.timeStamp || Date.now();
      let v = (e.nativeEvent.changedTouches[0].pageY - this.lastMoveStart) / (nowTime - this.lastMoveTime);
      let dir = v > 0 ? -1 : 1; //加速度方向
      let deceleration = dir * 0.0006 * -1;
      let duration = Math.abs(v / deceleration); // 速度消减至0所需时间
      let dist = -v * duration / 2; //最终移动多少
      (function (nowTime, startAngle, distAngle, duration) {
        let frameInterval = 13;
        let stepCount = duration / frameInterval;
        let stepIndex = 0;
        (function inertiaMove() {
          let newAngle = quartEaseOut(stepIndex, startAngle, distAngle, stepCount);
          stepIndex++;
          if (stepIndex > stepCount || newAngle < -80 || newAngle > ($this.props.dataSource.length + 4) * 20) {
            $this.endScroll();
            return;
          }
          $this.setState({
            transformX: newAngle,
            activeItem: Math.round(newAngle / 20),
          }, () => {
            $this.timer = setTimeout(inertiaMove, frameInterval);
          });
        })();
      })(nowTime, this.state.transformX, dist, duration);

    };
    handleTouchStart = (e) => {
      clearInterval(this.timer);
      this.updateInertiaParams(e);
      this.startY = e.nativeEvent.changedTouches[0].pageY;
      this.distances = this.state.transformX;
      this.setState({
        transition: '0s',
      });
    };
    handleTouchMove = (e) => {
      this.updateInertiaParams(e);
      let distance = e.nativeEvent.changedTouches[0].pageY - this.startY;
      let result = this.distances - distance / 38 * 20;
      let activeItem = Math.round(result / 20);
      if (activeItem >= this.props.dataSource.length + 1) {
        activeItem = this.props.dataSource.length + 1;
        result = 20 * activeItem
      } else if (activeItem <= -2) {
        activeItem = -2;
        result = 20 * activeItem
      }
      this.setState({
        transformX: result,
        activeItem: activeItem,
      });
    };
    handleTouchEnd = (e) => {
      this.countDistance(e);
    };

    render() {
      const {activeItem, transformX, transition} = this.state;
      const {labelProp} = this.props;
      return (
        <div className="picker"
          onTouchEnd={(e) => {
            this.handleTouchEnd(e);
            if (e.cancelable) {
              if (!e.defaultPrevented) {
                e.preventDefault();
              }
            }
          }}
          onTouchMove={(e) => {
            this.handleTouchMove(e);
            if (e.cancelable) {
              if (!e.defaultPrevented) {
                e.preventDefault();
              }
            }
          }}
          onTouchStart={(e) => {
            this.handleTouchStart(e);
            if (e.cancelable) {
              if (!e.defaultPrevented) {
                e.preventDefault();
              }
            }
          }}
          style={styles.picker}
        >
          <div className="pickerInner"
            style={styles.pickerInner}
          >
            <div className="pickerRuleCenter"
              style={Object.assign(styles.pickerRule, styles.pickerRuleCenter)}
            >
            </div>
            <ul className="pickerList"
              style={Object.assign({}, styles.pickerRule, styles.pickerList, {
                border: 'none',
                transform: 'perspective(1000px) rotateY(0deg) rotateX(' + transformX + 'deg)',
                WebkitTransform:'perspective(1000px) rotateY(0deg) rotateX(' + transformX + 'deg)',
                transition: transition,
                WebkitTransition:transition,
              })}
            >
              {
                (() => {
                  let liArry = [];
                  let liStyle = {};
                  this.props.dataSource.map((item, i) => {
                    if (Math.abs(activeItem - i) <= 4) {
                      liStyle = {
                        transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)',
                        WebkitTransform:'translateZ(90px) rotateX(-' + 20 * i + 'deg)',
                        visibility: 'visible',
                      }
                      if (activeItem == i) {
                        liStyle = {
                          transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)',
                          WebkitTransform:'translateZ(90px) rotateX(-' + 20 * i + 'deg)',
                          visibility: 'visible',
                          color: '#222',
                        }
                      }
                    } else {
                      liStyle = {
                        transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)',
                        WebkitTransform:'translateZ(90px) rotateX(-' + 20 * i + 'deg)'}
                    }
                    liArry.push(<li className="pickerLi"
                      key={i}
                      style={Object.assign({}, styles.pickerLi, liStyle)}
                    >{item[labelProp]}</li>)
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

Line.propTypes = {
  labelProp: PropTypes.string,//用于显示的属性名称
  valueProp: PropTypes.string,//用于返回的属性名称
  dataSource: PropTypes.array.isRequired,//数据源（对象数组）
  defaultValue: PropTypes.string,//默认值
  onChange: PropTypes.func.isRequired,//滚动结束后的回调方法
};

export default Line;