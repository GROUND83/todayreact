import React from "react";
import moment from "moment";
import { Modal, Spin } from "antd";
import styled from "styled-components";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import theme from "../../styles/theme";
import api from "../../api/api";
import ScreenWrap from "../ScreenWrap";
import SaladWrapClander from "../SaladWrapClander";

export default ({
  menu,
  singleOrder,
  getdata,
  setModal,
  multiOrder,
  groupOrder,
}) => {
  const [saladCalenderstate, setSaladCalender] = React.useState([]);
  const [today, setToday] = React.useState(moment());
  const [calenderEvent, setCalenderEvent] = React.useState([]);
  const [clickData, setClickData] = React.useState();
  const [seleted, setSelected] = React.useState(today);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // 멀티오더
  const [selectedArray, setSelectedArray] = React.useState([]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  React.useEffect(() => {
    const getCalender = async () => {
      let startdata = today
        .clone()
        .subtract(1, "month")
        .startOf("month")
        .format("YYYY-MM-DD");

      setLoading(true);
      try {
        await api
          .calender({
            startday: startdata,
            endday: today.clone().add(1, "month").format("YYYY-MM-DD"),
          })
          .then((result) => {
            setCalenderEvent(result.data);
            setLoading(false);
          });
      } catch (e) {
      } finally {
      }
    };

    getCalender();
  }, [today]);

  const baseDay = moment();
  const startWeek = today.clone().startOf("month").week();
  const endWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  React.useEffect(() => {
    let saladCalender = [];

    for (let week = startWeek; week <= endWeek; week++) {
      let a = Array(7)
        .fill(0)
        .map((n, i) => {
          let current = today
            .clone()
            .week(week)
            .startOf("week")
            .add(n + i, "day");

          let newCurrent = current.format("YYYY-MM-DD");
          // console.log(current);
          let v = calenderEvent.findIndex((item) =>
            current.isSame(moment(item.day))
          );
          // console.log(v);
          if (i !== 0) {
            if (v > -1) {
              // console.log(v);
              return {
                date: newCurrent,
                salad: calenderEvent[v].salad,
                fruit: calenderEvent[v].fruit,
                easyfood: calenderEvent[v].easyfood,
                holiday: calenderEvent[v].holiday,
              };
            } else {
              return { date: newCurrent, salad: "", fruit: "", easyfood: "" };
            }
          }
        });
      saladCalender.push({ week, days: a });
    }
    setSaladCalender(saladCalender);
    // console.log(saladCalender);
  }, [calenderEvent, endWeek, startWeek, today]);

  const clickday = (day) => {
    // console.log("클릭", day);
    setClickData(day);
    setSelected(day.date);

    if (menu) {
      // 메뉴컬린더
      openModal();
    } else if (singleOrder) {
      // 싱글오더
      getdata([
        {
          salad: day.salad,
          fruit: day.fruit,
          date: day.date,
          saladOrder: true,
          fruitOrder: true,
          saladAmount: 1,
          fruitAmount: 1,
        },
      ]);
      setModal(false);
    } else if (multiOrder) {
      // 멀티오더
      if (!day.salad && day.holiday) {
        setClickData({ holiday: day.holiday });
      } else if (day.salad) {
        let find = selectedArray.findIndex((array) => array.date === day.date);

        if (find <= -1) {
          setSelectedArray((seletedArray) => [
            ...seletedArray,
            {
              salad: day.salad,
              fruit: day.fruit,
              date: day.date,
              saladOrder: true,
              fruitOrder: true,
              saladAmount: 1,
              fruitAmount: 1,
            },
          ]);
        } else if (find > -1) {
          setSelectedArray((seletedArray) =>
            seletedArray.filter((array) => array.date !== day.date)
          );
        }
      } else if (!day.salad && day.holiday === undefined) {
        setClickData({ nothing: "아직 샐러드메뉴가 정해지지 않았습니다." });
      }
      setSelected(day.date);
    }
  };
  const reSet = () => {
    setSelectedArray([]);
  };

  const clickCheck = () => {
    if (selectedArray.length < 10) {
      toast.error("10회 이상 선택하여야 합니다.");
    } else if (selectedArray.length >= 10) {
      getdata(selectedArray);
      setModal(false);
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };
  React.useEffect(() => {
    // console.log("반영 클릭데이터", clickData);
  }, [clickData]);

  const weekofdays = ["월", "화", "수", "목", "금", "토"];
  const antIcon = <LoadingOutlined style={{ fontSize: 42 }} spin />;
  return (
    <div
      style={{
        width: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <div>
          <h1 style={{ fontSize: 18 }}>메뉴일정</h1>
        </div>
        <div
          style={{
            marginLeft: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
            borderColor: theme.PRIMARY_04,
            borderWidth: 0.5,
            padding: "3px 10px",
            borderRadius: 30,
          }}
        >
          <div
            onClick={() => {
              setToday(today.clone().subtract(1, "month"));
            }}
            style={{ marginRight: 20 }}
          >
            <AiFillCaretLeft size={24} color={theme.PRIMARY_04} />
          </div>
          <div style={{ marginRight: 20, color: theme.PRIMARY_04 }}>
            {today.format("YYYY년 MM월")}
          </div>
          <div onClick={() => setToday(today.clone().add(1, "month"))}>
            <AiFillCaretRight size={24} color={theme.PRIMARY_04} />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: 10,
          display: "flex",
          flexDirection: isMobile ? "column" : isDesktop ? "row" : "column",
          minHeight: "70vh",
          alignItems: isMobile ? "center" : isDesktop ? "flex-start" : "center",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <ul
            style={{
              marginTop: 3,
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {weekofdays.map((item, index) => {
              return (
                <li
                  key={index}
                  style={{
                    flex: 1,
                    borderColor: theme.GRAY_03,
                  }}
                >
                  <p style={{ textAlign: "center" }}>{item}</p>
                </li>
              );
            })}
          </ul>
          <div
            style={{
              marginTop: 10,
              backgroundColor: theme.GRAY_02,
              width: "100%",
            }}
          >
            {loading ? (
              <div
                style={{
                  flex: 1,
                  width: "100%",
                  minHeight: "70vh",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spin indicator={antIcon} />
              </div>
            ) : (
              <>
                {saladCalenderstate.map((weeks, index) => {
                  let newbaseDay = baseDay.format("YYYY-MM-DD");
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {weeks.days.map((day, index) => {
                        if (day !== undefined) {
                          // console.log(day);
                          const isToday = moment(newbaseDay).isSame(
                            moment(day.date)
                          );
                          const isbefore = moment(day.date).isBefore(
                            moment(newbaseDay)
                          );
                          // true 이면 오늘 포함 전일
                          // console.log("전일", isbefore, day.date);
                          const isSelected = moment(seleted).isSame(
                            moment(day.date)
                          );
                          let find =
                            multiOrder &&
                            selectedArray.findIndex(
                              (array) => array.date === day.date
                            );
                          return (
                            <DayView
                              isMobile={isMobile}
                              isTablet={isTablet}
                              isDesktop={isDesktop}
                              isbefore={isbefore}
                              onClick={() => {
                                if (isbefore) {
                                  return false;
                                } else {
                                  clickday(day);
                                }
                              }}
                              isSelected={
                                multiOrder ? find > -1 && true : isSelected
                              }
                              key={index}
                              style={{
                                flex: 1,
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                margin: 1,
                              }}
                            >
                              <DayText
                                isSelected={
                                  multiOrder ? find > -1 && true : isSelected
                                }
                                isToday={isToday}
                              >
                                {moment(day.date).format("DD")}
                              </DayText>
                              <div>
                                {day.holiday ? (
                                  <MenuText
                                    isSelected={
                                      multiOrder
                                        ? find > -1 && true
                                        : isSelected
                                    }
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    {day.holiday}
                                  </MenuText>
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <MenuText
                                      isSelected={
                                        multiOrder
                                          ? find > -1 && true
                                          : isSelected
                                      }
                                    >
                                      {day.salad.name}
                                    </MenuText>
                                    <MenuText
                                      isSelected={
                                        multiOrder
                                          ? find > -1 && true
                                          : isSelected
                                      }
                                    >
                                      {day.fruit.name}
                                    </MenuText>
                                    <MenuText
                                      isSelected={
                                        multiOrder
                                          ? find > -1 && true
                                          : isSelected
                                      }
                                    >
                                      {day.easyfood ? day.easyfood.name : null}
                                    </MenuText>
                                  </div>
                                )}
                              </div>
                            </DayView>
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        {/* 모바일 */}
        {isMobile && (
          <Modal
            title="메뉴"
            visible={modalVisible}
            width={"100vw"}
            style={{ top: 0, zIndex: 3000 }}
            bodyStyle={{ width: "100%", margin: 0, padding: 0 }}
            footer={null}
            onCancel={() => setModalVisible(false)}
            mask
            maskClosable
          >
            <div
              style={{
                flex: 1,
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              {clickData ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  {clickData.salad && (
                    <SaladWrapClander
                      item={clickData.salad}
                      index={1}
                      isMobile={isMobile}
                    />
                  )}
                  {!clickData.salad && !clickData.fruit && !clickData.esayfood && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        width: "100%",
                      }}
                    >
                      <p>일정이 비어 있습니다.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    width: "100%",
                  }}
                >
                  <p>일정을 선택해주세요.</p>
                </div>
              )}
            </div>
          </Modal>
        )}
        {isDesktop && (
          <div
            style={{
              flex: 1,
              marginLeft: 10,
              width: "100%",
              minHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            {clickData ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  width: "100%",
                }}
              >
                {clickData.salad && (
                  <SaladWrapClander item={clickData.salad} index={1} />
                )}
                {!clickData.salad && !clickData.fruit && !clickData.esayfood && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      width: "100%",
                    }}
                  >
                    <p>일정이 비어 있습니다.</p>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  width: "100%",
                }}
              >
                <p>일정을 선택해주세요.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ marginTop: 10 }}>
        {multiOrder && (
          <p style={{ fontWeight: "bold" }}>
            선택횟수 : {selectedArray.length}번
          </p>
        )}
      </div>
      <div
        style={{
          marginTop: 20,
          padding: "0px 10px",
          paddingBottom: 20,
          width: "100%",
          margin: "0px 10px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {multiOrder && (
          <div
            onClick={() => reSet()}
            style={{
              flex: 1,
              backgroundColor: theme.GRAY_04,
              padding: 10,
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              margin: 3,
            }}
          >
            <p>초기화</p>
          </div>
        )}
        {multiOrder && (
          <div
            onClick={() => clickCheck()}
            style={{
              flex: 1,
              backgroundColor: theme.PRIMARY_04,
              padding: 10,
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              margin: 3,
            }}
          >
            <p style={{ color: "white" }}>확인</p>
          </div>
        )}
      </div>
    </div>
  );
};
const DayView = styled.div`
  min-height: ${(props) =>
    props.isMobile ? "80px" : props.isTablet ? "80px" : "120px"};
  padding: 3px;
  border-radius: 3px;
  background-color: ${(props) =>
    props.isbefore
      ? theme.GRAY_03
      : props.isSelected
      ? theme.PRIMARY_04
      : "white"};
`;

const DayText = styled.span`
  padding: 2px;
  font-size: 1.2rem;
  border-radius: 10px;
  padding: 3px;
  font-weight: ${(props) => (props.isToday ? "700" : "200")};
  color: ${(props) => (props.isSelected ? "white" : theme.GRAY_08)};
  background-color: ${(props) =>
    props.isToday ? theme.PRIMARY_04 : "transparent"};
`;
const MenuText = styled.span`
  text-align: center;
  font-size: 1.2rem;
  color: ${(props) => (props.isSelected ? "white" : theme.GRAY_08)};
`;
