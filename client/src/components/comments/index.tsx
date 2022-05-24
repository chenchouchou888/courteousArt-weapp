import { Cell, Image, Loading, Collapse, CollapseItem } from "@antmjs/vantui"
import { View } from "@tarojs/components"
import Taro, { usePullDownRefresh } from "@tarojs/taro"
import React, { useEffect, useState } from "react"
import { getCommentList } from "../../api/index"
import './index.less'
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
            <View style={{ height: '6rem' }} />
        </View>
    )

}

const Comment: React.FC<any> = (props: any) => {
    const { author, description, name, rate, url } = props.params
    const [activeNames, setActiveNames] = useState("1")
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
            <View className="comment">
                <Cell title="简介" value={description}></Cell>
               
            </View>
        </View>


    )
}
export default Index