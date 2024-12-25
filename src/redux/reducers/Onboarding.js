import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const onBoardingSlice = createSlice({
  name: 'onBoarding',
  initialState,
  reducers: {
    setOnBoarding: (state, action) => {
      state.data = action.payload;
    },

    clearOnBoarding: state => {
      state.data = null;
    },
  },
});

export const {setOnBoarding, clearOnBoarding} = onBoardingSlice.actions;

export default onBoardingSlice.reducer;
