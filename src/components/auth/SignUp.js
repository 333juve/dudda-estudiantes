import * as React from "react";
import { View, Text } from "react-native";
import MyDatePicker from "../MyDatePicker";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { AuthContext } from "../../context/AuthContext";

export default function SignUp() {
  const {
    setAuthState,
    setEmail,
    setPassword,
    handleSignUp,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setBirthday,
    birthday,
    isLoading,
    setConfirmPassword,
  } = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 35 }}>
        ¡Regístrate y enseña con nosotros!
      </MyText>
      <MyInput
        label="Nombres"
        onChangeText={setFirstName}
        returnKeyType={"done"}
      />
      <MyInput
        label="Apellido paterno"
        onChangeText={setLastName}
        returnKeyType={"done"}
      />
      <MyDatePicker label="Fecha de nacimiento" onDateChange={setBirthday} />
      <MyInput
        label="Teléfono"
        onChangeText={setPhoneNumber}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"phone-pad"}
        maxLength={9}
        returnKeyType={"done"}
      />
      <MyInput
        label="Correo electrónico"
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType={"done"}
      />
      <MyInput
        label="Contraseña"
        onChangeText={setPassword}
        secureTextEntry
        isPassword
        returnKeyType={"done"}
      />
      <MyInput
        label="Repetir contraseña"
        onChangeText={setConfirmPassword}
        secureTextEntry
        isPassword
        returnKeyType={"done"}
      />
      <MyButton
        title={isLoading ? "Cargando..." : "Registrarme"}
        disabled={isLoading ? true : false}
        onPress={handleSignUp}
      />
      <MyButton
        title="Regresar"
        type="secondary"
        onPress={() => setAuthState("signIn")}
      />
    </React.Fragment>
  );
}
