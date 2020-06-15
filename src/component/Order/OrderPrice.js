import React from "react";
import theme from "../../styles/theme";
import styled from "styled-components";

export default ({
  saladprice,
  fruitprice,
  deliverPrice,
  totalPrice,
  fruitAmount,
  saladAmount,
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
          marginTop: 10,
        }}
      >
        <span>상품 수 / 금액 </span>
        <div style={{ display: "flex", marginTop: 10 }}>
          <span>{saladAmount + fruitAmount} 개/ </span>
          <p style={{ marginTop: 10 }}>
            {(saladprice + fruitprice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </p>
        </div>
      </div>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>배송비</p>
        <p>{deliverPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <p style={{ fontWeight: "bold" }}>총금액</p>
        <p style={{ fontWeight: "bold" }}>
          {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </p>
      </div>
    </Wrap>
  );
};
const Wrap = styled.div`
  margin-top: 15px;
  width: 100%;
  background-color: ${(props) => theme.GRAY_02};
  padding: 10px;
  border-radius: 10px;
`;
