import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { getSelected } from "./selectors";

const ShowSelected = ({ selected }) => (
  <div className="show-selected flex column align-center fixed">
    <h3>Your selection:</h3>
    <ul>
      {selected.toList().map((candidate, index) => (
        <li key={candidate.get("name", index)}>{`${index + 1}. ${candidate.get(
          "name",
          ""
        )}`}</li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  selected: getSelected(state)
});

ShowSelected.propTypes = {
  selected: ImmutablePropTypes.mapContains({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    quote: PropTypes.string
  }).isRequired
};

export default connect(mapStateToProps)(ShowSelected);
