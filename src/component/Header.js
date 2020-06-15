import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import LogoMobile from "../assets/logomobile.svg";

import HamburgerMenu from "react-hamburger-menu";
import { useSelector, useDispatch } from "react-redux";
import theme from "../styles/theme";
import styled from "styled-components";

const HeaderWrap = styled.header`
  position: fixed;
  display: flex;
  flex-direction: row;
  top: 0px;
  left: 0px;
  z-index: 1000;
  width: 100%;
  height: 5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.08);
`;

export default ({ isMobile, isDesktop, isTablet }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { isLoggedIn, name, photo } = useSelector(
    (state) => state.usersReducer
  );
  const clickHam = () => {
    setIsVisible(!isVisible);
  };
  console.log({ isMobile, isDesktop, isTablet });
  return (
    <HeaderWrap>
      <div
        style={{
          width: "100%",
          flexDirection: "column",
          flex: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <nav
          style={{
            width: isMobile ? "100%" : isDesktop ? "70%" : "100%",
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "52px",
            padding: "10px",
          }}
        >
          {isMobile ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
              }}
            >
              <ul
                style={{
                  flex: 1,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <li>
                  <Link to="/" onClick={() => setIsVisible(false)}>
                    <img
                      src={Logo}
                      alt="투데이샐러드 로고"
                      style={{ width: "150px", height: "auto" }}
                    />
                  </Link>
                </li>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
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
                    <Link
                      to="/order"
                      style={{ color: theme.PRIMARY_04 }}
                      onClick={() => setIsVisible(false)}
                    >
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
              </ul>
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // backgroundColor: "yellow",
              }}
            >
              <div style={{ flex: 1 }}>
                <Link to="/" onClick={() => setIsVisible(false)}>
                  <img
                    src={Logo}
                    alt="투데이샐러드 로고"
                    style={{ width: "200px", height: "auto" }}
                  />
                </Link>
              </div>

              <ul
                style={{
                  flex: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <li style={{ marginRight: 20 }}>
                  <Link to={"/about"} style={{ marginBottom: 20 }}>
                    ABOUT
                  </Link>
                </li>
                <li style={{ marginRight: 20 }}>
                  <Link to={"/calender"} style={{ marginBottom: 20 }}>
                    메뉴일정
                  </Link>
                </li>
                <li style={{ marginRight: 20 }}>
                  <Link to={"/salad"} style={{ marginBottom: 20 }}>
                    샐러드
                  </Link>
                </li>
                <li style={{ marginRight: 20 }}>
                  <Link to={"/fruit"} style={{ marginBottom: 20 }}>
                    신선과일박스
                  </Link>
                </li>

                <li style={{ marginRight: 20 }}>
                  {name && (
                    <p>
                      <Link to={"/mypage"} style={{ marginBottom: 20 }}>
                        마이페이지
                      </Link>
                    </p>
                  )}
                </li>
                <li>
                  <div
                    style={{
                      marginLeft: 20,
                      borderWidth: 0.5,
                      borderColor: theme.PRIMARY_04,
                      padding: "5px 20px",
                      borderRadius: 30,
                    }}
                  >
                    <Link to="/order" style={{ color: theme.PRIMARY_04 }}>
                      주문하기
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </nav>
        {isVisible && (
          <div
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 10,
              display: "flex",
            }}
          >
            <ul
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <div>
                {!isLoggedIn && (
                  <li style={{ marginBottom: 20 }}>
                    <Link
                      to={"/user/login"}
                      onClick={() => setIsVisible(false)}
                    >
                      로그인
                    </Link>
                  </li>
                )}
              </div>
              <li style={{ marginBottom: 20 }}>
                <Link to={"/about"} onClick={() => setIsVisible(false)}>
                  ABOUT
                </Link>
              </li>
              <li style={{ marginBottom: 20 }}>
                <Link to={"/calender"} onClick={() => setIsVisible(false)}>
                  메뉴일정
                </Link>
              </li>
              <li style={{ marginBottom: 20 }}>
                <Link to={"/salad"} onClick={() => setIsVisible(false)}>
                  샐러드
                </Link>
              </li>
              <li style={{ marginBottom: 20 }}>
                <Link to={"/fruit"} onClick={() => setIsVisible(false)}>
                  신선과일박스
                </Link>
              </li>
              {name && (
                <li
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <Link
                    to={"/mypage"}
                    style={{ display: "flex", flexDirection: "row" }}
                    onClick={() => setIsVisible(false)}
                  >
                    {photo && (
                      <img
                        src={{ uri: photo }}
                        style={{ width: 30, height: 30, objectFit: "contain" }}
                        alt="프로필이미지"
                      />
                    )}
                    마이페이지
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </HeaderWrap>
  );
};
