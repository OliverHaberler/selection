import PropTypes from "prop-types";
import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import CandidateList from "./CandidateList";
import { getCheckoutOrderState } from "./selectors";

const CheckoutOrder = ({ checkoutOrder }) => (
  <div className="checkout-order">
    <h2>Result of selection:</h2>
    <CandidateList candidates={checkoutOrder} />
  </div>
);

const makeMapStateToProps = () => {
  const getCheckoutOrder = getCheckoutOrderState();
  return state => ({
    checkoutOrder: getCheckoutOrder(state)
  });
};

CheckoutOrder.propTypes = {
  checkoutOrder: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      quote: PropTypes.string
    })
  ).isRequired
};

export default connect(makeMapStateToProps)(CheckoutOrder);
