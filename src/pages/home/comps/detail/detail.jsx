import Taro, {Component} from '@tarojs/taro';
import HttpUtils from '../../../../utils/httpUtils';
import Toast from '../../../../utils/tools'
import {heweatherForecastUrl, heweatherkey} from '../../../../config/index'
import './detail.scss'
import { View, Text, Image } from '@tarojs/components';
import cloud from '../../../../assets/icons/duoyun.png';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }  
  componentDidMount() {
    this.getLocation().then((location) => {
      this.getGridForcastData(location)
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
  getGridForcastData = (location) => {
    return HttpUtils.get(`${heweatherForecastUrl}`, {
      location,
      key: heweatherkey,
    }).then((res) => {
      this.setState({
        data: res['HeWeather6'][0],
      })
    }).catch((err) => {
      reject('获取实时天气数据有误');
    }) 
  }

  render() {
    let {data} = this.state;
    let tomorrow = Object.keys(data).length ? data['daily_forecast'][0] : {};
    let aftertomorrow = Object.keys(data).length ? data['daily_forecast'][1] : {};
    return (
      <View className="detail">
        <View className="detail__item">
          <View className="detail__item-wrapper">
            <View className="detail__item-top">
              <Text className="detail__item-left">明天</Text>
              <Text className="detail__item-right">{`${tomorrow['tmp_min']}/${tomorrow['tmp_max']}°C`}</Text>
            </View>
            <View className="detail__item-bottom">
              <Text className="detail__item-left">{tomorrow['cond_txt_n'] == tomorrow['cond_txt_d'] ? `${tomorrow['cond_txt_n']}` : `${tomorrow['cond_txt_d']}转${tomorrow['cond_txt_n']}`}</Text>
              <Image src={`${cloud}`} mode="aspectFit" style="width: 20px;height: 20px"/>
            </View>
          </View>
        </View>
        <View className="detail__item">
          <View className="detail__item-wrapper">
            <View className="detail__item-top">
              <Text className="detail__item-left">后天</Text>
              <Text className="detail__item-right">{`${aftertomorrow['tmp_min']}/${aftertomorrow['tmp_max']}°C`}</Text>
            </View>
            <View className="detail__item-bottom">
              <Text className="detail__item-left">{aftertomorrow['cond_txt_n'] == aftertomorrow['cond_txt_d'] ? `${aftertomorrow['cond_txt_n']}` : `${aftertomorrow['cond_txt_d']}转${aftertomorrow['cond_txt_n']}`}</Text>
              <Image src={`${cloud}`} mode="aspectFit" style="width: 20px;height: 20px"/>
            </View>
          </View>
        </View>
      </View>
    )
  }

}