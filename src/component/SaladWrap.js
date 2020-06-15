import React from "react";
import theme from "../styles/theme";
import styled, { css } from "styled-components";

const Wrap = styled.div`
  ${(props) =>
    props.isLast &&
    css`
  &::after {  
    content: ""
    flex: auto;
  }
 
 `}
`;
export default ({ item, index, isLast }) => {
  console.log(isLast);
  return (
    <Wrap
      isLast={isLast}
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "white",
        margin: 3,
        padding: 10,
        width: 320,
      }}
    >
      <img
        src={item.photo}
        style={{ width: 300, height: 300, objectFit: "contain" }}
        alt="샐러드 이미지"
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontWeight: "bold" }}>{item.name}</p>
        <p>{item.unit}g</p>
      </div>
      <p style={{ fontSize: 14, marginTop: 10 }}>{item.description}</p>
      <div
        style={{
          width: 300,
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {item.ingredients.map((ingredients, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              padding: "2px 8px",
              borderColor:
                ingredients.ingredient_type === "01base"
                  ? theme.PRIMARY_00
                  : ingredients.ingredient_type === "02otherbase"
                  ? theme.PRIMARY_01
                  : ingredients.ingredient_type === "04topping"
                  ? theme.PRIMARY_02
                  : ingredients.ingredient_type === "03fruit"
                  ? theme.PRIMARY_03
                  : ingredients.ingredient_type === "06premium"
                  ? theme.PRIMARY_04
                  : theme.PRIMARY_05,
              borderRadius: 30,
              margin: 3,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color:
                  ingredients.ingredient_type === "01base"
                    ? theme.PRIMARY_00
                    : ingredients.ingredient_type === "02otherbase"
                    ? theme.PRIMARY_01
                    : ingredients.ingredient_type === "04topping"
                    ? theme.PRIMARY_02
                    : ingredients.ingredient_type === "03fruit"
                    ? theme.PRIMARY_03
                    : ingredients.ingredient_type === "06premium"
                    ? theme.PRIMARY_04
                    : theme.PRIMARY_05,
              }}
            >
              {ingredients.name}
            </span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 10 }}>{item.calory}Kcal</p>
      <p style={{ marginTop: 5 }}>
        {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 부터
      </p>
    </Wrap>
  );
};
