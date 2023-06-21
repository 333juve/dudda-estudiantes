import * as React from "react";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { Pressable } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import Colors from "../../../constants/colors";
import { i18n } from "../../../languages";

export default function SignIn() {
  const { setAuthState, setEmail, setPassword, handleSignIn, isLoading } =
    React.useContext(AuthContext);
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 30 }}>
      {i18n.t("login")}
      </MyText>
      <MyInput
        label= {i18n.t("email")}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <MyInput
        label= {i18n.t("password")}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        showIcon={true}
        onIconPress={toggleShowPassword}
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
         {i18n.t("forgetPassword")}
        </MyText>
      </Pressable>
      <MyButton
        title={isLoading ? `${i18n.t("loading")}`: `${i18n.t("login")}`}
        disabled={isLoading ? true : false}
        onPress={handleSignIn}
        style={{ marginTop: 20 }}
      />
      <MyButton
        title= {i18n.t("back")}
        type="secondary"
        onPress={() => setAuthState("default")}
      />
    </React.Fragment>
  );
}
