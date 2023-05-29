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
// my components
import MyButton from "../components/MyButton";
import MyText from "../components/MyText";
// navigation
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useSelector } from "react-redux";

export default function Checkout({ route }) {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [repSch, setrepSch] = useState(route?.params?.repeatSchedule);
  const theme = useColorScheme();
  // const { startTime, endTime, date, length, checkpoint, tutor, subject } =
  //   route?.params;
  console.log(route?.params?.totalPEN);
  console.log(route?.params?.repeatSchedule);

  // const calculateAmount = (length) => {
  //   let amount = 0;
  //   let duration = "";
  //   if (length === 100) {
  //     duration = "1h";
  //     amount = 49.9;
  //   } else if (length === 130 || length === 170) {
  //     duration = "1h 30m";
  //     amount = 75;
  //   } else if (length === 200) {
  //     duration = "2h";
  //     amount = 99.9;
  //   } else if (length === 230 || length === 270) {
  //     duration = "2h 30m";
  //     amount = 125;
  //   } else if (length === 300) {
  //     duration = "3h";
  //     amount = 149.9;
  //   }
  //   return { amount, duration };
  // };

  // const { amount, duration } = React.useMemo(
  //   () => calculateAmount(length),
  //   [length]
  // );

  const newLesson = async () => {
    try {
      const { startTime, endTime, date, subject } = route.params;
      const { firstName, lastName, profilePicture } = user;
      const { amount } = calculateAmount(length);
      const formattedDate = moment(date).format("DD/MM/YYYY");

      const lessonRef = collection(db, "lessons");
      const lesson = {
        startTime,
        endTime,
        subject,
        date: formattedDate,
        amount,
        isPaid: false,
        isCanceled: false,
        student: {
          id: user.id,
          firstName,
          lastName,
          profilePicture,
        },
        tutor: {
          id: tutor.id,
          firstName: tutor.firstName,
          lastName: tutor.lastName,
          profilePicture: tutor.profilePicture,
        },
        videocall: "",
      };

      const docRef = await addDoc(lessonRef, lesson);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  const spanishMonths = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  function getSpanishDayName(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const options = { weekday: "long" };
    const dayName = new Intl.DateTimeFormat("es-ES", options).format(date);
    return dayName;
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
      <ScrollView style={{ flex: 1 }}>
        {repSch ? (
          repSch.map((item) => {
            return (
              <View style={{ margin: 4 }}>
                <MyText type="caption">
                  Fecha: {item.day},{item.date.split("/", 1)} de{" "}
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
        ) : (
          <View style={{ margin: 4 }}>
            <MyText type="caption">
              Fecha: {getSpanishDayName(route?.params?.lesson.date)},
              {getDayFromDate(route?.params?.lesson.date)} de{" "}
              {spanishMonths[route?.params?.lesson.date.split("/")[1] - 1]}
            </MyText>

            <MyText type="caption">
              Hora: De {route?.params?.lesson.startTime} a{" "}
              {route?.params?.lesson.endTime}
            </MyText>

            <MyText type="caption">Duración: 1 hora</MyText>
            <MyText style={{ fontWeight: "600" }}>
              Subject :{route?.params?.lesson.subject}
            </MyText>
          </View>
        )}
        <View style={styles.slotWrapper}>
          <MyText style={{ fontWeight: "600" }}>TOTAL (PEN)</MyText>
          {route?.params?.totalPEN ? (
            <MyText
              style={{ fontWeight: "600" }}
            >{`PEN ${route?.params?.totalPEN}`}</MyText>
          ) : (
            <MyText
              style={{ fontWeight: "600" }}
            >{`PEN ${route?.params?.lesson.amount}`}</MyText>
          )}

          <View style={styles.divider}></View>
        </View>
        <MyText style={{ marginBottom: 20, fontSize: 16 }}>
          Para concluir con el registro, por favor, envíanos a nuestro número de
          WhatsApp el voucher del depósito o Yape.
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

        <Toast position="bottom" bottomOffset={20} />
      </ScrollView>
      <MyButton
        title={"Confirmar"}
        onPress={() => {
          newLesson();
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  slotWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
});
