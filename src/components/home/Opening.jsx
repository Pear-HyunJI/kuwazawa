import React from 'react';
import styled from 'styled-components';
import backImg from '../../assets/image/fadein/1_sky_pc-b0963240.jpg'
import ground from '../../assets/image/fadein/1_ground1_pc-979ead8b.png'
import ground2 from '../../assets/image/fadein/1_ground2_pc-648eb135.png'
import ground3 from '../../assets/image/fadein/1_ground3_pc-907636de.png'
import leftBush from '../../assets/image/fadein/1_l1_pc-4f293b0e.png'
import leftGrass from '../../assets/image/fadein/1_l3_pc-b5ade620.png'
import leftTree from '../../assets/image/fadein/1_l4_pc-357ac1e3.png'
import rightBush from '../../assets/image/fadein/1_r1a_pc-66a6a5f0.png'
import rightGrass from '../../assets/image/fadein/1_r3_pc-aff410d0.png'
import rightTree from '../../assets/image/fadein/1_r4_pc-e78cd55d.png'

const OpeningBlock = styled.div`
background: url(${backImg});
background-size: cover;
background-position: center; 
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
position: relative;
overflow:hidden;

img {
  position: absolute;
  &:nth-child(1) {bottom:20%; max-width:100% }
  &:nth-child(2) { top:20%; max-width:100%}
  &:nth-child(3) { bottom: 0%; max-width:100% }
  &:nth-child(4) { left: 0; max-width:45%; bottom: 10%;}
  &:nth-child(5) { left: 0;top:40.3%; }
  &:nth-child(6) { left: 0; top:30%; max-width: 15%}
  &:nth-child(7) { right: 0; max-width:50%; bottom: 10%;}
  &:nth-child(8) { right: 0; top:41%;}
  &:nth-child(9) { right: 0; top:30%; max-width: 15%}
}
`
const Opening = () => {
    return (
        <OpeningBlock>           
                {/* <p>本日、和菓子 日和。</p> */}
                <img src={ground3} alt="" />
                <img src={ground2} alt="" />
                <img src={ground} alt="" />
                <img src={leftTree} alt="" />
                <img src={leftBush} alt="" />
                <img src={leftGrass} alt="" />
                <img src={rightTree} alt="" />
                <img src={rightBush} alt="" />
                <img src={rightGrass} alt="" />
        </OpeningBlock>
    );
};

export default Opening;