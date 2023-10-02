import React, { useState } from "react";
import { View, StyleSheet, PanResponder, Button, Text } from "react-native";
import Svg, { Line } from "react-native-svg";
import Dimensions from "react-native/Libraries/Utilities/Dimensions";

const { width, height } = Dimensions.get("window");

const Experiment = () => {
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
    onPanResponderMove: (event, gestureState) => {
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

      const newAngleFromHorizontal = calculateAngleFromHorizontal(
        updatedLines[updatedLines.length - 1]
      );
      setAngleFromHorizontal(newAngleFromHorizontal);

      setLines(updatedLines);
    },
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
      <View style={styles.childView}>
        <Svg height={height} width={width} position="absolute">
          {lines.map((line, index) => (
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
          ))}
        </Svg>
        <View
          style={{ flex: 1, backgroundColor: "transparent" }}
          {...panResponder.panHandlers}
        />
      </View>
      <Text style={styles.angleText}>
        Angle between lines: {angleBetweenLines} degrees
      </Text>
      <Text style={styles.angleText}>
        Angle from horizontal: {angleFromHorizontal} degrees
      </Text>
      <Button title="Clear Lines" onPress={clearLines} />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  childView: {
    flex: 1,
    overflow: "hidden",
  },

  angleText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});

export default Experiment;
