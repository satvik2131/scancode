import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {PhotoFile, VideoFile} from 'react-native-vision-camera';

export const uploadPhotosAndVideo = async (
  photo1: PhotoFile | undefined,
  photo2: PhotoFile | undefined,
  video: VideoFile | undefined,
) => {
  console.log(photo1?.path, photo2?.path, video?.path);

  const reference = storage().ref('Media/');
  //   const photo1task = await reference.putFile(photo1!!.path);
  //   const photo2task = await reference.putFile(photo2!!.path);
  const videotask = await reference.putFile(video!!.path);
  console.log(
    // photo1task.ref.getDownloadURL(),
    // photo2task.ref.getDownloadURL(),
    videotask.ref.getDownloadURL(),
  );
};
