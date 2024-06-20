// src/screens/TakePhoto.tsx
import React, {useState, useRef} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Camera: undefined;
  TakeVideo: undefined;
};

type TakePhotoNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Camera'
>;

export const TakePhoto = () => {
  const [photoCount, setPhotoCount] = useState(0);
  const cameraRef = useRef<Camera>(null);
  const navigation = useNavigation<TakePhotoNavigationProp>();
  const device = useCameraDevice('back');

  const takePicture = async () => {
    if (cameraRef.current && photoCount < 2) {
      const photo = await cameraRef.current.takePhoto();
      console.log(photo.path);
      setPhotoCount(photoCount + 1);
      if (photoCount + 1 >= 2) {
        navigation.navigate('TakeVideo');
      }
    }
  };

  if (device == null)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.captureContainer}>
        <Button title="Take Photo" onPress={takePicture} />
        <Text>{photoCount} / 2 photos taken</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
});
