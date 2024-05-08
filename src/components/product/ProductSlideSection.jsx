import React from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const OnlineShopSlideBlock= styled.div`
position:relative; 
.slide {
    height:40vw; 
    background-size:cover;
    background-position:center;
    &.slide1 { background-image:url('./assets/image/main_slide_crvt_24205_pc_02.jpg')}
    &.slide2 { background-image:url('./assets/image/main_slide_crvt_240111_pc.jpg')}
    &.slide3 { background-image:url('./assets/image/main_slide_jsw_231212_pc.jpg')}
}
.slick-arrow {
    position:absolute; top:50%; transform:translateY(-50%); 
    font-size:50px; color:#fff; 
    &.slick-prev { left:50px; z-index:9999 }
    &.slick-next { right:50px } 
}
.slick-dots { position:absolute; bottom:30px; 
              left:50%; transform:translate(-50%);
   li { display:inline-block; padding:0 5px; 
        button { width:10px; height:10px; border-radius:50%; 
               background:#ddd; text-indent:-9999px; overflow:hidden }
        &.slick-active { button { background: black; } }
    }
}
@media (max-width: 768px){
    position:relative; 
.slide {
    height:70vw;
    margin-top:10%; 
    background-size:cover;
    background-position:center;
    &.slide1 { background-image:url('./assets/image/main_slide_crvt_24205_pc_02.jpg')}
    &.slide2 { background-image:url('./assets/image/main_slide_crvt_240111_pc.jpg')}
    &.slide3 { background-image:url('./assets/image/main_slide_jsw_231212_pc.jpg')}
}
.slick-arrow {
    position:absolute; top:50%; transform:translateY(-50%); 
    font-size:50px; color:#fff; 
    &.slick-prev { left:50px; z-index:9999 }
    &.slick-next { right:50px } 
}
.slick-dots { position:absolute; bottom:30px; 
              left:50%; transform:translate(-50%);
   li { display:inline-block; padding:0 5px; 
        button { width:10px; height:10px; border-radius:50%; 
               background:#ddd; text-indent:-9999px; overflow:hidden }
        &.slick-active { button { background: black; } }
    }
}
}
`
const OnlineShopsection = () => {
    const sliders=[
        {img:"./assets/image/shop/shopSlide/1d3fa919ad03722e0f670bbca56fe277.jpg",  alt: "슬라이드1"},
        {img:"./assets/image/shop/shopSlide/373bdd9830818f84bbb557a0911d6729.jpg",  alt: "슬라이드1"},
        {img:"./assets/image/shop/shopSlide/c40d3fb4d32319688ad8fe11fb1d691f.jpg",  alt: "슬라이드1"},
    ]

    const options = {
        dots:true,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToShow:1,
        slidesToScroll:1,
        prevArrow : <IoIosArrowDropleftCircle />,
        nextArrow : <IoIosArrowDroprightCircle />
    }
    return (
        <OnlineShopSlideBlock className='row'>
            <Slider className="slider" {...options}>
        {sliders.map((item, index) => (
          <div className="slide" key={index}>
            <img src={item.img} alt={item.alt} />
          </div>
        ))}
      </Slider>
        </OnlineShopSlideBlock>
    );
};

export default OnlineShopsection;