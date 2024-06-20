import {firebase} from '@react-native-firebase/database';

export const uniqueCodeReference = firebase
  .app()
  .database('https://qrcodescanner-28139-default-rtdb.firebaseio.com/')
  .ref('codes');
