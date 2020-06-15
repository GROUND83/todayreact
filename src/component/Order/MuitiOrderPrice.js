import React from "react";
import theme from "../../styles/theme";
import styled from "styled-components";

export default ({
  totalPrice,
  menulength,
  serviceLength,
  price,
  discount,
  eventdiscount,
}) => {
  return (
    <Wrap>
      <p style={{ fontSize: 18, fontWeight: "bold" }}>결제예상금액</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>상품 수 / 금액 </span>
        <div style={{ display: "flex" }}>
          <span>{menulength} 개/ </span>
          <p style={{ textDecoration: "line-through" }}>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>할인금액</p>
        <p>{discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>이벤트할인</p>
        <p>
          {eventdiscount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "bold" }}>총금액</p>
        <p style={{ fontWeight: "bold" }}>
          {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </p>
      </div>
    </Wrap>
  );
};
const Wrap = styled.div`
  margin-top: 20px;
  width: 100%;
  background-color: ${(props) => theme.GRAY_04};
  padding: 10px;
  border-radius: 10px;
`;
