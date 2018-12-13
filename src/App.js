import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import actions from "./actions";
import CandidateList from "./CandidateList";
import ShowSelected from "./ShowSelected";
import CheckoutOrder from "./CheckoutOrder";
import { getCandidateList, isReArranged } from "./selectors";

class App extends Component {
  componentDidMount() {
    const { fetchJokes, setCandidates } = this.props;
    setCandidates();
    fetchJokes();
  }

  render() {
    const {
      reArrangeSelectedCandidates,
      reArranged,
      candidateList
    } = this.props;

    return (
      <div className="app">
        <ShowSelected />
        <div className="content">
          {reArranged ? (
            <CheckoutOrder />
          ) : (
            <div>
              <h3>Candidates:</h3>
              <CandidateList candidates={candidateList} />
              <button type="button" onClick={reArrangeSelectedCandidates}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
App.propTypes = {
  fetchJokes: PropTypes.func.isRequired,
  reArrangeSelectedCandidates: PropTypes.func.isRequired,
  setCandidates: PropTypes.func.isRequired,
  reArranged: PropTypes.bool.isRequired,
  candidateList: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      name: PropTypes.string,
      imageUrl: PropTypes.string,
      quote: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = state => ({
  reArranged: isReArranged(state),
  candidateList: getCandidateList(state)
});

const mapDispatchToProps = dispatch => ({
  fetchJokes: () => dispatch(actions.fetchJokesRequest()),
  reArrangeSelectedCandidates: () =>
    dispatch(actions.reArrangeSelectedCandidates()),
  setCandidates: () => dispatch(actions.setCandidates())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
