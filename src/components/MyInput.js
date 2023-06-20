// import {
//     TextInput,
//     Text,
//     View,
//     StyleSheet,
//     useColorScheme,
//   } from "react-native";
//   import MyText from "../components/MyText";
//   import Colors from "../../constants/colors";
  
//   export default function MyInput({
//     label,
//     value,
//     onChangeText,
//     secureTextEntry,
//     autoCapitalize,
//     autoCorrect,
//     keyboardType,
//     maxLength,
//     autoFocus,
//     returnKeyType
//   }) {
//     const theme = useColorScheme();
//     return (
//       <View style={styles.container}>
//         <MyText style={{ fontWeight: "bold", marginBottom: 5 }} type={"caption"}>
//           {label}
//         </MyText>
//         <TextInput
//           placeholder={label}
//           style={[styles.input, styles[theme]]}
//           value={value}
//           onChangeText={onChangeText}
//           secureTextEntry={secureTextEntry}
//           autoCapitalize={autoCapitalize}
//           autoCorrect={autoCorrect}
//           keyboardType={keyboardType}
//           maxLength={maxLength}
//           autoFocus={autoFocus}
//           returnKeyType={returnKeyType}
//         />
//       </View>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       marginBottom: 20,
//     },
//     input: {
//       width: "100%",
//       height: 50,
//       justifyContent: "center",
//       paddingLeft: 10,
//       borderRadius: 8,
//       borderWidth: 1,
//     },
//     dark: {
//       backgroundColor: Colors.dark.text + "06",
//       borderColor: Colors.dark.text + "80",
//       color: Colors.dark.text,
//     },
//     light: {
//       backgroundColor: Colors.light.text + "06",
//       borderColor: Colors.light.text + "80",
//       color: Colors.light.text,
//     },
//   });
import React from "react";
import { TextInput, Text, View, StyleSheet, useColorScheme } from "react-native";
import MyText from "../components/MyText";
import Colors from "../../constants/colors";
import { Feather } from "@expo/vector-icons";

export default function MyInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize,
  autoCorrect,
  keyboardType,
  maxLength,
  autoFocus,
  showIcon,
  onIconPress
}) {
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <MyText style={{ fontWeight: "bold", marginBottom: 5 }} type={"caption"}>
        {label}
      </MyText>
      <View style={[styles.inputContainer, styles[theme]]}>
        <TextInput
          placeholder={label}
          style={[styles.input, styles[theme]]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoFocus={autoFocus}
        />
        {showIcon && (
          <Feather
            name={secureTextEntry ? "eye-off" : "eye"}
            size={24}
            color={Colors.light.tint}
            style={styles.icon}
            onPress={onIconPress}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
  },
  dark: {
    backgroundColor: Colors.dark.text + "06",
    borderColor: Colors.dark.text + "80",
    color: Colors.dark.text,
  },
  light: {
    backgroundColor: Colors.light.text + "06",
    borderColor: Colors.light.text + "80",
    color: Colors.light.text,
  },
  icon: {
    padding: 10,
  },
});
