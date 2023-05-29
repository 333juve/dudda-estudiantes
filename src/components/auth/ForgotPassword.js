import * as React from "react";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { AuthContext } from "../../context/AuthContext";

export default function ForgotPassword() {
  const { setAuthState, setEmail, isLoading, handleForgotPassword } =
    React.useContext(AuthContext);

  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 10 }}>
        ¿Olvidaste tu contraseña?
      </MyText>
      <MyText type="caption" style={{ marginBottom: 20 }}>
        Por favor, ingresa tu dirección de correo electrónico y te enviaremos un
        enlace donde podrás restablecer tu contraseña.
      </MyText>
      <MyInput
        label="Correo electrónico"
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <MyButton
        title={isLoading ? "Enviando código..." : "Enviar código"}
        disabled={isLoading ? true : false}
        style={{ marginTop: 20 }}
        onPress={handleForgotPassword}
      />
      <MyButton
        type="secondary"
        title="Regresar"
        onPress={() => setAuthState("signIn")}
      />
    </React.Fragment>
  );
}
