import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import MyText from "../components/MyText";

export default function Historial() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const { lessons } = useSelector((state) => state.lessons);

  const Lesson = ({ lesson, selectedTutor, setSelectedTutor }) => {
    const isSelected = selectedTutor?.id === lesson.tutor.id;
    const theme = useColorScheme();
  
    const handlePress = () => {
      if (isSelected) {
        setSelectedTutor(null);
      } else {
        setSelectedTutor(lesson.tutor);
      }
    };
    
    return (
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            alignItems: "center",
            backgroundColor: isSelected
              ? theme === "dark"
                ? "#A0A0A0"
                : "#E0E0E0"
              : "transparent",
            borderRadius: 7,
            padding: 10,
          }}
        >
          {lesson.tutor.profilePicture ? (
            <Image
              source={{ uri: lesson.tutor.profilePicture }}
              style={styles.image}
            />
          ) : (
            <View style={styles.fallback}>
              <MyText style={{ fontSize: 20, color: "#fff" }} type="caption">
                {lesson.tutor.firstName.charAt(0)}
              </MyText>
            </View>
          )}
          <View style={{ marginLeft: 20 }}>
            <MyText>
              {lesson.tutor.firstName} {lesson.tutor.lastName}
            </MyText>
            <MyText type="caption" style={{ color: "#2F95DC" }}>
              {lesson.subject}
            </MyText>
            <MyText type="caption">
              Últ. clase: {lesson.date}, de {lesson.startTime} a {lesson.endTime}
            </MyText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredLessons = lessons.reduce((uniqueLessons, lesson) => {
    const existingTutorIndex = uniqueLessons.findIndex(
      (uniqueLesson) => uniqueLesson.tutor.id === lesson.tutor.id
    );

    if (existingTutorIndex === -1) {
      uniqueLessons.push(lesson);
    } else {
      const currentDate = new Date(lesson.date + " " + lesson.endTime);
      const uniqueLessonDate = new Date(
        uniqueLessons[existingTutorIndex].date +
          " " +
          uniqueLessons[existingTutorIndex].endTime
      );

      if (currentDate > uniqueLessonDate) {
        uniqueLessons[existingTutorIndex] = lesson;
      }
    }

    return uniqueLessons;
  }, []);

  const [selectedTutor, setSelectedTutor] = React.useState(null);
  // const [loading, setLoading] = React.useState(false);
  // const [schedule, setSchedule] = React.useState([]);

  // const getData = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await getDoc(doc(db, "tutors", selectedTutor.id));
  //     console.log("schedule ", res.data().schedule);
  //     setSchedule(res.data().schedule);
  //     setLoading(false);
  //   } catch (e) {
  //     setLoading(false);
  //     console.log(e);
  //   }
  // };

  // console.log("selected Tutor", selectedTutor, "schedule :", schedule);
  // useEffect(() => {
  //   getData();
  // }, [selectedTutor]);

  const initiateWhatsAppSMS = () => {
    const message = `¡Hola! Me gustaría programar una clase con ${selectedTutor.firstName} ${selectedTutor.lastName}. Le comparto mis datos: Mi nombre es ${user.firstName} ${user.lastName} y mi ID es ${user.id}`;
    let url = "whatsapp://send?text=" + message + "&phone=92" + "3170695979";
    Linking.openURL(url)
      .then(() => navigation.navigate("Inicio"))
      .catch(() => {
        Alert.alert(
          "Instala WhatsApp",
          "Asegúrate de tener WhatsApp instalado en tu dispositivo."
        );
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 0.8, width: "90%" }}>
        {filteredLessons.map((lesson) => (
          <Lesson
            key={lesson.id}
            lesson={lesson}
            selectedTutor={selectedTutor}
            setSelectedTutor={setSelectedTutor}
          />
        ))}
      </ScrollView>
      <View style={{ flex: 0.15, width: "90%" }}>
        <TouchableOpacity
          onPress={() => {
            if (!loading) {
              // navigation.navigate("Programar", {
              //   tutor: selectedTutor,
              //   schedule: schedule,
              // });
              Alert.alert(
                "Envíanos un mensaje",
                "Por ahora, programa tu clase a través de WhatsApp, escríbenos y te ayudamos.",
                [
                  {
                    text: "Confirmar",
                    onPress: initiateWhatsAppSMS,
                  },
                  {
                    text: "Cancelar",
                    onPress: () => {},
                    style: "cancel",
                  },
                ],
                { cancelable: true }
              );
            }
          }}
          disabled={!selectedTutor}
          style={[
            styles.button,
            { backgroundColor: selectedTutor ? "#0071BC" : "grey" },
          ]}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            {!loading ? "Continuar" : "Cargando..."}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  fallback: {
    backgroundColor: "#F06999",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
  },
  button: {
    backgroundColor: "red",
    borderRadius: 7,
    paddingVertical: 10,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
