import { View } from '@tarojs/components'
import React from 'react'
import { Popup ,Image,Col,Row,Cell} from '@antmjs/vantui'
import './index.less'
import { useDispatch, useSelector } from 'react-redux';
import { changeShow } from '../../actions/show'

const index: React.FC<any> = (props: any) => {
    const showCurrent=useSelector((state:any) => state.showReducer)//redux中show的数据
    const popInfo = useSelector((state:any)=> state.popReducer)
    const dispatch = useDispatch()
    return (
        <Popup
        show={showCurrent}
        onClose={()=>{dispatch(changeShow(false))}}
        closeable={true}
        position='bottom'
        
      >
        <View className='back' style={{background:`url(${popInfo.url})`,position:'absolute',width:'100%',height:'100%',opacity:'0.3'}}></View>
        <View className='nftcardPopWrapper'>
          
          <Row>
            <Col span='8'>
              <Cell size='large' title='详细信息' border={false}></Cell>
            </Col>
          </Row>
          <Row>
          <Col span='22'>
            <Cell title={'藏品'} value={popInfo.name}/>
            </Col>
            <Col span='22'>
            <Cell title={'作者'} value={popInfo.author}/>
            </Col>
            <Col span='22'>
            <Cell title={'描述信息'} label={popInfo.description} border={false}/>
            </Col>
          </Row>
       
        </View>
      </Popup>
        
    )
}

export default index

