import Taro, {Component} from '@tarojs/taro';
import { View, Swiper, SwiperItem} from '@tarojs/components';
import classnames from 'classnames';
import img from '../../../../assets/image/3.jpg'
import './mainPage.scss'

export default class MainPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        weatherData: {},
        airData: {},
        setting: false,
        optionsVisible: false,
      }
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        weatherData: nextProps.weatherData,
        airData: nextProps.airData,
      })
    }

    // 跳转到关于页面
    goAboutPage = () => {
      Taro.navigateTo({
        url: '/pages/about/index'
      })
    }

    // 触发截屏分享
    getScreenShot = () => {
      Taro.showLoading({
        title: '加载中'
      });
      this.props.billHandler();
    }

    // 切换设置内容显示
    toggleSettings = () => {
      let {optionsVisible} = this.state;
      this.setState({
        optionsVisible: !optionsVisible,
      })
    }

    // 显示空气质量详情
    showAirDetail = () => {
      this.props.detailVisible()
    }

    // 跳转到搜索页面
    toSearch = () => {
      Taro.navigateTo({
        url: '/pages/search/index'
      })
    }

    getFriendlyText = (data) => {
      if (!Object.keys(data || {}).length) return;
      console.log(data);
      if (data.tmp <= 5) {
        return `天有点冷，注意保暖～`;
      }
      if (data.cond_code == 100) {
        return `你若安好，便是晴天～`;
      }
    }

    render() {
      let {weatherData, airData, setting, optionsVisible} = this.state
      let nowdata = weatherData.now
      let detail = [];
      detail.push(`${nowdata && nowdata['wind_dir'] || '北风'} ${nowdata && nowdata['wind_sc'] || 0}级`)
      detail.push(`湿度 ${nowdata && nowdata['hum']}%`)
      return (
        <View className='main-page' style={{
            backgroundImage: `url("${img}")`
        }}>
          <View className='main-page__topbar'>
            <View className='main-page__location' onClick={this.toSearch}>
                <View className='main-page__locicon'></View>
                <Text className='main-page__loctext'>{`${airData.air_location}`}</Text>
            </View>
            <View className='main-page__seticon' onClick={this.toggleSettings}></View>
            <View className={classnames('main-page__settings', {
              'is-visible': optionsVisible,
            })}>
              <View className='main-page__settings__item' onClick={this.goAboutPage}></View>
              <View className='main-page__settings__item' onClick={this.getScreenShot}></View>
            </View>
            {/* <View className='main-page__screenicon'></View> */}
            {
              setting && (
                <View className='main-page__setlist'></View>
              )
            }
          </View>
          <View className='main-page__air' onTouchStart={this.showAirDetail}>
            <Text className='main-page__airnum'>{airData.air_now_city.aqi}</Text>
            <Text className='main-page__airtext'>{airData.air_now_city.qlty}</Text>
          </View>
          {/* <View className='main-page__tips'>
            大雾预警
          </View> */}
          <View className='main-page__data'>
            <Text className='main-page__temprature'>{weatherData.now.tmp}</Text>
            <Text className='main-page__weathertype'>{weatherData.now.cond_txt}</Text>
            <View className='main-page__detailinfo'>
              <Swiper
                className='main-page__detailinfo'
                vertical
                autoplay
                circular
              >
                {
                  detail.map((item, index) => {
                    return (
                      <SwiperItem key={index}>
                        <View className="main-page__detailItem">{item}</View>
                      </SwiperItem>
                    )
                  })
                }
              </Swiper>
            </View>
          </View>
          <Text className='main-page__friendlytext'>{this.getFriendlyText(nowdata)}</Text>
        </View>
      )
    }
}