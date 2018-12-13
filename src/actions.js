import constants from "./constants";

const {
  FETCH_JOKES_REQUEST,
  FETCH_JOKES_SUCCESS,
  FETCH_JOKES_FAILURE,
  SELECT_CANDIDATE,
  RE_ARRANGE_SELECTED_CANDIDATES,
  SET_CANDIDATES
} = constants;

const fetchJokesRequest = numberOfJokes => ({
  type: FETCH_JOKES_REQUEST,
  numberOfJokes
});

const fetchJokesSuccess = jokes => ({
  type: FETCH_JOKES_SUCCESS,
  jokes
});

const fetchJokesFailure = error => ({
  type: FETCH_JOKES_FAILURE,
  error
});

const selectCandidate = candidate => ({
  type: SELECT_CANDIDATE,
  candidate
});

const reArrangeSelectedCandidates = () => ({
  type: RE_ARRANGE_SELECTED_CANDIDATES
});

const setCandidates = () => ({
  type: SET_CANDIDATES
});

export default {
  fetchJokesRequest,
  fetchJokesSuccess,
  fetchJokesFailure,
  selectCandidate,
  reArrangeSelectedCandidates,
  setCandidates
};
