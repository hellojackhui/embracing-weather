import Taro, {Component} from '@tarojs/taro';
import HttpUtils from '../../../../utils/httpUtils';
import Toast from '../../../../utils/tools'
import {heweatherLifestyleUrl ,heweatherkey} from '../../../../config/index';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import Modal from '../../../../components/modal/index';
import './lifeStyle.scss'

export default class LifeStyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        lifestyle: []
      },
    }
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
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
    let content = {
      title,
      text: item.txt
    }
    this.props.detail(content)
  }

  render() {
    let {data} = this.state;
    let {lifestyle} = data;
    return (
      <View>
        {
          lifestyle.length ? (
            <View className="lifestyle-grid">
              {
                lifestyle.map((item, index) => {
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