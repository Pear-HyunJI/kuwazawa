import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/Layout";
import HomeView from "@/views/HomeView";
// 점포 소개
import StoreInfoView from "@/views/storeInfoView/StoreInfoView";
// 과자 소개
import SnackInfoView from "@/views/snackInfoView/SnackInfoView";
// 온라인 샵 (아이템 리스트, 디테일 아이템, 장바구니)
import ItemListView from "@/views/onlineShopView/ItemListView";
import DetailItemView from "@/views/onlineShopView/DetailItemView";
import CartView from "@/views/onlineShopView/CartView";
// 공지사항
import BoardView from "@/views/boardView/BoardView";
// 회원관리
import JoinView from "@/views/memberView/JoinView";
import LoginView from "@/views/memberView/LoginView";
import MemberModifyView from "@/views/memberView/MemberModifyView";

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
        <Route path="/itemList" element={<ItemListView />} />
        <Route path="/detailItem" element={<DetailItemView />} />
        <Route path="/cart" element={<CartView />} />
        {/* 공지사항 */}
        <Route path="/board" element={<BoardView />} />
        {/* 회원관리 */}
        <Route path="/join" element={<JoinView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/memberModify" element={<MemberModifyView />} />
      </Route>
    </Routes>
  );
};

export default App;
