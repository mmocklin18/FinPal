import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const label = route.name === 'index' ? 'Home' : route.name;
        let icon;

        //Assign unique icons to tabs
        if (route.name === 'Dashboard') {
          icon = require('../assets/creditcard.png');
        } else if (route.name === 'Chat') {
          icon = require('../assets/headset.png');
        }

        return {
          headerShown: false,
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
        };
      }}
    />
  );
}
