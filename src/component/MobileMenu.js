import * as React from "react";
import HamburgerMenu from "react-hamburger-menu";
import { Link } from "react-router-dom";
import theme from "../styles/theme";
import Logo from "../assets/logo.svg";
import { useSelector, useDispatch } from "react-redux";

export default ({ clickHam, isVisible, setIsVisible }) => {
  const { isLoggedIn, name, email, phone } = useSelector(
    (state) => state.usersReducer
  );
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          style={{
            borderWidth: 0.5,
            borderColor: theme.PRIMARY_04,
            padding: "3px 20px",
            borderRadius: 30,
            marginRight: 20,
          }}
        >
          <Link to="/order" style={{ color: theme.PRIMARY_04 }}>
            주문
          </Link>
        </div>
        <div style={{ marginRight: 5 }}>
          <HamburgerMenu
            isOpen={isVisible}
            menuClicked={() => clickHam()}
            width={18}
            height={15}
            strokeWidth={2}
            rotate={0}
            color="black"
            borderRadius={3}
            animationDuration={0.5}
          />
        </div>
      </div>
    </div>
  );
};
