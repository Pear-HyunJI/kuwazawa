import React from "react";
import styled from "styled-components";
import MemberModifySection from "@/components/member/MemberModifySection";


const MemberModifyViewBlock = styled.div``;

const MemberModifyView = () => {
  return <MemberModifyViewBlock>
    <MemberModifySection />
  </MemberModifyViewBlock>;
};

export default MemberModifyView;
