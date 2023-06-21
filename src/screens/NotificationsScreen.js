import * as React from "react";
import { View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "../components/notifications/NotificationCard";
import { getNotifications } from "../utils/notificationsOperations";
import MyText from "../components/MyText";
import { i18n } from "../../languages";

export default function NotificationsScreen() {
  const { notifications } = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleOnRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNotifications(user.id, dispatch)
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
      >
        {notifications.length === 0 ? (
          <MyText style={styles.default}>
           {i18n.t('noNotification')}
          </MyText>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              dispatch={dispatch}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    marginTop: 20,
    alignSelf: "center",
    color: "#ADB3B3",
  },
});
