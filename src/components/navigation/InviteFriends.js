import { TouchableOpacity, View } from "react-native";
import MyText from "../components/MyText";
import Ionicons from "react-native-vector-icons/Ionicons";

export function InviteFriends() {
  return (
    <TouchableOpacity onPress={() => {}} style={{ marginVertical: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="share-social-outline"
          size={22}
          color={"rgb(229, 229, 231)"}
        />
        <MyText type="caption">Invita a tus amigos</MyText>
      </View>
    </TouchableOpacity>
  );
}
