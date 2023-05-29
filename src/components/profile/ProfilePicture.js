import * as React from "react";
import {
  StyleSheet,
  Button,
  Text,
  Image,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import MyText from "../MyText";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { RN_CLOUDINARY_CLOUD_NAME, RN_CLOUDINARY_UPLOAD_PRESET } from "@env";
import { resetProfilePicture } from "../../features/userReducer";
import { db } from "../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";

export default function ProfilePicture() {
  const user = useSelector((state) => state.user);
  const { firstName, lastName, profilePicture, id } = user;
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  function ProfileFallback() {
    return (
      <View style={styles.fallback}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <MyText style={styles.initialLetter}>{firstName[0]}</MyText>
        )}
      </View>
    );
  }

  const pickeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
      // base64: true,
    });

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setLoading(true);
      savePhotoInCloudinary(asset.uri);
    }
  };

  const savePhotoInCloudinary = async (fileUri) => {
    let apiUrl = `https://api.cloudinary.com/v1_1/${RN_CLOUDINARY_CLOUD_NAME}/image/upload/`;
    const data = new FormData();
    data.append("file", {
      uri: fileUri,
      type: "image/jpeg",
      name: "profilePicture.jpg",
    });
    data.append("upload_preset", RN_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: data,
      });
      const json = await response.json();
      updateUserPicture(json.url);
      dispatch(resetProfilePicture(json.url));
      console.log("Image save to db and cloudinary", json.url);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const updateUserPicture = async (newPhoto) => {
    try {
      //TODO: Falta que Firebase se actualice.
      updateDoc(doc(db, "students", id), {
        profilePicture: newPhoto,
      });
      console.log("User photo updated succesfully");
    } catch (e) {
      console.log("error updating user photo", e);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickeImage}>
        {profilePicture ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: profilePicture }} style={styles.image} />
            {loading && (
              <ActivityIndicator
                size="small"
                color="white"
                style={styles.loadingIndicator}
              />
            )}
          </View>
        ) : (
          <ProfileFallback />
        )}
      </Pressable>
      <MyText style={{ fontWeight: "bold" }}>
        {firstName} {lastName}
      </MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
  },
  fallback: {
    backgroundColor: "#F06999",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 6,
  },
  initialLetter: {
    fontSize: 60,
    lineHeight: 100,
    textAlign: "center",
    color: "white",
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
  },
  loadingIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
  },
});
