import axios from "axios";

const callApi = async (method, path, data, token, params = {}) => {
  console.log(typeof token);
  const headers = {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
  console.log("헤더", headers);
  const baseUrl = process.env.SERVER_API_URL;
  const fullUrl = `${baseUrl}${path}`;
  if (method === "get" || method === "delete") {
    return axios[method](fullUrl, { headers, params });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};
export default {
  // 유저로그인
  serverlogin: (form) => {
    console.log(form);
    return callApi("post", "/users/login/", form);
  },
  //유저정보
  user: ({ id, token }) => callApi("get", `/users/${id}/`, null, token),
  //유저정보
  userUpdate: ({ id, form, token }) => {
    console.log({ id, form, token });
    return callApi("put", `/users/${id}/`, form, token, null);
  },
  //유저정보
  postcode: ({ zonecode }) =>
    callApi("get", `/postcode/?postcode=${zonecode}`, null, null, null),
  // 메뉴일정
  calender: ({ startday, endday }) => {
    console.log(startday, endday);
    return callApi(
      "get",
      `/calender/month/search?start_date=${startday}&end_date=${endday}`,
      null,
      null,
      null
    );
  },
  // 메뉴 날 검색

  menuByday: ({ year, month, day }) =>
    callApi(
      "get",
      `/calender/day?year=${year}&month=${month}&date=${day}`,
      null,
      null,
      null
    ),
  // destination add
  destination: ({ form, token }) => {
    console.log({ form, token });
    return callApi("post", `/destinations/`, form, token);
  },
  // destination add
  userdestination: (token) =>
    callApi("get", `/destinations/`, null, token, null),
  // destination delete
  deletedestination: ({ itemid, token }) => {
    console.log({ itemid, token });
    return callApi("delete", `/destinations/${itemid}/`, null, token, null);
  },
  // SMS
  sendsms: (form) => callApi("post", "/users/sendsms/", form),
  // 구입계좌이체
  sendOrderTypeAccount: (form) => callApi("post", "/users/sendTrans/", form),
  // 샐러드가져오기
  getSalad: () => callApi("get", `/salad/`, null, null, null),
  // 샐러드가져오기
  createOrder: (form) => callApi("post", `/order/`, form, null, null),
};
