import { Uploader,Button ,Form,FormItem,Icon,Rate,Field} from "@antmjs/vantui"
import { Input, View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import React, {useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid"
import { addNftComment } from '../../api/index'
//hook中ref的使用
const Index:React.FC =()=> {
    const formRef:any = useRef()
    const [fileList,setFileList] = useState([])
    
    useEffect(()=>{
        console.log(fileList)
    },[fileList])
   function handleClick(){
         formRef.current.validateFields(async(errorMessage, fieldValues) => {
            if (errorMessage && errorMessage.length) {
              return console.info('errorMessage', errorMessage)
            }
            if(!fileList.length) return Taro.showToast({title:'图片未选择',duration:2000,icon:'error'}) 
            const params:any = await uploadToCloud()
                if(params!='error')
                {
                    const url = params[0].url;
                    const upLoadinfo = {...fieldValues,url}
                    addNftComment(upLoadinfo)
                }
          
                
          })
        
    }
    function uploadToCloud(){
        return new Promise(function(resolve,reject)
        {
            const uploadTask = fileList.map((file:any,index)=>uploadFilePromise(`nft${file.size+file.url.slice(12,13)}.png`,file));
            Promise.all(uploadTask)
            .then(data => {
                Taro.showToast({title:'上传成功',icon:'none'})
                const newFileList = data.map(item => ({url:item.fileID}))
                resolve(newFileList)
            })
            .catch(e=>{
                Taro.showToast({title:'上传失败',icon:'none'})
                console.log(e)
                reject('error')
            })
        })
        
       
    }
    function uploadFilePromise(filename,chooseResult)
    {
        return Taro.cloud.uploadFile({
            cloudPath:filename,
            filePath:chooseResult.url
        })
    }
    return (
      <View>
       <Uploader
    fileList={ fileList }
    onAfterRead={(event)=>{
        const {file} = event.detail
        const fileListe = [file]
        setFileList(fileListe as any)
    }
        }
    maxCount={1}
    deletable={true}
    previewSize={'100vw'}
  />
  <Form
   initialValues={{
    rate: 1,
  }}
  ref={formRef}>
  <FormItem
    label="藏品名称"
    name="name"
    required={true}
    trigger="onInput"
    // taro的input的onInput事件返回对应表单的最终值为e.detail.value
    valueFormat={(e) => e.detail.value}
    renderRight={<Icon name="user-o" />}
  >
    <Input placeholder="请输入藏品名称" />
  </FormItem>

  <FormItem
    label="作者"
    name="author"
    required={true}
    trigger="onInput"
    // taro的input的onInput事件返回对应表单的最终值为e.detail.value
    valueFormat={(e) => e.detail.value}
    renderRight={<Icon name="user-o" />}
  >
    <Input placeholder="请输入作者" />
  </FormItem>

  <FormItem
    label="描述"
    name="description"
    trigger="onInput"
    valueFormat={(e) => e.detail}
  >
    <Field
      type="textarea"
      placeholder="请输入留言"
      border={ false }
    />
  </FormItem>
     

  
  <FormItem label="评分" name="rate">
  <Rate
    icon="like"
    voidIcon="like"
  />
 
  </FormItem>

  <Button
    type="primary"
    className="van-button-submit"
    onClick={handleClick}
  >
  提交
  </Button>
</Form>
<View style={{height:'6rem'}}/>
    </View>
    )
  
}
export default Index