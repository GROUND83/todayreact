import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import theme from "../../styles/theme";

const LinkBtn = styled.button`
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: ${(props) => theme.GRAY_04};
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  outline: none;
`;
const LinkPossible = styled(Link)`
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: ${(props) => theme.PRIMARY_04};
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
`;

export default ({ isPossible, linkData }) => {
  return (
    <>
      {isPossible ? (
        <LinkPossible
          to={{
            pathname: "/order/checkout",
            state: { data: linkData },
          }}
        >
          구매하기
        </LinkPossible>
      ) : (
        <LinkBtn
          isPossible={isPossible}
          onClick={() => toast.error("모든 필드를 입력하세요")}
        >
          <p
            style={{
              textAlign: "center",
              color: isPossible ? "white" : "black",
            }}
          >
            구매하기
          </p>
        </LinkBtn>
      )}
    </>
  );
};
