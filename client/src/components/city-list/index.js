import Taro, { Component } from '@tarojs/taro'
import {View, Text, ScrollView} from '@tarojs/components'
import PropTypes from 'prop-types'

export default class CityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      currentIndex: 0,
    }
  }

  onScroll = (e) => {
  }

  select = ({name, location}) => {
    let {onSelect} = this.props
    onSelect && onSelect(name, location)
  }

  render() {
    let {list} = this.state;
    return (
      <View className="city-list">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{'height': '150px'}}
          onScroll={this.onScroll}
        >
          {
            list.map((item) => {
              return (
                <View className="city-list__item" onClick={() => this.select(item)}>{item.name}</View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }

}

CityList.propTypes = {
  value: PropTypes.string,
  currentValue: PropTypes.string
}