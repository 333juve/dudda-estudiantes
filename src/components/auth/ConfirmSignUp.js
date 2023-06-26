import * as React from "react";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { AuthContext } from "../../context/AuthContext";

export default function ConfirmSignUp() {
  const {
    email,
    setEmail,
    setVerificationCode,
    handleConfirmSignUp,
    setAuthState,
    handleResendVerificationCode,
  } = React.useContext(AuthContext);
  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 5 }}>
        Confirmar registro
      </MyText>
      <MyText type="caption" style={{ marginBottom: 15 }}>
      {/* TODO: REDACTAR ESTA PARTE */}
      {/* Ingrese su dirección de correo electrónico y le enviaremos un código
        para confirmar su contraseña. */}
      </MyText>
      <MyInput label="Correo institucional" value={email} onChangeText={setEmail} />
      <MyInput label="Código" onChangeText={setVerificationCode} />
      <MyButton title="Crear cuenta" onPress={handleConfirmSignUp} />
      <MyButton
        title="Re-enviar código"
        type={"secondary"}
        onPress={handleResendVerificationCode}
      />
      <MyButton
        title="Regresar"
        type={"secondary"}
        onPress={() => setAuthState("signIn")}
      />
    </React.Fragment>
  );
}
