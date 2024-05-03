import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/Layout";
import HomeView from "@/views/HomeView";
// 점포 소개
import StoreInfoView from "@/views/storeInfoView/StoreInfoView";
// 과자 소개
import SnackInfoView from "@/views/snackInfoView/SnackInfoView";
// 온라인 샵 (아이템 리스트, 디테일 아이템, 장바구니)
import DetailItemView from "@/views/onlineShopView/DetailItemView";
import CartView from "@/views/onlineShopView/CartView";
import ProductView from '@/views/product/ProductView'
import ProductModifyView from "@/views/product/ProductModifyView";
import ProductInsertView from "@/views/product/ProductInsertView";
import ProductDetailView from "@/views/product/ProductDetailView";
// 공지사항
import BoardView from "@/views/boardView/BoardView";
import BoardDetailView from "./views/boardView/BoardDetailView";
import BoardModifyView from "./views/boardView/BoardModifyView";
import BoardWriteView from "./views/boardView/BoardWriteView";
// 회원관리
import JoinView from "@/views/memberView/JoinView";
import LoginView from "@/views/memberView/LoginView";
import MemberModifyView from "@/views/memberView/MemberModifyView";
import ReviewView from "@/views/Review/ReviewView";
import ReviewListView from "@/views/Review/ReviewListView";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeView />} />
        {/* 점포소개 */}
        <Route path="/storeInfo" element={<StoreInfoView />} />
        {/* 과자소개 */}
        <Route path="/snackInfo" element={<SnackInfoView />} />
        {/* 온라인 샵 */}
        <Route path="/product" element={<ProductView />} />
        <Route path="/detailItem" element={<DetailItemView />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/productInsert" element={<ProductInsertView />} />
        <Route path="/productModify" element={<ProductModifyView />} />
        <Route path="/product/:id" element={<ProductDetailView />} />
        {/* 공지사항 */}
        <Route path="/board" element={<BoardView />} />
        <Route path="/boardWrite" element={ <BoardWriteView /> } />
        <Route path="/boardModify/:subject" element={ <BoardModifyView /> } />
        <Route path="/boardDetail/:subject" element={ <BoardDetailView /> } />
        {/* 회원관리 */}
        <Route path="/join" element={<JoinView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/memberModify" element={<MemberModifyView />} />
        {/* 리뷰관리 */}
        <Route path="/review" element={<ReviewView />} />
        <Route path="/reviewList" element={<ReviewListView />} />
      </Route>
    </Routes>
  );
};

export default App;
