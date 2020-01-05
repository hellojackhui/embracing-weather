import Taro, {Component} from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import classnames from 'classnames';
import closeicon from '../../assets/icons/close.png';
import detailimg from '../../assets/image/3.jpg';

class AirDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  componentWillReceiveProps(nextprops) {
    console.log(nextprops)
    this.setState({
      visible: nextprops.visible
    })
  }

  onclose = () => {
    let {onclose} = this.props;
    onclose && onclose();
  }

  render() {
    let {data} = this.props;
    let {visible} = this.state;
    let {air_now_station} = data;
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
                  <Text className="air-detail-top__num">41</Text>
                  <Text className="air-detail-top__type">优</Text>
                </View>
              </View>
              <View className="air-detail-bottom">
                <View className="air-detail-bottom__item">
                  <Text>pm10</Text>
                  <Text>{air_now_station.pm10}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text>pm25</Text>
                  <Text>{air_now_station.pm25}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text>no2</Text>
                  <Text>{air_now_station.no2}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text>so2</Text>
                  <Text>{air_now_station.so2}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text>co</Text>
                  <Text>{air_now_station.co}</Text>
                </View>
                <View className="air-detail-bottom__item">
                  <Text>o3</Text>
                  <Text>{air_now_station.o3}</Text>
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
    air_now_station: {
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