import { Uploader } from "@antmjs/vantui"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useEffect, useState } from "react"
const Index:React.FC =()=> {
   
    const [fileList,setFileList] = useState([])
    useEffect(()=>{
        console.log(fileList)
    },fileList)
    function uploadToCloud(){
        const uploadTask = fileList.map((file,index)=>uploadFilePromise(`nft${index}.png`,file));
        Promise.all(uploadTask)
        .then(data => {
            Taro.showToast({title:'上传成功',icon:'none'})
            const newFileList = data.map(item => ({url:item.fileID}))
            setFileList(newFileList as any)
        })
        .catch(e=>{
            Taro.showToast({title:'上传失败',icon:'none'})
            console.log(e)
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
        console.log(file)
        const fileListe = [file]
        setFileList(fileListe as any)
    }
        }
    maxCount={1}
    deletable={true}
    previewSize={'100vw'}
  />
    </View>
    )
  
}
export default Index