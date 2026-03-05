import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const REWARD_DURATION = 10

const rewarded = [
  {
    id: 1,
    title: '🥳 NullPointer Antivirus',
    text: "30 jours gratuits pour les devs motivés qui regardent jusqu'au bout !",
    background: '#42c5f4',
    image: {
      uri: 'https://raw.githubusercontent.com/maparent1/fake-ads-module/main/assets/Antivirus.png'
    }
  }
]

export default function RewardedAd ({ visible, onClose, onReward }) {
  const [timeLeft, setTimeLeft] = useState(REWARD_DURATION)
  const [canClaim, setCanClaim] = useState(false)
  const progressAnim = useRef(new Animated.Value(0)).current
  const animationRef = useRef(null)
  const ad = rewarded[0]

  useEffect(() => {
    if (visible) {
      setTimeLeft(REWARD_DURATION)
      setCanClaim(false)
      progressAnim.setValue(0)

      const timeout = setTimeout(() => {
        animationRef.current = Animated.timing(progressAnim, {
          toValue: 1,
          duration: REWARD_DURATION * 1000,
          useNativeDriver: false
        })
        animationRef.current.start()
      }, 50)

      return () => clearTimeout(timeout)
    } else {
      if (animationRef.current) animationRef.current.stop()
      setTimeLeft(REWARD_DURATION)
      setCanClaim(false)
      progressAnim.setValue(0)
    }
  }, [visible])

  useEffect(() => {
    if (!visible || canClaim) return
    if (timeLeft <= 0) {
      setCanClaim(true)
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [visible, timeLeft])

  const handleClaim = () => {
    onReward()
    onClose()
  }

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  })

  return (
    <>
      <View style={{ position: 'absolute' }}>
        <Image source={ad.image} style={{ width: 0, height: 0 }} />
      </View>

      <Modal visible={visible} transparent animationType='fade'>
        <View style={styles.overlay}>
          <View style={[styles.adBox, { backgroundColor: ad.background }]}>
            <ImageBackground
              source={ad.image}
              style={styles.bgImage}
              imageStyle={{ opacity: 0.5, borderRadius: 10 }}
              blurRadius={3}
            />
            <View style={styles.veil} />

            {canClaim && (
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>✖️</Text>
              </TouchableOpacity>
            )}

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{ad.title}</Text>
            </View>

            <Text style={styles.adText}>{ad.text}</Text>

            <View style={styles.progressBar}>
              <Animated.View
                style={[styles.progressFill, { width: progressWidth }]}
              />
            </View>

            {canClaim ? (
              <TouchableOpacity
                style={styles.claimButton}
                onPress={handleClaim}
              >
                <Text style={styles.claimText}>🎁 Réclamer ma récompense</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                ⏳ Disponible dans {timeLeft}s
              </Text>
            )}
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  adBox: {
    width: '80%',
    height: '55%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: 10
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  veil: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5
  },
  closeText: { fontSize: 18 },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    lineHeight: 30
  },
  adText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 20
  },
  progressBar: {
    width: '90%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3
  },
  timerText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.85
  },
  claimButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20
  },
  claimText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333'
  }
})
