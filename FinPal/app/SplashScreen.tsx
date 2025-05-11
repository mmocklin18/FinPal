import React, { useEffect, useRef } from "react";
import {Dimensions, StyleSheet, TouchableOpacity, Animated} from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import titleAnimation from "../assets/animations/intro-final-clean.json";
import { useFonts } from 'expo-font';



export default function SplashScreen() {
    const [fontsLoaded] = useFonts({
        Manrope: require('../assets/fonts/Manrope-VariableFont_wght.ttf'),
    });


    const router = useRouter();

    const { height, width } = Dimensions.get('window');

    //starting values for slide and fade
    const fadeOut = useRef(new Animated.Value(1)).current;
    const exitTranslateX = useRef(new Animated.Value(0)).current;

    //slide and fade on click
    const handleClick = () => {
        Animated.parallel([
            Animated.timing(exitTranslateX, {
              toValue: -width,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(fadeOut, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start(() => {
            router.replace('./Register');
          });
    };

    

    //Text animation values
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;

    //Fade in the Text
    useEffect(() => {
        Animated.sequence([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(subtitleOpacity, {
            toValue: 1,
            duration: 1000,
            delay: 200, 
            useNativeDriver: true,
          }),
        ]).start();
      }, []);      
      

     
    return(
        
    <Animated.View style={[
      StyleSheet.absoluteFill,
      { flex: 1 },
      { 
      transform: [{ translateX: exitTranslateX }],
      opacity: fadeOut,
      },
      ]}
    >
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        onPress={handleClick}
        activeOpacity={1}
      >
        <LottieView
          source={titleAnimation}
          autoPlay
          loop
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />

        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          Welcome to FinPal
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
          Tap to get started
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      overflow: "hidden",
      backgroundColor: 'transparent',
    },
    animation: {
        width: "200%",
        height: "100%",
        transform:[{translateX: -200}],
    },
    title: {
        position: "absolute",
        top: "35%",
        fontSize: 32,
        fontWeight: "700",
        color: "#1a202c",
        textAlign: "center",
        width: "90%",            
        alignSelf: "center", 
        fontFamily: 'Manrope',
      },
      subtitle: {
        position: "absolute",
        top: "43%",
        fontSize: 18,
        color: "#4a5568",
        textAlign: "center",
        width: "90%",
        alignSelf: "center",
        fontFamily: "Manrope",
        marginTop:10
      },
  });