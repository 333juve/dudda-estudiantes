import * as React from "react";
import {
  StyleSheet,
  Button,
  Alert,
  Linking,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  View,
  StatusBar,
  useColorScheme,
} from "react-native";
import MyText from "../components/MyText";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { getLessons } from "../utils/lessonsOperations";
import { getNotifications } from "../utils/notificationsOperations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import PastTutor from "../../assets/past-tutor.svg";
import NewTutor from "../../assets/new-tutor.svg";
import Calendar from "../../assets/calendar.svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomPickerModal from "../components/home/CustomPicker";
import { collection, onSnapshot, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";
import { requestUserLocation } from "../utils/requestUserLocation";
import {
  updateUserLocation,
  updateUserNotificationToken,
} from "../utils/userOperations";
import { resetNotificationToken, resetLocation } from "../features/userReducer";
import moment from "moment";
import "moment/locale/es";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../../constants/colors";
import { setLessonsReducer } from "../features/lessonsReducer";
import MyButton from "../components/MyButton";
import { i18n } from "../../languages";

export default function Home() {
  const user = useSelector((state) => state.user);
  const { lessons } = useSelector((state) => state.lessons);
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(true);
  const [refreshing, setIsRefreshing] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");
  const [selectedLesson, setSelectedLesson] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const bottomSheetModalRef = React.useRef(null);

  const handleClosePress = () => bottomSheetModalRef.current.close();

  const snapPoints =
    modalContent === "NEW_LESSON"
      ? ["40%", "40%"]
      : modalContent === "NEW_TUTOR"
      ? ["60%", "60%"]
      : modalContent === "JOIN_LESSON"
      ? ["42%", "42%"]
      : [];

  const [showPicker, setShowPicker] = React.useState(false);
  // date
  const [selectedDate, setSelectedDate] = React.useState(null);

  // modal
  const [modalVisible, setModalVisible] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [checkpoints, setCheckpoints] = React.useState([]);
  const [timeDiff, setTimeDiff] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [tutorSchedule, setTutorSchedule] = React.useState([]);
  const [lessonScheduleData, setlessonScheduleData] = React.useState([]);
  const [freetutors, setFreeTutors] = React.useState([]);
  const [selectedTutor, setSelectedTutor] = React.useState();
  const [day, setDay] = React.useState();
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    checkFirstLaunch();
    getLessons(user.id, dispatch);
    getNotifications(user.id, dispatch);
    setIsLoading(false);
  }, []);

  async function checkFirstLaunch() {
    const firstLaunch = await AsyncStorage.getItem("@firstLaunch");
    if (firstLaunch === null) navigation.navigate("Agreement");
    // const token = await registerForPushNotificationsAsync();
    // const location = await requestUserLocation();
    // if (token !== null) {
    //await updateUserLocation(user.id, location);
    // await updateUserNotificationToken(user.id, token);
    //dispatch(resetNotificationToken(token));
    //  dispatch(resetLocation(location));
    //}
  }

  React.useEffect(() => {
    const unsubscribeLessons = onSnapshot(
      collection(db, "lessons"),
      (querySnapshot) => {
        const lessonData = [];
        querySnapshot.forEach((doc) => {
          lessonData.push(doc.data());
        });
        setlessonScheduleData(lessonData);
      }
    );

    const unsubscribeTutors = onSnapshot(
      collection(db, "tutors"),
      (querySnapshot) => {
        const scheduleData = [];
        querySnapshot.forEach((doc) => {
          scheduleData.push(doc.data());
        });
        setTutorSchedule(scheduleData);
      }
    );

    return () => {
      unsubscribeLessons();
      unsubscribeTutors();
    };
  }, []);

  React.useEffect(() => {
    findTutor();
  }, [endTime, selectedDate, startTime, day]);

  async function findTutor() {
    const availAbleTutors = [];
    // console.log("Selected day", selectedDate?.getDay());
    // tutorSchedule?.forEach((x) => {
    //   //  console.log("day", day);
    //   const tutorHours = x.schedule[day].hours;
    //   //const tutorHours = x.schedule[0].hours;
    //   console.log("tutor hours ", x.id);
    //   if (checkpoints) {
    //     let tutorAvailable = [];
    //     for (let i = 0; i < tutorHours.length; i++) {
    //       for (let j = 0; j < checkpoints.length; j++) {
    //         if (
    //           tutorHours[i].startTime === checkpoints[j].startTime &&
    //           tutorHours[i].endTime === checkpoints[j].endTime &&
    //           tutorHours[i].isFree === true
    //         ) {
    //           tutorAvailable.push(1);
    //         }
    //       }
    //     }
    //     console.log("tutor available ", tutorAvailable);
    //     if (tutorAvailable.length >= checkpoints.length) {
    //       availAbleTutors.push({
    //         id: x.id,
    //         firstName: x.firstName,
    //         lastName: x.lastName,
    //         profilePicture: x.profilePicture,
    //       });
    //     }
    //   }
    //   console.log("availAbleTutors", availAbleTutors);
    // });

    // const fullAvailableTutor = [];
    // if (endTime) {
    //   availAbleTutors.forEach((y) => {
    //     let free = false;
    //     lessonScheduleData?.forEach((x) => {
    //       if (x.id) {
    //         if (
    //           x.tutor.id === y.id &&
    //           x.startTime === startTime &&
    //           x.endTime === endTime &&
    //           x.date === selectedDate.toLocaleDateString("en-GB")
    //         ) {
    //         } else {
    //           free = true;
    //         }
    //       }
    //       console.log("This is the last part:", x.id);
    //     });
    //     if (free && y.isVerified) {
    //       fullAvailableTutor.push(y);
    //     }
    //   });
    // }
    // setFreeTutors(fullAvailableTutor);
    // console.log(freetutors);
    // const randomIndex = Math.floor(Math.random() * fullAvailableTutor.length);
    // setSelectedTutor(fullAvailableTutor[randomIndex]);
  }

  React.useEffect(() => {
    // Check if startTime and endTime are not null before calculating the difference
    if (startTime && endTime) {
      const [startHour, startMinute] = startTime
        .split(":")
        .map((time) => parseInt(time));
      const [endHour, endMinute] = endTime
        .split(":")
        .map((time) => parseInt(time));

      const totalMinutes =
        endHour * 60 + endMinute - (startHour * 60 + startMinute);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setHours(hours);
      setMinutes(minutes);
      const start = parseInt(startTime.replace(":", ""));
      const end = parseInt(endTime.replace(":", ""));
      const diff = end - start;
      setTimeDiff(diff);
    }
  }, [startTime, endTime]);

  async function handleOnRefresh(userID) {
    setIsRefreshing(true);
    await getLessons(userID, dispatch);
    setIsRefreshing(false);
  }

  function showOptions(lesson, navigation) {
    Alert.alert(
      "Configuración",
      "Por favor, selecciona una de las siguientes opciones.",
      [
        {
          text: "Reportar usuario",
          onPress: () => handleReport(lesson),
        },
        {
          text: "Cancelar clase",
          onPress: () => handleCancelLesson(lesson, navigation),
          style: "destructive",
        },
        {
          text: "Descartar",
          onPress: () => console.log("Descartar"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }

  function handleReport(lesson) {
    Alert.alert("Reportar usuario", "¿Deseas reportar a este usuario?", [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancelar pressed"),
        style: "cancel",
      },
      {
        text: "Reportar",
        onPress: async () => {
          await updateDoc(doc(db, "lessons", lesson.id), {
            isCanceled: true,
            isReported: true,
          });
          await getLessons(user.id, dispatch);
          await sendReportEmail(lesson);
        },
        style: "destructive",
      },
    ]);
  }

  function handleCancelLesson(lesson, navigation) {
    Alert.alert(
      "Cancelar clase",
      "¿Estás seguro de que quieres cancelar esta clase?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () =>
            navigation.navigate("Cancelar", {
              lesson: lesson,
            }),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  }

  async function sendReportEmail(lesson) {
    const body = `Este es un correo electrónico automático para el equipo de Reportes de Dudda. Por favor, escribe cualquier inquietud sobre este párrafo y no elimines nada a continuación.\nUsuario: ${user.id}\nLección: ${lesson.id}`;

    const encodedBody = encodeURIComponent(body);
    const url = `mailto:contacto@dudda.app?subject=Reporte&body=${encodedBody}`;

    try {
      await Linking.openURL(url);
      Alert.alert(
        "¡Gracias por tu reporte!",
        "Lo revisaremos a continuación y nos comunicaremos contigo a la brevedad."
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo abrir el correo electrónico. Por favor, inténtalo de nuevo más tarde."
      );
    }
  }

  function handleJoinMeeting(selectedLesson) {
    Alert.alert(
      "¿Unirte a la reunión?",
      "¿Estás seguro que deseas unirte a la reunión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Unirse",
          onPress: () => {
            Linking.openURL(selectedLesson.videocall);
          },
        },
      ]
    );
  }

  function onHandleConfirm(time) {
    // update the startTime state
    setStartTime(time);
    const startTime = time;
    const interval = 30;
    const numIntervals = 1 * 2;
    const checkpoints1 = [];
    let currentTime = startTime;

    for (let i = 0; i < numIntervals; i++) {
      const endTime = addMinutes(currentTime, interval);
      checkpoints1.push({
        startTime: currentTime,
        endTime: endTime,
        isFree: true,
      });
      currentTime = endTime;
    }

    // calculate the endTime based on the selected startTime
    const [hours, minutes] = time.split(":");
    const endTimeHours = parseInt(hours, 10) + 1;
    const endTime = `${endTimeHours.toString().padStart(2, "0")}:${minutes}`;

    // update the endTime state
    setEndTime(endTime);
    setCheckpoints(checkpoints1);
    // console.log(startTime, endTime, checkpoints);
    // hide the modal
    setModalVisible(false);
  }

  function addMinutes(time, minutes) {
    const [hours, mins] = time.split(":").map(Number);
    const totalMins = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMins / 60)
      .toString()
      .padStart(2, "0");
    const newMins = (totalMins % 60).toString().padStart(2, "0");
    return `${newHours}:${newMins}`;
  }

  function onHandleCancel() {
    setModalVisible(false);
  }

  function addThirtyMinutes() {
    const lastIndex = checkpoints.length - 1;
    const lastEndTime = checkpoints[lastIndex].endTime;
    const newStartTime = lastEndTime;
    const newEndTime = addMinutes(newStartTime, 30);
    if (checkpoints.length < 6) {
      setEndTime(newEndTime);
      setCheckpoints([
        ...checkpoints,
        {
          startTime: newStartTime,
          endTime: newEndTime,
          isFree: true,
        },
      ]);
    }
  }

  const subtractThirtyMinutes = () => {
    let tempCheckP = checkpoints;
    if (tempCheckP.length > 2) {
      tempCheckP.pop();
      setCheckpoints(tempCheckP);
    }
    setEndTime(checkpoints[checkpoints.length - 1].endTime);
  };

  function handleConfirmDate(selectedDate) {
    setShowPicker(false);
    setDay(selectedDate?.getDay());
    setSelectedDate(selectedDate);
  }

  function handleCancel() {
    setShowPicker(false);
  }

  function showToast(value) {
    Clipboard.setStringAsync(value);
    Toast.show({
      type: "success",
      text1: "¡Texto copiado!",
      position: "top",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 20,
      bottomOffset: 40,
    });
  }

  function handlePresentModal(lesson) {
    setSelectedLesson(lesson);
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  function LessonPress(lesson) {
    if (lesson.isPaid) {
      console.log("Lesson is paid :", lesson);
      setSelectedLesson(lesson);
      setModalContent("JOIN_LESSON");
      handlePresentModal(lesson);
    } else {
      console.log("Lesson is not paid :", lesson);
      navigation.navigate("Checkout", { lesson: lesson });
    }
  }
  
  const Checkout = () => {
    let sch = [];
    let gotoCheckout = true;
    const options = {
      timeZone: "UTC",
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const formattedDate = selectedDate.toLocaleString("es-ES", options);
    const parts = formattedDate.split(" ");
    const weekday = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const dateAndMonth = parts.slice(1).join(" ");
    const options2 = {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate2 = selectedDate.toLocaleDateString("es-ES", options2);
    if (checkpoints.length < 7 && checkpoints.length >= 2) {
      if (checkpoints.length === 2) {
        sch.push({
          dateDay: `${weekday}  ${dateAndMonth}`,
          date: formattedDate2,
          startTime: startTime,
          endTime: endTime,
          checkpoint: checkpoints,
          tutor: selectedTutor,
          subject: "Matemáticas",
          PEN: "50",
          Tduration: "1 hora",
        });
      } else if (checkpoints.length === 3) {
        sch.push({
          dateDay: `${weekday}  ${dateAndMonth}`,
          date: formattedDate2,
          startTime: startTime,
          endTime: endTime,
          checkpoint: checkpoints,
          tutor: selectedTutor,
          subject: "Matemáticas",
          PEN: "75",
          Tduration: "1 hora 30 min",
        });
      } else if (checkpoints.length === 4) {
        sch.push({
          dateDay: `${weekday}  ${dateAndMonth}`,
          date: formattedDate2,
          startTime: startTime,
          endTime: endTime,
          checkpoint: checkpoints,
          tutor: selectedTutor,
          subject: "Matemáticas",
          PEN: "100",
          Tduration: "2 horas",
        });
      } else if (checkpoints.length === 5) {
        sch.push({
          dateDay: `${weekday}  ${dateAndMonth}`,
          date: formattedDate2,
          startTime: startTime,
          endTime: endTime,
          checkpoint: checkpoints,
          tutor: selectedTutor,
          subject: "Matemáticas",
          PEN: "125",
          Tduration: "2 hora 30 min",
        });
      } else if (checkpoints.length === 6) {
        sch.push({
          dateDay: `${weekday}  ${dateAndMonth}`,
          date: formattedDate2,
          startTime: startTime,
          endTime: endTime,
          checkpoint: checkpoints,
          tutor: selectedTutor,
          subject: "Matemáticas",
          PEN: "150",
          Tduration: "3 horas",
        });
      } else {
        gotoCheckout = false;
      }
    }
    if (gotoCheckout) {
      navigation.navigate("Checkout", {
        newLesson: sch[0],
      });
      handleClosePress();
      setStartTime(null);
      setEndTime(null);
      setSelectedDate(null);
    }
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleOnRefresh(user.id)}
          />
        }
      >
        <MyText style={styles.lessonsScheduled}>Clases programadas</MyText>
        <MyButton
          onPress={() => navigation.navigate("MyModal")}
          title="Open Modal"
        />
         <MyButton
          onPress={() => navigation.navigate("AddLessonInformation")}
          title="AddLessonInformation"
        />
        <View>
          {lessons.length === 0 ? (
            <MyText style={styles.default}>
              Aún no tienes ninguna clase programada.
            </MyText>
          ) : (
            <View>
              {lessons.map((lesson) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.classContainer(theme)}
                  onPress={() => LessonPress(lesson)}
                >
                  {/* Three dots */}
                  <TouchableOpacity
                    style={{
                      alignItems: "flex-end",
                      marginBottom: 10,
                      height: 30,
                      justifyContent: "center",
                    }}
                    onPress={() => showOptions(lesson, navigation)}
                  >
                    <Entypo
                      name="dots-three-horizontal"
                      size={20}
                      color={Colors[theme].text}
                    />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      {lesson.tutor.profilePicture ? (
                        <Image
                          source={{ uri: lesson.tutor.profilePicture }}
                          style={styles.image}
                        />
                      ) : (
                        <View style={styles.fallback}>
                          <MyText
                            style={{ fontSize: 20, color: "#fff" }}
                            type="caption"
                          >
                            {lesson.tutor.firstName.charAt(0)}
                          </MyText>
                        </View>
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <MyText type="caption">
                          {moment(lesson.date, "DD/MM/YYYY")
                            .format("dddd, DD MMMM")
                            .replace(/^\w/, (c) => c.toUpperCase())}
                        </MyText>
                        <MyText type="caption">
                          {lesson.startTime} - {lesson.endTime}
                        </MyText>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 5,
                        }}
                      >
                        <MyText type="caption">
                          {lesson.isPaid
                            ? `${lesson.tutor.firstName} ${lesson.tutor.lastName}`
                            : "Pago pendiente"}
                        </MyText>
                        <MyText type="caption" style={{ color: "#0071BC" }}>
                          {lesson.subject}
                        </MyText>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{
              borderRadius: 50,
              backgroundColor:
                theme === "dark" ? "rgb(18, 18, 18)" : "rgb(316, 316, 316)",
            }}
            onDismiss={() => setIsOpen(false)}
          >
            {modalContent === "JOIN_LESSON" && (
              <View>
                <View style={styles.joinContainer}>
                  <View style={{ alignItems: "center" }}>
                    {selectedLesson.tutor.profilePicture ? (
                      <Image
                        source={{ uri: selectedLesson.tutor.profilePicture }}
                        style={styles.image}
                      />
                    ) : (
                      <View style={styles.fallback}>
                        <MyText
                          style={{ fontSize: 20, color: "white" }}
                          type="caption"
                        >
                          {selectedLesson.tutor.firstName?.charAt(0)}
                        </MyText>
                      </View>
                    )}
                    {selectedLesson.isPaid ? (
                      <MyText style={{ fontWeight: "500", marginTop: 10 }}>
                        {selectedLesson.tutor.firstName}{" "}
                        {selectedLesson.tutor.lastName}
                      </MyText>
                    ) : (
                      <MyText>Pago pendiente</MyText>
                    )}
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <MyText style={{ fontWeight: "500", color: "#0071BC" }}>
                      {selectedLesson.subject}
                    </MyText>
                    <View style={{ alignItems: "flex-end" }}>
                      <MyText style={{ marginTop: 5 }}>
                        {moment(selectedLesson.date, "DD/MM/YYYY")
                          .format("dddd, DD MMMM")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </MyText>

                      <MyText style={{ marginTop: 5 }}>
                        {selectedLesson.startTime} - {selectedLesson.endTime}
                      </MyText>
                    </View>
                  </View>
                </View>
                {/* Join meeting */}
                <TouchableOpacity
                  style={styles.videoCallButtonStyle}
                  onPress={() => handleJoinMeeting(selectedLesson)}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Unirme a la reunión
                  </Text>
                  <Ionicons name="videocam" size={25} color="white" />
                </TouchableOpacity>
                {/* Copy link */}
                <TouchableOpacity
                  style={styles.copyLinkButtonStyle}
                  onPress={() => showToast(selectedLesson.videocall)}
                >
                  <MyText style={{ fontSize: 18 }}>Copiar enlace</MyText>
                  <Ionicons
                    name="copy-outline"
                    size={25}
                    color={theme === "dark" ? "white" : "black"}
                  />
                </TouchableOpacity>
              </View>
            )}
            {modalContent === "NEW_LESSON" && (
              <View style={styles.modalContainer}>
                <MyText
                  style={{
                    fontSize: 25,
                    alignSelf: "flex-start",
                    marginBottom: 30,
                  }}
                >
                  {i18n.t('scheduleAClass')}
                </MyText>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Historial")}
                  style={styles.secondStyle}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                    }}
                  >
                    Repetir profesor
                  </Text>
                  <PastTutor height={30} width={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalContent("NEW_TUTOR")}
                  style={styles.firstStyle}
                >
                  <Text style={{ fontSize: 18 }}>Nuevo profesor</Text>
                  <NewTutor height={30} width={30} />
                </TouchableOpacity>
              </View>
            )}
            {modalContent === "NEW_TUTOR" && (
              <View style={styles.modalContainer}>
                <MyText style={styles.headerThree}>{i18n.t('scheduleAClass')}</MyText>
                <TouchableOpacity
                  style={styles.pickSubject(theme)}
                  onPress={() =>
                    Alert.alert(
                      "¡Pronto más cursos!",
                      "Actualmente, solo ofrecemos clases de matemáticas."
                    )
                  }
                >
                  <Text style={styles.textTouchable(theme)}>Matemáticas</Text>
                </TouchableOpacity>
                {/* date row */}
                <TouchableOpacity
                  style={styles.pickDate(theme)}
                  onPress={() => setShowPicker(true)}
                >
                  <Text style={styles.textTouchable(theme)}>
                    {selectedDate
                      ? moment(selectedDate)
                          .format("dddd, DD [de] MMMM [del] YYYY")
                          .slice(0, 1)
                          .toUpperCase() +
                        moment(selectedDate)
                          .format("dddd, DD [de] MMMM [del] YYYY")
                          .slice(1)
                      : `${i18n.t('selectADate')}`}
                  </Text>

                  <Calendar width={20} height={20} />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showPicker}
                  mode="date"
                  display="inline"
                  confirmTextIOS="Confirmar"
                  cancelTextIOS="Cancelar"
                  onConfirm={handleConfirmDate}
                  onCancel={handleCancel}
                  locale="es_ES"
                />
                {/* time row */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {/* start time */}
                  <TouchableOpacity
                    style={styles.thirdStyle(theme)}
                    onPress={() => setModalVisible(true)}
                  >
                    {startTime ? (
                      <Text style={styles.textTouchable(theme)}>
                        {startTime}
                      </Text>
                    ) : (
                      <Text style={styles.textTouchable(theme)}>{i18n.t('start')}</Text>
                    )}
                  </TouchableOpacity>
                  <CustomPickerModal
                    visible={modalVisible}
                    onConfirm={onHandleConfirm}
                    onCancel={onHandleCancel}
                  />
                  {/* end time */}
                  <View style={styles.thirdStyle(theme)}>
                    {endTime ? (
                      <Text style={styles.textTouchable(theme)}>{endTime}</Text>
                    ) : (
                      <Text style={styles.textTouchable(theme)}>{i18n.t('end')}</Text>
                    )}
                  </View>
                  {/* substract hours */}
                  <TouchableOpacity
                    style={styles.fourthStyle(theme)}
                    onPress={subtractThirtyMinutes}
                    disabled={timeDiff <= 100}
                  >
                    <Text style={styles.textTouchable(theme)}>-</Text>
                  </TouchableOpacity>
                  {/* add hours */}
                  <TouchableOpacity
                    style={styles.fourthStyle(theme)}
                    onPress={() => addThirtyMinutes()}
                    disabled={timeDiff >= 300}
                  >
                    <Text style={styles.textTouchable(theme)}>+</Text>
                  </TouchableOpacity>
                </View>
                {
                  <MyText
                    style={{ marginTop: 10, alignSelf: "flex-start" }}
                    type="caption"
                  >
                    {i18n.t('duration')}: {hours} {i18n.t('hour')}
                    {Math.floor(timeDiff / 100) > 1 ? "s" : ""}
                    {timeDiff % 100 > 0 && ` ${i18n.t('and')} ${minutes} ${i18n.t('hour')}`} 
                  </MyText>
                }
                {timeDiff <= 100 && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <Ionicons
                      name="alert-circle-outline"
                      size={20}
                      color={"#EF4444"}
                    />
                    <Text
                      style={{
                        color: "#EF4444",
                        marginLeft: 5,
                      }}
                    >
                      {i18n.t('minimumTime')}
                    </Text>
                  </View>
                )}
                {timeDiff >= 300 && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <Ionicons
                      name="alert-circle-outline"
                      size={20}
                      color={"#EF4444"}
                    />
                    <Text
                      style={{
                        color: "#EF4444",
                        marginLeft: 5,
                      }}
                    >
                      {i18n.t('maximumTime')}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.continueButton(
                    selectedDate,
                    startTime,
                    endTime
                  )}
                  onPress={async () => {
                    setIsSearching(true);
                    await findTutor();
                    setIsSearching(false);

                    if (!selectedTutor) {
                      Alert.alert(
                        `${i18n.t('noTutor')}`,
                        `${i18n.t('noTutorDesc')}`,
                        [
                          {
                            text: `${i18n.t('supporte')}`,
                            onPress: () =>
                              Linking.openURL(
                                "https://api.whatsapp.com/send?phone=51941379335&text=%C2%A1Hola!%20%C2%BFC%C3%B3mo%20est%C3%A1s%3F%20Necesito%20tu%20ayuda."
                              ),
                          },
                          {
                            text:  `${i18n.t('cancel')}`,
                            onPress: () => {},
                            style: "cancel",
                          },
                        ],
                        { cancelable: true }
                      );
                    } else {
                      Checkout();
                    }
                  }}
                >
                  {isLoading ? (
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Cargando...
                    </Text>
                  ) : (
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {i18n.t('continue')}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </BottomSheetModal>
        </View>
      </ScrollView>
      {/* Agendar clase */}
      <TouchableOpacity
        style={styles.button}
        onPress={
          lessons.length === 0
            ? () => {
                setModalContent("NEW_TUTOR");
                handlePresentModal();
              }
            : () => {
                setModalContent("NEW_LESSON");
                handlePresentModal();
              }
        }
      >
        <Ionicons name="add" size={25} color={"white"} />
        <MyText style={{ color: "white", marginLeft: 5 }}>{i18n.t('scheduleClass')}</MyText>
      </TouchableOpacity>

      <StatusBar barStyle={"light-content"} />
      <Toast position="bottom" bottomOffset={20} />
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },
  joinContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  lessonsScheduled: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 30,
  },
  modalContentStyle: (theme) => ({
    backgroundColor: theme === "dark" ? "#000" : "#fff",
  }),
  lessonsContainer: (theme) => ({
    flex: 0.9,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor:
      theme === "dark"
        ? "rgba(224, 224, 224, 0.2)"
        : "rgba(128, 128, 128, 0.2)",
  }),
  default: {
    marginTop: 20,
    alignSelf: "center",
    color: "#ADB3B3",
  },
  headerThree: {
    fontSize: 25,
    alignSelf: "flex-start",
    marginBottom: 25,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
    // justifyContent: "center",
  },
  fallback: {
    backgroundColor: "#F06999",
    borderRadius: 100,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
  },
  button: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#0071BC",
    width: "60%",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
    height: 50,
    borderRadius: 15,
  },
  pickSubject: (theme) => ({
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: theme === "dark" ? "rgba(128, 128, 128, 0.2)" : "#EAEAEA",
    width: "100%",
    borderRadius: 7,
    paddingHorizontal: 20,
    height: 50,
    alignItems: "center",
    marginBottom: 10,
  }),
  pickDate: (theme) => ({
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: theme === "dark" ? "rgba(128, 128, 128, 0.2)" : "#EAEAEA",
    width: "100%",
    borderRadius: 7,
    paddingHorizontal: 20,
    height: 50,
    alignItems: "center",
    marginBottom: 10,
  }),
  firstStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EAEAEA",
    width: "100%",
    height: 50,
    borderRadius: 7,
    paddingHorizontal: 20,
  },
  secondStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0071BC",
    width: "100%",
    height: 50,
    borderRadius: 7,
    // marginVertical: 12,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  videoCallButtonStyle: {
    backgroundColor: "#0071BC",
    marginHorizontal: 20,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  copyLinkButtonStyle: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    marginTop: 5,
  },
  thirdStyle: (theme) => ({
    backgroundColor: theme === "dark" ? "rgba(128, 128, 128, 0.2)" : "#EAEAEA",
    borderRadius: 7,
    marginRight: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 110,
  }),
  fourthStyle: (theme) => ({
    backgroundColor: theme === "dark" ? "rgba(128, 128, 128, 0.2)" : "#EAEAEA",
    borderRadius: 7,
    marginRight: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  }),
  textTouchable: (theme) => ({
    color: theme === "dark" ? "white" : "black",
    fontSize: 18,
  }),
  continueButton: (selectedDate, startTime, endTime) => ({
    backgroundColor:
      !selectedDate || !startTime || !endTime ? "#CCCCCC" : "#0071BC",
    height: 50,
    width: "100%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    pointerEvents: !selectedDate || !startTime || !endTime ? "none" : "auto",
  }),
  classContainer: (theme) => ({
    flexDirection: "column",
    paddingHorizontal: 5,
    paddingVertical: 15,
  }),
});