import ImagePicker from 'react-native-image-crop-picker';

export function pickSingleFromGallery() {
  return ImagePicker.openPicker({
    width: 280,
    height: 280,
    cropping: true,
    includeBase64: true,
    includeExif: true,
    cropperCircleOverlay: true,
    mediaType: 'photo',
  })
    .then(img => {
      console.log('received base64 image');
      return {
        uri: `data:${img.mime};base64,` + img.data,
        width: img.width,
        height: img.height,
      };
    })
    .catch(e => console.log(e));
}

export function pickSingleWithCamera() {
  return ImagePicker.openCamera({
    cropping: true,
    width: 280,
    height: 280,
    includeBase64: true,
    useFrontCamera: true,
    includeExif: true,
    cropperCircleOverlay: true,
    mediaType: 'photo',
  })
    .then(img => {
      console.log('received image', img);
      return {
        uri: `data:${img.mime};base64,` + img.data,
        width: img.width,
        height: img.height,
      };
    })
    .catch(e => console.log(e));
}

export function pickPlaceFromCamera() {
  return ImagePicker.openCamera({
    cropping: true,
    width: 1000,
    height: 1000,
    includeBase64: true,
    useFrontCamera: true,
    includeExif: true,
    mediaType: 'photo',
  })
    .then(img => {
      console.log('received image', img);
      return {
        uri: `data:${img.mime};base64,` + img.data,
        width: img.width,
        height: img.height,
      };
    })
    .catch(e => console.log(e));
}

export function pickPlaceFromGallery() {
  return ImagePicker.openPicker({
    width: 1000,
    height: 1000,
    cropping: true,
    includeBase64: true,
    includeExif: true,
    mediaType: 'photo',
  })
    .then(img => {
      console.log('received base64 image');
      return {
        uri: `data:${img.mime};base64,` + img.data,
        width: img.width,
        height: img.height,
      };
    })
    .catch(e => console.log(e));
}
