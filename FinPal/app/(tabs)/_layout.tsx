import { Tabs } from 'expo-router';
import { Image, Text, View, StyleSheet } from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Manrope: require('../../assets/fonts/Manrope-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#7392b7', '#e5e7eb']}
      style={{ flex: 1 }} 
    >
      <SafeAreaProvider>
        <Tabs>
          <Tabs.Screen
            name="Dashboard"
            options={{
              sceneStyle: {
                backgroundColor: 'transparent', 
              },
              headerShown: true,
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../../assets/creditcard.png')}
                  style={{
                    width: 20,
                    height: 25,
                    tintColor: focused ? '#007bff' : '#748c94',
                  }}
                />
              ),
              headerRight: () => <LogoutButton />,
            }}
          />
          <Tabs.Screen
            name="Chat"
            options={{
              sceneStyle: {
                backgroundColor: 'transparent',
              },
              headerShown: true,
              tabBarLabel: 'Chat',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../../assets/headset.png')}
                  style={{
                    width: 20,
                    height: 25,
                    tintColor: focused ? '#007bff' : '#748c94',
                  }}
                />
              ),
              headerRight: () => <LogoutButton />,
            }}
          />
        </Tabs>
      </SafeAreaProvider>
    </LinearGradient>
  );
}
