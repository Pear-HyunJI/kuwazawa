import React from 'react';
import {useLocation} from 'react-router-dom'
import BoardDetail from '@/components/board/BoardDetail'
import styled from 'styled-components'

const BoardDetailViewBlock = styled.div`
    h2 { 
        font-size:30px; text-align:center; margin:30px 0; 
    }
`
const BoardDetailView = () => {
    const location = useLocation()
    const { post } = location.state
    return (
        <BoardDetailViewBlock className="row">
            <BoardDetail post={post} />
        </BoardDetailViewBlock>
    );
};

export default BoardDetailView;