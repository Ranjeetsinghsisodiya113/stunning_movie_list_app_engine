import React, { Component } from 'react'
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';

// dont change auth page start---
import Splash from '../Provider/Splash'
import { Home } from '../Home';
import { MovieDetails } from '../MovieDetails';

const Stack = createStackNavigator();


const Stacknav = (navigation) => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
       <Stack.Screen name="Home" component={Home} options={{ headerShown: false,gestureEnabled:false }} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ headerShown: false }} />
     
     
     
      {/* for chat end  */}
    </Stack.Navigator>
  );
}
export default Stacknav