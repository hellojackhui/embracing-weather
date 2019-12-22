import Taro, {
  Component
} from '@tarojs/taro';
import {
  Text,
  Input,
  View,
  Image
} from '@tarojs/components';
import search from '../../assets/icons/search.png';
import PropTypes from 'prop-types';
import './index.scss';
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '123',
    }
  }

  inputChange = (val) => {
    let {onChange} = this.props
    this.setState({
      text: val,
    }, () => {
      onChange && onChange(val)
    })   
  }

  render() {
    let {cancelVisible, cancelText, placeholder, onToggle} = this.props;
    let state = this.state;
    return (
      <View className="comps-search-bar">
        <View className="comps-search-bar__wrap">
          <Image src={search} className="comps-search-bar__img"/>
          <Input 
            className="comps-search-bar__input" 
            value={state.text}
            placeholder={placeholder}
            onConfirm={this.inputChange}
            onFocus={() => onToggle('list')}
            onBlur={() => onToggle('his')}
            />
        </View>
        {
          cancelVisible ? (
            <View className="comps-search-bar__del">
              <Text>{cancelText}</Text>
            </View>
          ) : null
        }
      </View>
    )
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  cancelVisible: PropTypes.bool,
  cancelText: PropTypes.string,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
}

SearchBar.defaultProps = {
  placeholder: '搜索城市、街区、县等',
  cancelText: '取消',
  cancelVisible: true,
  onChange: () => {},
  onToggle: () => {},
}

export default SearchBar;