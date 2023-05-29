import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { resetUser } from "../features/user";
import { auth } from "../config/firebase";
import MyText from "../components/MyText";
import Ionicons from "react-native-vector-icons/Ionicons";

export function LogOut() {
  const dispatch = useDispatch();

  async function handleSignOut() {
    try {
      await signOut(auth);
      dispatch(resetUser());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut} style={{ marginVertical: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="exit-outline" size={22} color={"rgb(229, 229, 231)"} />
        <MyText type="caption">Cerrar sesión</MyText>
      </View>
    </TouchableOpacity>
  );
}
