import { Alert, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permiso Denegado',
        '¡Error al obtener el token de notificación!'
      );
    
      return null;
    }

    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Token retrieved successfully!', token);
    } catch (error) {
      console.log(
        'Token Retrieval Error',
        'Failed to get the push token for push notification.',
        error
      );
    }
  } else {
    Alert.alert(
      'Physical Device Required',
      'Push notifications can only be configured on a physical device.'
    );
    return null;
  }

  if (Platform.OS === 'android') {
    try {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    } catch (error) {
      console.log('Failed to set notification channel:', error);
    }
  }

  return token;
}
