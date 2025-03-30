import { registerRootComponent } from 'expo';

import {NavigationContainer, NavigationIndependentTree} from "@react-navigation/native";
import Tabs from "@/navigators/Tabs";
import React from "react";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
export default function Index() {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Tabs/>
            </NavigationContainer>
        </NavigationIndependentTree>
    );
}