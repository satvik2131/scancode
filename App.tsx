import 'react-native-gesture-handler';
import React, {createContext, useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QrScanner} from './src/components/QrScanner';
import {UniqueCodeProvider} from './src/Global/UniqueCodeContext';
import {MediaCapture} from './src/components/MediaCapture';

export type RootStackParamList = {
  QrScanner: undefined;
  MediaCapture: undefined;
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
        <Stack.Navigator initialRouteName="MediaCapture">
          <Stack.Screen
            name="QrScanner"
            component={QrScanner}
            options={{title: 'QR'}}
          />
          <Stack.Screen
            name="MediaCapture"
            options={{title: 'take 2 photos'}}
            component={MediaCapture}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UniqueCodeProvider>
  );
}

export default App;
