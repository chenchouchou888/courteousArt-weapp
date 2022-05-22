import Taro from "@tarojs/taro";

export const getList =  async function() {
    const db = Taro.cloud.database()
    const nftListCollection = db.collection('nftlist')
    const result = await nftListCollection.get();
    return ((result as any).data)
}