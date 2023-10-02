import React, { useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Svg, { Line, Circle } from "react-native-svg";
import Dimensions from "react-native/Libraries/Utilities/Dimensions";
import { Entypo, Ionicons } from "@expo/vector-icons";
import PressableCard from "../components/PressableCard";
const { width, height } = Dimensions.get("window");

const ContactAngle = ({ route, navigation }) => {
  const imageUri = route.params.uri;

  const [lines, setLines] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [angleBetweenLines, setAngleBetweenLines] = useState(0);
  const [angleFromHorizontal, setAngleFromHorizontal] = useState(0);

  const createLine = (start, end) => {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const length = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );

    return {
      start,
      end,
      angle,
      length,
    };
  };

  const clearLines = () => {
    setLines([]);
    setAngleBetweenLines(0);
    setAngleFromHorizontal(0);
  };

  const calculateAngle = (line1, line2) => {
    // Calculate the angle between two lines using dot product
    const dotProduct =
      (line1.end.x - line1.start.x) * (line2.end.x - line2.start.x) +
      (line1.end.y - line1.start.y) * (line2.end.y - line2.start.y);

    // Calculate the magnitude of the vectors
    const magnitude1 = Math.sqrt(
      Math.pow(line1.end.x - line1.start.x, 2) +
        Math.pow(line1.end.y - line1.start.y, 2)
    );
    const magnitude2 = Math.sqrt(
      Math.pow(line2.end.x - line2.start.x, 2) +
        Math.pow(line2.end.y - line2.start.y, 2)
    );

    // Calculate the angle in radians
    const angleInRadians = Math.acos(dotProduct / (magnitude1 * magnitude2));

    // Convert the angle from radians to degrees
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    return angleInDegrees.toFixed(2);
  };

  const calculateAngleFromHorizontal = (line) => {
    const angle = Math.atan2(
      line.end.y - line.start.y,
      line.end.x - line.start.x
    );
    const angleInDegrees = (angle * 180) / Math.PI;
    return angleInDegrees.toFixed(2);
  };

  const MIN_DISTANCE_TO_ATTACH = 80; // Adjust this value as needed

  const onPanResponderMove = (event, gestureState) => {
    if (isRotating) return;

    if (!isDragging) {
      setIsDragging(true);
    }

    const updatedLines = [...lines];
    const endTouch = {
      x: event.nativeEvent.locationX.toFixed(2),
      y: event.nativeEvent.locationY.toFixed(2),
    };

    updatedLines[updatedLines.length - 1].end = endTouch;

    if (updatedLines.length >= 2) {
      const newAngleBetweenLines = calculateAngle(
        updatedLines[updatedLines.length - 2],
        updatedLines[updatedLines.length - 1]
      );
      setAngleBetweenLines(newAngleBetweenLines);
    }

    // Check if P3 is close to any existing line's start or end points
    for (let i = 0; i < updatedLines.length - 1; i++) {
      const lineStart = updatedLines[i].start;
      const lineEnd = updatedLines[i].end;

      // Check if P3 is close to lineStart
      const distanceToStart = Math.sqrt(
        Math.pow(endTouch.x - lineStart.x, 2) +
          Math.pow(endTouch.y - lineStart.y, 2)
      );

      if (distanceToStart < MIN_DISTANCE_TO_ATTACH) {
        updatedLines[updatedLines.length - 1].end = lineStart;
        break;
      }

      // Check if P3 is close to lineEnd
      const distanceToEnd = Math.sqrt(
        Math.pow(endTouch.x - lineEnd.x, 2) +
          Math.pow(endTouch.y - lineEnd.y, 2)
      );

      if (distanceToEnd < MIN_DISTANCE_TO_ATTACH) {
        updatedLines[updatedLines.length - 1].end = lineEnd;
        break;
      }
    }

    const newAngleFromHorizontal = calculateAngleFromHorizontal(
      updatedLines[updatedLines.length - 1]
    );
    setAngleFromHorizontal(newAngleFromHorizontal);

    setLines(updatedLines);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event, gestureState) => {
      if (isRotating || isDragging) return false;
      return true;
    },
    onStartShouldSetPanResponderCapture: (event, gestureState) => {
      const startTouch = {
        x: event.nativeEvent.locationX.toFixed(2),
        y: event.nativeEvent.locationY.toFixed(2),
      };
      setLines([...lines, createLine(startTouch, startTouch)]);
    },
    onMoveShouldSetPanResponder: (event, gestureState) => {
      if (isRotating || isDragging) return false;
      return true;
    },
    onMoveShouldSetPanResponderCapture: (event, gestureState) => {
      return true;
    },
    onPanResponderMove: onPanResponderMove,
    onPanResponderRelease: (event, gestureState) => {
      if (isRotating) {
        setIsRotating(false);
        setIsDragging(false);
      } else if (isDragging) {
        setIsDragging(false);
      }
    },
  });

  const handleRotation = () => {
    setIsRotating(true);
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.imageContainer}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={{ height: "100%" }} />
        )}
      </View>
      <View style={styles.overlay}>
        <Svg height={height} width={width} position="absolute">
          {lines.map((line, index) => (
            <View key={index}>
              <Line
                key={index}
                x1={line.start.x}
                y1={line.start.y}
                x2={line.end.x}
                y2={line.end.y}
                stroke="red"
                strokeWidth="4"
                rotation={isRotating ? line.angle : 0}
                originX={line.start.x}
                originY={line.start.y}
                onPressIn={() => setIsRotating(true)}
              />
              <Circle
                cx={line.start.x}
                cy={line.start.y}
                r={4} // Adjust the radius of the circle as needed
                fill="blue" // Change the color as needed
              />
              <Circle
                cx={line.end.x}
                cy={line.end.y}
                r={4} // Adjust the radius of the circle as needed
                fill="green" // Change the color as needed
              />
            </View>
          ))}
        </Svg>
        <View
          style={{ flex: 1, backgroundColor: "transparent" }}
          {...panResponder.panHandlers}
        />
      </View>

      <View>
        <PressableCard
          title={`Angle between lines: ${angleBetweenLines} degrees`}
          ContainerStyle={{ width: "100%" }}
          Cardstyle={{ width: "95%" }}
          onPress={() => navigation.navigate("History", { angleBetweenLines })}
        />
        <PressableCard
          title={` Angle from horizontal: ${angleFromHorizontal} degrees`}
          ContainerStyle={{ width: "100%" }}
          Cardstyle={{ width: "95%" }}
        />
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={clearLines}>
        <Entypo name="circle-with-cross" size={30} color="purple" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back-outline" size={30} color="purple" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    height: "90%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  angleText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  clearButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "transparent",
  },
});

export default ContactAngle;
