import {
    Text,
    TouchableOpacity,
    useColorScheme,
    StyleSheet,
  } from "react-native";
  import Colors from "../../constants/colors";
  
  export default function MyButton({
    title,
    onPress,
    type = "primary",
    style,
    ...otherProps
  }) {
    const theme = useColorScheme();
  
    const buttonStyle =
      theme === "light" && type === "primary"  ? styles.primaryLight
      : theme === "light" && type === "secondary"  ? styles.secondaryLight
      // : theme === "light" && type === "cancel"  ? styles.cancel
      : theme === "dark" && type === "primary" ? styles.primaryDark
      : styles.secondaryDark;
  
    const textStyle =
      theme === "light" && type === "primary" ? Colors.dark.text
        : theme === "light" && type === "secondary" ? Colors.light.button
        // : theme === "light" && type === "cancel" ? Colors.light.red
        : theme === "dark" && type === "primary" ? Colors.dark.background
        : Colors.light.background;
  
    return (
      <TouchableOpacity
        style={[styles.button, buttonStyle, style]}
        onPress={onPress}
        {...otherProps}
      >
        <Text style={[styles.buttonText, { color: textStyle }]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      width: "90%",
      height: 50,
      padding: 10,
      marginVertical: 10,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      alignSelf:'center'
    },
    primaryLight: {
      backgroundColor: Colors.light.button,
    },
    secondaryLight: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: Colors.light.button,
    },
    cancel: {
      borderWidth: 1,
      borderColor: Colors.light.red,
    },
    primaryDark: {
      backgroundColor: Colors.dark.text,
    },
    secondaryDark: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: Colors.dark.text,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
    },
  });