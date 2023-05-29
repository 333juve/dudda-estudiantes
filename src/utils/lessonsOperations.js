import {
    doc,
    updateDoc,
    getDoc,
    getDocs,
    where,
    collection,
    query,
  } from "firebase/firestore";
  import { db } from "../config/firebase";
  //Reducers
  import { setLessonsReducer } from "../features/lessonsReducer";
  
  export const getLessons = async (userID, dispatch) => {
    try {
      const q = query(
        collection(db, "lessons"),
        where("student.id", "==", userID)
      );
      const fetchedLessons = await getDocs(q);
      const lessonsArray = fetchedLessons.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setLessonsReducer(lessonsArray));
      console.log("Classes fetched successfully!");
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  
  export const updateLesson = async (userID, dispatch) => {
    try {
    } catch (error) {
      console.log("Error updating lesson", error);
    }
  };
  