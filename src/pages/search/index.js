import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import SearchBar from '../../components/search-bar/index';
import CityList from '../../components/city-list/index';
import { AtTag } from 'taro-ui'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello',
      currentList: [],
      historyList: [],
      cityList: [],
      sceneList: [],
    }
  }

  config = {
    navigationBarTitleText: '搜索'
  }

  getListData = (val) => {
    console.log(val)
  }

  searchListToggle = (type) => {
    console.log(type);
    this.setState({
      type,
    })
  }

  onSelect = (name, location) => {
    console.log(name, location)
  }

  render() {
    let {cityList, historyList, currentList, sceneList} = this.state;
    return (
      <View className="search">
        <SearchBar
          onChange={this.getListData}
          onFocus={this.onToggle}
          onToggle={this.searchListToggle}
        />
        {
          type == 'list' && (
            <View className="search-list">
              <CityList 
                onSelect={this.onSelect}
              />
            </View>
          )
        }
        {
          type == 'his' && (
            <View className="search-his">
              <View className="search-his__cur">
                <Text className="search-title">当前定位</Text>
                <View className="search-title__list">
                  {
                    historyList.map((item) => {
                      <AtTag>{item}</AtTag>
                    })
                  }
                </View>
              </View>
              <View className="search-his__history">
                <Text className="search-title">历史记录</Text>
                <View className="search-title__list">
                  {
                    currentList.map((item) => {
                      <AtTag>{item}</AtTag>
                    })
                  }
                </View>
              </View>
              <View className="search-his__hot-city">
                <Text className="search-title">热门城市</Text>
                <View className="search-title__list">
                  {
                    cityList.map((item) => {
                      <AtTag>{item}</AtTag>
                    })
                  }
                </View>
              </View>
              <View className="search-his__hot-scene">
                <Text className="search-title">热门景区</Text>
                <View className="search-title__list">
                  {
                    sceneList.map((item) => {
                      <AtTag>{item}</AtTag>
                    })
                  }
                </View>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}