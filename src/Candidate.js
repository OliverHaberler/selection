import PropTypes from "prop-types";
import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import actions from "./actions";
import { isSelected, isReArranged } from "./selectors";

const Candidate = ({ candidate, selectCandidate, selected, reArranged }) => (
  <div
    className={`candidate flex column ${reArranged ? "re-arranged" : ""}`}
    onClick={reArranged ? undefined : selectCandidate}
    onKeyPress={reArranged ? undefined : selectCandidate}
    tabIndex={0}
    role="button">
    <h3>
      {candidate.get("name", "")}
      {selected && <i className="check-mark">&#x2713;</i>}
    </h3>
    <div className="flex row">
      <img src={candidate.get("imageUrl", "")} alt="candidate" />
      <span>My favorite joke: {candidate.get("quote", "")}</span>
    </div>
  </div>
);

const mapStateToProps = (state, { candidate }) => ({
  selected: isSelected(state, candidate.get("name", "")),
  reArranged: isReArranged(state)
});

const mapDispatchToProps = (dispatch, { candidate }) => ({
  selectCandidate: () => dispatch(actions.selectCandidate(candidate))
});

Candidate.defaultProps = {};

Candidate.propTypes = {
  candidate: ImmutablePropTypes.mapContains({
    name: PropTypes.string,
    imageUrl: PropTypes.string
  }).isRequired,
  selectCandidate: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  reArranged: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Candidate);
