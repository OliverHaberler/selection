import { fromJS, OrderedMap } from "immutable";
import constants from "./constants";
import candidatesList from "./candidates";

const {
  FETCH_JOKES_REQUEST,
  FETCH_JOKES_SUCCESS,
  FETCH_JOKES_FAILURE,
  SELECT_CANDIDATE,
  RE_ARRANGE_SELECTED_CANDIDATES,
  SET_CANDIDATES
} = constants;

const initialState = fromJS({
  candidates: [],
  selected: OrderedMap(),
  reArranged: false
});

const shuffleArray = array => {
  const shuffledArray = array.withMutations(candidates => {
    candidates.forEach((candidate, index) => {
      const newIndex = Math.floor(Math.random() * (index + 1));
      candidates.set(index, candidates.get(newIndex));
      candidates.set(newIndex, candidate);
    });
  });
  return shuffledArray;
};

const reducer = (state = initialState, action) => {
  const { type, jokes, error, candidate } = action;
  let newState = state;
  switch (type) {
    case SET_CANDIDATES:
      return newState.set("candidates", shuffleArray(candidatesList));
    case FETCH_JOKES_REQUEST:
      return newState;

    case FETCH_JOKES_SUCCESS:
      newState.get("candidates").withMutations(candidates => {
        candidates.forEach((candidate, index) => {
          const quote =
            index < jokes.value.length ? jokes.value[index].joke : "";
          newState = newState.setIn(["candidates", index, "quote"], quote);
        });
      });
      return newState;

    case FETCH_JOKES_FAILURE:
      return newState.set("error", error);

    case SELECT_CANDIDATE: {
      const candidateName = candidate.get("name", "");
      if (newState.get("selected").has(candidateName))
        return newState.deleteIn(["selected", candidateName]);
      return newState.setIn(["selected", candidateName], candidate);
    }
    case RE_ARRANGE_SELECTED_CANDIDATES:
      return newState.set("reArranged", true);
    default:
      return newState;
  }
};

export default reducer;
