import React from "react";
import { useSelector, useDispatch } from "react-redux";
export default () => {
  const dispatch = useDispatch();
  const { name, id, destination } = useSelector((state) => state.usersReducer);

  return (
    <div>
      <p>배송지 관리</p>
      {destination.length > 0 && (
        <div>
          <p>주소</p>
        </div>
      )}
    </div>
  );
};
