import { Cell, Image, Loading, CellGroup, Popup, Button, Field } from "@antmjs/vantui"
import { View } from "@tarojs/components"
import Taro, { usePullDownRefresh } from "@tarojs/taro"
import React, { useEffect, useState } from "react"
import { addComment, getCommentList } from "../../api/index"
import './index.less'
import  pubsub from 'pubsub-js'

//hook中ref的使用
const Index: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [commentList, setCommentList] = useState([])
    async function setList() {
        setLoading(true)
        setCommentList(await getCommentList())
        setLoading(false)
    }
    //上拉刷新列表
    usePullDownRefresh(() => {
        setList()
    })
    useEffect(() => {
        setList()
        console.log(commentList)
    }, [])

    return (
        <View className="commentWrapper" >
            <Loading size="24px"
                type="spinner"
                className="loader"
                color="#1989fa"
                style={{ visibility: loading ? 'visible' : 'hidden' }} />



            {commentList.map((item: any) => <Comment key={item._id} params={item} />)}
            <View style={{ height: '13vh' }} />
        </View>
    )

}

const Comment: React.FC<any> = (props: any) => {
    const { author, description, name, rate, url ,_id} = props.params
    useEffect(()=>{
        pubsub.subscribe('addComment',(msg,params)=>{
            const {id,info} = params
    
            if(id==_id)
            {
                const commentInfo = {
                    info,
                    id
                }
                console.log('in')
                addComment(commentInfo)//云处理
            }
    
        })
    },[])
    return (
        <View>
            <View className="commentdetailWrapper">
                <Image
                    height='10rem'
                    width='10rem'
                    src={url} />
                <View className="info">
                    <Cell title="藏品" value={name} />
                    <Cell title="作者" value={author} />
                    <Cell title="评分" value={rate} />
                </View>

            </View>
            <View className="comment" >
                <Cell title="简介&评论" value={description}></Cell>

                <CellGroup inset>
                    <Cell title="王金阳" value="2022.5.25" label="这张图一定能超过五位数" />
                    <Cell
                        title="我要评论"
                        isLink={true}
                        onClick={() => {
                                pubsub.publish('changePop',_id)
                        }}
                    />
                </CellGroup>


            </View>
        </View>


    )
}
export default Index