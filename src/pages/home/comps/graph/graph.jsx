import Taro, {Component} from '@tarojs/taro';
import HttpUtils from '../../../../utils/httpUtils';
import {heweatherLifestyleUrl ,heweatherkey} from '../../../../config/index'
import { View } from '@tarojs/components';
const {mock} = require('../../../../mock/mock');
import cloud from '../../../../assets/icons/duoyun.png';
import { F2Canvas } from 'taro-f2'
import { fixF2 } from 'taro-f2/dist/weapp/common/f2-tool.ts'
import F2 from '@antv/f2';
import './graph.scss';

export default class Graph extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.getLocation().then((location) => {
    //   this.getGraphData(location)
    // this.genGraph(mock)
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
  // getLifeStyleData = (location) => {
  //   return HttpUtils.get(`${heweatherLifestyleUrl}`, {
  //     location,
  //     key: heweatherkey,
  //   }).then((res) => {
  //     this.setState({
  //       data: res['HeWeather6'][0],
  //     })
  //   }).catch((err) => {
  //     reject('获取生活质量数据有误');
  //   }) 
  // }
  genGraph = (canvas, width, height) => {
    fixF2(F2);
    let main = mock['HeWeather6'][0];
    let graph = main['daily_forecast'].slice(0, 7);
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(graph, {
      date: {
        range: [0, 1],
        tickCount: 7
      },
      tmp_max: {
        tickCount: 5,
      }
    });
    chart.line().position('date*tmp_max')
    chart.render();
  }
  render() {
    let main = mock['HeWeather6'][0];
    let graph = main['daily_forecast'].slice(0, 7);
    return (
      <View className="graph">
        <View className="graph__top">
          {
            graph.map((item, index) => {
              return (
                <View key={`${item.tmp_max}-${index}`} className="graph__top-item">
                  <Text className="graph__top-txt">{index == 0 ? '昨天' : index == 1 ? '今天' : item.date}</Text>
                  <Text className="graph__top-title">{item.cond_txt_d}</Text>
                  <Image className="graph__top-img" src={cloud} />
                </View>
              )
            })
          }
        </View>
        <View id="graph" style="width:100%;height:200px;background:white">
          <F2Canvas onCanvasInit={this.genGraph}></F2Canvas>
        </View>
        <View className="graph__bottom">
          {
            graph.map((item, index) => {
              return (
                <View key={`${item.tmp_max}-${index}`} className="graph__bottom-item">
                  <Image className="graph__bottom-img" src={cloud} />
                  <Text className="graph__bottom-title">{item.cond_txt_n}</Text>
                  <View className="graph__bottom-wrap">
                    <Text className="graph__bottom-txt is-top">{item.wind_dir}</Text>
                    <Text className="graph__bottom-txt">{item.wind_sc}级</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}