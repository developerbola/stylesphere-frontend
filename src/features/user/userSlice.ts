import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    const token = Cookies.get("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log("Error fetching user:", error); // Log the error
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload; // Update user state on success
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.status = "failed";
        state.error = action.payload as string; // Set error message
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
