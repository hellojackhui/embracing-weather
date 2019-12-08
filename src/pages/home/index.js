import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import MainPage from './comps/mainPage/mainPage';
import Detail from './comps/detail/detail';
import LifeStyle from './comps/lifeStyle/lifeStyle';
import Graph from './comps/graph/graph';
import './index.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentWillReceiveProps(props) {
    console.log(props)
  }

  render() {
    return (
      <View className="home-page">
        <MainPage />
        <Detail />
        <LifeStyle />
        <Graph />
      </View>
    )
  }
}