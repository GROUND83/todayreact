import React from "react";
import { Helmet } from "react-helmet";
import ScreenWrap from "../component/ScreenWrap";
export default () => {
  return (
    <ScreenWrap>
      <Helmet>
        <meta charSet="utf-8" />
        <title>투데이샐러드 | 신선과일박스</title>
      </Helmet>
      <h1>fruit</h1>
    </ScreenWrap>
  );
};
