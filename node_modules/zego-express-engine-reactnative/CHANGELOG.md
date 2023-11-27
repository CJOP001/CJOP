# Change Log

## 3.2.0

### Enhancements

1. Customized signaling configuration support extended to 4KB

Note: The default size of customized signaling configuration is 1KB. If you need to expand to 4KB, please contact ZEGO technical support for processing.

### Bug Fixes

1. Fixed the problem of access null pointer crash when the hardware is restarted after decoding failure.

2. Fixed the problem that calling the [setDummyCaptureimagePath] setting to turn off the camera to push still pictures is invalid due to the incorrect width and height of the read image.

3. Fixed the crash caused by accessing non-existent APIs after iOS 14 starts the engine.

4. Fixed network time module retry failure.

## 3.1.2

### Bug Fixes

1. Adapt code standardization interface changes

## 3.1.1

### Bug Fixes

1. Add missing setPlayerView method in media player class.

## 3.1.0

### Code Specification Changes

1. Change the value in the [ZegoOrientation] enumeration to capitalize the first letter

### new features

### 1. Added screen sharing function
    
iOS screen sharing is divided into in-app sharing and cross-app sharing, which are used for current app sharing and system-level app sharing respectively. If you use cross-app sharing, you need to create a new Broadcast Upload Extension process in the iOS native project to record the screen.

For related APIs, please refer to startScreenCaptureInApp, startScreenCapture, stopScreenCapture, updateScreenCapture

### 2. Add network quality callback

Added the callback of uplink and downlink network quality for local and remote users [onNetworkQuality]. By default, the network status of the local and each fetched remote user is called back every two seconds (including unknown, excellent, good, medium, poor, network disconnection). This function can be used when developers want to analyze the network conditions on the link, or want to know the network conditions of local and remote users.

For related APIs, please refer to onNetworkQuality

### 3. Optimize NTP time

When calling the [getNetworkTimeInfo] interface to obtain synchronous network time information, the SDK will regularly update the NTP time to reduce the obtained NTP time error.

For related APIs, please refer to getNetworkTimeInfo

### 4. When directly pushing the CDN, without changing the streaming method, the SDK pulls the stream from the customer’s CDN source site, distributes the audio and video content to the audience through L3, and controls the source site resources through [ZegoStreamResourceMode]. This function is often used in live broadcast scenarios

For related APIs, please refer to startPlayingStream

## 3.0.3

### Bug Fixes

1. Fixed the possible crash of hardware decoding on iOS platforms.

## 3.0.1

### Deleted

### 1. The deviceError event callback has been removed

Device exception notification. This function is deprecated in version 0.22.0 and above, please use localDeviceExceptionOccurred instead.

For related API, please refer to localDeviceExceptionOccurred.

### Bug fix

1. Fix the sdk callback cannot be triggered after hot update.

## 0.22.1

### Bug fix

1. Fix the problem that the SDK dependency config

## 0.22.0

### new feature

### 1. Add stream extra message

Use this function to set the extra info of the stream. The stream extra information is an extra information identifier of the stream ID. Unlike the stream ID, which cannot be modified during the publishing process, the stream extra information can be modified midway through the stream corresponding to the stream ID. Developers can synchronize variable content related to stream IDs based on stream additional information.

For related API, please refer to setStreamExtraInfo, roomStreamExtraInfoUpdate

### 2. Added the ability to take snapshots of the publishing stream or the playing stream

It supports taking snapshots of the screen during publishing or playing stream, which can be used for scenes such as pornographic identification.

For related API, please refer to takePublishStreamSnapshot, takePlayStreamSnapshot

## 0.21.0

### new feature

### 1. Optimized the basic beauty function

ZEGO provides a new basic beauty function, showing users a good skin condition and creating a natural beauty effect. Developers need to call the [startEffectsEnv] interface to initialize the beauty environment before pushing the stream, and then call the [enableEffectsBeauty] interface to enable the beauty function. Through the [setEffectsBeautyParam] interface, you can adjust the degree of whitening, smoothing, sharpening, and ruddy as needed to achieve basic beauty capabilities.

This function is often used in video calls, live broadcasts and other scenarios.

For related API, please refer to startEffectsEnv, stopEffectsEnv, enableEffectsBeauty, setEffectsBeautyParam

### 2. Added support for more voice changer effects

Added multiple voice changer effects - Foreigner, Optimus Prime, Robot, and Ethereal, etc. - to easily create unique sound effects and make users' voices more interesting. Create a quirky atmosphere between friends' voices in voice scenes to enhance entertainment.

