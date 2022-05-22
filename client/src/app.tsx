import { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from './store'

import './app.less'
import Taro from '@tarojs/taro'

const store = configStore()

//启动云服务
class App extends Component {
  componentDidMount () {
   

    if(process.env.TARO_ENV === 'weapp')
    {
      Taro.cloud.init({
        env:'cloud1-6gmj5oflf4a12c04'
      })
    }

  }

 
  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {(this.props as any).children}
      </Provider>
    )
  }
}

export default App

