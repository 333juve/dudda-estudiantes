import * as React from "react";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { AuthContext } from "../../context/AuthContext";
import LogoLight from "../../../assets/logoLight.svg";
import LogoDark from "../../../assets/logoDark.svg";
import { useColorScheme, View } from "react-native";
import { i18n } from "../../../languages";

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
      <MyButton title={i18n.t('signup')} onPress={() => setAuthState("signUp")} />
      <MyButton
        type="secondary"
        title={i18n.t("login")}
        onPress={() => setAuthState("signIn")}
      />
    </React.Fragment>
  );
}
