
import Taro from '@tarojs/taro'
import { Tabbar,TabbarItem} from '@antmjs/vantui';
import { useDispatch, useSelector } from 'react-redux';
import { changeActive } from '../actions/action'

export default function index() {
  const activeCurrent = useSelector((state:any) => state.activeReducer)
  const dispatch = useDispatch()
  function onChange(event){
    dispatch(changeActive(event.detail))
      Taro.switchTab({
          url:`/pages/${event.detail}/index`,
        })


  }
  return (

      <Tabbar
        active={ activeCurrent }
        onChange={ onChange }
      >
        
        <TabbarItem
          name="index"
        >
          首页
        </TabbarItem>
        <TabbarItem
          name="library"
          
        >
          藏品馆
        </TabbarItem>
       
        <TabbarItem
          name="user"
        >
          个人中心
        </TabbarItem>
      </Tabbar>
    
  )
}

