import React, { useRef, useEffect, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { Camera, requestPermissions, useCameraDevices } from 'react-native-vision-camera';

function CameraModal(props) {
  const [processingImage, setProcessingImage] = useState(false);
  const cameraRef = useRef();
  const cameraDevices = useCameraDevices();
  const [cameraDevice, setCameraDevice] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
   const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app requires camera permission to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Camera permission granted
          if (cameraDevices.length > 0) {
            setCameraDevice(cameraDevices[0]); // Use the first available camera device
          }
        } else {
          Alert.alert(
            'Camera Permission Required',
            'Please grant camera permission to use this feature.',
            [{ text: 'OK', onPress: props.onClose }]
          );
        }
      } else {
        // Handle permissions for iOS or other platforms if needed
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setProcessingImage(true);
        const image = await cameraRef.current.takePhoto();
        console.log('Picture taken:', image);
        props.onPictureTaken(image);
        props.onClose();
      } catch (e) {
        console.log('Error taking picture:', e);
      } finally {
        setProcessingImage(false);
      }
    }
  };

  const flipCamera = () => {
    setIsFrontCamera((prev) => !prev); // Toggle between front and back cameras
    setCameraDevice(null); // Reset the camera device to trigger a refresh

    // Delay setting the new camera device to ensure the reset is effective
    setTimeout(() => {
      if (cameraDevices.length > 0) {
        setCameraDevice(cameraDevices[isFrontCamera ? 1 : 0]); // Use the other available camera device
      }
    }, 200);
  };

  const handleCameraError = (error) => {
    console.error('Camera session creation error:', error);

  };

  if (!cameraDevice) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.permissionInfoText}>Camera device is not available.</Text>
      </View>
    );
  }

  return (
    <Modal visible={props.isVisible} transparent={true} animationType="slide">
      <View style={styles.cameraModal}>
        <Camera
          style={styles.camera}
          ref={cameraRef}
          isActive={props.isVisible}
          device={cameraDevice}
          photo={true} // Enable photo capture
          onError={handleCameraError} // Handle camera session creation error
        />
        <View style={styles.cameraControls}>
          <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
            <Image source={require('../../assets/cross_button.png')} style={styles.closeButtonImage} />
          </TouchableOpacity>
          <View style={styles.flipButtonContainer}>
            <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
            <Image source={require('../../assets/camflip_icon.png')} style={styles.closeButtonImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {processingImage && (
        <View style={styles.overlay}>
          <Text style={styles.processingText}>Processing Image...</Text>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionInfoText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 23,
  },
  cameraModal: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: StatusBar.currentHeight,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2%',
  },
  flipButtonContainer: {
    flex: 1,
    alignItems: 'right',
    justifyContent: 'flex-end',
  },
  flipButton: {
    backgroundColor: 'white',
    width: '30%',
    aspectRatio: 1,
    marginLeft: '160%',
    borderRadius: 50,
  },
  captureButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  captureButton: {
    backgroundColor: 'white',
    width: '30%',
    aspectRatio: 1,
    marginRight: '130%',
    borderRadius: 50,
  },
  closeButton: {
    justifyContent: 'center',
  },
  closeButtonImage: {
    width: '10%',
    aspectRatio: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  processingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});

export default CameraModal;