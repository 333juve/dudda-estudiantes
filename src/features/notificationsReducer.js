import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    deleteNotification: (state, action) => {
      const newState = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
      state.notifications = newState;
    },
    markNotificationAsSeen: (state, action) => {
      console.log("Action payload");
    },
  }
});

export const {
  setNotifications,
  markNotificationAsSeen,
  deleteNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
