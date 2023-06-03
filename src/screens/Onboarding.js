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
  const navigation = useNavigation();
  const theme = useColorScheme();

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
        onPress={() => navigation.navigate("Home")}
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
    title: "Agenda una clase particular en segundos",
    description: "Solo tienes que seguir tres simples pasos.",
    color: "#FF5733",
  },
  {
    icon: "ios-card",
    title: "Selecciona la fecha",
    description: "",
    color: "#10AA57",
  },
  {
    icon: "",
    title: "Elige el horario",
    description: "",
    color: "#33A2FF",
  },
  {
    icon: "ios-bookmarks",
    title: "Confirma tu pago",
    description: "Envíanos tu comprobante de pago.",
    color: "#FFC133",
  },
];
