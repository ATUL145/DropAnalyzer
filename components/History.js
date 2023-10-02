import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient";
import LottieView from "lottie-react-native";
import PressableCard from "./PressableCard";
import { useRoute } from "@react-navigation/native";

function History(props) {
  const route = useRoute();
  const angleBetweenLines = route.params?.angleBetweenLines || 0;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LinearGradient
        colors={["#8957E8", "#FFFFFF"]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View>
          <LottieView
            style={{
              width: 350,
              height: 350,
            }}
            source={require("../assets/animation/History.json")}
            autoPlay
            loop
            resizeMode="contain"
          />
        </View>
        <PressableCard
          ContainerStyle={{
            width: "80%",
            marginLeft: "10%",
          }}
          title={`Angle Between Lines is ${angleBetweenLines}`}
        />
      </LinearGradient>
    </View>
  );
}

export default History;
