'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRegionById = exports.getCity = exports.getProvince = undefined;

var _region = require('./region');

var _region2 = _interopRequireDefault(_region);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取省份
var getProvince = exports.getProvince = function getProvince() {
  return _region2.default.filter(function (value) {
    return value.level === 0;
  });
};
// 获取市区
var getCity = exports.getCity = function getCity(id, level) {
  return _region2.default.filter(function (item) {
    return item.parentId === id && item.level === level + 1;
  });
};
var getRegionById = exports.getRegionById = function getRegionById(id) {
  return _region2.default.filter(function (item) {
    return item.id === id;
  });
};