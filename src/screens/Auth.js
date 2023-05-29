//React
import React from "react";
import { StatusBar, useColorScheme } from "react-native";
//Community packages
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Constants
import Colors from "../../constants/colors";
//Auth components
import DefaultAuth from "../components/auth/DefaultAuth";
import ConfirmForgotPassword from "../components/auth/ConfirmForgotPassword";
import ConfirmSignUp from "../components/auth/ConfirmSignUp";
import ForgotPassword from "../components/auth/ForgotPassword";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
//Redux
import { AuthContext, AuthProvider } from "../context/AuthContext";

export default function Wrapper() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}

function Auth() {
  const { authState } = React.useContext(AuthContext);
  const theme = useColorScheme();

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor:
          theme === "dark" ? Colors.dark.background : Colors.light.background,
        paddingHorizontal: 17,
      }}
      contentContainerStyle={{ paddingVertical: 90 }}
      showsVerticalScrollIndicator={false}
    >
      {authState === "default" && <DefaultAuth />}
      {authState === "signIn" && <SignIn />}
      {authState === "signUp" && <SignUp />}
      {authState === "confirmSignUp" && <ConfirmSignUp />}
      {authState === "forgotPassword" && <ForgotPassword />}
      {authState === "confirmForgotPassword" && <ConfirmForgotPassword />}
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
    </KeyboardAwareScrollView>
  );
}
