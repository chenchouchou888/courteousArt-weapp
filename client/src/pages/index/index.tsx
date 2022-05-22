
import { View } from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import { NavBar, Search, Image, Skeleton } from '@antmjs/vantui';
import Nftcard from '../../components/nftcard'
import CardPop from '../../components/nftcardPop'
import { useEffect, useState } from 'react';
import { getList } from '../../api/index';

export default function index() {

  const [nftlist, setnftlist] = useState([])
  useEffect(()=>{
    const updateList = async ()=>{
      setnftlist(await getList())
    }
    updateList()
  }, nftlist)



  return (
    <View>
      <NavBar
        title="CourteousArt"
        rightText="分享"
        leftArrow={false}
        onClickRight={() => console.log('waiting')}
      />

      <Search
        onFocus={()=>{
          Taro.navigateTo({
            url:`/pages/search/index`
          })
        }}
        placeholder="请输入搜索关键词"
      />

      <Image
        width="100%"
        height="40vh"
        src="https://images.unsplash.com/photo-1643101452019-bc00c9bba76b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
      />

      <View className='indexCard'>
        <View className='cardtitle'>
          nft
        </View>
        <View className='cardinfo'>
          交流社区
        </View>

      </View>
      <View className='cardlistwrapper' style={{ display: nftlist.length ? 'flex' : 'none' }}>

        {nftlist.map((item) => {
          return <Nftcard key={item.url} like={item.like} url={item.url} author={item.author} name={item.name} price={item.price} description={item.description}></Nftcard>
        })}
      </View>
      <Skeleton
        title={true}
        row={8}
        style={{ display: nftlist.length ? 'none' : 'block' }}
      />
      <View>
        <CardPop />
      </View>
      <View style={{ height: '13vh' }} />





    </View>


  )
}


