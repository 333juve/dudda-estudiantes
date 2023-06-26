import * as React from "react";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { AuthContext } from "../../context/AuthContext";
import { i18n } from "../../../languages";

export default function ForgotPassword() {
  const { setAuthState, setEmail, isLoading, handleForgotPassword } =
    React.useContext(AuthContext);

  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 10 }}>
        {i18n.t('forgetPassword')}
      </MyText>
      <MyText type="caption" style={{ marginBottom: 20 }}>
         {i18n.t('forrgetPassMess')}
      </MyText>
      <MyInput
        label={i18n.t('email')}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <MyButton
        title={isLoading ?  `${i18n.t('sendingCode')}` : `${i18n.t('sendCode')}`}
        disabled={isLoading ? true : false}
        style={{ marginTop: 20 }}
        onPress={handleForgotPassword}
      />
      <MyButton
        type="secondary"
        title={i18n.t('back')}
        onPress={() => setAuthState("signIn")}
      />
    </React.Fragment>
  );
}
