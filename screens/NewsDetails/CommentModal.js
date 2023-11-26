import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';

const CommentModal = ({ isVisible, onDismiss, onSubmit, commentText, setCommentText }) => {
  const handleSendPress = () => {
    onSubmit(commentText);
    setCommentText('');
    onDismiss();
  };

  const handleClosePress = () => {
    setCommentText(''); // Clear the comment state in ArticlesDetails
    onDismiss();
  };

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={onDismiss}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClosePress}>
            <Image source={require('../../assets/cross_button.png')} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Write a Comment</Text>
          <TextInput
            style={styles.commentInput}
            multiline={true}
            placeholder="Type your comment here..."
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
            maxLength={1000}
          />
          <Text style={styles.wordCount}>{`Max: ${1000 - commentText.length} words remaining`}</Text>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  wordCount: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#72E6FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommentModal;