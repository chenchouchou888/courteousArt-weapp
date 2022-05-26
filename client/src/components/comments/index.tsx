import { Cell, Image, Loading, CellGroup, SwipeCell, Icon } from "@antmjs/vantui"
import { View } from "@tarojs/components"
import Taro, { usePullDownRefresh } from "@tarojs/taro"
import React, { useEffect, useRef, useState } from "react"
import { addComment, getCommentList, getCommentListbyId, removeUserComment } from "../../api/index"
import './index.less'
import pubsub from 'pubsub-js'

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
        <View className="commentWrapper">
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
    const { author, description, name, rate, url, _id } = props.params
    const [list, setList] = useState([])
    async function getList() {
        setList(await getCommentListbyId(_id))
    }
    async function removeComment(_id) {
        await removeUserComment(_id)
        getList()
    }
    useEffect(() => {
        //首次刷新评论列表
        getList()
        //订阅发布评论事件
        pubsub.subscribe('addComment', async (msg, params) => {
            const { id, info } = params

            if (id == _id) {
                const commentInfo = {
                    info,
                    id
                }
                console.log('in')
                await addComment(commentInfo)//云处理
                getList()
            }

        })
    }, [])
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
                    {list?.map((item: any) => {
                        return (<Cell title="waiting" label={item.info} value={item.date}
                            renderRightIcon={
                                <View >
                                    <Icon name='cross' className="iconleft" color="#8fc7fb" onClick={() => {
                                        removeComment(item._id)
                                    }}></Icon>
                                </View>

                            }></Cell>)
                    }
                    )}
                    <Cell
                        title="我要评论"
                        isLink={true}
                        onClick={() => {
                            pubsub.publish('changePop', _id)
                        }}
                    />
                </CellGroup>


            </View>
        </View>


    )
}
export default Index