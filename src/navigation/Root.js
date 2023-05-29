import * as React from "react";
import {
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  useColorScheme,
} from "react-native";
//React Navigation
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//HomeStack
import Home from "../screens/Home";
import NotificationsScreen from "../screens/NotificationsScreen";
//Drawer
import Profile from "../screens/Profile";

import Payments from "../screens/Payments";
import Reschedule from "../screens/Reschedule";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomDrawer from "./CustomDrawer";
import LogoDarkOg from "../../assets/logoDarkOg.svg";
import Onboarding from "../screens/Onboarding";
import Checkout from "../screens/Checkout";
import Agreement from "../screens/Agreement";
import Historial from "../screens/Historial";
import Cancel from "../screens/Cancel";
import NotificationIcon from "../components/notifications/NotificationIcon";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Root() {
  const theme = useColorScheme();

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <MyDrawer />
    </NavigationContainer>
  );
}

function MyDrawer() {
  const theme = useColorScheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerBackground: () => (
          <View
            style={
              theme === "dark"
                ? { backgroundColor: "rgb(18, 18, 18)", flex: 1 }
                : { backgroundColor: "#ED1E79", flex: 1 }
            }
          />
        ),

        headerTintColor: "#FFF",
      }}
    >
      <Drawer.Screen
        name="Inicio"
        children={() => <HomeStack />}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons
              name="home-outline"
              size={22}
              color={color}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name="person-outline"
              size={22}
              color={color}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Depósitos"
        component={Payments}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons
              name="payment"
              size={22}
              color={color}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function HomeStack() {
  const { notifications } = useSelector((state) => state.notifications);
  const theme = useColorScheme();
  const navigation = useNavigation();
  const unSeenNotifications = notifications.filter(
    (not) => not.isSeen === false
  );

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerBackground: () => (
          <View
            style={
              theme === "dark"
                ? { backgroundColor: "rgb(18, 18, 18)", flex: 1 }
                : { backgroundColor: "#ED1E79", flex: 1 }
            }
          />
        ),
        headerTintColor: "#FFF",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerLeft: () => (
            <View style={{ marginLeft: -15 }}>
              <DrawerToggleButton tintColor="white" />
            </View>
          ),
          headerTitle: () => <LogoDarkOg width="90" height="30" />,
          headerRight: () => (
            <NotificationIcon
              navigation={navigation}
              unSeenNotifications={unSeenNotifications}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Agreement"
        component={Agreement}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Notificaciones"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          title: "Notificaciones",
          headerTintColor: "#fff",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="Programar"
        component={Reschedule}              
      />
      <Stack.Screen
        name="Historial"
        component={Historial}
        options={{
          headerShown: true,
          title: "Historial",
          headerTintColor: "#fff",          
          headerBackTitle: "Atrás",                 
        }}        
      />
      <Stack.Screen
        name="Cancelar"
        component={Cancel}
        options={{
          headerShown: true,
          title: "Cancelar",
          headerTintColor: "#fff",          
          headerBackTitle: "Atrás",                 
        }}        
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{          
          title: "Pagar",
          headerTintColor: "#fff",                                               
          
        }}        
        
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    marginHorizontal: 10,
  },
  fallback: {
    backgroundColor: "lightcoral",
    width: 60,
    height: 60,
    borderRadius: "50%",
    marginHorizontal: 10,
  },
  initialLetter: {
    fontSize: 30,
    justifyContent: "center",
    alignSelf: "center",
    color: "white",
  },
  badge: {
    backgroundColor: "red",
    borderRadius: 5,
  },
});
