import { put, takeEvery, call, select } from "redux-saga/effects";
import fetchJokesService from "./service";
import actions from "./actions";
import constants from "./constants";
import { getNumberOfCandidates } from "./selectors";

const { FETCH_JOKES_REQUEST } = constants;

function* fetchJokesWorker() {
  try {
    const numberOfJokes = yield select(getNumberOfCandidates);
    const jokes = yield call(fetchJokesService, numberOfJokes);
    yield put(actions.fetchJokesSuccess(jokes));
  } catch (error) {
    yield put(actions.fetchJokesFailure(error));
  }
}

export default function* fetchJokesWatcher() {
  yield takeEvery(FETCH_JOKES_REQUEST, fetchJokesWorker);
}
