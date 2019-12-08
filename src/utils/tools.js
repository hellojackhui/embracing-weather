import Taro from '@tarojs/taro';

const show = (icon, duration, title) => {
  return Taro.showToast({
    icon,
    title,
    duration,
  })
}


export default {
  show,
}