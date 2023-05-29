import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessons: [],
};

export const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    deleteLessonReducer: (state, action) => {
      const idLessonToDelete = action.payload;
      state.lessons = state.lessons.filter(
        (lesson) => lesson.id !== idLessonToDelete
      );
    },
    loadMoreLessonsReducer: (state, action) => {
      state.lessons = [...state.lessons, ...action.payload];
    },
    setLessonsReducer: (state, action) => {
      state.lessons = action.payload;
    },
  },
});

export const {
  deleteLessonReducer,
  loadMoreLessonsReducer,
  setLessonsReducer,
} = lessonSlice.actions;

export default lessonSlice.reducer;
