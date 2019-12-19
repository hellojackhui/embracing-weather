import Taro, { Component } from '@tarojs/taro'
import {View, Switch, Swiper, SwiperItem, Image} from '@tarojs/components'
import './index.scss';
import qrcode from '../../assets/about/qrcode.jpeg';
import qqlogo from '../../assets/about/qqlogo.jpeg';
import github from '../../assets/about/github.jpeg';
import recommend from '../../assets/about/recommend.png';
import email from '../../assets/icons/email.png';
import git from '../../assets/icons/github.png';
import qq from '../../assets/icons/qq.png';
import user from '../../assets/icons/user.png';

export default class About extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View className="about">
        <Swiper className="about-swiper" indicatorDots indicatorActiveColor={'#159ee5'} autoplay>
          <SwiperItem className="about-swiper__item">
            <Image className="about-swiper__img" src={qrcode} mode="aspectFill" />
            <Text style={{'marginTop': '10px'}}>万象天气</Text>
          </SwiperItem>
          <SwiperItem className="about-swiper__item">
            <Image className="about-swiper__img" style={{"width": "65vw" }} src={recommend} mode="aspectFill" />
            <Text style={{'marginTop': '10px'}}>小程序推广</Text>
          </SwiperItem>
          <SwiperItem className="about-swiper__item">
            <Image className="about-swiper__img" src={github} mode="aspectFill" />
            <Text style={{'marginTop': '10px'}}>万象天气</Text>
          </SwiperItem>
        </Swiper>
        <View className="about-content">
          <Text className="about-content__top">联系开发者</Text>
          <View className="about-content__item">
            <Text className="about-content__item-top">开发者</Text>
            <Text className="about-content__item-bottom">hellojackhui</Text>
            <Image className="about-content__item-img" src={user} mode="aspectFill" />
          </View>
          <View className="about-content__item">
            <Text className="about-content__item-top">通过QQ反馈</Text>
            <Text className="about-content__item-bottom">794691302</Text>
            <Image className="about-content__item-img" src={qq} mode="aspectFill" />
          </View>
          <View className="about-content__item">
            <Text className="about-content__item-top">通过email反馈</Text>
            <Text className="about-content__item-bottom">794691302@qq.com</Text>
            <Image className="about-content__item-img" src={email} mode="aspectFill" />
          </View>
          <View className="about-content__item">
            <Text className="about-content__item-top">通过github反馈</Text>
            <Text className="about-content__item-bottom">https://github.com/hellojackhui</Text>
            <Image className="about-content__item-img" src={git} mode="aspectFill" />
          </View>
        </View>
        <View className="about-bottom">
          <Text className="about-bottom-top">留言</Text>
          <Text className="about-bottom-bottom">数据来源：和风天气平台</Text>
          <Text className="about-bottom-bottom">应用简介：基于Taro框架的天气小程序</Text>
        </View>
      </View>
    )
  }
}