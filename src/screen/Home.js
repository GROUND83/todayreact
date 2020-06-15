import * as React from "react";
import { Helmet } from "react-helmet";
import Video from "../assets/backvideo.mp4";

export default () => {
  const [play, setPlay] = React.useState(false);
  const vidRef = React.useRef();

  const handlePlayVideo = () => {
    console.log("비디오스타트");
    vidRef.current.play();
  };
  React.useEffect(() => {
    return () => {
      console.log("비디오스타트");
      handlePlayVideo();
    };
  }, []);
  return (
    <div
      style={{
        flex: 1,
        overflow: "hidden",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>투데이샐러드 | 홈</title>
      </Helmet>

      <video
        ref={vidRef}
        autoPlay
        loop
        muted
        playsInline
        src={Video}
        type="video/mp4"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
          objectFit: "cover",
          filter: "contrast(1.7) brightness(0.4)",
        }}
      />

      <div style={{ transform: "translateY(-100%)", zIndex: 100 }}>
        <h1 style={{ color: "white", fontWeight: "300", fontSize: "2.2rem" }}>
          건강한 삶이 시작되는곳,
          <br />
          <span style={{ fontWeight: "bold", fontSize: "2.2rem" }}>
            투데이샐러드
          </span>
          가 함께 하겠습니다.
        </h1>
      </div>
    </div>
  );
};
