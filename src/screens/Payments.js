import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Dimensions,
  ScrollView,
  RefreshControl,
  useColorScheme,
} from "react-native";
import React from "react";
import MyText from "../components/MyText";
import { useSelector, useDispatch } from "react-redux";
import LessonCard from "../components/payments/LessonCard";
import { getLessons } from "../utils/lessonsOperations";
import { useNavigation } from "@react-navigation/native";

export default function Payments() {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const { lessons } = useSelector((state) => state.lessons);
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const [refreshing, setRefreshing] = React.useState(false);

  async function handleOnRefresh(userID) {
    setRefreshing(true);
    await getLessons(userID, dispatch);
    setRefreshing(false);
  }

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [day, month, year].join("/");
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => handleOnRefresh(user.id)}
        />
      }
    >
      <View style={{ flex: 0.9 }}>
        <MyText style={styles.lessonsScheduled}>Historial de clases</MyText>
        {lessons.length === 0 ? (
          <MyText style={styles.default}>
            Aún no has tenido ninguna clase.
          </MyText>
        ) : (
          lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  card: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  classContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#ADB3B3",
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  default: {
    marginTop: 20,
    alignSelf: "center",
    color: "#ADB3B3",
  },
  lessonsScheduled: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 30,
  },
});
