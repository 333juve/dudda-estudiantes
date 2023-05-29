import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userReducer";
import lessonsReducer from "../features/lessonsReducer";
import notificationsReducer from "../features/notificationsReducer";

export const store = configureStore({
  reducer: {
    lessons: lessonsReducer,
    notifications: notificationsReducer,
    user: userReducer,
  },
});
