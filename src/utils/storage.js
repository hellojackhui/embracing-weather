import Taro from '@tarojs/taro';

const setStorage = (key, value) => {
  return Taro.setStorageSync(key, value);
}

const getStorage = (key) => {
  return Taro.getStorageSync(key);
}

export default {
  setStorage,
  getStorage,
}