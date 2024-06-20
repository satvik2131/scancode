import 'react-native-gesture-handler';
import React, {createContext, useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QrScanner} from './src/components/QrScanner';
import {UniqueCodeProvider} from './src/Global/UniqueCodeContext';
import {TakePhoto} from './src/components/TakePhoto';

export type RootStackParamList = {
  QrScanner: undefined;
  TakePhoto: undefined;
};

function App(): React.JSX.Element {
  //   const isDarkMode = useColorScheme() === 'dark';

  //   const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   };
  // <SafeAreaView style={backgroundStyle}></SafeAreaView>;

  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <UniqueCodeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TakePhoto">
          <Stack.Screen
            name="QrScanner"
            component={QrScanner}
            options={{title: 'QR'}}
          />
          <Stack.Screen
            name="TakePhoto"
            options={{title: 'take 2 photos'}}
            component={TakePhoto}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UniqueCodeProvider>
  );
}

export default App;
