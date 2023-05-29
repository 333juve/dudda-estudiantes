import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  Text,
} from "react-native";
import MyText from "../components/MyText";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Reschedule() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useColorScheme();
  const tutor = React.useState(route?.params?.tutor);
  const [schedule, setSchedule] = React.useState(route?.params?.schedule);
  const [repeat, setRepeat] = React.useState([]);
  const [date, setDate] = React.useState(moment().startOf("week"));
  const days = [];
  const spanishDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const startOfWeek = date.clone().isoWeekday(0).startOf("day");
  console.log(route.params.tutor.id);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Agendar",
      headerTintColor: "#fff",
      headerBackTitle: "Atrás",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => resetDate()}
          style={{ marginRight: 15 }}
        >
          <MaterialCommunityIcons
            name="calendar-today"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      ),
    });
  });

  for (let i = 0; i < 7; i++) {
    days.push(startOfWeek.clone().add(i, "day").format("DD/MM/YYYY"));
  }

  const resetDate = () => {
    setDate(moment().startOf("week"));
  };

  const handlePreviousWeek = () => {
    setDate(date.clone().subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setDate(date.clone().add(1, "week"));
  };

  const handleSwipe = (gestureName) => {
    switch (gestureName) {
      case swipeDirections.SWIPE_LEFT:
        handleNextWeek();
        break;
      case swipeDirections.SWIPE_RIGHT:
        handlePreviousWeek();
        break;
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const getDateFromDayIndex = (dayIndex) => {
    return days[dayIndex];
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    const duration = end - start;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    res = `${hours} hr ${minutes} mins`;
    return { res };
  };

  const onCellTap = (slotIndex, timeSlot, dayIndex) => {
    console.log(slotIndex, timeSlot, dayIndex);
    const newSchedule = [...schedule];
    let newRepeat = [...repeat];
    if (timeSlot.isFree && !timeSlot.bookedLesson) {
      const userDateTime = moment(
        `${getDateFromDayIndex(dayIndex)} ${timeSlot.startTime}`,
        "DD/MM/YYYY HH:mm"
      );
      if (userDateTime.isBefore(moment())) {
        alert("No permitido: la fecha y la hora están en el pasado");
        //Not Allowed:Date and Time is in the past
      } else {
        if (!newSchedule[dayIndex].hours[slotIndex].reserve) {
          const objToadd = {
            tutorID: route.params.tutor.id,
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            date: getDateFromDayIndex(dayIndex),
            duration: calculateDuration(timeSlot.startTime, timeSlot.endTime)
              .res,
          };
          let objdate = objToadd.date;
          let exist = false;
          newRepeat.forEach((x) => {
            if (x[0] === objdate) {
              x.push(objToadd);
              exist = true;
            }
          });
          if (!exist) {
            newRepeat.push([objdate, spanishDays[dayIndex], objToadd]);
          }
          newSchedule[dayIndex].hours[slotIndex].reserve =
            !newSchedule[dayIndex].hours[slotIndex].reserve;
        } else {
          newSchedule[dayIndex].hours[slotIndex].reserve =
            !newSchedule[dayIndex].hours[slotIndex].reserve;
          newRepeat = newRepeat.map(([date, ...objects]) => {
            if (date === getDateFromDayIndex(dayIndex)) {
              const updatedObjects = objects.filter(
                (obj) =>
                  obj.startTime !== timeSlot.startTime ||
                  obj.endTime !== timeSlot.endTime
              );
              return [date, ...updatedObjects];
            }
            return [date, ...objects];
          });
        }
      }
      setRepeat(newRepeat);
      setSchedule(newSchedule);
    } else {
      alert("Tutor no disponible en este momento");
      //Tutor not available in this time
    }
  };

  console.log(
    "tutor :",
    tutor,
    "repeat :",
    repeat,
    "scedule :",
    route?.params?.schedule
  );

  const renderDay = (day, dayIndex) => {
    if (schedule) {
      return day.hours.map((timeSlot, slotIndex) => {
        const isFree = timeSlot.isFree;
        const bookedLesson = timeSlot?.bookedLesson;
        const reserve = timeSlot?.reserve;
        return (
          <TouchableOpacity
            key={slotIndex}
            style={[
              styles.timeSlot,
              {
                borderTopWidth: 1,
                borderTopColor:
                  theme === "dark"
                    ? "rgba(224, 224, 224, 0.2)"
                    : "rgba(128, 128, 128, 0.2)",
                borderLeftWidth: 1,
                borderLeftColor:
                  theme === "dark"
                    ? "rgba(224, 224, 224, 0.2)"
                    : "rgba(128, 128, 128, 0.2)",
                backgroundColor:
                  !isFree || bookedLesson
                    ? "#9da39e"
                    : isFree && !reserve
                    ? "#fff"
                    : "green",
              },
            ]}
            onPress={() => {
              onCellTap(slotIndex, timeSlot, dayIndex);
            }}
          />
        );
      });
    }
  };

  const renderSchedule = () => {
    if (schedule) {
      return schedule?.map((day, index) => {
        return (
          <>
            <View key={index} style={styles.column}>
              {renderDay(day, index)}
            </View>
          </>
        );
      });
    }
  };

  const renderTimeLabels = () => {
    // Assuming the first day has all the time slots
    if (schedule) {
      const firstDay = schedule[0];

      return firstDay?.hours?.map((timeSlot, index) => {
        const isFullHour = timeSlot.startTime.slice(-2) === "00";
        return (
          <View
            key={index}
            style={[
              styles.timeSlot,
              styles.textTimeSlot,
              {
                position: "absolute",
                top: index * 30, // 40 is the height of the timeSlot and 28 is the height of the day header
              },
            ]}
          >
            {isFullHour ? (
              <MyText type="caption" style={styles.timeLabel}>
                {timeSlot.startTime}
              </MyText>
            ) : null}
          </View>
        );
      });
    }
  };

  const Checkout = () => {
    const sch = [];
    let totalPen = 0;
    let gotoCheckout = true;
    repeat.forEach((x) => {
      if (x.length < 9 && x.length > 3) {
        if (x.length === 4) {
          sch.push({
            date: x[0],
            day: x[1],
            schedule: x.slice(2),
            PEN: "50",
            Tduration: "1 hora",
          });
        } else if (x.length === 5) {
          sch.push({
            date: x[0],
            day: x[1],
            schedule: x.slice(2),
            PEN: "75",
            Tduration: "1 hora 30 min",
          });
        } else if (x.length === 6) {
          sch.push({
            date: x[0],
            day: x[1],
            schedule: x.slice(2),
            PEN: "100",
            Tduration: "2 horas",
          });
        } else if (x.length === 7) {
          sch.push({
            date: x[0],
            day: x[1],
            schedule: x.slice(2),
            PEN: "125",
            Tduration: "2 hora 30 min",
          });
        } else if (x.length === 8) {
          sch.push({
            date: x[0],
            day: x[1],
            schedule: x.slice(2),
            PEN: "150",
            Tduration: "3 horas",
          });
        } else {
          gotoCheckout = false;
        }
      } else if (x.length != 1) {
        gotoCheckout = false;
      }
    });
    sch.forEach((x) => {
      totalPen = parseFloat(totalPen) + parseFloat(x.PEN);
    });
    if (gotoCheckout) {
      navigation.navigate("Checkout", {
        repeatSchedule: sch,
        totalPEN: totalPen,
      });
    } else {
      alert(
        "No puede tomar clases de más de 3 horas y menos de 1 hora en un solo día"
      );
      //Cannot take class more then 3 hr and less then 1 hr on a single day
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction) => handleSwipe(direction)}
      config={config}
      style={{ flex: 1 }}
    >
      <View>
        {/* Month and day labels */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            margin: 6,
          }}
        >
          {/* Month label */}
          <MyText style={{ fontSize: 30 }}>
            {date.format("MMMM").charAt(0).toUpperCase() +
              date.format("MMMM").slice(1)}
          </MyText>
        </View>

        {/* Days */}
        <View style={{ flexDirection: "row", marginLeft: 55 }}>
          {days.map((day, index) => (
            <View
              key={day}
              style={{
                flex: 1,
                borderRadius: 8,
                alignItems: "center",
                backgroundColor:
                  moment(day, "DD/MM/YYYY").isSame(moment(), "day") &&
                  moment(day, "DD/MM/YYYY").isSame(moment(), "month")
                    ? "pink"
                    : "transparent",
              }}
            >
              {/* Day label */}
              <MyText>
                {moment(day, "DD/MM/YYYY")
                  .format("dddd")
                  .slice(0, 1)
                  .toUpperCase()}
              </MyText>
              <MyText>{moment(day, "DD/MM/YYYY").format("D")}</MyText>
            </View>
          ))}
        </View>
      </View>

      {/* Scrollable schedule */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Time labels */}
          <View style={styles.timeLabelColumn}>
            <View style={styles.day} />
            {renderTimeLabels()}
          </View>

          {/* Schedule columns */}
          {renderSchedule()}
        </View>
      </ScrollView>

      {/* Checkout button */}
      <TouchableOpacity style={styles.addButton} onPress={() => Checkout()}>
        <EvilIcons name="chevron-right" size={50} color="white" />
      </TouchableOpacity>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  timeLabelColumn: {
    width: 60,
    alignItems: "center",
  },
  column: {
    flex: 1,
    width: "12%",
  },
  day: {
    height: 28,
    fontSize: 20,
    marginBottom: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  timeSlot: {
    height: 30,
  },
  textTimeSlot: {
    justifyContent: "center",
  },
  timeLabel: {
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2F95DC",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
