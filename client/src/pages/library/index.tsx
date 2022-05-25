import { View } from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import { Tab,Tabs,CellGroup, Field, Button,Popup} from '@antmjs/vantui';
import Issuance from '../../components/issuance'
import Comments from '../../components/comments'
import { useEffect, useRef, useState } from 'react';
import pubsub from 'pubsub-js'


const Index:React.FC =()=> {
const [show,setShow] = useState(false)
const [commentInfo,setCommentInfo] = useState('')
const [id,setId] = useState('')
useEffect(()=>{
  pubsub.subscribe('changePop',(msg,id)=>{
    setShow(true)
    setId(id)
    console.log('ll')
  })
},[])

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
  <Popup
                position="bottom"
                show={show}
                onClose={() => setShow(false)}

            >
                <View>
              
                    <CellGroup
                    border={false}>
                        <Field
                            onBlur={(event)=>{
                              setCommentInfo(event.detail)
                            }}
                            value = {commentInfo}
                            center={true}
                            clearable={true}
                            label="发表评论"
                            placeholder="请输入评论内容"
                            border={false}
                            renderButton={(
                                <Button
                                    size="small"
                                    type="primary"
                                    onClick={()=>{
                                      const params = {
                                        info:commentInfo,
                                        id
                                      }
                                      //发布消息，让子组件处理
                                      pubsub.publish('addComment',params)
                                    }}
                                    >
                                    提交评论
                                </Button>

                            )}
                        />
                    </CellGroup>
                    <View style={{height:'10vh'}}/>
                </View>

            </Popup>
    </View>
    )
  
}
export default Index
