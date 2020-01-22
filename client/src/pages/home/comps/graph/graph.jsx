import Taro, {Component} from '@tarojs/taro';
import { View } from '@tarojs/components';
const {mock} = require('../../../../mock/mock');
import { F2Canvas } from 'taro-f2'
import {weatherIcons} from '../../../../utils/utils';
import { fixF2 } from 'taro-f2/dist/weapp/common/f2-tool.ts'
import F2 from '@antv/f2';
import './graph.scss';

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        daily_forecast: [],
      }
    }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    })
  }

  genGraph = (canvas, width, height) => {
    fixF2(F2);
    let graph = this.state.data.daily_forecast;
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
    let graph = this.state.data.daily_forecast;
    return (
      <View className="graph">
        <View className="graph__top">
          {
            graph.map((item, index) => {
              return (
                <View key={`${item.tmp_max}-${index}`} className="graph__top-item">
                  <Text className="graph__top-txt">{index == 0 ? '昨天' : index == 1 ? '今天' : item.date}</Text>
                  <Text className="graph__top-title">{item.cond_txt_d}</Text>
                  <Image className="graph__top-img" src={weatherIcons(`${item.cond_code_d}`)} />
                </View>
              )
            })
          }
        </View>
        {/* <View id="graph" style="width:100%;height:200px;background:white">
          {
            graph.length > 0 && (
              <F2Canvas onCanvasInit={this.genGraph}></F2Canvas>
            )
          }
        </View> */}
        <View className="graph__bottom">
          {
            graph.map((item, index) => {
              return (
                <View key={`${item.tmp_max}-${index}`} className="graph__bottom-item">
                  <Image className="graph__bottom-img" src={weatherIcons(`${item.cond_code_n}`)} />
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