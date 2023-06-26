import * as React from "react";
import MyText from "../components/MyText";
import { View } from "../components/themed/Themed";
import MyButton from "../components/MyButton";
import {
  StyleSheet,
  View as DefaultView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { i18n } from "../../languages";

export default function Onboarding() {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const [language, setLanguage] = React.useState(null);
  async function PickLanguage() {
    const firstLaunch = await AsyncStorage.getItem("@pickLanguage");
    if (firstLaunch !== null) {
      setLanguage(firstLaunch);
    }
  }
  React.useEffect(() => {
    PickLanguage();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <MyText style={styles.title} type="title">
        {i18n.t("welcome")}
      </MyText>
      <MyText style={[styles.title, { marginBottom: 30 }]} type="title">
        {i18n.t("dudda")}
      </MyText>
      {language === "en"
        ? appFeaturesEnglish.map((feature, index) => (
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
          ))
        : appFeaturesSpanish.map((feature, index) => (
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
        title={i18n.t("continue")}
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

const appFeaturesSpanish = [
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
    icon: "ios-time",
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

const appFeaturesEnglish = [
  {
    icon: "ios-calendar",
    title: "Schedule a private class in seconds",
    description: "Just follow three simple steps.",
    color: "#FF5733",
  },
  {
    icon: "ios-card",
    title: "Select the date",
    description: "",
    color: "#10AA57",
  },
  {
    icon: "ios-time",
    title: "Choose the time",
    description: "",
    color: "#33A2FF",
  },
  {
    icon: "ios-bookmarks",
    title: "Confirm your payment",
    description: "Send us your payment receipt.",
    color: "#FFC133",
  },
];
