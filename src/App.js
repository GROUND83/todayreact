import * as React from "react";

import styled, { ThemeProvider } from "styled-components";
import Layout from "./component/Layout";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalStyles from "./styles/GlobalStyles";
import moment from "moment";
import "antd/dist/antd.css";
import "moment/locale/ko";

import theme from "./styles/theme";
moment.locale("ko");

const App = () => {
  React.useEffect(() => {}, []);
  const [user, setUser] = React.useState(null);
  const isLoggedIn = useSelector((state) => state.usersReducer.isLoggedIn);
  console.log(isLoggedIn);
  let kakaoid = process.env.REACT_APP_KAKAO_KEY;
  console.log(kakaoid);
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(kakaoid);
  }

  // console.log("카카오로그인", window.Kakao.isInitialized());

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
