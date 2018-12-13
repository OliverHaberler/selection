import PropTypes from "prop-types";
import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import Candidate from "./Candidate";

const CandidateList = ({ candidates }) => (
  <ul>
    {candidates.map((candidate, index) => (
      <li key={candidate.get("name", index)} className="flex row align-center">
        <span className="list-index">{index + 1}.</span>
        <Candidate candidate={candidate} />
      </li>
    ))}
  </ul>
);

CandidateList.defaultProps = {};

CandidateList.propTypes = {
  candidates: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      name: PropTypes.string,
      imageUrl: PropTypes.string
    })
  ).isRequired
};

export default CandidateList;
