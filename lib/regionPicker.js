'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Line = require('./Line');

var _Line2 = _interopRequireDefault(_Line);

var _regionUtils = require('./regionUtils');

var _style = require('./style');

var styles = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by xiangguo .
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * time:2018/2/1 0001.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * email:413401168@qq.com.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * use:auto...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.handleChange = function (value, type) {
            if (type === 'province') {
                _this.setState({
                    cityData: (0, _regionUtils.getCity)(value.id, 0),
                    regionData: (0, _regionUtils.getCity)((0, _regionUtils.getCity)(value.id, 0)[0].id, 1)
                });
            } else if (type === 'city') {
                _this.setState({
                    regionData: (0, _regionUtils.getCity)(value.id, 1)
                });
            }
        };

        _this.toggle = function () {
            _this.setState({
                open: !_this.state.open
            });
        };

        _this.state = {
            open: false,
            provinceData: (0, _regionUtils.getProvince)(),
            cityData: (0, _regionUtils.getCity)(11, 0),
            regionData: (0, _regionUtils.getCity)(1101, 1)
        };
        _this.mappingObj = {
            province: '省',
            city: '市',
            region: "区"
        };
        return _this;
    }

    _createClass(Index, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.body.onselectstart = document.body.oncontextmenu = function () {
                return false;
            };
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

            var _state = this.state,
                provinceData = _state.provinceData,
                cityData = _state.cityData,
                regionData = _state.regionData;

            var isZh = !navigator.language || navigator.language.toLowerCase() === 'zh-cn' || navigator.language.toLowerCase() === 'zh';
            var text1 = !isZh ? 'Cancel' : '取消';
            var text2 = !isZh ? 'Finish' : '完成';
            var optionGroups = this.props.optionGroups;

            var mstyle = { position: "fixed", width: "100%", height: '100%', top: 0, bottom: 0, display: 'none' };
            if (this.state.open) {
                mstyle = { position: "fixed", width: "100%", height: '100%', top: 0, bottom: 0, display: 'block' };
            }
            return _react2.default.createElement(
                'div',
                { style: mstyle, id: 'picker' },
                _react2.default.createElement(
                    'div',
                    { style: { position: "relative", width: "100%", height: "100%" } },
                    _react2.default.createElement(
                        'div',
                        { className: 'pickerModal',
                            style: this.state.open && styles.pickerModalActive || styles.pickerModal },
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
                            optionGroups.map(function (item) {
                                return _react2.default.createElement(
                                    'div',
                                    { className: 'datePicker_label',
                                        style: styles.datePicker_label },
                                    _this3.mappingObj[item]
                                );
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'ui_popup_content', style: styles.ui_popup_content },
                            _react2.default.createElement(_Line2.default, { dataSource: provinceData,
                                labelProp: 'name',
                                onChange: function onChange(value) {
                                    _this3.handleChange(value, 'province');
                                } }),
                            _react2.default.createElement(_Line2.default, { dataSource: cityData,
                                labelProp: 'name',
                                onChange: function onChange(value) {
                                    _this3.handleChange(value, 'city');
                                } }),
                            _react2.default.createElement(_Line2.default, { dataSource: regionData,
                                labelProp: 'name',
                                onChange: function onChange(value) {
                                    _this3.handleChange(value, 'region');
                                } })
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