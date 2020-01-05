import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import MainPage from './comps/mainPage/mainPage';
import Detail from './comps/detail/detail';
import LifeStyle from './comps/lifeStyle/lifeStyle';
import Graph from './comps/graph/graph';
import Myslider from './comps/slider/slider';
import Airdetail from '../../components/AirDetail/index';
import classnames from 'classnames';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import './index.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      content: {
        title: '',
        text: '',
      },
      detailVisible: false,
      air_now_station: {
        pm10: '',
        pm25: '',
        no2: '',
        so2: '',
        co: '',
        o3: '',
      }
    }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(props) {
    console.log(props)
  }

  showDetailVisible = (data) => {
    this.setState({
      detailVisible: true,
    })
  }

  onclose = () => {
    this.setState({
      detailVisible: false,
    })
  }

  modalDetail = (data) => {
    this.setState({
      isOpened: true,
      content: data
    })
  }

  closeModal = () => {
    this.setState({
      isOpened: false,
    })
  }

  render() {
    const {isOpened, content, detailVisible, airdetail} = this.state;
    return (
      <View className={classnames("home-page")}>
        <MainPage detailVisible={this.showDetailVisible} />
        <Detail />
        <Myslider />
        <Graph />
        <LifeStyle detail={this.modalDetail}/>
        <View className="home-page-bottom">
          <Text>数据来源于和风天气平台</Text>
        </View>
        <AtModal isOpened={isOpened}>
          <AtModalHeader>{content.title}</AtModalHeader>
          <AtModalContent>
            {content.text}
          </AtModalContent>
          <AtModalAction> <Button onClick={this.closeModal}>我知道了</Button> </AtModalAction>
        </AtModal>
        <Airdetail visible={detailVisible} data={airdetail} onclose={this.onclose}/>
      </View>
    )
  }
}