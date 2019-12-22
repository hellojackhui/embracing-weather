import Taro, {Component} from '@tarojs/taro';
import './slider.scss'
import { View, Text, Image, ScrollView } from '@tarojs/components';
import cloud from '../../../../assets/icons/duoyun.png';
import {mock} from '../../../../mock/mock';

export default class Myslider extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    
  }
  render() {
    let main = mock['HeWeather6'][0];
    let graph = main['hourly'].slice(0,14);
    return (
      <View className="slider">
        <View className="slider-scrollview">
          {
            graph.map((item, index) => {
              return (
                <View key={`${item.cloud}-${index}`} className="slider-scrollview__item" style={{height: '150px'}}>
                  <Text className="slider-scrollview__time">{(item.time).substr(6)}</Text>
                  <Image className="slider-scrollview__img" src={cloud}/>
                  <Text className="slider-scrollview__title">{item.tmp}</Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}