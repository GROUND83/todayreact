import { createSlice } from "@reduxjs/toolkit";
import { start, end } from "./inProgressSlice";
import api from "../api/api";

const paymentSlice = createSlice({
  name: "paymet",
  initialState: {
    orders: null,
  },
  reducers: {
    addOrder(state, action) {
      console.log("액션");
    },
  },
});

export const { addOrder } = paymentSlice.actions;

const Order = (item) => {
  return new Promise(async (resolve) => {
    console.log(item);
    await api.createOrder(item).then((result) => {
      console.log(result);
      resolve();
    });
  });
};
const OrderFruit = (item) => {
  return new Promise(async (resolve) => {
    console.log(item);
    await api.createOrder(item).then((result) => {
      console.log(result);
      resolve();
    });
  });
};
export const createOrder = ({ merchant_uid, orderdata }) => async (
  dispatch,
  getState
) => {
  // 싱글 ?  멀티?
  let newsaladdata = [];
  let newfruitdata = [];
  console.log("오더콜백", merchant_uid, orderdata);
  orderdata.menudata.map((item, index) => {
    if (item.saladOrder || item.fruitOrder) {
      newsaladdata.push({
        number: `${index + 1}/${orderdata.menudata.length}`,
        deliveryDate: item.date,
        user: orderdata.orderer,
        salad: item.salad.id,
        saladAmount: item.saladAmount,
        merchant_uid: merchant_uid,
        orderType: orderdata.orderType,
        address: orderdata.address,
        address1: orderdata.address1,
        tel: orderdata.phone,
        etc: orderdata.etc,
      });
      newfruitdata.push({
        number: `${index + 1}/${orderdata.menudata.length}`,
        deliveryDate: item.date,
        user: orderdata.orderer,
        fruit: item.fruit.id,
        fruitAmount: item.fruitAmount,
        merchant_uid: merchant_uid,
        orderType: orderdata.orderType,
        address: orderdata.address,
        address1: orderdata.address1,
        tel: orderdata.phone,
        etc: orderdata.etc,
      });
    }
  });

  let data = {
    merchant_uid: merchant_uid,
    orderType: orderdata.orderType,
    address: orderdata.address,
    address1: orderdata.address1,
    tel: orderdata.phone,
    etc: orderdata.etc,
    saladorder: newsaladdata.length > 0 ? newsaladdata : false,
    fruitorder: newfruitdata.length > 0 ? newfruitdata : false,
  };
  if (data.saladorder) {
    const promises = data.saladorder.map((item) => Order(item));
    await Promise.all(promises);
    console.log("done");
  }
  if (data.fruitorder) {
    const promises = data.fruitorder.map((item) => OrderFruit(item));
    await Promise.all(promises);
    console.log("done");
  }
  // 날짜별 정렬
  // 1.오더타입판단
  // 2.오더메뉴 샐러드 과일박스 판단
  // 3. 샐러드 api호출
  // 4. 과일박스 api 호출

  console.log(data);
};
export default paymentSlice.reducer;

// let data = {
//    v: 17000,
//   apply_num: "",
//   bank_code: None,
//   bank_name: None,
//   buyer_addr: "제주특별자치도 제주시 연수로2길 24-6-2층",
//   buyer_email: "todaysalad@daum.net",
//   buyer_name: "투데이샐러드",
//   buyer_postcode: "63259",
//   buyer_tel: "01067090956",
//   cancel_amount: 0,
//   cancel_history: [],
//   cancel_reason: None,
//   cancel_receipt_urls: [],
//   cancelled_at: 0,
//   card_code: None,
//   card_name: None,
//   card_number: None,
//   card_quota: 0,
//   card_type: None,
//   cash_receipt_issued: False,
//   channel: "pc",
//   currency: "KRW",
//   custom_data: None,
//   customer_uid: None,
//   customer_uid_usage: None,
//   escrow: False,
//   fail_reason: None,
//   failed_at: 0,
//   imp_uid: "imp_532004224728",
//   merchant_uid: "mid_1592111004016",
//   name: "일반주문-꽃맛살샐러드 제철과일박스",
//   paid_at: 1592111024,
//   pay_method: "point",
//   pg_id: "TC0ONETIME",
//   pg_provider: "kakaopay",
//   pg_tid: "T2772223595521005751",
//   receipt_url:
//     "https://mockup-pg-web.kakao.com/v1/confirmation/p/T2772223595521005751/24d37714f228344491bed9929316a5dd1ee04c9b01cd96befc6474e3b7a9a1f3",
//   started_at: 1592111004,
//   status: "paid",
//   user_agent:
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
//   vbank_code: None,
//   vbank_date: 0,
//   vbank_holder: None,
//   vbank_issued_at: 0,
//   vbank_name: None,
//   vbank_num: None,
// };
