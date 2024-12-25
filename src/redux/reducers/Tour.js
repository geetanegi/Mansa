import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const tourSlice = createSlice({
  name: 'Tour',
  initialState,
  reducers: {
    setTour: (state, action) => {
      state.data = action.payload;
    },

    clearTour: state => {
      state.data = null;
    },
  },
});

export const {setTour, clearTour} = tourSlice.actions;

export default tourSlice.reducer;
