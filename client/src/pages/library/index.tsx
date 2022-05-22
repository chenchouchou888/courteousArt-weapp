import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import { NavBar, Skeleton} from '@antmjs/vantui';

export default class Index extends Component {

  
  onClickLeft=()=> {
    Taro.showToast({
      title: '返回',
      icon: 'none'
    });
    Taro.navigateBack()
  } 
  state = {
    loading:true,
    threads:[],
  }
  componentWillMount () { }

  async componentDidMount () { 
   
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        
      <View>
  <NavBar
    title="CourteousArt"
    leftText="返回"
    leftArrow={ true }
    onClickLeft={ this.onClickLeft }
  />
  </View>
  <Skeleton
    title={ true }
    row={8}
  />


    </View>
    )
  }
}
