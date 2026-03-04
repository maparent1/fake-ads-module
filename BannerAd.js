import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BannerAd({ size = "BANNER" }) {
  return (
    <View style={[styles.container, sizeStyles[size] || sizeStyles.BANNER]}>
      <Text style={styles.text}>📢 Publicité simulée</Text>
      <Text style={styles.textSmall}>Format : {size}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4c542",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  text: { fontWeight: "bold" },
  textSmall: { fontSize: 12 },
});

const sizeStyles = {
  BANNER: { height: 50, width: "100%" },
  LARGE_BANNER: { height: 100, width: "100%" },
  MEDIUM_RECTANGLE: { height: 250, width: 300 },
};