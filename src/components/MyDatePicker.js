import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  useColorScheme,
} from "react-native";
import MyText from "./MyText";
import Colors from "../../constants/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default function MyDatePicker({ label, onDateChange }) {
  const theme = useColorScheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const is18OrOlder = (selectedDate) => {
    const currentDate = new Date();
    const minBirthDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    return selectedDate <= minBirthDate;
  };

  const handleConfirm = (selectedDate) => {
    if (is18OrOlder(selectedDate)) {
      setShowPicker(false);
      setSelectedDate(selectedDate);
      onDateChange(selectedDate.toISOString());
    } else {
      Alert.alert(
        "Edad mínima requerida",
        "Debe tener al menos 18 años para registrarse.",
        [{ text: "Entendido" }]
      );
    }
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <View style={styles.container}>
      <MyText type="caption" style={{ fontWeight: "bold", marginBottom: 5 }}>
        {label}
      </MyText>
      <TouchableOpacity
        style={[styles.input, styles[theme]]}
        onPress={() => setShowPicker(true)}
      >
        <MyText
          type="caption"
          style={{
            color: selectedDate
              ? Colors[theme].text
              : Colors[theme].text + "80",
          }}
        >
          {selectedDate ? formatDate(selectedDate) : label}
        </MyText>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        display="inline"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        locale="es_ES"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  dark: {
    backgroundColor: Colors.dark.text + "06",
    borderColor: Colors.dark.text + "80",
  },
  light: {
    backgroundColor: Colors.light.text + "06",
    borderColor: Colors.light.text + "80",
  },
});
