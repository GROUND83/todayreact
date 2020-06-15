import React from "react";
import theme from "../../styles/theme";

export default () => {
  return (
    <div
      style={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          padding: 10,
          backgroundColor: "white",
          borderRadius: 5,
        }}
      >
        <p style={{ fontWeight: "bold" }}>단체주문</p>
        <a href="tel:064-755-9981">고객센터 | 064.755.9982</a>
      </div>
    </div>
  );
};
