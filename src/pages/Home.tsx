import debugImg from '@images/debug.png';
import React from 'react';
import { increment, decrement } from '../redux/counter';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

function Home() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="test-postcss">
      <h1 className="child">首页</h1>
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
