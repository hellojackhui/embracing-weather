import Taro, {Component} from '@tarojs/taro';
import HttpUtils from '../../../../utils/httpUtils';
import {heweatherLifestyleUrl ,heweatherkey} from '../../../../config/index'
import { View } from '@tarojs/components';
const {mock} = require('../../../../mock/mock');
import { F2Canvas } from 'taro-f2'
import { fixF2 } from 'taro-f2/dist/weapp/common/f2-tool.ts'
import F2 from '@antv/f2';

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
    let graph = main['daily_forecast'];
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
    return (
      <View id="graph" style="width:100%;height:200px;background:white">
        <F2Canvas onCanvasInit={this.genGraph}></F2Canvas>
      </View>
    )
  }
}