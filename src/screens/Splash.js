import * as React from "react";
import { View } from "../components/themed/Themed";
import {
  ActivityIndicator,
  View as DefaultView,
  StyleSheet,
} from "react-native";
import MyText from "../components/MyText";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/userReducer";
import { setNotifications } from "../features/notificationsReducer";
import { getUser } from "../utils/userOperations";
import { getNotifications } from "../utils/notificationsOperations";

export default function Splash() {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      try {
        if (user && user.id !== undefined) {
          const userDoc = await getUser(user.id);
          const { notificationsList } = await getNotifications(user.id, dispatch);
          if (notificationsList) dispatch(setNotifications(notificationsList));
          dispatch(
            setUser({
              birthday: userDoc.data().birthday,
              createdAt: userDoc.data().createdAt,
              email: userDoc.data().email,
              firstName: userDoc.data().firstName,
              id: userDoc.data().id,
              lastName: userDoc.data().lastName,
              latitude: userDoc.data().latitude,
              longitude: userDoc.data().longitude,
              notificationToken: userDoc.data().notificationToken,
              phoneNumber: userDoc.data().phoneNumber,
              profilePicture: userDoc.data().profilePicture,
            })
          );
        } else {
          console.log("no user logged in");
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MyText type="title">Cargando...</MyText>
      <ActivityIndicator size={"large"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
