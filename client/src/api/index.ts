import Taro from "@tarojs/taro";

const db = Taro.cloud.database()
const nftListCollection = db.collection('nftlist')
const nftCommentCollection = db.collection('nftcomments')
const nftCommentListClollection = db.collection('commentList')
export const getList =  async function() {
    const result = await nftListCollection.get();
    return ((result as any).data)
}

//获得根据id评论列表
export const getCommentListbyId = async function(id){
    const  result = await nftCommentListClollection.where({
        id
    }).get()
    return (result as any).data
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
export const addComment =  function(params){
    return new Promise((r,e)=>{
        const data = {...params,date:new Date('yyyy,mth,dd').toString()}
        nftCommentListClollection.add({
              data,
              success:res=>{
                  Taro.showToast({
                      title:'评论成功'
                  })
                  r('success')
              },
              fail:err=>{
                  Taro.showToast({
                      title:'评论失败'
                  })
                  e('error')
              }
          })
    })
    
  }
  //删除交流项下的评论项
  export const removeUserComment = function(_id){
     return new Promise((resolve,reject)=>
     {
            nftCommentListClollection.doc(_id).remove({
                success:()=>{
                    Taro.showToast({
                        title:'删除成功'    
                    })
                    resolve('success')
                },
                fail:(e)=>{
                    Taro.showToast({
                        title:'删除失败'    
                    })
                    reject(e)
                },
            })
     })
     
   
  }