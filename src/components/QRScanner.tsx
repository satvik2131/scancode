import React, {useContext, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  Camera,
  CodeScanner,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useUniqueCode} from '../Global/UniqueCodeContext';

export function QRScanner() {
  const device = useCameraDevice('back');
  const {setUniqueCode} = useUniqueCode();

  const codeScanner: CodeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      setUniqueCode(codes[0].value!!);
    },
  });

  if (device == null) return <Text>Loading...</Text>;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      codeScanner={codeScanner}
      isActive={true}
    />
  );
}
