import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useHistory, NavLink, Link } from "react-router-dom";
import OrderHistory from "./OrderHistory/OrderHistory";

import Delivery from "./OrderHistory/Delivery";
import Destination from "../component/Destination/Destination";
import User from "./OrderHistory/User";
import theme from "../styles/theme";
import ScreenWrap from "../component/ScreenWrap";

export default ({ match }) => {
  const dispatch = useDispatch();
  const { name, id, photo } = useSelector((state) => state.usersReducer);
  return (
    <ScreenWrap>
      <div
        style={{
          flex: 1,
          width: "100%",
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          minHeight: "90vh",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            flex: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ fontSize: 16, fontWeight: "bold", padding: 10 }}>
            마이페이지
          </h1>

          <header
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <NavLink
              exact
              to="/mypage"
              style={{
                backgroundColor: theme.GRAY_03,
                padding: 10,
                flex: 1,
                textAlign: "center",
                fontSize: 14,
              }}
              activeStyle={{
                color: "white",
                backgroundColor: theme.PRIMARY_04,
              }}
            >
              프로필
            </NavLink>

            <NavLink
              exact
              to="/mypage/order"
              style={{
                backgroundColor: theme.GRAY_03,
                padding: 10,
                flex: 1,
                textAlign: "center",
                fontSize: 14,
              }}
              activeStyle={{
                color: "white",
                backgroundColor: theme.PRIMARY_04,
              }}
            >
              결재내역
            </NavLink>

            <NavLink
              exact
              to="/mypage/delivery"
              style={{
                backgroundColor: theme.GRAY_03,
                padding: 10,
                flex: 1,
                textAlign: "center",
                fontSize: 14,
              }}
              activeStyle={{
                color: "white",
                backgroundColor: theme.PRIMARY_04,
              }}
            >
              배송현황
            </NavLink>

            <NavLink
              exact
              to="/mypage/destination"
              style={{
                backgroundColor: theme.GRAY_03,
                padding: 10,
                flex: 1,
                textAlign: "center",
                fontSize: 14,
              }}
              activeStyle={{
                color: "white",
                backgroundColor: theme.PRIMARY_04,
              }}
            >
              배송지관리
            </NavLink>
          </header>
          <div style={{ padding: 10 }}>
            <Route exact path="/mypage" component={User} />
            <Route path="/mypage/order" component={OrderHistory} />
            <Route path="/mypage/delivery" component={Delivery} />
            {/* <Route path="/mypage/destination" component={Destination} /> */}
          </div>
        </div>
      </div>
    </ScreenWrap>
  );
};
