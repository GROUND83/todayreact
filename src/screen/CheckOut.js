import * as React from "react";
import theme from "../styles/theme";
import { AiTwotoneCheckSquare, AiOutlineCheckSquare } from "react-icons/ai";
import { Modal } from "antd";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../redux/paymentSlice";
import { useLocation, useHistory } from "react-router-dom";

import queryString from "query-string";
import ScreenWrap from "../component/ScreenWrap";
import PersonalPolicy from "./PersonalPolicy";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/api";

const PayMethodWrap = styled.div`
  background-color: ${(props) =>
    props.isActive ? theme.PRIMARY_04 : theme.GRAY_04};
`;
const PayMethodText = styled.p`
  color: ${(props) => (props.isActive ? "white" : "black")};
`;

export default (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
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

  React.useEffect(() => {
    console.log(orderdata);
    console.log("오더데이터", orderMethd);
    if (same) {
      setName(orderdata.orderer);
      setPhone(orderdata.phone);
    } else if (!same) {
      setName("");
      setPhone("");
    }
  }, [same, orderdata, orderMethd]);

  const closeModal = () => {
    setAgreeModal(false);
  };
  const openModal = () => {
    setAgreeModal(true);
  };

  // 결제
  const onClickPayment = async () => {
    const { IMP } = window;
    if (checkAgree && orderMethd && orderdata && name) {
      if (orderMethd === "계좌이체") {
        console.log("계죄이체");
        IMP.init(process.env.REACT_APP_IMPORT);
        const data = {
          pg: orderMethd, // PG사
          pay_method: "vbank", // 결제수단
          merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
          amount: orderdata.totalPrice, // 결제금액
          name: `${orderdata.orderType}-${orderdata.menudata.salad.name} ${orderdata.menudata.fruit.name}`, // 주문명
          buyer_name: orderdata.orderer, // 구매자 이름
          buyer_tel: orderdata.phone, // 구매자 전화번호
          buyer_email: orderdata.email, // 구매자 이메일
          buyer_addr: `${orderdata.address}-${orderdata.address1}`, // 구매자 주소
          buyer_postcode: orderdata.zonecode, // 구매자 우편번호
        };
        IMP.request_pay(data, callback);
        // send SMS
        // let data = {
        //   phone: orderdata.phone,
        //   totalprice: `${orderdata.totalPrice
        //     .toString()
        //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`,
        // };

        // await api.sendOrderTypeAccount(data).then((result) => {
        //   if (result.status === 200) {
        //     // 결재완료
        //     // const query = queryString.stringify(response);
        //     console.log(result);
        //     props.history.push(`/payment/result`);
        //     // 서버저장[오더]
        //   }
        // });
      } else {
        // 싱글 ? 멀티?
        if (orderdata.orderType === "일반주문") {
          IMP.init(process.env.REACT_APP_IMPORT);
          const data = {
            pg: "kakaopay", // PG사
            pay_method: "card", // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: orderdata.totalPrice, // 결제금액
            name: `${orderdata.orderType}-${orderdata.menudata[0].salad.name} ${orderdata.menudata[0].fruit.name}`, // 주문명
            buyer_name: orderdata.orderer, // 구매자 이름
            buyer_tel: orderdata.phone, // 구매자 전화번호
            buyer_email: orderdata.email, // 구매자 이메일
            buyer_addr: `${orderdata.address}-${orderdata.address1}`, // 구매자 주소
            buyer_postcode: orderdata.zonecode, // 구매자 우편번호
            custom_data: orderdata.menudata,
          };
          IMP.request_pay(data, callback);
        } else if (orderdata.orderType === "정기주문") {
          IMP.init(process.env.REACT_APP_IMPORT);
          const data = {
            pg: "kakaopay", // PG사
            pay_method: "card", // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: orderdata.totalPrice, // 결제금액
            name: `${orderdata.orderType}-${orderdata.menudata.length}회`, // 주문명
            buyer_name: orderdata.orderer, // 구매자 이름
            buyer_tel: orderdata.phone, // 구매자 전화번호
            buyer_email: orderdata.email, // 구매자 이메일
            buyer_addr: `${orderdata.address}-${orderdata.address1}`, // 구매자 주소
            buyer_postcode: orderdata.zonecode, // 구매자 우편번호
            custom_data: orderdata.menudata,
          };
          IMP.request_pay(data, callback);
        }
      }
    } else {
      toast.error("모든필드를 입력해주세요.");
    }
    /* 4. 결제 창 호출하기 */
  };

  const callback = (response) => {
    const query = queryString.stringify(response);
    console.log(response);
    console.log(query);
    const { success, merchant_uid, error_msg } = response;
    if (success) {
      // alert("결제 성공");
      /* 결제성공 데이터베이스 넣기 */
      let {
        buyer_addr,
        buyer_email,
        buyer_name,
        buyer_postcode,
        buyer_tel,
        custom_data,
        imp_uid,
        merchant_uid,
        name,
        paid_amount,
        paid_at,
        receipt_url,
        status,
        pg_provider,
      } = response;
      dispatch(createOrder({ merchant_uid, orderdata }));
      // props.history.push(`/payment/result?${query}`);
    } else {
      // alert(`결제 실패: ${error_msg}`);
      // toast
      toast.error(`결제사 실패했습니다. ${error_msg}`);
    }
  };

  const OutWrapper = (props) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 4,
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
    <ScreenWrap>
      {orderdata ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <h1 style={{ fontSize: 18, fontWeight: "bold" }}>주문/결재하기</h1>
          {orderdata.orderType === "일반주문" ? (
            <OutWrapper>
              <p style={{ marginTop: 3, fontWeight: "bold" }}>주문상품정보</p>
              <Wrapper>
                <p>{orderdata.menudata[0].salad.name}</p>
                <p>{orderdata.menudata[0].saladAmount}개</p>
              </Wrapper>
              <Wrapper>
                <span>{orderdata.menudata[0].fruit.name}</span>
                <span>{orderdata.menudata[0].fruitAmount}개</span>
              </Wrapper>
            </OutWrapper>
          ) : orderdata.orderType === "정기주문" ? (
            <OutWrapper>
              <p style={{ marginTop: 3, fontWeight: "bold" }}>주문상품정보</p>
              <Wrapper>
                <p>{orderdata.orderName}</p>
              </Wrapper>
            </OutWrapper>
          ) : null}
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
                    <AiTwotoneCheckSquare color={theme.GRAY_07} size={24} />
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
            <p style={{ fontSize: 14, color: theme.GRAY_07, fontWeight: 300 }}>
              주문 변경 및 취소는 당일 오후3시 이전까지 가능
            </p>
            <Wrapper>
              <p>배송방법</p>
              <p>{orderdata.orderType}</p>
            </Wrapper>

            <Wrapper>
              <p>배송예정일시</p>
              <p>{orderdata.deliverdata} 매일 오전 6시까지</p>
            </Wrapper>
            <div>
              <p>배송지</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <p>{orderdata.address}</p>
                <p>{orderdata.address1}</p>
              </div>
            </div>
            <Wrapper>
              <p>공동현관</p>
              <p>{orderdata.etc}</p>
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
                  padding: 10,
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
                  padding: 10,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <PayMethodText isActive={orderMethd === "html5_inicis" && true}>
                  신용카드
                </PayMethodText>
              </PayMethodWrap>
              <PayMethodWrap
                isActive={orderMethd === "kakaopay" && true}
                onClick={() => setOrderMethod("kakaopay")}
                style={{
                  margin: 10,
                  padding: 10,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <PayMethodText isActive={orderMethd === "kakaopay" && true}>
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
            <Modal
              title="개인정보 수집.이용동의"
              visible={agreeModal}
              style={{ top: 10 }}
              width={isMobile ? "100%" : "80%"}
              bodyStyle={{ padding: isMobile ? 3 : 10 }}
              onCancel={() => closeModal()}
              mask
              maskClosable
              onOk={() => {
                setCheckAgree(true);
                closeModal();
              }}
              footer={[
                <button
                  key="cencle"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: theme.GRAY_04,
                  }}
                  onClick={() => closeModal()}
                >
                  취소
                </button>,
                <button
                  key="ok"
                  style={{
                    marginLeft: 30,
                    padding: "10px 20px",
                    color: "white",
                    backgroundColor: theme.PRIMARY_04,
                  }}
                  onClick={() => {
                    setCheckAgree(true);
                    closeModal();
                  }}
                >
                  동의
                </button>,
              ]}
            >
              <PersonalPolicy />
            </Modal>

            <div
              onClick={() => openModal()}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {checkAgree ? (
                <AiOutlineCheckSquare color={theme.PRIMARY_04} size={24} />
              ) : (
                <AiTwotoneCheckSquare color={theme.GRAY_07} size={24} />
              )}
              <p style={{ marginLeft: 10 }}>개인정보 수집.이용동의(필수)</p>
            </div>
          </OutWrapper>
          <button
            onClick={onClickPayment}
            style={{
              marginTop: 30,
              width: "100%",
              backgroundColor:
                checkAgree && orderMethd && orderdata && name
                  ? theme.PRIMARY_04
                  : theme.GRAY_05,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              color:
                checkAgree && orderMethd && orderdata && name
                  ? "white"
                  : theme.GRAY_08,
            }}
          >
            {orderdata.totalPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원 결제하기
          </button>
        </div>
      ) : (
        <div>
          <p>잘못된 접근입니다.</p>
          <p>주문을 다시 시작해주세요.</p>
        </div>
      )}
      <ToastContainer autoClose={3000} />
    </ScreenWrap>
  );
};
