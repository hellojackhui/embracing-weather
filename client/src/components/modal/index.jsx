import Taro, {Component} from '@tarojs/taro';
import { View,Text, Button } from '@tarojs/components';
import './index.scss';
import classNames from 'classnames';

export default class Modal extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      let class1 = classNames('modal-bg', {
        'is-visible': this.props.visible,
        'is-hide': this.props.visible
      })
      const {content, visible} = this.props
      return (
        <View className={class1}>
            111
        </View>
      )
    }
}