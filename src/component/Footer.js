import React from "react";
import theme from "../styles/theme";
import { AiFillCustomerService } from "react-icons/ai";

export default ({ isMobile, isDesktop, isTablet }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: 230,
        padding: 20,
        flex: 1,
        backgroundColor: theme.PRIMARY_04,
      }}
    >
      {isMobile ? (
        <footer
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            width: "100%",
            padding: 20,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <a
              href="tel:0647559981"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AiFillCustomerService size={20} />
              <span
                style={{ fontSize: 20, marginLeft: 10, fontWeight: "blod" }}
              >
                고객센터 | 064.755.9981
              </span>
            </a>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>인스타그램</span>
              <span style={{ marginTop: 10 }}>카카오채널</span>
            </div>
            <span style={{ marginTop: 10, fontSize: 14 }}>
              그라운드83 | 229-01-75910
              <a
                href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2290175910"
                target="blank"
              >
                [사업자정보확인]
              </a>
            </span>
            <span style={{ marginTop: 10, fontSize: 14 }}>
              통신판매업신고번호 | 제 2019-제주이도2-0115호
            </span>
            <span style={{ marginTop: 10, fontSize: 14 }}>
              제주특별자치도 제주시 독짓골2길 12
            </span>
            <span style={{ marginTop: 10, fontSize: 14 }}>
              이메일문의 | cs@todaysalad.com
            </span>
            <span style={{ marginTop: 10, fontSize: 14 }}>
              copyright&copy;
              {new Date().getFullYear()}
              그라운드83 All rights reserved
            </span>
          </div>
        </footer>
      ) : (
        <footer
          style={{
            width: "100%",
            padding: "20px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <a
              href="tel:0647559981"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AiFillCustomerService size={18} />
              <p
                style={{
                  marginLeft: 10,
                  fontWeight: "blod",
                  fontSize: 16,
                }}
              >
                고객샌터 | 064.755.9981
              </p>
            </a>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>인스타그램</p>
              <p style={{ marginTop: 10 }}>카카오채널</p>
            </div>
            <div
              style={{ marginTop: 10, display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontSize: 14 }}>
                그라운드83 | 229-01-75910
                <a
                  href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2290175910"
                  target="blank"
                >
                  [사업자정보확인]
                </a>
              </p>
              <p style={{ fontSize: 14, marginLeft: 20 }}>
                통신판매업신고번호 | 제 2019-제주이도2-0115호
              </p>
            </div>
            <div
              style={{ marginTop: 10, display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontSize: 14 }}>제주특별자치도 제주시 독짓골2길 14</p>
              <p style={{ fontSize: 14, marginLeft: 20 }}>
                이메일문의 | cs@todaysalad.com
              </p>
            </div>
            <p style={{ marginTop: 10, fontSize: 14 }}>
              copyright&copy;
              {new Date().getFullYear()}
              그라운드83 All rights reserved
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};
