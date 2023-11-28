// ArticleModal.js

import React from 'react';
import { View, Button } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

const ArticleModal = ({ isVisible, onReadMorePress, onHideModal }) => {
  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={onHideModal}>
        <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
          <Button onPress={onReadMorePress} title="Read" />
          {/* Add any other content you want in the modal */}
          <Button onPress={onHideModal} title="Close" />
        </View>
      </Modal>
    </Portal>
  );
};

export default ArticleModal;
