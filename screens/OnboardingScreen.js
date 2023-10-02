import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import Onboarding from "react-native-onboarding-swiper";
function OnboardingScreen({ navigation }) {
  const DoneComponentHandler = () => {
    return (
      <>
        <Pressable
          style={{
            marginTop: -60,
            marginRight: 90,
            width: "110%",
            backgroundColor: "#c4d6f5",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "row",
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Image
            source={require("../assets/animation/signInLogo.png")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: 400,
              marginRight: 10,
              marginTop: 3,
            }}
          >
            Sign In with google
          </Text>
        </Pressable>
      </>
    );
  };
  return (
    <View style={{ flex: 1 / 0.9 }}>
      <Onboarding
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View
                style={{
                  width: "100%",
                  height: "50%",
                }}
              >
                <LottieView
                  style={{
                    width: 250,
                    height: 250,
                    marginLeft: 50,
                    borderWidth: 3,
                    borderColor: "green",
                    backgroundColor: "grren",
                  }}
                  source={require("../assets/animation/splash1.json")}
                  autoPlay
                  loop
                  resizeMode="contain"
                />
              </View>
            ),
            title: "Welcome to DropAnalzer",
            subtitle: "Drop the Water",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View
                style={{
                  width: "100%",
                  height: "50%",
                }}
              >
                <LottieView
                  style={{ width: 350, height: 350, marginLeft: 10 }}
                  source={require("../assets/animation/splash2.json")}
                  autoPlay
                  loop
                  resizeMode="cover"
                />
              </View>
            ),
            title: "Capture it",
            subtitle: "Capture the water drop image",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View
                style={{
                  width: "100%",
                  height: "50%",
                }}
              >
                <LottieView
                  style={{ width: 250, height: 250, marginLeft: 50 }}
                  source={require("../assets/animation/splash3.json")}
                  autoPlay
                  loop
                  resizeMode="cover"
                />
              </View>
            ),
            title: "Contact Angle",
            subtitle: "",
          },
        ]}
        showSkip={false}
        showNext={false}
        bottomBarHeight={35}
        bottomBarColor={"skyblue"}
        DoneButtonComponent={DoneComponentHandler}
        showDone={true}
      />
    </View>
  );
}

export default OnboardingScreen;
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
