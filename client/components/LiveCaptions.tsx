import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Spacing, BorderRadius } from "@/constants/theme";

interface LiveCaptionsProps {
  targetText: string;
  englishText: string;
}

export default function LiveCaptions({ targetText, englishText }: LiveCaptionsProps) {
  if (!targetText) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={styles.container}
    >
      <Text style={styles.targetText} numberOfLines={3}>
        {targetText}
      </Text>
      {englishText ? (
        <Text style={styles.englishText} numberOfLines={2}>
          {englishText}
        </Text>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    maxWidth: "90%",
    alignSelf: "center",
    maxHeight: 120,
    overflow: "hidden",
  },
  targetText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
  },
  englishText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Spacing.xs,
    lineHeight: 22,
  },
});
