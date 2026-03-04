import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";

export default function InterstitialAd({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.adBox}>
          <Text style={styles.title}>📢 Pub Interstitielle</Text>
          <Text>Annonce simulée</Text>
          <Button title="Fermer" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  adBox: {
    width: "80%", padding: 20,
    backgroundColor: "white", borderRadius: 10,
    alignItems: "center"
  },
  title: { fontWeight: "bold", marginBottom: 10 },
});