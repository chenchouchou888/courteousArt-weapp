import { View } from '@tarojs/components'
import React from 'react'
import { Cell, Image, Rate } from '@antmjs/vantui'
import './index.less'
import { useDispatch } from 'react-redux';
import { changeShow } from '../../actions/show'
import { changePopInfo } from '../../actions/pop';

const index: React.FC<any> = (props: any) => {
    const dispatch = useDispatch()
    function cardClickHandler(){
        dispatch(changeShow(true));
        dispatch(changePopInfo(props));
    }
    return (
        <View className='nftcardwrapper' onClick={cardClickHandler}>
            <Image
                width="26vh"
                height='26vh'
                src={props.url}/>
                 <Cell
                title={props.name}
                value={props.price}
                label={props.author}
                size='large'
                border={false}
                titleWidth='10vh'
                
                >

                </Cell>
            <Rate
                style={{marginLeft:'11px',marginTop:'-10px'}}
                readonly={true}
                value={props.like}
                icon="like"
                voidIcon="likeO"
                onChange={() => (console.log('xixi'))}
            />
        </View>
    )
}

export default index

