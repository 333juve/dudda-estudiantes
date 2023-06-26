import React from "react";
import { ScrollView, RefreshControl } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../features/userReducer";

import ProfilePicture from "../components/profile/ProfilePicture";
import ProfileInformation from "../components/profile/ProfileInformation";
import ProfilePermissions from "../components/profile/ProfilePermissions";

export default function Profile() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const user = useSelector((state) => state.user);

  async function getUser(userId) {
    const userRef = doc(db, "students", userId);
    const userDoc = await getDoc(userRef);
    dispatch(
      setUser({
        birthday: userDoc.data()?.birthday,
        createdAt: userDoc.data()?.createdAt,
        email: userDoc.data()?.email,
        firstName: userDoc.data()?.firstName,
        id: userDoc.data()?.id,
        lastName: userDoc.data()?.lastName,
        latitude: userDoc.data()?.latitude,
        longitude: userDoc.data()?.longitude,
        notificationToken: userDoc.data()?.notificationToken,
        phoneNumber: userDoc.data()?.phoneNumber,
        profilePicture: userDoc.data()?.profilePicture,
      })
    );
  }

  async function handleRefresh() {
    setRefreshing(true);
    await getUser(user.id);
    setRefreshing(false);
  }

  return (
    <ScrollView
      style={{ flex: 1, marginHorizontal: 20 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <ProfilePicture />
      <ProfileInformation />
      <ProfilePermissions />
    </ScrollView>
  );
}
