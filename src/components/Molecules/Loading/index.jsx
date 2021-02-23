import React from 'react'
import { Icon, Spin } from '../../Atoms'
import './style.css'

const antIcon = <Icon name='LoadingOutlined' className='size-icon' spin />;

const Loading=()=> {
    return (
        <div className='content-loading'>
            <Spin indicator={antIcon} />
        </div>
    )
}
export default Loading