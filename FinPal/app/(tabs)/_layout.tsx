import { Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import  LogoutButton  from '../../components/LogoutButton';
import { useFonts } from "expo-font";

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
        <Tabs
        screenOptions={({ route }) => {
          const label = route.name === 'index' ? 'Home' : route.name;
          let icon;

          //Assign unique icons to tabs
          if (route.name === 'Dashboard') {
            icon = require('../../assets/creditcard.png');
          } else if (route.name === 'Chat') {
            icon = require('../../assets/headset.png');
          }

          return {
            headerShown: true,
            tabBarLabel: label,
            tabBarIcon: ({ focused }) => (
              <Image
                source={icon}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#007bff' : '#748c94',
                }}
              />
            ),
            headerRight: () => <LogoutButton/>,
          };
        }}
      />
  );
}
