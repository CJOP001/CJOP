import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';

const ReportModal = ({ isVisible, onDismiss, onReport,  }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reportOptions = [
    'Inappropriate content',
    'Spam',
    'Harassment',
    'Violent Content',
    'Fake News',
    'Child Safety Concerns',
    'Other',
  ];

  const handleReport = () => {
    // Handle the report action with the selected report reason
    if (selectedReport) {
      onReport(selectedReport);
      setSelectedReport(null);
      onDismiss();
    }
  };

  const windowHeight = Dimensions.get('window').height;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <TouchableWithoutFeedback>
            <View style={{ backgroundColor: 'white', padding: '5%', minHeight: windowHeight * 0.3 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: '3%' }}>
                Select a report reason:
              </Text>
              {reportOptions.map((option, index) => (
                <RadioButton.Item
                  key={index}
                  label={option}
                  status={selectedReport === option ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedReport(option)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '3%',
                  }}
                  labelStyle={{ color: selectedReport === option ? 'red' : 'black' }}
                  color={'red'}
                />
              ))}
              <TouchableOpacity onPress={handleReport} style={{ marginTop: '3%' }}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Report</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReportModal;