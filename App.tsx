/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {ScreenOne, ScreenTwo} from './src';

export type RootStackParamList = {
  ScreenOne: undefined;
  ScreenTwo?: object;
};

const Stack = createStackNavigator<RootStackParamList>();
const options = {
  animationEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
};

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
          screenOptions={{
            animationEnabled: false,
            cardStyle: {backgroundColor: 'transparent'},
          }}
          initialRouteName="ScreenOne">
          <Stack.Screen name="ScreenOne" component={ScreenOne} />
          <Stack.Screen
            name="ScreenTwo"
            component={ScreenTwo}
            options={options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
