import React from 'react';
import styled from 'styled-components';

const OterSectionBlock = styled.div`
text-align:center;
h2{font-size:24px; color: #5A4620;}
`

const OterSection = () => {
    const bread = [
        {img:'./assets/image/homeSnack/home_img11.png',name:'사과나무', },
        {img:'./assets/image/homeSnack/home_img12.png',name:'', },
        {img:'./assets/image/homeSnack/home_img13.png',name:'', },
        {img:'./assets/image/homeSnack/home_img14.png',name:'', },
        {img:'./assets/image/homeSnack/home_img15.png',name:'', },
        {img:'./assets/image/homeSnack/home_img16.png',name:'', },
    ]


    return (
        <OterSectionBlock className='row'>
            <h2>다른 자만 과자</h2>
            <div className='introduce'>
                <img src="" alt="" />
            </div>
        </OterSectionBlock>
    );
};

export default OterSection;