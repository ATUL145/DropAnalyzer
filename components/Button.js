import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const CallToAction = ({
  PrimaryStyle,
  primary,
  secondary,
  primaryLabel,
  SecondaryLabel,
  onPressPrimary,
  onPressSecondary,
  ContainerStyle,
  SecondaryStyle,
}) => {
  const handlePress = (onPress) => {
    if (onPress) {
      onPress();
    }
  };

  const renderPrimaryButton = () => {
    if (primary) {
      return (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.buttonPressed,
            PrimaryStyle,
          ]}
          onPress={() => handlePress(onPressPrimary)}
        >
          <Text style={styles.buttonText}>{primaryLabel}</Text>
        </Pressable>
      );
    }
    return null;
  };

  const renderSecondaryButtons = () => {
    if (secondary) {
      return (
        <View style={styles.secondaryButtonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.secondaryButton,
              pressed && styles.buttonPressed,
              SecondaryStyle,
            ]}
            onPress={() => handlePress(onPressSecondary)}
          >
            <Text style={styles.buttonText}>{SecondaryLabel}</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.secondaryButton,
              pressed && styles.buttonPressed,
              PrimaryStyle,
            ]}
            onPress={() => handlePress(onPressPrimary)}
          >
            <Text style={styles.buttonText}>{primaryLabel}</Text>
          </Pressable>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, ContainerStyle]}>
      {renderPrimaryButton()}
      {renderSecondaryButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "column",
    alignItems: "stretch",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonPressed: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryButton: {
    backgroundColor: "skyblue",
  },
  secondaryButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "grey",
  },
});

export default CallToAction;
