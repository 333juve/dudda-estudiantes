import * as React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import {
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";
import MyText from "../components/MyText";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../constants/colors";
import { logoutUser } from "../utils/userOperations";
import { useNavigation } from "@react-navigation/native";
import { i18n } from "../../languages";

function handleHelp() {
  Alert.alert(
    `${i18n.t("needHelp")}`,
    `${i18n.t("needHelpDesc")}`,
    [
      {
        text: `${i18n.t("writeTous")}`,
        onPress: () =>
          Linking.openURL(
            "https://api.whatsapp.com/send?phone=51941379335&text=%C2%A1Hola!%20%C2%BFC%C3%B3mo%20est%C3%A1s%3F%20Necesito%20tu%20ayuda."
          ),
      },
      {
        text: `${i18n.t("callUs")}`,
        onPress: () => Linking.openURL("tel:+51941379335"),
      },
      {
        text: `${i18n.t("cancel")}`,
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
    ],
    { cancelable: true }
  );
}

export default function CustomDrawer(props) {
  const theme = useColorScheme();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { firstName, lastName, profilePicture, email } = user;

  async function handleSignOut() {
    Alert.alert(
      `${i18n.t("logout")}`,
      `${i18n.t("confirmLogout")}`,
      [
        {
          text: `${i18n.t("cancel")}`,
          onPress: () => console.log("Cancelar apretado"),
          style: "cancel",
        },
        {
          text: `${i18n.t("logout")}`,
          onPress: async () => {
            try {
              await logoutUser(dispatch);
            } catch (e) {
              console.log(e);
            }
          },
          style: "destructive",
        },
      ]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={
          theme === "dark"
            ? { backgroundColor: "rgb(18, 18, 18)" }
            : { backgroundColor: "#ED1E79" }
        }
      >
        {/* Encabezado: Nombre, apellido y correo electrónico */}
        <View
          style={{
            borderBottomColor: "#CCC",
            borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 30,
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("Perfil")}
          >
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.image} />
            ) : (
              <View style={styles.fallback}>
                {/* <MyText style={styles.initialLetter}>{firstName}</MyText> */}
                <MyText style={{ fontSize: 30, color: "#fff" }}>
                  {firstName.charAt(0)}
                </MyText>
              </View>
            )}
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "#FFF", fontSize: 18 }}>
                {firstName} {lastName}
              </Text>
              <Text style={{ color: "#BDBDBD", fontSize: 12 }}>{email}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/*  */}

        <View
          style={{
            backgroundColor: theme === "dark" ? "rgb(18, 18, 18)" : "#fff",
            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={[
          {
            flex: 0.2,
            ...(theme === "dark"
              ? { backgroundColor: "rgb(18, 18, 18)" }
              : { backgroundColor: "#fff" }),
            borderTopWidth: 1,
            borderTopColor: "#CCC",
            padding: 10,
            paddingLeft: 20,
          },
        ]}
      >
        <TouchableOpacity style={styles.supportIcon} onPress={handleHelp}>
          <AntDesign
            name="customerservice"
            size={20}
            color={Colors[theme].text}
            style={{ marginRight: 15 }}
          />
          <Text style={[styles.drawerItemText, { color: Colors[theme].text }]}>
          {i18n.t("supporte")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.logOutIcon, { flex: 1 }]}
          onPress={handleSignOut}
        >
          <Ionicons
            name="log-out-outline"
            size={25}
            color={Colors[theme].red}
            style={{ marginRight: 10 }}
          />
          <Text style={[styles.drawerItemText, { color: Colors[theme].red }]}>
          {i18n.t("logout")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  fallback: {
    backgroundColor: "#00916E",
    borderRadius: 100,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
  },
  initialLetter: {
    fontSize: 30,
    justifyContent: "center",
    alignSelf: "center",
    color: "white",
  },
  supportIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  logOutIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  drawerItemText: {
    fontSize: 16,
  },
});
