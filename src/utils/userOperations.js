import {
    deleteUser,
    getAuth,
    signOut,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
  import { db } from "../config/firebase";
  import { resetUser } from "../features/userReducer";
  
  export const getUser = async (userID) => {
    const userRef = doc(db, "students", userID);
    const userDoc = await getDoc(userRef);
    return userDoc;
  };
  
  export const updateUserPicture = async (userID, newPhoto) => {
    try {
      await updateDoc(doc(db, "students", userID), {
        profilePicture: newPhoto,
      });
      console.log("Foto de perfil actualizada");
    } catch (e) {
      console.log("Error al actualizar la foto de perfil");
    }
  };
  
  export const updateBankAccountNumber = async (userID, newBankAccountNumber) => {
    try {
      await updateDoc(doc(db, "students", userID), {
        bankAccountNumber: newBankAccountNumber,
      });
      console.log("Número de cuenta bancario actualizado.", newBankAccountNumber);
    } catch (e) {
      console.log("Error al actualizar el número de cuenta bancario.");
    }
  };
  
  export const updateCciNumber = async (userID, newCciNumber) => {
    try {
      await updateDoc(doc(db, "students", userID), {
        cciNumber: newCciNumber,
      });
      console.log(
        "Número de cuenta bancaria interbancario actualizado.",
        newCciNumber
      );
    } catch (e) {
      console.log("Error al actualizar el número de cuenta interbancario.");
    }
  };
  
  export const updateSchedule = async (userID, newSchedule) => {
    try {
      await updateDoc(doc(db, "students", userID), {
        schedule: newSchedule,
      });
      console.log("Horario actualizado");
    } catch (e) {
      console.log("Error al actualizar el horario");
    }
  };
  
  export const updateUserNotificationToken = async (userID, token) => {
    try {
      await updateDoc(doc(db, "students", userID), {
        notificationToken: token,
      });
      console.log("Token de notificación push del usuario actualizado"), token;
    } catch (e) {
      console.log(
        "Error al actualizar el token de notificación push del usuario",
        e
      );
    }
  };
  
  export const updateUserLocation = async (userID, location) => {
    const { latitude, longitude } = location;
    try {
      await updateDoc(doc(db, "students", userID), {
        latitude: latitude,
        longitude: longitude,
      });
      console.log("Ubicación del usuario actualizada");
    } catch (e) {
      console.log("Error al actualizar la ubicación del usuario");
    }
  };
  
  export const updatePhoneNumber = async (userID, newPhoneNumber) => {
    try {
      await updateDoc(doc(db, "students", userID), {
        phoneNumber: newPhoneNumber,
      });
      console.log("Número de teléfono actualizado"), newPhoneNumber;
    } catch (e) {
      console.log("Error al actualizar el número de teléfono", e);
    }
  };
  
  export const logoutUser = async (dispatch) => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(resetUser());
    } catch (e) {
      console.log(e);
    }
  };
  
  export const deleteAccount = async (dispatch, userID, email, password) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          await deleteDoc(doc(db, "students", userID)).then(async () => {
            await deleteUser(user);
            dispatch(resetUser());
            console.log("La cuenta se eliminó exitósamente.");
          });
        })
        .catch((e) => {
          console.log("Error al eliminar la cuenta", e);
        });
    } catch (e) {
      console.log("Error al eliminar usuario", e);
    }
  };
  