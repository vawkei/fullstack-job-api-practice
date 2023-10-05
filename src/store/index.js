import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialTokenState = {
  token:  localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState: initialTokenState,
  reducers: {
    setActiveToken(state, action) {
      //console.log(action.payload);
      state.token = action.payload.token
      //console.log(state.token)
      localStorage.setItem("token", state.token);
    },

    setClearToken(state) {
      localStorage.removeItem("token");
      state.token = "";
      
    },
  },
});

const store = configureStore({
  reducer: { token: tokenSlice.reducer },
});
export const tokenActions = tokenSlice.actions;
export default store;
