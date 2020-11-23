import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { LS_ACCESS_TOKEN, LS_REFRESH_TOKEN } from "../constants/localStorage";
import { toastr } from "react-redux-toastr";

export interface UserState {
  name: string;
  email: string;
  address: string;
  isAuth: boolean;
}

export const login = createAsyncThunk<
  { name: string },
  { name: string; password: string }
>("user/login", async (data, { dispatch }) => {
  const res = await api.post<{ accessToken: string; refreshToken: string }>(
    "/login",
    data
  );
  toastr.success("Yay", "");
  localStorage.setItem(LS_ACCESS_TOKEN, res.data.accessToken);
  localStorage.setItem(LS_REFRESH_TOKEN, res.data.refreshToken);

  dispatch(fetchUser());

  return data;
});

export const register = createAsyncThunk<
  { name: string; email: string },
  { name: string; email: string; password: string; address: string }
>("user/register", async (data, { dispatch }) => {
  const res = await api.post<{ accessToken: string; refreshToken: string }>(
    "/register",
    data
  );
  toastr.success("Yay", "");
  localStorage.setItem(LS_ACCESS_TOKEN, res.data.accessToken);
  localStorage.setItem(LS_REFRESH_TOKEN, res.data.refreshToken);

  dispatch(fetchUser());

  return data;
});

export const fetchUser = createAsyncThunk<{
  name: string;
  email: string;
  address: string;
}>("user/fetchUser", async () => {
  const res = await api.get<{ name: string; email: string; address: string }>(
    "/user"
  );
  return res.data;
});

const initialState: UserState = {
  name: "",
  email: "",
  address: "",
  isAuth: false
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserState>) {
      return payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      if (payload.name) {
        state.isAuth = true;
        state.name = payload.name;
        state.email = payload.email;
        state.address = payload.address;
      }
    });
  }
});

export const { setUser } = slice.actions;
export default slice.reducer;
