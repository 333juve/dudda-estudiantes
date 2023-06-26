import * as React from "react";
import { Alert } from "react-native";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userReducer";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import moment from "moment";
import { i18n } from "../../languages";

const AuthContext = React.createContext({
  authState: "default",
  setAuthState: () => {},
  birthday: "",
  setBirthday: () => {},
  confirmPassword: "",
  setConfirmPassword: () => {},
  email: "",
  setEmail: () => {},
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  password: "",
  setSex: () => {},
  setPassword: () => {},
  phoneNumber: "",
  setPhoneNumber: () => {},
  verificationCode: "",
  setVerificationCode: () => {},
  isLoading: false,
  handleConfirmSignUp: () => {},
  handleForgotPassword: () => {},
  handleResetPassword: () => {},
  handleResendVerificationCode: () => {},
  handleSignIn: () => {},
  handleSignUp: () => {},
});

const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [authState, setAuthState] = React.useState("default");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [birthday, setBirthday] = React.useState(new Date());
  const [password, setPassword] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [sex, setSex] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [countryCode, setCC] = React.useState(null);
  const [countryName, setCN] = React.useState(null);
  const [countryFlag, setCF] = React.useState(null);
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  async function handleSignIn() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      Alert.alert(`${i18n.t("incompleteInform")}`, `${i18n.t("noEmailRPass")}`);
      return;
    } else {
      try {
        setIsLoading(true);
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
        const user = auth.currentUser;
        const docRef = doc(db, "students", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(
            setUser({
              birthday: docSnap.data().birthday,
              createdAt: docSnap.data().createdAt,
              email: docSnap.data().email.toLowerCase(),
              firstName: docSnap.data().firstName,
              country: docSnap.data()?.country,
              id: docSnap.id,
              lastName: docSnap.data().lastName,
              latitude: docSnap.data().latitude,
              longitude: docSnap.data().longitude,
              notificationToken: docSnap.data().notificationToken,
              phoneNumber: docSnap.data().phoneNumber,
              profilePicture: docSnap.data().profilePicture,
            })
          );
          setIsLoading(false);
        }
        // Error: No existe la cuenta.
        else {
          Alert.alert(
            `${i18n.t("faildToLogin")}`,
            `${i18n.t("faildToLoginDesc")}`,
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
              },
            ],
            { cancelable: true }
          );
          setIsLoading(false);
        }
      } catch (e) {
        // Error: Credenciales incorrectas.
        Alert.alert(
          `${i18n.t("faildToLogin")}`,
          `${i18n.t("emailOrPasswordisWrong")}`,
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: true }
        );
        console.log(e);
        setIsLoading(false);
      }
    }
  }

  async function handleSignUp() {
    const trimmedEmail = email.trim();

    if (
      !trimmedEmail ||
      !password ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !countryCode ||
      !birthday
    ) {
      Alert.alert(
         `${i18n.t('incompleteInform')}`,
        `${i18n('incompleteInform')}`,
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(`${i18n.t('tryAgain')}`, `${i18n.t('passwordNotMatch')}`);
      return;
    }
    try {
      setIsLoading(true);
      const fullName = firstName.concat(" ", lastName);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );
      await sendEmailVerification(auth.currentUser);
      await updateProfile(user, {
        displayName: fullName,
      });
      await saveUserToDatabase(user, email, password);
      setIsLoading(false);
    } catch (e) {
      // Error en el registro
      Alert.alert(
         `${i18n.t('errorSignup')}`,
         `${i18n.t('errorSignupMess')}`,[
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: true }
      );
      console.log(e);
      setIsLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      Alert.alert(
         `${i18n.t('emailRequired')}`,
         `${i18n.t('enterEmail')}`
      );
      return;
    }
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        `${i18n.t('emailSent')}`,
        `${i18n.t('checkmailToresetPass')}`
      );
    } catch (e) {
      Alert.alert(
        `${i18n.t('errorSendingMail')}`,
        `${i18n.t('errorSendingMailMess')}`,
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: true }
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword() {}

  async function handleResendVerificationCode() {}

  async function saveUserToDatabase(user) {
    const trimmedEmail = email.trim();

    const userToSave = {
      birthday: formatDate(birthday),
      createdAt: new Date().toDateString(),
      email: trimmedEmail.toLowerCase(),
      firstName: firstName,
      id: user.uid,
      lastName: lastName,
      latitude: null,
      longitude: null,
      sex: sex,
      notificationToken: null,
      phoneNumber: phoneNumber,
      profilePicture: null,
      country: {
        countryCode: countryCode,
        countryName: countryName,
        countryFlag: countryFlag,
      },
    };
    try {
      await setDoc(doc(db, "students", user.uid), userToSave);
      dispatch(setUser(userToSave));
      console.log("User saved to database and Redux", userToSave);
    } catch (e) {
      console.log("Error saving user", e);
    }
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        birthday,
        setBirthday,
        confirmPassword,
        setConfirmPassword,
        email,
        setEmail,
        firstName,
        setFirstName,
        password,
        setPassword,
        phoneNumber,
        setPhoneNumber,
        lastName,
        setLastName,
        verificationCode,
        setVerificationCode,
        isLoading,
        handleForgotPassword,
        handleResetPassword,
        handleResendVerificationCode,
        handleSignIn,
        handleSignUp,
        setSex,
        setCC,
        setCN,
        setCF,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
