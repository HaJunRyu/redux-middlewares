import * as postsAPI from '../api/posts';
import { reducerUtils } from '../lib/asyncUtils';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST_BY_ID = 'GET_POST_BY_ID';
const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
const GET_POST_BY_ID_ERROR = 'GET_POST_BY_ID_ERROR';

export const getPosts = () => async dispatch => {
  dispatch({ type: GET_POSTS });
  try {
    const posts = await postsAPI.getPosts();
    dispatch({ type: GET_POSTS_SUCCESS, payload: { posts } });
  } catch (error) {
    dispatch({ type: GET_POSTS_ERROR, payload: { error } });
  }
};

export const getPostById = id => async dispatch => {
  dispatch({ type: GET_POST_BY_ID });
  try {
    const post = await postsAPI.getPostById(id);
    dispatch({ type: GET_POST_BY_ID_SUCCESS, payload: { post } });
  } catch (error) {
    dispatch({ type: GET_POST_BY_ID_ERROR, payload: { error } });
  }
};

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function postsReducer(state = initialState, action) {
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
        post: reducerUtils.loading(state.post.data),
      };
    case GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        post: reducerUtils.success(action.payload.post),
      };
    case GET_POST_BY_ID_ERROR:
      return {
        ...state,
        post: reducerUtils.error(action.payload.error),
      };
    default:
      return state;
  }
}
