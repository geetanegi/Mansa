import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const AdminLoginSlice = createSlice({
  name: 'AdminLogin',
  initialState,
  reducers: {
    setAdminLogin: (state, action) => {
      state.data = action.payload;
    },

    clearAdminLogin: state => {
      state.data = null;
    },
  },
});

export const {setAdminLogin, clearAdminLogin} = AdminLoginSlice.actions;

export default AdminLoginSlice.reducer;
