import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const PressableCard = ({
  title,
  description,
  onPress,
  ContainerStyle,
  Cardstyle,
  Titlestyle,
  Contentstyle,
  icon,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.cardContainer, ContainerStyle]}>
      <View style={[styles.card, Cardstyle]}>
        <Text style={[styles.title, Titlestyle]}>{title}</Text>
        {icon}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 10,
    width: "45%",
    height: "auto",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
});

export default PressableCard;
