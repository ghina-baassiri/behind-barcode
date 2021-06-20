import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { CommonScreenStyles } from '../utilities/Styles';
import { LoginScreenStyles } from '../utilities/Styles';


export default function UploadImage() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      // Camera access permission check
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      // Image gallery access permission check
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if(camera) {
      const data = await camera.takePictureAsync({})
      // console.log(data.uri)
      setImage(data.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={CommonScreenStyles.container}>
      <View style={CommonScreenStyles.cameraContainer}>
      <Camera 
        ref={ref=>setCamera(ref)}
        style={CommonScreenStyles.fixedRatio} 
        type={type}
        ratio={'1:1'}
      />
      </View>
       <TouchableOpacity
        style={LoginScreenStyles.button}
        onPress={() => {
         setType(
           type === Camera.Constants.Type.back
             ? Camera.Constants.Type.front
             : Camera.Constants.Type.back
         );
       }}>
       <Text style={LoginScreenStyles.text_footer}> Flip </Text>
     </TouchableOpacity>  
     <TouchableOpacity onPress={()=> takePicture()} style={{marginVertical:20}}><Text>Capture Photo</Text></TouchableOpacity>
     <TouchableOpacity onPress={()=> pickImage()}><Text>Choose From Gallery</Text></TouchableOpacity>

     {image && <Image source={{uri: image}} style={{flex:1, height:100, width:300}}/>}
    </View>
  );
}
