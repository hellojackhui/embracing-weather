import {get} from '../utils/httpUtils';
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
        console.log(data);
        resolve(data);
      }, (err) => {
        reject(err);
      })
    })
  }
}

export default WeatherDataService;