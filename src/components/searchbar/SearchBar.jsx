import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Input} from '@tarojs/components'
import searchicon from '../../assets/icons/search.png';
import './SearchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
    this.inputref = null;
  }
  
  onChangeHandler = (e) => {
    let val = e.target.value.trim();
    let {onChange} = this.props;
    onChange && onChange(val);
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      text: nextprops.val
    })
  }

  render() {
    const {cancelText, placeholder, cancelHandler} = this.props;
    const {text} = this.state;
    return (
      <View className="comps-search-bar">
        <View className="comps-search-bar__wrap">
          <View className="comps-search-bar__wrap-input">
            <Image className="comps-search-bar__img" src={searchicon} />
            <Input
              className="comps-search-bar__input"
              value={text}
              ref={(ref) => this.inputref = ref}
              onChange={this.onChangeHandler}
              placeholder={placeholder}
            />
          </View>
        </View>
        <View className="comps-search-bar__cancel" onClick={cancelHandler}>
          <Text>{cancelText}</Text>
        </View>
      </View>
    )
  }
}

SearchBar.defaultProps = {
  cancelText: '取消',
  placeholder: '请输入',
  onChange: () => {},
}

export default SearchBar;