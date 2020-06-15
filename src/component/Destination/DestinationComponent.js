import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/api";
import theme from "../../styles/theme";

import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

export default ({ selectedAddress }) => {
  const { token } = useSelector((state) => state.usersReducer);
  const [selectedIndex, setindex] = React.useState();
  // 주소찾기
  const [address, setaddress] = React.useState("");
  // 우편번호
  const [postcode, setPostcode] = React.useState("");
  // 카카오주소변화
  const [getAddress, setAddress] = React.useState([]);
  // 배달가능여부추가
  const [finalAddress, setFinalAddress] = React.useState();
  // 유저 배송지
  const [serveradd, setServerAdd] = React.useState([]);

  const [detailAddress, setDetailAddress] = React.useState();
  const [enterNum, setEnterNum] = React.useState();

  const getPostcode = async ({ address, zonecode }) => {
    if (zonecode) {
      await api.postcode({ zonecode }).then((result) => {
        // console.log(result);
        if (result.data[0]) {
          console.log("가능");
          setFinalAddress({ address, zonecode, ispossible: true });
        } else {
          console.log("불가능");
          setFinalAddress({ address, zonecode, ispossible: false });
        }
        // setBase(result.data);
      });
    } else {
      console.log("주소를 입력하세요");
    }
  };
  const API_KEY = process.env.REACT_APP_KOKAO_LOCAL_KEY;

  const findAddress = async (address) => {
    try {
      fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
        {
          headers: {
            Authorization: `KakaoAK ${API_KEY}`,
          },
        }
      )
        .then((response) => response.json())
        .then((addressArray) => {
          if (addressArray) {
            // 배열 여러개 나옴
            console.log(addressArray);
            let address = [];
            for (let i = 0; i < addressArray.documents.length; i++) {
              if (addressArray.documents[i].road_address) {
                let newaddress = {
                  zonecode: addressArray.documents[i].road_address.zone_no,
                  address: addressArray.documents[i].road_address.address_name,
                };

                address.push(newaddress);
              }
            }
            setAddress(address);
          }
        });
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  React.useEffect(() => {
    console.log("newaddress", getAddress);
  }, [getAddress]);
  const getServerAdd = async () => {
    console.log("토큰", token);
    console.log(typeof token);
    await api.userdestination(token).then((result) => {
      console.log("배송지", result.data);
      setServerAdd(result.data);
    });
  };
  React.useEffect(() => {
    getServerAdd();
  }, []);

  const seledtedAddress = ({ address, zonecode }) => {
    console.log({ address, postcode });
    getPostcode({ address, zonecode });
  };

  const clickAddDestinaion = async () => {
    try {
      await api
        .destination({
          token,
          form: {
            address: finalAddress.address,
            zonecode: finalAddress.zonecode,
            room: detailAddress,
            etc: enterNum,
          },
        })
        .then((result) => {
          console.log(result);
          getServerAdd();
        });
    } catch (e) {
      console.log(e);
    }
  };
  const deletedAddress = async (itemid) => {
    try {
      await api.deletedestination({ itemid, token }).then((result) => {
        console.log(result);
      });
      getServerAdd();
    } catch (e) {}
  };

  return (
    <div
      style={{
        padding: 10,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ marginTop: 20 }}>배송지 검색</p>
      <div style={{ flex: 4 }}>
        <input
          placeholder="주소를 검색하세요"
          style={{
            width: "70%",
            marginTop: 10,
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 10,
          }}
          type="text"
          name="address"
          value={address}
          onChange={({ target: { value } }) => setaddress(value)}
        />
        <button
          onClick={() => {
            if (address) {
              findAddress(address);
            }
          }}
          style={{
            borderWidth: 0.5,
            marginLeft: 20,
            flex: 1,
            backgroundColor: theme.PRIMARY_04,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <p style={{ color: "white" }}>주소 검색</p>
        </button>
      </div>
      {getAddress.length > 0 && (
        <div
          style={{
            width: "100%",
            marginTop: 10,
            backgroundColor: theme.GRAY_03,
            padding: 10,
            borderRadius: 10,
          }}
        >
          {getAddress.map((itme, index) => {
            return (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                  onClick={() => {
                    setindex(index);
                    seledtedAddress({
                      address: itme.address,
                      zonecode: itme.zonecode,
                    });
                  }}
                >
                  {selectedIndex === index ? (
                    <MdRadioButtonChecked size={24} />
                  ) : (
                    <MdRadioButtonUnchecked size={24} />
                  )}
                  <p style={{ marginLeft: 10 }}>{itme.address}</p>
                </button>
                {finalAddress ? (
                  <>
                    {finalAddress.address === itme.address && (
                      <div>
                        {finalAddress.ispossible ? (
                          <div style={{ marginTop: 10 }}>
                            <p style={{ color: theme.PRIMARY_04 }}>
                              배송 가능한 지역입니다.
                            </p>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: 10,
                              }}
                            >
                              <label>동 호수 입력</label>
                              <input
                                placeholder="상세 주소를 입력하세요.(예:2층 안쪽 집)"
                                style={{
                                  width: "100%",
                                  borderWidth: 0.5,
                                  borderRadius: 10,
                                  padding: 10,
                                }}
                                type="text"
                                name="detailAddress"
                                value={detailAddress}
                                onChange={({ target: { value } }) =>
                                  setDetailAddress(value)
                                }
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: 10,
                              }}
                            >
                              <label>공동현관 비밀번호</label>
                              <input
                                placeholder="공동현관의 비밀번호를 입력하세요."
                                style={{
                                  width: "100%",
                                  borderWidth: 0.5,
                                  borderRadius: 10,
                                  padding: 10,
                                }}
                                type="text"
                                name="enterNum"
                                value={enterNum}
                                onChange={({ target: { value } }) =>
                                  setEnterNum(value)
                                }
                              />
                            </div>
                            <button
                              style={{
                                marginTop: 20,
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: theme.PRIMARY_04,
                                padding: 10,
                                borderRadius: 10,
                                color: "white",
                              }}
                              onClick={() => clickAddDestinaion()}
                            >
                              배송지로 추가
                            </button>
                          </div>
                        ) : (
                          <p
                            style={{
                              marginTop: 10,
                              color: theme.SECONDARY_COLOR02,
                            }}
                          >
                            배송 불가능한 지역입니다.
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
      <div
        style={{
          width: "100%",
          marginTop: 30,
          backgroundColor: theme.GRAY_03,
          minHeight: 400,
          padding: 10,
          borderRadius: 10,
        }}
      >
        {serveradd.length > 0 ? (
          <div style={{ width: "100%" }}>
            {serveradd.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    padding: 10,
                    backgroundColor: "white",
                    marginBottom: 10,
                    borderRadius: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <button onClick={() => selectedAddress(item)}>
                    <p>{item.address}</p>
                  </button>
                  <button onClick={() => deletedAddress(item.id)}>삭제</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p>배송지가 없습니다.</p>
            <p>배송지 검색을 통해서 추가해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};
