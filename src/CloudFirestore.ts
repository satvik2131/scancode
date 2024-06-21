import storage from '@react-native-firebase/storage';
import {PhotoFile, VideoFile} from 'react-native-vision-camera';
import database from '@react-native-firebase/database';

export const uploadPhotosAndVideo = async (
  photo1: PhotoFile | undefined,
  photo2: PhotoFile | undefined,
  video: VideoFile | undefined,
  uniqueCode: string,
) => {
  const uniqueCodeRef = database().ref('code').child(uniqueCode);

  if (!photo1 || !photo2 || !video) {
    throw new Error('All files (photo1, photo2, video) must be provided.');
  }

  const uploadFile = async (filePath: string, fileType: 'photo' | 'video') => {
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    const reference = storage().ref().child(`Media/${fileType}/${fileName}`);
    await reference.putFile(filePath);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  };

  try {
    const [photo1Url, photo2Url, videoUrl] = await Promise.all([
      uploadFile(photo1.path, 'photo'),
      uploadFile(photo2.path, 'photo'),
      uploadFile(video.path, 'video'),
    ]);

    console.log('url', photo1Url);

    uniqueCodeRef.set({
      image1: photo1Url,
      image2: photo2Url,
      video: videoUrl,
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    throw new Error('Error uploading files');
  }
};
