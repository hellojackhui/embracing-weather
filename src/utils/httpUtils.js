import Taro from '@tarojs/taro';
import {combineUrl} from './utils';

const get = (url = '', params = {}) => {
  url = combineUrl(url, params);
  return new Promise((resolve, reject) => {
    return Taro.request({
      url,
      method: 'GET'
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

const post = (url = '', params = {}) => {
  return new Promise((resolve, reject) => {
    return Taro.request({
      url,
      method: 'POST',
      data: params,
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export default {
  get,
  post,
}