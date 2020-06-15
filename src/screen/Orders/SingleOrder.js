import React from "react";

import theme from "../../styles/theme";
import moment from "moment";
import { Modal } from "antd";

import api from "../../api/api";

import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";

import { checkPhone } from "../../redux/usersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OrderPrice from "../../component/Order/OrderPrice";
import PayButton from "../../component/Order/PayButton";
import PhoneVertify from "../../component/Order/PhoneVertify";

import MutilOrderSelectMenu from "../../component/Order/MutilOrderSelectMenu";
import Calender from "../../component/Calender/Calender";
import Destination from "../../component/Destination/Destination";

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
  const [inputPhone, setInputPhone] = React.useState();
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
  const [fromCalender, setFromCalender] = React.useState();

  const [saladAmount, setSaladAmount] = React.useState(0);
  const [fruitAmount, setFruitAmount] = React.useState(0);
  const [saladprice, setSaladPrice] = React.useState(0);
  const [fruitprice, setFruitPrice] = React.useState(0);
  const [deliverPrice, setDeliverPrice] = React.useState(0);
  // const [discount, setDiscount] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  //
  const [menudata, setMenuData] = React.useState([]);
  const [sendToPhone, setsendToPhone] = React.useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const openDestinationModal = () => {
    setDestinationVisible(true);
  };

  const closeDestinationModal = () => {
    setDestinationVisible(false);
  };
  // 시간 3시이전 이후 판단
  const isTimeLimit = today.isBefore(
    moment(`${today.format("YYYY-MM-DD")}T15:00`)
  );

  React.useState(() => {
    if (isTimeLimit) {
      setToday(moment().add(1, "day"));
    } else {
      setToday(moment().add(2, "day"));
    }
  }, []);

  const selectedAddress = (address) => {
    console.log(address);
    setSelectedDestini(address.address);
    setSelectedZoneCode(address.zonecode);
    setSelectedDestini1(address.room);
    setSelectedDestini2(address.etc);
    setDestinationVisible(false);
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

  const vertifyAuthNem = () => {
    if (vertiNum === inputverti) {
      console.log("인증되었습니다.", inputPhone);
      setIsVertifyPhone(true);
      dispatch(checkPhone(inputPhone));
    }
    console.log("인증", inputverti, inputPhone, vertiNum);
  };
  React.useEffect(() => {
    console.log(inputPhone);
  }, [inputPhone]);
  React.useEffect(() => {
    if (
      name &&
      email &&
      selectedDestini &&
      zonecode &&
      menudata &&
      totalPrice
    ) {
      let address1 = selectedDestini1 ? selectedDestini1 : "";
      let etc = selectedDestini2 ? selectedDestini2 : "";
      setLinkData({
        orderType: "일반주문",
        orderer: name,
        phone: phone,
        email: email,
        address: selectedDestini,
        zonecode,
        address1,
        etc,
        menudata,
        orderdate: moment().format("lll"),
        totalPrice,
      });
      console.log("가능");
      setIsPossible(true);
    } else {
      console.log("불가능");
      setIsPossible(false);
    }
  }, [
    name,
    phone,
    email,
    selectedDestini,
    selectedDestini1,
    selectedDestini2,
    menudata,
    totalPrice,
    zonecode,
  ]);

  React.useEffect(() => {
    console.log("가능", isPossible);
  }, [isPossible]);

  const getSelectedData = (data) => {
    console.log("프롴캘린더", data);
    setMenuData(data);
  };

  React.useEffect(() => {
    console.log("메뉴데이터 변경");
    console.log(menudata);
    if (menudata.length > 0) {
      let saldP = menudata[0].saladAmount * 8000;
      let fruitP = menudata[0].fruitAmount * 6000;
      setSaladAmount(menudata[0].saladAmount);
      setFruitAmount(menudata[0].fruitAmount);
      setSaladPrice(saldP);
      setFruitPrice(fruitP);
      if (0 < saldP + fruitP && saldP + fruitP < 30000) {
        setDeliverPrice(3000);
      } else if (30000 <= saldP + fruitP) {
        setDeliverPrice(0);
      }
    }
  }, [menudata]);
  React.useEffect(() => {
    setTotalPrice(saladprice + fruitprice + deliverPrice);
  }, [saladprice, fruitprice, deliverPrice]);

  const selectedSalad = ({ type, menudata, index, setMenuData }) => {
    let newArr = [...menudata];
    if (newArr[0].saladAmount > 0 && type === "minus") {
      console.log("삭제", newArr[0]);
      if ([newArr[0]].fruitAmount === 0 && [newArr[0]].saladAmount - 1 === 0) {
        console.log("dfadfafdadsf");
        [newArr[0]].ispossibe = false;
        toast.error("두 매뉴중 하나는 최소 1개 이상이어야 합니다.");
      }
      newArr[0].saladAmount = newArr[0].saladAmount - 1;

      return setMenuData(newArr);
    } else if (type === "plus") {
      console.log("추가", newArr[0]);
      newArr[0].saladAmount = newArr[0].saladAmount + 1;
      newArr[0].ispossibe = true;
      return setMenuData(newArr);
    }
  };
  const selectedFruit = ({ type, menudata, index, setMenuData }) => {
    let newArr = [...menudata];
    if (newArr[0].fruitAmount > 0 && type === "minus") {
      console.log("삭제", newArr);
      if (newArr[0].saladAmount === 0 && newArr[0].fruitAmount - 1 === 0) {
        console.log("dfadfafdadsf");
        newArr[0].ispossibe = false;
        toast.error("두 매뉴중 하나는 최소 1개 이상이어야 합니다.");
      }
      newArr[0].fruitAmount = newArr[0].fruitAmount - 1;

      return setMenuData(newArr);
    } else if (type === "plus") {
      console.log("추가", newArr);
      newArr[0].fruitAmount = newArr[0].fruitAmount + 1;
      newArr[0].ispossibe = true;
      return setMenuData(newArr);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        padding: 15,
      }}
    >
      <div
        style={{
          width: "100%",
          padding: 20,
          backgroundColor: theme.GRAY_02,
          borderRadius: 5,
        }}
      >
        <p style={{ fontWeight: "bold" }}>배송일</p>
        <div
          onClick={openModal}
          style={{
            marginTop: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            borderWidth: 0.5,
            borderColor: theme.PRIMARY_04,
            padding: 10,
            borderRadius: 5,
            backgroundColor: "white",
          }}
        >
          <div style={{ color: "white" }}>
            {menudata.length > 0 ? (
              <p style={{ color: theme.PRIMARY_04 }}>
                {moment(menudata[0].date).format("YYYY년 MM월 DD일")}
              </p>
            ) : (
              <p style={{ color: theme.PRIMARY_04 }}>배송일를 선택 해주세요.</p>
            )}
          </div>
        </div>
      </div>

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
          singleOrder
          getdata={getSelectedData}
          setModal={setModalVisible}
        />
      </Modal>
      {menudata[0] && (
        <div
          style={{
            width: "100%",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            backgroundColor: theme.GRAY_02,
            borderRadius: 5,
          }}
        >
          <p style={{ fontWeight: "bold" }}>메뉴선택</p>

          <div
            style={{
              width: "100%",
              marginTop: 3,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <MutilOrderSelectMenu
              item={menudata[0].salad}
              amount={menudata[0].saladAmount}
              selectedSaladPlus={selectedSalad}
              menudata={menudata}
              setMenuData={setMenuData}
            />
            <MutilOrderSelectMenu
              item={menudata[0].fruit}
              amount={menudata[0].fruitAmount}
              selectedSaladPlus={selectedFruit}
              menudata={menudata}
              setMenuData={setMenuData}
            />
          </div>
        </div>
      )}
      <Destination
        isMobile={isMobile}
        openDestinationModal={openDestinationModal}
        selectedDestini={selectedDestini}
        selectedDestini1={selectedDestini1}
        selectedDestini2={selectedDestini2}
        destinationVisible={destinationVisible}
        closeDestinationModal={closeDestinationModal}
        selectedAddress={selectedAddress}
      />

      <div
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: theme.GRAY_02,
          borderRadius: 5,
          marginTop: 15,
        }}
      >
        <span style={{ fontWeight: "bold" }}>핸드폰인증</span>
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

      <OrderPrice
        saladprice={saladprice}
        saladAmount={saladAmount}
        fruitAmount={fruitAmount}
        fruitprice={fruitprice}
        deliverPrice={deliverPrice}
        totalPrice={totalPrice}
      />
      <PayButton isPossible={isPossible} linkData={linkData} />
      <ToastContainer autoClose={3000} />
    </div>
  );
};
