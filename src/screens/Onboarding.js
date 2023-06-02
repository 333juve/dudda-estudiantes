import * as React from "react";
import MyText from "../components/MyText";
import { View } from "../components/themed/Themed";
import MyButton from "../components/MyButton";
import {
  Image,
  StyleSheet,
  View as DefaultView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";
import { requestLocationPermissions } from "../utils/requestUserLocation";
import {
  updateUserLocation,
  updateUserNotificationToken,
} from "../utils/userOperations";
import { resetNotificationToken, resetLocation } from "../features/userReducer";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Onboarding() {
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useColorScheme();

  async function handleOnContinue() {
    try {
      await AsyncStorage.setItem("@firstLaunch", "true");
      navigation.navigate("Home");
      try {
        const token = await registerForPushNotificationsAsync();
        await updateUserNotificationToken(id, token);
        dispatch(resetNotificationToken(token));
      } catch (e) {
        console.log(
          "error while getting notification token while onboarding",
          e
        );
      }

      try {
        const location = await requestLocationPermissions();
        await updateUserLocation(id, location);
        dispatch(resetLocation(location));
      } catch (e) {
        console.log("error locaation permission denied! while onboarding", e);
      }
    } catch (e) {
      console.log("Onboarding error", e);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <MyText style={styles.title} type="title">
        ¡Bienvenido a
      </MyText>
      <MyText style={[styles.title, { marginBottom: 30 }]} type="title">
        Dudda!
      </MyText>
      {appFeatures.map((feature, index) => (
        <View key={index} style={styles.itemContainer}>
          <Ionicons
            name={feature.icon}
            size={30}
            style={[styles.icon, { color: feature.color }]}
          />
          <DefaultView style={styles.textWrapper}>
            <MyText type="caption" style={{ fontWeight: "bold" }}>
              {feature.title}
            </MyText>
            <MyText type="caption">{feature.description}</MyText>
          </DefaultView>
        </View>
      ))}
      <MyButton
        style={{ marginTop: 50 }}
        title="Continuar"
        onPress={handleOnContinue}
      />
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  icon: {
    marginRight: 13,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 13,
  },
  textWrapper: {
    flexShrink: 1,
  },
});

const appFeatures = [
  {
    icon: "ios-calendar",
    title: "Selecciona tus horarios.",
    description: "Encontraras la opción en el menú izquierdo.",
    color: "#FF5733",
  },
  {
    icon: "ios-card",
    title: "Agrega un método de pago.",
    description: "En el menú izquierdo ingresa a la opción Depósitos.",
    color: "#10AA57",
  },
  {
    icon: "checkmark-circle",
    title: "Rinde el examen para verificar tu cuenta.",
    description: "Hemos enviado el enlace a tu correo electrónico.",
    color: "#33A2FF",
  },
  {
    icon: "ios-bookmarks",
    title: "Empieza a recibir clases.",
    description:
      "Accede a los detalles desde la app y te contactaremos para confirmar.",
    color: "#FFC133",
  },
];
