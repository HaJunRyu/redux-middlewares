import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

export default function PostListContainer() {
  const { data, loading, error } = useSelector(({ posts }) => posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(getPosts());
  }, [dispatch, data]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <PostList posts={data} />;
}
