import React, { Component, createRef, useEffect, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

class CameraModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: Camera.Constants.Type.back,
      flashMode: Camera.Constants.FlashMode.off,
      hasCameraPermission: null,
    };
    this.cameraRef = createRef();
  }

  async takePicture() {
    if (this.cameraRef.current) {
      try {
        const { uri } = await this.cameraRef.current.takePictureAsync();
        this.props.onPictureTaken(uri);
        this.props.onClose();
      } catch (e) {
        console.log('Error taking picture:', e);
      }
    }
  }

  async flipCamera() {
    this.setState((prevState) => ({
      cameraType:
        prevState.cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    }));
  }

  async requestCameraPermission() {
    const cameraStatus = await Camera.getCameraPermissionsAsync();
    if (cameraStatus.status === 'undetermined' || cameraStatus.status === 'denied') {
      const newStatus = await Camera.requestCameraPermissionsAsync();
      if (newStatus.status === 'granted') {
        this.setState({ hasCameraPermission: true });
        this.props.setHasCameraPermission(true);
      } else {
        this.setState({ hasCameraPermission: false });
        this.props.setHasCameraPermission(false);
      }
    } else if (cameraStatus.status === 'granted') {
      this.setState({ hasCameraPermission: true });
      this.props.setHasCameraPermission(true);
    } else {
      this.setState({ hasCameraPermission: false });
      this.props.setHasCameraPermission(false);
    }
  }

  async componentDidMount() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('No access to media library');
    }

    if (Platform.OS === 'android') {
      const cameraStatus = await Camera.getCameraPermissionsAsync();
      if (cameraStatus.status === 'undetermined' || cameraStatus.status === 'denied') {
        this.setState({ hasCameraPermission: null });
      } else if (cameraStatus.status === 'granted') {
        this.setState({ hasCameraPermission: true });
      } else {
        this.setState({ hasCameraPermission: false });
      }
    }
  }

  render() {
    if (this.state.hasCameraPermission === null) {
      return (
        <View style={styles.centeredContainer}>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={() => this.requestCameraPermission()}
          >
            <Text style={styles.permissionButtonText}>Request Camera Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (this.state.hasCameraPermission === false) {
      return (
        <View style={styles.centeredContainer}>
          <Text style={styles.permissionInfoText}>
            Go to Settings > App > Permissions and grant camera access.
          </Text>
        </View>
      );
    }

    return (
      <Modal visible={this.props.isVisible} transparent={true} animationType="slide">
        <View style={styles.cameraModal}>
          <Camera style={styles.camera} type={this.state.cameraType} flashMode={this.state.flashMode} ref={this.cameraRef} />
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.onClose}>
              <Image source={require('../assets/cross_button.png')} style={styles.closeButtonImage} />
            </TouchableOpacity>
            <View style={styles.flipButtonContainer}>
            <TouchableOpacity style={styles.flipButton} onPress={() => this.flipCamera()} />
            </View>
            <View style={styles.captureButtonContainer}>
              <TouchableOpacity style={styles.captureButton} onPress={() => this.takePicture()} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionButton: {
    backgroundColor: 'black',
    padding: '5%',
    borderRadius: 10,
  },
  permissionButtonText: {
    color: 'white',
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
});

export default CameraModal;
