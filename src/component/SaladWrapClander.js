import React from "react";
import theme from "../styles/theme";

export default ({ item, index, isMobile }) => {
  return (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        margin: 3,
        padding: isMobile ? 5 : 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <img
            src={`http://192.168.0.146:8000${item.photo}`}
            style={{
              width: isMobile ? 180 : 220,
              height: isMobile ? 180 : 220,
              objectFit: "contain",
            }}
            alt="샐러드 이미지"
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
            }}
          >
            <p style={{ fontWeight: "bold" }}>{item.name}</p>
            <p style={{ fontSize: 14, marginTop: 10 }}>{item.description}</p>
            <p>총중량 | {item.unit}g</p>
            <p style={{ marginTop: 10 }}>{item.calory}Kcal</p>
            <p style={{ marginTop: 5 }}>
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              부터
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontWeight: "bold" }}>재료</p>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {item.ingredients.map((ingredients, index) => (
              <div
                key={index}
                style={{
                  width: isMobile ? 70 : 80,
                  height: isMobile ? 70 : 80,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.GRAY_02,
                  padding: 1,
                  borderRadius: 10,
                  margin: 5,
                }}
              >
                <img
                  src={`http://192.168.0.146:8000${ingredients.photo}`}
                  style={{
                    width: isMobile ? 40 : 35,
                    height: isMobile ? 40 : 35,
                    objectFit: "contain",
                  }}
                  alt={ingredients.name}
                />
                <div
                  style={{
                    marginTop: 5,
                    padding: "0px 8px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      color:
                        ingredients.ingredient_type === "base"
                          ? theme.PRIMARY_05
                          : ingredients.ingredient_type === "otherbase"
                          ? theme.PRIMARY_04
                          : ingredients.ingredient_type === "topping"
                          ? theme.PRIMARY_02
                          : ingredients.ingredient_type === "fruit"
                          ? theme.PRIMARY_01
                          : theme.PRIMARY_00,
                    }}
                  >
                    {ingredients.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