For related API, please refer to setVoiceChangerPreset

### 3. Added several new features for audio preprocessing, including Voice Changing and Reverberation

Developers can build related audio preprocessing effects into their apps.

For related API, please refer to setVoiceChangerParam, setReverbAdvancedParam

### 4. Add sound equalizer (EQ) function

Support to adjust the gain value of 10 frequency bands, so as to achieve the purpose of adjusting the tone.

For related API, please refer to setAudioEqualizerGain

### 5. Added advanced reverb parameters and preset values for reverb/voice change

Advanced reverberation parameters can be used to adjust finer reverberation effects as needed. In the original preset reverberation, effects such as studio, KTV, rock and concert have been added, and magnetic male and female voices have been added to the preset voice change. Fresh female voice effect, increase the interest of real-time voice, can adapt to more scenes.

For related API, please refer to setReverbAdvancedParam, setReverbPreset, setVoiceChangerPreset

### 6. Added electronic sound effects

Electronic sound effect refers to the sound that allows people to talk and sing, and after processing, it has the effect of electric sound. This function is often used in KTV and language chat room scenes.

Before [createEngine] initializes the SDK, call the [setElectronicEffects] interface to turn on the electronic sound effects, and set different modes of electronic tones and the corresponding starting pitches as needed. When this interface is not called, the electronic sound effects are turned off by default.

Developers can also preset common electronic sound effects through the [setVoiceChangerPreset] interface. Currently, it supports preset C major electronic sound effects, A minor electronic sound effects, and harmony minor electronic sound effects.

For related API, please refer to setElectronicEffects

## 0.20.1

### Bug fix

1. Fix the problem that the high version of reactnative cannot be compiled.

2. Fix custom audio io parameter error.

## 0.20.0

### new feature

### 1. Added [setAudioRouteToSpeaker] interface for setting audio routing to speakers

Via [setAudioRouteToSpeaker], you can set the audio route to the speaker. When you choose not to use the built-in speaker to play the sound, that is, when it is set to "false", the SDK will select the audio output device with the highest current priority to play the sound according to the system schedule.

For related API, please refer to setAudioRouteToSpeaker

### 2. Added get current audio route type

Via [getAudioRouteType], you can get the routing type of the current audio.

For related API, please refer to getAudioRouteType

### 3. Added audio route changed notification callback

This callback will be called when there are changes in audio routing such as earphone plugging, speaker and receiver switching, etc.

For related API, please refer to onAudioRouteChange

## 0.19.0

### new features

### 1. Added support for H.265 codec

The H.265 codec complete solution is launched, which is suitable for single-anchor live broadcast and multi-person interactive live broadcast scenarios. Developers can output H.265 format video streams during encoding or mixing. H.265 saves 30% of traffic compared to H.264 under the same image quality. Before using this function, you need to contact ZEGO technical support to activate it.

For related API, please refer to isVideoEncoderSupported, isVideoDecoderSupported, enableH265EncodeFallback, onPublisherVideoEncoderChanged

## 0.18.1

### Bug fix

Fix the view parameter of startPreview/startPlayingStream function is optional

## 0.18.0

### new features

### 1. Added room additional message function

This function can set an additional message per room, which follows the life cycle of the entire room, and each user who logs in to the room is able to synchronize the message. Developers can use it to implement various business logic, such as room announcements, etc. Currently, only one key-value pair is allowed to be set in the room additional message, and the maximum length of the key is 10 bytes, and the maximum length of the value is 100 bytes.

For related APIs, please refer to setRoomExtraInfo, roomExtraInfoUpdate

### 2. Added the [setAllPlayStreamVolume] interface to set the volume of all streaming sounds

The local user can control the playback volume of all audio streams.

For related APIs, please refer to setAllPlayStreamVolume

### 3. The pull end provides the function of closing all audio or video

This function can be used when the audio or video streams of all remote users need to be closed at one time when pulling streams.

For related APIs, please refer to muteAllPlayStreamAudio, muteAllPlayStreamVideo

### 4. Added network speed measurement function

This function supports uplink/downlink network speed measurement, which can be used to detect whether the network environment is suitable for pushing/pulling the stream of the specified bit rate. Call the [startNetworkSpeedTest] interface to enable this function, configure the "ZegoNetworkSpeedTestConfig" parameter to control the speed measurement process, and the speed measurement result will be notified through the [onNetworkSpeedTestQualityUpdate] callback.

