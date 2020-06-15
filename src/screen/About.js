import React from "react";
import { Helmet } from "react-helmet";

import ScreenWrap from "../component/ScreenWrap";

export default () => {
  return (
    <ScreenWrap>
      <Helmet>
        <meta charSet="utf-8" />
        <title>투데이샐러드 | about</title>
      </Helmet>
      <h1>about</h1>
    </ScreenWrap>
  );
};
