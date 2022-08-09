import React from "react";
import { View, Dimensions } from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";

const CreateAnnotation = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 20,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: Dimensions.get("screen").width * 0.8,
          height: Dimensions.get("screen").height * 0.8,
        }}
      >
        <Video
          source={require("../../../../../assets/tuts/create_annotation.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          // isLooping
          useNativeControls
          style={{
            width: Dimensions.get("screen").width * 0.8,
            height: Dimensions.get("screen").height * 0.75,
          }}
        />
      </View>
    </View>
  );
};

export default CreateAnnotation;
