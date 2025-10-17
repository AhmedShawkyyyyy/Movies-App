import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace("Main");
      console.log("Navigate to Home Screen");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.backgroundGradient}>
        <View style={[styles.glowCircle, styles.glowCircle1]} />
        <View style={[styles.glowCircle, styles.glowCircle2]} />
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}
        >
          <View style={styles.iconGlow} />
          <View style={styles.iconBackground}>
            <Icon name="movie-open" size={80} color="#FFFFFF" />
            <View style={styles.playIconContainer}>
              <Icon name="play" size={40} color="#FFFFFF" />
            </View>
          </View>
        </Animated.View>

        <Text style={styles.appName}>Movies App</Text>
        <Text style={styles.tagline}>All the Movies In Your Hands</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth }]}
            />
          </View>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Animated.View>

      <Text style={styles.copyright}>
        © 2025 Movies App. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },
  glowCircle: {
    position: "absolute",
    borderRadius: 9999,
    opacity: 0.15,
  },
  glowCircle1: {
    width: 300,
    height: 300,
    backgroundColor: "#DC2626",
    top: 100,
    left: -50,
  },
  glowCircle2: {
    width: 400,
    height: 400,
    backgroundColor: "#9333EA",
    bottom: 100,
    right: -100,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 30,
  },
  iconGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#DC2626",
    opacity: 0.3,
    top: -40,
    left: -40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  playIconContainer: {
    position: "absolute",
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: "#9CA3AF",
    letterSpacing: 1,
    marginBottom: 40,
  },
  progressContainer: {
    width: width * 0.6,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#1F2937",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#DC2626",
  },
  loadingText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 16,
  },
  copyright: {
    position: "absolute",
    bottom: 30,
    fontSize: 12,
    color: "#4B5563",
  },
});

export default SplashScreen;
