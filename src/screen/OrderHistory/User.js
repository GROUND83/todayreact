import React from "react";
import { useSelector, useDispatch } from "react-redux";
import theme from "../../styles/theme";
export default (props) => {
  const dispatch = useDispatch();
  const { name, id } = useSelector((state) => state.usersReducer);

  console.log(props);
  return (
    <div>
      <span
        style={{
          fontSize: 18,
          fontWeight: "bold",
          borderBottomWidth: 7,
          borderBottomColor: theme.SECONDARY_COLOR01,
        }}
      >
        {name}님
      </span>
    </div>
  );
};
