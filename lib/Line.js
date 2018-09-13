'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lineStyle = require('./lineStyle');

var styles = _interopRequireWildcard(_lineStyle);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var quartEaseOut = function quartEaseOut(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

var Line = function (_Component) {
    _inherits(Line, _Component);

    function Line(props) {
        _classCallCheck(this, Line);

        var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, props));

        _this.updateInertiaParams = function (e) {
            var point = e.changedTouches ? e.changedTouches[0] : e;
            var nowTime = e.timeStamp || Date.now();
            if (nowTime - _this.lastMoveTime > 300) {
                _this.lastMoveTime = nowTime;
                _this.lastMoveStart = point.pageY;
            }
        };

        _this.endScroll = function () {
            var activeItem = Math.round(_this.state.transformX / 20);
            if (activeItem < 0) {
                activeItem = 0;
            } else if (activeItem > _this.props.dataSource.length - 1) {
                activeItem = _this.props.dataSource.length - 1;
            }
            _this.setState({
                transformX: 20 * activeItem,
                activeItem: activeItem
                // transition: '150ms'
            });
            _this.props.onChange(_this.props.dataSource[activeItem]);
        };

        _this.countDistance = function (e) {
            var $this = _this;
            var nowTime = e.timeStamp || Date.now();
            var v = (e.nativeEvent.changedTouches[0].pageY - _this.lastMoveStart) / (nowTime - _this.lastMoveTime); //最后一段时间手指划动速度
            var dir = v > 0 ? -1 : 1; //加速度方向
            var deceleration = dir * 0.0006 * -1;
            var duration = Math.abs(v / deceleration); // 速度消减至0所需时间
            var dist = -v * duration / 2; //最终移动多少

            (function (nowTime, startAngle, distAngle, duration) {
                var frameInterval = 13;
                var stepCount = duration / frameInterval;
                var stepIndex = 0;
                (function inertiaMove() {
                    var newAngle = quartEaseOut(stepIndex, startAngle, distAngle, stepCount);
                    stepIndex++;
                    if (stepIndex > stepCount - 1 || newAngle < -20 || newAngle > ($this.props.dataSource.length + 1) * 20) {
                        $this.endScroll();
                        return;
                    }
                    $this.setState({
                        transformX: newAngle,
                        activeItem: Math.round(newAngle / 20)
                    }, function () {
                        setTimeout(inertiaMove, frameInterval);
                    });
                })();
            })(nowTime, _this.state.transformX, dist, duration);
        };

        _this.handleTouchStart = function (e) {
            e.preventDefault();
            _this.updateInertiaParams(e);
            _this.startY = e.nativeEvent.changedTouches[0].pageY;
            _this.distances = _this.state.transformX;
            _this.setState({
                transition: '0s'
            });
        };

        _this.handleTouchMove = function (e) {
            e.preventDefault();
            _this.updateInertiaParams(e);
            var distance = e.nativeEvent.changedTouches[0].pageY - _this.startY;
            var result = _this.distances - distance / 38 * 20;
            var activeItem = Math.round(result / 20);
            if (activeItem >= _this.props.dataSource.length + 1) {
                activeItem = _this.props.dataSource.length + 1;
                result = 20 * activeItem;
            } else if (activeItem <= -2) {
                activeItem = -2;
                result = 20 * activeItem;
            }
            _this.setState({
                transformX: result,
                activeItem: activeItem
            });
        };

        _this.handleTouchEnd = function (e) {
            _this.countDistance(e);
            e.preventDefault();
        };

        _this.state = {
            activeItem: 0,
            transformX: 0,
            transition: '0s'
        };
        _this.startY = 0;
        _this.distances = 0;
        _this.lastMoveTime = 0;
        _this.lastMoveStart = 0;
        return _this;
    }

    _createClass(Line, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                dataSource = _props.dataSource,
                defaultValue = _props.defaultValue,
                valueProp = _props.valueProp;

            var index = 0;
            if (defaultValue) {
                dataSource.forEach(function (item, i) {
                    if (item[valueProp] === defaultValue) {
                        index = i;
                    }
                });
            }
            this.setState({
                activeItem: index,
                transformX: 20 * index
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.dataSource !== this.props.dataSource) {
                this.setState({
                    activeItem: 0,
                    transformX: 0
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                activeItem = _state.activeItem,
                transformX = _state.transformX,
                transition = _state.transition;
            var labelProp = this.props.labelProp;

            return _react2.default.createElement(
                'div',
                { className: 'picker', style: styles.picker, onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd },
                _react2.default.createElement(
                    'div',
                    { className: 'pickerInner', style: styles.pickerInner },
                    _react2.default.createElement('div', { className: 'pickerRuleCenter',
                        style: Object.assign(styles.pickerRule, styles.pickerRuleCenter) }),
                    _react2.default.createElement(
                        'ul',
                        { className: 'pickerList', style: Object.assign({}, styles.pickerRule, styles.pickerList, {
                                border: 'none',
                                transform: 'perspective(1000px) rotateY(0deg) rotateX(' + transformX + 'deg)',
                                transition: transition
                            }) },
                        function () {
                            var liArry = [];
                            var liStyle = {};
                            _this2.props.dataSource.map(function (item, i) {
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
                                        };
                                    }
                                } else {
                                    liStyle = { transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)' };
                                }
                                liArry.push(_react2.default.createElement(
                                    'li',
                                    { key: i, className: 'pickerLi',
                                        style: Object.assign({}, styles.pickerLi, liStyle) },
                                    item[labelProp]
                                ));
                            });
                            return liArry;
                        }()
                    )
                )
            );
        }
    }]);

    return Line;
}(_react.Component);

Line.defaultProps = {
    labelProp: 'title',
    valueProp: 'value',
    dataSource: [{ title: '李四', value: '23' }, { title: '张三', value: '23' }, { title: '王麻子', value: '23' }, {
        title: '赵六',
        value: '23'
    }, { title: '张三', value: '23' }, { title: '王麻子', value: '23' }, {
        title: '赵六',
        value: '23'
    }, { title: '张三', value: '23' }, { title: '王麻子', value: '23' }, {
        title: '赵六',
        value: '23'
    }, { title: '张三', value: '23' }, { title: '王麻子', value: '23' }, {
        title: '赵六',
        value: '23'
    }, { title: '张三', value: '23' }, { title: '王麻子', value: '23' }, {
        title: '赵六',
        value: '23'
    }, { title: '张三', value: '23' }, { title: '王麻子', value: '23' }, {
        title: '赵六',
        value: '23'
    }, { title: '张三', value: '23' }, { title: '王麻子', value: '23' }, {
        title: '赵六',
        value: '23'
    }],
    defaultValue: '',
    onChange: function onChange() {}
};


Line.propTypes = {
    labelProp: _propTypes2.default.string, //用于显示的属性名称
    valueProp: _propTypes2.default.string, //用于返回的属性名称
    dataSource: _propTypes2.default.array.isRequired, //数据源（对象数组）
    defaultValue: _propTypes2.default.string, //默认值
    onChange: _propTypes2.default.func.isRequired //滚动结束后的回调方法
};

exports.default = Line;