import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  Alert, Modal, Text, Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import * as meActions from "../../../store/actions/me";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { HeaderBackButton } from "@react-navigation/stack";
import Colours from "../../../../config/colours.json";
import RecordButton from "../../../components/Me/RecordScreenButton/RecordScreenButton.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getCurrentTimestamp } from "../../../helpers/date";
import { logEvent, events } from "../../../helpers/amplitude";
import KeyboardUIFix from "../../../components/UI/KeyboardUIFix";
import axios from "axios";

const Diary = (props) => {
  const dispatch = useDispatch();

  //image uri
  const [image, setImage] = useState("");
  //diary text
  const [diaryText, setDiaryText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  //update back button depending on where navigated from
  useLayoutEffect(() => {
    const updateBackButton = () => {
      props.navigation.setOptions({
        headerLeft: () => (
            <HeaderBackButton
                onPress={() => props.navigation.navigate(props.route.params.navTo)}
            />
        ),
      });
    };

    updateBackButton();
  }, [props.navigation]);

  //initialising state
  useEffect(() => {
    //initialise diary text
    const diaryTextInit = () => {
      setDiaryText(props.route.params.body);
    };

    //initialise image
    const imageInit = () => {
      setImage(props.route.params.image);
    };

    //check permissions
    const getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };

    diaryTextInit();
    imageInit();
    getPermissionAsync();
  }, []);

  /**
   * This function will check if a string is empty
   *
   * @param  {string} string
   *
   * @returns {boolean}
   */
  const notEmptyString = (string) => {
    return string !== "" ? true : false;
  };
  /**
   * This function enables the user to pick an image for the diary
   *
   * @returns {void}
   */
  const pickImage = async () => {
    try {
      //launch image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        //Get the randomly generated name
        let imageName = result.uri.split("/");
        imageName = imageName[imageName.length - 1];
        //Append it to the fs path
        try {
          //copy file
          const toPath = FileSystem.documentDirectory + imageName;
          FileSystem.copyAsync({
            from: result.uri,
            to: toPath,
          });
          setImage(toPath);
        } catch (E) {
          console.log(E);
        }
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (

      <ScrollView>
        <View style={{ paddingVertical: 5, alignItems: "center" }}>
          <View style={{ ...styles.container, ...props.style }}>
            <View style={styles.majorCard}>
              {/* diary text entry */}
              <TextInput
                  style={{
                    ...styles.inputBoxStyle,
                    fontSize: 24,
                    fontFamily: "avenir-reg",
                    paddingHorizontal: "5%",
                    paddingVertical: "5%",
                  }}
                  multiline={true}
                  value={diaryText}
                  maxLength={1024}
                  placeholder={`I'm feeling...${"\n\n"}`}
                  onChangeText={(text) => setDiaryText(text)}
              />
              <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
              >
                {/* image */}
                {notEmptyString(image) ? (
                    <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          backgroundColor: Colours["background-grey"],
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingVertical: 7,
                          borderRadius: 20,
                          marginVertical: 15,
                        }}
                    >
                      <View
                          style={{
                            width: "80%",
                            paddingHorizontal: "2%",
                            flex: 5,
                          }}
                      >
                        <Image
                            source={{ uri: image }}
                            style={{
                              width: Dimensions.get("window").width * 0.63,
                              height: Dimensions.get("window").width * 0.63,
                              borderRadius: 20,
                            }}
                        />
                      </View>
                      <View
                          style={{
                            justifyContent: "center",
                            flex: 1,
                          }}
                      >
                        <TouchableOpacity onPress={() => setImage("")}>
                          <MaterialCommunityIcons
                              name="close-circle"
                              size={32}
                              color={Colours.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                ) : (
                    <View
                        style={{
                          width: "75%",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingBottom: 5,
                          paddingTop: 5,
                          borderRadius: 20,
                          marginVertical: 15,
                        }}
                    >
                      {/* attach image button */}
                      <Button
                          theme={{
                            colors: {
                              primary: Colours.primary,
                              underlineColor: "transparent",
                            },
                          }}
                          labelStyle={{ fontFamily: "avenir-demi-bold" }}
                          mode="contained"
                          onPress={() => {
                            pickImage();
                          }}
                      >
                        {" "}
                        Attach image
                      </Button>
                    </View>
                )}
              </View>
            </View>
            {/* diary record button */}
            <RecordButton
                onPress={() => {
                  if (diaryText.trim() !== "" || image !== "") {
                    // condition for updating current entry
                    if (props.route.params.body || props.route.params.image) {
                      dispatch(
                          meActions.updateTrackerData(
                              "Diary",
                              props.route.params.id,
                              props.route.params.title,
                              { value: diaryText, image: image },
                              props.route.params.date,
                              getCurrentTimestamp()
                          )
                      );
                      // condition for creating new entry
                    } else {
                      dispatch(
                          meActions.createTrackerData(
                              "Diary",
                              props.route.params.id,
                              props.route.params.title,
                              { value: diaryText, image: image },
                              props.route.params.date,
                              getCurrentTimestamp()
                          )
                      );
                    }
                    logEvent(events.me.me_act_record, { type: "Diary" });

                    makePostRequest(diaryText)
                        .then(response => {
                          // Delete these console logs eventually, just here to test
                          console.log("Data from function call:", response);
                          if (response >= 0 && response <= .99) {
                            console.log("Manderley thinks you're feeling okay, is this correct?");
                            setModalVisible(true);
                          } else if (response > .99) {
                            console.log("Manderley thinks you're feeling good, is this correct?");
                            setModalVisible(true);
                          } else {
                            console.log("Manderley thinks you're feeling bad, is this correct?");
                            setModalVisible(true);
                          }
                        })
                        .catch(error => {
                          error.message;
                        })
                  } else {
                    Alert.alert(
                        "Oops",
                        "You must add your thoughts or an image to your entry"
                    );
                  }
                }}
                valid={!(diaryText === "" && image === "")}
                colour={Colours.primary}
            />
          </View>
        </View>
        {modalVisible && <View style={styles.centeredView}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                props.navigation.navigate(props.route.params.navTo);
                setModalVisible(!modalVisible);
              }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Manderley thinks you are feeling good/okay/bad, is this correct?</Text>
                <Pressable
                    style={[styles.YesButton, styles.YesButtonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                    style={[styles.NoButton, styles.NoButtonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View> }
        <KeyboardUIFix/>
      </ScrollView>
  );
};

async function makePostRequest (diaryText) {

  let payload = { description: diaryText };

  let response = await axios.post('http://localhost:3000/', payload);

  let data = response.data.replace(/[^0-9+\/*=\-.\s]+/g, '');

  // Remove .log later
  console.log("\nThis is the data supplied to the API in the function:", diaryText,
      "\nThis is the data returned in the post function:", data);

  return data;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexWrap: "nowrap",
    elevation: 1,
    borderRadius: 10,
    borderColor: Colours.primary,
    borderWidth: 1.25,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
  },
  majorCard: {
    flex: 1,
  },
  inputBoxStyle: {
    color: "#000",
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
  },
  icon: {
    color: Colours["grey-dark"],
    fontSize: 90,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  YesButton: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    margin: 5,
  },
  NoButton: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    margin: 5,
  },
  YesButtonClose: {
    backgroundColor: "#2196f3",
  },
  NoButtonClose: {
    backgroundColor: "#C64545",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Diary;
