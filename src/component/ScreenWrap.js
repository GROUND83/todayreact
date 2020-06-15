import React from "react";
import { useMediaQuery } from "react-responsive";
import theme from "../styles/theme";

export default (props) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  console.log(isMobile, isTablet, isDesktop);
  return (
    <div
      style={{
        display: "flex",
        width: isMobile ? "100%" : isDesktop ? "70%" : "100%",
        minHeight: "92vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 54,
      }}
    >
      {props.children}
    </div>
  );
};
