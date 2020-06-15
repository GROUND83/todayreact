import React from "react";
import { Helmet } from "react-helmet";
import Login from "../component/Login";

export default () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>투데이샐러드 | 회원가입</title>
      </Helmet>
      <Login />
    </div>
  );
};
