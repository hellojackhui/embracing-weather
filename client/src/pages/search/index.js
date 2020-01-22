import Taro, { Component } from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import SearchBar from '../../components/searchbar/SearchBar';
import {cityList} from './cityCodes';
import Tag from '../../components/tag/Tag';
import { store, getStorage } from '../../utils/storage';
import {debounce} from '../../utils/tools';
import WeatherDataService from '../../services/WeatherData';
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
    this.debounce = debounce(this.setrequest, 300, true)
  }

  config = {
    navigationBarTitleText: '搜索'
  }

  setrequest = (val) => {
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
    let searchList = data.map((item) => {
      return {
        name: item.City_CN === item["Admin_ district_CN"] ? `${item.Province_CN}-${item.City_CN}` : `${item.Province_CN}-${item["Admin_ district_CN"]}-${item.City_CN}`,
        value: item.City_ID,
        location: `${item.Longitude},${item.Latitude}`,
        type: '0',
      }
    })
    searchList = searchList.map((item) => {
      return {
        ...item,
        startIndex: item.name.indexOf(text),
      }
    })
    console.log(searchList);
    this.setState({
      searchList
    })
  }

  // listRender = () => {
  //   let {searchList, text} = this.state;
  //   let renderList = searchList.map((item) => {
  //     let endIndex = startIndex + text.length;
  //     return (
  //       <View className="search-list__item">
  //         <Text>{`${item.name.substr(0, item.startIndex)}`}</Text><Text>{`${item.name.substr(item.startIndex, endIndex)}`}</Text><Text>{`${item.name.substr(endIndex, item.name.length)}`}</Text>
  //       </View>
  //     )
  //   })
  //   return renderList;
  // }

  textChange = (val) => {
    this.setState({
      text: val,
      type: (val == null || val === '') ? 'his' : 'list',
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
        <View className="search-list__item" key={`${item.name}-${index}`}>
          <Text>{`${item.name.substring(0, item.startIndex)}`}</Text><Text>{`${item.name.substring(item.startIndex, endIndex)}`}</Text><Text>{`${item.name.substring(endIndex, item.name.length+1)}`}</Text>
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
            </View>
          )
        }
      </View>
    )
  }
}