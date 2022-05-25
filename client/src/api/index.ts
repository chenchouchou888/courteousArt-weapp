import Taro from "@tarojs/taro";

const db = Taro.cloud.database()
const nftListCollection = db.collection('nftlist')
const nftCommentCollection = db.collection('nftcomments')
const nftCommentListClollection = db.collection('commentList')
export const getList =  async function() {
    const result = await nftListCollection.get();
    return ((result as any).data)
}

export const getCommentList = async function () {
    const result = await nftCommentCollection.get();
    return (result as any).data
    
}

//添加交流项
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
//添加交流项下的评论项
export const addComment =  function(data){
    nftCommentListClollection.add({
          data,
          success:res=>{
              Taro.showToast({
                  title:'评论成功'
              })
         
          },
          fail:err=>{
              Taro.showToast({
                  title:'评论失败'
              })
          }
      })
  }