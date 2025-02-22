import * as React from "react";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { Pressable } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import Colors from "../../../constants/colors";

export default function SignIn() {
  const { setAuthState, setEmail, setPassword, handleSignIn, isLoading } =
    React.useContext(AuthContext);

  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 30 }}>
        Iniciar sesión
      </MyText>
      <MyInput
        label={"Correo electrónico"}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <MyInput
        label={"Contraseña"}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={() => setAuthState("forgotPassword")}>
        <MyText
          style={{
            color: Colors.light.tint,
            position: "absolute",
            right: 0,
            top: -15,
          }}
          type="caption"
        >
          ¿Olvidaste tu contraseña?
        </MyText>
      </Pressable>
      <MyButton
        title={isLoading ? "Cargando..." : "Iniciar sesión"}
        disabled={isLoading ? true : false}
        onPress={handleSignIn}
        style={{ marginTop: 20 }}
      />
      <MyButton
        title={"Retroceder"}
        type="secondary"
        onPress={() => setAuthState("default")}
      />
    </React.Fragment>
  );
}
