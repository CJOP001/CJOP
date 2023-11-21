export var ZegoErrorCode;
(function (ZegoErrorCode) {
    /** Execution successful. */
    ZegoErrorCode[ZegoErrorCode["CommonSuccess"] = 0] = "CommonSuccess";
    /** Description: The engine is not initialized and cannot call non-static functions. <br>Cause: Engine not created.<br>Solutions: Please call the [createEngine] function to create the engine first, and then call the current function. */
    ZegoErrorCode[ZegoErrorCode["CommonEngineNotCreate"] = 1000001] = "CommonEngineNotCreate";
    /** Description: Not logged in to the room, unable to support function implementation. <br>Cause: Not logged in to the room.<br>Solutions: Please call [loginRoom] to log in to the room first, and use related functions during the online period after entering the room. */
    ZegoErrorCode[ZegoErrorCode["CommonNotLoginRoom"] = 1000002] = "CommonNotLoginRoom";
    /** Description: The audio and video module of the engine is not started and cannot support function realization. <br>Cause: Audio and video modules with no engine started.<br>Solutions: Please call [startPreviewView] [startPublishingStream] [startPlayingStream] to start the audio and video module first. */
    ZegoErrorCode[ZegoErrorCode["CommonEngineNotStarted"] = 1000003] = "CommonEngineNotStarted";
    /** Description: Call functions that are not supported on the current system/platform. <br>Cause: For example, calling the function of setting the Android context environment on a non-Android system.<br>Solutions: Check if the system environment matches. */
    ZegoErrorCode[ZegoErrorCode["CommonUnsupportedPlatform"] = 1000006] = "CommonUnsupportedPlatform";
    /** Description: Invalid Android context. <br>Cause: Not set or set the wrong Android context environment.<br>Solutions: Set the correct Android context. */
    ZegoErrorCode[ZegoErrorCode["CommonInvalidAndroidEnvironment"] = 1000007] = "CommonInvalidAndroidEnvironment";
    /** Description: `setEventHandler` has been called to set the handler, please do not set it repeatedly. <br>Cause: Call `setEventHandler` repeatedly to set the handler.<br>Solutions: If you need to repeat the settings, please call `setEventHandler` first to empty the previous handler. */
    ZegoErrorCode[ZegoErrorCode["CommonEventHandlerExists"] = 1000008] = "CommonEventHandlerExists";
    /** Description: The current SDK does not support this feature. <br>Cause: The SDK version used does not include this feature.<br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["CommonSdkNoModule"] = 1000010] = "CommonSdkNoModule";
    /** Description: The input streamID is too long. <br>Cause: The length of the streamID parameter passed in when calling [startPublishingStream] or [startPlayingStream] exceeds the limit. <br>Solutions: The streamID should be less than 256 bytes. */
    ZegoErrorCode[ZegoErrorCode["CommonStreamIdTooLong"] = 1000014] = "CommonStreamIdTooLong";
    /** Description: The input StreamID is null. <br>Cause: The streamID parameter passed in when calling [startPublishingStream] or [startPlayingStream] is null or empty string. <br>Solutions: Check whether the streamID parameter passed in when calling the function is normal. */
    ZegoErrorCode[ZegoErrorCode["CommonStreamIdNull"] = 1000015] = "CommonStreamIdNull";
    /** Description: The input streamID contains invalid characters. <br>Cause: The streamID parameter passed in when calling [startPublishingStream] or [startPlayingStream] contains invalid characters. <br>Solutions: Check whether the streamID parameter passed in when calling the function is normal, only support numbers, English characters and '-', '_'. */
    ZegoErrorCode[ZegoErrorCode["CommonStreamIdInvalidCharacter"] = 1000016] = "CommonStreamIdInvalidCharacter";
    /** Illegal param. */
    ZegoErrorCode[ZegoErrorCode["CommonIllegalParam"] = 1000017] = "CommonIllegalParam";
    /** Description: The Input CDN URL is too long. <br>Cause: The length of URL parameter passed in when calling [enablePublishDirectToCDN] or [startPlayingStream] exceeds the limit. <br>Solutions: URL length should be less than 1024 bytes. */
    ZegoErrorCode[ZegoErrorCode["CommonCdnUrlTooLong"] = 1000018] = "CommonCdnUrlTooLong";
    /** Description: The Input CDN auth param is too long. <br>Cause: The length of auth parameter passed in when calling [enablePublishDirectToCDN] or [startPlayingStream] exceeds the limit. <br>Solutions: Auth param length should be less than 1024 bytes. */
    ZegoErrorCode[ZegoErrorCode["CommonCdnAuthParamTooLong"] = 1000019] = "CommonCdnAuthParamTooLong";
    /** Description: When login room or login scene, userID or user name is different. <br>Cause: Login room, login scene use different user id or user name. <br> Solutions: Use same user id and user name when login room, login scene. */
    ZegoErrorCode[ZegoErrorCode["CommonUserNotSame"] = 1000020] = "CommonUserNotSame";
    /** Description: This AppID has been removed from production. <br>Solutions: Please check the status of the AppID on the ZEGO official website console or contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["CommonAppOfflineError"] = 1000037] = "CommonAppOfflineError";
    /** Description: The backend configuration of the server is incorrect. <br>Cause: 1. The domain name configuration is incorrect; 2. The media network is abnormal; 3. The media network link is empty. <br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["CommonAppFlexiableConfigError"] = 1000038] = "CommonAppFlexiableConfigError";
    /** Description: Incorrect CDN address. <br>Cause: The set CDN URL is not a standard RTMP or FLV protocol. <br>Solutions: Please check the supported protocol and format. */
    ZegoErrorCode[ZegoErrorCode["CommonCdnUrlInvalid"] = 1000055] = "CommonCdnUrlInvalid";
    /** DNS resolution failed. Please check network configurations. This error code is deprecated. */
    ZegoErrorCode[ZegoErrorCode["CommonDnsResolveError"] = 1000060] = "CommonDnsResolveError";
    /** Server dispatching exception. Please contact ZEGO technical support to solve the problem. This error code is deprecated. */
    ZegoErrorCode[ZegoErrorCode["CommonDispatchError"] = 1000065] = "CommonDispatchError";
    /** Description: The engine audio and video module has been activated, and this setting is not supported. <br>Cause: Only supports setting before starting the audio and video module of the engine. <br>Solutions: Please set it before calling [startPreviewView] [startPublishingStream] [startPlayingStream] to start the audio and video module. */
    ZegoErrorCode[ZegoErrorCode["CommonConfigAfterEngineStarted"] = 1000066] = "CommonConfigAfterEngineStarted";
    /** Description: The room is logged in, this setting is not supported. <br>Cause: Only supports setting before logging into the room. <br>Solutions: Please set it before calling [loginRoom] or after calling [logoutRoom]. Note that if you log in to multiple rooms, you need to log out of all rooms before setting. */
    ZegoErrorCode[ZegoErrorCode["CommonConfigAfterRoomLoggedIn"] = 1000067] = "CommonConfigAfterRoomLoggedIn";
    /** Description: SDK internal null pointer error. <br>Cause: The Android JVM environment is abnormal. <br>Solutions: Please check whether the Android JVM environment is normal or contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["CommonInnerNullptr"] = 1000090] = "CommonInnerNullptr";
    /** AppID cannot be 0. Please check if the AppID is correct. */
    ZegoErrorCode[ZegoErrorCode["EngineAppidZero"] = 1001000] = "EngineAppidZero";
    /** The length of the input AppSign must be 64 bytes. */
    ZegoErrorCode[ZegoErrorCode["EngineAppsignInvalidLength"] = 1001001] = "EngineAppsignInvalidLength";
    /** The input AppSign contains invalid characters. Only '0'-'9', 'a'-'f', 'A'-'F' are valid. */
    ZegoErrorCode[ZegoErrorCode["EngineAppsignInvalidCharacter"] = 1001002] = "EngineAppsignInvalidCharacter";
    /** The input AppSign is empty. */
    ZegoErrorCode[ZegoErrorCode["EngineAppsignNull"] = 1001003] = "EngineAppsignNull";
    /** Description: Authentication failed. <br>Cause: Incorrect AppID; using AppID in wrong environment. <br>Solutions: Please check AppID is correct or not on ZEGO manage console, or check whether the environment configured by AppID is consistent with the environment set by SDK. */
    ZegoErrorCode[ZegoErrorCode["EngineAppidIncorrectOrNotOnline"] = 1001004] = "EngineAppidIncorrectOrNotOnline";
    /** Description: Authentication failed. <br>Cause: Incorrect AppSign. <br>Solutions: Please check AppSign is correct or not on ZEGO manage console. */
    ZegoErrorCode[ZegoErrorCode["EngineAppsignIncorrect"] = 1001005] = "EngineAppsignIncorrect";
    /** Description: No write permission to the log file. <br>Cause: App has no write permission to log file folder. <br>Solutions: Please check has grant write permission to App or not; check log folder is protected or not. */
    ZegoErrorCode[ZegoErrorCode["EngineLogNoWritePermission"] = 1001014] = "EngineLogNoWritePermission";
    /** Description: The log file path is too long. <br>Cause: The length of log file path exceeds limit. <br>Solutions: Please check the length of log file path. */
    ZegoErrorCode[ZegoErrorCode["EngineLogPathTooLong"] = 1001015] = "EngineLogPathTooLong";
    /** Description: Set room mode failed. <br>Cause: Set room mode after initialize the SDK. <br>Solutions: Please set room mode before initialize the SDK. */
    ZegoErrorCode[ZegoErrorCode["EngineSetRoomModeErrorTime"] = 1001020] = "EngineSetRoomModeErrorTime";
    /** Description: The experimental API json parameter parsing failed. <br>Cause: Invalid json format; wrong function name or parameter. <br>Solutions: Please check json format is valid or not; check function name or parameter is correct or not, contact ZEGO technical support for specific function name and parameters. */
    ZegoErrorCode[ZegoErrorCode["EngineExperimentalJsonStrInvalid"] = 1001091] = "EngineExperimentalJsonStrInvalid";
    /** Description: The number of rooms the user attempted to log into simultaneously exceeds the maximum number allowed. Currently, a user can only be logged in to one main room.<br>Cause: In single-room mode, log in to multiple main rooms at the same time (including repeated calls to log in to the same room A without exiting room A). <br>Solutions: Please check is login multiple rooms simultaneously or not under single room mode. */
    ZegoErrorCode[ZegoErrorCode["RoomCountExceed"] = 1002001] = "RoomCountExceed";
    /** Description: Haven't login with the input room ID.<br>Cause: Haven't login with the input room ID before call [logoutRoom] or [switchRoom] or [renewToken] or [setRoomExtraInfo]. <br>Solutions: Please check has login with the room ID or not. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomidIncorrect"] = 1002002] = "RoomRoomidIncorrect";
    /** Description: The input user ID is empty.<br>Cause: The input user ID is empty. <br>Solutions: Please check the input user ID is empty or not. */
    ZegoErrorCode[ZegoErrorCode["RoomUserIdNull"] = 1002005] = "RoomUserIdNull";
    /** Description: The input user ID contains invalid characters.<br>Cause: The input user ID contains invalid characters. <br>Solutions: User ID can only contains numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', ',', '.', '<', '>', '/', '\'. */
    ZegoErrorCode[ZegoErrorCode["RoomUserIdInvalidCharacter"] = 1002006] = "RoomUserIdInvalidCharacter";
    /** The input user ID is too long. <br>The length of the user ID input by the [loginRoom] function is greater than or equal to 64 bytes. <br>Please check the user ID entered when calling the [loginRoom] function to ensure that its length is less than 64 bytes. */
    ZegoErrorCode[ZegoErrorCode["RoomUserIdTooLong"] = 1002007] = "RoomUserIdTooLong";
    /** The input user name is empty. <br>The user name entered by the [loginRoom] function is empty. <br>Please check the user name entered when calling the [loginRoom] function to make sure it is not empty. */
    ZegoErrorCode[ZegoErrorCode["RoomUserNameNull"] = 1002008] = "RoomUserNameNull";
    /** The input user name contains invalid characters. <br>The user name entered by the [loginRoom] function contains illegal characters.<br>Please check the user name entered when calling the [loginRoom] function to ensure that it is only contain numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', ',', '.', '<', '>', '/', '\'. */
    ZegoErrorCode[ZegoErrorCode["RoomUserNameInvalidCharacter"] = 1002009] = "RoomUserNameInvalidCharacter";
    /** The input user name is too long. <br>The length of the user name input by the [loginRoom] function is greater than or equal to 256 bytes. <br>Please check the user name entered when calling the [loginRoom] function to ensure that its length is less than 256 bytes. */
    ZegoErrorCode[ZegoErrorCode["RoomUserNameTooLong"] = 1002010] = "RoomUserNameTooLong";
    /** The input room ID is empty. <br>The room ID entered by the [loginRoom] function is empty. <br>Please check the room ID entered when calling the [loginRoom] function to make sure it is not empty. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomidNull"] = 1002011] = "RoomRoomidNull";
    /** The input room ID contains invalid characters. <br>The room ID entered by the [loginRoom] function contains illegal characters.<br>Please check the room ID entered when calling the [loginRoom] function to ensure that it is only contain numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', ',', '.', '<', '>', '/', '\'. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomidInvalidCharacter"] = 1002012] = "RoomRoomidInvalidCharacter";
    /** The input room ID is too long. <br>The length of the room ID input by the [loginRoom] function is greater than or equal to 128 bytes. <br>Please check the room ID entered when calling the [loginRoom] function to ensure that its length is less than 128 bytes. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomidTooLong"] = 1002013] = "RoomRoomidTooLong";
    /** The key for room extra info is empty. <br>The key for room extra info entered by the [setRoomExtraInfo] function is empty. <br>Please check the key for room extra info entered when calling the [setRoomExtraInfo] function to make sure it is not empty. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomExtraInfoKeyEmpty"] = 1002014] = "RoomRoomExtraInfoKeyEmpty";
    /** The key for room extra info is too long. <br>The length of the key for room extra info input by the [setRoomExtraInfo] function is greater than or equal to 128 bytes. <br>Please check the key for room extra info entered when calling the [setRoomExtraInfo] function to ensure that its length is less than 128 bytes. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomExtraInfoKeyTooLong"] = 1002015] = "RoomRoomExtraInfoKeyTooLong";
    /** The value for room extra info is too long. <br>The length of the value for room extra info input by the [setRoomExtraInfo] function is greater than or equal to 4096 bytes. <br>Please check the value for room extra info entered when calling the [setRoomExtraInfo] function to ensure that its length is less than 4096 bytes. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomExtraInfoValueTooLong"] = 1002016] = "RoomRoomExtraInfoValueTooLong";
    /** Description: The number of keys set in the room additional message exceeds the maximum number of supported limits. <br>Cause: called setRoomExtraInfo Different keys have been passed in multiple times. <br> Solutions: please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomExtraInfoExceedKeys"] = 1002017] = "RoomRoomExtraInfoExceedKeys";
    /** Description: set multi room mode, userID or user name is different. <br>Cause: set multi room mode, login multi room use different user id or user name. <br> Solutions: Currently supports at most one key, if you need to support multiple, contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["RoomMultiRoomLoginUserNotSame"] = 1002018] = "RoomMultiRoomLoginUserNotSame";
    /** Description: The [switchRoom] function cannot be used in multi-room mode. <br>Cause: multi room mode SDK not support. <br> Solutions: first call [logoutRoom] then call [loginRoom]. */
    ZegoErrorCode[ZegoErrorCode["RoomMultiRoomSwtichRoomInvalid"] = 1002019] = "RoomMultiRoomSwtichRoomInvalid";
    /** Description: Login failed, possibly due to network problems. <br>Cause: The current network is abnormal. <br> Solutions: It is recommended to switch the network to try. */
    ZegoErrorCode[ZegoErrorCode["RoomErrorConnectFailed"] = 1002030] = "RoomErrorConnectFailed";
    /** Description: Login timed out, possibly due to network problems. <br>Cause: The current network delay is large. <br> Solutions: It is recommended to switch the network to try. */
    ZegoErrorCode[ZegoErrorCode["RoomErrorLoginTimeout"] = 1002031] = "RoomErrorLoginTimeout";
    /** Description: Room login authentication failed. <br>Cause: login set token error or token expired. <br> Solutions: set new token. */
    ZegoErrorCode[ZegoErrorCode["RoomErrorAuthenticationFailed"] = 1002033] = "RoomErrorAuthenticationFailed";
    /** Description: The number of users logging into the room exceeds the maximum number of concurrent users configured for the room. (In the test environment, the default maximum number of users in the room is 50). <br>Cause: too much user in room. <br> Solutions: contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["RoomErrorExceedMaximumMember"] = 1002034] = "RoomErrorExceedMaximumMember";
    /** Description: in test environment The total number of rooms logged in at the same time exceeds the limit. (In the test environment, the maximum number of concurrent rooms is 10). <br>Cause: Too many rooms logged in at the same time. <br> Solutions: logout some room, login room. */
    ZegoErrorCode[ZegoErrorCode["RoomErrorExceedMaximumRoomCount"] = 1002035] = "RoomErrorExceedMaximumRoomCount";
    /** Description: login failed, multi-room mode is not activate. <br>Cause: multi-room mode is not activate. <br> Solutions: please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["RoomErrorLoginMultiRoomNotOpen"] = 1002036] = "RoomErrorLoginMultiRoomNotOpen";
    /** The total number of rooms logged in at the same time exceeds the limit, Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["RoomErrorMultiRoomExceedMaximumRoomCount"] = 1002037] = "RoomErrorMultiRoomExceedMaximumRoomCount";
    /** Description: The user was kicked out of the room. <br>Cause: Possibly because the same user ID is logged in on another device. <br>Solutions: Use a unique user ID. */
    ZegoErrorCode[ZegoErrorCode["RoomKickedOut"] = 1002050] = "RoomKickedOut";
    /** Description: Room connection is temporarily interrupted and is retrying. <br>Cause: Possibly due to network problems. <br>Solutions: Please wait or check whether the network is normal. */
    ZegoErrorCode[ZegoErrorCode["RoomConnectTemporaryBroken"] = 1002051] = "RoomConnectTemporaryBroken";
    /** Description: Room connection disconnected. <br>Cause: Possibly due to network problems. <br>Solutions: Please check whether the network is working or switch the network environment. */
    ZegoErrorCode[ZegoErrorCode["RoomDisconnect"] = 1002052] = "RoomDisconnect";
    /** Description: Room login retry has exceeded the maximum retry time. <br>Cause: Possibly due to network problems. <br>Solutions: Please check whether the network is working or switch the network environment. */
    ZegoErrorCode[ZegoErrorCode["RoomRetryTimeout"] = 1002053] = "RoomRetryTimeout";
    /** Description: The business server has sent a signal to kick the user out of the room. <br>Cause: The business server has sent a signal to kick the user out of the room. <br>Solutions: Contact the business server for processing. */
    ZegoErrorCode[ZegoErrorCode["RoomManualKickedOut"] = 1002055] = "RoomManualKickedOut";
    /** Description: Wrong order of login rooms. <br>Cause: Log in multi room without log in the main room. <br>Solutions: Please log in to the main room with `loginRoom` before logging in to multi room. */
    ZegoErrorCode[ZegoErrorCode["RoomWrongLoginSequence"] = 1002061] = "RoomWrongLoginSequence";
    /** Description: Wrong order of logout rooms. <br>Cause: Log out the main room without log out multi room. <br>Solutions: Please log out of the multi room before logging out of the main room. */
    ZegoErrorCode[ZegoErrorCode["RoomWrongLogoutSequence"] = 1002062] = "RoomWrongLogoutSequence";
    /** Description: No multi-room permission. <br>Cause: No multi-room permission. <br>Solutions: Please contact ZEGO technical support to enable it. */
    ZegoErrorCode[ZegoErrorCode["RoomNoMultiRoomPermission"] = 1002063] = "RoomNoMultiRoomPermission";
    /** Description: The room ID has been used by other login room interface. Current user can not login room with the room ID before release the room ID. <br>Cause: The room ID has been used by other login room interface. <br>Solutions: Logout the room with the same room ID first. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomIdHasBeenUsed"] = 1002064] = "RoomRoomIdHasBeenUsed";
    /** Description: This method has been deprecated after version 2.9.0. <br>Cause: This method has been deprecated after version 2.9.0. <br>Solutions: Please set [setRoomMode] to select multi-room mode before the engine started, and then call [loginRoom] to use multi-room. */
    ZegoErrorCode[ZegoErrorCode["RoomMultiRoomDeprecated"] = 1002065] = "RoomMultiRoomDeprecated";
    /** Description: If the user is in the server blacklist when logging in to the room, this error code will be returned, indicating that it is forbidden to log in to the room. <br>Cause: The user is currently in the server blacklist. <br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["RoomUserInBlacklist"] = 1002066] = "RoomUserInBlacklist";
    /** Description: This error code is returned if the user does not pass [AppSign] when creating the engine or [Token] when logging in to the room. <br>Cause: The Token is not transmitted in the login room. <br>Solutions: Set the [Token] when you login to the room. */
    ZegoErrorCode[ZegoErrorCode["RoomNoToken"] = 1002067] = "RoomNoToken";
    /** Description: The interface is called more frequently than the upper limit. <br>Cause: This application calls this interface too often. <br>Solutions: Please control the frequency of calls to this interface. Please refer to https://docs.zegocloud.com/article/7612 for details. */
    ZegoErrorCode[ZegoErrorCode["RoomAppCallApiTooFrequent"] = 1002071] = "RoomAppCallApiTooFrequent";
    /** Description: The frequency of calls to the interface by users in the room exceeds the upper limit. <br>Cause: The interface is called too often by users in the room. <br>Solutions: Please control the frequency of calls to this interface by users in the room. Please refer to https://docs.zegocloud.com/article/7612 for details. */
    ZegoErrorCode[ZegoErrorCode["RoomRoomCallApiTooFrequent"] = 1002072] = "RoomRoomCallApiTooFrequent";
    /** Description: Room signalling type interfaces are called more frequently than the upper limit. <br>Cause: This application calls the room signalling type interface too often. (e.g., [sendCustomCommand] [sendBroadcastMessage]) <br>Solutions: Please control the frequency of application calls to the room signalling type interface. Please refer to https://docs.zegocloud.com/article/7612 for details. */
    ZegoErrorCode[ZegoErrorCode["RoomAppCallTooFrequent"] = 1002073] = "RoomAppCallTooFrequent";
    /** Description: Token inner error. <br>Cause:  Unknown internal error. <br>Solutions: Contact ZEGO technical support to deal with it.. */
    ZegoErrorCode[ZegoErrorCode["RoomTokenInnerError"] = 1002074] = "RoomTokenInnerError";
    /** Description: Token Format error. <br>Cause: The generated Token transmission parameter payload is in non-JSON format. <br>Solutions: The payload is correctly transmitted in json format when the Token is generated. */
    ZegoErrorCode[ZegoErrorCode["RoomTokenFormatError"] = 1002075] = "RoomTokenFormatError";
    /** Description: Token Appid error. <br>Cause: The generated Token Appid is inconsistent with the SDK used Appid, Or the appID type is incorrect. <br>Solutions: Use the Appid of the generated Token. */
    ZegoErrorCode[ZegoErrorCode["RoomTokenAppidError"] = 1002076] = "RoomTokenAppidError";
    /** Description: Token userID error. <br>Cause: The generated Token userID is inconsistent with the login used userID Or the userID type is incorrect. <br>Solutions: Login using the userID that generates the Token. */
    ZegoErrorCode[ZegoErrorCode["RoomTokenUseridError"] = 1002077] = "RoomTokenUseridError";
    /** Description: Token expire. <br>Cause: Token expire Or the generated Token validity period parameter type is incorrect. <br>Solutions: Regenerate the Token. */
    ZegoErrorCode[ZegoErrorCode["RoomTokenExpireError"] = 1002078] = "RoomTokenExpireError";
    /** Description: Token version error. <br>Cause: Description The Token Version was generated incorrectly. <br>Solutions: Generate the Token with the correct version. */
    ZegoErrorCode[ZegoErrorCode["RoomTokenVersionError"] = 1002079] = "RoomTokenVersionError";
    /** Description: The Token Nonce parameter type is incorrect. <br>Cause: The nonce parameter type of the generated Token is incorrect. <br>Solutions: Ensure that nonce is int64 data. */
    ZegoErrorCode[ZegoErrorCode["RoomTokenNoncetypeError"] = 1002080] = "RoomTokenNoncetypeError";
    /** Description: Multi-room mode required. <br>Cause: Wrong room mode been used, e.g. single-room. <br>Solutions: Please use [setRoomMode] to select multi-room mode before the engine started. */
    ZegoErrorCode[ZegoErrorCode["RoomMultiRoomRequired"] = 1002081] = "RoomMultiRoomRequired";
    /** Description: Room login failed due to internal system exceptions.<br>Cause: Unknown internal error.<br>Solutions: Contact ZEGO technical support to deal with it. */
    ZegoErrorCode[ZegoErrorCode["RoomInnerError"] = 1002099] = "RoomInnerError";
    /** Description: Publishing failed due to no data in the stream.<br>Cause: No data in the stream.<br>Solutions: Check whether the video, audio capture module is working properly. */
    ZegoErrorCode[ZegoErrorCode["PublisherPublishStreamFailed"] = 1003001] = "PublisherPublishStreamFailed";
    /** Description: Publishing failed due to wrong bitrate setting.<br>Cause: The set video bitrate, audio bitrate, or minimum video bitrate threshold for traffic control exceeds the upper limit.<br>Solutions: Please check if the bitrate value is in the correct unit (kbps).Adjust the bitrate setting. */
    ZegoErrorCode[ZegoErrorCode["PublisherBitrateInvalid"] = 1003002] = "PublisherBitrateInvalid";
    /** Description: The property param of the traffic control is set incorrectly.<br>Cause: The property param of the traffic control is less than 0 or exceeds all combinations.<br>Solutions: Check the settings of the property param of the traffic control. */
    ZegoErrorCode[ZegoErrorCode["PublisherTrafficModeInvalid"] = 1003005] = "PublisherTrafficModeInvalid";
    /** Description: Streaming failed, H.265 encoding is not supported.<br>Cause: The hardware device does not support H.265 encoding, or the SDK does not include H.265 encoding module.<br>Solutions: Contact ZEGO technical support to confirm whether the SDK contains the H.265 encoding module, if the hardware device does not support it, it is recommended to upgrade the hardware. */
    ZegoErrorCode[ZegoErrorCode["PublisherErrorH265EncoderNotSupported"] = 1003010] = "PublisherErrorH265EncoderNotSupported";
    /** Description:Stream publishing is temporarily interrupted and is retrying. <br>Cause: The network fluctuates or the network signal is bad.<br>Solutions: Please wait or check whether the network is normal. */
    ZegoErrorCode[ZegoErrorCode["PublisherErrorNetworkInterrupt"] = 1003020] = "PublisherErrorNetworkInterrupt";
    /** Description: Stream publish retry has exceeds the maximum retry time.<br>Cause: The the network signal is bad, and the maximum retry time is exceeded.<br>Solutions: Check the network status or switch to another network. */
    ZegoErrorCode[ZegoErrorCode["PublisherErrorRetryTimeout"] = 1003021] = "PublisherErrorRetryTimeout";
    /** Description: Failed to publish the stream. The publish channel is already publishing streams.<br>Cause:  The publish channel is already publishing streams.<br>Solutions: Please check the business logic to avoid repeating the publish for publish channel which is publishing. */
    ZegoErrorCode[ZegoErrorCode["PublisherErrorAlreadyDoPublish"] = 1003023] = "PublisherErrorAlreadyDoPublish";
    /** Description: Failed to publish the stream. Publishing of this stream is prohibited by backend configuration.<br>Cause: Publishing of this stream is prohibited by backend configuration.<br>Solutions: Contact ZEGO technical support to deal with it. */
    ZegoErrorCode[ZegoErrorCode["PublisherErrorServerForbid"] = 1003025] = "PublisherErrorServerForbid";
    /** Description: Failed to publish the stream. The same stream already exists in the room.<br>Cause: The same stream already exists in the room.<br>Solutions: Replace with a new stream ID. Adjust the stream ID generation strategy to ensure uniqueness. */
    ZegoErrorCode[ZegoErrorCode["PublisherErrorRepetitivePublishStream"] = 1003028] = "PublisherErrorRepetitivePublishStream";
    /** Description: Failed to publish the stream. The connection to the RTMP server is interrupted.<br>Cause: The publish address is wrong, or the network signal is bad.<br>Solutions: Please check whether there is any problem with the network connection or the stream publishing URL. */
    ZegoErrorCode[ZegoErrorCode["PublisherRtmpServerDisconnect"] = 1003029] = "PublisherRtmpServerDisconnect";
    /** Description: Failed to take a screenshot of the publis stream screen. <br>Cause: The preview is stopped and the push is abnormal. <br>Solutions: Turn on preview or re-publish. */
    ZegoErrorCode[ZegoErrorCode["PublisherTakePublishStreamSnapshotFailed"] = 1003030] = "PublisherTakePublishStreamSnapshotFailed";
    /** Description: Failed to update the relay CDN status. <br>Cause: The URL of the relay address is incorrect. <br>Solutions: Check whether the input URL is valid. */
    ZegoErrorCode[ZegoErrorCode["PublisherUpdateCdnTargetError"] = 1003040] = "PublisherUpdateCdnTargetError";
    /** Description: Failed to send SEI. <br>Cause: data is empty. <br>Solutions: Incoming non-empty data. */
    ZegoErrorCode[ZegoErrorCode["PublisherSeiDataNull"] = 1003043] = "PublisherSeiDataNull";
    /** Description: Failed to send SEI. <br>Cause: The input data exceeds the length limit. <br>Solutions: The length of the sent SEI data should be less than 4096 bytes. */
    ZegoErrorCode[ZegoErrorCode["PublisherSeiDataTooLong"] = 1003044] = "PublisherSeiDataTooLong";
    /** Description: Failed to send audio side info. <br>Cause: data is empty. <br>Solutions: Incoming non-empty data. */
    ZegoErrorCode[ZegoErrorCode["PublisherAudioSideDataNull"] = 1003045] = "PublisherAudioSideDataNull";
    /** Description: Failed to send audio side info. <br>Cause: The input data exceeds the length limit. <br>Solutions: The length of the sent audio side data should be less than 1024 bytes. */
    ZegoErrorCode[ZegoErrorCode["PublisherAudioSideDataTooLong"] = 1003046] = "PublisherAudioSideDataTooLong";
    /** The extra info of the stream is null. */
    ZegoErrorCode[ZegoErrorCode["PublisherExtraInfoNull"] = 1003050] = "PublisherExtraInfoNull";
    /** The extra info of the stream is too long. The maximum length should be less than 1024 bytes. */
    ZegoErrorCode[ZegoErrorCode["PublisherExtraInfoTooLong"] = 1003051] = "PublisherExtraInfoTooLong";
    /** Failed to update the extra info of the stream. Please check the network connection. */
    ZegoErrorCode[ZegoErrorCode["PublisherUpdateExtraInfoFailed"] = 1003053] = "PublisherUpdateExtraInfoFailed";
    /** Description: Failed to set publish watermark. <br>Cause: The incoming watermark path is empty. <br>Solutions: Incoming non-empty path. */
    ZegoErrorCode[ZegoErrorCode["PublisherWatermarkUrlNull"] = 1003055] = "PublisherWatermarkUrlNull";
    /** Description: Failed to set publish watermark. <br>Cause: The incoming watermark path exceeds the byte size limit. <br>Solutions: The incoming watermark path should be less than 1024 bytes. */
    ZegoErrorCode[ZegoErrorCode["PublisherWatermarkUrlTooLong"] = 1003056] = "PublisherWatermarkUrlTooLong";
    /** Description: Failed to set publish watermark. <br>Cause: The incoming watermark path was entered incorrectly or the image format is not supported. <br>Solutions: Incoming the correct watermark path, only `jpg` and `png` image formats are supported. */
    ZegoErrorCode[ZegoErrorCode["PublisherWatermarkUrlInvalid"] = 1003057] = "PublisherWatermarkUrlInvalid";
    /** Description: Incorrect watermark layout.<br>Caution: The layout area exceed the encoding resolution.<br>Solutions: Make sure the layout area cannot exceed the encoding resolution and call current interface. */
    ZegoErrorCode[ZegoErrorCode["PublisherWatermarkLayoutInvalid"] = 1003058] = "PublisherWatermarkLayoutInvalid";
    /** Description: The publish stream encryption key is invalid.<br>Caution: The set encryption key length is not supported.<br>Solutions: The Publish-stream encryption key length to be 16/24/32 bytes. */
    ZegoErrorCode[ZegoErrorCode["PublisherEncryptionKeyInvalid"] = 1003060] = "PublisherEncryptionKeyInvalid";
    /** Description: StartPlayingStream failed.<br>Caution: In multi-room mode, the publish-stream function is called incorrectly.<br>Solutions: In multi-room mode, A publish-stream function with the parameter 'ZegoPublisherConfig' needs to be called. */
    ZegoErrorCode[ZegoErrorCode["PublisherErrorPublishWhenUsingMultiRoom"] = 1003070] = "PublisherErrorPublishWhenUsingMultiRoom";
    /** Description: StartPlayingStream failed.<br>Caution: In multi-room mode, the publish-stream function is called incorrectly.<br>Solutions: In multi-room mode, A publish-stream function parameter 'roomID' cannot be empty. */
    ZegoErrorCode[ZegoErrorCode["PublisherErrorPublishWithRoomIdIsNullWhenUsingMultiRoom"] = 1003071] = "PublisherErrorPublishWithRoomIdIsNullWhenUsingMultiRoom";
    /** Description: Push-pull flow authentication is incorrect. <br>Caution: An [appSign] error was passed when creating the engine, or a Token error or timeout was passed when logging into the room. <br>Solutions: Pass the correct [Token] upon login, or invoke [renewToken] when recive [onRoomTokenWillExpire] callback. */
    ZegoErrorCode[ZegoErrorCode["PublisherErrorDispatchAuthError"] = 1003072] = "PublisherErrorDispatchAuthError";
    /** Description: Unsupported video encoder.<br>Caution: There is no selected video encoder in the current SDK.<br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["PublisherVideoEncoderNoSupportted"] = 1003080] = "PublisherVideoEncoderNoSupportted";
    /** Description: Video encoder error.<br>Caution: Video encoder error.<br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["PublisherVideoEncoderFail"] = 1003081] = "PublisherVideoEncoderFail";
    /** Description: Stream publishing failed due to system internal exceptions.<br>Caution: Stream publishing failed due to system internal exceptions.<br>Solutions: Please contact ZEGO technical support to solve the problem. */
    ZegoErrorCode[ZegoErrorCode["PublisherInnerError"] = 1003099] = "PublisherInnerError";
    /** Description: Stream playing failed.<br>Caution: Possibly due to no data in the stream.<br>Solutions: Check to see if the publish-stream is working or try to play stream again, and if the problem is still not resolved, please contact ZEGO technical support to solve the problem. */
    ZegoErrorCode[ZegoErrorCode["PlayerPlayStreamFailed"] = 1004001] = "PlayerPlayStreamFailed";
    /** Description: Stream playing failed.<br>Caution: The stream does not exist.<br>Solutions: Please check whether the remote end publish is indeed successful, or whether the publish and play environment are inconsistent. */
    ZegoErrorCode[ZegoErrorCode["PlayerPlayStreamNotExist"] = 1004002] = "PlayerPlayStreamNotExist";
    /** Description: Play stream authentication is incorrect. <br>Caution: The [Token] error or timeout required to playing stream across APP. <br>Solutions: Playing the stream to pass the correct [Token], or update the [Token] in time. */
    ZegoErrorCode[ZegoErrorCode["PlayerErrorDispatchAuthError"] = 1004003] = "PlayerErrorDispatchAuthError";
    /** Description: This device does not support super resolution. <br>Caution: The device configured on the server does not support super resolution, or the configuration on the server failed to pull. <br>Solutions: replace the device and try again or contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["PlayerSuperResolutionDeviceNotSupport"] = 1004004] = "PlayerSuperResolutionDeviceNotSupport";
    /** Description: The number of super resolution streams exceeds the limit.<br>Caution: The number of super resolution streams exceeds the limit.<br>Solutions: Currently, super resolution support up to 1 playing steam at the same time. */
    ZegoErrorCode[ZegoErrorCode["PlayerSuperResolutionMaxCountExceed"] = 1004005] = "PlayerSuperResolutionMaxCountExceed";
    /** Description: The number of super resolution streams exceeds the limit.<br>Caution: The number of super resolution streams exceeds the limit.<br>Solutions: contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["PlayerSuperResolutionVideoSizeNotSupport"] = 1004006] = "PlayerSuperResolutionVideoSizeNotSupport";
    /** Description: The performance of super resolution device is not enough.<br>Caution: The performance of device is not enough.<br>Solutions: Please replace the device. */
    ZegoErrorCode[ZegoErrorCode["PlayerSuperResolutionDevicePerformanceError"] = 1004007] = "PlayerSuperResolutionDevicePerformanceError";
    /** Description: Super resolution is initializing, please try again later.<br>Caution: Super resolution is initializing, please try again later.<br>Solutions: Please try again later. */
    ZegoErrorCode[ZegoErrorCode["PlayerSuperResolutionInitingBusyError"] = 1004008] = "PlayerSuperResolutionInitingBusyError";
    /** Description: Stream playing error.<br>Caution: The number of streams the user attempted to play simultaneously exceeds the maximum number allowed.<br>Solutions: Currently, up to 12 steams can be played at the same time. Please contact ZEGO technical support to increase the capacity if necessary. */
    ZegoErrorCode[ZegoErrorCode["PlayerCountExceed"] = 1004010] = "PlayerCountExceed";
    /** Description: Stream playing is temporarily interrupted.<br>Caution: Network exception.<br>Solutions: Please wait or check whether the network is normal. */
    ZegoErrorCode[ZegoErrorCode["PlayerErrorNetworkInterrupt"] = 1004020] = "PlayerErrorNetworkInterrupt";
    /** Description: Failed to play the stream.<br>Caution: Publishing of this stream is prohibited by backend configuration.<br>Solutions: Please contact ZEGO technical support to solve the problem. */
    ZegoErrorCode[ZegoErrorCode["PlayerErrorServerForbid"] = 1004025] = "PlayerErrorServerForbid";
    /** Description: Failed to capture the screenshot of the streaming screen, please check whether the stream to be captured is normal. <br>Cause: The stream is not pulled. <br>Solutions: Check whether it starts to play the stream, and whether there is an abnormality in the process of playing the stream. */
    ZegoErrorCode[ZegoErrorCode["PlayerTakePlayStreamSnapshotFailed"] = 1004030] = "PlayerTakePlayStreamSnapshotFailed";
    /** Description: The play stream decryption key is invalid, the key length only supports 16/24/32 bytes. <br>Cause: The input key length is not 16/24/32 bytes. <br>Solutions: Adjust the input key length to 16/24/32 bytes. */
    ZegoErrorCode[ZegoErrorCode["PlayerDecryptionKeyInvalid"] = 1004060] = "PlayerDecryptionKeyInvalid";
    /** Description: Pull stream decryption failed, please check whether the decryption key is correct. <br>Cause: Incorrect decryption key entered. <br>Solutions: Enter the correct decryption key. */
    ZegoErrorCode[ZegoErrorCode["PlayerDecryptionFailed"] = 1004061] = "PlayerDecryptionFailed";
    /** Description: Calling the wrong function after enabling the multi-room function causes playing stream fail. <br>Cause: Called the playing stream function that only works for joining a single room mode. <br>Solutions: Please use the function of the same name with ZegoPlayerConfig and specify the room ID to play the stream. */
    ZegoErrorCode[ZegoErrorCode["PlayerErrorPlayStreamWhenUsingMultiRoom"] = 1004070] = "PlayerErrorPlayStreamWhenUsingMultiRoom";
    /** Description: In the multi-room mode, the roomID parameter of the play stream cannot be empty. <br>Cause: The roomID parameter of the pull stream is empty. <br>Solutions: Please enter the correct roomID. */
    ZegoErrorCode[ZegoErrorCode["PlayerErrorPlayStreamWithRoomIdIsNullWhenUsingMultiRoom"] = 1004071] = "PlayerErrorPlayStreamWithRoomIdIsNullWhenUsingMultiRoom";
    /** Description: When using the SDK to play the latency of live streaming, this error code will be returned if you have not subscribed to the low latency live streaming service. <br>Cause: Low-latency live broadcast service is not activated. <br>Solutions: Please contact ZEGO technical support staff to open the low-latency live broadcast service. */
    ZegoErrorCode[ZegoErrorCode["PlayerNotConfigL3"] = 1004072] = "PlayerNotConfigL3";
    /** Description: Unsupported video decoder.<br>Caution: There is no selected video decoder in the current SDK.<br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["PlayerVideoDecoderNoSupportted"] = 1004080] = "PlayerVideoDecoderNoSupportted";
    /** Description: Video decoder fail.<br>Caution: Video decoder fail.<br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["PlayerVideoDecoderFail"] = 1004081] = "PlayerVideoDecoderFail";
    /** Description: An internal system exception causes a failure to pull the stream. <br>Cause: SDK internal error. <br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["PlayerInnerError"] = 1004099] = "PlayerInnerError";
    /** Description: Does not support the use of stream mixing service. <br>Cause: No stream mixing service configured. <br>Solutions: Please open the service on the console or contact ZEGO business staff. */
    ZegoErrorCode[ZegoErrorCode["MixerNoServices"] = 1005000] = "MixerNoServices";
    /** Description: The mixing task ID is null. <br>Cause: The mixing task ID input when starting mixing task is empty. <br>Solutions: Please enter the correct mixing task ID. */
    ZegoErrorCode[ZegoErrorCode["MixerTaskIdNull"] = 1005001] = "MixerTaskIdNull";
    /** Description: The stream mixing task ID is too long. <br>Cause: The stream mixing task ID is greater than 256 bytes. <br>Solutions: Please enter a mixing task ID less than 256 bytes. */
    ZegoErrorCode[ZegoErrorCode["MixerTaskIdTooLong"] = 1005002] = "MixerTaskIdTooLong";
    /** Description: Invalid mixed flow task ID. <br>Cause: Illegal characters in the stream mixing task ID. <br>Solutions: Stream mixing task ID only supports numbers, English characters and'~','!','@','$','%','^','&','*','(',')', '_','+','=','-','`',';',''',',','.','<','>','/','\', please enter the stream mixing task ID in the correct format. */
    ZegoErrorCode[ZegoErrorCode["MixerTaskIdInvalidCharacter"] = 1005003] = "MixerTaskIdInvalidCharacter";
    /** Description: Illegal parameters exist in mixing task configuration. <br>Cause: 1. The mixing task ID is empty; 2. The mixing room ID is empty; 3. The mixing custom data length exceeds 1000 bytes; 4. The mixing output target stream is empty. <br>Solutions: Please check the configuration parameters of the mixing task. */
    ZegoErrorCode[ZegoErrorCode["MixerNoOutputTarget"] = 1005005] = "MixerNoOutputTarget";
    /** Description: Illegal format of mixed stream output target parameter. <br>Cause: When the target of the mixed stream output target is streamID, an illegal character is passed in. <br>Solutions: Please check whether the target of the mixed stream output target is of streamID type, if so, target only support numbers, English characters and '-', '_'. */
    ZegoErrorCode[ZegoErrorCode["MixerOutputTargetInvalid"] = 1005006] = "MixerOutputTargetInvalid";
    /** Description: Failed to start the stream mixing task. <br>Cause: Requests are too frequent, exceeding the qps limit of the service. <br>Solutions: Please ensure that the qps of the mixing request is less than 100. */
    ZegoErrorCode[ZegoErrorCode["MixerStartRequestError"] = 1005010] = "MixerStartRequestError";
    /** Description: Failed to stop the stream mixing task. <br>Cause: May be the cause of the network error. <br>Solutions: Please check the network ring. */
    ZegoErrorCode[ZegoErrorCode["MixerStopRequestError"] = 1005011] = "MixerStopRequestError";
    /** The stream mixing task must be stopped by the user who started the task. This error code is deprecated. */
    ZegoErrorCode[ZegoErrorCode["MixerNotOwnerStopMixer"] = 1005012] = "MixerNotOwnerStopMixer";
    /** Description: Starts stream mixing tasks too frequently. <br>Cause: Requests are too frequent, exceeding the qps limit of the service. <br>Solutions: Please ensure that the qps of the mixing request is less than 100. */
    ZegoErrorCode[ZegoErrorCode["MixerStartQpsOverload"] = 1005015] = "MixerStartQpsOverload";
    /** Description: Stop stream mixing tasks too frequently. <br>Cause: Requests are too frequent, exceeding the qps limit of the service. <br>Solutions: Please ensure that the qps of the stop mixing request is less than 100. */
    ZegoErrorCode[ZegoErrorCode["MixerStopQpsOverload"] = 1005016] = "MixerStopQpsOverload";
    /** Description: The input stream list of the stream mixing task is empty. <br>Cause:  The input stream list of the stream mixing task is empty. <br>Solutions: Please check the input stream list of the mixing task. */
    ZegoErrorCode[ZegoErrorCode["MixerInputListInvalid"] = 1005020] = "MixerInputListInvalid";
    /** Description: The output stream list of the stream mixing task is empty. <br>Cause:  The output stream list of the stream mixing task is empty. <br>Solutions: Please check the output stream list of the mixing task. */
    ZegoErrorCode[ZegoErrorCode["MixerOutputListInvalid"] = 1005021] = "MixerOutputListInvalid";
    /** Description: The video configuration of the stream mixing task is invalid. <br>Cause:  The video configuration of the stream mixing task is invalid. <br>Solutions: Please check the video configuration of the stream mixing task. */
    ZegoErrorCode[ZegoErrorCode["MixerVideoConfigInvalid"] = 1005023] = "MixerVideoConfigInvalid";
    /** Description: The video configuration of the stream mixing task is invalid. <br>Cause: 1. An unsupported audio codec format is used. 2. The audio bit rate exceeds 192 kbps. <br>Solutions: Please check the audio configuration of the stream mixing task. */
    ZegoErrorCode[ZegoErrorCode["MixerAudioConfigInvalid"] = 1005024] = "MixerAudioConfigInvalid";
    /** Description: The number of input streams exceeds the maximum number allowed. <br>Cause: Supports up to 9 input streams, and may pass more than 9 input streams. <br>Solutions: Please check the input stream configuration of the mixing task. */
    ZegoErrorCode[ZegoErrorCode["MixerExceedMaxInputCount"] = 1005025] = "MixerExceedMaxInputCount";
    /** Description: Failed to start mixed stream. <br>Cause: The input stream does not exist. <br>Solutions: Please make sure that the stream corresponding to the entered streamID is being pushed. */
    ZegoErrorCode[ZegoErrorCode["MixerInputStreamNotExists"] = 1005026] = "MixerInputStreamNotExists";
    /** Description: Failed to start mixed stream. <br>Cause: The mixed stream input parameter is wrong, it may be that the layout of the input stream exceeds the canvas range. <br>Solutions: Please enter the correct mixed stream parameters. [ZegoMixerTask] */
    ZegoErrorCode[ZegoErrorCode["MixerInputParametersError"] = 1005027] = "MixerInputParametersError";
    /** Description: Mixed input text watermark is too long. <br>Cause: The length of the text watermark of the mixed stream input parameter exceeds the limit. <br>Solutions: Please make sure the input text watermark length does not exceed 512 bytes. */
    ZegoErrorCode[ZegoErrorCode["MixerInputLabelTextTooLong"] = 1005028] = "MixerInputLabelTextTooLong";
    /** Description: Mixed stream output target is too long. <br>Cause: The length of the target parameter of the mixed stream output exceeds the limit. <br>Solutions: Please make sure that the output destination length does not exceed 1024 bytes. */
    ZegoErrorCode[ZegoErrorCode["MixerOutputTargetTooLongError"] = 1005029] = "MixerOutputTargetTooLongError";
    /** Description: Failed to start mixed stream. <br>Cause: Exceeding the maximum number of output streams. <br>Solutions: Support up to 3 output streams. */
    ZegoErrorCode[ZegoErrorCode["MixerExceedMaxOutputCount"] = 1005030] = "MixerExceedMaxOutputCount";
    /** Description: Failed to start mixed stream. <br>Cause: The maximum number of focus voice input streams is exceeded. <br>Solutions: Support up to 4 input streams to set the focus voice. */
    ZegoErrorCode[ZegoErrorCode["MixerExceedMaxAudioFocusStreamCount"] = 1005031] = "MixerExceedMaxAudioFocusStreamCount";
    /** Description: The mixed-flow advanced configuration is too long. <br>Cause: The length of the mixed stream advanced configuration parameter exceeds the limit. <br>Solutions: Please make sure that the advanced configuration length does not exceed 512 bytes. */
    ZegoErrorCode[ZegoErrorCode["MixerAdvancedConfigTooLongError"] = 1005032] = "MixerAdvancedConfigTooLongError";
    /** Description: The mixed stream watermark path is too long. <br>Cause: The length of the mixed stream watermark path parameter exceeds the limit. <br>Solution: Please make sure the watermark path length does not exceed 512 bytes. */
    ZegoErrorCode[ZegoErrorCode["MixerWatermarkTooLong"] = 1005033] = "MixerWatermarkTooLong";
    /** Description: The link to the muxed input image is too long. <br>Cause: The length of the image link of the mixed stream input parameter exceeds the limit. <br>Solution: Please make sure that the length of the input image link does not exceed 1024 bytes. */
    ZegoErrorCode[ZegoErrorCode["MixerInputImageUrlTooLong"] = 1005034] = "MixerInputImageUrlTooLong";
    /** Description: Failed to mix stream input image. <br>Cause: The image format of the mixed stream input parameter is incorrect. <br>Solution: Use JPG and PNG formats. There are 2 ways to use it: 1. URI: Provide the picture to ZEGO technical support for configuration. After the configuration is complete, the picture URI will be provided, for example: preset-id://xxx.jpg. 2. URL: Only HTTP protocol is supported. */
    ZegoErrorCode[ZegoErrorCode["MixerInputImageUrlFormatError"] = 1005035] = "MixerInputImageUrlFormatError";
    /** Description: Failed to mux input image. <br>Cause: The image size of the mixed stream input parameter exceeds the limit. <br>Solution: Image size is limited to 1M. */
    ZegoErrorCode[ZegoErrorCode["MixerInputImageUrlSizeError"] = 1005036] = "MixerInputImageUrlSizeError";
    /** Description: Failed to start mixed stream. <br>Cause: Mixed-stream authentication failed. <br>Solutions: Contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["MixerAuthenticationFailed"] = 1005050] = "MixerAuthenticationFailed";
    /** Description: Failed to start mixed stream. <br>Cause: The input image watermark is empty. <br>Solutions: Please enter the correct watermark parameters [ZegoWatermark]. */
    ZegoErrorCode[ZegoErrorCode["MixerWatermarkNull"] = 1005061] = "MixerWatermarkNull";
    /** Description: Failed to start mixed stream. <br>Cause: The input image watermark parameter is wrong, it may be that the layout exceeds the canvas range. <br>Solutions: Please enter the correct watermark parameters [ZegoWatermark]. */
    ZegoErrorCode[ZegoErrorCode["MixerWatermarkParametersError"] = 1005062] = "MixerWatermarkParametersError";
    /** Description: Failed to start mixed stream. <br>Cause: The input watermark URL is illegal. <br>Solutions: The watermark URL must start with `preset-id://` and end with `.jpg` or `.png`. */
    ZegoErrorCode[ZegoErrorCode["MixerWatermarkUrlInvalid"] = 1005063] = "MixerWatermarkUrlInvalid";
    /** Description: Failed to start mixed stream. <br>Cause: The URL of the background image entered is illegal. <br>Solutions: The URL of the background image must start with preset-id:// and end with `.jpg` or `.png`. */
    ZegoErrorCode[ZegoErrorCode["MixerBackgroundImageUrlInvalid"] = 1005067] = "MixerBackgroundImageUrlInvalid";
    /** Description: Failed to start mixed stream. <br>Cause: The user-defined data is too long. <br>Solutions: The maximum length of the custom input should not exceed 1000 bytes. */
    ZegoErrorCode[ZegoErrorCode["MixerUserDataTooLong"] = 1005068] = "MixerUserDataTooLong";
    /** Description: Failed to start mixed stream. <br>Cause: The auto-mixing server was not found. <br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["MixerAutoMixStreamServerNotFound"] = 1005070] = "MixerAutoMixStreamServerNotFound";
    /** Description: Stream mixing internal error.<br>Cause: Unknown error occured in stream mixing internal.<br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["MixerInnerError"] = 1005099] = "MixerInnerError";
    /** Description: Generic device error.<br>Cause: Device dose not work normally.<br>Solutions: Use the system's video or audio recording application to check whether the device can work normally. If the device is normal, please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["DeviceErrorTypeGeneric"] = 1006001] = "DeviceErrorTypeGeneric";
    /** Description: The device ID does not exist.<br>Cause: The device ID is spelled incorrectly, or the corresponding device is unplugged.<br>Solutions: Please use the SDK interface to obtain the device ID, and check whether the device is properly connected. */
    ZegoErrorCode[ZegoErrorCode["DeviceErrorTypeInvalidId"] = 1006002] = "DeviceErrorTypeInvalidId";
    /** Description: No permission to access the device. <br>Cause: Did not apply for or obtain the permission to use the corresponding device.<br>Solutions: Please check whether the application has correctly applied for the camera or microphone permission, and whether the user has granted the corresponding permission. */
    ZegoErrorCode[ZegoErrorCode["DeviceErrorTypeNoAuthorization"] = 1006003] = "DeviceErrorTypeNoAuthorization";
    /** Description: The frame rate of the capture device is 0.<br>Cause: Device error, or device does not have permission.<br>Solutions: Please use the system's video or audio recording application to check whether the device can work normally. Please check whether the application has correctly applied for the camera or microphone permission, and whether the user has granted the corresponding permission. If the device is normal and the application has obtained the corresponding device permissions, please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["DeviceErrorTypeZeroFps"] = 1006004] = "DeviceErrorTypeZeroFps";
    /** Description: The device is occupied.<br>Cause: The device is occupied by other programs.<br>Solutions: Please use the system's video or audio recording application to check whether the device is working properly and make sure that the device is not occupied by other applications. */
    ZegoErrorCode[ZegoErrorCode["DeviceErrorTypeInUseByOther"] = 1006005] = "DeviceErrorTypeInUseByOther";
    /** Description: The device is unplugged.<br>Cause: The device is unplugged or not properly connected.<br>Solutions: Check the device wiring and reconnect the device. */
    ZegoErrorCode[ZegoErrorCode["DeviceErrorTypeUnplugged"] = 1006006] = "DeviceErrorTypeUnplugged";
    /** Description: The device needs to be restarted.<br>Cause: Device driver update, or device error requires restart.<br>Solutions: Restart device. */
    ZegoErrorCode[ZegoErrorCode["DeviceErrorTypeRebootRequired"] = 1006007] = "DeviceErrorTypeRebootRequired";
    /** Description: The device media is lost.<br>Cause: Media service cannot be restored.<br>Solutions: Restart device. */
    ZegoErrorCode[ZegoErrorCode["DeviceErrorMediaServicesLost"] = 1006008] = "DeviceErrorMediaServicesLost";
    /** Description: The device list cannot be empty when trying to release devices.<br>Cause: The device list has been released or has not been initialized.<br>Solutions: Ignore it. */
    ZegoErrorCode[ZegoErrorCode["DeviceFreeDeviceListNull"] = 1006020] = "DeviceFreeDeviceListNull";
    /** Description: The set sound level monitoring interval is out of range.<br>Cause: The set sound level monitoring interval is less than 100 milliseconds, or greater than 3000 milliseconds.<br>Solutions: Reset the effective sound level monitoring interval, the effective sound level monitoring interval is [100, 3000], in milliseconds. */
    ZegoErrorCode[ZegoErrorCode["DeviceSouldLevelIntervalInvalid"] = 1006031] = "DeviceSouldLevelIntervalInvalid";
    /** Description: The set audio spectrum monitoring interval is out of range.<br>Cause:  The set audio spectrum monitoring interval is less than 10 milliseconds.<br>Solutions: Reset audio spectrum monitoring interval which is not less than 10 milliseconds. */
    ZegoErrorCode[ZegoErrorCode["DeviceAudioSpectrumIntervalInvalid"] = 1006032] = "DeviceAudioSpectrumIntervalInvalid";
    /** Description: Failed to set the camera zoom. <br>Cause: The set camera zoom factor is out of range. <br>Solutions: The set camera zoom factor cannot exceed the maximum range obtained, the maximum range can be obtained through [getCameraMaxZoomFactor]. */
    ZegoErrorCode[ZegoErrorCode["DeviceZoomFactorInvalid"] = 1006040] = "DeviceZoomFactorInvalid";
    /** Description: Failed to set the camera exposure compensation. <br>Cause: The set camera exposure compensation value is out of range. <br>Solutions: Set the camera exposure compensation range between [-1,1]. */
    ZegoErrorCode[ZegoErrorCode["DeviceExposureCompensationValueInvalid"] = 1006041] = "DeviceExposureCompensationValueInvalid";
    /** invalid audio VAD monitor type */
    ZegoErrorCode[ZegoErrorCode["DeviceAudioVadStableStateMonitorTypeInvalid"] = 1006042] = "DeviceAudioVadStableStateMonitorTypeInvalid";
    /** Description: Internal error of the device. <br>Solutions: Contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["DeviceInnerError"] = 1006099] = "DeviceInnerError";
    /** Description: Unknown error of the pre-processing module. <br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["PreprocessPreprocessUnknownError"] = 1007001] = "PreprocessPreprocessUnknownError";
    /** Description: Failed to set the beauty configuration. <br>Cause: The incoming beauty parameters are incorrect. <br>Solutions: Please check the passed in [ZegoBeautifyOption] type parameter. */
    ZegoErrorCode[ZegoErrorCode["PreprocessBeautifyOptionInvalid"] = 1007005] = "PreprocessBeautifyOptionInvalid";
    /** The reverberation parameter is null. Please check the input parameter. This error code is deprecated. */
    ZegoErrorCode[ZegoErrorCode["PreprocessReverbParamNull"] = 1007006] = "PreprocessReverbParamNull";
    /** The voice changer parameter is null. Please check the input parameter. This error code is deprecated. */
    ZegoErrorCode[ZegoErrorCode["PreprocessVoiceChangerParamNull"] = 1007007] = "PreprocessVoiceChangerParamNull";
    /** Description: Failed to set the reverberation parameters. <br>Cause: the reverberation room size parameter is invalid. <br>Solutions: The normal range of the reverberation room size parameter is 0.0 ~ 1.0 */
    ZegoErrorCode[ZegoErrorCode["PreprocessReverbParamRoomSizeInvalid"] = 1007011] = "PreprocessReverbParamRoomSizeInvalid";
    /** Description: Failed to set the reverberation parameters. <br>Cause: The reverberance parameter is invalid. <br>Solutions: The normal range of the reverberance parameter is 0.0 ~ 0.5 */
    ZegoErrorCode[ZegoErrorCode["PreprocessReverbParamReverberanceInvalid"] = 1007012] = "PreprocessReverbParamReverberanceInvalid";
    /** Description: Failed to set the reverberation parameters. <br>Cause: the reverberation damping parameter is invalid. <br>Solutions: The normal range of the reverberation damping parameter is 0.0 ~ 2.0 */
    ZegoErrorCode[ZegoErrorCode["PreprocessReverbParamDampingInvalid"] = 1007013] = "PreprocessReverbParamDampingInvalid";
    /** Description: Failed to set the reverberation parameters. <br>Cause: The dry_wet_ratio parameter of the reverberation is invalid. <br>Solutions: The normal range of the dry_wet_ratio parameter of reverberation is greater than 0.0 */
    ZegoErrorCode[ZegoErrorCode["PreprocessReverbParamDryWetRatioInvalid"] = 1007014] = "PreprocessReverbParamDryWetRatioInvalid";
    /** Description: Failed to start virtual stereo. <br>Cause: The virtual stereo angle parameter is invalid. <br>Solutions: The normal range of angle parameter is -1 ~ 360. */
    ZegoErrorCode[ZegoErrorCode["PreprocessVirtualStereoAngleInvalid"] = 1007015] = "PreprocessVirtualStereoAngleInvalid";
    /** Description: Failed to set the voice changing parameters. <br>Cause: The param setting of the voice changing parameter is invalid. <br>Solutions: The normal range of parameter param is -12.0 ~ 12.0 */
    ZegoErrorCode[ZegoErrorCode["PreprocessVoiceChangerParamInvalid"] = 1007016] = "PreprocessVoiceChangerParamInvalid";
    /** The reverberation echo parameters is null. Please check the input parameter. */
    ZegoErrorCode[ZegoErrorCode["PreprocessReverbEchoParamNull"] = 1007017] = "PreprocessReverbEchoParamNull";
    /** Description: Set reverberation echo parameters failed . <br>Cause: The reverberation echo parameters is invalid. <br> Solutions: Input the correct reverb echo parameters [setReverbEchoParam]. */
    ZegoErrorCode[ZegoErrorCode["PreprocessReverbEchoParamInvalid"] = 1007018] = "PreprocessReverbEchoParamInvalid";
    /** Description: Failed to turn on or turn off the electronic sound effect. <br>Cause: the initial pitch parameter tonal of the electronic tone is invalid. <br>Solutions: The normal range of the starting pitch parameter of the electronic tone is 0 ~ 11. */
    ZegoErrorCode[ZegoErrorCode["PreprocessElectronicEffectsTonalInvalid"] = 1007019] = "PreprocessElectronicEffectsTonalInvalid";
    /** Description: Failed to open or close the beauty environment. <br>Cause: The beauty environment was not turned on or off before the engine started. <br>Solutions: Please make sure to turn on or turn off the beauty environment before the engine starts, for example: before calling (startPreview), (startPublishingStream), (startPlayingStream), (createMediaPlayer) or (createAudioEffectPlayer). */
    ZegoErrorCode[ZegoErrorCode["PreprocessEnableEffectsEnvFailed"] = 1007020] = "PreprocessEnableEffectsEnvFailed";
    /** Description: Failed to turn on or turn off the beauty effect. <br>Cause: The beauty environment is not activated. <br>Solutions: Please call [startEffectsEnv] to start the beauty environment first. */
    ZegoErrorCode[ZegoErrorCode["PreprocessEnableEffectsBeautyFailed"] = 1007021] = "PreprocessEnableEffectsBeautyFailed";
    /** Description: Failed to set beauty parameters. <br>Cause: The beauty environment is not activated. <br>Solutions: Please call [startEffectsEnv] to start the beauty environment first. */
    ZegoErrorCode[ZegoErrorCode["PreprocessSetEffectsParamFailed"] = 1007022] = "PreprocessSetEffectsParamFailed";
    /** Description: Effects Beauty does not support the currently set video data type. <br>Cause: [enableCustomVideoProcessing] interface, Windows platform only supports raw_data, Apple device only supports cv_pixel_buffer, Android platform supports gl_texture_2d. <br>Solutions: select the correct video data type. */
    ZegoErrorCode[ZegoErrorCode["PreprocessNotSupportEffectsBufferType"] = 1007023] = "PreprocessNotSupportEffectsBufferType";
    /** Description: The MediaPlayer failed to play the media. <br>Cause: The resource file is not loaded. <br> Solutions: Create a media player instance before using media players [createMediaPlayer]. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerNoInstance"] = 1008001] = "MediaPlayerNoInstance";
    /** Description: The MediaPlayer failed to play the media. <br>Cause: The resource file is not loaded. <br> Solutions: The media player loads the media resource [loadResource] before starting. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerNoFilePath"] = 1008003] = "MediaPlayerNoFilePath";
    /** Description: The MediaPlayer failed to load the file. <br>Cause: File formats are not supported. <br> Solutions: Files in this format are not supported, please use files in the supporting format. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerFileFormatError"] = 1008005] = "MediaPlayerFileFormatError";
    /** Description: The MediaPlayer failed to load the file. <br>Cause: The file path does not exist. <br> Solutions: Check the validity of the media file path. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerFilePathNotExists"] = 1008006] = "MediaPlayerFilePathNotExists";
    /** Description: The MediaPlayer failed to load the file. <br>Cause: The file decoding failed. <br> Solutions: Check that the media file is corrupted or contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerFileDecodeError"] = 1008007] = "MediaPlayerFileDecodeError";
    /** Description: The MediaPlayer failed to load the file. <br>Cause: No supported audio/video stream exists. <br> Solutions: Check that the media file data is empty. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerFileNoSupportedStream"] = 1008008] = "MediaPlayerFileNoSupportedStream";
    /** Description: The copyrighted music resource file has expired. <br>Cause: The resource file has expired. <br>Solutions: Please request song or accompaniment again. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerFileExpired"] = 1008009] = "MediaPlayerFileExpired";
    /** Description: The MediaPlayer failed to load the file. <br>Cause: There was an error during file resolution. <br> Solutions: Try again or contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerDemuxError"] = 1008010] = "MediaPlayerDemuxError";
    /** Description: The MediaPlayer failed to seek. <br>Cause: The file hasn't been loaded yet. <br> Solutions: The media player loads the media resource [loadResource] before seeking [seekTo]. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerSeekError"] = 1008016] = "MediaPlayerSeekError";
    /** Description: The MediaPlayer is configured with a video data format not supported by the platform. <br>Cause: The MediaPlayer is configured with a video data format not supported by the platform (e.g., CVPixelBuffer on iOS does not support NV21). <br> Solutions: Check the data format [setVideoHandler] supported by the current media player platform and set the correct data format. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerPlatformFormatNotSupported"] = 1008020] = "MediaPlayerPlatformFormatNotSupported";
    /** Description: The number of MediaPlayer instances exceeds the maximum number allowed. <br>Cause: The number of MediaPlayer instances exceeds the maximum number allowed. Up to 4 instances can be created. <br> Solutions: Media players can create up to 4 instances, and make sure that the number of media player instances is not exceeded the maximum limit. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerExceedMaxCount"] = 1008030] = "MediaPlayerExceedMaxCount";
    /** Description: The media player failed to specify the audio track index. <br>Cause: The audio track index not exist. <br>Solutions: Check file audio track index call [getAudioTrackCount] can get. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerSetAudioTrackIndexError"] = 1008040] = "MediaPlayerSetAudioTrackIndexError";
    /** Description: Media player setting sound change parameter invalid. <br>Cause: Error setting parameters. <br>Solutions: Checking setting parameters control during -12.0 to 12.0 */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerSetVoiceChangerParamInvalid"] = 1008041] = "MediaPlayerSetVoiceChangerParamInvalid";
    /** Description: takeSnapshot screenshot failed <br>Cause: The video is not playing or 'setPlayerCanvas' is not called to display the video to the control. <br>Solutions: Check whether the video plays normally(check [onPlayStart] callback) and the screen is displayed normally. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerTakeSnapshotTimingError"] = 1008042] = "MediaPlayerTakeSnapshotTimingError";
    /** Description: the passed parameter is not in the valid value range. <br>Cause: error setting parameters. <br>Solutions: Review the interface comment and pass in a value within the legal range. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerParamValueRangeIllegal"] = 1008043] = "MediaPlayerParamValueRangeIllegal";
    /** Description: MediaPlayer internal error. <br>Cause: internal error. <br>Solutions: Contact Technical support. */
    ZegoErrorCode[ZegoErrorCode["MediaPlayerInnerError"] = 1008099] = "MediaPlayerInnerError";
    /** Description: the input message content is empty <br>Cause: imessage content is empty <br>Solutions: Input a non-empty message. */
    ZegoErrorCode[ZegoErrorCode["IMContentNull"] = 1009001] = "IMContentNull";
    /** Description: The input message content is too long <br>Cause: message more than 1024 bytes. <br>Solutions: The maximum length should be less than 1024 byte */
    ZegoErrorCode[ZegoErrorCode["IMContentTooLong"] = 1009002] = "IMContentTooLong";
    /** Description: The input real-time sequential data is too long. <br>Cause: The length of the input data is greater than 4096 bytes. <br>Solution: Check the length of the input data, consider splitting the large data packet into multiple small data and sending it multiple times. */
    ZegoErrorCode[ZegoErrorCode["IMDataTooLong"] = 1009003] = "IMDataTooLong";
    /** Description: The room where the message is sent is different from the room currently logged in. <br>Cause: The room where the message is sent is different from the room currently logged in. <br>Solutions: Send a message to the current logged-in room ID. */
    ZegoErrorCode[ZegoErrorCode["IMInconsistentRoomId"] = 1009005] = "IMInconsistentRoomId";
    /** Description: Failed to send the message. <br>Cause: network problems. <br>Solutions: Check the network. */
    ZegoErrorCode[ZegoErrorCode["IMSendFailed"] = 1009010] = "IMSendFailed";
    /** Description: Failed to send custom command. <br>Cause: The entered user ID is empty. <br>Solutions: Please enter the correct user ID. */
    ZegoErrorCode[ZegoErrorCode["IMUserIdEmpty"] = 1009011] = "IMUserIdEmpty";
    /** Description: Failed to send custom signaling. <br>Cause: The entered user ID is too long. <br>Solutions: Please enter the correct user ID, the maximum user ID cannot exceed 64 bytes. */
    ZegoErrorCode[ZegoErrorCode["IMUserIdTooLong"] = 1009012] = "IMUserIdTooLong";
    /** Description: Failed to send message. <br>Cause: The message input length exceeds the limit. <br>Solutions: Check the input content length or contact ZEGO technical support to expand the message content length. */
    ZegoErrorCode[ZegoErrorCode["IMInputParamsLengthLimit"] = 1009013] = "IMInputParamsLengthLimit";
    /** Description: Failed to send broadcast message,. <br>Cause: QPS exceeds the limit. <br>Solutions: Control the maximum QPS is 2 . */
    ZegoErrorCode[ZegoErrorCode["IMBroadcastMessageQpsOverload"] = 1009015] = "IMBroadcastMessageQpsOverload";
    /** Description: The real-time sequential data manager instance creation failed. <br>Cause: A manager instance with this room ID has already been created. <br>Solution: A maximum of 1 instance can be created for each room ID. If you need to create multiple instances, please use other room IDs. */
    ZegoErrorCode[ZegoErrorCode["IMManagerCreationFailed"] = 1009031] = "IMManagerCreationFailed";
    /** Description: The specified real-time sequential data manager instance could not be found. <br>Cause: This manager instance has not been created yet. <br>Solution: Please call the [createRealTimeSequentialDataManager] function to create a manager instance first. */
    ZegoErrorCode[ZegoErrorCode["IMNoManagerInstance"] = 1009032] = "IMNoManagerInstance";
    /** Description: No publish channel available for broadcasting. <br>Cause: The developer has used all publish channels. <br>Solution: Do not use all the publish channels, check if there are any streams that can stop publsihing, or contact ZEGO technical support to increase the available publish channels. */
    ZegoErrorCode[ZegoErrorCode["IMNoAvailableBroadcastChannel"] = 1009033] = "IMNoAvailableBroadcastChannel";
    /** Description: The stream ID to start broadcasting is not available. <br>Cause: The stream ID has been used in this device for RTC business (e.g. [startPublishingStream] / [startPlayingStream]). <br>Solution: Please use another stream ID for broadcasting. */
    ZegoErrorCode[ZegoErrorCode["IMNoAvailableStreamId"] = 1009034] = "IMNoAvailableStreamId";
    /** Description: Repeat broadcast. <br>Cause: The developer repeatedly calls the [startBroadcasting] function. <br>Solution: Please check the business logic to avoid repeating the broadcast for the stream which is broadcasting. */
    ZegoErrorCode[ZegoErrorCode["IMRepeatBroadcast"] = 1009035] = "IMRepeatBroadcast";
    /** Description: The stream to stop broadcasting does not exist. <br>Cause: The stream ID set [stopBroadcasting] function is not in broadcasting. <br>Solution: Check if the stream ID is correct, or if the stream ID is not in broadcasting. */
    ZegoErrorCode[ZegoErrorCode["IMNoBroadcatingStream"] = 1009036] = "IMNoBroadcatingStream";
    /** Description: The stream to stop subscribing does not exist. <br>Cause: The stream ID set [stopSubscribing] function is not in subscribing. <br>Solution: Check if the stream ID is correct, or if the stream ID is not in subscribing. */
    ZegoErrorCode[ZegoErrorCode["IMNoSubscribingStream"] = 1009037] = "IMNoSubscribingStream";
    /** Description: Repeat broadcast. <br>Cause: The developer repeatedly calls the [startBroadcasting] function. <br>Solution: Please check the business logic to avoid repeating the subscribe for the stream which is subscribing. */
    ZegoErrorCode[ZegoErrorCode["IMRepeatSubscribe"] = 1009038] = "IMRepeatSubscribe";
    /** Description: Failed to send real-time sequential data. <br>Cause: The broadcast has not started yet, or the broadcast has encountered network problems. <br>Solution: Check whether [startBroadcasting] has been called to start broadcasting, or check whether the network is normal. */
    ZegoErrorCode[ZegoErrorCode["IMRealTimeSequentialDataSendFailed"] = 1009039] = "IMRealTimeSequentialDataSendFailed";
    /** Description: the file name suffix is not supported. <br>Cause: the file name suffix is not supported. <br>Solutions: only support .mp4/.aac/.flv. */
    ZegoErrorCode[ZegoErrorCode["RecorderFileSuffixNameFormatNotSupport"] = 1010002] = "RecorderFileSuffixNameFormatNotSupport";
    /** Description: Generic recording API error. <br>Cause: Invalid input parameter. <br> Solutions: Please check the record file path parameter or the record file format parameter is valid or not. */
    ZegoErrorCode[ZegoErrorCode["RecorderCommonLiveroomApiError"] = 1010003] = "RecorderCommonLiveroomApiError";
    /** Description: The specified recorded file path is too long. <br>Cause: The specified recorded file path is too long. The maximum length should be less than 1024 bytes. <br> Solutions: Please specify recorded file path less than 1024 bytes. */
    ZegoErrorCode[ZegoErrorCode["RecorderFilePathTooLong"] = 1010011] = "RecorderFilePathTooLong";
    /** Description: SDK internal error. <br>Cause: Internal error. <br> Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["RecorderInnerVeError"] = 1010012] = "RecorderInnerVeError";
    /** Description: Open file failed. <br>Cause: Invalid file path or no permissions to read/write file. <br> Solutions: Please specify a valid file path and has proper permissions to read/write. */
    ZegoErrorCode[ZegoErrorCode["RecorderOpenFileFailed"] = 1010013] = "RecorderOpenFileFailed";
    /** Description: Write file failed. <br>Cause: No permissions to write file. <br> Solutions: Please specify a valid file path and has proper permissions to write. */
    ZegoErrorCode[ZegoErrorCode["RecorderWriteFileError"] = 1010014] = "RecorderWriteFileError";
    /** Description: Insufficient disk space. <br>Cause: Insufficient disk space. <br> Solutions: Please ensure sufficient disk space. */
    ZegoErrorCode[ZegoErrorCode["RecorderNoEnoughSpareCapacity"] = 1010017] = "RecorderNoEnoughSpareCapacity";
    /** Description: File handle exception. <br>Cause: File handle exception. <br> Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["RecorderFileHandleExceptions"] = 1010018] = "RecorderFileHandleExceptions";
    /** Description: I/O exception. <br>Cause: I/O exception. <br> Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["RecorderIoExceptions"] = 1010019] = "RecorderIoExceptions";
    /** Description: The custom video capturer is not created. <br>Cause: Create custom video capturer before onStart callback received. <br> Solutions: Please create custom video capturer after received onStart callback. */
    ZegoErrorCode[ZegoErrorCode["CustomVideoIOCapturerNotCreated"] = 1011001] = "CustomVideoIOCapturerNotCreated";
    /** Description: The custom video capture module is not enabled. <br>Cause: Custom video capture module is not enabled in initialization configurations. <br> Solutions: Please contact ZEGO technical support, make sure custom video capture module is enabled in initialization configurations. */
    ZegoErrorCode[ZegoErrorCode["CustomVideoIONoCustomVideoCapture"] = 1011002] = "CustomVideoIONoCustomVideoCapture";
    /** Description: Failed to enable/disable custom video capture/rendering. <br>Cause: Not enable/disable custom video capture/rendering before engine is started. <br> Solutions: Please make sure to enable/disable custom video capture/rendering before engine is started, i.e., before calling (startPreview), (startPublishingStream), (startPlayingStream), (createMediaPlayer) or (createAudioEffectPlayer). */
    ZegoErrorCode[ZegoErrorCode["CustomVideoIOEnableCustomIoFailed"] = 1011003] = "CustomVideoIOEnableCustomIoFailed";
    /** Description: The custom video capturer is not created. <br>Cause: Internal video-related modules are not created. <br> Solutions: Please call [startPreview] or [startPublishingStream] first. */
    ZegoErrorCode[ZegoErrorCode["CustomVideoIOProcessModuleNotCreated"] = 1011004] = "CustomVideoIOProcessModuleNotCreated";
    /** Description: The custom video process module is not enabled. <br>Cause: The custom video process module is not enabled. <br> Solutions: Call [enableCustomVideoProcessing] to enable a custom video capturermodule. */
    ZegoErrorCode[ZegoErrorCode["CustomVideoIONoCustomVideoProcessing"] = 1011005] = "CustomVideoIONoCustomVideoProcessing";
    /** Description: The currently configured custom video capture format does not support this API. <br>Cause: The currently configured custom video capture format does not support this API. <br> Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["CustomVideoIONotSupportedFormat"] = 1011010] = "CustomVideoIONotSupportedFormat";
    /** Description: Custom video rendering does not support the currently set video buffer type. <br>Cause: The buffer_type in the config parameter of [enableCustomVideoRender] only supports raw_data, cv_pixel_buffer, encoded_data. For [enableCustomVideoProcessing], only raw_data is supported on Windows platform, only cv_pixel_buffer is supported on Apple devices, and gl_texture_2d and surface_texture are supported on Android platform. <br> Solutions: Select the correct video buffer type. */
    ZegoErrorCode[ZegoErrorCode["CustomVideoIONotSupportedBufferType"] = 1011011] = "CustomVideoIONotSupportedBufferType";
    /** Description: Unsupported custom audio source type. <br>Cause: Only channel_aux supports zego_audio_source_type_media_player. <br> Solutions: Select the correct custom audio source type. */
    ZegoErrorCode[ZegoErrorCode["CustomAudioIOUnsupportedAudioSourceType"] = 1012001] = "CustomAudioIOUnsupportedAudioSourceType";
    /** Description: The custom audio capture feature is not enabled. <br>Cause: The custom audio capture feature is not enabled. <br> Solutions: Please make sure that the custom audio IO module is enabled for the specified stream publishing channel. */
    ZegoErrorCode[ZegoErrorCode["CustomAudioIOCapturerNotCreated"] = 1012002] = "CustomAudioIOCapturerNotCreated";
    /** Description: The custom audio rendering feature is not enabled. <br>Cause: The custom audio rendering feature is not enabled. <br> Solutions: Please make sure that the custom audio IO module is enabled. */
    ZegoErrorCode[ZegoErrorCode["CustomAudioIORendererNotCreated"] = 1012003] = "CustomAudioIORendererNotCreated";
    /** Description: Failed to enable/disable custom audio IO. <br>Cause: Failed to enable/disable custom audio IO. <br> Solutions: Please make sure to enable/disable it before the engine is started (i.e., before calling `startPreview`, `startPublishingStream` or `startPlayingStream`). */
    ZegoErrorCode[ZegoErrorCode["CustomAudioIOEnableCustomAudioIoFailed"] = 1012004] = "CustomAudioIOEnableCustomAudioIoFailed";
    /** Description: The sample rate parameter is illegal. <br>Cause: Capture and render mix results recording does not support 8000, 22050, 24000 sample rates. <br> Solutions: Please confirm whether the sample rate parameter value allowed by the interface is legal. */
    ZegoErrorCode[ZegoErrorCode["CustomAudioIOAudioDataCallbackSampleRateNoSupport"] = 1012010] = "CustomAudioIOAudioDataCallbackSampleRateNoSupport";
    /** Description: The MediaDataPublisher instance is not created. <br>Cause: The MediaDataPublisher instance is not created. <br> Solutions: Call [createMediaDataPublisher] to create a media pusher instance. */
    ZegoErrorCode[ZegoErrorCode["MediaDataPublisherNoInstance"] = 1013000] = "MediaDataPublisherNoInstance";
    /** Description: This error code is deprecated. <br>Cause: None. <br> Solutions: None. */
    ZegoErrorCode[ZegoErrorCode["MediaDataPublisherFileParseError"] = 1013001] = "MediaDataPublisherFileParseError";
    /** Description: This error code is deprecated. <br>Cause: None. <br> Solutions: None. */
    ZegoErrorCode[ZegoErrorCode["MediaDataPublisherFilePathError"] = 1013002] = "MediaDataPublisherFilePathError";
    /** Description: File decoding exception. <br>Cause: Invalid media file format. <br>Solutions: Please check the file is a valid media file or not; check the file format is in the MediaPlayer support file format list or not. */
    ZegoErrorCode[ZegoErrorCode["MediaDataPublisherFileCodecError"] = 1013003] = "MediaDataPublisherFileCodecError";
    /** Description: Timestamp error. <br>Cause: the later frame timestamp is smaller than the previous frame timestamp. <br>Solutions: Please provide the media file, and contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["MediaDataPublisherTimestampGoBackError"] = 1013004] = "MediaDataPublisherTimestampGoBackError";
    /** Description: The number of instances of the media data publisher created exceeds the maximum limit. <br>Cause: The number of instances of the media data publisher created exceeds the maximum limit. <br> Solutions: Please check if the number of instances of the media data publisher created exceeds the maximum limit, the maximum number of instances allowed to be created is 1. */
    ZegoErrorCode[ZegoErrorCode["MediaDataPublisherExceedMaxCount"] = 1013005] = "MediaDataPublisherExceedMaxCount";
    /** Description: No audio effect player instance. <br>Cause: The audio effect player instance not created. <br> Solutions: Create an audio effect player instance before using it(createAudioEffectPlayer). */
    ZegoErrorCode[ZegoErrorCode["AudioEffectPlayerNoInstance"] = 1014000] = "AudioEffectPlayerNoInstance";
    /** Description: Load audio effect resource failed. <br>Cause: Invalid audio effect resource file. <br> Solutions: Check the file format is in the AudioEffectPlayer support file format list or not. */
    ZegoErrorCode[ZegoErrorCode["AudioEffectPlayerLoadFailed"] = 1014001] = "AudioEffectPlayerLoadFailed";
    /** Description: Play audio effect failed. <br>Cause: Invalid audio effect resource file. <br> Solutions: Check the file format is in the AudioEffectPlayer support file format list or not. */
    ZegoErrorCode[ZegoErrorCode["AudioEffectPlayerPlayFailed"] = 1014002] = "AudioEffectPlayerPlayFailed";
    /** Description: Change audio effect progress failed. <br>Cause: The audio effect progress value exceed audio effect file duration. <br> Solutions: Please check the audio effect progress value exceed audio effect file duration or not. */
    ZegoErrorCode[ZegoErrorCode["AudioEffectPlayerSeekFailed"] = 1014003] = "AudioEffectPlayerSeekFailed";
    /** Description: The number of instances of the audio effect player created exceeds the maximum limit. <br>Cause: The number of instances of the audio effect player created exceeds the maximum limit. <br> Solutions: Please check if the number of instances of the audio effect player created exceeds the maximum limit, the maximum number of instances allowed to be created is 1. */
    ZegoErrorCode[ZegoErrorCode["AudioEffectPlayerExceedMaxCount"] = 1014004] = "AudioEffectPlayerExceedMaxCount";
    /** Description: Network connectivity test failed. <br>Cause: Not connected to the network. <br> Solutions: Please check if you can access the Internet properly. */
    ZegoErrorCode[ZegoErrorCode["UtilitiesNetworkConnectivityTestFailed"] = 1015001] = "UtilitiesNetworkConnectivityTestFailed";
    /** Description: Network speed test connection failure. <br>Cause: Not connected to the network. <br> Solutions: Please check if you can access the Internet properly. */
    ZegoErrorCode[ZegoErrorCode["UtilitiesNetworkToolConnectServerFailed"] = 1015002] = "UtilitiesNetworkToolConnectServerFailed";
    /** Description: RTP timeout. <br>Cause: Not connected to the network. <br> Solutions: Please check if you can access the Internet properly. */
    ZegoErrorCode[ZegoErrorCode["UtilitiesNetworkToolRtpTimeoutError"] = 1015003] = "UtilitiesNetworkToolRtpTimeoutError";
    /** Description: The server side ends the network speed test. <br>Cause: Network speed test time is too long. <br> Solutions: Please stop network speed test in 3 minutes. */
    ZegoErrorCode[ZegoErrorCode["UtilitiesNetworkToolEngineDenied"] = 1015004] = "UtilitiesNetworkToolEngineDenied";
    /** Description: Network speed test stopped. <br>Cause: Network speed test not stopped before publishing stream. <br> Solutions: Please stop network speed test(stopNetworkSpeedTest) before publishing stream. */
    ZegoErrorCode[ZegoErrorCode["UtilitiesNetworkToolStoppedByPublishingStream"] = 1015005] = "UtilitiesNetworkToolStoppedByPublishingStream";
    /** Description: Network speed test stopped. <br>Cause: Network speed test not stopped before playing stream. <br> Solutions: Please stop network speed test(stopNetworkSpeedTest) before playing stream. */
    ZegoErrorCode[ZegoErrorCode["UtilitiesNetworkToolStoppedByPlayingStream"] = 1015006] = "UtilitiesNetworkToolStoppedByPlayingStream";
    /** Description: Network speed test internal error. <br>Cause: Internal error. <br> Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["UtilitiesNetworkToolInnerError"] = 1015009] = "UtilitiesNetworkToolInnerError";
    /** Description: Invalid system performance monitoring interval. <br>Cause: The set system performance monitoring interval is out of range. <br> Solutions: Please check if the system performance monitoring interval is out of range or not, valid range is [1000, 10000]. */
    ZegoErrorCode[ZegoErrorCode["UtilitiesPerformanceMonitorIntervalInvalid"] = 1015031] = "UtilitiesPerformanceMonitorIntervalInvalid";
    /** Description: Login to the room causes the network test to stop. <br>Cause: Already logged in to the room. <br>Solutions: Since the network test will take up bandwidth, please do it before logging in to the room. */
    ZegoErrorCode[ZegoErrorCode["UtilitiesStopByLoginRoom"] = 1015032] = "UtilitiesStopByLoginRoom";
    /** Description: The function call failed. <br>Cause: No range auido instance has been created. <br>Solutions: Create a range audio instance. */
    ZegoErrorCode[ZegoErrorCode["RangeAudioNoInstance"] = 1016000] = "RangeAudioNoInstance";
    /** Description: Failed to create range audio. <br>Cause: The instance exceeds the maximum limit. <br>Solutions: Use the used range audio example. */
    ZegoErrorCode[ZegoErrorCode["RangeAudioExceedMaxCount"] = 1016001] = "RangeAudioExceedMaxCount";
    /** Description: Failed to create range voice. <br>Cause: Range voice cannot be used in multi-room mode. <br>Solutions: Set the single-party mode. */
    ZegoErrorCode[ZegoErrorCode["RangeAudioNotSupportMultiRoom"] = 1016002] = "RangeAudioNotSupportMultiRoom";
    /** Description: Failed to set the team ID. <br>Cause: The input team ID exceeds the maximum limit. <br>Solutions: The input string is less than 64 bytes. */
    ZegoErrorCode[ZegoErrorCode["RangeAudioTeamIdTooLong"] = 1016003] = "RangeAudioTeamIdTooLong";
    /** Description: Failed to set the team ID.<br>Cause: The input user ID contains invalid characters. <br>Solutions: User ID can only contains numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', ',', '.', '<', '>', '/', '\'. */
    ZegoErrorCode[ZegoErrorCode["RangeAudioTeamIdInvalidCharacter"] = 1016004] = "RangeAudioTeamIdInvalidCharacter";
    /** Description: The command invalid. <br>Cause: The command entered by the [sendExtendedRequest] function is empty. <br>Solutions: Please check the command entered when calling the [sendExtendedRequest] function to make sure it is not empty. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicCommandInvalid"] = 1017000] = "CopyrightedMusicCommandInvalid";
    /** Description: The params invalid. <br>Cause: The params entered by the [sendExtendedRequest] function is empty. <br>Solutions: Please check the params entered when calling the [sendExtendedRequest] function to make sure it is not empty. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicParamsInvalid"] = 1017001] = "CopyrightedMusicParamsInvalid";
    /** Description: The song_id invalid. <br>Cause: The song_id entered is empty. <br>Solutions: Please check the song_id entered when calling the function to make sure it is not empty. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicSongIdInvalid"] = 1017002] = "CopyrightedMusicSongIdInvalid";
    /** Description: The share_token invalid. <br>Cause: The share_token entered is empty. <br>Solutions: Please check the share_token entered when calling the function to make sure it is not empty.share_token can be obtained by call [requestAccompaniment] */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicShareTokenInvalid"] = 1017003] = "CopyrightedMusicShareTokenInvalid";
    /** Description: The resource_id invalid. <br>Cause: The resource_id entered is empty. <br>Solutions: Please check the resource_id entered when calling the function to make sure it is not empty.resource_id can be obtained by call [requestSong] [requestAccompaniment] [getMusicByToken] */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicResourceIdInvalid"] = 1017004] = "CopyrightedMusicResourceIdInvalid";
    /** Description: The start_position invalid. <br>Cause: The start_position entered by the fuction [loadCopyrightedMusicResourceWithPosition] is invalid. <br>Solutions: Please check the start_position entered when calling the function [loadCopyrightedMusicResourceWithPosition] to make sure it is in 0 ~ song duration. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicStartPositionInvalid"] = 1017005] = "CopyrightedMusicStartPositionInvalid";
    /** Description: The position invalid. <br>Cause: The position entered by the fuction [seek] is invalid. <br>Solutions: Please check the position entered when calling the function [seek] to make sure it is in 0 ~ song duration. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicPositionInvalid"] = 1017006] = "CopyrightedMusicPositionInvalid";
    /** Description: The volume invalid.. <br>Cause: The Volume entered by the fuction [setPlayVolume] is invalid. <br>Solutions: Please check the Volume entered when calling the function [setPlayVolume] to make sure it is in 0 ~ 200. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicVolumeInvalid"] = 1017007] = "CopyrightedMusicVolumeInvalid";
    /** Description: The krcToken invalid. <br>Cause: The krcToken entered is empty. <br>Solutions: Please check the krcToken entered when calling the function to make sure it is not empty.krcToken can be obtained by call [requestAccompaniment] */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicKrcTokenInvalid"] = 1017008] = "CopyrightedMusicKrcTokenInvalid";
    /** Description: Copyright music init authentication failed. <br>Cause: Appsign or token is not set. <br>Solutions: When using token authentication, call [loginRoom] before calling [initCopyrightedMusic] or use appsign authentication. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicCopyrightedMusicAuthParamInvalid"] = 1017009] = "CopyrightedMusicCopyrightedMusicAuthParamInvalid";
    /** Description: Request copyrighted server fail. <br>Cause: The params entered make mistake or some network reasons. <br>Solutions: Please check the params entered and retry. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicCopyrightedServerFail"] = 1017010] = "CopyrightedMusicCopyrightedServerFail";
    /** Description: Free space limit. <br>Cause: Free space limit. <br>Solutions: Please clean up local files and make sure there is enough free disk space. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicFreeSpaceLimit"] = 1017011] = "CopyrightedMusicFreeSpaceLimit";
    /** Description: Downloading. <br>Cause: Download same resource. <br>Solutions: Please wait for the resource to download successfully. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicDownloading"] = 1017012] = "CopyrightedMusicDownloading";
    /** Description: Resource file not exist. <br>Cause: Resource file has been deleted. <br>Solutions: Please reload resource. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicResourceFileNotExist"] = 1017013] = "CopyrightedMusicResourceFileNotExist";
    /** Description: Resource file expired. <br>Cause: The resource file has expired. <br>Solutions: Please request song or accompaniment again. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicResourceFileExpired"] = 1017014] = "CopyrightedMusicResourceFileExpired";
    /** Description: Resource file invalid. <br>Cause: File is corrupted <br>Solutions: Please call [download] function to reload media resource. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicResourceFileInvalid"] = 1017015] = "CopyrightedMusicResourceFileInvalid";
    /** Description: The resource_id unauthorized. <br>Cause: When [download] is called to download resources, the resource_id is unauthorization. <br>Solutions: Please call the [requestSong] [requestAccompaniment] [requestAccompanimentClip] [getMusicByToken] function before call [load] function to load resource. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicResourceIdUnauthorized"] = 1017018] = "CopyrightedMusicResourceIdUnauthorized";
    /** Description: No copyright, unable to listen to and sing songs. <br>Cause: No copyright. <br>Solutions: Please select another music. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicNoCopyright"] = 1017030] = "CopyrightedMusicNoCopyright";
    /** Description: No permissions of accompaniment, can only listen to songs, not sing. <br>Cause: No permissions of accompaniment. <br>Solutions: Please select another music. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicNoPermissionsOfLyricsAndMusic"] = 1017031] = "CopyrightedMusicNoPermissionsOfLyricsAndMusic";
    /** Description: Non monthly membership. <br>Cause: Unopened monthly membership. <br>Solutions: Open monthly membership or ues COUNT mode request music. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicNonMonthlyMembership"] = 1017032] = "CopyrightedMusicNonMonthlyMembership";
    /** Description: No accompany. <br>Cause: Music don't have accompany. <br>Solutions: Please choice music have accompany. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicNoAccompany"] = 1017033] = "CopyrightedMusicNoAccompany";
    /** Description: Resource not exist. <br>Cause: Resource not exist. <br>Solutions: Please select another music. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicResourceNotExist"] = 1017034] = "CopyrightedMusicResourceNotExist";
    /** Description: Illegal param. <br>Cause: The entered param is incorrect. <br>Solutions: Please check param when entered function to make sure it is correct. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicIllegalParam"] = 1017040] = "CopyrightedMusicIllegalParam";
    /** Description: AppID invalid. <br>Cause: The appID is not support copyrighted music. <br>Solutions: Please contact ZEGO technical support. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicAppidInvalid"] = 1017041] = "CopyrightedMusicAppidInvalid";
    /** Description: Billing mode invalid. <br>Cause: Billing mode invalid. <br>Solutions: Please select correct billing mode. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicBillingModeInvalid"] = 1017042] = "CopyrightedMusicBillingModeInvalid";
    /** Description: Unreasonable_access. <br>Cause: Monthly membership request music by COUNT. <br>Solutions: Please select correct billing mode. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicUnreasonableAccess"] = 1017043] = "CopyrightedMusicUnreasonableAccess";
    /** Description: Share token expired. <br>Cause: Share token expired. <br>Solutions: Please select an unexpired sharing token to get resources. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicShareTokenExpired"] = 1017044] = "CopyrightedMusicShareTokenExpired";
    /** Description: Share token illegal. <br>Cause: Share token illegal. <br>Solutions: Please check songToken when entered by calling [getMusicByToken] to make sure it is correct. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicShareTokenIllegal"] = 1017045] = "CopyrightedMusicShareTokenIllegal";
    /** Description: krcToken illegal. <br>Cause: krcToken illegal. <br>Solutions: Please check krcToken when entered by calling [getKrcLyricByKrcToken] to make sure it is correct. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicKrcTokenIllegal"] = 1017046] = "CopyrightedMusicKrcTokenIllegal";
    /** Description: krcToken expired. <br>Cause: krcToken expired. <br>Solutions: Please select an unexpired krcToken to get lyrics in KRC format. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicKrcTokenExpired"] = 1017047] = "CopyrightedMusicKrcTokenExpired";
    /** Description: Get lyric fail. <br>Cause: Lyrics not found. <br>Solutions: Please try again later. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicGetLyricFail"] = 1017048] = "CopyrightedMusicGetLyricFail";
    /** Description: Get pitch fail. <br>Cause: Pitch not found. <br>Solutions: Please try again later. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicGetPitchFail"] = 1017049] = "CopyrightedMusicGetPitchFail";
    /** Description: This resource is not shared in the room. <br>Cause: No users in the room share this resource. <br>Solutions: Please any one user in the room to call the [requestresource] function to request resources and share them. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicNotSharedResource"] = 1017050] = "CopyrightedMusicNotSharedResource";
    /** Description: The number of times the resource is free in the room is exhausted. <br>Cause: 1. The shared resources cannot be obtained again; 2. Shared resources have been obtained. <br>Solutions: Please use the acquired resources, or use [requestResource] to share resources again */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicGetSharedResourceTimesOver"] = 1017051] = "CopyrightedMusicGetSharedResourceTimesOver";
    /** Description: The copyright music module does not support this method. <br>Cause: The copyright music module does not support this function under the current platform. <br>Solutions: Contact ZEGO technical support to deal with it. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicNotSupportMethod"] = 1017095] = "CopyrightedMusicNotSupportMethod";
    /** Description: The copyright music module is not initialized. <br>Cause: The [initCopyrightedMusic] method is not called to initialize the copyright module. <br>Solutions: Please call the [initCopyrightedMusic] method first. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicNoInit"] = 1017096] = "CopyrightedMusicNoInit";
    /** Description: System is busy. <br>Cause: System is busy. <br>Solutions: Please try again. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicSystemBusy"] = 1017097] = "CopyrightedMusicSystemBusy";
    /** Description: Failed due to network exceptions.<br>Cause: Unknown internal error.<br>Solutions: Contact ZEGO technical support to deal with it. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicNetworkError"] = 1017098] = "CopyrightedMusicNetworkError";
    /** Description: Failed due to internal system exceptions.<br>Cause: Unknown internal error.<br>Solutions: Contact ZEGO technical support to deal with it. */
    ZegoErrorCode[ZegoErrorCode["CopyrightedMusicInnerError"] = 1017099] = "CopyrightedMusicInnerError";
    /** Description: SDK internal return null pointer. */
    ZegoErrorCode[ZegoErrorCode["AudioVADClientInnerNullptr"] = 1018000] = "AudioVADClientInnerNullptr";
    /** Description: The function call failed. <br>Cause: No audio vad instance has been created. <br>Solutions: Create a audio vad instance. */
    ZegoErrorCode[ZegoErrorCode["AudioVADClientNoInstance"] = 1018001] = "AudioVADClientNoInstance";
    /** Description: Calling function failed. <br>Cause: Illegal parameter or SDK does not contain RangeScene module. <br>Solutions: Please confirm whether the SDK contains the RangeScene module and check the parameters. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneCallFunctionFailed"] = 1019000] = "RangeSceneCallFunctionFailed";
    /** Description: The RangeScene instance not created. <br>Cause: The RangeScene instance not created. <br> Solutions: Create a RangeScene instance before using RangeScene [createRangeScene]. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneNoInstance"] = 1019001] = "RangeSceneNoInstance";
    /** Description: Not login scene. <br>Cause: Not login scene. <br> Solutions: Please call [loginScene] to login scene. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneNotLoginScene"] = 1019002] = "RangeSceneNotLoginScene";
    /** Description: Use not support feature. <br>Cause: Use the status synchronization interface when the status synchronization function is not enabled. <br> Solutions: To use the status synchronization interface, please enable the status synchronization function. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneNotSupport"] = 1019003] = "RangeSceneNotSupport";
    /** Description: Scene login retry has exceeded the maximum retry time. <br>Cause: Possibly due to network problems. <br>Solutions: Please check whether the network is working or switch the network environment. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneRetryTimeout"] = 1019004] = "RangeSceneRetryTimeout";
    /** Description: Scene connection is temporarily interrupted. <br>Cause: Possibly due to network problems. <br>Solutions: Please wait or check whether the network is normal. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneNetworkInterrupt"] = 1019005] = "RangeSceneNetworkInterrupt";
    /** Description: Token verification failed. <br>Cause: The parameters passed in during token generation are inconsistent with the SDK. <br>Solutions: Please use the correct token regenerated. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneTokenIllegal"] = 1019006] = "RangeSceneTokenIllegal";
    /** Description: Token expire. <br>Cause: Token expire or the generated Token validity period parameter type is incorrect. <br>Solutions: Regenerate the Token. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneTokenExpire"] = 1019007] = "RangeSceneTokenExpire";
    /** Description: Coordinates out of range. <br>Cause: Coordinates out of scene range. <br>Solutions: Please pass in the correct coordinates. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneCoordinateOutOfRange"] = 1019020] = "RangeSceneCoordinateOutOfRange";
    /** Description: The item has been created. <br>Cause: The item has been created. <br>Solutions: The item has been created. You don't need to create it again. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneItemHasBeenCreated"] = 1019021] = "RangeSceneItemHasBeenCreated";
    /** Description: The item binding user exceeds the maximum limit. <br>Cause: The item binding user exceeds the maximum limit. <br>Solutions: The item binding user exceeds the maximum limit. Please try again later. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneItemBindExceedLimit"] = 1019022] = "RangeSceneItemBindExceedLimit";
    /** Description: The item does not exist. <br>Cause: The item does not exist. <br>Solutions: Please create an item first. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneItemNotExist"] = 1019023] = "RangeSceneItemNotExist";
    /** Description: The item is not bound. <br>Cause: The item is not bound. <br>Solutions: Please bind the item first. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneItemNotBind"] = 1019024] = "RangeSceneItemNotBind";
    /** Description: The item has been operated by others. <br>Cause: The item has been operated by others. <br>Solutions: Please try again later. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneItemCasFailed"] = 1019025] = "RangeSceneItemCasFailed";
    /** Description: The binding capacity of the item exceeds the maximum limit. <br>Cause: The binding capacity of the item exceeds the maximum limit. <br>Solutions: Please use a capacity that does not exceed the maximum binding capacity to create an item. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneItemCapacityExceedLimit"] = 1019026] = "RangeSceneItemCapacityExceedLimit";
    /** Description: The user has bound the item to the maximum limit. <br>Cause: The user has bound the item to the maximum limit. <br>Solutions: Please unbind some items that do not need to be operated temporarily. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneUserBindItemExceedLimit"] = 1019027] = "RangeSceneUserBindItemExceedLimit";
    /** Description: The item is beyond the user's view. <br>Cause: The item is beyond the user's view. <br>Solutions: Please operate the item within the user's view. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneItemOutOfUserView"] = 1019028] = "RangeSceneItemOutOfUserView";
    /** Description: The number of RangeScene instances exceeds the maximum number allowed. <br>Cause: The number of RangeScene instances exceeds the maximum number allowed. Up to 1 instances can be created. <br> Solutions: RangeScene can create up to 1 instances, and make sure that the number of RangeScene instances is not exceeded the maximum limit. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneExceedMaxCount"] = 1019030] = "RangeSceneExceedMaxCount";
    /** Description: The number of joined RangeScene teams exceeds the maximum number allowed. <br>Cause: The number of joined RangeScene teams exceeds the maximum number allowed. Up to 5 are allowed by default. <br> Solutions: RangeScene teams can joined are up to 5, and make sure that the number of RangeScene teams joned is not exceeded the maximum limit. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneTeamExceedMaxCount"] = 1019031] = "RangeSceneTeamExceedMaxCount";
    /** Description: Team id already been used. <br>Cause: The team id already been used when join team. <br> Solutions: Use a new team id to join team. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneTeamIdOccupied"] = 1019032] = "RangeSceneTeamIdOccupied";
    /** Description: Team id not exist. <br>Cause: Use incorrect team id when leave team. <br> Solutions: Use correct team id when leave team. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneTeamIdIncorrect"] = 1019033] = "RangeSceneTeamIdIncorrect";
    /** Description: Failed due to internal system exceptions.<br>Cause: Unknown internal error.<br>Solutions: Contact ZEGO technical support to deal with it. */
    ZegoErrorCode[ZegoErrorCode["RangeSceneInnerError"] = 1019099] = "RangeSceneInnerError";
    /** Description: Startup screen capture failed. <br>Cause: The user refused to grant the app screen capture permission. <br>Solutions: Allow the app to capture screen permissions. */
    ZegoErrorCode[ZegoErrorCode["ScreenCapturePermissionDenied"] = 1020000] = "ScreenCapturePermissionDenied";
    /** Description: Startup screen capture failed. <br>Cause: The current system version does not support screen capture. <br>Solutions: Use system version above Android 5 (API level 21). */
    ZegoErrorCode[ZegoErrorCode["ScreenCaptureNotSupport"] = 1020001] = "ScreenCaptureNotSupport";
    /** Description: Startup screen capture failed. <br>Cause: Unable to share the screen module. <br>Solutions: Please introduce screen sharing module resources, or contact technical support. */
    ZegoErrorCode[ZegoErrorCode["ScreenCaptureSdkNoModule"] = 1020002] = "ScreenCaptureSdkNoModule";
    /** Description: The function call failed. <br>Cause: No screen capture source instance has been created. <br>Solutions: Create a screen capture source instance. */
    ZegoErrorCode[ZegoErrorCode["ScreenCaptureNoInstance"] = 1020003] = "ScreenCaptureNoInstance";
    /** Description: Failed to create screen capture source. <br>Cause: The instance exceeds the maximum limit. <br>Solutions: Use an existing screen capture instance or destroy the previous instance. */
    ZegoErrorCode[ZegoErrorCode["ScreenCaptureExceedMaxCount"] = 1020004] = "ScreenCaptureExceedMaxCount";
})(ZegoErrorCode || (ZegoErrorCode = {}));
