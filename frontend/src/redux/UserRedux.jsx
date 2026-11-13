import { createSlice } from "@reduxjs/toolkit";

let storedUser = null;
try {
  const item = localStorage.getItem("user");
  if (item) {
    storedUser = JSON.parse(item);
  }
} catch {
  storedUser = null;
}

const initialState = {
  currentUser: storedUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
