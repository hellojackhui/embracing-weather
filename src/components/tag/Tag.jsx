import Taro, { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import classnames from 'classnames';
import './Tag.scss';


class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }

  toggleclick = () => {
    let active = this.state.active;
    this.setState({
      active: !active
    })
  }

  render() {
    let {active} = this.state;
    const {text, children, key} = this.props;
    return (
      <View className={classnames('comps-tag', {
        'comps-tag--active': active
      })} onClick={this.toggleclick} key={key}>
        {text || children}
      </View>
    )
  }
}

export default Tag;

