'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Line = require('./Line');

var _Line2 = _interopRequireDefault(_Line);

var _style = require('./style');

var styles = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by xiangguo .
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * time:2018/2/1 0001.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * email:413401168@qq.com.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * use:auto...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//TODO 感觉这个版本写得很low....


var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.addStr = function (str) {
            str = parseInt(str);
            if (str < 10) {
                return "0" + str.toString();
            } else {
                return str.toString();
            }
        };

        _this.generateNumberArray = function (begin, end) {
            var array = [];
            for (var i = begin; i <= end; i++) {
                array.push((i < 10 ? '0' : '') + i);
            }
            return array;
        };

        _this.isRun = function (year) {
            if (year % 100 === 0) {
                if (year % 400 == 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (year % 4 === 0) {
                    return true;
                } else {
                    return false;
                }
            }
        };

        _this.returnDays = function (year, month, preMonth) {
            if (month === '02') {
                if (_this.isRun(year)) {
                    return _this.generateNumberArray(1, 29);
                } else {
                    return _this.generateNumberArray(1, 28);
                }
            } else {
                if (['01', '03', '05', '07', '08', '10', '12'].indexOf(month) > -1) {
                    return _this.generateNumberArray(1, 31);
                } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(month) < 0) {
                    return _this.generateNumberArray(1, 30);
                }
            }
        };

        _this.toggle = function () {
            _this.setState({
                open: !_this.state.open
            });
        };

        _this.handleChange = function (name, value) {
            _this.setState(function (_ref) {
                var optionGroups = _ref.optionGroups,
                    valueGroups = _ref.valueGroups;

                var nextState = {
                    valueGroups: _extends({}, valueGroups, _defineProperty({}, name, value))
                };
                if (_this.props.labels.split(',').indexOf('day') != -1) {
                    if (name === 'year' && valueGroups.month === '02') {
                        if (parseInt(value) % 4 === 0) {
                            nextState.optionGroups = _extends({}, optionGroups, {
                                day: {
                                    list: _this.generateNumberArray(1, 29),
                                    defaultValue: valueGroups.day,
                                    displayValue: function displayValue(item) {
                                        return item;
                                    }
                                }
                            });
                        } else {
                            nextState.optionGroups = _extends({}, optionGroups, {
                                day: {
                                    list: _this.generateNumberArray(1, 28),
                                    defaultValue: valueGroups.day,
                                    displayValue: function displayValue(item) {
                                        return item;
                                    }
                                }
                            });
                        }
                    } else if (name === 'month') {
                        nextState.optionGroups = _extends({}, optionGroups, {
                            day: {
                                list: _this.returnDays(valueGroups.year, value, valueGroups.month),
                                defaultValue: valueGroups.day,
                                displayValue: function displayValue(item) {
                                    return item;
                                }
                            }
                        });
                    } else if (name === "day") {
                        nextState.optionGroups = _extends({}, optionGroups, {
                            day: _extends({}, optionGroups.day, {
                                defaultValue: value
                            })
                        });
                    }
                }
                return nextState;
            });
        };

        _this.state = {
            open: false,
            valueGroups: {},
            optionGroups: {}
        };
        _this.mappingObj = {
            year: '年',
            month: '月',
            day: "日",
            h: "时",
            m: "分",
            s: "秒"
        };
        return _this;
    }

    _createClass(Index, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var dataSource = {
                year: {
                    list: this.generateNumberArray(this.props.beginYear, this.props.endYear),
                    defaultValue: this.props.value.split('-')[0] || new Date().getFullYear().toString(),
                    displayValue: function displayValue(item) {
                        return item;
                    }
                },
                month: {
                    list: this.generateNumberArray(1, 12),
                    defaultValue: this.props.value.split('-')[1] || this.addStr((new Date().getMonth() + 1).toString()),
                    displayValue: function displayValue(item) {
                        return item;
                    }
                },
                day: {
                    list: this.returnDays(this.props.value.split('-')[0], this.props.value.split('-')[1]) || this.generateNumberArray(1, 31),
                    defaultValue: this.props.value.split('-')[2] || this.addStr(new Date().getDate().toString()),
                    displayValue: function displayValue(item) {
                        return item;
                    }
                },
                h: {
                    list: this.generateNumberArray(0, 23),
                    defaultValue: this.addStr(new Date().getHours().toString()),
                    displayValue: function displayValue(item) {
                        return item;
                    }
                },
                m: {
                    list: this.generateNumberArray(0, 59),
                    defaultValue: this.addStr(new Date().getMinutes().toString()),
                    displayValue: function displayValue(item) {
                        return item;
                    }
                },
                s: {
                    list: this.generateNumberArray(0, 59),
                    defaultValue: this.addStr(new Date().getSeconds().toString()),
                    displayValue: function displayValue(item) {
                        return item;
                    }
                }
            };
            var valueSource = {
                year: new Date().getFullYear().toString(),
                month: (new Date().getMonth() + 1).toString(),
                day: new Date().getDate().toString(),
                h: this.addStr(new Date().getHours().toString()),
                m: this.addStr(new Date().getMinutes().toString()),
                s: this.addStr(new Date().getSeconds().toString())
            };
            var selectDataSource = {};
            var selectValueSource = {};
            var arr = this.props.labels.split(',');
            arr.map(function (label) {
                if (dataSource.hasOwnProperty(label)) {
                    selectDataSource[label] = dataSource[label];
                }
                if (valueSource.hasOwnProperty(label)) {
                    selectValueSource[label] = valueSource[label];
                }
            });
            this.setState({
                optionGroups: selectDataSource,
                valueGroups: {
                    year: this.props.value.split('-')[0] || new Date().getFullYear().toString(),
                    month: this.props.value.split('-')[1] || this.addStr((new Date().getMonth() + 1).toString()),
                    day: this.props.value.split('-')[2] || this.addStr(new Date().getDate().toString()),
                    h: this.addStr(new Date().getHours().toString()),
                    m: this.addStr(new Date().getMinutes().toString()),
                    s: this.addStr(new Date().getSeconds().toString())
                }
            });
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel() {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
            this.toggle();
        }
    }, {
        key: 'handleConfirm',
        value: function handleConfirm() {
            if (this.props.onConfirm) {
                this.props.onConfirm(this.state.valueGroups);
            }
            this.toggle();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            if (this.refs.confirmButton && !this.refs.confirmButton.onclick) {

                this.refs.confirmButton.onclick = function (e) {
                    e.stopPropagation();
                    _this2.handleConfirm();
                };
                this.refs.cancelButton.onclick = function (e) {
                    e.stopPropagation();
                    _this2.handleCancel();
                };
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var isZh = !navigator.language || navigator.language.toLowerCase() === 'zh-cn' || navigator.language.toLowerCase() === 'zh';
            var text1 = !isZh ? 'Cancel' : '取消';
            var text2 = !isZh ? 'Finish' : '完成';
            var optionGroups = this.state.optionGroups;

            var mstyle = { position: "fixed", width: "100%", top: 0, bottom: 0, display: 'none' };
            if (this.state.open) {
                mstyle = { position: "fixed", width: "100%", top: 0, bottom: 0, display: 'block' };
            }
            return _react2.default.createElement(
                'div',
                { style: mstyle },
                _react2.default.createElement(
                    'div',
                    { style: { position: "relative", width: "100%", height: "100%" } },
                    _react2.default.createElement(
                        'div',
                        { className: 'pickerModal', style: this.state.open && styles.pickerModalActive || styles.pickerModal },
                        _react2.default.createElement(
                            'div',
                            { className: 'ui_popup_title', style: styles.ui_popup_title },
                            _react2.default.createElement(
                                'span',
                                { ref: 'cancelButton', style: styles.btn_left },
                                text1
                            ),
                            _react2.default.createElement(
                                'span',
                                { ref: 'confirmButton', style: styles.btn_right },
                                text2
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'datePicker_labels', style: styles.datePicker_labels },
                            function () {
                                var pickerArr = [];
                                for (name in optionGroups) {
                                    pickerArr.push(_react2.default.createElement(
                                        'div',
                                        { className: 'datePicker_label', style: styles.datePicker_label },
                                        _this3.mappingObj[name]
                                    ));
                                }
                                return pickerArr;
                            }()
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'ui_popup_content', style: styles.ui_popup_content },
                            function () {
                                var pickerArr = [];
                                for (name in optionGroups) {
                                    pickerArr.push(_react2.default.createElement(_Line2.default, { key: name,
                                        onChange: _this3.handleChange,
                                        dataSource: optionGroups[name],
                                        type: name
                                    }));
                                }
                                return pickerArr;
                            }()
                        )
                    )
                )
            );
        }
    }]);

    return Index;
}(_react.Component);

Index.propTypes = {
    onConfirm: _propTypes2.default.func.isRequired,
    beginYear: _propTypes2.default.number, //开始年份
    endYear: _propTypes2.default.number, //结束年份
    value: _propTypes2.default.string, //初始值  eg "2018-02-03"
    labels: _propTypes2.default.string //要显示的列 eg "year,month,day,h,m,s"
};
Index.defaultProps = {
    labels: "year,month,day",
    value: "",
    beginYear: 2000,
    endYear: 2050
};
exports.default = Index;