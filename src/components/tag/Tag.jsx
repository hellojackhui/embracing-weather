import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import classnames from 'classnames';
import './Tag.scss';


class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }

  toggleclick = (value) => {
    let active = this.state.active;
    // this.setState({
    //   active: !active
    // })
    if (this.props.onClick) [
      this.props.onClick(value)
    ]
  }

  render() {
    let {active} = this.state;
    const {text, children, key, icon, value} = this.props;
    return (
      <View className={classnames('comps-tag', {
        'comps-tag--active': active,
      })}  onClick={() => this.toggleclick(value)} key={key}>
        {
          icon != null && (
            <Image style={{'width': '20px', 'height': '20px'}} src={require(`../../assets/icons/location.png`)}></Image>
          )
        }
        {text || children}
      </View>
    )
  }
}

export default Tag;

