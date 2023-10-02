import LottieView from "lottie-react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from "react-native";
import CallToAction from "./Button";
import CustomInputBox from "./InputBox";
function Project(props) {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const PrimaryHandler = () => {
    console.log("Sona is pressed😤😤😤");
  };

  const SecondaryHandler = () => {
    console.log("Ayush is pressed😎😎😎");
  };

  const PrimaryButtonStyle = {
    backgroundColor: "skyblue",
  };

  const SecondaryButtonStyle = {
    backgroundColor: "white",
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardOpen ? 0 : -200}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <LottieView
            style={{
              width: keyboardOpen ? 200 : 350,
              height: keyboardOpen ? 200 : 350,
              marginTop: keyboardOpen ? -25 : 40,
            }}
            source={require("../assets/animation/Project.json")}
            autoPlay
            loop
            resizeMode="contain"
          />

          <CustomInputBox
            placeholder="Enter Your Name"
            placeholderTextColor="grey"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{ marginTop: 10 }}
          />
          <CustomInputBox
            placeholder="Enter Your Project Name"
            placeholderTextColor="grey"
            value={project}
            onChangeText={(text) => setProject(text)}
            style={{ marginTop: 10 }}
          />
          <CustomInputBox
            placeholder="Enter Project Description"
            placeholderTextColor="grey"
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={{ marginTop: 10 }}
          />

          <CallToAction
            secondary={true}
            onPressPrimary={PrimaryHandler}
            onPressSecondary={SecondaryHandler}
            primaryLabel={"Continue"}
            PrimaryStyle={PrimaryButtonStyle}
            SecondaryLabel={"Skip"}
            SecondaryStyle={SecondaryButtonStyle}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Project;
