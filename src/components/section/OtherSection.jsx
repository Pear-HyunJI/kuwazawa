import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OterSectionBlock = styled.div`
text-align: center;
padding:100px 0;
h2 {
    font-size: 24px;
    color: #5a4620;
  }
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  li {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  p {
    color: #5a4620;
    font-size: 20px;
  }
  img {
    width: 70%;
    transition: transform 0.5s; 
  }
  img:hover {
    transform: rotate(10deg) scale(90%);
  }
`

const OterSection = () => {
    const bread = [
        {img:'./assets/image/homeSnack/home_img11.png',name:'사과나무', },
        {img:'./assets/image/homeSnack/home_img12.png',name:'카스텔라', },
        {img:'./assets/image/homeSnack/home_img13.png',name:'보름달', },
        {img:'./assets/image/homeSnack/home_img14.png',name:'백안과 생초코', },
        {img:'./assets/image/homeSnack/home_img15.png',name:'구운 도넛', },
        {img:'./assets/image/homeSnack/home_img16.png',name:'크림 치즈의 달', },
    ]


    return (
        <OterSectionBlock className='row'>
            <h2>다른 대표메뉴</h2>
            <div className='introduce'>
                <ul>
                    {bread.map((item,index)=>(
                        <li key={index}>
                        <Link to={'/'}>
                            <img src={item.img} alt={item.name} />
                            <p>{item.name}</p>
                        </Link>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </OterSectionBlock>
    );
};

export default OterSection;