import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// expo-clipboard
import * as Clipboard from "expo-clipboard";
// toast
import Toast from "react-native-toast-message";
// ionicons
import Ionicons from "react-native-vector-icons/Ionicons";
// moment
import moment from "moment";
// MyComponents
import MyButton from "../components/MyButton";
import MyText from "../components/MyText";
// navigation
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { getLessons } from "../utils/lessonsOperations";
import { useDispatch, useSelector } from "react-redux";

export default function Checkout({ route }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [repSch, setrepSch] = useState(route?.params?.repeatSchedule);
  const [newLessonFromHome] = useState(route?.params?.newLesson);
  const [unPaidLesson] = useState(route?.params?.lesson);
  let lesson = {};
  const theme = useColorScheme();

  if (newLessonFromHome) {
    lesson = {
      startTime: newLessonFromHome?.startTime,
      endTime: newLessonFromHome?.endTime,
      subject: newLessonFromHome?.subject,
      date: newLessonFromHome?.date,
      amount: newLessonFromHome?.PEN,
      isPaid: false,
      isCanceled: false,
      totalDuration: newLessonFromHome?.Tduration,
      student: {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        profilePicture: user?.profilePicture,
      },
      tutor: {
        // id: newLessonFromHome?.tutor?.id,
        // firstName: newLessonFromHome?.tutor?.firstName,
        // lastName: newLessonFromHome?.tutor?.lastName,
        // profilePicture: newLessonFromHome?.tutor?.profilePicture,
        id: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
      },
      videocall: "",
    };
  } else if (unPaidLesson) {
    lesson = {
      startTime: unPaidLesson?.startTime,
      endTime: unPaidLesson?.endTime,
      subject: unPaidLesson?.subject,
      date: unPaidLesson?.date,
      amount: unPaidLesson?.amount,
      isPaid: false,
      isCanceled: false,
      totalDuration: unPaidLesson?.totalDuration,
      student: {
        id: unPaidLesson?.student?.id,
        firstName: unPaidLesson?.student?.firstName,
        lastName: unPaidLesson?.student?.lastName,
        profilePicture: unPaidLesson?.student?.profilePicture,
      },
      tutor: {
        id: unPaidLesson?.tutor?.id,
        firstName: unPaidLesson?.tutor?.firstName,
        lastName: unPaidLesson?.tutor?.lastName,
        profilePicture: unPaidLesson?.tutor?.profilePicture,
      },
      videocall: "",
    };
  }

  const newLesson = async () => {
    if (unPaidLesson) {
      console.log("Unpaid lesson has not beed added again into firestore");
    } else {
      try {
        const lessonRef = collection(db, "lessons");
        const docRef = await addDoc(lessonRef, lesson);
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  console.log("Lesson Object", lesson);

  const spanishMonths = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  function getSpanishDayName(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };

    const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
      date
    );
    const capitalizedDate = formattedDate.replace(/^\w/, (c) =>
      c.toUpperCase()
    );
    return capitalizedDate;
  }

  function getDayFromDate(dateString) {
    const [day] = dateString.split("/");
    return parseInt(day, 10);
  }

  const showToast = (value) => {
    Toast.show({
      type: "success",
      text1: "¡Texto copiado!",
      position: "top",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 20,
      bottomOffset: 40,
    });
    Clipboard.setStringAsync(value);
  };

  return (
    <View style={styles.container}>
      <MyText style={styles.header}>Detalles de reserva</MyText>
      <ScrollView>
        {repSch ? (
          repSch.map((item) => {
            return (
              <View style={{ margin: 4 }}>
                <MyText type="caption">
                  Fecha: {item.day},{"  "}
                  {item.date.split("/", 1)} de{" "}
                  {spanishMonths[item.date.split("/")[1] - 1]}
                </MyText>
                {item.schedule.map((x) => {
                  return (
                    <MyText type="caption">
                      Hora: De {x.startTime} a {x.endTime}
                    </MyText>
                  );
                })}
                <MyText type="caption">Duración: {item.Tduration}</MyText>
                <MyText style={{ fontWeight: "600" }}>PEN:{item.PEN}</MyText>
              </View>
            );
          })
        ) : unPaidLesson ? (
          <View>
            {/* Date */}
            <View style={styles.row}>
              <MyText type="caption">Fecha</MyText>
              <MyText type="caption">
                {getSpanishDayName(unPaidLesson?.date)}
              </MyText>
            </View>
            {/* Time */}
            <View style={styles.row}>
              <MyText type="caption">Hora</MyText>
              <MyText type="caption">
                De {unPaidLesson?.startTime} a {unPaidLesson?.endTime}
              </MyText>
            </View>
            {/* Length */}
            <View style={styles.row}>
              <MyText type="caption">Duración</MyText>
              <MyText type="caption">{unPaidLesson?.totalDuration}</MyText>
            </View>
            <View style={styles.row}>
              <MyText type="caption">Curso</MyText>
              <MyText type="caption">{unPaidLesson?.subject}</MyText>
            </View>
          </View>
        ) : newLessonFromHome ? (
          <View>
            <View style={styles.row}>
              <MyText type="caption">Fecha</MyText>
              <MyText type="caption">{newLessonFromHome.dateDay}</MyText>
            </View>
            <View style={styles.row}>
              <MyText type="caption">Hora</MyText>
              <MyText type="caption">
                De {newLessonFromHome.startTime} a {newLessonFromHome.endTime}
              </MyText>
            </View>
            <View style={styles.row}>
              <MyText type="caption">Duración</MyText>
              <MyText type="caption">{newLessonFromHome.Tduration}</MyText>
            </View>
            <View style={styles.row}>
              <MyText type="caption">Curso</MyText>
              <MyText type="caption">{newLessonFromHome.subject}</MyText>
            </View>
          </View>
        ) : (
          <MyText style={{ fontWeight: "600" }}>Ups! Algo salió mal</MyText>
        )}
        <View style={styles.slotWrapper}>
          <MyText style={{ fontWeight: "600" }}>Total (PEN)</MyText>
          {unPaidLesson ? (
            <MyText
              style={{ fontWeight: "600" }}
            >{`PEN ${unPaidLesson?.amount}`}</MyText>
          ) : (
            <MyText
              style={{ fontWeight: "600" }}
            >{`PEN ${newLessonFromHome?.PEN}`}</MyText>
          )}
        </View>
        <View style={styles.divider}></View>
        <MyText style={{ marginBottom: 20, fontSize: 16 }}>
          Para concluir con el registro de la clase, por favor, envíanos a
          nuestro número de WhatsApp el voucher del depósito o Yape.
        </MyText>
        {/* Razón social */}
        <MyText style={{ fontWeight: "700" }}>Razón Social</MyText>
        <MyText style={{ marginBottom: 15 }}>DUDDA S.A.C.</MyText>
        {/* BCP (Soles) */}
        <MyText style={{ fontWeight: "700" }}>BCP (Soles)</MyText>
        <TouchableOpacity
          style={styles.copyWrapper}
          onPress={() => {
            showToast("19406390269016");
          }}
        >
          <MyText style={{ marginBottom: 15 }}>1939951755075</MyText>
          <Ionicons
            name="copy-outline"
            size={20}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        {/* Interbancaria (CCI) */}
        <MyText style={{ fontWeight: "700" }}>Interbancaria (CCI)</MyText>
        <TouchableOpacity
          style={styles.copyWrapper}
          onPress={() => {
            showToast("00219410639026901690");
          }}
        >
          <MyText style={{ marginBottom: 15 }}>00219300995175507514</MyText>
          <Ionicons
            name="copy-outline"
            size={20}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        {/* Yape */}
        <MyText style={{ fontWeight: "700" }}>Yape</MyText>
        <TouchableOpacity
          style={styles.copyWrapper}
          onPress={() => {
            showToast("941379335");
          }}
        >
          <MyText style={{ marginBottom: 15 }}>968630898</MyText>
          <Ionicons
            name="copy-outline"
            size={20}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        {/* WhatsApp */}
        <MyText style={{ fontWeight: "700" }}>WhatsApp</MyText>
        <TouchableOpacity
          style={styles.copyWrapper}
          onPress={() => {
            showToast("941379335");
          }}
        >
          <MyText style={{ marginBottom: 15 }}>968630898</MyText>
          <Ionicons
            name="copy-outline"
            size={20}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </ScrollView>
      <MyButton
        title={"Confirmar"}
        onPress={async () => {
          newLesson();
          await getLessons(user.id, dispatch);
          navigation.navigate("Home");
        }}
        style={{ marginBottom: 45 }}
      />
      <Toast position="bottom" bottomOffset={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 25,
    // fontWeight: "bold",
    marginVertical: 20,
  },
  slotWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  boldText: {
    fontWeight: "600",
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "grey",
    marginVertical: 20,
  },
  subheading: {
    marginBottom: 20,
    fontSize: 16,
  },
  title: {
    fontWeight: "700",
  },
  copyWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
