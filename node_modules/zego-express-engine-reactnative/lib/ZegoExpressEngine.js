import { ZegoExpressEngineImpl } from './impl/ZegoExpressEngineImpl';
export default class ZegoExpressEngine {
    /**
     * Engine singleton instance
     */
    static instance() {
        return ZegoExpressEngineImpl.getInstance();
    }
    /**
     * Create ZegoExpressEngine singleton object and initialize SDK.
     *
     * Available since: 2.14.0
     * Description: Create ZegoExpressEngine singleton object and initialize SDK.
     * When to call: The engine needs to be created before calling other functions.
     * Restrictions: None.
     * Caution: The SDK only supports the creation of one instance of ZegoExpressEngine. Multiple calls to this function return the same object.
     *
     * @param profile The basic configuration information is used to create the engine.
     * @return engine singleton instance.
     */
    static createEngineWithProfile(profile) {
        return ZegoExpressEngineImpl.createEngineWithProfile(profile);
    }
    /**
     * Destroy the ZegoExpressEngine singleton object and deinitialize the SDK.
     *
     * Available since: 1.1.0
     * Description: Destroy the ZegoExpressEngine singleton object and deinitialize the SDK.
     * When to call: When the SDK is no longer used, the resources used by the SDK can be released through this interface
     * Restrictions: None.
     * Caution: After using [createEngine] to create a singleton, if the singleton object has not been created or has been destroyed, you will not receive related callbacks when calling this function.
     */
    static destroyEngine() {
        return ZegoExpressEngineImpl.destroyEngine();
    }
    /**
     * Set advanced engine configuration.
     *
     * Available since: 1.1.0
     * Description: Used to enable advanced functions.
     * When to call: Different configurations have different call timing requirements. For details, please consult ZEGO technical support.
     * Restrictions: None.
     *
     * @param config Advanced engine configuration
     */
    static setEngineConfig(config) {
        return ZegoExpressEngineImpl.setEngineConfig(config);
    }
    /**
     * Set room mode.
     *
     * Available since: 2.9.0
     * Description: If you need to use the multi-room feature, please call this function to complete the configuration.
     * When to call: Must be set before calling [createEngine] to take effect, otherwise it will fail.
     * Restrictions: If you need to use the multi-room feature, please contact the instant technical support to configure the server support.
     * Caution: None.
     *
     * @param mode Room mode. Description: Used to set the room mode. Use cases: If you need to enter multiple rooms at the same time for publish-play stream, please turn on the multi-room mode through this interface. Required: True. Default value: ZEGO_ROOM_MODE_SINGLE_ROOM.
     */
    static setRoomMode(mode) {
        return ZegoExpressEngineImpl.setRoomMode(mode);
    }
    /**
     * Gets the SDK's version number.
     *
     * Available since: 1.1.0
     * Description: If you encounter an abnormality during the running of the SDK, you can submit the problem, log and other information to the ZEGO technical staff to locate and troubleshoot. Developers can also collect current SDK version information through this API, which is convenient for App operation statistics and related issues.
     * When to call: Any time.
     * Restrictions: None.
     * Caution: None.
     *
     * @return SDK version.
     */
    static getVersion() {
        return ZegoExpressEngineImpl.getVersion();
    }
    /**
     * Uploads logs to the ZEGO server.
     *
     * Available since: 1.1.0
     * Description: By default, SDK creates and prints log files in the App's default directory. Each log file defaults to a maximum of 5MB. Three log files are written over and over in a circular fashion. When calling this function, SDK will auto package and upload the log files to the ZEGO server.
     * Use cases: Developers can provide a business “feedback” channel in the App. When users feedback problems, they can call this function to upload the local log information of SDK to help locate user problems.
     * When to call: After [createEngine].
     * Restrictions: If you call this interface repeatedly within 10 minutes, only the last call will take effect.
     * Caution: After calling this interface to upload logs, if you call [destroyEngine] or exit the App too quickly, there may be a failure.It is recommended to wait a few seconds, and then call [destroyEngine] or exit the App after receiving the upload success callback.
     */
    uploadLog() {
        return ZegoExpressEngineImpl.getInstance().uploadLog();
    }
    /**
     * Call the experimental API.
     *
     * Available since: 2.7.0
     * Description: ZEGO provides some technical previews or special customization functions in RTC business through this API. If you need to get the use of the function or the details, please consult ZEGO technical support.
     * When to call: After [createEngine].
     *
     * @param params Parameters in the format of a JSON string, please consult ZEGO technical support for details.
     * @return Returns an argument in the format of a JSON string, please consult ZEGO technical support for details.
     */
    callExperimentalAPI(params) {
        return ZegoExpressEngineImpl.getInstance().callExperimentalAPI(params);
    }
    /**
     * Register event handler
     *
     * @param event event type.
     * @param callback event callback.
     */
    on(event, callback) {
        return ZegoExpressEngineImpl.getInstance().on(event, callback);
    }
    /**
     * Unregister event handler
     *
     * @param event event type.
     * @param callback event callback.
     */
    off(event, callback) {
        return ZegoExpressEngineImpl.getInstance().off(event, callback);
    }
    /**
     * Log in to the room by configuring advanced properties, and return the login result through the callback parameter. You must log in to the room before pushing or pulling the stream.
     *
     * Available since: 2.18.0
     * Description: If the room does not exist, [loginRoom] creates and logs in the room. SDK uses the 'room' to organize users. After users log in to a room, they can use interface such as push stream [startPublishingStream], pull stream [startPlayingStream], send and receive broadcast messages [sendBroadcastMessage], etc. To prevent the app from being impersonated by a malicious user, you can add authentication before logging in to the room, that is, the [token] parameter in the ZegoRoomConfig object passed in by the [config] parameter.
     * Use cases: In the same room, users can conduct live broadcast, audio and video calls, etc.
     * When to call /Trigger: This interface is called after [createEngine] initializes the SDK.
     * Restrictions: For restrictions on the use of this function, please refer to https://docs.zegocloud.com/article/7611 or contact ZEGO technical support.
     * Caution:
     *   1. Apps that use different appIDs cannot intercommunication with each other.
     *   2. SDK supports startPlayingStream audio and video streams from different rooms under the same appID, that is, startPlayingStream audio and video streams across rooms. Since ZegoExpressEngine's room related callback notifications are based on the same room, when developers want to startPlayingStream streams across rooms, developers need to maintain related messages and signaling notifications by themselves.
     *   3. It is strongly recommended that userID corresponds to the user ID of the business APP, that is, a userID and a real user are fixed and unique, and should not be passed to the SDK in a random userID. Because the unique and fixed userID allows ZEGO technicians to quickly locate online problems.
     *   4. After the first login failure due to network reasons or the room is disconnected, the default time of SDK reconnection is 20min.
     *   5. After the user has successfully logged in to the room, if the application exits abnormally, after restarting the application, the developer needs to call the logoutRoom interface to log out of the room, and then call the loginRoom interface to log in to the room again.
     * Privacy reminder: Please do not fill in sensitive user information in this interface, including but not limited to mobile phone number, ID number, passport number, real name, etc.
     * Related callbacks:
     *   1. When the user starts to log in to the room, the room is successfully logged in, or the room fails to log in, the [onRoomStateChanged] (Not supported before 2.18.0, please use [onRoomStateUpdate]) callback will be triggered to notify the developer of the status of the current user connected to the room.
     *   2. Different users who log in to the same room can get room related notifications in the same room (eg [onRoomUserUpdate], [onRoomStreamUpdate], etc.), and users in one room cannot receive room signaling notifications in another room.
     *   3. If the network is temporarily interrupted due to network quality reasons, the SDK will automatically reconnect internally. You can get the current connection status of the local room by listening to the [onRoomStateChanged] (Not supported before 2.18.0, please use [onRoomStateUpdate]) callback method, and other users in the same room will receive [onRoomUserUpdate] callback notification.
     *   4. Messages sent in one room (e.g. [setStreamExtraInfo], [sendBroadcastMessage], [sendBarrageMessage], [sendCustomCommand], etc.) cannot be received callback ((eg [onRoomStreamExtraInfoUpdate], [onIMRecvBroadcastMessage], [onIMRecvBarrageMessage], [onIMRecvCustomCommand], etc) in other rooms. Currently, SDK does not provide the ability to send messages across rooms. Developers can integrate the SDK of third-party IM to achieve.
     * Related APIs:
     *   1. Users can call [logoutRoom] to log out. In the case that a user has successfully logged in and has not logged out, if the login interface is called again, the console will report an error and print the error code 1002001.
     *   2. SDK supports multi-room login, please call [setRoomMode] function to select multi-room mode before engine initialization, and then call [loginRoom] to log in to multi-room.
     *   3. Calling [destroyEngine] will also automatically log out.
     *
     * @param roomID Room ID, a string of up to 128 bytes in length.
     *   Caution:
     *   1. room ID is defined by yourself.
     *   2. Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
     *   3. If you need to communicate with the Web SDK, please do not use '%'.
     * @param user User object instance, configure userID, userName. Note that the userID needs to be globally unique with the same appID, otherwise the user who logs in later will kick out the user who logged in first.
     * @param config Advanced room configuration.
     * @return The result of this login room
     */
    loginRoom(roomID, user, config) {
        return ZegoExpressEngineImpl.getInstance().loginRoom(roomID, user, config);
    }
    /**
     * Logs out of a room.
     *
     * Available since: 1.1.0
     * Description: This API will log out the room named roomID.
     * Use cases: In the same room, users can conduct live broadcast, audio and video calls, etc.
     * When to call /Trigger: After successfully logging in to the room, if the room is no longer used, the user can call the function [logoutRoom].
     * Restrictions: None.
     * Caution: 1. Exiting the room will stop all publishing and playing streams for user, and inner audio and video engine will stop, and then SDK will auto stop local preview UI. If you want to keep the preview ability when switching rooms, please use the [switchRoom] method. 2. If the user logs in to the room, but the incoming 'roomID' is different from the logged-in room name, SDK will return failure.
     * Related callbacks: After calling this function, you will receive [onRoomStateChanged] (Not supported before 2.18.0, please use [onRoomStateUpdate]) callback notification successfully exits the room, while other users in the same room will receive the [onRoomUserUpdate] callback notification(On the premise of enabling isUserStatusNotify configuration).
     * Related APIs: Users can use [loginRoom], [switchRoom] functions to log in or switch rooms.
     *
     * @param roomID Room ID, a string of up to 128 bytes in length.
     *   Caution:
     *   1. Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
     *   2. If you need to communicate with the Web SDK, please do not use '%'.
     * @return The result of this logout room
     */
    logoutRoom(roomID) {
        return ZegoExpressEngineImpl.getInstance().logoutRoom(roomID);
    }
    /**
     * Switch the room with advanced room configurations.
     *
     * Available since: 1.15.0
     * Description: Using this interface allows users to quickly switch from one room to another room.
     * Use cases: if you need to quickly switch to the next room, you can call this function.
     * When to call /Trigger: After successfully login room.
     * Restrictions: None.
     * Caution:
     *   1. When this function is called, all streams currently publishing or playing will stop (but the local preview will not stop).
     *   2. To prevent the app from being impersonated by a malicious user, you can add authentication before logging in to the room, that is, the [token] parameter in the ZegoRoomConfig object passed in by the [config] parameter. This parameter configuration affects the room to be switched over. 3. When the function [setRoomMode] is used to set ZegoRoomMode to ZEGO_ROOM_MODE_MULTI_ROOM, this function is not available.
     * Privacy reminder: Please do not fill in sensitive user information in this interface, including but not limited to mobile phone number, ID number, passport number, real name, etc.
     * Related callbacks: When the user call the [switchRoom] function, the [onRoomStateChanged] (Not supported before 2.18.0, please use [onRoomStateUpdate]) callback will be triggered to notify the developer of the status of the current user connected to the room.
     * Related APIs: Users can use the [logoutRoom] function to log out of the room.
     *
     * @param fromRoomID Current roomID.
     * @param toRoomID The next roomID.
     * @param config Advanced room configuration.
     */
    switchRoom(fromRoomID, toRoomID, config) {
        return ZegoExpressEngineImpl.getInstance().switchRoom(fromRoomID, toRoomID, config);
    }
    /**
     * Renew token.
     *
     * Available since: 2.8.0
     * Description: After the developer receives [onRoomTokenWillExpire], they can use this API to update the token to ensure that the subsequent RTC functions are normal.
     * Use cases: Used when the token is about to expire.
     * When to call /Trigger: After the developer receives [onRoomTokenWillExpire].
     * Restrictions: None.
     * Caution: The token contains important information such as the user's room permissions, publish stream permissions, and effective time, please refer to https://docs.zegocloud.com/article/11649.
     * Related callbacks: None.
     * Related APIs: None.
     *
     * @param roomID Room ID.
     * @param token The token that needs to be renew.
     */
    renewToken(roomID, token) {
        return ZegoExpressEngineImpl.getInstance().renewToken(roomID, token);
    }
    /**
     * Set room extra information.
     *
     * Available since: 1.13.0
     * Description: The user can call this function to set the extra info of the room.
     * Use cases: You can set some room-related business attributes, such as whether someone is Co-hosting.
     * When to call /Trigger: After logging in the room successful.
     * Restrictions: For restrictions on the use of this function, please refer to https://docs.zegocloud.com/article/7611 or contact ZEGO technical support.
     * Caution: 'key' is non null. The length of key and value is limited, please refer to Restrictions. The newly set key and value will overwrite the old setting.
     * Related callbacks: Other users in the same room will be notified through the [onRoomExtraInfoUpdate] callback function.
     * Related APIs: None.
     *
     * @param roomID Room ID.
     * @param key key of the extra info.
     * @param value value if the extra info.
     * @return Set room extra info execution result notification
     */
    setRoomExtraInfo(roomID, key, value) {
        return ZegoExpressEngineImpl.getInstance().setRoomExtraInfo(roomID, key, value);
    }
    /**
     * Starts publishing a stream. Support multi-room mode.
     *
     * Available since: 1.1.0
     * Description: Users push their local audio and video streams to the ZEGO RTC server or CDN, and other users in the same room can pull the audio and video streams to watch through the `streamID` or CDN pull stream address.
     * Use cases: It can be used to publish streams in real-time connecting wheat, live broadcast and other scenarios.
     * When to call: After [loginRoom].
     * Restrictions: None.
     * Caution:
     *   1. Before start to publish the stream, the user can choose to call [setVideoConfig] to set the relevant video parameters, and call [startPreview] to preview the video.
     *   2. Other users in the same room can get the streamID by monitoring the [onRoomStreamUpdate] event callback after the local user publishing stream successfully.
     *   3. In the case of poor network quality, user publish may be interrupted, and the SDK will attempt to reconnect. You can learn about the current state and error information of the stream published by monitoring the [onPublisherStateUpdate] event.
     *   4. To call [SetRoomMode] function to select multiple rooms, the room ID must be specified explicitly.
     *
     * @param streamID Stream ID, a string of up to 256 characters.
     *   Caution:
     *   1. Stream ID is defined by you.
     *   2. needs to be globally unique within the entire AppID. If in the same AppID, different users publish each stream and the stream ID is the same, which will cause the user to publish the stream failure. You cannot include URL keywords, otherwise publishing stream and playing stream will fails.
     *   3. Only support numbers, English characters and '-', ' '.
     * @param channel Publish stream channel.
     * @param config Advanced publish configuration.
     */
    startPublishingStream(streamID, channel, config) {
        return ZegoExpressEngineImpl.getInstance().startPublishingStream(streamID, channel, config);
    }
    /**
     * Stops publishing a stream (for the specified channel).
     *
     * Available since: 1.1.0
     * Description: The user stops sending local audio and video streams, and other users in the room will receive a stream deletion notification.
     * Use cases: It can be used to stop publish streams in real-time connecting wheat, live broadcast and other scenarios.
     * When to call: After [startPublishingStream].
     * Restrictions: None.
     * Caution:
     *   1. After stopping the streaming, other users in the same room can receive the delete notification of the stream by listening to the [onRoomStreamUpdate] callback.
     *   2. If the user has initiated publish flow, this function must be called to stop the publish of the current stream before publishing the new stream (new streamID), otherwise the new stream publish will return a failure.
     *   3. After stopping streaming, the developer should stop the local preview based on whether the business situation requires it.
     *
     * @param channel Publish stream channel.
     */
    stopPublishingStream(channel) {
        return ZegoExpressEngineImpl.getInstance().stopPublishingStream(channel);
    }
    /**
     * Sets the extra information of the stream being published for the specified publish channel.
     *
     * Available since: 1.1.0
     * Description: Use this function to set the extra info of the stream. The stream extra information is an extra information identifier of the stream ID. Unlike the stream ID, which cannot be modified during the publishing process, the stream extra information can be modified midway through the stream corresponding to the stream ID. Developers can synchronize variable content related to stream IDs based on stream additional information.
     * When to call: After the engine is created [createEngine], Called before and after [startPublishingStream] can both take effect.
     * Restrictions: None.
     * Related callbacks: Users can obtain the execution result of the function through [ZegoPublisherSetStreamExtraInfoCallback] callback.
     *
     * @param extraInfo Stream extra information, a string of up to 1024 characters.
     * @param channel Publish stream channel.
     * @return Set stream extra information execution result notification.
     */
    setStreamExtraInfo(extraInfo, channel) {
        return ZegoExpressEngineImpl.getInstance().setStreamExtraInfo(extraInfo, channel);
    }
    /**
     * Starts/Updates the local video preview (for the specified channel).
     *
     * Available since: 1.1.0
     * Description: The user can see his own local image by calling this function.
     * Use cases: It can be used for local preview in real-time connecting wheat, live broadcast and other scenarios.
     * When to call: After [createEngine].
     * Restrictions: None.
     * Caution: 1. The preview function does not require you to log in to the room or publish the stream first. But after exiting the room, SDK internally actively stops previewing by default. 2. Local view and preview modes can be updated by calling this function again. The user can only preview on one view. If you call [startPreview] again to pass in a new view, the preview screen will only be displayed in the new view. 3. You can set the mirror mode of the preview by calling the [setVideoMirrorMode] function. The default preview setting is image mirrored. 4. When this function is called, the audio and video engine module inside SDK will start really, and it will start to try to collect audio and video..
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param view The view used to display the preview image. If the view is set to null, no preview will be made.
     * @param channel Publish stream channel
     */
    startPreview(view, channel) {
        return ZegoExpressEngineImpl.getInstance().startPreview(view, channel);
    }
    /**
     * Stops the local preview (for the specified channel).
     *
     * Available since: 1.1.0
     * Description: This function can be called to stop the preview when the preview is not needed locally.
     * Caution: Stopping the preview will not affect the publish stream and playing stream functions.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param channel Publish stream channel
     */
    stopPreview(channel) {
        return ZegoExpressEngineImpl.getInstance().stopPreview(channel);
    }
    /**
     * Sets up the video configurations (for the specified channel).
     *
     * Available since: 1.1.0
     * Description: Set the video frame rate, bit rate, video capture resolution, and video encoding output resolution.
     * Default value: The default video capture resolution is 360p, the video encoding output resolution is 360p, the bit rate is 600 kbps, and the frame rate is 15 fps.
     * When to call: After [createEngine].
     * Restrictions: It is necessary to set the relevant video configuration before publishing the stream or startPreview, and only support the modification of the encoding resolution and the bit rate after publishing the stream.
     * Caution: Developers should note that the wide and high resolution of the mobile end is opposite to the wide and high resolution of the PC. For example, in the case of 360p, the resolution of the mobile end is 360x640, and the resolution of the PC end is 640x360.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param config Video configuration, the SDK provides a common setting combination of resolution, frame rate and bit rate, they also can be customized.
     * @param channel Publish stream channel.
     */
    setVideoConfig(config, channel) {
        return ZegoExpressEngineImpl.getInstance().setVideoConfig(config, channel);
    }
    /**
     * Gets the current video configurations (for the specified channel).
     *
     * This function can be used to get the specified publish channel's current video frame rate, bit rate, video capture resolution, and video encoding output resolution.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param channel Publish stream channel
     * @return Video configuration object
     */
    getVideoConfig(channel) {
        return ZegoExpressEngineImpl.getInstance().getVideoConfig(channel);
    }
    /**
     * Sets the video mirroring mode (for the specified channel).
     *
     * Available since: 1.1.0
     * Description: Set whether the local preview video and the published video have mirror mode enabled. For specific mirroring mode.
     * When to call: After [createEngine].
     * Restrictions: This setting only works if the SDK is responsible for rendering.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param mirrorMode Mirror mode for previewing or publishing the stream.
     * @param channel Publish stream channel.
     */
    setVideoMirrorMode(mirrorMode, channel) {
        return ZegoExpressEngineImpl.getInstance().setVideoMirrorMode(mirrorMode, channel);
    }
    /**
     * Sets the video orientation (for the specified channel).
     *
     * Available since: 1.1.0
     * Description: Set the video orientation.
     * Use cases: When users use mobile devices to conduct live broadcasts or video calls, they can set different video directions according to the scene.
     * When to call: After [createEngine].
     * Restrictions: None.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param orientation Video orientation.
     * @param channel Publish stream channel.
     */
    setAppOrientation(orientation, channel) {
        return ZegoExpressEngineImpl.getInstance().setAppOrientation(orientation, channel);
    }
    /**
     * Sets up the audio configurations for the specified publish channel.
     *
     * Available since: 1.3.4
     * Description: You can set the combined value of the audio codec, bit rate, and audio channel through this function. If the preset value cannot meet the developer's scenario, the developer can set the parameters according to the business requirements.
     * Default value: The default audio config refers to the default value of [ZegoAudioConfig].
     * When to call: After the engine is created [createEngine], and before publishing [startPublishingStream].
     * Restrictions: None.
     * Related APIs: [getAudioConfig].
     *
     * @param config Audio config.
     * @param channel Publish stream channel.
     */
    setAudioConfig(config, channel) {
        return ZegoExpressEngineImpl.getInstance().setAudioConfig(config, channel);
    }
    /**
     * Gets the current audio configurations from the specified publish channel.
     *
     * Available since: 1.8.0
     * Description: You can get the current audio codec, bit rate, and audio channel through this function.
     * When to call: After the engine is created [createEngine].
     * Restrictions: None.
     * Related APIs: [setAudioConfig].
     *
     * @param channel Publish stream channel.
     * @return Audio config.
     */
    getAudioConfig(channel) {
        return ZegoExpressEngineImpl.getInstance().getAudioConfig(channel);
    }
    /**
     * Take a snapshot of the publishing stream for the specified publish channel.
     *
     * Available since: 1.17.0
     * Description: Take a snapshot of the publishing stream.
     * When to call: Called this function after calling [startPublishingStream] or [startPreview].
     * Restrictions: None.
     * Caution: The resolution of the snapshot is the encoding resolution set in [setVideoConfig]. If you need to change it to capture resolution, please call [setCapturePipelineScaleMode] to change the capture pipeline scale mode to [Post].
     * Related callbacks: The screenshot result will be called back through [ZegoPublisherTakeSnapshotCallback].
     * Related APIs: [takePlayStreamSnapshot].
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param channel Publish stream channel.
     * @return Results of take publish stream snapshot.
     */
    takePublishStreamSnapshot(channel) {
        return ZegoExpressEngineImpl.getInstance().takePublishStreamSnapshot(channel);
    }
    /**
     * Stops or resumes sending the audio part of a stream for the specified channel.
     *
     * Available since: 1.1.0
     * Description: This function can be called when publishing the stream to realize not publishing the audio data stream. The SDK still collects and processes the audio, but send muted audio frame packets to the network.
     * When to call: Called after the engine is created [createEngine] can take effect.
     * Restrictions: None.
     * Related callbacks: If you stop sending audio streams, the remote user that play stream of local user publishing stream can receive `Mute` status change notification by monitoring [onRemoteMicStateUpdate] callbacks.
     * Related APIs: [mutePublishStreamVideo].
     *
     * @param mute Whether to stop sending audio streams, true means not to send audio stream, and false means sending audio stream. The default is false.
     * @param channel Publish stream channel.
     */
    mutePublishStreamAudio(mute, channel) {
        return ZegoExpressEngineImpl.getInstance().mutePublishStreamAudio(mute, channel);
    }
    /**
     * Stops or resumes sending the video part of a stream for the specified channel.
     *
     * Available since: 1.1.0
     * Description: This function can be called when publishing the stream to realize not publishing the video stream. The local camera can still work normally, can capture, preview and process video images normally, but does not send the video data to the network.
     * When to call: Called after the engine is created [createEngine] can take effect.
     * Restrictions: None.
     * Related callbacks: If you stop sending video streams locally, the remote user that play stream of local user publishing stream can receive `Mute` status change notification by monitoring [onRemoteCameraStateUpdate] callbacks.
     * Related APIs: [mutePublishStreamAudio].
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param mute Whether to stop sending video streams, true means not to send video stream, and false means sending video stream. The default is false.
     * @param channel Publish stream channel.
     */
    mutePublishStreamVideo(mute, channel) {
        return ZegoExpressEngineImpl.getInstance().mutePublishStreamVideo(mute, channel);
    }
    /**
     * Sets the audio recording volume for stream publishing.
     *
     * Available since: 1.13.0
     * Description: This function is used to perform gain processing based on the device's collected volume. The local user can control the sound level of the audio stream sent to the remote end.
     * Default value: Default is 100.
     * When to call: After creating the engine [createEngine].
     * Restrictions: The capture volume can be dynamically set during publishing.
     * Related APIs: Set the playing stream volume [setPlayVolume].
     *
     * @param volume The volume gain percentage, the range is 0 ~ 200, and the default value is 100, which means 100% of the original collection volume of the device.
     */
    setCaptureVolume(volume) {
        return ZegoExpressEngineImpl.getInstance().setCaptureVolume(volume);
    }
    /**
     * Adds a target CDN URL to which the stream will be relayed from ZEGO RTC server.
     *
     * Available since: 1.1.0
     * Description: Forward audio and video streams from ZEGO RTC servers to custom CDN content distribution networks with high latency but support for high concurrent pull streams.
     * Use cases: 1. It is often used in large-scale live broadcast scenes that do not have particularly high requirements for delay. 2. Since ZEGO RTC server itself can be configured to support CDN(content distribution networks), this function is mainly used by developers who have CDN content distribution services themselves. 3. This function supports dynamic relay to the CDN content distribution network, so developers can use this function as a disaster recovery solution for CDN content distribution services.
     * When to call: After calling the [createEngine] function to create the engine.
     * Restrictions: When the [enablePublishDirectToCDN] function is set to true to publish the stream straight to the CDN, then calling this function will have no effect.
     * Caution: Removing URLs retweeted to CDN requires calling [removePublishCdnUrl], calling [stopPublishingStream] will not remove URLs publish to CDN.
     * Related APIs: Remove URLs that are re-pushed to the CDN [removePublishCdnUrl].
     *
     * @param streamID Stream ID.
     * @param targetURL CDN relay address, supported address format is rtmp, rtmps.
     * @return The execution result of update the relay CDN operation.
     */
    addPublishCdnUrl(streamID, targetURL) {
        return ZegoExpressEngineImpl.getInstance().addPublishCdnUrl(streamID, targetURL);
    }
    /**
     * Deletes the specified CDN URL, which is used for relaying streams from ZEGO RTC server to CDN.
     *
     * Available since: 1.1.0
     * Description: When a CDN forwarding address has been added via [addPublishCdnUrl], this function is called when the stream needs to be stopped.
     * When to call: After calling the [createEngine] function to create the engine, When you don't need to continue publish to the CDN.
     * Restrictions: When the [enablePublishDirectToCDN] function is set to true to publish the stream straight to the CDN, then calling this function will have no effect.
     * Caution: This function does not stop publishing audio and video stream to the ZEGO ZEGO RTC server.
     * Related APIs: Add URLs that are re-pushed to the CDN [addPublishCdnUrl].
     *
     * @param streamID Stream ID.
     * @param targetURL CDN relay address, supported address format rtmp.
     * @return The execution result of update the relay CDN operation.
     */
    removePublishCdnUrl(streamID, targetURL) {
        return ZegoExpressEngineImpl.getInstance().removePublishCdnUrl(streamID, targetURL);
    }
    /**
     * Whether to directly push to CDN (without going through the ZEGO RTC server), for the specified channel.
     *
     * Available since: 1.5.0
     * Description: Whether to publish streams directly from the client to CDN without passing through Zego RTC server.
     * Use cases: It is often used in large-scale live broadcast scenes that do not have particularly high requirements for delay.
     * Default value: The default is false, and direct push is not enabled.
     * When to call: After creating the engine [createEngine], before starting to push the stream [startPublishingStream].
     * Caution: The Direct Push CDN feature does not pass through the ZEGO Real-Time Audio and Video Cloud during network transmission, so you cannot use ZEGO's ultra-low latency audio and video services.
     * Related APIs: Dynamic re-push to CDN function [addPublishCdnUrl], [removePublishCdnUrl].
     *
     * @param enable Whether to enable direct publish CDN, true: enable direct publish CDN, false: disable direct publish CDN.
     * @param config CDN configuration, if null, use Zego's background default configuration.
     * @param channel Publish stream channel.
     */
    enablePublishDirectToCDN(enable, config, channel) {
        return ZegoExpressEngineImpl.getInstance().enablePublishDirectToCDN(enable, config, channel);
    }
    /**
     * Sends Supplemental Enhancement Information.
     *
     * Available since: 1.1.0
     * Description: While pushing the stream to transmit the audio and video stream data, the stream media enhancement supplementary information is sent to synchronize some other additional information.
     * Use cases: Generally used in scenes such as synchronizing music lyrics or precise video layout, you can choose to send SEI.
     * When to call: After starting to push the stream [startPublishingStream].
     * Restrictions: Do not exceed 30 times per second, and the SEI data length is limited to 4096 bytes.
     * Caution: Since the SEI information follows the video frame, there may be frame loss due to network problems, so the SEI information may also be lost. In order to solve this situation, it should be sent several times within the restricted frequency.
     * Related APIs: After the pusher sends the SEI, the puller can obtain the SEI content by monitoring the callback of [onPlayerRecvSEI].
     *
     * @param data SEI data.
     * @param channel Publish stream channel.
     */
    sendSEI(data, channel) {
        return ZegoExpressEngineImpl.getInstance().sendSEI(data, channel);
    }
    /**
     * Enables or disables hardware encoding.
     *
     * Available since: 1.1.0
     * Description: Whether to use the hardware encoding function when publishing the stream, the GPU is used to encode the stream and to reduce the CPU usage.
     * When to call: The setting can take effect before the stream published. If it is set after the stream published, the stream should be stopped first before it takes effect.
     * Caution: Because hard-coded support is not particularly good for a few models, SDK uses software encoding by default. If the developer finds that the device is hot when publishing a high-resolution audio and video stream during testing of some models, you can consider calling this function to enable hard coding.
     *
     * @param enable Whether to enable hardware encoding, true: enable hardware encoding, false: disable hardware encoding.
     */
    enableHardwareEncoder(enable) {
        return ZegoExpressEngineImpl.getInstance().enableHardwareEncoder(enable);
    }
    /**
     * Whether to enable H.265 encoding to automatically downgrade to H.264 encoding.
     *
     * Available since: 2.12.0
     * Description: When using H.265 encoding to push the stream, whether to enable the strategy of automatically degrading H.265 encoding to H.264 encoding under abnormal circumstances.After enabling automatic downgrade, when H.265 encoding is not supported or H.265 encoding fails, the SDK will try to downgrade and use H.264 encoding to push the stream.After turning off automatic downgrade, when H.265 encoding is not supported or H.265 encoding fails, the direct streaming fails.
     * Use cases: In the Co-hosting and Showroom Live Streaming scenarios, use H265 encoding to push the stream to save CDN traffic without degrading the picture quality.
     * Default Value: When this interface is not called, the default is yes, which means that H.265 encoding is turned on and automatically downgraded to H.264 encoding.
     * When to call: After creating the engine, call the [startPublishingStream] function before pushing the stream.
     * Related callbacks: When the H.265 encoding is automatically downgraded to the H.264 encoding strategy, the [onPublisherVideoEncoderChanged] callback will be triggered when the encoding method changes.
     * Caution: When downgrading from H.265 to H.264 encoding occurs during the streaming process, if you are recording local video or cloud recording, multiple recording files will be generated, which needs to be dealt with.
     *
     * @param enable Whether to enable H.265 coding automatically fallback to H.264 coding, true: enable, false: disable, and the default value is true
     */
    enableH265EncodeFallback(enable) {
        return ZegoExpressEngineImpl.getInstance().enableH265EncodeFallback(enable);
    }
    /**
     * Whether the specified video encoding type is supported.
     *
     * Available since: 2.12.0 and above
     * Description: Whether the specified video encoding is supported depends on the following aspects, whether the hardware model supports hard encoding, whether the performance of the hardware model supports soft encoding, and whether the SDK has the encoding module.
     * When to call: After creating the engine.
     * Caution: It is recommended that users call this interface to obtain H.265 encoding support capability before publish stream with H.265 encoding, if not supported, you can use other encodings for publish, such as H.264.On the mobile platform, the SDK only supports H.265 hardware encoding, and it is affected by the model and hardware capabilities. You need to call the [enableHardwareEncoder] function to enable hardware encoding, and then use this function to determine whether H.265 hardware encoding is supported.
     *
     * @param codecID Video codec id. Required: Yes.
     * @return Whether the specified video encoding is supported.Value range: true means support, you can use this encoding format for publish; false means the is not supported, and the encoding format cannot be used for publish.
     */
    isVideoEncoderSupported(codecID) {
        return ZegoExpressEngineImpl.getInstance().isVideoEncoderSupported(codecID);
    }
    /**
     * Set video capture source for the specified channel.
     *
     * Available since: 3.1.0
     * Description: Set video capture source for switching between different video capture sources.
     * Use cases: Typically used in educational scenarios that require switching between different video capture sources.
     * When to call: After the engine is created [createEngine].
     * Restrictions: None.
     * Caution: 1. Main push channel ZegoPublishChannel.Main does not support using ZegoVideoSourceType.Player and ZegoVideoSourceType.MainPublishChannel video source type.
     *  2. When using ZegoVideoSourceType.Player and ZegoVideoSourceType.MainPublishChannel video source type in aux publish channel ZegoPublishChannel.Aux, must ensure that physical device works on main publish channel ZegoPublishChannel.Main
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param source Video capture source.
     * @param channel Publish stream channel.
     */
    setVideoSource(source, channel) {
        return ZegoExpressEngineImpl.getInstance().setVideoSource(source, channel);
    }
    /**
     * Set audio capture source for the specified channel.
     *
     * Available since: 3.1.0
     * Description: Set audio capture source for switching between different audio capture sources.
     * Use cases: Typically used in educational scenarios that require switching between different audio capture sources.
     * When to call: After the engine is created [createEngine].
     * Caution: 1. Main push channel ZegoPublishChannel.Main does not support using ZegoAudioSourceType.MediaPlayer and ZegoAudioSourceType.MainPublishChannel audio source type.
     *  2. When using ZegoAudioSourceType.MediaPlayer and ZegoAudioSourceType.MainPublishChannel audio source type in aux publish channel ZegoPublishChannel.Aux, must ensure that physical device works on main publish channel ZegoPublishChannel.Main
     *
     * @param source Audio capture source.
     * @param channel Publish stream channel.
     */
    setAudioSource(source, channel) {
        return ZegoExpressEngineImpl.getInstance().setAudioSource(source, channel);
    }
    /**
     * Starts playing a stream from ZEGO RTC server or from third-party CDN. Support multi-room mode.
     *
     * Available since: 1.1.0
     * Description: Play audio and video streams from the ZEGO RTC server or CDN.
     * Use cases: In real-time or live broadcast scenarios, developers can listen to the [onRoomStreamUpdate] event callback to obtain the new stream information in the room where they are located, and call this interface to pass in streamID for play streams.
     * When to call: After [loginRoom].
     * Restrictions: None.
     * Caution: 1. The developer can update the player canvas by calling this function again (the streamID must be the same). 2. After the first play stream failure due to network reasons or the play stream is interrupted, the default time for SDK reconnection is 20min. 3. In the case of poor network quality, user play may be interrupted, the SDK will try to reconnect, and the current play status and error information can be obtained by listening to the [onPlayerStateUpdate] event. please refer to https://docs.zegocloud.com/faq/reconnect. 4. Playing the stream ID that does not exist, the SDK continues to try to play after calling this function. After the stream ID is successfully published, the audio and video stream can be actually played.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param streamID Stream ID, a string of up to 256 characters.
     *   Caution:
     *   1. Only support numbers, English characters and '-', ' '.
     * @param view The view used to display the play audio and video stream's image. When the view is set to [null], no video is displayed, only audio is played.
     * @param config Advanced player configuration.
     */
    startPlayingStream(streamID, view, config) {
        return ZegoExpressEngineImpl.getInstance().startPlayingStream(streamID, view, config);
    }
    /**
     * Stops playing a stream.
     *
     * Available since: 1.1.0
     * Description: Play audio and video streams from the ZEGO RTC server.
     * Use cases: In the real-time scenario, developers can listen to the [onRoomStreamUpdate] event callback to obtain the delete stream information in the room where they are located, and call this interface to pass in streamID for stop play streams.
     * When to call: After [loginRoom].
     * Restrictions: None.
     * Caution: When stopped, the attributes set for this stream previously, such as [setPlayVolume], [mutePlayStreamAudio], [mutePlayStreamVideo], etc., will be invalid and need to be reset when playing the the stream next time.
     *
     * @param streamID Stream ID.
     */
    stopPlayingStream(streamID) {
        return ZegoExpressEngineImpl.getInstance().stopPlayingStream(streamID);
    }
    /**
     * Take a snapshot of the playing stream.
     *
     * Available since: 1.17.0
     * Description: Take a screenshot of the specified stream ID.
     * When to call: after called [startPlayingStream].
     * Restrictions: None.
     * Related callbacks: [onPlayerTakeSnapshotResult] Screenshot data callback.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param streamID Stream ID to be snapshot.
     * @return Results of take play stream snapshot.
     */
    takePlayStreamSnapshot(streamID) {
        return ZegoExpressEngineImpl.getInstance().takePlayStreamSnapshot(streamID);
    }
    /**
     * Sets the stream playback volume.
     *
     * Available since: 1.16.0
     * Description: Set the sound size of the stream, the local user can control the playback volume of the audio stream.
     * When to call: after called [startPlayingStream].
     * Restrictions: None.
     * Related APIs: [setAllPlayStreamVolume] Set all stream volume.
     * Caution: You need to reset after [stopPlayingStream] and [startPlayingStream]. This function and the [setAllPlayStreamVolume] function overwrite each other, and the last call takes effect.
     *
     * @param streamID Stream ID.
     * @param volume Volume percentage. The value ranges from 0 to 200, and the default value is 100.
     */
    setPlayVolume(streamID, volume) {
        return ZegoExpressEngineImpl.getInstance().setPlayVolume(streamID, volume);
    }
    /**
     * Sets the all stream playback volume.
     *
     * Available since: 2.3.0
     * Description: Set the sound size of the stream, the local user can control the playback volume of the audio stream.
     * When to call: after called [startPlayingStream].
     * Restrictions: None.
     * Related APIs: [setPlayVolume] Set the specified streaming volume.
     * Caution: You need to reset after [stopPlayingStream] and [startPlayingStream]. Set the specified streaming volume and [setAllPlayStreamVolume] interface to override each other, and the last call takes effect.
     *
     * @param volume Volume percentage. The value ranges from 0 to 200, and the default value is 100.
     */
    setAllPlayStreamVolume(volume) {
        return ZegoExpressEngineImpl.getInstance().setAllPlayStreamVolume(volume);
    }
    /**
     * Set play video stream type.
     *
     * Available since: 2.3.0
     * Description: When the publish stream sets the codecID to SVC through [setVideoConfig], the puller can dynamically set and select different stream types (small resolution is one-half of the standard layer).
     * Use cases: In general, when the network is weak or the rendered UI window is small, you can choose to pull videos with small resolutions to save bandwidth.
     * When to call: before or after called [startPlayingStream].
     * Restrictions: None.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param streamID Stream ID.
     * @param streamType Video stream type.
     */
    setPlayStreamVideoType(streamID, streamType) {
        return ZegoExpressEngineImpl.getInstance().setPlayStreamVideoType(streamID, streamType);
    }
    /**
     * Whether the pull stream can receive the specified audio data.
     *
     * Available since: 1.1.0
     * Description: In the process of real-time audio and video interaction, local users can use this function to control whether to receive audio data from designated remote users when pulling streams as needed. When the developer does not receive the audio receipt, the hardware and network overhead can be reduced.
     * Use cases: Call this function when developers need to quickly close and restore remote audio. Compared to re-flow, it can greatly reduce the time and improve the interactive experience.
     * When to call: This function can be called after calling [createEngine].
     * Caution: This function is valid only when the [muteAllPlayStreamAudio] function is set to `false`.
     * Related APIs: You can call the [muteAllPlayStreamAudio] function to control whether to receive all audio data. When the two functions [muteAllPlayStreamAudio] and [mutePlayStreamAudio] are set to `false` at the same time, the local user can receive the audio data of the remote user when the stream is pulled: 1. When the [muteAllPlayStreamAudio(true)] function is called, it is globally effective, that is, local users will be prohibited from receiving all remote users' audio data. At this time, the [mutePlayStreamAudio] function will not take effect whether it is called before or after [muteAllPlayStreamAudio].2. When the [muteAllPlayStreamAudio(false)] function is called, the local user can receive the audio data of all remote users. At this time, the [mutePlayStreamAudio] function can be used to control whether to receive a single audio data. Calling the [mutePlayStreamAudio(true, streamID)] function allows the local user to receive audio data other than the `streamID`; calling the [mutePlayStreamAudio(false, streamID)] function allows the local user to receive all audio data.
     *
     * @param streamID Stream ID.
     * @param mute Whether it can receive the audio data of the specified remote user when streaming, "true" means prohibition, "false" means receiving, the default value is "false".
     */
    mutePlayStreamAudio(streamID, mute) {
        return ZegoExpressEngineImpl.getInstance().mutePlayStreamAudio(streamID, mute);
    }
    /**
     * Whether the pull stream can receive the specified video data.
     *
     * Available since: 1.1.0
     * Description: In the process of real-time video and video interaction, local users can use this function to control whether to receive video data from designated remote users when pulling streams as needed. When the developer does not receive the audio receipt, the hardware and network overhead can be reduced.
     * Use cases: This function can be called when developers need to quickly close and resume watching remote video. Compared to re-flow, it can greatly reduce the time and improve the interactive experience.
     * When to call: This function can be called after calling [createEngine].
     * Caution: This function is valid only when the [muteAllPlayStreamVideo] function is set to `false`. When you mute the video stream, the view remains at the last frame by default, if you need to clear the last frame, please contact ZEGO technical support.
     * Related APIs: You can call the [muteAllPlayStreamVideo] function to control whether to receive all video data. When the two functions [muteAllPlayStreamVideo] and [mutePlayStreamVideo] are set to `false` at the same time, the local user can receive the video data of the remote user when the stream is pulled: 1. When the [muteAllPlayStreamVideo(true)] function is called, it will take effect globally, that is, local users will be prohibited from receiving all remote users' video data. At this time, the [mutePlayStreamVideo] function will not take effect whether it is called before or after [muteAllPlayStreamVideo]. 2. When the [muteAllPlayStreamVideo(false)] function is called, the local user can receive the video data of all remote users. At this time, the [mutePlayStreamVideo] function can be used to control whether to receive a single video data. Call the [mutePlayStreamVideo(true, streamID)] function, the local user can receive other video data other than the `streamID`; call the [mutePlayStreamVideo(false, streamID)] function, the local user can receive all the video data.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param streamID Stream ID.
     * @param mute Whether it is possible to receive the video data of the specified remote user when streaming, "true" means prohibition, "false" means receiving, the default value is "false".
     */
    mutePlayStreamVideo(streamID, mute) {
        return ZegoExpressEngineImpl.getInstance().mutePlayStreamVideo(streamID, mute);
    }
    /**
     * Can the pull stream receive all audio data.
     *
     * Available since: 2.4.0
     * Description: In the process of real-time audio and video interaction, local users can use this function to control whether to receive audio data from all remote users when pulling streams (including the audio streams pushed by users who have newly joined the room after calling this function). By default, users can receive audio data pushed by all remote users after joining the room. When the developer does not receive the audio receipt, the hardware and network overhead can be reduced.
     * Use cases: Call this function when developers need to quickly close and restore remote audio. Compared to re-flow, it can greatly reduce the time and improve the interactive experience.
     * When to call: This function can be called after calling [createEngine].
     * Related APIs: You can call the [mutePlayStreamAudio] function to control whether to receive a single piece of audio data. When the two functions [muteAllPlayStreamAudio] and [mutePlayStreamAudio] are set to `false` at the same time, the local user can receive the audio data of the remote user when the stream is pulled: 1. When the [muteAllPlayStreamAudio(true)] function is called, it takes effect globally, that is, local users will be prohibited from receiving audio data from all remote users. At this time, the [mutePlayStreamAudio] function will not take effect no matter if the [mutePlayStreamAudio] function is called before or after [muteAllPlayStreamAudio]. 2. When the [muteAllPlayStreamAudio(false)] function is called, the local user can receive the audio data of all remote users. At this time, the [mutePlayStreamAudio] function can be used to control whether to receive a single audio data. Calling the [mutePlayStreamAudio(true, streamID)] function allows the local user to receive audio data other than the `streamID`; calling the [mutePlayStreamAudio(false, streamID)] function allows the local user to receive all audio data.
     *
     * @param mute Whether it is possible to receive audio data from all remote users when streaming, "true" means prohibition, "false" means receiving, and the default value is "false".
     */
    muteAllPlayStreamAudio(mute) {
        return ZegoExpressEngineImpl.getInstance().muteAllPlayStreamAudio(mute);
    }
    /**
     * Can the pull stream receive all video data.
     *
     * Available since: 2.4.0
     * Description: In the process of real-time video and video interaction, local users can use this function to control whether to receive all remote users' video data when pulling the stream (including the video stream pushed by the new user who joins the room after calling this function). By default, users can receive video data pushed by all remote users after joining the room. When the developer does not receive the audio receipt, the hardware and network overhead can be reduced.
     * Use cases: This function can be called when developers need to quickly close and resume watching remote video. Compared to re-flow, it can greatly reduce the time and improve the interactive experience.
     * When to call: This function can be called after calling [createEngine].
     * Caution: When you mute the video stream, the view remains at the last frame by default, if you need to clear the last frame, please contact ZEGO technical support.
     * Related APIs: You can call the [mutePlayStreamVideo] function to control whether to receive a single piece of video data. When the two functions [muteAllPlayStreamVideo] and [mutePlayStreamVideo] are set to `false` at the same time, the local user can receive the video data of the remote user when the stream is pulled: 1. When the [muteAllPlayStreamVideo(true)] function is called, it will take effect globally, that is, the local user will be prohibited from receiving all remote users' video data. At this time, the [mutePlayStreamVideo] function will not take effect whether it is called before or after [muteAllPlayStreamVideo]. 2. When the [muteAllPlayStreamVideo(false)] function is called, the local user can receive the video data of all remote users. At this time, the [mutePlayStreamVideo] function can be used to control whether to receive a single video data. Call the [mutePlayStreamVideo(true, streamID)] function, the local user can receive other video data other than the `streamID`; call the [mutePlayStreamVideo(false, streamID)] function, the local user can receive all the video data.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param mute Whether it is possible to receive all remote users' video data when streaming, "true" means prohibition, "false" means receiving, and the default value is "false".
     */
    muteAllPlayStreamVideo(mute) {
        return ZegoExpressEngineImpl.getInstance().muteAllPlayStreamVideo(mute);
    }
    /**
     * Enables or disables hardware decoding.
     *
     * Available since: 1.1.0
     * Description: Control whether hardware decoding is used when playing streams, with hardware decoding enabled the SDK will use the GPU for decoding, reducing CPU usage.
     * Use cases: If developers find that the device heats up badly when playing large resolution audio and video streams during testing on some models, consider calling this function to enable hardware decoding.
     * Default value: Hardware decoding is disabled by default when this interface is not called.
     * When to call: This function needs to be called after [createEngine] creates an instance.
     * Restrictions: None.
     * Caution: Need to be called before calling [startPlayingStream], if called after playing the stream, it will only take effect after stopping the stream and re-playing it. Once this configuration has taken effect, it will remain in force until the next call takes effect.
     *
     * @param enable Whether to turn on hardware decoding switch, true: enable hardware decoding, false: disable hardware decoding.
     */
    enableHardwareDecoder(enable) {
        return ZegoExpressEngineImpl.getInstance().enableHardwareDecoder(enable);
    }
    /**
     * Whether the specified video decoding format is supported.
     *
     * Available since: 2.12.0
     * Description: Whether the specified video decoding is supported depends on the following aspects: whether the hardware model supports hard decoding, whether the performance of the hardware model supports soft decoding, and whether the SDK includes the decoding module.
     * When to call: After creating the engine.
     * Caution: It is recommended that users call this interface to obtain the H.265 decoding support capability before pulling the H.265 stream. If it is not supported, the user can pull the stream of other encoding formats, such as H.264.
     *
     * @param codecID Video codec id.Required: Yes.
     * @return Whether the specified video decoding format is supported; true means supported, you can use this decoding format for playing stream; false means not supported, and the decoding format cannot be used for play stream.
     */
    isVideoDecoderSupported(codecID) {
        return ZegoExpressEngineImpl.getInstance().isVideoDecoderSupported(codecID);
    }
    /**
     * Starts a stream mixing task.
     *
     * Available since: 1.2.1
     * Description: Initiate a mixing stream request to the ZEGO RTC server, the server will look for the stream currently being pushed, and mix the layers according to the parameters of the mixing stream task requested by the SDK. When you need to update a mixing task, that is, when the input stream increases or decreases, you need to update the input stream list. At this time, you can update the field of the [ZegoMixerTask] object inputList and call this function again to pass in the same [ZegoMixerTask] object to update the mixing task.
     * Use cases: It is often used when multiple video images are required to synthesize a video using mixed streaming, such as education, live broadcast of teacher and student images.
     * When to call: After calling [loginRoom] to log in to the room.
     * Restrictions: None.
     * Caution: Due to the performance considerations of the client device, the SDK muxing is to start the mixing task on the ZEGO RTC server for mixing. If an exception occurs when the mixing task is requested to start, for example, the most common mixing input stream does not exist, the error code will be given from the callback callback. If a certain input stream does not exist in the middle, the muxing task will automatically retry to pull this input stream for 90 seconds, and will not retry after 90 seconds. If all input streams no longer exist, the server will automatically stop the mixing task after 90 seconds.
     * Related callbacks: [OnMixerRelayCDNStateUpdate] can be used to obtain the CDN status update notification of the mixed stream repost, and the sound update notification of each single stream in the mixed stream can be obtained through [onMixerSoundLevelUpdate].
     * Related APIs: the mixing task can be stopped by the [stopMixerTask] function.
     *
     * @param task Mixing task object. Required: Yes.
     * @return Start stream mixing task result
     */
    startMixerTask(task) {
        return ZegoExpressEngineImpl.getInstance().startMixerTask(task);
    }
    /**
     * Stops a stream mixing task.
     *
     * Available since: 1.2.1
     * Description: Initiate a request to end the mixing task to the ZEGO RTC server.
     * Use cases: It is often used when multiple video images are required to synthesize a video using mixed streaming, such as education, live broadcast of teacher and student images.
     * When to call: After calling [startMixerTask] to start mixing.
     * Restrictions: None.
     * Caution: If the developer starts the next mixing task without stopping the previous mixing task, the previous mixing task will not automatically stop until the input stream of the previous mixing task does not exist for 90 seconds. Before starting the next mixing task, you should stop the previous mixing task, so that when an anchor has already started the next mixing task to mix with other anchors, the audience is still pulling the output stream of the previous mixing task.
     * Related APIs: You can start mixing by using the [startMixerTask] function.
     *
     * @param task Mixing task object. Required: Yes.
     * @return Stop stream mixing task result
     */
    stopMixerTask(task) {
        return ZegoExpressEngineImpl.getInstance().stopMixerTask(task);
    }
    /**
     * Mutes or unmutes the microphone.
     *
     * Available since: 1.1.0
     * Description: This function is used to control whether to use the collected audio data. Mute (turn off the microphone) will use the muted data to replace the audio data collected by the device for streaming. At this time, the microphone device will still be occupied.
     * Default value: The default is `false`, which means no muting.
     * When to call: After creating the engine [createEngine].
     * Restrictions: None.
     * Related APIs: Developers who want to control whether to use microphone on the UI should use this function to avoid unnecessary performance overhead by using the [enableAudioCaptureDevice]. You can use [isMicrophoneMuted] to check if the microphone is muted.
     *
     * @param mute Whether to mute (disable) the microphone, `true`: mute (disable) microphone, `false`: enable microphone.
     */
    muteMicrophone(mute) {
        return ZegoExpressEngineImpl.getInstance().muteMicrophone(mute);
    }
    /**
     * Checks whether the microphone is muted.
     *
     * Available since: 1.1.0
     * Description: Used to determine whether the microphone is set to mute.
     * When to call: After creating the engine [createEngine].
     * Restrictions: None.
     * Related APIs: [muteMicrophone].
     *
     * @return Whether the microphone is muted; true: the microphone is muted; `false`: the microphone is enable (not muted).
     */
    isMicrophoneMuted() {
        return ZegoExpressEngineImpl.getInstance().isMicrophoneMuted();
    }
    /**
     * Mutes or unmutes the audio output speaker.
     *
     * Available since: 1.1.0
     * Description: After mute speaker, all the SDK sounds will not play, including playing stream, mediaplayer, etc. But the SDK will still occupy the output device.
     * Default value: The default is `false`, which means no muting.
     * When to call: After creating the engine [createEngine].
     * Restrictions: None.
     *
     * @param mute Whether to mute (disable) speaker audio output, `true`: mute (disable) speaker audio output, `false`: enable speaker audio output.
     */
    muteSpeaker(mute) {
        return ZegoExpressEngineImpl.getInstance().muteSpeaker(mute);
    }
    /**
     * Checks whether the audio output speaker is muted.
     *
     * Available since: 1.1.0
     * Description: Used to determine whether the audio output is muted.
     * When to call: After creating the engine [createEngine].
     * Restrictions: None.
     * Related APIs: [muteSpeaker].
     *
     * @return Whether the speaker is muted; `true`: the speaker is muted; `false`: the speaker is enable (not muted).
     */
    isSpeakerMuted() {
        return ZegoExpressEngineImpl.getInstance().isSpeakerMuted();
    }
    /**
     * Enables or disables the audio capture device.
     *
     * Available since: 1.1.0
     * Description: This function is used to control whether to use the audio collection device. When the audio collection device is turned off, the SDK will no longer occupy the audio device. Of course, if the stream is being published at this time, there is no audio data.
     * Use cases: When the user never needs to use the audio, you can call this function to close the audio collection.
     * Default value: The default is `true`.
     * When to call: After creating the engine [createEngine].
     * Restrictions: None.
     * Related APIs: Turning off or turning on the microphone on the hardware is a time-consuming operation, and there is a certain performance overhead when the user performs frequent operations. [muteMicrophone] is generally recommended.
     *
     * @param enable Whether to enable the audio capture device, `true`: enable audio capture device, `false`: disable audio capture device.
     */
    enableAudioCaptureDevice(enable) {
        return ZegoExpressEngineImpl.getInstance().enableAudioCaptureDevice(enable);
    }
    /**
     * get current audio route type.
     *
     * Available since: 1.1.0
     * Description: Audio routing refers to the audio output device that an app uses to play audio, and common audio routes are: speakers, handsets, headphones, Bluetooth devices, and so on.
     * When to call: After creating the engine [createEngine].
     * Restrictions: None.
     * Related APIs: Set audio route to speaker [setAudioRouteToSpeaker].
     */
    getAudioRouteType() {
        return ZegoExpressEngineImpl.getInstance().getAudioRouteType();
    }
    /**
     * Whether to use the built-in speaker to play audio.
     *
     * Available since: 1.1.0
     * Description: Whether to use the speaker to play audio, when you choose not to use the built-in speaker to play the sound, the SDK will select the audio output device with the highest current priority to play the sound according to the system schedule, and common audio routes are: handsets, headphones, Bluetooth devices, and so on.
     * When to call: After creating the engine [createEngine].
     * Restrictions: None.
     * Related APIs: Get the current audio route [getAudioRouteType].
     *
     * @param defaultToSpeaker Whether to use the built-in speaker to play sound, `true`: use the built-in speaker to play sound, `false`: use the highest priority audio output device scheduled by the current system to play sound
     */
    setAudioRouteToSpeaker(defaultToSpeaker) {
        return ZegoExpressEngineImpl.getInstance().setAudioRouteToSpeaker(defaultToSpeaker);
    }
    /**
     * Turns on/off the camera (for the specified channel).
     *
     * Available since: 1.1.0
     * Description: This function is used to control whether to start the capture of the camera. After the camera is turned off, the video capture will not be performed. At this time, there will be no video data for local preview and push streaming.
     * Default value: The default is `true` which means the camera is turned on.
     * When to call: After creating the engine [createEngine].
     * Restrictions: None.
     * Caution: In the case of using the custom video capture function [enableCustomVideoCapture], since the developer has taken over the video data capture, the SDK is no longer responsible for the video data capture, but this function still affects whether to encode or not. Therefore, when developers use custom video capture, please ensure that the value of this function is `true`.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param enable Whether to turn on the camera, `true`: turn on camera, `false`: turn off camera
     * @param channel Publishing stream channel
     */
    enableCamera(enable, channel) {
        return ZegoExpressEngineImpl.getInstance().enableCamera(enable, channel);
    }
    /**
     * Switches to the front or the rear camera (for the specified channel).
     *
     * Available since: 1.1.0
     * Description: This function is used to control the use of the front camera or the rear camera (only supported by Android and iOS).
     * Default value: The default is `true` which means the front camera is used.
     * When to call: After creating the engine [createEngine].
     * Restrictions: None.
     * Caution: When the custom video capture function [enableCustomVideoCapture] is turned on, since the developer has taken over the video data capture, the SDK is no longer responsible for the video data capture, and this function is no longer valid.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param enable Whether to use the front camera, `true`: use the front camera, `false`: use the the rear camera.
     * @param channel Publishing stream channel
     */
    useFrontCamera(enable, channel) {
        return ZegoExpressEngineImpl.getInstance().useFrontCamera(enable, channel);
    }
    /**
     * Starts sound level monitoring. Support enable some advanced feature.
     *
     * Available since: 2.10.0
     * Description: After starting monitoring, you can receive local audio sound level via [onCapturedSoundLevelUpdate] callback, and receive remote audio sound level via [onRemoteSoundLevelUpdate] callback. Before entering the room, you can call [startPreview] with this function and combine it with [onCapturedSoundLevelUpdate] callback to determine whether the audio device is working properly.
     * Use cases: During the publishing and playing process, determine who is talking on the wheat and do a UI presentation.
     * When to call: After the engine is created [createEngine].
     * Caution:
     *   1. [onCapturedSoundLevelUpdate] and [onRemoteSoundLevelUpdate] callback notification period is the value set by the parameter.
     *   2. After the sound monitoring is started, even if the local audio capture is not started, [onCapturedSoundLevelUpdate] will have a callback, and the sound level is 0.
     *
     * @param config Configuration for starts the sound level monitor.
     */
    startSoundLevelMonitor(config) {
        return ZegoExpressEngineImpl.getInstance().startSoundLevelMonitor(config);
    }
    /**
     * Stops sound level monitoring.
     *
     * Available since: 1.1.0
     * Description: After the monitoring is stopped, the callback of the local/remote audio sound level will be stopped.
     * When to call: After the engine is created [createEngine].
     * Related APIs: Soundwave monitoring can be initiated via [startSoundLevelMonitor].
     */
    stopSoundLevelMonitor() {
        return ZegoExpressEngineImpl.getInstance().stopSoundLevelMonitor();
    }
    /**
     * Enables or disables headphone monitoring.
     *
     * Available since: 1.9.0
     * Description: Enable/Disable headphone monitor, and users hear their own voices as they use the microphone to capture sounds.
     * When to call: After the engine is created [createEngine].
     * Default value: Disable.
     * Caution:
     *   1. This setting does not actually take effect until both the headset and microphone are connected.
     *   2. The default is to return after acquisition and before pre-processing. If you need to return after pre-processing, please contact ZEGO technical support.
     *
     * @param enable Whether to use headphone monitor, true: enable, false: disable
     */
    enableHeadphoneMonitor(enable) {
        return ZegoExpressEngineImpl.getInstance().enableHeadphoneMonitor(enable);
    }
    /**
     * Whether to enable acoustic echo cancellation (AEC).
     *
     * Available since: 1.1.0
     * Description: Turning on echo cancellation, the SDK filters the collected audio data to reduce the echo component in the audio.
     * Use case: When you need to reduce the echo to improve the call quality and user experience, you can turn on this feature.
     * When to call: It needs to be called after [createEngine], before [startPublishingStream], [startPlayingStream], [startPreview], [createMediaPlayer], [createAudioEffectPlayer] and [createRealTimeSequentialDataManager].
     * Caution: The AEC function only supports the processing of sounds playbacked through the SDK, such as sounds played by the playing stream, media player, audio effect player, etc. Before this function is called, the SDK automatically determines whether to use AEC. Once this function is called, the SDK does not automatically determine whether to use AEC.
     * Restrictions: None.
     * Related APIs: Developers can use [enableHeadphoneAEC] to set whether to enable AEC when using headphones, and use [setAECMode] to set the echo cancellation mode.
     *
     * @param enable Whether to enable echo cancellation, true: enable, false: disable
     */
    enableAEC(enable) {
        return ZegoExpressEngineImpl.getInstance().enableAEC(enable);
    }
    /**
     * Whether to turn on acoustic echo cancellation (AEC) when using the headphone.
     *
     * Available since: 1.1.0
     * Description: When [enableAEC] is used to turn on echo cancellation, it is only turned on when the speaker is used for mobile terminal equipment. Call this function if you need to turn echo cancellation on or off when using the headset.
     * Use case: It is common when the mobile device is connected to a external sound card as the audio output source. In order to eliminate the echo in this case, you need to call this function to turn on the echo cancellation.
     * Default value: Android is off by default and iOS is on by default.
     * When to call: It needs to be called after [createEngine], before [startPublishingStream], [startPlayingStream], [startPreview], [createMediaPlayer], [createAudioEffectPlayer] and [createRealTimeSequentialDataManager].
     * Caution: Turning on echo cancellation will increase the ear return delay. On the iOS platform, the SDK cannot distinguish between the headset and the external sound card. If you use this function to turn off the system echo cancellation when using the headset, the sound played by the external sound card will be collected when the user accesses the external sound card.
     * Restrictions: None.
     * Related APIs: When the headset is not used, you can set whether the SDK turns on echo cancellation through [enableAEC].
     * Platform differences: Only supports iOS and Android.
     *
     * @param enable Whether to enable, true: enable, false: disable
     */
    enableHeadphoneAEC(enable) {
        return ZegoExpressEngineImpl.getInstance().enableHeadphoneAEC(enable);
    }
    /**
     * Sets the acoustic echo cancellation (AEC) mode.
     *
     * Available since: 1.1.0
     * Description: When [enableAEC] is used to enable echo cancellation, this function can be used to switch between different echo cancellation modes to control the degree of echo cancellation.
     * Use case: When the default echo cancellation effect does not meet expectations, this function can be used to adjust the echo cancellation mode.
     * Default value: When this function is not called, the default echo cancellation mode is [Aggressive].
     * When to call: It needs to be called after [createEngine], before [startPublishingStream], [startPlayingStream], [startPreview], [createMediaPlayer], [createAudioEffectPlayer] and [createRealTimeSequentialDataManager].
     * Restrictions: The value set by this function is valid only after the echo cancellation function is turned on.
     *
     * @param mode Echo cancellation mode
     */
    setAECMode(mode) {
        return ZegoExpressEngineImpl.getInstance().setAECMode(mode);
    }
    /**
     * Enables or disables automatic gain control (AGC).
     *
     * Available since: 1.1.0
     * Description: After turning on this function, the SDK can automatically adjust the microphone volume to adapt to near and far sound pickups and keep the volume stable.
     * Use case: When you need to ensure volume stability to improve call quality and user experience, you can turn on this feature.
     * When to call: It needs to be called after [createEngine] and before [startPublishingStream], [startPlayingStream], [startPreview], [createMediaPlayer], [createAudioEffectPlayer] and [createRealTimeSequentialDataManager]. Note that the Mac needs to be called after [startPreview] and before [startPublishingStream].
     * Caution: Before this function is called, the SDK automatically determines whether to use AGC. Once this function is called, the SDK does not automatically determine whether to use AGC.
     * Restrictions: None.
     *
     * @param enable Whether to enable automatic gain control, true: enable, false: disable
     */
    enableAGC(enable) {
        return ZegoExpressEngineImpl.getInstance().enableAGC(enable);
    }
    /**
     * Enables or disables active noise suppression (ANS, aka ANC).
     *
     * Available since: 1.1.0
     * Description: Enable the noise suppression can reduce the noise in the audio data and make the human voice clearer.
     * Use case: When you need to suppress noise to improve call quality and user experience, you can turn on this feature.
     * When to call: It needs to be called after [createEngine], before [startPublishingStream], [startPlayingStream], [startPreview], [createMediaPlayer], [createAudioEffectPlayer] and [createRealTimeSequentialDataManager].
     * Related APIs: This function has a better suppression effect on continuous noise (such as the sound of rain, white noise). If you need to turn on transient noise suppression, please use [enableTransientANS]. And the noise suppression mode can be set by [setANSMode].
     * Caution: Before this function is called, the SDK automatically determines whether to use ANS. Once this function is called, the SDK does not automatically determine whether to use ANS.
     * Restrictions: None.
     *
     * @param enable Whether to enable noise suppression, true: enable, false: disable
     */
    enableANS(enable) {
        return ZegoExpressEngineImpl.getInstance().enableANS(enable);
    }
    /**
     * Sets the automatic noise suppression (ANS) mode.
     *
     * Available since: 1.1.0
     * Description: When [enableANS] is used to enable noise suppression, this function can be used to switch between different noise suppression modes to control the degree of noise suppression.
     * Use case: When the default noise suppression effect does not meet expectations, this function can be used to adjust the noise suppression mode.
     * Default value: When this function is not called, the default echo cancellation mode is [Medium].
     * When to call: It needs to be called after [createEngine], before [startPublishingStream], [startPlayingStream], [startPreview], [createMediaPlayer], [createAudioEffectPlayer] and [createRealTimeSequentialDataManager].
     * Restrictions: The value set by this function is valid only after the noise suppression function is turned on.
     *
     * @param mode Audio Noise Suppression mode
     */
    setANSMode(mode) {
        return ZegoExpressEngineImpl.getInstance().setANSMode(mode);
    }
    /**
     * Enable the Effects beauty environment.
     *
     * Available since: 2.16.0
     * Description: Enable the Effects beauty environment. The SDK uses the specified video frame data type for transmission. The Windows platform only supports video frame raw data, the Apple platform only supports CVPixelBuffer, and the Android platform only supports texture2d.
     * Use cases: It is often used in scenes such as video calls and live broadcasts.
     * Default value: When this function is not called, the beauty environment is not activated by default.
     * When to call: Must be called before calling [startPreview], [startPublishingStream]. If you need to modify the configuration, please call [logoutRoom] to log out of the room first, otherwise it will not take effect.
     * Related APIs: [enableEffectsBeauty] switch beauty, [setEffectsBeautyParam] set beauty parameters.
     * Caution: This beauty function is the basic function. If it does not meet the expectations of the developer, you can use the custom video pre-processing function [enableCustomVideoProcessing] or the custom video capture function [enableCustomVideoCapture] docking and constructing the AI ​​vision SDK [ZegoEffects] https://doc-zh.zego.im/article/9556 for best results.
     * Restrictions: This function only supports Android system 5.0 and above, Android SDK version 21 and above.
     * Note: This function is only available in ZegoExpressVideo SDK!
     */
    startEffectsEnv() {
        return ZegoExpressEngineImpl.getInstance().startEffectsEnv();
    }
    /**
     * Disable the Effects beauty environment.
     *
     * Available since: 2.16.0
     * Description: Disable the Effects beauty environment.
     * Use cases: It is often used in scenes such as video calls and live broadcasts.
     * When to call: Must be called before calling [startPreview], [startPublishingStream]. If you need to modify the configuration, please call [logoutRoom] to log out of the room first, otherwise it will not take effect.
     * Related APIs: [enableEffectsBeauty] switch beauty, [setEffectsBeautyParam] set beauty parameters.
     * Caution: This beauty function is the basic function. If it does not meet the expectations of the developer, you can use the custom video pre-processing function [enableCustomVideoProcessing] or the custom video capture function [enableCustomVideoCapture] docking and constructing the AI ​​vision SDK [ZegoEffects] for best results.
     * Restrictions: This function only supports Android system 5.0 and above, Android SDK version 21 and above.
     * Note: This function is only available in ZegoExpressVideo SDK!
     */
    stopEffectsEnv() {
        return ZegoExpressEngineImpl.getInstance().stopEffectsEnv();
    }
    /**
     * Enables or disables the beauty effect.
     *
     * Available since: 2.16.0
     * Description: Support basic beauty functions, including whiten, rosy, smooth, and sharpen.
     * Use cases: It is often used in scenes such as video calls and live broadcasts.
     * When to call: You must call [startEffectsEnv] to enable the beauty environment before calling this function.
     * Default value: When this function is not called, the beauty effect is not enabled by default.
     * Related APIs: You can call the [setBeautifyOption] function to adjust the beauty parameters.
     * Caution: This beauty function is the basic function. If it does not meet the expectations of the developer, you can use the custom video pre-processing function [enableCustomVideoProcessing] or the custom video capture function [enableCustomVideoCapture] docking and constructing the AI ​​vision SDK [ZegoEffects] for best results.
     * Restrictions: If this function is used on the Android platform, it only supports 5.0 and above, SDK version 21 and above.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param enable Whether to enable the beauty effect, true is enabled; false is disabled, and the default is false.
     */
    enableEffectsBeauty(enable) {
        return ZegoExpressEngineImpl.getInstance().enableEffectsBeauty(enable);
    }
    /**
     * Set beautify param.
     *
     * Available since: 2.16.0
     * Description: Set the beauty parameters, including whiten, rosy, smooth, and sharpen.
     * Use cases: It is often used in scenes such as video calls and live broadcasts.
     * When to call: You must call [startEffectsEnv] to enable the beauty environment before calling this function.
     * Related APIs: You can call [enableEffectsBeauty] to turn on or off the beauty function.
     * Restrictions: This function only supports Android system 5.0 and above, Android SDK version 21 and above.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param param Beauty option param.
     */
    setEffectsBeautyParam(param) {
        return ZegoExpressEngineImpl.getInstance().setEffectsBeautyParam(param);
    }
    /**
     * Set the sound equalizer (EQ).
     *
     * Available since: 1.12.0
     * Description: Call this function to set the sound equalizer adjust the tone.
     * Use cases: Often used in voice chatroom, KTV.
     * When to call: It needs to be called after [createEngine].
     * Restrictions: None.
     *
     * @param bandIndex Band frequency index, the value range is [0, 9], corresponding to 10 frequency bands, and the center frequencies are [31, 62, 125, 250, 500, 1K, 2K, 4K, 8K, 16K] Hz.
     * @param bandGain Band gain for the index, the value range is [-15, 15]. Default value is 0, if all gain values in all frequency bands are 0, EQ function will be disabled.
     */
    setAudioEqualizerGain(bandIndex, bandGain) {
        return ZegoExpressEngineImpl.getInstance().setAudioEqualizerGain(bandIndex, bandGain);
    }
    /**
     * Setting up the voice changer via preset enumeration.
     *
     * Available since: 1.17.0
     * Description: Call this function to use preset voice changer effect.
     * Use cases: Often used in live broadcasting, voice chatroom and KTV.
     * When to call: It needs to be called after [createEngine].
     * Restrictions: Voice changer effect is only effective for SDK captured sound.
     * Related APIs:
     * If you need advanced voice changer effect, please use [setVoiceChangerParam].
     * This function is mutually exclusive with [setReverbPreset]. If used at the same time, it will produce undefined effect.
     * Using ANDROID/ETHEREAL preset voice changer effect will modify reverberation or reverberation echo parameters. Calling [setVoiceChangerParam], [setReverbAdvancedParam], [setReverbEchoParam] may affect the voice changer effect after use these preset voice changer effect.
     * If you need advanced reverb/echo/electronic effects/voice changer effect, please use [setReverbAdvancedParam], [setReverbEchoParam], [setElectronicEffects], [setVoiceChangerParam] together.
     *
     * @param preset The voice changer preset enumeration.
     */
    setVoiceChangerPreset(preset) {
        return ZegoExpressEngineImpl.getInstance().setVoiceChangerPreset(preset);
    }
    /**
     * Setting up the specific voice changer parameters.
     *
     * Available since: 1.10.0
     * Description: Call this function to set custom voice changer effect.
     * Use cases: Often used in live broadcasting, voice chatroom and KTV.
     * When to call: It needs to be called after [createEngine].
     * Restrictions: Voice changer effect is only effective for SDK captured sound.
     * Related APIs:
     * [setVoiceChangerPreset] provide a set of preset voice changer effects.
     * If you need advanced reverb/echo/voice changer effect, please use [setReverbAdvancedParam], [setReverbEchoParam], [setVoiceChangerParam] together.
     *
     * @param param Voice changer parameters.
     */
    setVoiceChangerParam(param) {
        return ZegoExpressEngineImpl.getInstance().setVoiceChangerParam(param);
    }
    /**
     * Setting up the reverberation via preset enumeration.
     *
     * Available since: 1.17.0
     * Description: Call this function to set preset reverb effect.
     * Use cases: Often used in live broadcasting, voice chatroom and KTV.
     * When to call: It needs to be called after [createEngine]. Support call this function to change preset reverb effect during publishing stream.
     * Restrictions: Reverb effect is only effective for SDK captured sound.
     * Related APIs:
     * If you need advanced reverb effect, please use [setReverbAdvancedParam].
     * This function is mutually exclusive with [setVoiceChangerPreset]. If used at the same time, it will produce undefined effects.
     * If you need advanced reverb/echo/voice changer effect, please use [setReverbAdvancedParam], [setReverbEchoParam], [setVoiceChangerParam] together.
     *
     * @param preset The reverberation preset enumeration.
     */
    setReverbPreset(preset) {
        return ZegoExpressEngineImpl.getInstance().setReverbPreset(preset);
    }
    /**
     * Setting up the specific reverberation parameters.
     *
     * Available since: 1.10.0
     * Description: Call this function to set preset reverb effect.
     * Use cases: Often used in live broadcasting, voice chatroom and KTV.
     * When to call: It needs to be called after [createEngine].
     * Restrictions: Reverb effect is only effective for SDK captured sound.
     * Caution: Different values dynamically set during publishing stream will take effect. When all parameters are set to 0, the reverberation is turned off.
     * Related APIs:
     * [setReverbPreset] provide a set of preset reverb effects.
     * If you need advanced reverb/echo/voice changer effect, please use [setReverbAdvancedParam], [setReverbEchoParam], [setVoiceChangerParam] together.
     *
     * @param param Reverb advanced parameter.
     */
    setReverbAdvancedParam(param) {
        return ZegoExpressEngineImpl.getInstance().setReverbAdvancedParam(param);
    }
    /**
     * Setting up the specific reverberation echo parameters.
     *
     * Available since: 1.17.0
     * Description: Call this function to set reverb echo effect. This function can be used with voice changer and reverb to achieve a variety of custom sound effects.
     * Use cases: Often used in live broadcasting, voice chatroom and KTV.
     * When to call: It needs to be called after [createEngine].
     * Restrictions: Reverb echo effect is only effective for SDK captured sound.
     * Related APIs: If you need advanced reverb/echo/voice changer effect, please use [setReverbAdvancedParam], [setReverbEchoParam], [setVoiceChangerParam] together.
     *
     * @param param The reverberation echo parameter.
     */
    setReverbEchoParam(param) {
        return ZegoExpressEngineImpl.getInstance().setReverbEchoParam(param);
    }
    /**
     * Turn on or off the electronic sound effect.
     *
     * Available since: 2.13.0
     * Description: Call this function to turn on or off the electronic sound effect.
     * Use cases: Often used in live broadcasting, voice chatroom and sung unaccompanied scenes.
     * Default value: When this function is not called, the electronic sound effect is not enabled by default.
     * When to call: It needs to be called after [createEngine].
     * Restrictions: None.
     * Caution: When the mode parameter is Harmonic Minor, the tonal parameter does not take effect.
     * Related APIs: Common electronic sound effect configurations can be set via [setVoiceChangerPreset].
     *
     * @param enable true to turn on the electronic sound effect, false to turn off the electronic sound effect.
     * @param mode Mode of Electronic Effects reference.
     * @param tonal The starting pitch of an electric tone in a given mode, representing 12 semitones in one octave of the sound, in the range [0, 11].
     */
    setElectronicEffects(enable, mode, tonal) {
        return ZegoExpressEngineImpl.getInstance().setElectronicEffects(enable, mode, tonal);
    }
    /**
     * Sends a Broadcast Message.
     *
     * Available since: 1.2.1
     * Description: Send a broadcast message to the room, users who have entered the same room can receive the message, and the message is reliable.
     * Use cases: Generally used when the number of people in the live room does not exceed 500.
     * When to call: After calling [loginRoom] to log in to the room.
     * Restrictions: It is not supported when the number of people online in the room exceeds 500. If you need to increase the limit, please contact ZEGO technical support to apply for evaluation. The frequency of sending broadcast messages in the same room cannot be higher than 10 messages/s. The maximum QPS for a single user calling this interface from the client side is 2. For restrictions on the use of this function, please contact ZEGO technical support.
     * Related callbacks: The room broadcast message can be received through [onIMRecvBroadcastMessage].
     * Related APIs: Barrage messages can be sent through the [sendBarrageMessage] function, and custom command can be sent through the [sendCustomCommand] function.
     *
     * @param roomID Room ID, a string of up to 128 bytes in length.
     *   Caution:
     *   1. room ID is defined by yourself.
     *   2. Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
     *   3. If you need to communicate with the Web SDK, please do not use '%'.
     * @param message The content of the message. Required: Yes. Value range: The length does not exceed 1024 bytes.
     * @return Send broadcast message result callback
     */
    sendBroadcastMessage(roomID, message) {
        return ZegoExpressEngineImpl.getInstance().sendBroadcastMessage(roomID, message);
    }
    /**
     * Sends a Barrage Message (bullet screen) to all users in the same room, without guaranteeing the delivery.
     *
     * Available since: 1.5.0
     * Description: Send a barrage message to the room, users who have logged in to the same room can receive the message, the message is unreliable.
     * Use cases: Generally used in scenarios where there is a large number of messages sent and received in the room and the reliability of the messages is not required, such as live barrage.
     * When to call: After calling [loginRoom] to log in to the room.
     * Restrictions: The frequency of sending barrage messages in the same room cannot be higher than 20 messages/s. For restrictions on the use of this function, please contact ZEGO technical support.
     * Related callbacks: The room barrage message can be received through [onIMRecvBarrageMessage].
     * Related APIs: Broadcast messages can be sent through the [sendBroadcastMessage] function, and custom command can be sent through the [sendCustomCommand] function.
     *
     * @param roomID Room ID, a string of up to 128 bytes in length.
     *   Caution:
     *   1. room ID is defined by yourself.
     *   2. Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
     *   3. If you need to communicate with the Web SDK, please do not use '%'.
     * @param message The content of the message. Required: Yes. Value range: The length does not exceed 1024 bytes.
     * @return Send barrage message result callback.
     */
    sendBarrageMessage(roomID, message) {
        return ZegoExpressEngineImpl.getInstance().sendBarrageMessage(roomID, message);
    }
    /**
     * Sends a Custom Command to the specified users in the same room.
     *
     * Available since: 1.2.1
     * Description: After calling this function, users in the same room who have entered the room can receive the message, the message is unreliable.
     * Use cases: Generally used in scenarios where there is a large number of messages sent and received in the room and the reliability of the messages is not required, such as live barrage.
     * When to call: After calling [loginRoom] to log in to the room.
     * Restrictions: Generally used when the number of people in the live room does not exceed 500.The frequency of sending barrage messages in the same room cannot be higher than 20 messages/s. For restrictions on the use of this function, please contact ZEGO technical support.
     * Related callbacks: The room custom command can be received through [onIMRecvCustomCommand].
     * Related APIs: Broadcast messages can be sent through the [sendBroadcastMessage] function, and barrage messages can be sent through the [sendBarrageMessage] function.
     * Privacy reminder: Please do not fill in sensitive user information in this interface, including but not limited to mobile phone number, ID number, passport number, real name, etc.
     *
     * @param roomID Room ID, a string of up to 128 bytes in length.
     *   Caution:
     *   1. room ID is defined by yourself.
     *   2. Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
     *   3. If you need to communicate with the Web SDK, please do not use '%'.
     * @param command Custom command content. Required: Yes. Value range: The maximum length is 1024 bytes. Caution: To protect privacy, please do not fill in sensitive user information in this interface, including but not limited to mobile phone number, ID number, passport number, real name, etc.
     * @param toUserList List of recipients of signaling. Required: Yes. Value range: user list or [null]. Caution: When it is [null], the SDK will send custom signaling back to all users in the room
     * @return Send barrage message result callback.
     */
    sendCustomCommand(roomID, command, toUserList) {
        return ZegoExpressEngineImpl.getInstance().sendCustomCommand(roomID, command, toUserList);
    }
    /**
     * Creates a media player instance.
     *
     * Available since: 2.1.0
     * Description: Creates a media player instance.
     * Use case: It is often used to play media resource scenes, For example, play video files, push the video of media resources in combination with custom video acquisition, and the remote end can pull the stream for viewing.
     * When to call: It can be called after the SDK by [createEngine] has been initialized.
     * Restrictions: Currently, a maximum of 4 instances can be created, after which it will return null.
     * Caution: The more instances of a media player, the greater the performance overhead on the device.
     * Related APIs: User can call [destroyMediaPlayer] function to destroy a media player instance.
     *
     * @return Media player instance, null will be returned when the maximum number is exceeded.
     */
    createMediaPlayer() {
        return ZegoExpressEngineImpl.getInstance().createMediaPlayer();
    }
    /**
     * Destroys a media player instance.
     *
     * Available since: 2.1.0
     * Description: Destroys a media player instance.
     * Related APIs: User can call [createMediaPlayer] function to create a media player instance.
     *
     * @param mediaPlayer The media player instance object to be destroyed.
     */
    destroyMediaPlayer(mediaPlayer) {
        return ZegoExpressEngineImpl.getInstance().destroyMediaPlayer(mediaPlayer);
    }
    /**
     * Creates a audio effect player instance.
     *
     * Available since: 1.16.0
     * Description: Creates a audio effect player instance.
     * Use cases: When you need to play short sound effects, such as applause, cheers, etc., you can use audioEffectPlayer to achieve.
     * When to call: It can be called after [createEngine].
     * Restrictions: Currently, a maximum of 1 instances can be created, after which it will return null.
     * Related APIs: [destroyAudioEffectPlayer].
     *
     * @return audio effect player instance, null will be returned when the maximum number is exceeded.
     */
    createAudioEffectPlayer() {
        return ZegoExpressEngineImpl.getInstance().createAudioEffectPlayer();
    }
    /**
     * Destroys a audio effect player instance.
     *
     * Available since: 1.16.0
     * Description: Destroys the specified audio effect player instance.
     * When to call: It can be called after [createAudioEffectPlayer].
     * Restrictions: None.
     * Related APIs: [createAudioEffectPlayer].
     *
     * @param audioEffectPlayer The audio effect player instance object to be destroyed.
     */
    destroyAudioEffectPlayer(audioEffectPlayer) {
        return ZegoExpressEngineImpl.getInstance().destroyAudioEffectPlayer(audioEffectPlayer);
    }
    /**
     * Start network speed test. Support set speed test interval。
     *
     * Available since: 1.20.0
     * Description: This function supports uplink/downlink network speed test when the network can be connected.
     * Use cases: This function can be used to detect whether the network environment is suitable for pushing/pulling streams with specified bitrates.
     * When to call: It needs to be called after [loginRoom], and before [startPublishingStream]. If you call [startPublishingStream] while speed testing, the speed test will automatically stop.
     * Restrictions: The maximum allowable test time for a single network speed test is 3 minutes.
     * Caution: Developers can register [onNetworkSpeedTestQualityUpdate] callback to get the speed test result, which will be triggered every 3 seconds. If an error occurs during the speed test process, [onNetworkSpeedTestError] callback will be triggered. If this function is repeatedly called multiple times, the last functioh call's configuration will be used.
     * Related APIs: Call [stopNetworkSpeedTest] to stop network speed test.
     *
     * @param config Network speed test configuration.
     * @param interval Interval of network speed test. In milliseconds, default is 3000 ms.
     */
    startNetworkSpeedTest(config, interval) {
        return ZegoExpressEngineImpl.getInstance().startNetworkSpeedTest(config, interval);
    }
    /**
     * Stop network speed test.
     *
     * Available since: 1.20.0
     * Description: Stop network speed test.
     * Use cases: This function can be used to detect whether the network environment is suitable for pushing/pulling streams with specified bitrates.
     * When to call: It needs to be called after [createEngine].
     * Restrictions: None.
     * Caution: After the network speed test stopped, [onNetworkSpeedTestQualityUpdate] callback will not be triggered.
     * Related APIs: Call [startNetworkSpeedTest] to start network speed test.
     */
    stopNetworkSpeedTest() {
        return ZegoExpressEngineImpl.getInstance().stopNetworkSpeedTest();
    }
    /**
     * Obtain synchronization network time information.
     *
     * Available since: 2.9.0
     * Description: Obtain synchronization network time(NTP), including timestamp and maximum deviation.
     * Use cases: When performing multi-terminal synchronization behaviors, network time synchronization is required.
     * When to call: It needs to be called after [createEngine].
     * Restrictions: None.
     */
    getNetworkTimeInfo() {
        return ZegoExpressEngineImpl.getInstance().getNetworkTimeInfo();
    }
    /**
     * Enables or disables custom video processing.
     *
     * Available since: 2.2.0 (Android/iOS/macOS native), 2.4.0 (Windows/macOS C++).
     * Description: When the developer opens custom pre-processing, by calling [setCustomVideoProcessHandler] you can set the custom video pre-processing callback.
     * Use cases: After the developer collects the video data by himself or obtains the video data collected by the SDK, if the basic beauty and watermark functions of the SDK cannot meet the needs of the developer (for example, the beauty effect cannot meet the expectations), the ZegoEffects SDK can be used to perform the video Some special processing, such as beautifying, adding pendants, etc., this process is the pre-processing of custom video.
     * Default value: Off by default
     * When to call: Must be set before calling [startPreview], [startPublishingStream], [createRealTimeSequentialDataManager]. If you need to modify the configuration, please call [logoutRoom] to log out of the room first, otherwise it will not take effect.
     * Restrictions: None.
     * Related APIs: Call the [setCustomVideoProcessHandler] function to set the callback before custom video processing.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param enable enable or disable. Required: Yes.
     * @param config custom video processing configuration. Required: Yes.Caution: If NULL is passed, the platform default value is used.
     * @param channel Publishing stream channel.Required: No.Default value: Main publish channel.
     */
    enableCustomVideoProcessing(enable, config, channel) {
        return ZegoExpressEngineImpl.getInstance().enableCustomVideoProcessing(enable, config, channel);
    }
    /**
     * Enables the custom audio I/O function (for the specified channel), support PCM, AAC format data.
     *
     * Available since: 1.10.0
     * Description: Enable custom audio IO function, support PCM, AAC format data.
     * Use cases: If the developer wants to implement special functions (such as voice change, bel canto, etc.) through custom processing after the audio data is collected or before the remote audio data is drawn for rendering.
     * When to call: It needs to be called before [startPublishingStream], [startPlayingStream], [startPreview], [createMediaPlayer], [createAudioEffectPlayer] and [createRealTimeSequentialDataManager] to be effective.
     * Restrictions: None.
     *
     * @param enable Whether to enable custom audio IO, default is false.
     * @param config Custom audio IO config.
     * @param channel Specify the publish channel to enable custom audio IO.
     */
    enableCustomAudioIO(enable, config, channel) {
        return ZegoExpressEngineImpl.getInstance().enableCustomAudioIO(enable, config, channel);
    }
    /**
     * Start screen capture, in-app capture only.
     *
     * Available since: 3.1.0
     * Description: Start screen capture.
     * When to call: After calling the [setVideoSource] function to set the video source to `ScreenCapture`.
     * Restrictions: Only valid for iOS system
     *
     * @param config Screen capture parameter configuration.
     */
    startScreenCaptureInApp(config) {
        return ZegoExpressEngineImpl.getInstance().startScreenCaptureInApp(config);
    }
    /**
     * Start screen capture.
     *
     * Available since: 3.1.0
     * Description: Start screen capture.
     * When to call: After calling the [setVideoSource] function to set the video source to `ScreenCapture`.
     *
     * @param config Screen capture parameter configuration (Only valid for iOS system).
     */
    startScreenCapture(config) {
        return ZegoExpressEngineImpl.getInstance().startScreenCapture(config);
    }
    /**
     * Stop screen capture.
     *
     * Available since: 3.1.0
     * Description: Stop screen capture.
     */
    stopScreenCapture() {
        return ZegoExpressEngineImpl.getInstance().stopScreenCapture();
    }
    /**
     * Update screen capture parameter configuration.
     *
     * Available since: 3.1.0
     * Description: Update screen capture parameter configuration.
     * When to call: After calling [startScreenCapture] to start capturing.
     * Restrictions: Only valid for iOS system
     *
     * @param config Screen capture parameter configuration.
     */
    updateScreenCaptureConfig(config) {
        return ZegoExpressEngineImpl.getInstance().updateScreenCaptureConfig(config);
    }
    /**
     * [Deprecated] Enables or disables the beauty features for the specified publish channel. Deprecated since 2.16.0, please use the [enableEffectsBeauty] function instead.
     *
     * Available since: 1.1.0
     * Description: When developers do not have much need for beauty features, they can use this function to set some very simple beauty effects.
     * When to call: It needs to be called after [createEngine].
     * Default value: When this function is not called, the beauty feature is not enabled by default.
     * Related APIs: After turning on the beauty features, you can call the [setBeautifyOption] function to adjust the beauty parameters.
     * Caution: This beauty feature is very simple and may not meet the developer’s expectations. It is recommended to use the custom video processing function [enableCustomVideoProcessing] or the custom video capture function [enableCustomVideoCapture] to connect the [ZegoEffects] AI SDK https://docs.zegocloud.com/article/9896 for best results.
     * Restrictions: In the case of using the custom video capture function, since the developer has handle the video data capturing, the SDK is no longer responsible for the video data capturing, so this function is no longer valid. It is also invalid when using the custom video processing function.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @deprecated Deprecated since 2.16.0, please use the [enableEffectsBeauty] function instead.
     * @param featureBitmask Beauty features, bitmask format, you can choose to enable several features in [ZegoBeautifyFeature] at the same time
     * @param channel Publishing stream channel
     */
    enableBeautify(featureBitmask, channel) {
        return ZegoExpressEngineImpl.getInstance().enableBeautify(featureBitmask, channel);
    }
    /**
     * [Deprecated] Set beautify option. Deprecated since 2.16.0, please use the [setEffectsBeautyParam] function instead.
     *
     * Available since: 1.1.0
     * Description: set beautify option for main publish channel.
     * Use cases: Often used in video call, live broadcasting.
     * When to call: It needs to be called after [createEngine].
     * Restrictions: None.
     * Caution: In the case of using a custom video capture function, because the developer has taken over the video data capturing, the SDK is no longer responsible for the video data capturing, call this function will not take effect. When using custom video processing, the video data collected by the SDK will be handed over to the business for further processing, call this function will not take effect either.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @deprecated Deprecated since 2.16.0, please use the [setEffectsBeautyParam] function instead.
     * @param option Beautify option.
     * @param channel stream publish channel.
     */
    setBeautifyOption(option, channel) {
        return ZegoExpressEngineImpl.getInstance().setBeautifyOption(option, channel);
    }
    /**
     * [Deprecated] Create ZegoExpressEngine singleton object and initialize SDK. Deprecated since 2.14.0, please use the method with the same name without [isTestEnv] parameter instead. Please refer to [Testing environment deprecation](https://docs.zegocloud.com/article/13315) for more details.
     *
     * Available: 1.1.0 ~ 2.13.1, deprecated since 2.14.0, please use the method with the same name without [isTestEnv] parameter instead
     * Description: Create ZegoExpressEngine singleton object and initialize SDK.
     * When to call: The engine needs to be created before calling other functions.
     * Restrictions: None.
     * Caution: The SDK only supports the creation of one instance of ZegoExpressEngine. Multiple calls to this function return the same object.
     *
     * @deprecated Deprecated since 2.14.0, please use the method with the same name without [isTestEnv] parameter instead.
     * @param appID Application ID issued by ZEGO for developers, please apply from the ZEGO Admin Console https://console.zegocloud.com The value ranges from 0 to 4294967295.
     * @param appSign Application signature for each AppID, please apply from the ZEGO Admin Console. Application signature is a 64 character string. Each character has a range of '0' ~ '9', 'a' ~ 'z'. AppSign 2.17.0 and later allows null or no transmission. If the token is passed empty or not passed, the token must be entered in the [ZegoRoomConfig] parameter for authentication when the [loginRoom] interface is called to login to the room.
     * @param isTestEnv [Deprecated] For providing better and more standardized services, starting from 2021-11-16, ZEGO no longer classifies environments into production environments and testing environments. f you create your project in ZEGO Admin Console on/before 2021-11-16, refer to [Testing environment deprecation](https://docs.zegocloud.com/article/13315) to upgrade the SDK and adjust related codes.
     * @param scenario The room scenario. the SDK will optimize the audio and video configuration for the specified scenario to achieve the best effect in this scenario. After specifying the scenario, you can call other APIs to adjusting the audio and video configuration. Differences between scenarios and how to choose a suitable scenario, please refer to https://docs.zegocloud.com/article/14940
     * @return Engine singleton instance.
     */
    static createEngine(appID, appSign, isTestEnv, scenario) {
        return ZegoExpressEngineImpl.createEngine(appID, appSign, isTestEnv, scenario);
    }
}
