
import React, { Component, createRef, useEffect, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator,
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
      processingImage: false,
    };
    this.cameraRef = createRef();
  }

   async takePicture() {
       if (this.cameraRef.current) {
         try {
           this.setState({ processingImage: true }); // Start processing
           const { uri } = await this.cameraRef.current.takePictureAsync();
           this.props.onPictureTaken(uri);
           this.props.onClose();
         } catch (e) {
           console.log('Error taking picture:', e);
         } finally {
           this.setState({ processingImage: false }); // Finish processing
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


  render() {
    return (

      <Modal visible={this.props.isVisible} transparent={true} animationType="slide">
        <View style={styles.cameraModal}>
          <Camera style={styles.camera} type={this.state.cameraType} flashMode={this.state.flashMode} ref={this.cameraRef} />
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.onClose}>
              <Image source={require('../../assets/cross_button.png')} style={styles.closeButtonImage} />
            </TouchableOpacity>
            <View style={styles.flipButtonContainer}>
            <TouchableOpacity style={styles.flipButton} onPress={() => this.flipCamera()} />
            </View>
            <View style={styles.captureButtonContainer}>
              <TouchableOpacity style={styles.captureButton} onPress={() => this.takePicture()} />
            </View>
          </View>
        </View>
      {this.state.processingImage && (
                <View style={styles.overlay}>
                  <ActivityIndicator size="large" color="white" />
                  <Text style={styles.processingText}>Processing Image...</Text>
                </View>
                )}
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