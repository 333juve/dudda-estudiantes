import { View, Text, Button, Image } from "react-native";
import MyButton from "../components/MyButton";

export default function ModalScreen({ navigation }) {
  const uri =
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={{ uri: uri }}
        style={{ width: 150, height: 200, borderRadius: 20 }}
        resizeMode="contain"
      />
      <Text style={{ marginTop: 20, margin: 4 }}>Name :</Text>
      <SepratorLine />
      <Text style={{ marginTop: 20, margin: 4 }}>ID:</Text>
      <SepratorLine />
      <MyButton title={"Dismiss"} onPress={() => navigation.goBack()} />
    </View>
  );
}
function SepratorLine() {
  return (
    <View
      style={{
        backgroundColor: "black",
        width: "90%",
        height: 1,
        alignSelf: "center",
      }}
    />
  );
}
