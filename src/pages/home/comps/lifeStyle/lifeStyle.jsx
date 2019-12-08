import Taro, {Component} from '@tarojs/taro';
import HttpUtils from '../../../../utils/httpUtils';
import Toast from '../../../../utils/tools'
import {heweatherLifestyleUrl ,heweatherkey} from '../../../../config/index'
import { View, Swiper, SwiperItem } from '@tarojs/components';
import './lifeStyle.scss'

export default class LifeStyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.getLocation().then((location) => {
      this.getLifeStyleData(location)
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

  getLifeStyleData = (location) => {
    return HttpUtils.get(`${heweatherLifestyleUrl}`, {
      location,
      key: heweatherkey,
    }).then((res) => {
      this.setState({
        data: res['HeWeather6'][0],
      })
    }).catch((err) => {
      reject('获取生活质量数据有误');
    }) 
  }

  typeTotext = (type) => {
    const typeEnum = {
      'comf': '舒适度',
      'drsg': '穿衣',
      'flu': '感冒',
      'sport': '运动',
      'trav': '旅游',
      'uv': '紫外线强度',
      'cw': '洗车',
      'air': '污染扩散',
    }
    return typeEnum[type]
  }

  getImg = (type) => {
    const typeEnum = {
      'comf': require('../../../../assets/style/happy.png'),
      'drsg': require('../../../../assets/style/clothes.png'),
      'flu': require('../../../../assets/style/medicine.png'),
      'sport': require('../../../../assets/style/sports.png'),
      'trav': require('../../../../assets/style/travel.png'),
      'uv': require('../../../../assets/style/sun.png'),
      'cw': require('../../../../assets/style/car.png'),
      'air': require('../../../../assets/style/air.png'),
    }
    return typeEnum[type]
  }

  detail = (item) => {
    let title = this.typeTotext(item.type)
    Taro.showModal({
      title: `${title}指数`,
      content: `${item.txt}`
    })
  }

  render() {
    let {data} = this.state;
    let lifestyleData = Object.keys(data).length ? data['lifestyle'] : {}
    return (
      <View>
        {
          Object.keys(data).length ? (
            <View className="lifestyle-grid">
              {
                lifestyleData.map((item, index) => {
                  return (
                    <View key={`${item.type}-${index}`} className="lifestyle-grid__item" onClick={() =>this.detail(item)}>
                      <Image src={this.getImg(item.type)} mode="aspectFill" style="width: 30px;height: 30px;margin-bottom: 10px"/>
                      <Text className="lifestyle-grid__brf">{item.brf}</Text>
                      <Text className="lifestyle-grid__title">{this.typeTotext(item.type)}</Text>
                    </View>
                  )
                })
              }
            </View>
          ) : null
        }
      </View>
    )
  }

}