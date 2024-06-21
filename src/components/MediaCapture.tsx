import React, {useState, useRef, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Alert} from 'react-native';
import {Camera, PhotoFile, useCameraDevice} from 'react-native-vision-camera';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {uploadPhotosAndVideo} from '../CloudFirestore';
import {useUniqueCode} from '../Global/UniqueCodeContext';

type RootStackParamList = {
  Camera: undefined;
  TakeVideo: undefined;
};

type MediaCaptureNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Camera'
>;

export const MediaCapture = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);

  const cameraRef = useRef<Camera>(null);
  const [photo1, setPhoto1] = useState<PhotoFile>();
  const [photo2, setPhoto2] = useState<PhotoFile>();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const device = useCameraDevice('back');
  const [captureType, setCaptureType] = useState('Take Photo');
  const {uniqueCode} = useUniqueCode();

  //Requesting camera permissions
  useEffect(() => {
    const requestPermissions = async () => {
      const cameraStatus = await Camera.requestCameraPermission();
      const micStatus = await Camera.requestMicrophonePermission();
      setHasPermission(cameraStatus === 'granted' && micStatus === 'granted');
    };

    requestPermissions();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && photoCount < 2) {
      try {
        const photo = await cameraRef.current.takePhoto();
        setPhotoCount(photoCount + 1);

        photoCount + 1 === 1 ? setPhoto1(photo) : setPhoto2(photo);
        if (photoCount + 1 >= 2) {
          setCaptureType('Take Video');
        }
      } catch (error) {
        Alert.alert('Error taking photo');
      }
    }
  };

  const takeVideo = async () => {
    if (cameraRef.current && !isRecording) {
      setIsRecording(true);
      setCaptureType('Stop Recording');
      try {
        cameraRef.current.startRecording({
          onRecordingFinished: video => {
            console.log(video.path);
            Alert.alert('Video recorded', 'Recording finished successfully.');
            uploadPhotosAndVideo(photo1, photo2, video, uniqueCode!!);
          },
          onRecordingError: error => {
            console.error('err:', error);
            setIsRecording(false);
            Alert.alert('Error recording video', error.message);
          },
        });

        setTimeout(async () => {
          await stopRecording();
        }, 10000);
      } catch (error) {
        setIsRecording(false);
        Alert.alert('Error recording video');
      }
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      await cameraRef.current?.stopRecording();
      setCaptureType('Done');
      setIsRecording(false);
    }
  };

  if (device == null || !hasPermission)
    return (
      <View style={styles.loadingContainer}>
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
        video={true}
        audio={true}
      />
      <View style={styles.captureContainer}>
        <Button
          title={captureType}
          onPress={() => {
            if (captureType === 'Take Photo') {
              return takePicture();
            } else if (captureType === 'Stop Recording') {
              return stopRecording();
            } else return takeVideo();
          }}
          disabled={captureType === 'Done' ? true : false}
        />
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
    justifyContent: 'space-between',
    margin: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
