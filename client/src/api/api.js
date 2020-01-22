class Api {
  // 实况天气   
  static nowWeather = 'https://free-api.heweather.net/s6/weather/now';
  // 3-10天预报
  static weekWeather = 'https://free-api.heweather.net/s6/weather/forecast';
  // 逐小时预报
  static hourlyWeather = 'https://free-api.heweather.net/s6/weather/hourly';
  // 生活指数
  static lifestyle = 'https://free-api.heweather.net/s6/weather/lifestyle';
  // 空气质量实况
  static nowAirquality = 'https://free-api.heweather.net/s6/air/now';
  // 和风天气key
  static heweatherkey = 'ddad90bf7c654beb8e508cfa0a275010';
  // 腾讯地图key
  static temapkey = 'KYTBZ-VXGWV-EAWPK-UOHPE-DDT76-3XBA4';
  // 腾讯地图获取地址
  static findLocation = 'https://apis.map.qq.com/ws/geocoder/v1/';
  // https://apis.map.qq.com/ws/geocoder/v1/?location=39.984154,116.307490&get_poi=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77
}

export default Api;