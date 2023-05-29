import * as React from "react";
import {
  View,
  useColorScheme,
  StyleSheet,
  Switch,
  Alert,
  Pressable,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import MyText from "../MyText";
import Colors from "../../../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  updateUserLocation,
  updateUserNotificationToken,
} from "../../utils/userOperations";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { requestUserLocation } from "../../utils/requestUserLocation";
import {
  resetNotificationToken,
  resetLocation,
} from "../../features/userReducer";
import { logoutUser, deleteAccount } from "../../utils/userOperations";
import { isDevice } from "expo-device";
import MyInput from "../../components/MyInput";
import MyButton from "../MyButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

export default function ProfilePermissions() {
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLocationSwitchEnabled, setIsLocationSwitchEnabled] = React.useState(
    user.latitude !== null
  );
  const [isNotificationSwitchEnabled, setIsNotificationSwitchEnabled] =
    React.useState(user.notificationToken ? true : false);
  const [isLocationEnabled, setIsLocationEnabled] = React.useState(
    user.latitude !== null
  );
  const theme = useColorScheme();
  const dispatch = useDispatch();

  async function handleToggleLocation() {
    if (isLocationSwitchEnabled) {
      Alert.alert(
        "Desactivar ubicación",
        "¿Estás seguro de que deseas desactivar la ubicación?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelar apretado"),
            style: "cancel",
          },
          {
            text: "Desactivar",
            onPress: async () => {
              setIsLocationSwitchEnabled(false);
              setIsLocationEnabled(false);
              await updateUserLocation(user.id, {
                latitude: null,
                longitude: null,
              });
              dispatch(resetLocation({ latitude: null, longitude: null }));
            },
            style: "default",
          },
        ]
      );
    } else {      
      const location = await Location.getCurrentPositionAsync({});
      console.log(location)
      setIsLocationSwitchEnabled(!isLocationSwitchEnabled);      
      if (location !== null) {
        await updateUserLocation(user.id, location);
        dispatch(resetLocation(location));
      } else {
        setIsLocationSwitchEnabled(!isLocationSwitchEnabled);
        dispatch(resetLocation({ latitude: null, longitude: null }));
      }
    }
  }

  async function handleToggleNotifications() {
    if (isNotificationSwitchEnabled) {
      Alert.alert(
        "Desactivar notificaciones",
        "¿Estás seguro de que deseas desactivar las notificaciones?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelar apretado"),
            style: "cancel",
          },
          {
            text: "Desactivar",
            onPress: async () => {
              setIsNotificationSwitchEnabled(!isNotificationSwitchEnabled);
              if (isDevice) {
                await updateUserNotificationToken(user.id, null);
                dispatch(resetNotificationToken(null));                
              } else {
                Alert.alert("This doesn't work on a simulator");
              }
            },
            style: "default",
          },
        ]
      );
    } else {
      setIsNotificationSwitchEnabled(!isNotificationSwitchEnabled);
      if (isDevice) {
        const token = await registerForPushNotificationsAsync();
        if (token !== null) {
          await updateUserNotificationToken(user.id, token);
          dispatch(resetNotificationToken(token));
        } else {
          setIsNotificationSwitchEnabled(!isNotificationSwitchEnabled);
          dispatch(resetNotificationToken(null));
        }
      } else {
        Alert.alert("No disponible en simulador.");
      }
    }
  }

  async function handleSignOut() {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar apretado"),
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
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

  async function handleDeleteAccount(
    user,
    email,
    password,
    isLoading,
    setIsLoading
  ) {
    Alert.alert(
      "Eliminar cuenta",
      "Tu información se eliminará de manera permanente, no es posible revertir esta acción.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar apretado"),
          style: "cancel",
        },
        {
          text: "Eliminar cuenta",
          onPress: async () => {
            try {
              await setIsLoading(true);
              await deleteAccount(dispatch, user.id, email, password);
              await setIsLoading(false);
            } catch (e) {
              console.log("Error al eliminar usuario", e);
            }
          },
          style: "destructive",
        },
      ]
    );
  }

  return (
    <View>
      <MyText
        type="caption"
        style={{ fontWeight: "600", color: Colors[theme].text + "40" }}
      >
        PRIVACIDAD
      </MyText>
      <InfoField
        theme={theme}
        label={"Notificaciones"}
        value={isNotificationSwitchEnabled}
        handleUpdate={handleToggleNotifications}
      />
      <InfoField
        theme={theme}
        label={"Ubicación"}
        value={isLocationSwitchEnabled}
        handleUpdate={handleToggleLocation}
      />
      <Pressable
        onPress={handleSignOut}
        style={[
          styles.fieldContainer,
          { borderBottomColor: Colors[theme].text + "40", paddingVertical: 22 },
        ]}
      >
        <MyText
          type="caption"
          style={{
            fontWeight: "500",
            color: Colors[theme].text + "80",
            paddingRight: 10,
          }}
        >
          Cerrar sesión
        </MyText>
      </Pressable>
      <Pressable
        onPress={() => setIsModalOpen(!isModalOpen)}
        style={[
          styles.fieldContainer,
          { borderBottomColor: Colors[theme].text + "40", paddingVertical: 22 },
        ]}
      >
        <MyText
          type="caption"
          style={{
            fontWeight: "500",
            color: Colors[theme].red,
            paddingRight: 10,
          }}
        >
          Eliminar cuenta
        </MyText>
      </Pressable>
      <MyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dispatch={dispatch}
        user={user}
        handleDeleteAccount={handleDeleteAccount}
      />
    </View>
  );
}

function InfoField({ label, value, theme, handleUpdate }) {
  return (
    <View
      style={[
        styles.fieldContainer,
        { borderBottomColor: Colors[theme].text + "40" },
      ]}
    >
      <MyText
        type="caption"
        style={{
          fontWeight: "500",
          color: Colors[theme].text + "80",
          paddingRight: 10,
        }}
      >
        {label}
      </MyText>
      <Switch value={value} onChange={handleUpdate} />
    </View>
  );
}

function MyModal({ isModalOpen, setIsModalOpen, handleDeleteAccount, user }) {
  const theme = useColorScheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Modal visible={isModalOpen} transparent={true} animationType={"slide"}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.modalStyle(theme)}
          // extraHeight={50}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cerrar */}
          <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
            <Ionicons
              name="close-outline"
              size={30}
              color={theme === "dark" ? "white" : "black"}
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          {/* Correo electrónico */}
          <MyInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={isModalOpen}
          />
          {/* Contraseña */}
          <MyInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            isPassword
          />
          {/* Eliminar cuenta */}
          <MyButton
            title={isLoading ? "Cargando..." : "Eliminar cuenta"}
            onPress={() =>
              handleDeleteAccount(
                user,
                email,
                password,
                isLoading,
                setIsLoading
              )
            }
          />
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
  },
  modalStyle: (theme) => ({
    width: "92%",
    backgroundColor: Colors[theme].background,
    borderColor: Colors[theme].text + "80",
    alignSelf: "center",
    marginTop: "50%",
    marginBottom: "10%",
    borderRadius: 10,
    padding: 20,
  }),
});
