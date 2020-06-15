import React from "react";
import theme from "../../styles/theme";

export default ({
  phone,
  inputPhone,
  setInputPhone,
  verifyPhone,
  inputverti,
  setInputVerti,
  vertifyAuthNem,
}) => {
  return (
    <div style={{ width: "100%", marginTop: 3 }}>
      {!phone ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                flex: 3,
                borderWidth: 0.5,
                borderColor: theme.PRIMARY_04,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                overflow: "hidden",
              }}
            >
              <input
                placeholder="핸드폰번호를 입력하세요."
                style={{
                  width: "100%",
                  border: 0,
                  padding: 10,
                  outline: 0,
                }}
                type="tel"
                name="inputPhone"
                value={inputPhone}
                onChange={({ target: { value } }) => setInputPhone(value)}
              />
            </div>
            <button
              disabled={inputPhone ? "" : true}
              onClick={() => verifyPhone()}
              style={{
                borderWidth: 0.5,
                borderColor: inputverti ? theme.PRIMARY_04 : theme.GRAY_05,
                backgroundColor: inputPhone ? theme.PRIMARY_04 : theme.GRAY_05,
                color: "white",
                flex: 1,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              인증
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
            <div
              style={{
                flex: 3,
                borderWidth: 0.5,
                borderColor: theme.PRIMARY_04,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                overflow: "hidden",
              }}
            >
              <input
                placeholder="인증번호를 입력하세요"
                style={{
                  width: "100%",
                  border: 0,
                  padding: 10,
                  outline: 0,
                }}
                type="text"
                // pattern="\d*"
                name="inputverti"
                value={inputverti}
                onChange={({ target: { value } }) => setInputVerti(value)}
              />
            </div>
            <button
              disabled={inputverti ? "" : true}
              onClick={() => vertifyAuthNem()}
              style={{
                borderWidth: 0.5,
                borderColor: inputverti ? theme.PRIMARY_04 : theme.GRAY_05,
                backgroundColor: inputverti ? theme.PRIMARY_04 : theme.GRAY_05,
                color: "white",
                flex: 1,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: theme.GRAY_03,
            padding: 10,
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>핸드폰</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{}}>{phone}</p>
            <p
              style={{
                marginLeft: 10,
                borderWidth: 0.5,
                backgroundColor: theme.PRIMARY_04,
                padding: "0px 10px",
                color: "white",
                borderRadius: 30,
              }}
            >
              완료
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
