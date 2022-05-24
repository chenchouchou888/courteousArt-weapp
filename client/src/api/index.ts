import Taro from "@tarojs/taro";

const db = Taro.cloud.database()
const nftListCollection = db.collection('nftlist')
const nftCommentCollection = db.collection('nftcomments')
export const getList =  async function() {
    const result = await nftListCollection.get();
    return ((result as any).data)
}

export const getCommentList = async function () {
    const result = await nftCommentCollection.get();
    return (result as any).data
    
}

export const addNftComment =  function(data){
  nftCommentCollection.add({
        data,
        success:res=>{
            Taro.showToast({
                title:'发布成功'
            })
       
        },
        fail:err=>{
            Taro.showToast({
                title:'发布失败'
            })
        }
    })
}