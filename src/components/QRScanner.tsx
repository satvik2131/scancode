import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, ToastAndroid} from 'react-native';
import {
  Camera,
  CodeScanner,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useUniqueCode} from '../Global/UniqueCodeContext';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import database from '@react-native-firebase/database';

interface QrScreenNavigationProps {
  navigation: StackNavigationProp<RootStackParamList, 'QrScanner'>;
}

export const QrScanner = ({navigation}: QrScreenNavigationProps) => {
  const device = useCameraDevice('back');
  const {setUniqueCode} = useUniqueCode();
  const [move, setMove] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const uniqueCodeRef = database().ref('code');

  useEffect(() => {
    if (move) {
      navigation.navigate('MediaCapture');
    }
  }, [move]);

  const codeScanner: CodeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    onCodeScanned: async codes => {
      setUniqueCode(codes[0].value!!);

      const uniqueCode = await uniqueCodeRef
        .child(codes[0].value!!)
        .once('value');

      // setShowError(true);
      if (uniqueCode.exists()) {
        Alert.alert('Code already exist');
      } else {
        setIsActive(false);
        setMove(true);
      }
    },
  });

  if (device == null) return <Text>Loading...</Text>;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      codeScanner={codeScanner}
      isActive={isActive}
    />
  );
};
