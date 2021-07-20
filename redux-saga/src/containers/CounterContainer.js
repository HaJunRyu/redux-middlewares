import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, increase } from '../modules/counter';

export default function CounterContainer() {
  const number = useSelector(({ counter }) => counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };
  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />;
}
