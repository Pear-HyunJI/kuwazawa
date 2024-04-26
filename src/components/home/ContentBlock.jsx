import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ContentBlockBlock = styled.div`
padding:100px 0 ;
a{
    display:flex;
    justify-content:space-between;
    padding:0 30px
}
.photo{
    width:210px;
    height:210px;
    overflow:hidden;
    border-radius:50%
}
img{
    transition: all 0.5s;
}
img:hover{
    opacity:0.5;
    transform:scale(1.2)
}
p{
    text-align:center;
}

`
const ContentBlock = () => {
    const Image =[
        {img:"../../assets/image/etc/home_img17.jpg",alt:"안코를 잡다"},
        {img:"../../assets/image/etc/home_img18.jpg",alt:"회사 소개"},
        {img:"../../assets/image/etc/home_img19.jpg",alt:"일본 과자"},
    ]


    return (
        <ContentBlockBlock className='row'>
                <Link >
                    { Image.map((item,index)=>(
                            <div  key={index} className='section'>
                                <div className='photo'>
                                    <img src={item.img} alt={item.alt} />
                                </div>
                                <p>{item.alt}</p>
                            </div>
                    ))
                    }
                </Link>
        </ContentBlockBlock>
    );
};

export default ContentBlock;