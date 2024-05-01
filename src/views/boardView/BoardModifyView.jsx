import React from 'react';
import {useLocation} from 'react-router-dom'
import styled from 'styled-components'
import BoardModify from '@/components/board/BoardModify'

const BoardModifyViewBlock = styled.div`
    h2 { 
        font-size:30px; text-align:center; margin:30px 0; 
    }
`

const BoardModifyView = () => {
    const location = useLocation()
    const {post} = location.state
    return (
        <BoardModifyViewBlock className="row">
            <BoardModify post={post} />
        </BoardModifyViewBlock>
    );
};

export default BoardModifyView;