For related APIs, please refer to startNetworkSpeedTest, stopNetworkSpeedTest, networkSpeedTestQualityUpdate, networkSpeedTestError

### 5. Added room state change notification [roomStateChanged]

When the connection state of the room changes, the [roomStateChanged] callback will be triggered, and the "ZegoRoomStateChangedReason" parameter will provide more detailed connection state and the reason for the state change.

For related APIs, please refer to roomStateChanged

### 6. Added local preview first frame rendering callback

This callback will be received after the first frame of video data is rendered.

For related API, please refer to publisherRenderVideoFirstFrame

### 7. Supports monitoring the address and protocol-related information of the push stream

After the push stream is initiated, you can monitor the push stream status in real time through the [publisherStreamEvent] callback, which will return the current push stream address, resource type, and protocol-related information.

For related API, please refer to publisherStreamEvent

### 8. Added [apiCalledResult] callback notification for receiving the callback of the execution result

Get the detailed information of the execution result of the ZEGO SDK method through the [apiCalledResult] callback.

For related APIs, please refer to apiCalledResult

### 9. Add CDN live broadcast function, and this function supports push-pull streaming using QUIC protocol

Retweet CDN: Retweet CDN refers to the process of pushing audio and video streams from ZEGO audio and video cloud to ZEGO's own CDN or third-party CDN.

Direct push CDN: Developers can directly push audio and video streams to CDN by specifying the URL of a specific CDN (or using ZEGO backend configuration), which needs to be set before pushing.

QUIC protocol push-pull streaming: It is mainly used to improve the unstable quality of CDN live streaming in weak network environment, but the improvement is limited. It is recommended to use low-latency live streaming to enjoy high-quality and low-latency live streaming services. Currently, QUIC protocol push and pull streaming using Tencent and Wangsu's two CDN live streaming products are supported.

The push protocol and QUIC version are configured through the "ZegoCDNConfig" parameter in the [enablePublishDirectToCDN] interface. If you want to perform a custom CDN streaming of the QUIC protocol, you need to configure the pull protocol and QUIC version through the "ZegoPlayerConfig" parameter in [startPlayingStream].

For related APIs, please refer to addPublishCdnUrl, removePublishCdnUrl, enablePublishDirectToCDN

### 10. Added [setPlayStreamVideoType] interface to set the video stream type to play

When the pusher sets the "codecID" to "SVC" through [setVideoConfig] (it can be set before and after the puller), the puller can dynamically set and select different stream types (the small resolution is the half of the standard layer) one). When the network is weak or the rendered UI form is small, you can choose to use the low-resolution video to save bandwidth.

For related APIs, please refer to setPlayStreamVideoType

### Bug fix

Fixed an issue where the Express React Native SDK lifecycle was inconsistent with the Native SDK

## 0.17.3

- Fix the problem that reactnative life cycle is different from sdk.

## 0.17.2

- Adapt to gradle7.0 on the Android platform.

## 0.17.1

- Fixed the problem of log file collection during log reporting.
- Fixed echo cancellation issues on some phones.

## 0.17.0

- Remove test environment and use createEngineWithProfile instead.
- Use token authentication to login room.

## 0.16.3

- Fix the problem of layout type conversion in start mixer task

## 0.16.2

- Fix the problem of lack of streamID when call setPlayVolume

## 0.16.1

- Fix the problem of lack of streamID when call setPlayVolume

## 0.16.0

- Add multi-room feature.
- Add switch room function.

## 0.15.0

- Add the speed playback feature of the player.
- Add the sei feature of the stream.
- Update native sdk(2.12.0)

## 0.14.0

- Add experimental api
- Update native sdk(2.10.0)

## 0.13.0

- Add Audio effect player.
- Update native sdk(2.8.0)

## 0.12.0

- Update native sdk(2.4.0)

## 0.11.0

- add Stream Mixer module.
- add set/get audio tracks of MediaPlayer API.
- add `enableHeadphoneMonitor`
- update native sdk(2.2.0).

## 0.10.0

- add IM module.
- update native sdk(2.1.0).

## 0.9.3

- fix: android createEngine appID exceeds 32 bit error.
- update native sdk(1.19.0)

## 0.9.2

- fix: fix callback name from upper to lower.
- fix: export defines.

## 0.9.1

- Add useful comments

## 0.9.0

- Initial release, with native SDK dependency version 1.14.0
