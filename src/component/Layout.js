import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import { Route, Switch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Home from "../screen/Home";
import Salad from "../screen/Salad";
import Fruit from "../screen/Fruit";
import About from "../screen/About";

import Order from "../screen/Order";
import Login from "../screen/Login";
import AuthRoute from "./AuthRoute";
import { useSelector } from "react-redux";

import CheckOut from "../screen/CheckOut";
import Profile from "../screen/Profile";

import MenuCalender from "../screen/MenuCalender";
import ServicePolicy from "../screen/ServicePolicy";
import PersonalPolicy from "../screen/PersonalPolicy";
import PaymentResult from "../screen/PaymentResult";
import theme from "../styles/theme";

const Layout = (porps) => {
  const isLoggedIn = useSelector((state) => state.usersReducer.isLoggedIn);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  React.useEffect(() => {
    console.log("레이아웃", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.GRAY_01,
      }}
    >
      <Header
        isDesktop={isDesktop}
        isMobile={isMobile}
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
      />

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#f8f8f6",
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/servicepolicy" component={ServicePolicy} />
          <Route path="/personalpolicy" component={PersonalPolicy} />
          <Route path="/calender" component={MenuCalender} />
          <Route path="/salad" component={Salad} />
          <Route path="/fruit" component={Fruit} />
          <Route path="/user/login" component={Login} />
          {/* <Route path="/user/login/callback" component={Loginback} /> */}
          {/* <Route exact path="/payment" component={Payment} /> */}
          <Route exact path="/payment/result" component={PaymentResult} />
          <AuthRoute
            authenticated={isLoggedIn}
            path="/mypage"
            component={Profile}
          />

          <AuthRoute
            exact
            authenticated={isLoggedIn}
            path="/order"
            component={Order}
          />

          <AuthRoute
            exact
            authenticated={isLoggedIn}
            path="/order/checkout"
            component={CheckOut}
          />
        </Switch>
      </section>
      <Footer isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} />
    </div>
  );
};

export default Layout;
