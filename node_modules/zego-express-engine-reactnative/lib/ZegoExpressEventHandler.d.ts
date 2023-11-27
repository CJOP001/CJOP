import * as zego from "./ZegoExpressDefines";
export interface ZegoEventListener {
    /**
     * The callback for obtaining debugging error information.
     *
     * Available since: 1.1.0
     * Description: When the SDK functions are not used correctly, the callback prompts for detailed error information.
     * Trigger: Notify the developer when an exception occurs in the SDK.
     * Restrictions: None.
     * Caution: None.
     *
     * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
     * @param funcName Function name.
     * @param info Detailed error information.
     */
    debugError: (errorCode: number, funcName: string, info: string) => void;
    /**
     * Method execution result callback
     *
     * Available since: 2.3.0
     * Description: When the monitoring is turned on through [setApiCalledCallback], the results of the execution of all methods will be called back through this callback.
     * Trigger: When the developer calls the SDK method, the execution result of the method is called back.
     * Restrictions: None.
     * Caution: It is recommended to monitor and process this callback in the development and testing phases, and turn off the monitoring of this callback after going online.
     *
     * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
     * @param funcName Function name.
     * @param info Detailed error information.
     */
    apiCalledResult: (errorCode: number, funcName: string, info: string) => void;
    /**
     * The callback triggered when the audio/video engine state changes.
     *
     * Available since: 1.1.0
     * Description: Callback notification of audio/video engine status update. When audio/video functions are enabled, such as preview, push streaming, local media player, audio data observering, etc., the audio/video engine will enter the start state. When you exit the room or disable all audio/video functions , The audio/video engine will enter the stop state.
     * Trigger: The developer called the relevant function to change the state of the audio and video engine. For example: 1. Called ZegoExpressEngine's [startPreview], [stopPreview], [startPublishingStream], [stopPublishingStream], [startPlayingStream], [stopPlayingStream], [startAudioDataObserver], [stopAudioDataObserver] and other functions. 2. The related functions of MediaPlayer are called. 3. The [LogoutRoom] function was called. 4. The related functions of RealTimeSequentialDataManager are called.
     * Restrictions: None.
     * Caution:
     *   1. When the developer calls [destroyEngine], this notification will not be triggered because the resources of the SDK are completely released.
     *   2. If there is no special need, the developer does not need to pay attention to this callback.
     *
     * @param state The audio/video engine state.
     */
    engineStateUpdate: (state: zego.ZegoEngineState) => void;
    /**
     * The callback triggered when the room connection state changes.
     *
     * Available since: 1.1.0
     * Description: This callback is triggered when the connection status of the room changes, and the reason for the change is notified.For versions 2.18.0 and above, it is recommended to use the onRoomStateChanged callback instead of the onRoomStateUpdate callback to monitor room state changes.
     * Use cases: Developers can use this callback to determine the status of the current user in the room.
     * When to trigger:
     *  1. The developer will receive this notification when calling the [loginRoom], [logoutRoom], [switchRoom] functions.
     *  2. This notification may also be received when the network condition of the user's device changes (SDK will automatically log in to the room when disconnected, please refer to [Does ZEGO SDK support a fast reconnection for temporary disconnection] for details](https://docs.zegocloud.com/faq/reconnect?product=ExpressVideo&platform=all).
     * Restrictions: None.
     * Caution: If the connection is being requested for a long time, the general probability is that the user's network is unstable.
     * Related APIs: [loginRoom]、[logoutRoom]、[switchRoom]
     *
     * @param roomID Room ID, a string of up to 128 bytes in length.
     * @param state Changed room state.
     * @param errorCode Error code, For details, please refer to [Common Error Codes](https://docs.zegocloud.com/article/5548).
     * @param extendedData Extended Information with state updates. When the room login is successful, the key "room_session_id" can be used to obtain the unique RoomSessionID of each audio and video communication, which identifies the continuous communication from the first user in the room to the end of the audio and video communication. It can be used in scenarios such as call quality scoring and call problem diagnosis.
     */
    roomStateUpdate: (roomID: string, state: zego.ZegoRoomState, errorCode: number, extendedData: string) => void;
    /**
     * The callback triggered when the room connection state changes.
     *
     * Available since: 2.18.0
     * Description: This callback is triggered when the connection status of the room changes, and the reason for the change is notified.For versions 2.18.0 and above, it is recommended to use the onRoomStateChanged callback instead of the onRoomStateUpdate callback to monitor room state changes.
     * Use cases: Developers can use this callback to determine the status of the current user in the room.
     * When to trigger: Users will receive this notification when they call room functions (refer to [Related APIs]). 2. This notification may also be received when the user device's network conditions change (SDK will automatically log in to the room again when the connection is disconnected, refer to https://doc-zh.zego.im/faq/reconnect ).
     * Restrictions: None.
     * Caution: If the connection is being requested for a long time, the general probability is that the user's network is unstable.
     * Related APIs: [loginRoom], [logoutRoom], [switchRoom]
     *
     * @param roomID Room ID, a string of up to 128 bytes in length.
     * @param reason Room state change reason.
     * @param errorCode Error code, please refer to the error codes document https://doc-en.zego.im/en/5548.html for details.
     * @param extendedData Extended Information with state updates. When the room login is successful, the key "room_session_id" can be used to obtain the unique RoomSessionID of each audio and video communication, which identifies the continuous communication from the first user in the room to the end of the audio and video communication. It can be used in scenarios such as call quality scoring and call problem diagnosis.
     */
    roomStateChanged: (roomID: string, reason: zego.ZegoRoomStateChangedReason, errorCode: number, extendedData: string) => void;
    /**
     * The callback triggered when the number of other users in the room increases or decreases.
     *
     * Available since: 1.1.0
     * Description: When other users in the room are online or offline, which causes the user list in the room to change, the developer will be notified through this callback.
     * Use cases: Developers can use this callback to update the user list display in the room in real time.
     * When to trigger:
     *   1. When the user logs in to the room for the first time, if there are other users in the room, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeAdd], and `userList` is the other users in the room at this time.
     *   2. The user is already in the room. If another user logs in to the room through the [loginRoom] or [switchRoom] functions, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeAdd].
     *   3. If other users log out of this room through the [logoutRoom] or [switchRoom] functions, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeDelete].
     *   4. The user is already in the room. If another user is kicked out of the room from the server, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeDelete].
     * Restrictions: If developers need to use ZEGO room users notifications, please ensure that the [ZegoRoomConfig] sent by each user when logging in to the room has the [isUserStatusNotify] property set to true, otherwise the callback notification will not be received.
     * Related APIs: [loginRoom]、[logoutRoom]、[switchRoom]
     *
     * @param roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @param updateType Update type (add/delete).
     * @param userList List of users changed in the current room.
     */
    roomUserUpdate: (roomID: string, updateType: zego.ZegoUpdateType, userList: zego.ZegoUser[]) => void;
    /**
     * The callback triggered every 30 seconds to report the current number of online users.
     *
     * Available since: 1.7.0
     * Description: This method will notify the user of the current number of online users in the room..
     * Use cases: Developers can use this callback to show the number of user online in the current room.
     * When to call /Trigger: After successfully logging in to the room.
     * Restrictions: None.
     * Caution: 1. This function is called back every 30 seconds. 2. Because of this design, when the number of users in the room exceeds 500, there will be some errors in the statistics of the number of online people in the room.
     *
     * @param roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @param count Count of online users.
     */
    roomOnlineUserCountUpdate: (roomID: string, count: number) => void;
    /**
     * The callback triggered when the number of streams published by the other users in the same room increases or decreases.
     *
     * Available since: 1.1.0
     * Description: When other users in the room start streaming or stop streaming, the streaming list in the room changes, and the developer will be notified through this callback.
     * Use cases: This callback is used to monitor stream addition or stream deletion notifications of other users in the room. Developers can use this callback to determine whether other users in the same room start or stop publishing stream, so as to achieve active playing stream [startPlayingStream] or take the initiative to stop the playing stream [stopPlayingStream], and use it to change the UI controls at the same time.
     * When to trigger:
     *   1. When the user logs in to the room for the first time, if there are other users publishing streams in the room, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeAdd], and `streamList` is an existing stream list.
     *   2. The user is already in the room. if another user adds a new push, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeAdd].
     *   3. The user is already in the room. If other users stop streaming, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeDelete].
     *   4. The user is already in the room. If other users leave the room, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeDelete].
     * Restrictions: None.
     *
     * @param roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @param updateType Update type (add/delete).
     * @param streamList Updated stream list.
     * @param extendedData Extended information with stream updates.
     */
    roomStreamUpdate: (roomID: string, updateType: zego.ZegoUpdateType, streamList: zego.ZegoStream[], extendedData: string) => void;
    /**
     * The callback triggered when there is an update on the extra information of the streams published by other users in the same room.
     *
     * Available since: 1.1.0
     * Description: All users in the room will be notified by this callback when the extra information of the stream in the room is updated.
     * Use cases: Users can realize some business functions through the characteristics of stream extra information consistent with stream life cycle.
     * When to call /Trigger: When a user publishing the stream update the extra information of the stream in the same room, other users in the same room will receive the callback.
     * Restrictions: None.
     * Caution: Unlike the stream ID, which cannot be modified during the publishing process, the stream extra information can be updated during the life cycle of the corresponding stream ID.
     * Related APIs: Users who publish stream can set extra stream information through [setStreamExtraInfo].
     *
     * @param roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @param streamList List of streams that the extra info was updated.
     */
    roomStreamExtraInfoUpdate: (roomID: string, streamList: zego.ZegoStream[]) => void;
    /**
     * The callback triggered when there is an update on the extra information of the room.
     *
     * Available since: 1.1.0
     * Description: After the room extra information is updated, all users in the room will be notified except update the room extra information user.
     * Use cases: Extra information for the room.
     * When to call /Trigger: When a user update the room extra information, other users in the same room will receive the callback.
     * Restrictions: None.
     * Related APIs: Users can update room extra information through [setRoomExtraInfo] function.
     *
     * @param roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @param roomExtraInfoList List of the extra info updated.
     */
    roomExtraInfoUpdate: (roomID: string, roomExtraInfoList: zego.ZegoRoomExtraInfo[]) => void;
    /**
     * Callback notification that room Token authentication is about to expire.
     *
     * Available since: 2.8.0
     * Description: The callback notification that the room Token authentication is about to expire, please use [renewToken] to update the room Token authentication.
     * Use cases: In order to prevent illegal entry into the room, it is necessary to perform authentication control on login room, push streaming, etc., to improve security.
     * When to call /Trigger: 30 seconds before the Token expires, the SDK will call [onRoomTokenWillExpire] to notify developer.
     * Restrictions: None.
     * Caution: The token contains important information such as the user's room permissions, publish stream permissions, and effective time, please refer to https://docs.zegocloud.com/article/11649.
     * Related APIs: When the developer receives this callback, he can use [renewToken] to update the token authentication information.
     *
     * @param roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
     * @param remainTimeInSecond The remaining time before the token expires.
     */
    roomTokenWillExpire: (roomID: string, remainTimeInSecond: number) => void;
    /**
     * The callback triggered when the state of stream publishing changes.
     *
     * Available since: 1.1.0
     * Description: After calling the [startPublishingStream] successfully, the notification of the publish stream state change can be obtained through the callback function. You can roughly judge the user's uplink network status based on whether the state parameter is in [PUBLISH_REQUESTING].
     * Caution: The parameter [extendedData] is extended information with state updates. If you use ZEGO's CDN content distribution network, after the stream is successfully published, the keys of the content of this parameter are [flv_url_list], [rtmp_url_list], [hls_url_list], these correspond to the publishing stream URLs of the flv, rtmp, and hls protocols.
     * Related callbacks: After calling the [startPlayingStream] successfully, the notification of the play stream state change can be obtained through the callback function [onPlayerStateUpdate]. You can roughly judge the user's downlink network status based on whether the state parameter is in [PLAY_REQUESTING].
     *
     * @param streamID Stream ID.
     * @param state State of publishing stream.
     * @param errorCode The error code corresponding to the status change of the publish stream, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
     * @param extendedData Extended information with state updates, include playing stream CDN address.
     */
    publisherStateUpdate: (streamID: string, state: zego.ZegoPublisherState, errorCode: number, extendedData: string) => void;
    /**
     * Callback for current stream publishing quality.
     *
     * Available since: 1.1.0
     * Description: After calling the [startPublishingStream] successfully, the callback will be received every 3 seconds default(If you need to change the time, please contact the instant technical support to configure). Through the callback, the collection frame rate, bit rate, RTT, packet loss rate and other quality data of the published audio and video stream can be obtained, and the health of the publish stream can be monitored in real time.You can monitor the health of the published audio and video streams in real time according to the quality parameters of the callback function, in order to show the uplink network status in real time on the device UI.
     * Caution: If you does not know how to use the parameters of this callback function, you can only pay attention to the [level] field of the [quality] parameter, which is a comprehensive value describing the uplink network calculated by SDK based on the quality parameters.
     * Related callbacks: After calling the [startPlayingStream] successfully, the callback [onPlayerQualityUpdate] will be received every 3 seconds. You can monitor the health of play streams in real time based on quality data such as frame rate, code rate, RTT, packet loss rate, etc.
     *
     * @param streamID Stream ID.
     * @param quality Publishing stream quality, including audio and video framerate, bitrate, RTT, etc.
     */
    publisherQualityUpdate: (streamID: string, quality: zego.ZegoPublishStreamQuality) => void;
    /**
     * The callback triggered when the first audio frame is captured.
     *
     * Available since: 1.1.0
     * Description: After the [startPublishingStream] function is called successfully, this callback will be called when SDK received the first frame of audio data. Developers can use this callback to determine whether SDK has actually collected audio data. If the callback is not received, the audio capture device is occupied or abnormal.
     * Trigger: In the case of no startPublishingStream audio and video stream or preview [startPreview], the first startPublishingStream audio and video stream or first preview, that is, when the engine of the audio and video module inside SDK starts, it will collect audio data of the local device and receive this callback.
     * Related callbacks: After the [startPublishingStream] function is called successfully, determine if the SDK actually collected video data by the callback function [onPublisherCapturedVideoFirstFrame], determine if the SDK has rendered the first frame of video data collected by calling back [onPublisherRenderVideoFirstFrame].
     */
    publisherCapturedAudioFirstFrame: () => void;
    /**
     * The callback triggered when the first video frame is captured.
     *
     * Available since: 1.1.0
     * Description: After the [startPublishingStream] function is called successfully, this callback will be called when SDK received the first frame of video data. Developers can use this callback to determine whether SDK has actually collected video data. If the callback is not received, the video capture device is occupied or abnormal.
     * Trigger: In the case of no startPublishingStream video stream or preview, the first startPublishingStream video stream or first preview, that is, when the engine of the audio and video module inside SDK starts, it will collect video data of the local device and receive this callback.
     * Related callbacks: After the [startPublishingStream] function is called successfully, determine if the SDK actually collected audio data by the callback function [onPublisherCapturedAudioFirstFrame], determine if the SDK has rendered the first frame of video data collected by calling back [onPublisherRenderVideoFirstFrame].
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param channel Publishing stream channel.If you only publish one audio and video stream, you can ignore this parameter.
     */
    publisherCapturedVideoFirstFrame: (channel: zego.ZegoPublishChannel) => void;
    /**
     * The callback triggered when the first video frame is rendered.
     *
     * Available since: 2.4.0
     * Description: this callback will be called after SDK rendered the first frame of video data captured. This interface is for preview rendering. The first frame callback is only available for external collection and internal preview. If it is not for SDK rendering, there is no such callback.
     * Related callbacks: After the [startPublishingStream] function is called successfully, determine if the SDK actually collected audio data by the callback function [onPublisherCapturedAudioFirstFrame], determine if the SDK actually collected video data by the callback function [onPublisherCapturedVideoFirstFrame].
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param channel Publishing stream channel.If you only publish one audio and video stream, you can ignore this parameter.
     */
    publisherRenderVideoFirstFrame: (channel: zego.ZegoPublishChannel) => void;
    /**
     * The callback triggered when the video capture resolution changes.
     *
     * Available since: 1.1.0
     * Description: When the audio and video stream is not published [startPublishingStream] or previewed [startPreview] for the first time, the publishing stream or preview first time, that is, the engine of the audio and video module inside the SDK is started, the video data of the local device will be collected, and the collection resolution will change at this time.
     * Trigger: After the successful publish [startPublishingStream], the callback will be received if there is a change in the video capture resolution in the process of publishing the stream.
     * Use cases: You can use this callback to remove the cover of the local preview UI and similar operations.You can also dynamically adjust the scale of the preview view based on the resolution of the callback.
     * Caution: What is notified during external collection is the change in encoding resolution, which will be affected by flow control.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param width Video capture resolution width.
     * @param height Video capture resolution height.
     * @param channel Publishing stream channel.If you only publish one audio and video stream, you can ignore this parameter.
     */
    publisherVideoSizeChanged: (width: number, height: number, channel: zego.ZegoPublishChannel) => void;
    /**
     * The callback triggered when the state of relayed streaming to CDN changes.
     *
     * Available since: 1.1.0
     * Description: Developers can use this callback to determine whether the audio and video streams of the relay CDN are normal. If they are abnormal, further locate the cause of the abnormal audio and video streams of the relay CDN and make corresponding disaster recovery strategies.
     * Trigger: After the ZEGO RTC server relays the audio and video streams to the CDN, this callback will be received if the CDN relay status changes, such as a stop or a retry.
     * Caution: If you do not understand the cause of the abnormality, you can contact ZEGO technicians to analyze the specific cause of the abnormality.
     *
     * @param streamID Stream ID.
     * @param infoList List of information that the current CDN is relaying.
     */
    publisherRelayCDNStateUpdate: (streamID: string, infoList: zego.ZegoStreamRelayCDNInfo[]) => void;
    /**
     * The callback triggered when the video encoder changes in publishing stream.
     *
     * Available since: 2.12.0
     * Description: After the H.265 automatic downgrade policy is enabled, if H.265 encoding is not supported or the encoding fails during the streaming process with H.265 encoding, the SDK will actively downgrade to the specified encoding (H.264), and this callback will be triggered at this time.
     * When to trigger: In the process of streaming with H.265 encoding, if H.265 encoding is not supported or encoding fails, the SDK will actively downgrade to the specified encoding (H.264), and this callback will be triggered at this time.
     * Caution: When this callback is triggered, if local video recording or cloud recording is in progress, multiple recording files will be generated. Developers need to collect all the recording files for processing after the recording ends. When this callback is triggered, because the streaming code has changed, the developer can evaluate whether to notify the streaming end, so that the streaming end can deal with it accordingly.
     *
     * @param fromCodecID Video codec ID before the change.
     * @param toCodecID Video codec ID after the change.
     * @param channel Publishing stream channel.If you only publish one audio and video stream, you can ignore this parameter.
     */
    publisherVideoEncoderChanged: (fromCodecID: zego.ZegoVideoCodecID, toCodecID: zego.ZegoVideoCodecID, channel: zego.ZegoPublishChannel) => void;
    /**
     * The callback triggered when publishing stream.
     *
     * Available since: 2.18.0
     * Description: After start publishing stream, this callback will return the current stream address, resource type and protocol-related information.
     * When to trigger: Publish and retry publish events.
     * Caution: None.
     *
     * @param eventID Publish stream event ID
     * @param streamID Stream ID.
     * @param extraInfo extra info. it is in JSON format. Included information includes "url" for address, "streamProtocol" for stream protocol, including rtmp, flv, avertp, hls, webrtc, etc. "netProtocol" for network protocol, including tcp, udp, quic, "resourceType" for resource type , including cdn, rtc, l3.
     */
    publisherStreamEvent: (eventID: zego.ZegoStreamEvent, streamID: string, extraInfo: string) => void;
    /**
     * The callback triggered when the state of stream playing changes.
     *
     * Available since: 1.1.0
     * Description: After calling the [startPlayingStream] successfully, the notification of the playing stream state change can be obtained through the callback function. You can roughly judge the user's downlink network status based on whether the state parameter is in [PLAY_REQUESTING].
     * When to trigger:  After calling the [startPublishingStream], this callback is triggered when a playing stream's state changed.
     * Related callbacks: After calling the [startPublishingStream] successfully, the notification of the publish stream state change can be obtained through the callback function [onPublisherStateUpdate]. You can roughly judge the user's uplink network status based on whether the state parameter is in [PUBLISH_REQUESTING].
     *
     * @param streamID stream ID.
     * @param state State of playing stream.
     * @param errorCode The error code corresponding to the status change of the playing stream, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
     * @param extendedData Extended Information with state updates. As the standby, only an empty json table is currently returned.
     */
    playerStateUpdate: (streamID: string, state: zego.ZegoPlayerState, errorCode: number, extendedData: string) => void;
    /**
     * Callback for current stream playing quality.
     *
     * Available since: 1.1.0
     * Description: After calling the [startPlayingStream] successfully, this callback will be triggered every 3 seconds. The collection frame rate, bit rate, RTT, packet loss rate and other quality data can be obtained, and the health of the played audio and video streams can be monitored in real time.
     * Use cases: You can monitor the health of the played audio and video streams in real time according to the quality parameters of the callback function, in order to show the downlink network status on the device UI in real time.
     * Caution: If you does not know how to use the various parameters of the callback function, you can only focus on the level field of the quality parameter, which is a comprehensive value describing the downlink network calculated by SDK based on the quality parameters.
     * Related callbacks: After calling the [startPublishingStream] successfully, a callback [onPublisherQualityUpdate] will be received every 3 seconds. You can monitor the health of publish streams in real time based on quality data such as frame rate, code rate, RTT, packet loss rate, etc.
     *
     * @param streamID Stream ID.
     * @param quality Playing stream quality, including audio and video framerate, bitrate, RTT, etc.
     */
    playerQualityUpdate: (streamID: string, quality: zego.ZegoPlayStreamQuality) => void;
    /**
     * The callback triggered when a media event occurs during streaming playing.
     *
     * Available since: 1.1.0
     * Description: This callback is used to receive pull streaming events.
     * Use cases: You can use this callback to make statistics on stutters or to make friendly displays in the UI of the app.
     * When to trigger:  After calling the [startPublishingStream], this callback is triggered when an event such as audio and video jamming and recovery occurs in the playing stream.
     *
     * @param streamID Stream ID.
     * @param event Specific events received when playing the stream.
     */
    playerMediaEvent: (streamID: string, event: zego.ZegoPlayerMediaEvent) => void;
    /**
     * The callback triggered when the first audio frame is received.
     *
     * Available since: 1.1.0
     * Description: After the [startPlayingStream] function is called successfully, this callback will be called when SDK received the first frame of audio data.
     * Use cases: Developer can use this callback to count time consuming that take the first frame time or update the UI for playing stream.
     * Trigger: This callback is triggered when SDK receives the first frame of audio data from the network.
     * Related callbacks: After a successful call to [startPlayingStream], the callback function [onPlayerRecvVideoFirstFrame] determines whether the SDK has received the video data, and the callback [onPlayerRenderVideoFirstFrame] determines whether the SDK has rendered the first frame of the received video data.
     *
     * @param streamID Stream ID.
     */
    playerRecvAudioFirstFrame: (streamID: string) => void;
    /**
     * The callback triggered when the first video frame is received.
     *
     * Available since: 1.1.0
     * Description: After the [startPlayingStream] function is called successfully, this callback will be called when SDK received the first frame of video data.
     * Use cases: Developer can use this callback to count time consuming that take the first frame time or update the UI for playing stream.
     * Trigger: This callback is triggered when SDK receives the first frame of video data from the network.
     * Related callbacks: After a successful call to [startPlayingStream], the callback function [onPlayerRecvAudioFirstFrame] determines whether the SDK has received the audio data, and the callback [onPlayerRenderVideoFirstFrame] determines whether the SDK has rendered the first frame of the received video data.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param streamID Stream ID.
     */
    playerRecvVideoFirstFrame: (streamID: string) => void;
    /**
     * The callback triggered when the first video frame is rendered.
     *
     * Available since: 1.1.0
     * Description: After the [startPlayingStream] function is called successfully, this callback will be called when SDK rendered the first frame of video data.
     * Use cases: Developer can use this callback to count time consuming that take the first frame time or update the UI for playing stream.
     * Trigger: This callback is triggered when SDK rendered the first frame of video data from the network.
     * Related callbacks: After a successful call to [startPlayingStream], the callback function [onPlayerRecvAudioFirstFrame] determines whether the SDK has received the audio data, and the callback [onPlayerRecvVideoFirstFrame] determines whether the SDK has received the video data.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param streamID Stream ID.
     */
    playerRenderVideoFirstFrame: (streamID: string) => void;
    /**
     * The callback triggered when the stream playback resolution changes.
     *
     * Available since: 1.1.0
     * Description: After the [startPlayingStream] function is called successfully, the play resolution will change when the first frame of video data is received, or when the publisher changes the encoding resolution by calling [setVideoConfig], or when the network traffic control strategies work.
     * Use cases: Developers can update or switch the UI components that actually play the stream based on the final resolution of the stream.
     * Trigger: After the [startPlayingStream] function is called successfully, this callback is triggered when the video resolution changes while playing the stream.
     * Caution: If the stream is only audio data, the callback will not be triggered.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param streamID Stream ID.
     * @param width Video decoding resolution width.
     * @param height Video decoding resolution height.
     */
    playerVideoSizeChanged: (streamID: string, width: number, height: number) => void;
    /**
     * The callback triggered when the state of relayed streaming of the mixed stream to CDN changes.
     *
     * Available since: 1.2.1
     * Description: The general situation of the mixing task on the ZEGO RTC server will push the output stream to the CDN using the RTMP protocol, and the state change during the push process will be notified from the callback function.
     * Use cases: It is often used when multiple video images are required to synthesize a video using mixed streaming, such as education, live teacher and student images.
     * When to trigger: After the developer calls the [startMixerTask] function to start mixing, when the ZEGO RTC server pushes the output stream to the CDN, there is a state change.
     * Restrictions: None.
     * Related callbacks: Develop can get the sound update notification of each single stream in the mixed stream through [OnMixerSoundLevelUpdate].
     * Related APIs: Develop can start a mixed flow task through [startMixerTask].
     *
     * @param taskID The mixing task ID. Value range: the length does not exceed 256. Caution: This parameter is in string format and cannot contain URL keywords, such as 'http' and '?' etc., otherwise the push and pull flow will fail. Only supports numbers, English characters and'~','!','@','$','%','^','&','*','(',')','_' ,'+','=','-','`',';',''',',','.','<','>','/','\'.
     * @param infoList List of information that the current CDN is being mixed.
     */
    mixerRelayCDNStateUpdate: (taskID: string, infoList: zego.ZegoStreamRelayCDNInfo[]) => void;
    /**
     * The callback triggered when the sound level of any input stream changes in the stream mixing process.
     *
     * Available since: 1.2.1
     * Description: Developers can use this callback to display the effect of which stream’s anchor is talking on the UI interface of the mixed stream of the audience.
     * Use cases: It is often used when multiple video images are required to synthesize a video using mixed streaming, such as education, live teacher and student images.
     * When to trigger: After the developer calls the [startPlayingStream] function to start playing the mixed stream. Callback notification period is 100 ms.
     * Restrictions: The callback is triggered every 100 ms, and the trigger frequency cannot be set.Due to the high frequency of this callback, please do not perform time-consuming tasks or UI operations in this callback to avoid stalling.
     * Related callbacks: [OnMixerRelayCDNStateUpdate] can be used to get update notification of mixing stream repost CDN status.
     * Related APIs: Develop can start a mixed flow task through [startMixerTask].
     *
     * @param soundLevels The sound key-value pair of each single stream in the mixed stream, the key is the soundLevelID of each single stream, and the value is the sound value of the corresponding single stream. Value range: The value range of value is 0.0 ~ 100.0.
     */
    mixerSoundLevelUpdate: (soundLevels: Map<number, number>) => void;
    /**
     * The local captured audio sound level callback.
     *
     * Available since: 1.1.0
     * Description: The local captured audio sound level callback.
     * Trigger: After you start the sound level monitor by calling [startSoundLevelMonitor].
     * Caution:
     *   1. The callback notification period is the parameter value set when the [startSoundLevelMonitor] is called. The callback value is the default value of 0 When you have not called the interface [startPublishingStream] and [startPreview].
     *   2. This callback is a high-frequency callback, and it is recommended not to do complex logic processing inside the callback.
     * Related APIs: Start sound level monitoring via [startSoundLevelMonitor]. Monitoring remote played audio sound level by callback [onRemoteSoundLevelUpdate]
     *
     * @param soundLevel Locally captured sound level value, ranging from 0.0 to 100.0.
     */
    capturedSoundLevelUpdate: (soundLevel: number) => void;
    /**
     * The remote playing streams audio sound level callback.
     *
     * Available since: 1.1.0
     * Description: The remote playing streams audio sound level callback.
     * Trigger: After you start the sound level monitor by calling [startSoundLevelMonitor], you are in the state of playing the stream [startPlayingStream].
     * Caution: The callback notification period is the parameter value set when the [startSoundLevelMonitor] is called.
     * Related APIs: Start sound level monitoring via [startSoundLevelMonitor]. Monitoring local captured audio sound by callback [onCapturedSoundLevelUpdate] or [onCapturedSoundLevelInfoUpdate].
     *
     * @param soundLevels Remote sound level hash map, key is the streamID, value is the sound level value of the corresponding streamID, value ranging from 0.0 to 100.0.
     */
    remoteSoundLevelUpdate: (soundLevels: Map<string, number>) => void;
    /**
     * The callback triggered when a local device exception occurred.
     *
     * Available since: 2.15.0
     * Description: The callback triggered when a local device exception occurs.
     * Trigger: This callback is triggered when the function of the local audio or video device is abnormal.
     *
     * @param exceptionType The type of the device exception.
     * @param deviceType The type of device where the exception occurred.
     * @param deviceID Device ID. Currently, only desktop devices are supported to distinguish different devices; for mobile devices, this parameter will return an empty string.
     */
    localDeviceExceptionOccurred: (exceptionType: zego.ZegoDeviceExceptionType, deviceType: zego.ZegoDeviceType, deviceID: string) => void;
    /**
     * The callback triggered when the state of the remote camera changes.
     *
     * Available since: 1.1.0
     * Description: The callback triggered when the state of the remote camera changes.
     * Use cases: Developers of 1v1 education scenarios or education small class scenarios and similar scenarios can use this callback notification to determine whether the camera device of the remote publishing stream device is working normally, and preliminary understand the cause of the device problem according to the corresponding state.
     * Trigger: When the state of the remote camera device changes, such as switching the camera, by monitoring this callback, it is possible to obtain an event related to the far-end camera, which can be used to prompt the user that the video may be abnormal.
     * Caution: This callback will not be called back when the remote stream is play from the CDN, or when custom video acquisition is used at the peer.
     * Note: This function is only available in ZegoExpressVideo SDK!
     *
     * @param streamID Stream ID.
     * @param state Remote camera status.
     */
    remoteCameraStateUpdate: (streamID: string, state: zego.ZegoRemoteDeviceState) => void;
    /**
     * The callback triggered when the state of the remote microphone changes.
     *
     * Available since: 1.1.0
     * Description: The callback triggered when the state of the remote microphone changes.
     * Use cases: Developers of 1v1 education scenarios or education small class scenarios and similar scenarios can use this callback notification to determine whether the microphone device of the remote publishing stream device is working normally, and preliminary understand the cause of the device problem according to the corresponding state.
     * Trigger: When the state of the remote microphone device is changed, such as switching a microphone, etc., by listening to the callback, it is possible to obtain an event related to the remote microphone, which can be used to prompt the user that the audio may be abnormal.
     * Caution: This callback will not be called back when the remote stream is play from the CDN, or when custom audio acquisition is used at the peer (But the stream is not published to the ZEGO RTC server.).
     *
     * @param streamID Stream ID.
     * @param state Remote microphone status.
     */
    remoteMicStateUpdate: (streamID: string, state: zego.ZegoRemoteDeviceState) => void;
    /**
     * Callback for device's audio route changed.
     *
     * Available since: 1.20.0
     * Description: Callback for device's audio route changed.
     * Trigger: This callback will be called when there are changes in audio routing such as earphone plugging, speaker and receiver switching, etc.
     * Platform differences: Only supports iOS and Android.
     *
     * @param audioRoute Current audio route.
     */
    audioRouteChange: (audioRoute: zego.ZegoAudioRoute) => void;
    /**
     * The callback triggered when Broadcast Messages are received.
     *
     * Available since: 1.2.1
     * Description: This callback is used to receive broadcast messages sent by other users in the same room.
     * Use cases: Generally used when the number of people in the live room does not exceed 500
     * When to trigger: After calling [loginRoom] to log in to the room, if a user in the room sends a broadcast message via [sendBroadcastMessage] function, this callback will be triggered.
     * Restrictions: None
     * Caution: The broadcast message sent by the user will not be notified through this callback.
     * Related callbacks: You can receive room barrage messages through [onIMRecvBarrageMessage], and you can receive room custom signaling through [onIMRecvCustomCommand].
     *
     * @param roomID Room ID. Value range: The maximum length is 128 bytes.
     * @param messageList List of received messages. Value range: Up to 50 messages can be received each time.
     */
    IMRecvBroadcastMessage: (roomID: string, messageList: zego.ZegoBroadcastMessageInfo[]) => void;
    /**
     * The callback triggered when Barrage Messages are received.
     *
     * Available since: 1.5.0
     * Description: This callback is used to receive barrage messages sent by other users in the same room.
     * Use cases: Generally used in scenarios where there is a large number of messages sent and received in the room and the reliability of the messages is not required, such as live barrage.
     * When to trigger: After calling [loginRoom] to log in to the room, if a user in the room sends a barrage message through the [sendBarrageMessage] function, this callback will be triggered.
     * Restrictions: None
     * Caution: Barrage messages sent by users themselves will not be notified through this callback. When there are a large number of barrage messages in the room, the notification may be delayed, and some barrage messages may be lost.
     * Related callbacks: Develop can receive room broadcast messages through [onIMRecvBroadcastMessage], and can receive room custom signaling through [onIMRecvCustomCommand].
     *
     * @param roomID Room ID. Value range: The maximum length is 128 bytes.
     * @param messageList List of received messages. Value range: Up to 50 messages can be received each time.
     */
    IMRecvBarrageMessage: (roomID: string, messageList: zego.ZegoBarrageMessageInfo[]) => void;
    /**
     * The callback triggered when a Custom Command is received.
     *
     * Available since: 1.2.1
     * Description: This callback is used to receive custom command sent by other users in the same room.
     * Use cases: Generally used when the number of people in the live room does not exceed 500
     * When to trigger: After calling [loginRoom] to log in to the room, if other users in the room send custom signaling to the developer through the [sendCustomCommand] function, this callback will be triggered.
     * Restrictions: None
     * Caution: The custom command sent by the user himself will not be notified through this callback.
     * Related callbacks: You can receive room broadcast messages through [onIMRecvBroadcastMessage], and you can receive room barrage message through [onIMRecvBarrageMessage].
     *
     * @param roomID Room ID. Value range: The maximum length is 128 bytes.
     * @param fromUser Sender of the command.
     * @param command Command content received.Value range: The maximum length is 1024 bytes.
     */
    IMRecvCustomCommand: (roomID: string, fromUser: zego.ZegoUser, command: string) => void;
    /**
     * Network speed test error callback.
     *
     * Available since: 1.20.0
     * Description: Network speed test error callback.
     * Use cases: This function can be used to detect whether the network environment is suitable for pushing/pulling streams with specified bitrates.
     * When to Trigger: If an error occurs during the speed test, such as: can not connect to speed test server, this callback will be triggered.
     * Restrictions: None.
     *
     * @param errorCode Network speed test error code. Please refer to error codes document https://docs.zegocloud.com/en/5548.html for details.
     * @param type Uplink or downlink.
     */
    networkSpeedTestError: (errorCode: number, type: zego.ZegoNetworkSpeedTestType) => void;
    /**
     * Network speed test quality callback.
     *
     * Available since: 1.20.0
     * Description: Network speed test quality callback when the network can be connected.
     * Use cases: This function can be used to detect whether the network environment is suitable for pushing/pulling streams with specified bitrates.
     * When to Trigger: After call [startNetworkSpeedTest] start network speed test, this callback will be triggered. The trigger period is determined by the parameter value specified by call [startNetworkSpeedTest], default value is 3 seconds
     * Restrictions: None.
     * Caution: When error occurred during network speed test or [stopNetworkSpeedTest] called, this callback will not be triggered.
     *
     * @param quality Network speed test quality.
     * @param type Uplink or downlink.
     */
    networkSpeedTestQualityUpdate: (quality: zego.ZegoNetworkSpeedTestQuality, type: zego.ZegoNetworkSpeedTestType) => void;
    /**
     * The network quality callback of users who are publishing in the room.
     *
     * Available since: 2.10.0
     * Description: The uplink and downlink network callbacks of the local and remote users, that would be called by default every two seconds for the local and each playing remote user's network quality.
     *   Versions 2.10.0 to 2.13.1:
     *   1. Developer must both publish and play streams before you receive your own network quality callback.
     *   2. When playing a stream, the publish end has a play stream and the publish end is in the room where it is located, then the user's network quality will be received.
     *   Version 2.14.0 and above:
     *   1. As long as you publish or play a stream, you will receive your own network quality callback.
     *   2. When you play a stream, the publish end is in the room where you are, and you will receive the user's network quality.
     *   Version 2.22.0 and above:
     *   1. Estimate the network conditions of the remote stream publishing user. If the remote stream publishing user loses one heartbeat, the network quality will be called back as unknown; if the remote stream publishing user's heartbeat loss reaches 3 Second, call back its network quality to die.
     * Use case: When the developer wants to analyze the network condition on the link, or wants to know the network condition of local and remote users.
     * When to Trigger: After publishing a stream by called [startPublishingStream] or playing a stream by called [startPlayingStream].
     *
     * @param userID User ID, empty means local user
     * @param upstreamQuality Upstream network quality
     * @param downstreamQuality Downstream network quality
     */
    networkQuality: (userID: string, upstreamQuality: zego.ZegoStreamQualityLevel, downstreamQuality: zego.ZegoStreamQualityLevel) => void;
}
export interface ZegoMediaPlayerListener {
    /**
     * MediaPlayer playback status callback.
     *
     * Available since: 1.3.4
     * Description: MediaPlayer playback status callback.
     * Trigger: The callback triggered when the state of the media player changes.
     * Restrictions: None.
     *
     * @param mediaPlayer Callback player object.
     * @param state Media player status.
     * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
     */
    mediaPlayerStateUpdate: (mediaPlayer: zego.ZegoMediaPlayer, state: zego.ZegoMediaPlayerState, errorCode: number) => void;
    /**
     * The callback triggered when the network status of the media player changes.
     *
     * Available since: 1.3.4
     * Description: The callback triggered when the network status of the media player changes.
     * Trigger: When the media player is playing network resources, this callback will be triggered when the status change of the cached data.
     * Restrictions: The callback will only be triggered when the network resource is played.
     * Related APIs: [setNetWorkBufferThreshold].
     *
     * @param mediaPlayer Callback player object.
     * @param networkEvent Network status event.
     */
    mediaPlayerNetworkEvent: (mediaPlayer: zego.ZegoMediaPlayer, networkEvent: zego.ZegoMediaPlayerNetworkEvent) => void;
    /**
     * The callback to report the current playback progress of the media player.
     *
     * Available since: 1.3.4
     * Description: The callback triggered when the network status of the media player changes. Set the callback interval by calling [setProgressInterval]. When the callback interval is set to 0, the callback is stopped. The default callback interval is 1 second.
     * Trigger: When the media player is playing network resources, this callback will be triggered when the status change of the cached data.
     * Restrictions: None.
     * Related APIs: [setProgressInterval].
     *
     * @param mediaPlayer Callback player object.
     * @param millisecond Progress in milliseconds.
     */
    mediaPlayerPlayingProgress: (mediaPlayer: zego.ZegoMediaPlayer, millisecond: number) => void;
}
export interface ZegoAudioEffectPlayerListener {
    /**
     * Audio effect playback state callback.
     *
     * Available since: 1.16.0
     * Description: This callback is triggered when the playback state of a audio effect of the audio effect player changes.
     * Trigger: This callback is triggered when the playback status of the audio effect changes.
     * Restrictions: None.
     *
     * @param audioEffectPlayer Audio effect player instance that triggers this callback.
     * @param audioEffectID The ID of the audio effect resource that triggered this callback.
     * @param state The playback state of the audio effect.
     * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
     */
    audioEffectPlayerStateUpdate: (audioEffectPlayer: zego.ZegoAudioEffectPlayer, audioEffectID: number, state: zego.ZegoAudioEffectPlayState, errorCode: number) => void;
}
