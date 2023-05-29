import * as React from "react";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { AuthContext } from "../../context/AuthContext";
import LogoLight from "../../../assets/logoLight.svg";
import LogoDark from "../../../assets/logoDark.svg";
import { useColorScheme, View } from "react-native";

export default function DefaultAuth() {
  const { setAuthState } = React.useContext(AuthContext);
  const theme = useColorScheme();

  return (
    <React.Fragment>
      <View style={{ alignItems: "center", paddingTop: 190 }}>
        {theme == "dark" ? (
          <LogoDark height={120} width={190} />
        ) : (
          <LogoLight height={120} width={190} />
        )}
      </View>
      <MyButton title="Registrarme" onPress={() => setAuthState("signUp")} />
      <MyButton
        type="secondary"
        title="Iniciar sesión"
        onPress={() => setAuthState("signIn")}
      />
    </React.Fragment>
  );
}
