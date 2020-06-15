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
        minHeight: 400,
        padding: 20,
        flex: "auto",
        color: "white",
        fontWeight: "300",
        backgroundColor: theme.PRIMARY_04,
      }}
    >
      {isMobile ? (
        <footer
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: 20,
            flex: "auto",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <span>인스타그램</span>
              <span>카카오채널</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AiFillCustomerService size={18} />
              <p style={{ marginLeft: 10, fontWeight: "blod", fontSize: 16 }}>
                고객샌터 | 064.755.9981
              </p>
            </div>
            <span style={{ fontSize: 12, marginTop: 10 }}>
              그라운드83 | 229-01-75910
              <a
                href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2290175910"
                target="blank"
              >
                [사업자정보확인]
              </a>
            </span>
            <span style={{ fontSize: 12 }}>
              통신판매업신고번호 | 제 2019-제주이도2-0115호
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 12 }}>
              제주특별자치도 제주시 독짓골2길 12
            </span>
            <span style={{ fontSize: 12 }}>이메일문의 | cs@todaysalad.com</span>
          </div>
          <span style={{ fontSize: 12 }}>
            copyright&copy;
            {new Date().getFullYear()}
            그라운드83 All rights reserved
          </span>
        </footer>
      ) : (
        <footer
          style={{
            width: "100%",
            padding: "20px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          <div
            style={{
              flexDirection: "column",
            }}
          >
            {/* <div>
              <span>인스타그램</span>
              <span>카카오채널</span>
              <Instargram />
            </div> */}
            <div
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
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span style={{ fontSize: 14 }}>
                그라운드83 | 229-01-75910
                <a
                  href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2290175910"
                  target="blank"
                >
                  [사업자정보확인]
                </a>
              </span>
              <span style={{ fontSize: 14, marginLeft: 20 }}>
                통신판매업신고번호 | 제 2019-제주이도2-0115호
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span style={{ fontSize: 14 }}>
                제주특별자치도 제주시 독짓골2길 14
              </span>
              <span style={{ fontSize: 14, marginLeft: 20 }}>
                이메일문의 | cs@todaysalad.com
              </span>
            </div>
            <span style={{ fontSize: 14 }}>
              copyright&copy;
              {new Date().getFullYear()}
              그라운드83 All rights reserved
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};
