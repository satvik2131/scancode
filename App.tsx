import React, {createContext, useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QRScanner} from './src/components/QRScanner';
import {UniqueCodeProvider} from './src/Global/UniqueCodeContext';

// const [code, setCode] = useState<string>('');

// export const UniqueCodeContext = createContext({
//   code: code,
//   setCode: setCode,
// });

function App(): React.JSX.Element {
  //   const isDarkMode = useColorScheme() === 'dark';

  //   const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   };
  // <SafeAreaView style={backgroundStyle}></SafeAreaView>;

  const Stack = createNativeStackNavigator();

  return (
    <UniqueCodeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="QRScanner"
            component={QRScanner}
            options={{title: 'QR'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UniqueCodeProvider>
  );
}

export default App;
