import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import { Tab,Tabs, Skeleton} from '@antmjs/vantui';
import Issuance from '../../components/issuance'
import Comments from '../../components/comments'

const Index:React.FC =()=> {

    return (
      <View>
       <Tabs
    animated={true}
    sticky={true}
    color={'#9ecefc'}
    lineWidth={'3rem'}
    onChange={()=>{}}
    className='libraryWrapper'
  >
    <Tab title="交流">
      <Comments/>
    </Tab>
    <Tab title="发布">
      <Issuance/>
    </Tab>
  </Tabs>
    </View>
    )
  
}
export default Index
