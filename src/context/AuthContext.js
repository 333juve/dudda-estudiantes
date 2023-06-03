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
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  async function handleSignIn() {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail || !password) {
      Alert.alert(
        "Información incompleta",
        "Por favor, ingresa tu correo electrónico y contraseña."
      );
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
            "Error al iniciar sesión",
            "Lo sentimos, no hemos encontrado una cuenta con esa información. Por favor, revisa tus datos e intenta de nuevo.",
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
          "Error al iniciar sesión",
          "El correo electrónico o la contraseña son incorrectos. Por favor, verifica tus credenciales e intenta nuevamente.",
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
  };

  async function handleSignUp() {
    const trimmedEmail = email.trim();

    if (
      !trimmedEmail ||
      !password ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !birthday
    ) {
      Alert.alert(
        "Información incompleta",
        "Por favor, completa tus datos para poder registrarte."
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Intente de nuevo", "Las contraseñas no coinciden.");
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
        "Error al registrarse",
        "Ocurrió un error durante el registro. Por favor, verifica tus datos e intenta nuevamente.",
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
  };

  async function handleForgotPassword() {
    if (!email) {
      Alert.alert(
        "Correo electrónico requerido",
        "Por favor, ingresa tu correo electrónico."
      );
      return;
    }
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Correo enviado",
        "Por favor, revisa tu correo electrónico para restablecer tu contraseña."
      );
    } catch (e) {
      Alert.alert(
        "Error al enviar código",
        "Ocurrió un error al enviar el código para restablecer la contraseña. Por favor, verifica la información ingresada e intenta nuevamente.",
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
  };

  async function handleResetPassword() {};

  async function handleResendVerificationCode() {};

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
      notificationToken: null,
      phoneNumber: phoneNumber,
      profilePicture: null,
    };
    try {
      await setDoc(doc(db, "students", user.uid), userToSave);
      dispatch(setUser(userToSave));
      console.log("User saved to database and Redux", userToSave);
    } catch (e) {
      console.log("Error saving user", e);
    }
  };

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
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
