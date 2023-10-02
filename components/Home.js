import * as React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PressableCard from "./PressableCard";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
function Home(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        setSelectedImage(image.path);
        props.navigation.navigate("ContactAngle", { uri: image.path });
      })
      .catch((error) => {
        console.error("Image picker error:", error);
      });
  };

  const cameraHandler = async () => {
    try {
      const cameraPermissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);

      if (cameraPermissionStatus === RESULTS.GRANTED) {
        const image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        console.log(image);
        setSelectedImage(image.path);
        props.navigation.navigate("ContactAngle", { uri: image.path });
      } else {
        const result = await request(PERMISSIONS.ANDROID.CAMERA);

        if (result === RESULTS.GRANTED) {
          const image = await ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          });
          console.log(image);
          setSelectedImage(image.path);
          props.navigation.navigate("ContactAngle", { uri: image.path });
        } else {
          console.warn("Camera permission denied");
        }
      }
    } catch (error) {
      console.error("Error checking or requesting camera permission:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FFFFFF", "#8f79b8", "#8f79b8", "#8957E8"]}
        style={{
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          width: "100%",
          height: "30%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "30%",
            marginTop: "20%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
            }}
          >
            Capture & Analyze
          </Text>
          <Text style={{ color: "whitesmoke", fontSize: 16 }}>
            Measure Contact Angles with Your Photos
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <PressableCard
          Cardstyle={{ marginTop: -40 }}
          title="Photos on Device"
          icon={
            <MaterialIcons
              name="photo-library"
              size={24}
              color="#8957E8"
              style={{ marginRight: 0, marginLeft: 100, marginTop: 10 }}
            />
          }
          onPress={selectImage}
        />
        <PressableCard
          Cardstyle={{ marginTop: -40 }}
          title="Upload document"
          icon={
            <MaterialIcons
              name="drive-folder-upload"
              size={24}
              color="#8957E8"
              style={{ marginRight: 0, marginLeft: 100, marginTop: 10 }}
            />
          }
          onPress={selectImage}
        />
      </View>
      <View>
        <PressableCard
          ContainerStyle={{
            marginLeft: "28%",
          }}
          title="Take from Camera"
          icon={
            <Ionicons
              name="ios-camera-sharp"
              size={24}
              color="#8957E8"
              style={{ marginRight: 0, marginLeft: 100, marginTop: 5 }}
            />
          }
          onPress={cameraHandler}
        />
      </View>

      <View style={{ flex: 1 }}>
        <LottieView
          style={{
            width: "100%",
            height: "auto",
            marginTop: "30%",
            borderWidth: 3,
          }}
          source={require("../assets/animation/waterdrop.json")}
          autoPlay
          loop
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

export default Home;

const styles = new StyleSheet.create({
  ContainerStyle: {},
  CardStyle: {},
  ContentStyle: {},
  TitleStyle: {},
});
