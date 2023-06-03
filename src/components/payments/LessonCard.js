import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
  Linking,
} from "react-native";
import React from "react";
import MyText from "../MyText";
import moment from "moment";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import "moment/locale/es";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getLessons } from "../../utils/lessonsOperations";

export default LessonCard = ({ lesson }) => {
  moment.locale("es");
  const theme = useColorScheme();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  async function sendReportEmail() {
    const body = `Este es un correo electrónico automático para el equipo de Reportes de Dudda. Por favor, escribe cualquier inquietud sobre este párrafo y no elimines nada a continuación.\nUsuario: ${user.id}\nLección: ${lesson.id}`;

    const encodedBody = encodeURIComponent(body);
    const url = `mailto:contacto@dudda.app?subject=Reporte&body=${encodedBody}`;

    try {
      await Linking.openURL(url);
      Alert.alert(
        "¡Gracias por tu reporte!",
        "Lo revisaremos a continuación y nos comunicaremos contigo a la brevedad."
      );
    } catch (error) {
      console.log("Error opening URL: ", error);
      Alert.alert(
        "Error",
        "No se pudo abrir el correo electrónico. Por favor, inténtalo de nuevo más tarde."
      );
    }
  }

  const showAlert = () => {
    return Alert.alert(
      "Reportar cobro",
      "¿Deseas reportar un problema con este cobro?",
      [
        {
          text: "Reportar",
          onPress: async () => {
            await updateDoc(doc(db, "lessons", lesson.id), {
              isReported: true,                
            });
            await getLessons(user.id, dispatch);
            await sendReportEmail();          
          },
          style: "destructive",
        },
        {
          text: "Cancelar",
          onPress: () => console.log("Descartar"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container(theme)}>
      <TouchableOpacity
        style={{ alignItems: "flex-end", marginBottom: 10, paddingTop: 10 }}
        onPress={() => showAlert()}
      >
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color={theme === "dark" ? "white" : "grey"}
        />
      </TouchableOpacity>
      <View style={styles.rowSpaceBetween}>
        <MyText style={styles.boldText} type="caption">
          PEN {lesson.amount}
        </MyText>
        <MyText style={styles.boldText} type="caption">
          {lesson.isPaid === false ? "Pago pendiente" : "Pago realizado"}
        </MyText>
      </View>
      <View style={styles.rowSpaceBetweenDate}>
        <MyText type="caption">
          {moment(lesson.date, "DD/MM/YYYY")
            .locale("es")
            .format("dddd DD MMMM")
            .replace(/^\w/, (c) => c.toUpperCase())}
        </MyText>
        <MyText type="caption">
          {lesson.startTime} - {lesson.endTime}
        </MyText>
      </View>
      <View style={styles.rowSpaceBetween}>
        <MyText type="caption">
          {lesson.student.firstName} {lesson.student.lastName}
        </MyText>
        <MyText type="caption" style={{ color: "#2F95DC" }}>
          {lesson.subject}
        </MyText>
      </View>
      <View
        style={{
          borderBottomColor:
            theme === "dark"
              ? "rgba(224, 224, 224, 0.2)"
              : "rgba(128, 128, 128, 0.2)",
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    paddingHorizontal: 20,
    // paddingTop: 20,
    paddingBottom: 20,
  }),
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowSpaceBetweenDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "600",
  },
  separator: {
    borderBottomColor: "#ADB3B3",
    borderBottomWidth: 1,
  },
});
