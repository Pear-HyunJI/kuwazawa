import React from 'react';
import styled from 'styled-components';
import backImg from '../../assets/image/fadein/1_sky_pc-b0963240.jpg';
import ground from '../../assets/image/fadein/1_ground1_pc-979ead8b.png';
import ground2 from '../../assets/image/fadein/1_ground2_pc-648eb135.png';
import ground3 from '../../assets/image/fadein/1_ground3_pc-907636de.png';
import leftBush from '../../assets/image/fadein/1_l1_pc-4f293b0e.png';
import leftGrass from '../../assets/image/fadein/1_l3_pc-b5ade620.png';
import leftTree from '../../assets/image/fadein/1_l4_pc-357ac1e3.png';
import rightBush from '../../assets/image/fadein/1_r1a_pc-66a6a5f0.png';
import rightGrass from '../../assets/image/fadein/1_r3_pc-aff410d0.png';
import rightTree from '../../assets/image/fadein/1_r4_pc-e78cd55d.png';
import people from '../../assets/image/fadein/1_people1_pc-86bbbf37.png'

const OpeningBlock = styled.div`
  background: url(${backImg});
  background-size: cover;
  background-position: center; 
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: ${({ scrollPosition }) => (scrollPosition > 4500 ? 'relative' : 'fixed')};
  overflow: hidden;
  z-index: 10;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, ${({ scrollPosition }) => (scrollPosition > 3800 && scrollPosition <= 4500 ? '0.5' : '0')});
    transition: background-color 0.5s ease;
  }

  img {
    position: absolute;
    transition: all 0.5s ease;

    &:nth-child(1) { bottom: ${({ scrollPosition }) => (scrollPosition > 4500 ? '5%' : '0%')}; max-width: ${({ scrollPosition }) => (scrollPosition > 4500 ? '70%' : '100%')}; left: ${({ scrollPosition }) => (scrollPosition > 4500 ? '-30%' : '0')}; }
    &:nth-child(2) { top: ${({ scrollPosition }) => (scrollPosition > 4500 ? '15%' : '25%')}; max-width: ${({ scrollPosition }) => (scrollPosition > 4500 ? '70%' : '100%')}; left: ${({ scrollPosition }) => (scrollPosition > 4500 ? '0' : '0')}; }
    &:nth-child(3) { bottom: ${({ scrollPosition }) => (scrollPosition > 4500 ? '10%' : '0%')}; max-width: ${({ scrollPosition }) => (scrollPosition > 4500 ? '70%' : '100%')}; left: ${({ scrollPosition }) => (scrollPosition > 4500 ? '-30%' : '0')}; }
    &:nth-child(4) { top: ${({ scrollPosition }) => (scrollPosition > 4500 ? '5%' : '50%')}; max-width: ${({ scrollPosition }) => (scrollPosition > 4500 ? '70%' : '100%')}; left: ${({ scrollPosition }) => (scrollPosition > 4500 ? '-50%' : '50%')}; }
    &:nth-child(5) { left: 0; max-width: ${({ scrollPosition }) => (scrollPosition > 4500 ? '25%' : '45%')}; bottom: 10%; left: ${({ scrollPosition }) => (scrollPosition > 4500 ? '-30%' : '0')}; }
    &:nth-child(6) { left: 0; top: 40.3%; left: ${({ scrollPosition }) => (scrollPosition > 4500 ? '-30%' : '0')}; }
    &:nth-child(7) { left: 0; top: 30%; max-width: ${({ scrollPosition }) => (scrollPosition > 4500 ? '10%' : '15%')}; right: ${({ scrollPosition }) => (scrollPosition > 4500 ? '-30%' : '0')}; }
    &:nth-child(8) { right: 0; max-width: ${({ scrollPosition }) => (scrollPosition > 4500 ? '30%' : '50%')}; bottom: 10%; right: ${({ scrollPosition }) => (scrollPosition > 4500 ? 'calc(100% - 30%)' : '0')}; }
    &:nth-child(9) { top: 41%; right: ${({ scrollPosition }) => (scrollPosition > 4500 ? 'calc(100% - 30%)' : '0')}; }
    &:nth-child(10) { top: 30%; max-width: ${({ scrollPosition }) => (scrollPosition > 4500 ? '10%' : '15%')}; right: ${({ scrollPosition }) => (scrollPosition > 4500 ? 'calc(100% - 30%)' : '0')}; }
   
  }
`;

const Opening = ({ scrollPosition }) => {
  return (
    <OpeningBlock scrollPosition={scrollPosition}>
     <div className='overlay'>
        <img src={ground3} alt="" style={{ transform: `translateY(${scrollPosition / 7}px)` }} />
        <img src={ground2} alt="" style={{ transform: `translateY(${scrollPosition / 5}px)` }} />
        <img src={ground} alt="" style={{ transform: `translateY(${scrollPosition / 4}px)` }} />
        <img src={people} alt="" style={{ transform: `translateY(${scrollPosition / 4}px)` }} />
        {/* 왼쪽 */}
        <img src={leftTree} alt="" style={{ transform: `translate(${scrollPosition / -3}px, -${scrollPosition / 3}px)` }} />
        <img src={leftBush} alt="" style={{ transform: `translate(-${scrollPosition / 3}px, ${scrollPosition / 3}px)` }} />
        <img src={leftGrass} alt="" style={{ transform: `translateX(-${scrollPosition / 3}px)` }} />
        {/* 오른쪽 */}
        <img src={rightTree} alt="" style={{ transform: `translate(${scrollPosition / 3}px,-${scrollPosition / 3}px)` }} />
        <img src={rightBush} alt="" style={{ transform: `translate(${scrollPosition / 3}px,${scrollPosition / 3}px)` }} />
        <img src={rightGrass} alt="" style={{ transform: `translateX(${scrollPosition / 3}px)` }} />
     </div>
    </OpeningBlock>
  );
};

export default Opening;