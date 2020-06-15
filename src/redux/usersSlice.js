import { createSlice } from "@reduxjs/toolkit";
import { start, end } from "./inProgressSlice";
import api from "../api/api";
import axios from "axios";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      console.log("액션");
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.email = action.payload.username;
      state.name = action.payload.first_name;
      state.destination = action.payload.destination;
      state.phone = action.payload.phone;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
    updataPhone(state, action) {
      return {
        ...state,
        phone: action.payload.phone,
      };
    },
  },
});

export const { logIn, logOut, updataPhone } = userSlice.actions;
export const checkPhone = (phone) => async (dispatch, getState) => {
  console.log("핸드폰인증확인", phone);
  const {
    usersReducer: { id, token },
  } = getState();
  await api
    .userUpdate({ id, form: { pk: id, phone: phone }, token })
    .then((result) => {
      if (result.status === 200) {
        dispatch(updataPhone({ phone: result.data.phone }));
      }
      console.log(result);
    });
};

export const KakaoLogin = (response) => async () => {
  console.log("카카오로그인", response);
};

export const KakaoLogout = () => async () => {
  console.log("카카오로그아웃");
};

export const userLogin = ({ history, response }) => async (dispatch) => {
  console.log("유저디스패치");
  console.log(response);
  let { kakao_account } = response;
  let userdata = {
    email: kakao_account.email && kakao_account.email,
    firstName: kakao_account.profile.nickname,
    policy: true,
    servicepolicy: true,
    phone: kakao_account.phone_number && kakao_account.phone_number,
  };
  console.log(userdata);
  console.log("서버로그인");

  const saveuser = await api
    .serverlogin(JSON.stringify(userdata))
    .then((result) => {
      console.log("서버에서 받은데이터", result.data);
      return result.data;
    });
  const { id, token } = saveuser;

  await api.user({ id, token }).then((result) => {
    console.log(result);
    if (result) {
      const {
        birthdate,
        destination,
        first_name,
        gender,
        id,
        phone,
        username,
      } = result.data;
      dispatch(
        logIn({
          token,
          birthdate,
          destination,
          first_name,
          gender,
          id,
          phone,
          username,
        })
      );
    }
  });
  history.replace("/");
  setTimeout(() => {
    dispatch(end());
  }, 2000);
};

export default userSlice.reducer;
