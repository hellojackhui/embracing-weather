import Taro, {Component} from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';


class AirDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  render() {
    let {data} = this.props;
    let {air_now_station} = data;
    return (
      <View className="air-detail">
        <View className="air-detail-wrap">
            <View className="air-detail-container">
              <View className="air-detail-top">
                <View className="air-detail-top__del"></View>
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