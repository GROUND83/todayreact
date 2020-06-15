import React from "react";
import { Helmet } from "react-helmet";

import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import SingleOrder from "./Orders/SingleOrder";
import MultuOrder from "./Orders/MultuOrder";
import GroupOrder from "./Orders/GroupOrder";
import theme from "../styles/theme";
import ScreenWrap from "../component/ScreenWrap";

const BtnWrap = styled.div`
  flex: 1;
  padding: 6px;
  border-width: 0.5px;
  border-color: ${(props) => (props.value ? theme.PRIMARY_04 : theme.GRAY_04)};
  background-color: ${(props) =>
    props.value ? theme.PRIMARY_04 : theme.GRAY_03};
`;
const BtnText = styled.p`
  text-align: center;
  font-weight: 300;
  color: ${(props) => (props.value ? "white" : "gray")};
`;

export default (props) => {
  // 전화 번호 확인 -> 인증할것
  const [value, setValue] = React.useState(0);

  return (
    <ScreenWrap>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BtnWrap value={value === 0 && true} onClick={() => setValue(0)}>
          <BtnText style={{ textAlign: "center" }} value={value === 0 && true}>
            일반주문
          </BtnText>
        </BtnWrap>
        <BtnWrap value={value === 1 && true} onClick={() => setValue(1)}>
          <BtnText value={value === 1 && true}>정기주문</BtnText>
        </BtnWrap>
        <BtnWrap value={value === 2 && true} onClick={() => setValue(2)}>
          <BtnText value={value === 2 && true}>단체주문</BtnText>
        </BtnWrap>
      </div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              backgroundColor: theme.SECONDARY_COLOR01,
              padding: "3px 10px",
            }}
          >
            {value === 0 && (
              <div>
                <p style={{ fontWeight: "bold" }}>일반주문</p>
                <p style={{ fontWeight: 300 }}>
                  - 오후 3시 이전 주문시 익일 새벽배송(3만 이상 무료배송)
                </p>
              </div>
            )}
            {value === 1 && (
              <div>
                <p style={{ fontWeight: "bold" }}>정기주문</p>
                <p style={{ fontWeight: 300 }}>
                  - 10회이상 주문 가능하며, 8만원 이상 구매 시 할인이
                  적용됩니다.
                </p>
              </div>
            )}
            {value === 2 && (
              <div>
                <p style={{ fontWeight: "bold" }}>단체주문</p>
                <p style={{ fontWeight: 300 }}>
                  - 2일 전 요청하시면 원하시는 시간에 맞춰 선택한 메뉴를
                  배송해드립니다.
                </p>
              </div>
            )}
          </div>
        </div>
        {value === 0 && <SingleOrder />}
        {value === 1 && <MultuOrder />}
        {value === 2 && <GroupOrder />}
      </div>
    </ScreenWrap>
  );
};
