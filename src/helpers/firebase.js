import * as firebase from "firebase";
import "firebase/functions";
import { Alert } from "react-native";

export const manageFPErrorCode = (error) => {
  switch (error.code) {
    case "auth/user-not-found":
      Alert.alert(
        "User not found",
        "Unfortunately we can't find the user corresponding to the email address entered. Please check to make sure it has been entered correctly."
      );
      break;
    case "auth/invalid-email":
      Alert.alert(
        "Invalid email address",
        "Unfortunately the email address format is incorrect. Please check to make sure it has been entered correctly."
      );
      break;
    case "auth/wrong-password":
      Alert.alert(
        "Incorrect email or password",
        "Unfortunately the email address or password are incorrect. Please check to make sure they have been entered correctly."
      );
      break;
    case "auth/email-already-in-use":
      Alert.alert(
        "Email already in use",
        "Unfortunately the email address provided is already in use. Please try another."
      );
      break;
    default:
      Alert.alert(error.code, error.message);
      break;
  }
};

export const manageFPErrorMessage = (error) => {
  Alert.alert("Error", error.message);
};

export const manageFPError = (error) => {
  Alert.alert("Error", error);
};

export const forgotPassword = (emailAddress) => {
  firebase
    .auth()
    .sendPasswordResetEmail(emailAddress)
    .then(function () {
      Alert.alert(
        "Password reset email sent successfully",
        "Please check your inbox."
      );

      // Email sent.
    })
    .catch(function (error) {
      manageFPErrorCode(error);
      // An error happened.
    });
};

export const validEmail = (email) => {
  return new Promise((resolve, reject) => {
    firebase
      .functions()
      .httpsCallable("verifyEmail")({ email: email })
      .then(({ data }) => {
        if (data.message) {
          console.log("success");
          resolve(data.message);
        } else {
          reject(
            "This is not a valid study email address. Please make sure you have consented to the study first."
          );
        }
      })
      .catch((err) => {
        console.log(err);
        reject(
          "This is not a valid study email address. Please make sure you have consented to the study first."
        );
      });
  });
};

export const onboard = (email) => {
  return new Promise((resolve, reject) => {
    console.log("in onboard");
    firebase
      .functions()
      .httpsCallable("onboarded")({ email: email })
      .then(({ data }) => {
        if (data.message) {
          console.log("onboarded:", data.message);
          resolve(data.message);
        } else {
          console.log("eeror here");
          reject(data.message);
        }
      })
      .catch((err) => {
        console.log("error here", err);
        reject(err);
      });
  });
};

export const reauthenticate = (currentPassword) => {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  return user.reauthenticateWithCredential(cred);
};
