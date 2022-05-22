
import { View } from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import { Search,NavBar} from '@antmjs/vantui';
import { useEffect, useState } from 'react';

export default function index() {

    const [nftlist, setnftlist] = useState([])
    useEffect(() => {
        getList()
    }, nftlist)

    async function getList() {
        const db = Taro.cloud.database()
        const nftListCollection = db.collection('nftlist')
        const result = await nftListCollection.get();
        setnftlist((result as any).data)
    }
    return (
        <View>

<NavBar
    title="搜索"
    leftText="返回"
    leftArrow={ true }
    onClickLeft={()=>{
        Taro.navigateBack()
    }}
  />
            <Search
                placeholder="搜索作者,藏品"
            />


            <View style={{ height: '13vh' }} />





        </View>


    )
}


