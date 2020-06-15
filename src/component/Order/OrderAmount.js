import React from "react";
import theme from "../../styles/theme";
import styled from "styled-components";

const Wrap = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const SeletedWrap = styled.div`
  flex: 1;
  margin: 3px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  justify-content: center;
  background-color: ${(props) =>
    props.isActive ? theme.PRIMARY_04 : theme.GRAY_04};
`;
const SelectedText = styled.p`
  color: ${(props) => (props.isActive ? "white" : "black")};
`;
export default ({ oroderAmount, setOrderAmount }) => {
  return (
    <Wrap>
      <SeletedWrap
        isActive={oroderAmount === 10 && true}
        onClick={() => setOrderAmount(10)}
      >
        <SelectedText isActive={oroderAmount === 10 && true}>10회</SelectedText>
      </SeletedWrap>
      <SeletedWrap
        isActive={oroderAmount === 20 && true}
        onClick={() => setOrderAmount(20)}
      >
        <SelectedText isActive={oroderAmount === 20 && true}>
          20회 + 1회(서비스)
        </SelectedText>
      </SeletedWrap>
      <SeletedWrap
        isActive={oroderAmount === 30 && true}
        onClick={() => setOrderAmount(30)}
      >
        <SelectedText isActive={oroderAmount === 30 && true}>
          30회 + 2회(서비스)
        </SelectedText>
      </SeletedWrap>
    </Wrap>
  );
};
