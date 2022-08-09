import * as Crypto from "expo-crypto";
import * as React from "react";
import { AsyncStorage } from "react-native";

export const setUserHash = async (email) => {
  const hash = await genHash(email);
  await AsyncStorage.setItem("userHash", hash);
};

export const deleteUserHash = async () => {
  try {
    await AsyncStorage.removeItem("userHash");
    return true;
  } catch (exception) {
    return false;
  }
};

export const getUserHash = async () => {
  const hash = await AsyncStorage.getItem("userHash");
  return hash;
};

export const genHash = async (email) => {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    email
  );
  return hash;
};
