import { Component } from 'react'
import { View} from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import { Button} from '@antmjs/vantui';

export default class Index extends Component {

  getUserid = ()=>{
    Taro.cloud
    .callFunction({
      name: 'login',
      data:{context:'info'},
      success: res =>{
        console.log((res.result as any).openid)
      },
      fail:err =>{
        console.error(err)
      }
    })
  }
  componentWillMount () { }

  componentDidMount () { 
  
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
 
<Button onClick={this.getUserid} type='primary'>点我获取useID</Button>


</View>
     

    )
  }
}
