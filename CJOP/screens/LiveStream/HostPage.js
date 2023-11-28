// HostPage.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
import KeyCenter from '../../KeyCenter';
import { useRoute } from '@react-navigation/native';

export default function HostPage(props) {

    const route = useRoute();
    const {userID, userName, liveID} = route.params

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
                    onLeaveLiveStreaming: () => { props.navigation.navigate('HomePage') }
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