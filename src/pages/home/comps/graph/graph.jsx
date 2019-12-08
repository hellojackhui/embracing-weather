import Taro, {Component} from '@tarojs/taro';
import HttpUtils from '../../../../utils/httpUtils';
import {heweatherLifestyleUrl ,heweatherkey} from '../../../../config/index'
import { View } from '@tarojs/components';
const {mock} = require('../../../../mock/mock');
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
  getLifeStyleData = (location) => {
    return HttpUtils.get(`${heweatherLifestyleUrl}`, {
      location,
      key: heweatherkey,
    }).then((res) => {
      this.setState({
        data: res['HeWeather6'][0],
      })
    }).catch((err) => {
      reject('获取生活质量数据有误');
    }) 
  }
  genGraph = (data) => {
    let main = data['HeWeather6'];
    console.log(data)
    let graph = main['daily_forecast'];
    const chart = new F2.Chart({
      id: 'graph',
    });
    chart.source(data, {
      tmp_max: {
        tickCount: 5,
        min: 0
      },
      date: {
        type: 'timeCat',
        range: [ 0, 1 ],
        tickCount: 7
      }
    });
    chart.tooltip({
      custom: true,
      showXTip: true,
      showYTip: true,
      snap: true,
      crosshairsType: 'xy',
      crosshairsStyle: {
        lineDash: [ 2 ]
      }
    });
    chart.axis('date', {
      label: function label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.line().position('date*tmp_max');
    chart.render();
  }
  render() {
    return (
      <View className="graph" id="graph">
        {
          this.genGraph(mock)
        }
      </View>
    )
  }
}