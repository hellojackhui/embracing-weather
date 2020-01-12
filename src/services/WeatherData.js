import {get} from '../utils/httpUtils';
import Api from '../api/api';
class WeatherDataService {
  static getAllData(params) {
    return new Promise((resolve, reject) => {
      let apis = [Api.nowWeather, Api.weekWeather, Api.hourlyWeather, Api.lifestyle, Api.nowAirquality];
      let reqMap = apis.map((item) => {
        let reqBody = Object.assign({}, params, {
          key: Api.heweatherkey
        })
        return get(item, reqBody)
      })
      Promise.all(reqMap).then((data) => {
        let formatData = data.map((item) => item.HeWeather6[0]);
        resolve(formatData);
      }, (err) => {
        reject(err);
      })
    })
  }
}

export default WeatherDataService;