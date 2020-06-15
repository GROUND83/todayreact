import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ authenticated, children, ...rest }) => {
  // console.log("라우터", authenticated);
  return (
    <>
      {authenticated ? (
        <Route {...rest}></Route>
      ) : (
        <Redirect to={{ pathname: "/user/login" }} />
      )}
    </>
  );
};
