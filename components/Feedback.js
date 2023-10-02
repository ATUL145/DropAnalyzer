import React from "react";
import { Button, View, Text, Pressable, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient";
import CallToAction from "./Button";
import LottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import CustomInputBox from "../components/InputBox";
function Feedback({ navigation }) {
  const [text, setText] = useState("");
  const primaryHandler = () => {
    navigation.navigate("Test");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LinearGradient
        colors={["#8957E8", "#FFFFFF"]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            style={{
              width: 120,
              height: 120,
            }}
            source={require("../assets/animation/water.json")}
            autoPlay
            loop
            resizeMode="contain"
          />

          <CustomInputBox
            style={{
              width: "90%",
              backgroundColor: "#C6C3FF",
              borderRadius: 10,
              height: "15%",
              textAlignVertical: "top",
              paddingHorizontal: 10,
              paddingVertical: 10,
              elevation: 5,
            }}
            placeholder="Write Your Queries"
            placeholderTextColor={"grey"}
            multiline={true}
            numberOfLines={3}
            maxLength={150}
            cursorColor={"black"}
            value={text}
            onChangeText={(text) => setText(text)}
          />
        </View>
      </LinearGradient>

      <CallToAction
        primary={true}
        onPressPrimary={primaryHandler}
        primaryLabel={"Submit"}
      />
    </View>
  );
}

export default Feedback;
