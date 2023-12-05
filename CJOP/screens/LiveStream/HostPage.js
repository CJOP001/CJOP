// HostPage.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
import KeyCenter from '../../KeyCenter';
import { useRoute } from '@react-navigation/native';

export default function HostPage(props) {

    const route = useRoute();
    const {userID, userName, liveID} = route.params
    console.log('UserID:', userID);
    console.log('userName:', userName);
    console.log('liveID:', liveID);

    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltLiveStreaming
                appID={KeyCenter.appID}
                appSign={KeyCenter.appSign}
                userID={userID}
                userName={userName}
                liveID={liveID}

                config={{
                    ...HOST_DEFAULT_CONFIG,
                    onLeaveLiveStreaming: () => { props.navigation.navigate('HomeStack') },
                    confirmDialogInfo: { // Modify your custom configurations here.
                        title: "Leave confirm",
                        message: "Do you want to leave?",
                        cancelButtonName: "Cancel",
                        confirmButtonName: "Confirm"
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    }
});