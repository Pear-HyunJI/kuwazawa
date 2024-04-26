import React from "react";
import styled from "styled-components";
import OnlineShopSlide from "@/components/onlineShop/OnlineShopSlide";
import OnlineShopSection from "@/components/onlineShop/OnlineShopSection";

const ItemListViewBlock = styled.div``;

const ItemListView = () => {
  return <ItemListViewBlock>
    <OnlineShopSlide />
    <OnlineShopSection />
  </ItemListViewBlock>;
};

export default ItemListView;
