'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lineStyle = require('./lineStyle');

var styles = _interopRequireWildcard(_lineStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.handleTouchStart = function (e) {
            e.preventDefault();
            _this.startY = e.nativeEvent.changedTouches[0].pageY;
            _this.distances = _this.state.transformX;
        };

        _this.handleTouchMove = function (e) {
            e.preventDefault();
            var distance = e.nativeEvent.changedTouches[0].pageY - _this.startY;
            var result = _this.distances - distance;
            var activeItem = Math.round((_this.distances - distance) / 20);
            if (activeItem >= _this.props.dataSource.list.length + 1) {
                activeItem = _this.props.dataSource.list.length + 1;
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
            //TODO  还未添加缓动效果
            e.preventDefault();
            var distance = e.nativeEvent.changedTouches[0].pageY - _this.startY;
            var activeItem = Math.round((_this.distances - distance) / 20);
            if (activeItem < 0) {
                activeItem = 0;
            } else if (activeItem > _this.props.dataSource.list.length - 1) {
                activeItem = _this.props.dataSource.list.length - 1;
            }
            _this.setState({
                transformX: 20 * activeItem,
                activeItem: activeItem
            });
            _this.props.onChange(_this.props.type, _this.props.dataSource.list[activeItem]);
        };

        _this.state = {
            activeItem: 0,
            transformX: 0
        };
        _this.startY = 0;
        _this.distances = 0;
        return _this;
    }

    _createClass(Index, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props$dataSource = this.props.dataSource,
                list = _props$dataSource.list,
                defaultValue = _props$dataSource.defaultValue;

            var index = list.indexOf(defaultValue);
            if (index != -1) {
                this.setState({
                    activeItem: index,
                    transformX: 20 * index
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.activeItem > nextProps.dataSource.list.length - 1) {
                this.setState({
                    activeItem: nextProps.dataSource.list.length - 1,
                    transformX: (nextProps.dataSource.list.length - 1) * 20
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                activeItem = _state.activeItem,
                transformX = _state.transformX;


            return _react2.default.createElement(
                'div',
                { className: 'picker', style: styles.picker, onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd },
                _react2.default.createElement(
                    'div',
                    { className: 'pickerInner', style: styles.pickerInner },
                    _react2.default.createElement(
                        'div',
                        { className: 'pickerRuleCenter', style: Object.assign(styles.pickerRule, styles.pickerRuleCenter) },
                        ' '
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'pickerList', style: Object.assign({}, styles.pickerRule, styles.pickerList, { border: 'none', transform: 'perspective(1000px) rotateY(0deg) rotateX(' + transformX + 'deg)', transition: '100ms ease-out' }) },
                        function () {
                            var liArry = [];
                            var liStyle = {};
                            _this2.props.dataSource.list.map(function (item, i) {
                                if (Math.abs(activeItem - i) <= 4) {
                                    liStyle = { transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)', visibility: 'visible' };
                                    if (activeItem == i) {
                                        liStyle = { transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)', visibility: 'visible', color: '#222' };
                                    }
                                } else {
                                    liStyle = { transform: 'translateZ(90px) rotateX(-' + 20 * i + 'deg)' };
                                }
                                liArry.push(_react2.default.createElement(
                                    'li',
                                    { key: i, className: 'pickerLi',
                                        style: Object.assign({}, styles.pickerLi, liStyle) },
                                    item
                                ));
                            });
                            return liArry;
                        }()
                    )
                )
            );
        }
    }]);

    return Index;
}(_react.Component);

Index.defaultProps = {
    dataSource: { list: function (start, end) {
            var arr = [];
            for (var i = start; i < end; i++) {
                arr.push(i);
            }
            return arr;
        }(2000, 2050),
        defaultValue: 2010
    }
};
exports.default = Index;