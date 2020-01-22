import Taro, {Component} from '@tarojs/taro';
import './slider.scss'
import { View, Text, Image, ScrollView } from '@tarojs/components';
import {weatherIcons} from '../../../../utils/utils';
import {mock} from '../../../../mock/mock';

export default class Myslider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hourlyData: [],
    }
  }
  componentDidMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      hourlyData: nextProps.data.hourly,
    })
  }
  render() {
    const {hourlyData} = this.state;
    return (
      <View className="slider">
        <View className="slider-scrollview">
          {
            hourlyData.map((item, index) => {
              return (
                <View key={`${item.cond_code}-${index}`} className="slider-scrollview__item" style={{height: '150px'}}>
                  <Text className="slider-scrollview__time">{item.time}</Text>
                  <Image className="slider-scrollview__img" src={weatherIcons(`${item.cond_code}`)}/>
                  <Text className="slider-scrollview__title">{`${item.tmp}°`}</Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}