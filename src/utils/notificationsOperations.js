import * as React from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { setNotifications } from "../features/notificationsReducer";

export const getNotifications = async (userID, dispatch) => {
  try {
    const notificationsRef = collection(db, "notifications");
    const queryRef = query(
      notificationsRef,
      where("receiver.id", "==", userID),
      // orderBy("timestamp", "desc"),
      limit(100)
    );
    const querySnapshot = await getDocs(queryRef);
    const notificationsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setNotifications(notificationsArray));
  } catch (e) {
    console.log(e);
  }
};

export const createNotificationOnDB = async (
  senderID,
  receiverID,
  type,
  lessonID,
  chatRoomID
) => {
  try {
    const notificationData = {
      notificationSenderId: senderID,
      receiver: receiverID,
      type: type,
      lessonID: lessonID ?? "",
      isSeen: false,
      createdAt: new Date(),
    };

    const docRef = await addDoc(
      collection(db, "notifications"),
      notificationData
    );
    console.log("Notification created!");
    if (docRef) {
      return { ...notificationData, id: docRef.id };
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

export const sendPushNotification = async (
  token,
  title,
  body,
  data,
  category
) => {
  if (token !== null) {
    const message = {
      to: token,
      notification: {
        title: title,
        body: body,
      },
      data: data ?? {},
      android: {
        priority: "high",
        notification: {
          category: category ?? "",
        },
      },
      apns: {
        payload: {
          aps: {
            category: category ?? "",
          },
        },
      },
    };

    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: `key=${serverKey}`, // Replace with your server key from Firebase Console
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
  return;
};

export const updateNotifications = async (userID, dispatch) => {};
