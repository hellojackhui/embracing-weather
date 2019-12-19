import Taro, {Component} from '@tarojs/taro';
import HttpUtils from '../../../../utils/httpUtils';
import Toast from '../../../../utils/tools'
import {heweatherNowUrl, heweatherAirUrl ,heweatherkey} from '../../../../config/index'
import { View, Swiper, SwiperItem } from '@tarojs/components';
import img from '../../../../assets/image/3.jpg'
import './mainPage.scss'

export default class MainPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        weatherData: {},
        airData: {},
        setting: false,
      }
    }
    componentDidMount() {
      this.getLocation().then((location) => {
        this.getWeatherData(location)
      }).catch((err) => {
        Toast.show('none', 2000, err);
      })
    }

    getLocation = () => {
      return new Promise((resolve, reject) => {
        Taro.getLocation({
          type: 'wgs84'
        }).then((res) => {
          resolve(`${res.longitude},${res.latitude}`)
        }).catch((res) => {
          reject('获取地理位置失败')
        })
      })
    }

    getWeatherData = (location) => {
      return Promise.all([
        this.getNowWeatherData(location),
        this.getAirData(location)
      ]).then(([weatherData, airData]) => {
        this.setState({
          weatherData,
          airData,
        })
      })
    }

    getNowWeatherData = (location = 'beijing') => {
      return new Promise((resolve, reject) => {
        return HttpUtils.get(`${heweatherNowUrl}`, {
          location,
          key: heweatherkey,
        }).then((res) => {
          resolve(res['HeWeather6'][0]);
        }).catch((err) => {
          reject('获取实时天气数据有误');
        }) 
      })
    }

    getAirData = (location = 'beijing') => {
      return new Promise((resolve, reject) => {
        HttpUtils.get(`${heweatherAirUrl}`, {
          location,
          key: heweatherkey,
        }).then((res) => {
          resolve(res['HeWeather6'][0]);
        }).catch((err) => {
          reject('获取实时天气数据有误');
        })
      })
    }

    goAboutPage = () => {
      Taro.navigateTo({
        url: 'pages/about/index'
      })
    }

    render() {
      let {weatherData, airData, setting} = this.state
      let nowdata = weatherData.now
      let detail = [];
      detail.push(`${nowdata && nowdata['wind_dir'] || '北风'} ${nowdata && nowdata['wind_sc'] || 0}级`)
      detail.push(`湿度 ${nowdata && nowdata['hum']}%`)
      return (
        <View className='main-page' style={{
            backgroundImage: `url("${img}")`
        }}>
          <View className='main-page__topbar'>
            <View className='main-page__location'>
                <View className='main-page__locicon'></View>
                <Text className='main-page__loctext'>{weatherData.basic.location}</Text>
            </View>
            <View className='main-page__seticon' onClick={this.goAboutPage}></View>
            {/* <View className='main-page__screenicon'></View> */}
            {
              setting && (
                <View className='main-page__setlist'></View>
              )
            }
          </View>
          <View className='main-page__air'>
            <Text className='main-page__airnum'>{airData.air_now_city.aqi}</Text>
            <Text className='main-page__airtext'>{airData.air_now_city.qlty}</Text>
          </View>
          <View className='main-page__tips'>
            大雾预警
          </View>
          <View className='main-page__data'>
            <Text className='main-page__temprature'>{weatherData.now.tmp}</Text>
            <Text className='main-page__weathertype'>{weatherData.now.cond_txt}</Text>
            <View className='main-page__detailinfo'>
              <Swiper
                className='main-page__detailinfo'
                vertical
                autoplay
                circular
              >
                {
                  detail.map((item, index) => {
                    return (
                      <SwiperItem key={index}>
                        <View className="main-page__detailItem">{item}</View>
                      </SwiperItem>
                    )
                  })
                }
              </Swiper>
            </View>
          </View>
          <Text className='main-page__friendlytext'>hello</Text>
        </View>
      )
    }
}