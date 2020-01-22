import Taro from '@tarojs/taro';

const show = (icon, duration, title) => {
  return Taro.showToast({
    icon,
    title,
    duration,
  })
}

const debounce = (fn, wait = 300, leading = true) => {
  let timer, result;
  return (...args) => {
    if (timer) clearTimeout(timer);
    if (leading) {
      if (!timer) result = fn.apply(this, args);
      timer = setTimeout(() => timer = null, wait);
    } else {
      timer = setTimeout(() => {
        result = fn.apply(this, args);
      }, wait)
    }
    return result
  }
}

export {
  show,
  debounce,
}