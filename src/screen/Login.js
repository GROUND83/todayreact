import * as React from "react";
// import KakaoLogin from "react-kakao-login";
import { useHistory, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { userLogin, KakaoLogin } from "../redux/usersSlice";
import { start } from "../redux/inProgressSlice";
import { useSelector, useDispatch } from "react-redux";

export default () => {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  const clickKakao = async (props) => {
    // console.log("카카오로그인");
    await window.Kakao.Auth.login({
      scope: "account_email,phone_number,phone_number,profile",
      success: function (authObj) {
        // console.log(authObj);
        kakaoGetProfile();
      },
      fail: function (err) {
        console.log(err);
        alert(JSON.stringify(err));
      },
    });
  };
  const kakaoGetProfile = async () => {
    await window.Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        return dispatch(userLogin({ history, response }));
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: "translateY(-10%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0.5,
          borderRadius: 10,
          padding: "20px 10px",
        }}
      >
        <h1 style={{ fontSize: 18, fontWeight: "bold" }}>건강한 삶의 시작</h1>
        <img
          src={Logo}
          alt="투데이샐러드 로고"
          style={{ width: "220px", height: "auto" }}
        />
        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#3d3d3d",
            marginTop: 30,
          }}
        >
          주문을 위해서 로그인이 필요합니다.
        </p>
        <p style={{ textAlign: "center", fontSize: 14, color: "#3d3d3d" }}>
          카카오 로그인을 통해 로그인을 진행 해주세요.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => clickKakao()}
          style={{
            display: "flex",
            backgroundColor: "#fee500",
            marginTop: 30,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 200,
            padding: "10px 10px",
          }}
        >
          <img
            style={{
              width: 20,
              height: 20,
              objectFit: "contain",
            }}
            src={require("../assets/Shape2.png")}
            alt="카카오 로그인"
          />
          <span style={{ marginLeft: 20, fontSize: 16 }}>카카오로 로그인</span>
        </button>
        {/* <KakaoLogin
          jsKey={"a7551cd50e94004f84bcb41e9f59bfc2"}
          onSuccess={(result) => onLoginKakao(result)}
          onFailure={(result) => console.log(result)}
          getProfile
          render={(props) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                clickKakao(props);
              }}
              style={{
                display: "flex",
                backgroundColor: "#fee500",
                marginTop: 30,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                padding: "10px 10px",
              }}
            >
              <img
                style={{
                  width: 20,
                  height: 20,
                  objectFit: "contain",
                }}
                src={require("../assets/Shape2.png")}
                alt="카카오 로그인"
              />
              <span style={{ marginLeft: 20, fontSize: 16 }}>
                카카오로 로그인
              </span>
            </div>
          )}
          throughTalk
          useDefaultStyle
        /> */}
      </div>
    </div>
  );
};
