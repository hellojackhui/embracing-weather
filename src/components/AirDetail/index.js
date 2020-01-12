import Taro, {Component} from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import classnames from 'classnames';
import closeicon from '../../assets/icons/close.png';
import detailimg from '../../assets/image/3.jpg';
import './index.scss';

class AirDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: {
        air_now_city: {},
      }
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      visible: nextprops.visible,
      data: nextprops.data,
    })
  }

  onclose = () => {
    let {onclose} = this.props;
    onclose && onclose();
  }

  render() {
    let {visible, data} = this.state;
    let {air_now_city} = data;
    return (
      <View className={classnames('air-detail', {
        'is-shadow': visible
      })} >
        <View className={classnames("air-detail-wrap", {
          'is-visible': visible
        })}>
            <View className="air-detail-container">
              <View className="air-detail-top">
                <Image className="air-detail-top__img" src={detailimg} mode="scaleToFill" />
                <Image className="air-detail-top__del" src={closeicon} onClick={this.onclose}/>
                <View className="air-detail-top__wrap">
                  <Text className="air-detail-top__title">空气质量指数</Text>
                  <Text className="air-detail-top__num">{air_now_city.aqi}</Text>
                  <Text className="air-detail-top__type">{air_now_city.qlty}</Text>
                </View>
              </View>
              <View className="air-detail-bottom">
                <View className="air-detail-bottom__item">
                  <Text className="air-detail-bottom__title">pm10</Text>
                  <Text className="air-detail-bottom__txt">{air_now_city.pm10}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text className="air-detail-bottom__title">pm25</Text>
                  <Text className="air-detail-bottom__txt">{air_now_city.pm25}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text className="air-detail-bottom__title">no2</Text>
                  <Text className="air-detail-bottom__txt">{air_now_city.no2}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text className="air-detail-bottom__title">so2</Text>
                  <Text className="air-detail-bottom__txt">{air_now_city.so2}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text className="air-detail-bottom__title">co</Text>
                  <Text className="air-detail-bottom__txt">{air_now_city.co}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text className="air-detail-bottom__title">o3</Text>
                  <Text className="air-detail-bottom__txt">{air_now_city.o3}</Text>
                </View>
              </View>
            </View>
        </View>
      </View>
    )
  }
}

AirDetail.defaultProps = {
  data: {
    air_now_city: {
      pm10: '',
      pm25: '',
      no2: '',
      so2: '',
      co: '',
      o3: '',
    }
  },
  visible: false,
}

export default AirDetail;