import Taro, {Component} from '@tarojs/taro';
import Toast from '../../../../utils/tools'
import './detail.scss'
import { View, Text, Image } from '@tarojs/components';
import {weatherIcons} from '../../../../utils/utils';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }  
  componentDidMount() {

  }  

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
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
              <Image src={weatherIcons(`${tomorrow.cond_code_d}`)} mode="aspectFit" style="width: 20px;height: 20px"/>
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
              <Image src={weatherIcons(`${aftertomorrow.cond_code_d}`)} mode="aspectFit" style="width: 20px;height: 20px"/>
            </View>
          </View>
        </View>
      </View>
    )
  }

}