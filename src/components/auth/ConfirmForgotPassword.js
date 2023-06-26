import * as React from "react";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import MyText from "../MyText";
import { AuthContext } from "../../context/AuthContext";
import { i18n } from "../../../languages";

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
      {i18n.t('resetPassword')}
      </MyText>
      <MyText type="caption" style={{ marginBottom: 15 }}>
       {i18n.t('resetPasswordMess')}
      </MyText>
      <MyInput
        label={i18n.t('verificationCode')}
        onChangeText={setVerificationCode}
      />
      <MyInput
        label={i18n.t('newPassword')}
        onChangeText={setPassword}
        secureTextEntry
      />
      <MyInput
        label={i18n.t('repeatPassword')}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <MyButton
        title={isLoading ?  `${i18n.t('loading')}` : `${i18n.t('resetPassword')}`}
        disabled={isLoading ? true : false}
        style={{ marginTop: 20 }}
        onPress={handleResetPassword}
      />
      <MyButton
        type="secondary"
        title={i18n.t('back')}
        onPress={() => setAuthState("signIn")}
      />
    </React.Fragment>
  );
}
