import React from "react";
import { Modal } from "antd";

import theme from "../../styles/theme";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import api from "../../api/api";

import { useSelector, useDispatch } from "react-redux";
import Destination from "../../component/Destination/Destination";
import { checkPhone } from "../../redux/usersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MuitiOrderPrice from "../../component/Order/MuitiOrderPrice";
import PayButton from "../../component/Order/PayButton";
import PhoneVertify from "../../component/Order/PhoneVertify";

import MutilOrderSelectMenu from "../../component/Order/MutilOrderSelectMenu";
import Calender from "../../component/Calender/Calender";

export default (props) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({
    query: "(max-device-width: 767px)",
  });
  const { name, email, phone } = useSelector((state) => state.usersReducer);
  // linkData
  const [linkData, setLinkData] = React.useState();
  const [today, setToday] = React.useState(moment());
  // 핸드폰
  const [isPossible, setIsPossible] = React.useState(false);
  const [inputPhone, setInputPhone] = React.useState("");
  // 입력핸드폰
  const [inputverti, setInputVerti] = React.useState();
  // 인증번호
  const [vertiNum, setVertifyNum] = React.useState();
  // 인증확인
  const [isVertifyPhone, setIsVertifyPhone] = React.useState(false);
  // 선택배송지
  const [selectedDestini, setSelectedDestini] = React.useState();
  const [zonecode, setSelectedZoneCode] = React.useState();
  const [selectedDestini1, setSelectedDestini1] = React.useState();
  const [selectedDestini2, setSelectedDestini2] = React.useState();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [destinationVisible, setDestinationVisible] = React.useState(false);

  // const [discount, setDiscount] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [serviceLength, setServiceLength] = React.useState(0);
  const [orderAmount, setOrderAmount] = React.useState(10);
  const [menudata, setMenuData] = React.useState([]);
  const [totalSaladAmount, setTotalSalaAmount] = React.useState(0);
  const [totalfruitAmount, setTotalFruitAmount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [eventdiscount, setEventDiscount] = React.useState(0);

  const [sendToPhone, setsendToPhone] = React.useState(false);
  const openDestinationModal = () => {
    setDestinationVisible(true);
  };
  const closeDestinationModall = () => {
    setDestinationVisible(false);
  };
  const selectedAddress = (address) => {
    console.log(address);
    setSelectedDestini(address.address);
    setSelectedZoneCode(address.zonecode);
    setSelectedDestini1(address.room);
    setSelectedDestini2(address.etc);
    setDestinationVisible(false);
  };

  const getSelectedData = (data) => {
    console.log(data);
    setMenuData(data);
  };

  React.useEffect(() => {
    if (
      name &&
      email &&
      menudata &&
      phone &&
      selectedDestini &&
      orderAmount >= 10 &&
      totalPrice
    ) {
      let address1 = selectedDestini1 ? selectedDestini1 : "";
      let etc = selectedDestini2 ? selectedDestini2 : "";
      let check = menudata.filter((item) => item.ispossibe === false);
      console.log("확인", check);
      if (check.length === 0) {
        setLinkData({
          orderType: "정기주문",
          orderName: `정기주문 ${menudata.length}회`,
          orderer: name,
          phone: phone,
          email: email,
          address: selectedDestini,
          address1,
          zonecode,
          etc,
          menudata,
          orderdate: moment().format("lll"),
          totalPrice,
        });

        console.log("주문 가능");
        setIsPossible(true);
      } else {
        console.log("주문 불가능");
        setIsPossible(false);
      }
    } else {
      console.log("주문 불가능");
      setIsPossible(false);
    }
  }, [
    name,
    email,
    selectedDestini1,
    selectedDestini,
    selectedDestini2,
    zonecode,
    menudata,
    orderAmount,
    price,
    totalPrice,
    phone,
  ]);

  const selectedSaladPlus = ({ type, menudata, index, setMenuData }) => {
    let newArr = [...menudata];

    if (newArr[index].saladAmount > 0 && type === "minus") {
      console.log("삭제", newArr);
      if (
        newArr[index].fruitAmount === 0 &&
        newArr[index].saladAmount - 1 === 0
      ) {
        console.log("dfadfafdadsf");
        newArr[index].ispossibe = false;
        toast.error("두 매뉴중 하나는 최소 1개 이상이어야 합니다.");
      }
      newArr[index].saladAmount = newArr[index].saladAmount - 1;

      return setMenuData(newArr);
    } else if (type === "plus") {
      console.log("추가", newArr);
      newArr[index].saladAmount = newArr[index].saladAmount + 1;
      newArr[index].ispossibe = true;
      return setMenuData(newArr);
    }
  };

  const selectedFruit = ({ type, menudata, index, setMenuData }) => {
    let newArr = [...menudata];

    if (newArr[index].fruitAmount > 0 && type === "minus") {
      console.log("삭제", newArr);
      if (
        newArr[index].saladAmount === 0 &&
        newArr[index].fruitAmount - 1 === 0
      ) {
        console.log("dfadfafdadsf");
        newArr[index].ispossibe = false;
        toast.error("두 매뉴중 하나는 최소 1개 이상이어야 합니다.");
      }
      newArr[index].fruitAmount = newArr[index].fruitAmount - 1;
      return setMenuData(newArr);
    } else if (type === "plus") {
      console.log("추가", newArr);
      newArr[index].ispossibe = true;
      newArr[index].fruitAmount = newArr[index].fruitAmount + 1;
      return setMenuData(newArr);
    }
  };

  React.useEffect(() => {
    console.log("스테이트변경");
    console.log(menudata);
    let saladamount = 0;
    let fruitAmount = 0;
    if (menudata.length > 0) {
      for (let i = 0; i < menudata.length; i++) {
        console.log(menudata[i].saladAmount);
        saladamount += menudata[i].saladAmount;
        fruitAmount += menudata[i].fruitAmount;
        console.log("합계", saladamount + fruitAmount);
      }
      setTotalSalaAmount(saladamount);
      setTotalFruitAmount(fruitAmount);
      setOrderAmount(menudata.length);
      let newprice = saladamount * 8000 + fruitAmount * 6000;
      setPrice(newprice);
      console.log("금액", newprice);
    }
  }, [menudata]);

  React.useEffect(() => {
    if (price < 80000) {
      console.log("3천원할인", price);
      setDiscount(0);
      setEventDiscount(0);
      setTotalPrice(price);
    } else if (80000 <= price && price <= 140000) {
      console.log("3천원할인", price);
      setDiscount(3000);
      setEventDiscount(1000);
      setTotalPrice(price - 3000 - 1000);
    } else if (140001 <= price && price <= 200000) {
      console.log("5천원할인", price);
      setDiscount(5000);
      setEventDiscount(2000);
      setTotalPrice(price - 5000 - 2000);
    } else if (200001 <= price) {
      console.log("7천원할인", price);
      setDiscount(7000);
      setEventDiscount(3000);
      setTotalPrice(price - 7000 - 3000);
    }
  }, [price]);
  console.log("모바일확인", isMobile);

  const vertifyAuthNem = () => {
    if (vertiNum == inputverti) {
      console.log("인증되었습니다.");
      setIsVertifyPhone(true);
      dispatch(checkPhone(inputPhone));
    }
    console.log("인증", inputverti, inputPhone, vertiNum);
  };

  const verifyPhone = async () => {
    console.log("핸드폰 인증");
    let data = {
      phone: inputPhone,
    };
    await api.sendsms(data).then((result) => {
      if (result.status === 200) {
        console.log(result.data);
        setsendToPhone(true);
        setVertifyNum(result.data);
        // navigate('SignUp1', {code: result.data, phone});
      }
    });
    toast.success("핸드폰으로 인증번호가 발송되었습니다.");
  };
  return (
    <div
      style={{
        display: "flex",
        padding: 3,
        flexDirection: "column",
        alignItems: "flex-start",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: theme.GRAY_03,
          borderRadius: 5,
        }}
      >
        <p style={{ fontWeight: "bold" }}>배송 일정 선택</p>
        <Modal
          title="배송일정 선택"
          visible={modalVisible}
          style={{ top: 10 }}
          width={isMobile ? "100%" : "80%"}
          bodyStyle={{ padding: isMobile ? 3 : 10 }}
          footer={null}
          onCancel={() => setModalVisible(false)}
          mask
          maskClosable
        >
          <Calender
            multiOrder
            getdata={getSelectedData}
            setModal={setModalVisible}
          />
        </Modal>

        {menudata.length > 0 ? (
          <div
            style={{
              width: "100%",
              backgroundColor: theme.GRAY_04,

              borderRadius: 5,
            }}
          >
            <p style={{ padding: 5 }}>
              각 휫수의 원하는 메뉴의 수량을 조절해주세요.
            </p>

            {menudata.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  marginBottom: 3,
                  padding: 10,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <p>{index + 1}회</p>
                  <p style={{ marginLeft: 10 }}>
                    {moment(item.date).format("YYYY년 MM월 DD일(dd)")}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <MutilOrderSelectMenu
                    item={item.salad}
                    amount={item.saladAmount}
                    selectedSaladPlus={selectedSaladPlus}
                    menudata={menudata}
                    index={index}
                    setMenuData={setMenuData}
                  />
                  <MutilOrderSelectMenu
                    item={item.fruit}
                    amount={item.fruitAmount}
                    selectedSaladPlus={selectedFruit}
                    menudata={menudata}
                    index={index}
                    setMenuData={setMenuData}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            onClick={() => setModalVisible(!modalVisible)}
            style={{
              width: "100%",
              backgroundColor: theme.GRAY_04,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              minHeight: 300,
            }}
          >
            <p>배송일정 선택하기</p>
          </div>
        )}
      </div>
      <Destination
        isMobile={isMobile}
        openDestinationModal={openDestinationModal}
        selectedDestini={selectedDestini}
        selectedDestini1={selectedDestini1}
        selectedDestini2={selectedDestini2}
        destinationVisible={destinationVisible}
        closeDestinationModal={closeDestinationModall}
        selectedAddress={selectedAddress}
      />

      <div
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: theme.GRAY_03,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <p style={{ fontWeight: "bold" }}>핸드폰인증</p>
        <PhoneVertify
          phone={phone}
          sendToPhone={sendToPhone}
          inputPhone={inputPhone}
          setInputPhone={setInputPhone}
          verifyPhone={verifyPhone}
          inputverti={inputverti}
          setInputVerti={setInputVerti}
          vertifyAuthNem={vertifyAuthNem}
        />
      </div>
      <MuitiOrderPrice
        price={price}
        discount={discount}
        orderAmount={orderAmount}
        eventdiscount={eventdiscount}
        totalPrice={totalPrice}
        menulength={totalSaladAmount + totalfruitAmount}
        serviceLength={serviceLength}
      />
      <PayButton isPossible={isPossible} linkData={linkData} />
      <ToastContainer autoClose={3000} />
    </div>
  );
};
