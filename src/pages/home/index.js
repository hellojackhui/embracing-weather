import Taro, { Component } from '@tarojs/taro'
import {View, Canvas} from '@tarojs/components'
import MainPage from './comps/mainPage/mainPage';
import Detail from './comps/detail/detail';
import LifeStyle from './comps/lifeStyle/lifeStyle';
import Graph from './comps/graph/graph';
import Myslider from './comps/slider/slider';
import Airdetail from '../../components/AirDetail/index';
import classnames from 'classnames';
import WeatherDataService from '../../services/WeatherData';
import * as Model from '../../model/index';
import qrcode from '../../assets/about/qrcode.jpeg';
import location from '../../assets/icons/location.png';
import img from '../../assets/image/4.jpg'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import './index.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      lifeStyleModalData: {
        title: '',
        text: '',
      },
      detailVisible: false,
      weatherData: {},
      airData: {},
      weekData: {},
      hourlyData: {},
      lifeStyleData: {},
      screenWidth: 0,
      screenHeight: 0,
      dpr: 2,
    }
  }
  componentDidMount() {
    if (Object.keys(this.$router.params).length > 0) {
      let value = this.$router.params.citycode;
      let location = this.$router.params.location;
      let isDetail = this.$router.params.isDetail === 'true';
      this.getCurQuality(location, isDetail)
      this.getForcastData(location)
    } else {
      this.getLocation().then((cord) => {
        this.getCurQuality(cord, true)
        this.getForcastData(cord)
      })
    }
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

  getForcastData = (location) => {
    let params = {
      location,
    }
    return WeatherDataService.getAllData(params).then((res) => {
      let weatherData = new Model.NowWeather(res[0]);
      let weekData = new Model.WeekWeather(res[1]);
      let hourlyData = new Model.HourlyWeather(res[2]);
      let lifeStyleData = new Model.LifeStyle(res[3]);
      this.setState({
        weatherData,
        weekData,
        hourlyData,
        lifeStyleData,
      })
    });
  }

  getCurQuality = (cord, isDetail) => {
    return WeatherDataService.getCurLocation(cord).then((obj) => {
      let params = {
        location: obj.str,
      }
      return WeatherDataService.getAirQuality(params).then((res) => {
        let airData = new Model.AirQuality(res[0]);
        airData['air_location'] = isDetail ? obj.locationName : obj.locationName.split(' ')[0];
        console.log(airData);
        this.setState({
          airData,
        })
      });
    })
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
      lifeStyleModalData: data
    })
  }

  closeModal = () => {
    this.setState({
      isOpened: false,
    })
  }

  genBill = () => {
    Taro.getSystemInfo().then((res) => {
      this.setState({
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight,
        dpr: res.devicePixelRatio,
      }, () => {
        this.drawScreen();
      })
    })
  }

  getFriendlyText = (data) => {
    if (!Object.keys(data || {}).length) return;
    if (data.tmp < 5) {
      return `天有点冷，注意保暖～`;
    }
    if (tmp.cond_code == 100) {
      return `你若安好，便是晴天～`;
    }
  }

  // 将需要保存的页面写入canvas
  drawScreen = () => {
    const {screenWidth, screenHeight, dpr, weatherData, airData} = this.state;
    const canvasCtx = Taro.createCanvasContext('shareCanvas', this.$scope);
    // 设置背景
    canvasCtx.setFillStyle('#ffffff');
    canvasCtx.fillRect(0, 0, screenWidth, 700);

    canvasCtx.drawImage(img, 0, 0, screenWidth, 600);
    canvasCtx.drawImage(qrcode, 30, 610, 80, 80);

    canvasCtx.drawImage(location, (screenWidth / 2 - (((weatherData.basic.location.length) * 24) / 2)), 14, 20, 20);

    canvasCtx.setFillStyle('pink');
    canvasCtx.fillRect((screenWidth / 40), (screenHeight / 12), 50, 50);
    canvasCtx.setFillStyle('#ffffff');
    canvasCtx.setFontSize(14);
    canvasCtx.fillText(airData.air_now_city.aqi, (screenWidth / 16), (screenHeight / 9));
    canvasCtx.setFontSize(12);
    canvasCtx.fillText(airData.air_now_city.qlty, (screenWidth / 14.5), (screenHeight / 7.5));

    
    canvasCtx.setFontSize(45);this.refs;
    canvasCtx.fillText(`${weatherData.now.tmp}°`, (screenWidth / 2 - (`${weatherData.now.tmp}`.length) * 10), (screenHeight / 3));
    canvasCtx.setFontSize(25);
    canvasCtx.fillText(`${weatherData.now.cond_txt}`, (screenWidth / 2 - (`${weatherData.now.cond_txt}`.length) * 10), (screenHeight / 20) * 8);
    canvasCtx.setFontSize(18);
    canvasCtx.fillText(`${weatherData.now.wind_dir} ${weatherData.now.wind_sc}级`, (screenWidth / 2 - (`${weatherData.now.wind_dir}`.length) * 17), (screenHeight / 20) * 9);
    canvasCtx.setFontSize(18);
    canvasCtx.fillText(`${this.getFriendlyText(weatherData.now)}`, (screenWidth / 40 * 12), (screenHeight / 20) * 11);


    canvasCtx.setFontSize(16);
    canvasCtx.setFillStyle('#ffffff');
    canvasCtx.fillText(weatherData.basic.location, (screenWidth / 2 - ((weatherData.basic.location.length) * 4) / 2), 30);

    canvasCtx.setFontSize(18);
    canvasCtx.setFillStyle('#333');
    canvasCtx.fillText('万象天气-您身边的天气小管家', 140, 655);

    canvasCtx.draw();
    // 生成canvas临时路径
    this.generateUrl();
  }

  // 生成临时文件路径
  generateUrl = () => {
    let _this = this;
    let {screenHeight, screenWidth} = this.state;
    Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: screenWidth,
      height: 700,
      destWidth: 400,
      destHeight: 800,
      canvasId: 'shareCanvas',
      success: function(res) {
        _this.getSettingAuth().then(() => {
          Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function(res) {
              Taro.hideLoading();
              Taro.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000,
              });
            }
          })
        })
      },
      fail: function() {
        Taro.hideLoading();
        Taro.showToast({
          title: `保存失败`,
          icon: 'none',
          duration: 2000,
        })
      }
    })
  }

  // 获取用户权限
  getSettingAuth = () => {
    return new Promise((resolve, reject) => {
      Taro.getSetting().then((res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function() {
              return resolve();
            },
            fail: function() {
              Taro.hideLoading();
              Taro.showToast({
                title: `授权失败`,
                icon: 'none',
                duration: 2000,
              });
              return reject();
            }
          })
        } else {
          return resolve();
        }
      }, (err) => {
        reject(err)
      })
    })
  }

  render() {
    const {isOpened, lifeStyleModalData, detailVisible, weatherData, airData, weekData, lifeStyleData, hourlyData} = this.state;
    return (
      <View className={classnames("home-page")}>
        <MainPage 
          detailVisible={this.showDetailVisible} 
          weatherData={weatherData} 
          airData={airData}
          billHandler={this.genBill} />
        <Detail data={weekData} />
        <Myslider data={hourlyData} />
        <Graph data={weekData} />
        <LifeStyle detail={this.modalDetail} data={lifeStyleData}/>
        <View className="home-page-bottom">
          <Text>数据来源于和风天气平台</Text>
        </View>
        <AtModal isOpened={isOpened}>
          <AtModalHeader>{lifeStyleModalData.title}</AtModalHeader>
          <AtModalContent>
            {lifeStyleModalData.text}
          </AtModalContent>
          <AtModalAction> <Button onClick={this.closeModal}>我知道了</Button> </AtModalAction>
        </AtModal>
        <Airdetail visible={detailVisible} data={airData} onclose={this.onclose}/>
        <Canvas className="canvas" canvasId="shareCanvas" style={{'width': '100vw', 'height': '700px'}}/>
      </View>
    )
  }
}