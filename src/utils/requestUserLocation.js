import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';

export async function requestUserLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert(
      'Permiso de ubicación denegado',
      'Por favor, habilita la ubicación para esta aplicación en la configuración de tu teléfono',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('cancelar presionado'),
          style: 'cancel',
        },
        {
          text: 'Ir a Configuración',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:location');
            } else if (Platform.OS === 'android') {
              // Abrir la configuración de ubicación en Android
              startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
            } else {
              return;
            }
          },
          style: 'default',
        },
      ]
    );
    return null;
  }

  const loc = await Location.getCurrentPositionAsync({});
  const latitude = loc.coords.latitude;
  const longitude = loc.coords.longitude;
  console.log('Latitude:', latitude, 'Longitude:', longitude);

  return {
    latitude,
    longitude,
  };
}