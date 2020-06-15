import CheckOutContainer from "./CheckOutContainer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addOrder } from "../../redux/paymentSlice";

function mapDispatchToProps(dispatch) {
  return {
    getRooms: (page) => dispatch(addOrder(page)),
  };
}

function mapStateToProps(state) {
  return state.paymenReducer;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CheckOutContainer));
