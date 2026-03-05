import React, { useState } from 'react'
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const interstitials = [
  {
    id: 1,
    title: 'Oreiller Ctrl+Alt+Sleep',
    text: 'Oreiller ergonomique, anti-burnout, livré avec une heure de sommeil offerte',
    background: '#42f45a',
    image: {uri: "https://raw.githubusercontent.com/maparent1/fake-ads-module/main/assets/Oreiller.png"},
    url: 'https://maparent1.github.io/fake-ads-module/pages/Oreiller.html'
  },
  {
    id: 2,
    title: 'Évennement : Git Awards 2026',
    text: 'Meilleur commit message, pire merge conflict… Es-tu nominé ?',
    background: '#f442f4',
    image: {uri:"https://raw.githubusercontent.com/maparent1/fake-ads-module/main/assets/GitAwards.png"},
    url: 'https://maparent1.github.io/fake-ads-module/pages/GitAwards.html'
  },
  {
    id: 3,
    title: 'Bas 404 Error: Feet Not Found',
    text: 'Portées par les devs qui ne quittent jamais leur bureau',
    background: '#f4a742',
    image: {uri: "https://raw.githubusercontent.com/maparent1/fake-ads-module/main/assets/Bas.png"},
    url: 'https://maparent1.github.io/fake-ads-module/pages/Bas.html'
  }
]

export default function InterstitialAd ({ visible, onClose }) {
  const [index, setIndex] = useState(0)
  const ad = interstitials[index]

  const handleClose = () => {
    setIndex(prev => (prev + 1) % interstitials.length)
    onClose()
  }

  const handleAdClick = () => {
    Linking.openURL(ad.url)
    handleClose()
  }

  return (
    <>
      <View style={{ position: 'absolute' }}>
        {interstitials.map(item => (
          <Image
            key={item.id}
            source={item.image}
            style={{ width: 0, height: 0 }}
          />
        ))}
      </View>

      <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={[styles.adBox, { backgroundColor: ad.background }]}
            onPress={handleAdClick}
            activeOpacity={0.95}
          >
            <ImageBackground
              source={ad.image}
              style={styles.bgImage}
              imageStyle={styles.bgImageBlur}
              blurRadius={3}
            />

            <View style={styles.veil} />

            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeText}>✖️</Text>
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{ad.title}</Text>
            </View>

            <Text style={styles.adText}>{ad.text}</Text>

            <Text style={styles.ctaText}>Appuie pour en savoir plus →</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  adBox: {
    width: '80%',
    height: '55%',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  bgImageBlur: {
    borderRadius: 10,
    opacity: 0.6
  },
  veil: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.15)'
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    lineHeight: 34,
    color: 'white'
  },
  adText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    paddingHorizontal: 20
  },
  ctaText: {
    marginTop: 16,
    fontSize: 12,
    color: 'white',
    opacity: 0.75,
    fontStyle: 'italic'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5
  },
  closeText: { fontSize: 18 }
})
