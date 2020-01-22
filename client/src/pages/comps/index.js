import Taro, { Component } from '@tarojs/taro'
import {View, Switch, Progress} from '@tarojs/components'
import './index.scss';
import SearchBar from '../../components/search-bar/index';

export default class Comps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'list'
    }
  }
  
  componentDidMount() {
  }

  getListData = () => {
    console.log('getListData')
  }

  onToggle = (type) => {
    console.log(type);
    this.setState({
      type,
    })
  }

  render() {
    return (
      <View>
        <SearchBar 
          onChange={this.getListData}
          onFocus={this.onToggle}
        />
      </View>
    )
  }
}