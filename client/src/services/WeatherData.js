import {get} from '../utils/httpUtils';
import Api from '../api/api';
class WeatherDataService {
  static getAllData(params) {
    return new Promise((resolve, reject) => {
      let apis = [Api.nowWeather, Api.weekWeather, Api.hourlyWeather, Api.lifestyle];
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
  static getAirQuality(params) {
    return new Promise((resolve, reject) => {
      let apis = [Api.nowAirquality];
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
  static getCurLocation(cord) {
    return new Promise((resolve, reject) => {
      let api = Api.findLocation;
      let newcord = cord.split(',').reverse().join(',')
      let params = {
        location: newcord,
        get_poi: '1',
        key: Api.temapkey,
      }
      get(api, params).then((res) => {
        if (res.status == '0') {
          let str1 = res.result.address_component.district;
          let str2 = res.result.address_component.city;
          let str3  = str1.split('');
          let str4  = str2.split('');
          str3.pop();
          str4.pop();
          str3 = str3.join('');
          str4 = str4.join('');
          let str5 = res.result.ad_info.province;
          resolve({
            str: `${str4}`,
            locationName: `${str2} ${str1}`,
            province: str5,
            location: cord,
          })
        } else {
          reject({error: '9999', msg: 'error'})
        }
      }, (err) => {
        reject(err);
      })
    })
  }
}

export default WeatherDataService;