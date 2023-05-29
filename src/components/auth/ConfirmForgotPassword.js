import * as React from "react";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { AuthContext } from "../../context/AuthContext";

export default function ConfirmForgotPassword() {
  const {
    setAuthState,
    isLoading,
    setVerificationCode,
    setPassword,
    setConfirmPassword,
    handleResetPassword,
  } = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 5 }}>
        Reestablecer contraseña
      </MyText>
      <MyText type="caption" style={{ marginBottom: 15 }}>
        Ingrese el código de verificación y su nueva contraseña.
      </MyText>
      <MyInput
        label="Código de verificación"
        onChangeText={setVerificationCode}
      />
      <MyInput
        label="Nueva contraseña"
        onChangeText={setPassword}
        secureTextEntry
      />
      <MyInput
        label="Repetir contraseña"
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <MyButton
        title={isLoading ? "Cargando..." : "Reestablecer contraseña"}
        disabled={isLoading ? true : false}
        style={{ marginTop: 20 }}
        onPress={handleResetPassword}
      />
      <MyButton
        type="secondary"
        title="Regresar"
        onPress={() => setAuthState("signIn")}
      />
    </React.Fragment>
  );
}
