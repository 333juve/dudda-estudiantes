import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomPickerModal = ({ visible, onConfirm, onCancel }) => {
  const [selectedValue, setSelectedValue] = useState("15:00");

  // Generate Picker items for every half hour of the day
  const generatePickerItems = () => {
    const pickerItems = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const value = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        pickerItems.push(
          <Picker.Item key={value} label={value} value={value} />
        );
      }
    }
    return pickerItems;
  };

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                style={styles.picker}
              >
                {generatePickerItems()}
              </Picker>
            </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity
            onPress={() => onConfirm(selectedValue)}
            style={styles.confirmContainer}
          >
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onCancel} style={styles.cancelContainer}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: "95%",

    alignItems: "center",
  },
  picker: {
    width: "95%",
  },
  confirmContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: "#E0E0E0",
    width: "95%",
    marginBottom: 10,
  },
  cancelContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    padding: 15,
    borderColor: "#E0E0E0",
    width: "95%",
    marginBottom: 30,
    borderRadius: 12,
  },
  confirmText: {
    color: "#007BFF",
    fontSize: 20,
  },
  cancelText: {
    color: "#007BFF",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default CustomPickerModal;
