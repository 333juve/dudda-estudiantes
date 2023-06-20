import * as React from "react";
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import MyDatePicker from "../MyDatePicker";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import Colors from "../../../constants/colors";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import { CountryPicker } from "react-native-country-codes-picker";
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
    setSex,
    setCC,
    setCN,
    setCF,
    isLoading,
    setConfirmPassword,
  } = React.useContext(AuthContext);
  const theme = useColorScheme();
  const [showCountry, setShowCountry] = React.useState(false);
  const [cc, setC] = React.useState("+1");
  const [cn, setN] = React.useState("United States");
  const [cf, setF] = React.useState("🇺🇸");
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedSex, setSelectedSex] = React.useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };
  return (
    <React.Fragment>
      <CountryPicker
        show={showCountry}
        pickerButtonOnPress={(item) => {
          setShowCountry(false);
          console.log(item.name.en);
          setCC(item.dial_code);
          setCF(item.flag);
          console.log(item.flag);
          setCN(item.name.en);
          setC(item.dial_code);
          setF(item.flag);
          setN(item.name.en);
        }}
        style={{
          modal: {
            height: 500,
          },
        }}
        onBackdropPress={() => setShowCountry(false)}
      />
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
      <MyText style={{ marginBottom: 5, fontWeight: "bold" }} type="caption">
        {"Sex"}
      </MyText>
      <RadioButtonGroup
        containerStyle={[styles[theme]]}
        selected={selectedSex}
        onSelected={(value) => {
          setSelectedSex(value);
          setSex(value);
        }}
        radioBackground="#0c72f0"
      >
        <RadioButtonItem
          value="male"
          label="Masculino"
          style={{ margin: 10 }}
        />
        <RadioButtonItem
          value="female"
          label="Femenino"
          style={{ margin: 10 }}
        />
      </RadioButtonGroup>
      <View style={{ flexDirection: "row", width: "100%", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => setShowCountry(true)}
          style={[styles.country, styles[theme]]}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <MyText style={{ fontSize: 14 }}>{cf} </MyText>
            <MyText style={{ fontSize: 14 }}>({cc})</MyText>
          </View>
        </TouchableOpacity>

        <TextInput
          placeholder={"Teléfono"}
          autoCapitalize="none"
          onChangeText={setPhoneNumber}
          autoCorrect={false}
          keyboardType={"phone-pad"}
          maxLength={9}
          style={[styles.phoneNumber, styles[theme]]}
        />
      </View>
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
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        showIcon={true}
        onIconPress={toggleShowPassword}
      />
      <MyInput
        label="Repetir contraseña"
        onChangeText={setConfirmPassword}
        secureTextEntry={!showRepeatPassword}
        autoCapitalize="none"
        autoCorrect={false}
        showIcon={true}
        onIconPress={toggleShowRepeatPassword}
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  country: {
    flex: 0.25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomStartRadius: 8,
    borderTopStartRadius: 8,
    borderWidth: 1,
  },
  phoneNumber: {
    flex: 0.75,
    height: 50,
    paddingLeft: 10,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light.text + "80",
  },
  radioButton: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dark: {
    backgroundColor: Colors.dark.text + "06",
    borderColor: Colors.dark.text + "80",
    borderLeftColor: Colors.dark.text,
    color: Colors.dark.text,
  },
  light: {
    backgroundColor: Colors.light.text + "06",
    borderColor: Colors.light.text + "80",
    borderLeftColor: Colors.light.text, // light mode border color
    color: Colors.light.text,
  },
});
