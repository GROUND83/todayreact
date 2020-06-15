import React from "react";
import theme from "../../styles/theme";

export default ({
  item,
  selectedSaladPlus,
  amount,
  menudata,
  index,
  setMenuData,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <p style={{ fontWeight: "bold" }}>{item.name}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0.5,
            borderColor: theme.GRAY_04,
            width: 50,
            height: 30,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          onClick={() =>
            selectedSaladPlus({
              type: "minus",
              menudata,
              index,
              setMenuData,
            })
          }
        >
          <span>-</span>
        </button>
        <div
          style={{
            height: 30,
            width: 50,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderColor: theme.GRAY_04,
            borderWidth: 0.5,
            backgroundColor: theme.GRAY_04,
          }}
        >
          <p style={{ fontSize: 12 }}>{amount}</p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0.5,
            borderColor: theme.GRAY_04,
            width: 50,
            height: 30,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
          onClick={() =>
            selectedSaladPlus({
              type: "plus",
              menudata,
              index,
              setMenuData,
            })
          }
        >
          <span>+</span>
        </button>
      </div>
    </div>
  );
};
