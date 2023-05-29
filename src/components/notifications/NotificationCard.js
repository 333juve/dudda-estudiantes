import * as React from "react";
import MyText from "../MyText";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import moment from "moment";
import {
  deleteNotification,
  markNotificationAsSeen,
} from "../../features/notificationsReducer";
import Entypo from "react-native-vector-icons/Entypo";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function NotificationCard({ notification, dispatch }) {
  const { createdAt, lesson, sender, isSeen, id } = notification;

  async function handleUnseenMarker() {
    dispatch(markNotificationAsSeen(id));
    try {
      const docRef = doc(db, "notifications", id);
      const res = await updateDoc(docRef, {
        isSeen: true,
      });
      console.log(res);
    } catch (e) {
      console.log("error ", e);
    }
  };

  function handleDeleteConfirmation() {
    Alert.alert(
      "Eliminar notificación",
      "¿Estás seguro de que deseas eliminar esta notificación?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: handleDeleteNotification,
        },
      ]
    );
  };

  async function handleDeleteNotification() {
    dispatch(deleteNotification(id));
    try {
      const docRef = doc(db, "notifications", id);
      await deleteDoc(docRef);
    } catch (e) {
      console.log("error ", e);
    }
  };

  const formattedDate = moment(lesson.date).format("dddd DD/MM");

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      {isSeen ? (
        <View style={styles.seenMarker} />
      ) : (
        <View style={styles.unseenMarker} />
      )}
      {/* Profile picture */}
      {sender.profilePicture ? (
        <Image source={{ uri: sender.profilePicture }} style={styles.image} />
      ) : (
        <View style={styles.fallback}>
          <MyText style={styles.initialLetter}>
            {sender.firstName.charAt(0)}
          </MyText>
        </View>
      )}
      {/* Body */}
      <View style={{ flex: 1, marginLeft: 15 }}>
        <TouchableOpacity
          style={{ flexShrink: 1 }}
          onPress={() => handleUnseenMarker()}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <MyText style={styles.notificationBody}>{lesson.body}</MyText>
            <TouchableOpacity onPress={handleDeleteConfirmation}>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={"rgb(122,122,122)"}
              />
            </TouchableOpacity>
          </View>
          <MyText style={styles.notificationText}>
            Con {sender.firstName} el{" "}
            <MyText style={styles.boldText}>{formattedDate}</MyText> de{" "}
            <MyText style={styles.boldText}>{lesson.startTime}</MyText> a{" "}
            <MyText style={styles.boldText}>{lesson.endTime}</MyText>.
          </MyText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  unseenMarker: {
    backgroundColor: "#2F95DC",
    height: 10,
    width: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  seenMarker: {
    height: 10,
    width: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  fallback: {
    backgroundColor: "#F06999",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
  },
  initialLetter: {
    fontSize: 30,
    color: "#fff",
  },
  notificationBody: {
    fontWeight: "bold",
    color: "#2F95DC",
    fontSize: 15,
  },
  notificationText: {
    marginTop: 5,
    fontSize: 15,
  },
  boldText: {
    fontWeight: "700",
    fontSize: 15,
  },
});
