import React, { useEffect, useState } from "react";
import { AppState, Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const banners = [
  { id: 1, text: "LAN Party Hiver 2026 – jeux, code et pizza, le trio légendaire. Places limitées !", background: "#42a5f5", image: { uri: "https://raw.githubusercontent.com/maparent1/ImagesProjetTest/main/assets/LAN.png" }, url: "https://maparent1.github.io/ImagesProjetTest/Lan.html" },
  { id: 2, text: "Hoodie 'Keep Calm and Clear Cache' – pour coder serein même en prod", background: "#f4c542", image: { uri: "https://raw.githubusercontent.com/maparent1/ImagesProjetTest/main/assets/Hoodie.png" }, url: "https://maparent1.github.io/ImagesProjetTest/Hoodie.html" },
  { id: 3, text: "NullPointer Antivirus – parce qu'un null non détecté, c'est un bug qui dort", background: "#f45a42", image: { uri: "https://raw.githubusercontent.com/maparent1/ImagesProjetTest/main/assets/Antivirus.png" }, url: "https://maparent1.github.io/ImagesProjetTest/Antivirus.html" },
];

const randomIndex = () => Math.floor(Math.random() * banners.length);

export default function BannerAd({ size = "BANNER" }) {
  const [index, setIndex] = useState(randomIndex);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        setIndex(randomIndex());
      }
    });
    return () => subscription.remove();
  }, []);

  const ad = banners[index];

  const handleAdClick = () => {
    Linking.openURL(ad.url);
  };

  return (
    <>
      <View style={{ position: "absolute" }}>
        {banners.map((item) => (
          <Image key={item.id} source={item.image} style={{ width: 0, height: 0 }} />
        ))}
      </View>

      <TouchableOpacity onPress={handleAdClick} activeOpacity={0.9}>
        <ImageBackground
          source={ad.image}
          style={[styles.container, sizeStyles[size] || sizeStyles.BANNER, { backgroundColor: ad.background }]}
          imageStyle={{ opacity: 0.6, borderRadius: 8 }}
          blurRadius={3}
        >
          <View style={styles.veil} />
          <Text style={styles.text}>{ad.text}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
    overflow: "hidden",
  },
  veil: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  text: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    paddingHorizontal: 10,
    fontSize: 13,
  },
});

const sizeStyles = {
  BANNER: { height: 50, width: "100%" },
  LARGE_BANNER: { height: 100, width: "100%" },
  MEDIUM_RECTANGLE: { height: 250, width: 300 },
};