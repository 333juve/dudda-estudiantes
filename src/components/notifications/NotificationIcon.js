import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function NotificationIcon({ navigation, unSeenNotifications }) {
  const { navigate } = navigation;

  return (
    <TouchableOpacity onPress={() => navigate("Notificaciones")}>
      <Ionicons name="notifications" size={20} color={"white"} />
      {unSeenNotifications.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unSeenNotifications.length}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "rgb(190, 20, 100)",
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
