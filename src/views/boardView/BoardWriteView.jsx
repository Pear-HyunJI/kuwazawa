import React from 'react';
import styled from 'styled-components'
import BoardWrite from '@/components/board/BoardWrite'

const BoardWriteViewBlock = styled.div`
    h2 { 
        font-size:30px; text-align:center; margin:30px 0; 
    }
`

const BoardWriteView = () => {
    
    

    return (
        <BoardWriteViewBlock className="row">
            <BoardWrite />
        </BoardWriteViewBlock>
    );
};

export default BoardWriteView;