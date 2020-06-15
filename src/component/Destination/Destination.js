import React from "react";
import { Modal } from "antd";
import { useMediaQuery } from "react-responsive";
import theme from "../../styles/theme";
import DestinationComponent from "../../component/Destination/DestinationComponent";

export default ({
  openDestinationModal,
  selectedDestini,
  selectedDestini1,
  selectedDestini2,
  destinationVisible,
  closeDestinationModal,
  selectedAddress,
}) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <div
      style={{
        width: "100%",
        padding: 20,
        backgroundColor: theme.GRAY_02,
        borderRadius: 5,
        marginTop: 15,
      }}
    >
      <p style={{ fontWeight: "bold" }}>배송지</p>
      <button
        onClick={() => openDestinationModal()}
        style={{
          marginTop: 10,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 0.5,
          borderColor: theme.PRIMARY_04,
          padding: 10,
          borderRadius: 5,
          outline: 0,
          backgroundColor: "white",
        }}
      >
        <div style={{ color: theme.PRIMARY_04 }}>
          {selectedDestini ? (
            <div>
              <p>{selectedDestini}</p>
              {selectedDestini1 && <p>상세주소: {selectedDestini1}</p>}
              {selectedDestini2 && <p>공동현관 : {selectedDestini2}</p>}
            </div>
          ) : (
            <p>배송지를 선택하세요.</p>
          )}
        </div>
      </button>
      <Modal
        title="배송지 관리"
        visible={destinationVisible}
        style={{ top: isMobile ? 10 : 100 }}
        width={isMobile ? "100%" : "50%"}
        bodyStyle={{ padding: isMobile ? 3 : 10 }}
        footer={null}
        mask
        maskClosable
        onCancel={() => closeDestinationModal(false)}
      >
        <DestinationComponent
          selectedAddress={(address) => selectedAddress(address)}
        />
      </Modal>
    </div>
  );
};
