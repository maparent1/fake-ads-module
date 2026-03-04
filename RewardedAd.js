import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";

export default function RewardedAd({ visible, onClose, onReward }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.adBox}>
          <Text style={styles.title}>🎁 Pub Récompensée</Text>
          <Text>Regardez cette annonce pour un bonus !</Text>
          <Button
            title="Réclamer la récompense"
            onPress={() => { onReward(); onClose(); }}
          />
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