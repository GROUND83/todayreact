import * as React from "react";
import theme from "../styles/theme";
import { AiFillCheckSquare, AiOutlineCheckSquare } from "react-icons/ai";
import ContentLayout from "../component/ContentLayout";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "../component/Modal";
import queryString from "query-string";

const ResponsiveWrap = styled.div`
  width: ${(props) => (props.isMobile ? "100%" : "50%")};
`;
const PayMethodWrap = styled.div`
  background-color: ${(props) =>
    props.isActive ? theme.PRIMARY_04 : theme.GRAY_04};
`;
const PayMethodText = styled.p`
  color: ${(props) => (props.isActive ? "white" : "black")};
`;
export default (props) => {
  const location = useLocation();
  const [orderdata, setOrderdata] = React.useState(location.state.data);
  const [agreeModal, setAgreeModal] = React.useState(false);
  const [name, setName] = React.useState();
  const [phone, setPhone] = React.useState();
  const [same, setSame] = React.useState(false);
  const [orderMethd, setOrderMethod] = React.useState();
  const [checkAgree, setCheckAgree] = React.useState(false);

  const isMobile = useMediaQuery({
    query: "(max-device-width: 767px)",
  });

  // 구매자 동일체크
  React.useEffect(() => {
    // console.log("오더데이터", orderdata);
    if (same) {
      setName(orderdata.orderer);
      setPhone(orderdata.phone);
    } else if (!same) {
      setName("");
      setPhone("");
    }
  }, [same, orderdata]);

  const closeModal = () => {
    setAgreeModal(false);
  };
  const openModal = () => {
    setAgreeModal(true);
  };

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp77067538");
    const data = {
      pg: orderMethd, // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: orderdata.totalPrice, // 결제금액
      name: `${orderdata.orderType}-${orderdata.salad} ${orderdata.fruit}`, // 주문명
      buyer_name: orderdata.orderer, // 구매자 이름
      buyer_tel: orderdata.phone, // 구매자 전화번호
      buyer_email: orderdata.email, // 구매자 이메일
      buyer_addr: `${orderdata.address}-${orderdata.address1}`, // 구매자 주소
      buyer_postcode: orderdata.zonecode, // 구매자 우편번호
    };
    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const query = queryString.stringify(response);
    console.log(query);
    const { success, merchant_uid, error_msg } = response;
    if (success) {
      alert("결제 성공");
      props.history.push(`/payment/result?${query}`);
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  const OutWrapper = (props) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
        backgroundColor: theme.GRAY_03,
        padding: 10,
        borderRadius: 10,
      }}
    >
      {props.children}
    </div>
  );
  const Wrapper = (props) => (
    <div
      style={{
        marginTop: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {props.children}
    </div>
  );
  const InnerWrapper = (props) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {props.children}
    </div>
  );

  const handleOnChange = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
  };
  const handleOnChangePhone = (e) => {
    // console.log(e.target.value);
    setPhone(e.target.value);
  };
  return (
    <ContentLayout>
      {orderdata ? (
        <ResponsiveWrap isMobile={isMobile}>
          <h1 style={{ fontSize: 18, fontWeight: "bold" }}>주문/결재하기</h1>
          <OutWrapper>
            <p style={{ marginTop: 10, fontWeight: "bold" }}>주문상품정보</p>
            <Wrapper>
              <p>{orderdata.salad}</p>
              <p>{orderdata.saladAmount}개</p>
            </Wrapper>

            <Wrapper>
              <span>{orderdata.fruit}</span>
              <span>{orderdata.fruitAmount}개</span>
            </Wrapper>
          </OutWrapper>
          <OutWrapper>
            <span style={{ fontWeight: "bold" }}>주문자정보</span>
            <Wrapper>
              <span>보내는분</span>
              <span>{orderdata.orderer}</span>
            </Wrapper>
            <Wrapper>
              <span>이메일</span>
              <span>{orderdata.email}</span>
            </Wrapper>
            <Wrapper>
              <span>연락처</span>
              <span>{orderdata.phone}</span>
            </Wrapper>
          </OutWrapper>

          <OutWrapper>
            <Wrapper>
              <span style={{ fontWeight: "bold" }}>받는사람정보</span>
              <button onClick={() => setSame(!same)}>
                {same ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <AiOutlineCheckSquare color={theme.PRIMARY_04} size={24} />
                    <span style={{ marginLeft: 10 }}>
                      주문자 정보와 같습니다.
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <AiFillCheckSquare color={theme.GRAY_07} size={24} />
                    <span style={{ marginLeft: 10 }}>
                      주문자 정보와 같습니다.
                    </span>
                  </div>
                )}
              </button>
            </Wrapper>
            <input
              style={{
                marginTop: 10,
                backgroundColor: "white",
                borderWidth: 0.5,
                borderColor: theme.GRAY_05,
                padding: 10,
                outline: 0,
                borderRadius: 10,
              }}
              type="text"
              name="message"
              value={name}
              placeholder="받는 분 이름을 입력하세요"
              onChange={() => handleOnChange}
            />
            <input
              style={{
                marginTop: 10,
                backgroundColor: "white",
                borderWidth: 0.5,
                borderColor: theme.GRAY_05,
                padding: 10,
                outline: 0,
                borderRadius: 10,
              }}
              type="text"
              name="message"
              value={phone}
              placeholder="연락처를 입력하세요."
              onChange={() => handleOnChangePhone}
            />
          </OutWrapper>
          <OutWrapper>
            <p style={{ fontWeight: "bold" }}>배송정보</p>
            <p style={{ fontSize: 14, color: theme.GRAY_07 }}>
              주문 변경 및 취소는 당일 오후3시 이전까지 가능
            </p>
            <Wrapper>
              <p>배송방법</p>
              <p>단품주문</p>
            </Wrapper>

            <Wrapper>
              <p>배송예정일시</p>
              <p>{orderdata.deliverdata} 오전 6시까지</p>
            </Wrapper>
            <Wrapper>
              <p>배송지</p>
              <InnerWrapper>
                <p>{orderdata.address}</p>
                <p>{orderdata.address1}</p>
                <p>{orderdata.etc}</p>
              </InnerWrapper>
            </Wrapper>
            <Wrapper>
              <p>공동현관</p>
              <p>1221</p>
            </Wrapper>
          </OutWrapper>
          <OutWrapper>
            <p style={{ fontWeight: "bold" }}>결재수단</p>
            <InnerWrapper>
              <PayMethodWrap
                isActive={orderMethd === "계좌이체" && true}
                onClick={() => setOrderMethod("계좌이체")}
                style={{
                  margin: 10,
                  padding: 20,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <PayMethodText isActive={orderMethd === "계좌이체" && true}>
                  계죄이체
                </PayMethodText>
              </PayMethodWrap>
              <PayMethodWrap
                isActive={orderMethd === "html5_inicis" && true}
                onClick={() => setOrderMethod("html5_inicis")}
                style={{
                  margin: 10,
                  padding: 20,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <PayMethodText isActive={orderMethd === "신용카드" && true}>
                  신용카드
                </PayMethodText>
              </PayMethodWrap>
              <PayMethodWrap
                isActive={orderMethd === "kakaopay" && true}
                onClick={() => setOrderMethod("kakaopay")}
                style={{
                  margin: 10,
                  padding: 20,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <PayMethodText isActive={orderMethd === "카카오페이" && true}>
                  카카오페이
                </PayMethodText>
              </PayMethodWrap>
            </InnerWrapper>
          </OutWrapper>

          <OutWrapper>
            <InnerWrapper>
              <p style={{ fontWeight: "bold" }}>결재 금액</p>
              <p>
                {orderdata.totalPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </p>
            </InnerWrapper>
          </OutWrapper>

          <OutWrapper>
            {agreeModal && (
              <Modal
                visible={agreeModal}
                closable={true}
                maskClosable={true}
                onClose={closeModal}
              >
                <p>기앤정보 수집.이용동의</p>
                <button
                  onClick={() => {
                    setCheckAgree(true);
                    closeModal();
                  }}
                >
                  <p>동의</p>
                </button>
              </Modal>
            )}
            <div
              onClick={() => openModal()}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {checkAgree ? (
                <AiFillCheckSquare size={24} />
              ) : (
                <AiOutlineCheckSquare size={24} />
              )}
              <p style={{ marginLeft: 10 }}>개인정보 수집.이용동의(필수)</p>
            </div>
          </OutWrapper>
          <div
            style={{
              marginTop: 30,
              width: "100%",
              backgroundColor: theme.PRIMARY_04,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <button onClick={onClickPayment} style={{ color: "white" }}>
              {orderdata.totalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원 결제하기
            </button>
          </div>
        </ResponsiveWrap>
      ) : (
        <ResponsiveWrap>
          <div>
            <p>잘못된 접근입니다.</p>
            <p>주문을 다시 시작해주세요.</p>
          </div>
        </ResponsiveWrap>
      )}
    </ContentLayout>
  );
};
