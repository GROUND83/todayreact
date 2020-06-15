import * as React from "react";
import { Helmet } from "react-helmet";
import ScreenWrap from "../component/ScreenWrap";
import api from "../api/api";
import theme from "../styles/theme";
import SaladWrap from "../component/SaladWrap";

export default () => {
  const [salad, setSalad] = React.useState();
  const getSalad = async () => {
    await api.getSalad().then((result) => {
      if (result.status === 200) {
        console.log(result.data);
        setSalad(result.data);
      }
    });
  };
  React.useEffect(() => {
    getSalad();
  }, []);
  return (
    <ScreenWrap>
      <Helmet>
        <meta charSet="utf-8" />
        <title>투데이샐러드 | 샐러드</title>
      </Helmet>
      <div style={{ marginTop: 10 }}>
        <h1 style={{ fontWeight: "bold" }}>샐러드 메뉴</h1>
      </div>

      {salad ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: 10,
          }}
        >
          {salad.map((item, index) => (
            <SaladWrap
              item={item}
              index={index}
              isLast={salad.length === index + 1}
            />
          ))}
        </div>
      ) : null}
    </ScreenWrap>
  );
};
