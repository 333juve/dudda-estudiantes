import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  useColorScheme,
} from "react-native";
import MyText from "../components/MyText";
import MyButton from "../components/MyButton";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { getLessons } from "../utils/lessonsOperations";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  sendPushNotification,
  sendPushNotificationExpo,
} from "../utils/notificationsOperations";
import { i18n } from "../../languages";

export default function Cancel({ route }) {
  const { lesson } = route.params;
  const [reason, setReason] = React.useState("");
  const navigation = useNavigation();
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getNotificationToken = async (tutorId) => {
    const docRef = doc(db, "tutors", tutorId);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data().notificationToken;
    } else {
      console.log("No such document!");
      return null;
    }
  };
  

  const message = {
    to: `${lesson.tutor.notificationToken}`,
    sound: "default",
    title: "Clase cancelada",
    body: "Lo sentimos, se ha cancelado tu clase. En unos minutos solucionaremos esto por ti. ",
    data: { check: "Working" },
  };

  const handleCancelLesson = (lesson) => {
    Alert.alert(
      `${i18n.t('cancelClass')}`,
      `${i18n.t('cancelClass_desc')}`,
      [
        {
          text:  `${i18n.t('cancel')}`,
          onPress: () => console.log("Cancel pressed"),
          style: "cancel",
        },
        {
          text:  `${i18n.t('continue')}`,
          onPress: async () => {
            try {
              await updateDoc(doc(db, "lessons", lesson.id), {
                isCanceled: true,
              });
              const notificationToken = await getNotificationToken(lesson.tutor.id);
              if (notificationToken) {
                message.to = notificationToken;
              }
              await sendPushNotificationExpo(message);
              await getLessons(user.id, dispatch);
              navigation.navigate("Home");
            } catch (error) {
              console.log(error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <MyText type="title">{i18n.t('cancelClass')}</MyText>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor:
              theme === "dark"
                ? "rgba(224, 224, 224, 0.2)"
                : "rgba(128, 128, 128, 0.2)",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 7,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {lesson.tutor.profilePicture ? (
              <Image
                source={{ uri: lesson.tutor.profilePicture }}
                style={styles.image}
              />
            ) : (
              <View style={styles.fallback}>
                <MyText style={{ fontSize: 20, color: "#fff" }} type="caption">
                  {lesson.tutor.firstName.charAt(0)}
                </MyText>
              </View>
            )}
            <View>
              <MyText>
                {moment(lesson.date, "DD/MM/YYYY")
                  .locale("es")
                  .format("dddd DD MMMM")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </MyText>

              <MyText>
                {lesson.tutor.firstName} {lesson.tutor.lastName}
              </MyText>
            </View>
          </View>
          <View>
            <MyText>
              {lesson.startTime} - {lesson.endTime}
            </MyText>
            <MyText>{lesson.subject}</MyText>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <MyText style={{ marginBottom: 10 }}>
          {i18n.t('reasonOFCancel')}
        </MyText>
        <TextInput
          style={{
            height: 200,
            backgroundColor:
              theme === "dark"
                ? "rgba(224, 224, 224, 0.2)"
                : "rgba(128, 128, 128, 0.2)",
            borderRadius: 7,
            paddingTop: 10,
            paddingLeft: 10,
            textAlignVertical: "top",
            fontSize: 16,
            color: theme === "dark" ? "white" : "black",
          }}
          placeholder={"Escribe aquí..."}
          placeholderTextColor={theme === "dark" ? "white" : "black"}
          multiline
          value={reason}
          onChangeText={setReason}
          blurOnSubmit={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MyButton title={i18n.t('cancelClass')} onPress={() => handleCancelLesson(lesson)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  fallback: {
    backgroundColor: "#F06999",
    borderRadius: 100,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
