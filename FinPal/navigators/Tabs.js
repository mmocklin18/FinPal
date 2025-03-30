import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "@/screens/Home";
import Chat from "@/screens/Chat";
import {View, Text, Image} from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={"Card"} component={Home} options={{
          tabBarIcon: ({focused}) => (
              <View>
                  <Image
                      source={require('../assets/creditcard.png')}
                      resizeMode="contain"
                      style={{
                          width: 25,
                          height: 25,
                          tintColor: focused ? '#007bff' : '#748c94'
                      }}
                  />
              </View>
          ),
          headerShown: false
      }}/>
        <Tab.Screen name={"AI"} component={Chat} options={{
            tabBarIcon: ({focused}) => (
                <View>
                    <Image
                        source={require('../assets/headset.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? '#007bff' : '#748c94'
                        }}
                    />
                </View>
            ),
            headerShown: false
        }}/>
    </Tab.Navigator>
  );
}

export default Tabs;