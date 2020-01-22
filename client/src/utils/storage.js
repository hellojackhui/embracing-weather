import Taro from '@tarojs/taro';

const setStorage = (key, value) => {
  return Taro.setStorageSync(key, value);
}

const getStorage = (key) => {
  return Taro.getStorageSync(key);
}

const store = (type, value) => {
  let arr = getStorage(type) ? JSON.parse(getStorage(type)) : [];
  let nameList = arr.map((item) => item.name);
  let hasNewName = !!(nameList.filter((name) => name == value.name)).length;
  if (hasNewName) {
    let index = arr.findIndex((item) => item.name === value.name);
    arr.splice(index, 1);
    arr.unshift(value);
    setStorage(type, JSON.stringify(arr));
  } else {
    arr.unshift(value);
    setStorage(type, JSON.stringify(arr));
  }
}

export {
  setStorage,
  getStorage,
  store,
}