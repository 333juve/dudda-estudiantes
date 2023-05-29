import * as React from "react";
import { useColorScheme, View as DefaultView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../../../constants/colors";

export function View(props) {
  const theme = useColorScheme();
  const { style, ...otherProps } = props;
  return (
    <DefaultView
      style={[
        { backgroundColor: Colors[theme].background, paddingHorizontal: 18 },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function ScrollView(props) {
  const theme = useColorScheme();
  const { style, children, ...otherProps } = props;
  return (
    <KeyboardAwareScrollView
      style={[
        { backgroundColor: Colors[theme].background, paddingHorizontal: 18 },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}