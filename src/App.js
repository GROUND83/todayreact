import * as React from "react";

import { createGlobalStyle } from "styled-components";
import Layout from "./component/Layout";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import "antd/dist/antd.css";
import "moment/locale/ko";

moment.locale("ko");
const ResetStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch; 
  }
  body {

    margin:0;
    padding: 0;
    font-size: 1.5rem;

  }
  h1{
    font-size: 1.8rem;
  }
`;
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
    <BrowserRouter>
      <Layout />
      <ResetStyle />
    </BrowserRouter>
  );
};

export default App;
