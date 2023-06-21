//React
import * as React from "react";
//Firebase
import { auth, db } from "./src/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
//Redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/app/store";
import { resetUser, setUser } from "./src/features/userReducer";
//Screens
import Root from "./src/navigation/Root";
import Splash from "./src/screens/Splash";
import Auth from "./src/screens/Auth";
//Expo
import * as Notifications from "expo-notifications";
import { LogBox, View, useColorScheme } from "react-native";
import Colors from "./constants/colors";
import * as Localization from "expo-localization";
import { i18n } from "./languages";
import MyButton from "./src/components/MyButton";
LogBox.ignoreLogs(["AsyncStorage"]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
i18n.locale = Localization.locale;
i18n.enableFallback = true;
export default function Wrapper() {
  const theme = useColorScheme();
  const [language, setLanguage] = React.useState(null);
  if (language) {
    i18n.locale = language;
  }
  const handleLanguageSelection = async (selectedLanguage) => {
    setLanguage(selectedLanguage);
    //await AsyncStorage.setItem("@pickLanguage", selectedLanguage);
  };
  console.log(language);
  return language ? (
    <Provider store={store}>
      <App />
    </Provider>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          theme === "dark" ? Colors.dark.background : Colors.light.background,
      }}
    >
      <MyButton
        title={"Español"}
        onPress={() => handleLanguageSelection("es")}
        style={{ width: "90%" }}
      />
      <MyButton
        type="secondary"
        title={"English"}
        onPress={() => handleLanguageSelection("en")}
        style={{ width: "90%" }}
      />
    </View>
  );
}

function App() {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  async function getUser(userID) {
    const userRef = doc(db, "students", userID);
    const userDoc = await getDoc(userRef);
    return userDoc;
  }

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getUser(user.uid);
        dispatch(
          setUser({
            birthday: userDoc.data()?.birthday,
            createdAt: userDoc.data()?.createdAt,
            email: userDoc.data()?.email,
            firstName: userDoc.data()?.firstName,
            id: userDoc.data()?.id,
            lastName: userDoc.data()?.lastName,
            latitude: userDoc.data()?.latitude,
            longitude: userDoc.data()?.longitude,
            notificationToken: userDoc.data()?.notificationToken,
            phoneNumber: userDoc.data()?.phoneNumber,
            profilePicture: userDoc.data()?.profilePicture,
          })
        );
        console.log("User signed in.");
      } else {
        dispatch(resetUser());
        console.log("User signed out.");
      }
      setIsLoading(false);
    });
    return unsubscribeAuth;
  }, []);

  if (isLoading) return <Splash />;
  return user?.email ? <Root /> : <Auth />;
}
