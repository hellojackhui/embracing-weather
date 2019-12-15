import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import MainPage from './comps/mainPage/mainPage';
import Detail from './comps/detail/detail';
import LifeStyle from './comps/lifeStyle/lifeStyle';
import Graph from './comps/graph/graph';
import Myslider from './comps/slider/slider';
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
      }
    }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(props) {
    console.log(props)
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
    const {isOpened, content} = this.state;
    return (
      <View className="home-page">
        <MainPage />
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
      </View>
    )
  }
}