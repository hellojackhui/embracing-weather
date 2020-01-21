import Taro, { Component } from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import SearchBar from '../../components/searchbar/SearchBar';
import {cityList} from './cityCodes';
import Tag from '../../components/tag/Tag';
import { store, getStorage } from '../../utils/storage';
import WeatherDataService from '../../services/WeatherData';
import './index.scss';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello',
      type: 'his',
      currentList: [],
      historyList: [],
      cityList: cityList,
      sceneList: [],
    }
  }

  config = {
    navigationBarTitleText: '搜索'
  }

  textChange = (val) => {
    this.setState({
      text: val
    })
  }

  componentDidMount() {
    this.getLocation().then((cord) => {
      this.getCurrentList(cord);
    })
    this.getHistoryList();
  }

  getLocation = () => {
    return new Promise((resolve, reject) => {
      Taro.getLocation({
        type: 'wgs84'
      }).then((res) => {
        console.log(res);
        resolve(`${res.longitude},${res.latitude}`)
      }).catch((res) => {
        reject('获取地理位置失败')
      })
    })
  }

  getCurrentList = (cord) => {
    return WeatherDataService.getCurLocation(cord).then((obj) => {
      console.log(cord);
      let data = {
        name: `${obj.locationName.split(' ')[1]}`,
        value: `${obj.str}`,
        location: cord,
        province: obj.province,
      }
      this.setState({
        currentList: [data],
      })
    })
  }

  cancelHandler = () => {
    Taro.redirectTo({
      url: '/pages/home/index'
    })
  }

  select = (item) => {
    // 存储
    store('history', item);
    // 跳转
    Taro.reLaunch({
      url: `/pages/home/index?citycode=${item.value}&location=${item.location}&isDetail=${item.type == null || item.type !== '1'}`
    })
  }

  getHistoryList = () => {
    let historyList = getStorage('history') ? JSON.parse(getStorage('history')) : [];
    this.setState({
      historyList,
    })
  }

  render() {
    let {text, type, currentList, historyList, cityList, sceneList} = this.state;
    return (
      <View>
        <SearchBar
          val={text}
          onChange={this.textChange}
          cancelHandler={this.cancelHandler}
        />
        {
          type == 'his' && (
            <View className="search-his">
              <View className="search-his__item">
                <Text className="search-title">当前定位</Text>
                <View className="search-title__list">
                  {
                    currentList.map((item, index) => {
                      return <Tag key={`${item.name}-${index}`} value={item} onClick={this.select}>{item.name}</Tag>
                    })
                  }
                </View>
              </View>
              {
                historyList.length > 0 && (
                  <View className="search-his__item">
                    <Text className="search-title">历史记录</Text>
                    <View className="search-title__list">
                    {
                      historyList.map((item, index) => {
                        return <Tag key={`${item.name}-${index}`} isHistory={true} value={item} onClick={this.select}>{item.name}</Tag>
                      })
                    }
                  </View>
                </View>
                )
              }
              
              <View className="search-his__item">
                <Text className="search-title">热门城市</Text>
                <View className="search-title__list">
                  {
                    cityList.map((item, index) => {
                      return <Tag key={`${item.name}-${index}`} value={item} onClick={this.select}>{item.name}</Tag>
                    })
                  }
                </View>
              </View>
              {
                sceneList.length > 0 && (
                  <View className="search-his__item">
                    <Text className="search-title">热门景区</Text>
                    <View className="search-title__list">
                      {
                        sceneList.map((item, index) => {
                          return <Tag key={`${item.name}-${index}`} value={item} onClick={this.select}>{item.name}</Tag>
                        })
                      }
                    </View>
                  </View>
                )
              }
            </View>
          )
        }
      </View>
    )
  }
}