import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  birthday: null,
  createdAt: null,
  email: null,
  firstName: null,
  id: null,
  lastName: null,
  latitude: null,
  longitude: null,
  notificationToken: null,
  phoneNumber: null,
  profilePicture: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    resetUser: (state) => {
      return (state = {
        birthday: null,
        createdAt: null,
        email: null,
        firstName: null,
        id: null,
        lastName: null,
        latitude: null,
        longitude: null,
        notificationToken: null,
        phoneNumber: null,
        profilePicture: null,
      });
    },
    resetProfilePicture: (state, action) => {
      return {
        ...state,
        profilePicture: action.payload,
      };
    },
    resetPhoneNumber: (state, action) => {
      return {
        ...state,
        phoneNumber: action.payload,
      };
    },
    resetBirthday: (state, action) => {
      return {
        ...state,
        birthday: action.payload,
      };
    },
    resetNotificationToken: (state, action) => {
      return {
        ...state,
        notificationToken: action.payload,
      };
    },
    resetLocation: (state, action) => {
      const { latitude, longitude } = action.payload;
      return {
        ...state,
        latitude: latitude,
        longitude: longitude,
      };
    },
  },
});

export const {
  setUser,
  resetUser,
  resetProfilePicture,
  resetBirthday,
  resetPhoneNumber,
  resetLocation,
  resetNotificationToken,
} = userSlice.actions;

export default userSlice.reducer;
