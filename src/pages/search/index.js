import Taro, { Component } from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import SearchBar from '../../components/searchbar/SearchBar';
import Tag from '../../components/tag/Tag';
import './index.scss';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello',
      type: 'his',
      currentList: [{
        name: 'xian'
      },{
        name: 'xian'
      },{
        name: 'xian'
      },{
        name: 'xian'
      },{
        name: 'xian'
      },{
        name: 'xian'
      },{
        name: 'xian'
      }],
      historyList: [{
        name: 'xian'
      }],
      cityList: [{
        name: 'xian'
      }],
      sceneList: [{
        name: 'xian'
      }],
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

  cancelHandler = () => {
    Taro.redirectTo({
      url: '/pages/home/index'
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
                    historyList.map((item, index) => {
                      return <Tag key={`${item.name}-${index}`}>{item.name}</Tag>
                    })
                  }
                </View>
              </View>
              <View className="search-his__item">
                <Text className="search-title">历史记录</Text>
                <View className="search-title__list">
                  {
                    currentList.map((item, index) => {
                      return <Tag key={`${item.name}-${index}`}>{item.name}</Tag>
                    })
                  }
                </View>
              </View>
              <View className="search-his__item">
                <Text className="search-title">热门城市</Text>
                <View className="search-title__list">
                  {
                    cityList.map((item, index) => {
                      return <Tag key={`${item.name}-${index}`}>{item.name}</Tag>
                    })
                  }
                </View>
              </View>
              <View className="search-his__item">
                <Text className="search-title">热门景区</Text>
                <View className="search-title__list">
                  {
                    sceneList.map((item, index) => {
                      return <Tag key={`${item.name}-${index}`}>{item.name}</Tag>
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