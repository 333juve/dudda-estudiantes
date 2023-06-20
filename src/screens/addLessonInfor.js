import {
  SafeAreaView,
  Text,
  View,
  Button,
  Image,
  FlatList,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import MyButton from "../components/MyButton";
export default function AddLessonInformation() {
  const [image, setImage] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log("res", result.assets);

    if (!result.canceled) {
      setImage(result.assets);
    }
  };
  const renderItem = ({ item }) => {
    {
      return (
        <Image
          source={{ uri: item?.uri }}
          style={{ width: 200, height: 200 }}
        />
      );
    }
  };
  //console.log(image.assets)
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={{ marginTop: 20, alignSelf: "center" }}>
        Add Images of lesson
      </Text>
      {image && (
        image.map((x)=>{
          return(
            <Image
            source={{ uri: x?.uri }}
            style={{ width: "80%", height: 100 ,margin:6,alignSelf:'center'}}
            resizeMode="contain"
          />
          )
        })
      )}
      <MyButton title="Pick an image from camera roll" onPress={pickImage}  />
      <TextInput
        placeholder="Comments..."
        style={{
          width: "90%",
          borderRadius: 6,
          borderColor: "black",
          borderWidth: 1,
          height: 80,
          alignSelf:'center',
          marginBottom:10,
          padding:10
        }}
        multiline={true}
      />
      <SepratorLine />
      <MyButton title="Next"/>
    </ScrollView>
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
