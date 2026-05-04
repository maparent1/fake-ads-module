# fake-ads-module

> **Module pédagogique – Fausses publicités pour React Native**

---

## Avertissement

Ce module est un **faux module publicitaire** créé dans un cadre **strictement pédagogique** dans le cadre d'un cours de programmation mobile.

Les publicités affichées sont **entièrement fictives** et ont été conçues pour simuler le comportement de vraies solutions publicitaires mobiles.

---

## Objectif pédagogique

Ce module permet aux étudiants de :

- Comprendre comment fonctionnent les différents formats publicitaires dans une application mobile
- Intégrer des composants tiers via npm et GitHub
- Simuler des interactions réelles (bannière, interstitiel, rewarded) sans dépendre d'un vrai réseau publicitaire
- Apprendre les bonnes pratiques de monétisation mobile

---

## Installation

```bash
npm install git+https://github.com/maparent1/fake-ads-module.git
```

---

## Composants disponibles

### 1. `BannerAd` – Bannière publicitaire

Affiche une bannière en bas ou en haut de l'écran. La pub est choisie **aléatoirement** à chaque ouverture de l'app.

```jsx
import { BannerAd } from 'fake-ads-module';

<BannerAd size="BANNER" />
```

**Tailles disponibles :**

| size | Dimensions |
|------|-----------|
| `BANNER` | 50px de hauteur, 100% de largeur |
| `LARGE_BANNER` | 100px de hauteur, 100% de largeur |
| `MEDIUM_RECTANGLE` | 250 x 300px |

---

### 2. `InterstitialAd` – Publicité plein écran

S'affiche par-dessus le contenu. Les pubs alternent à chaque fermeture.

```jsx
import { InterstitialAd } from 'fake-ads-module';

<InterstitialAd
  visible={isVisible}
  onClose={() => setIsVisible(false)}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Affiche ou cache le modal |
| `onClose` | `function` | Appelée au clic sur ✖️ |

---

### 3. `RewardedAd` – Publicité récompensée

L'utilisateur doit regarder la pub pendant **10 secondes** avant de pouvoir réclamer sa récompense. Le bouton ✖️ est bloqué pendant ce délai.

```jsx
import { RewardedAd } from 'fake-ads-module';

<RewardedAd
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  onReward={() => console.log('Récompense débloquée !')}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Affiche ou cache le modal |
| `onClose` | `function` | Appelée à la fermeture |
| `onReward` | `function` | Appelée quand la récompense est réclamée |

---

## Images

Les images utilisées dans les publicités sont hébergées sur GitHub et chargées via URL publique. Elles font partie intégrante du module et ne peuvent pas être modifiées par l'utilisateur.

