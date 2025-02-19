import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState = { value: 0 } satisfies CounterState as CounterState;

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
