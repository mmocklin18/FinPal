import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Card() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'black']}
        style={styles.background}>
        <Pressable style={styles.card}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.cardContent}>
            <View style={[styles.cardMask, { width: 48 }]} />
            <View style={[styles.cardMask, { width: 48 }]} />
            <View style={[styles.cardMask, { width: 48 }]} />
            <Text style={styles.cardText}>6538</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={[styles.cardMask, { width: 36 }]} />
            <Text style={[styles.cardText, { marginRight: 8 }]}>/</Text>
            <View style={[styles.cardMask, { width: 36 }]} />
          </View>
        </Pressable>
      </LinearGradient>

      <LinearGradient
        colors={['rgba(32,32,32,0.7)', '#333']}
        style={styles.background}>
        <Pressable style={[styles.card, { paddingHorizontal: 0 }]}>
          <LinearGradient
            colors={['#000', '#111', '#333', '#000']}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.4, 0.75, 1]}
            style={styles.magneticBar}
          />
          <View style={styles.layout}>
            <View style={styles.cardHolder}>
              <Text style={[styles.cardText, { marginBottom: 8 }]}>
                Card holder
              </Text>
              <View style={[styles.cardMask, { width: 120 }]} />
            </View>
            <View style={styles.cardContent}>
              <Text
                style={[
                  styles.cardText,
                  { marginLeft: 'auto', marginRight: 10 },
                ]}>
                CCV2
              </Text>
              <View style={[styles.cardMask, { width: 36 }]} />
            </View>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    height: 200,
    marginBottom: Platform.select({
      native: 24,
      default: 16,
    }),
  },
  card: {
    padding: 32,
    height: 200,
  },
  background: {
    borderRadius: 8,
  },
  cardText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  cardMask: {
    backgroundColor: '#888',
    borderRadius: 4,
    opacity: 0.5,
    height: 20,
    marginRight: 8,
  },
  logo: { width: 36, height: 32, marginBottom: 24 },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Platform.select({
      native: 48,
      default: 16,
    }),
    paddingRight: 12,
  },
  cardHolder: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'start',
  },
  magneticBar: {
    height: 48,
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 12,
  },
});
