import regionData from './region'
// 获取省份
export const getProvince = () => regionData.filter(value => value.level === 0);
// 获取市区
export const getCity = (id, level) => regionData.filter(item => item.parentId === id && item.level === (level + 1));
export const getRegionById = id => regionData.filter(item => item.id === id);