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
import { LogBox } from "react-native";

LogBox.ignoreLogs(["AsyncStorage"]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Wrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
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
  };

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
