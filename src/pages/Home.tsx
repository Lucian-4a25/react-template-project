import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/counter';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import debugImg from '@images/debug.png';

function Home() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>首页</h1>
      <p>计数器: {count}</p>
      <button onClick={() => dispatch(increment())}>增加</button>
      <button onClick={() => dispatch(decrement())}>减少</button>
      <div>
        <img src={debugImg} />
      </div>
    </div>
  );
}

export default Home;