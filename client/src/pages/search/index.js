import Taro, { Component } from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
import SearchBar from '../../components/searchbar/SearchBar';
import {cityList} from './cityCodes';
import Tag from '../../components/tag/Tag';
import { store, getStorage, cleanStorage } from '../../utils/storage';
import {debounce} from '../../utils/tools';
import WeatherDataService from '../../services/WeatherData';
import trash from '../../assets/icons/trash.png';
import './index.scss';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      type: 'his',
      currentList: [],
      historyList: [],
      cityList: cityList,
      sceneList: [],
      searchList: [],
    }
    this.debounce = debounce(this.setrequest, 300, false)
  }

  config = {
    navigationBarTitleText: '搜索'
  }

  setrequest = (val) => {
    Taro.showLoading({
      title: '搜索中'
    })
    // request;
    Taro.cloud.callFunction({
      "name": "cityQuery",
      "data": {
        "func": "cityQuery",
        "data": {
          "value": val,
        }
      }
    }).then(res => {
      this.genListData(res.result.data);
    })
  }

  genListData = (list) => {
    let {data} = list;
    let {text} = this.state;
    let searchList = data.data.map((item) => {
      return {
        fullName: item.City_CN === item["Admin_ district_CN"] ? `${item.Province_CN}，${item.City_CN}` : `${item.Province_CN}，${item["Admin_ district_CN"]}，${item.City_CN}`,
        name: `${item.City_CN}`,
        value: item.City_ID,
        location: `${item.Longitude},${item.Latitude}`,
        type: item.City_CN === item["Admin_ district_CN"] ? '1' : '0',
      }
    })
    searchList = searchList.map((item) => {
      return {
        ...item,
        startIndex: item.fullName.indexOf(text),
      }
    })
    Taro.hideLoading();
    this.setState({
      searchList
    })
  }

  textChange = (val) => {
    this.setState({
      text: val,
      type: (val == null || val === '') ? 'his' : 'list',
      searchList: [],
    },() => {
      this.debounce(val)
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
        resolve(`${res.longitude},${res.latitude}`)
      }).catch((res) => {
        reject('获取地理位置失败')
      })
    })
  }

  cleanHistory = () => {
    this.setState({
      historyList: []
    }, () => {
      cleanStorage('history')
    })
  }

  getCurrentList = (cord) => {
    return WeatherDataService.getCurLocation(cord).then((obj) => {
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
    Taro.navigateBack({
      delta: 1,
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
    let {text, type, currentList, historyList, cityList, sceneList, searchList} = this.state;

    const listRender = searchList.map((item, index) => {
      let endIndex = item.startIndex + text.length;
      return (
        <View className="search-list__item" key={`${item.fullName}-${index}`} onClick={() => this.select(item)}>
          <Text className="search-list__txt">{`${item.fullName.substring(0, item.startIndex)}`}</Text><Text className="search-list__txt--bold">{`${item.fullName.substring(item.startIndex, endIndex)}`}</Text><Text className="search-list__txt">{`${item.fullName.substring(endIndex, item.fullName.length+1)}`}</Text>
        </View>
      )
    })

    return (
      <View className="search">
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
                    {
                      historyList.length > 0 && (
                        <Image class="search-title__icon" src={trash} onClick={this.cleanHistory}/>
                      )
                    }
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
        {
          type == 'list' && (
            <View className="search-list">
              {
                listRender
              }
              {
                searchList.length == 0 && (
                  <View className="search-list__tip">抱歉，未搜索到相关位置</View>
                )
              }
            </View>
          )
        }
      </View>
    )
  }
}