import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    leftbar: false,
    currentBar: localStorage.getItem("currentBar") || "HomePage",
}

const leftBarAdminSlice = createSlice({
    name: 'leftbar',    
    initialState,
    reducers: {
        setLeftBar: (state, action) => {
        state.leftbar = action.payload
      },
        setCurrentBar: (state, action) => {
          state.currentBar = action.payload;
          localStorage.setItem("currentBar", action.payload);
        }
    }
  })
  export const { setLeftBar, setCurrentBar } = leftBarAdminSlice.actions;
  export default leftBarAdminSlice.reducer;