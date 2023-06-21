import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  TextInput,
} from "react-native";
import MyText from "../MyText";
import Colors from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { updatePhoneNumber } from "../../utils/userOperations";
import { resetPhoneNumber } from "../../features/userReducer";
import { i18n } from "../../../languages";

function InfoField({
  label,
  value,
  theme,
  canEdit,
  handleUpdate,
  handleRedux,
}) {
  const { id } = useSelector((state) => state.user);
  const [localValue, setLocalValue] = React.useState(value);
  const dispatch = useDispatch();

  return (
    <View
      style={[
        styles.infoFieldContainer,
        { borderBottomColor: Colors[theme].text + "40" },
      ]}
    >
      <MyText
        type="caption"
        style={[styles.fieldLabel, { color: Colors[theme].text + "80" }]}
      >
        {label}
      </MyText>
      {canEdit ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={[styles.fieldText, { color: Colors[theme].text }]}
            value={localValue}
            onChangeText={setLocalValue}
            placeholder={label}
            type="caption"
            keyboardType="phone-pad"
            returnKeyType="done"
            maxLength={9}
            onSubmitEditing={(event) => {
              handleUpdate(id, event.nativeEvent.text);
              dispatch(handleRedux(event.nativeEvent.text));
            }}
          />
        </View>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.fieldText, { color: Colors[theme].text }]}>
            {value}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function ProfileInformation() {
  const user = useSelector((state) => state.user);
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <MyText
        type="caption"
        style={[styles.caption, { color: Colors[theme].text + "40" }]}
      >
       {i18n.t("personelInform")}
      </MyText>
      <InfoField label={i18n.t("firstName")} value={user.firstName} theme={theme} />
      <InfoField
        label={i18n.t("lastName")}
        value={user.lastName}
        theme={theme}
      />
      <InfoField label={i18n.t("email")} value={user.email} theme={theme} />
      <InfoField
        label={i18n.t("dob")}
        value={user.birthday}
        theme={theme}
      />
      <InfoField
        label={i18n.t("phone")}
        value={user.phoneNumber}
        theme={theme}
        canEdit
        handleUpdate={updatePhoneNumber}
        handleRedux={resetPhoneNumber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 44,
  },
  infoFieldContainer: {
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
  },
  caption: {
    fontWeight: "600",
    marginTop: 20,
  },
  fieldLabel: {
    fontWeight: "500",
    paddingRight: 10,
  },
  fieldText: {
    fontWeight: "500",
    flexShrink: 1,
    marginTop: 10,
    flex: 1,
  },
});
