import * as postsAPI from '../api/posts';
import { reducerUtils } from '../lib/asyncUtils';
import { call, put, takeEvery, getContext } from 'redux-saga/effects';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST_BY_ID = 'GET_POST_BY_ID';
const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
const GET_POST_BY_ID_ERROR = 'GET_POST_BY_ID_ERROR';

const GO_TO_HOME = 'GO_TO_HOME';

export const getPosts = () => ({ type: GET_POSTS });
export const getPostById = id => ({ type: GET_POST_BY_ID, payload: { id }, meta: id });

export const goToHome = () => ({ type: GO_TO_HOME });

function* getPostsSaga() {
  try {
    const posts = yield call(postsAPI.getPosts);
    yield put({ type: GET_POSTS_SUCCESS, payload: { posts } });
  } catch (error) {
    yield put({ type: GET_POSTS_ERROR, payload: { error }, error: true });
  }
}

function* getPostByIdSaga(action) {
  const { id } = action.payload;
  try {
    const post = yield call(postsAPI.getPostById, id);
    yield put({ type: GET_POST_BY_ID_SUCCESS, payload: { post }, meta: id });
  } catch (error) {
    yield put({ type: GET_POST_BY_ID_ERROR, payload: { error }, error: true, meta: id });
  }
}

function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST_BY_ID, getPostByIdSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
}

const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

export default function postsReducer(state = initialState, action) {
  const id = action?.meta;
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: reducerUtils.loading(state.posts.data),
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload.posts),
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.payload.error),
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        post: { ...state.post, [id]: reducerUtils.loading(state.post[id]?.data) },
      };
    case GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        post: { ...state.post, [id]: reducerUtils.success(action.payload.post) },
      };
    case GET_POST_BY_ID_ERROR:
      return {
        ...state,
        post: { ...state.post, [id]: reducerUtils.error(action.payload.error) },
      };
    default:
      return state;
  }
}
