import React, { useState } from "react";
import { TextInput } from "react-native";

const CustomInputBox = ({
  placeholder,
  placeholderTextColor,
  multiline,
  numberOfLines,
  maxLength,
  cursorColor,
  value,
  onChangeText,
  style,
}) => {
  return (
    <TextInput
      style={{
        width: "90%",
        backgroundColor: "#C6C3FF",
        borderRadius: 10,
        height: multiline ? "auto" : 50,
        textAlignVertical: multiline ? "top" : "center",
        paddingHorizontal: 10,
        paddingVertical: multiline ? 10 : 0,
        elevation: 5,
        ...style,
      }}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor || "grey"}
      multiline={multiline || false}
      numberOfLines={numberOfLines || 1}
      maxLength={maxLength || 150}
      cursorColor={cursorColor || "black"}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default CustomInputBox;
