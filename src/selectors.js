import { List, Map, OrderedMap } from "immutable";
import { createSelector } from "reselect";
import constants from "./constants";

const { OBAMA, TRUMP } = constants;
const INCREMENT_ONE = 1;

const getIndexOf = (name, list) =>
  list.findIndex(obj => obj.get("name", "") === name);

const isNotCandidate = (selected, candidate) => !selected.has(candidate);

const isObamaAndTrump = selected =>
  !(isNotCandidate(selected, OBAMA) && isNotCandidate(selected, TRUMP));

const insertAfterCandidate = ({
  indexOfCandidate,
  candidateToInsert,
  selected
}) => selected.insert(indexOfCandidate + INCREMENT_ONE, candidateToInsert);

const swapCandidates = ({ candidateOneIndex, candidateTwoIndex, selected }) => {
  let swappedArray = selected;
  const candidateOne = swappedArray.get(candidateOneIndex);
  const candidateTwo = swappedArray.get(candidateTwoIndex);
  swappedArray = swappedArray.set(candidateTwoIndex, candidateOne);
  swappedArray = swappedArray.set(candidateOneIndex, candidateTwo);
  return swappedArray;
};

const getCandidate = (state, name) =>
  state.get("candidates").find(candidate => candidate.get("name", "") === name);
export const getSelected = state => state.get("selected", OrderedMap());
export const isSelected = (state, name) =>
  Boolean(state.getIn(["selected", name], false));
export const getCandidateList = state => state.get("candidates", List());
export const getNumberOfCandidates = state => getCandidateList(state).size;

export const isReArranged = state => state.get("reArranged", false);
export const getCheckoutOrder = state => state.get("selected", Map());

export const getCheckoutOrderState = () =>
  createSelector(
    [getCheckoutOrder, state => state],
    (selected, state) => {
      let selectedList = selected.toList();
      const LAST_INDEX = selectedList.size - 1;

      if (!isObamaAndTrump(selected)) {
        return selectedList;
      }
      if (isNotCandidate(selected, OBAMA)) {
        return selected.delete(TRUMP).toList();
      }
      const indexOfObama = getIndexOf(OBAMA, selectedList);

      if (isNotCandidate(selected, TRUMP)) {
        const trump = getCandidate(state, TRUMP);
        return insertAfterCandidate({
          indexOfCandidate: indexOfObama,
          candidateToInsert: trump,
          selected: selectedList
        });
      }
      const indexOfTrump = getIndexOf(TRUMP, selectedList);

      if (indexOfObama === LAST_INDEX) {
        const trump = selectedList.get(indexOfTrump);
        selectedList = selectedList.delete(indexOfTrump);
        return insertAfterCandidate({
          indexOfCandidate: indexOfObama,
          candidateToInsert: trump,
          selected: selectedList
        });
      }
      return swapCandidates({
        candidateOneIndex: indexOfObama + INCREMENT_ONE,
        candidateTwoIndex: indexOfTrump,
        selected: selectedList
      });
    }
  );
