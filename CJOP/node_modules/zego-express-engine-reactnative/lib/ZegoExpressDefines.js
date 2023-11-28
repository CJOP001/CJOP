/** Room scenario. */
export var ZegoScenario;
(function (ZegoScenario) {
    /** [Deprecated] Legacy general scenario, this scenario has been deprecated since version 3.0.0, and it is not recommended to use, please migrate to other new scenario as soon as possible. */
    ZegoScenario[ZegoScenario["General"] = 0] = "General";
    /** [Deprecated] Legacy communication scenario, this scenario has been deprecated since version 3.0.0, and it is not recommended to use, please migrate to other new scenario as soon as possible. */
    ZegoScenario[ZegoScenario["Communication"] = 1] = "Communication";
    /** [Deprecated] Legacy live broadcast scenario, this scenario has been deprecated since version 3.0.0, and it is not recommended to use, please migrate to other new scenario as soon as possible. */
    ZegoScenario[ZegoScenario["Live"] = 2] = "Live";
    /** Available since: 3.0.0. Description: The default (generic) scenario. If none of the following scenarios conform to your actual application scenario, this default scenario can be used. */
    ZegoScenario[ZegoScenario["Default"] = 3] = "Default";
    /** Available since: 3.0.0. Description: Standard video call (or voice call) scenario, it is suitable for one-to-one video or voice call scenarios. */
    ZegoScenario[ZegoScenario["StandardVideoCall"] = 4] = "StandardVideoCall";
    /** Available since: 3.0.0. Description: High quality video call (or voice call) scenario, it is similar to the standard video call scenario, but this scenario uses a higher video frame rate, bit rate, and resolution (540p) by default, which is suitable for video call scenario with high image quality requirements. */
    ZegoScenario[ZegoScenario["HighQualityVideoCall"] = 5] = "HighQualityVideoCall";
    /** Available since: 3.0.0. Description: Standard chatroom scenario, suitable for multi-person pure voice calls (low data usage). Note: On the ExpressVideo SDK, the camera is not enabled by default in this scenario. */
    ZegoScenario[ZegoScenario["StandardChatroom"] = 6] = "StandardChatroom";
    /** Available since: 3.0.0. Description: High quality chatroom scenario, it is similar to the standard chatroom scenario, but this scenario uses a higher audio bit rate than the standard chatroom scenario by default. It is suitable for multi-person pure voice call scenarios with high requirements on sound quality. Note: On the ExpressVideo SDK, the camera is not enabled by default in this scenario. */
    ZegoScenario[ZegoScenario["HighQualityChatroom"] = 7] = "HighQualityChatroom";
    /** Available since: 3.0.0. Description: Live broadcast scenario, it is suitable for one-to-many live broadcast scenarios such as shows, games, e-commerce, and large educational classes. The audio and video quality, fluency, and compatibility have been optimized. Note: Even in live broadcast scenarios, the SDK has no business "roles" (such as anchors and viewers), and all users in the room can publish and play streams. */
    ZegoScenario[ZegoScenario["Broadcast"] = 8] = "Broadcast";
    /** Available since: 3.0.0. Description: Karaoke (KTV) scenario, it is suitable for real-time chorus and online karaoke scenarios, and has optimized delay, sound quality, ear return, echo cancellation, etc., and also ensures accurate alignment and ultra-low delay when multiple people chorus. */
    ZegoScenario[ZegoScenario["Karaoke"] = 9] = "Karaoke";
})(ZegoScenario || (ZegoScenario = {}));
/** Room mode. */
export var ZegoRoomMode;
(function (ZegoRoomMode) {
    /** Single room mode. */
    ZegoRoomMode[ZegoRoomMode["SingleRoom"] = 0] = "SingleRoom";
    /** Multiple room mode. */
    ZegoRoomMode[ZegoRoomMode["MultiRoom"] = 1] = "MultiRoom";
})(ZegoRoomMode || (ZegoRoomMode = {}));
/** engine state. */
export var ZegoEngineState;
(function (ZegoEngineState) {
    /** The engine has started */
    ZegoEngineState[ZegoEngineState["Start"] = 0] = "Start";
    /** The engine has stoped */
    ZegoEngineState[ZegoEngineState["Stop"] = 1] = "Stop";
})(ZegoEngineState || (ZegoEngineState = {}));
/** Room state. */
export var ZegoRoomState;
(function (ZegoRoomState) {
    /** Unconnected state, enter this state before logging in and after exiting the room. If there is a steady state abnormality in the process of logging in to the room, such as AppID or Token are incorrect, or if the same user name is logged in elsewhere and the local end is KickOut, it will enter this state. */
    ZegoRoomState[ZegoRoomState["Disconnected"] = 0] = "Disconnected";
    /** The state that the connection is being requested. It will enter this state after successful execution login room function. The display of the UI is usually performed using this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting connection status. */
    ZegoRoomState[ZegoRoomState["Connecting"] = 1] = "Connecting";
    /** The status that is successfully connected. Entering this status indicates that the login to the room has been successful. The user can receive the callback notification of the user and the stream information in the room. */
    ZegoRoomState[ZegoRoomState["Connected"] = 2] = "Connected";
})(ZegoRoomState || (ZegoRoomState = {}));
/** Room state change reason. */
export var ZegoRoomStateChangedReason;
(function (ZegoRoomStateChangedReason) {
    /** Logging in to the room. When calling [loginRoom] to log in to the room or [switchRoom] to switch to the target room, it will enter this state, indicating that it is requesting to connect to the server. The application interface is usually displayed through this state. */
    ZegoRoomStateChangedReason[ZegoRoomStateChangedReason["Logining"] = 0] = "Logining";
    /** Log in to the room successfully. When the room is successfully logged in or switched, it will enter this state, indicating that the login to the room has been successful, and users can normally receive callback notifications of other users in the room and all stream information additions and deletions. */
    ZegoRoomStateChangedReason[ZegoRoomStateChangedReason["Logined"] = 1] = "Logined";
    /** Failed to log in to the room. When the login or switch room fails, it will enter this state, indicating that the login or switch room has failed, for example, AppID or Token is incorrect, etc. */
    ZegoRoomStateChangedReason[ZegoRoomStateChangedReason["LoginFailed"] = 2] = "LoginFailed";
    /** The room connection is temporarily interrupted. If the interruption occurs due to poor network quality, the SDK will retry internally. */
    ZegoRoomStateChangedReason[ZegoRoomStateChangedReason["Reconnecting"] = 3] = "Reconnecting";
    /** The room is successfully reconnected. If there is an interruption due to poor network quality, the SDK will retry internally, and enter this state after successful reconnection. */
    ZegoRoomStateChangedReason[ZegoRoomStateChangedReason["Reconnected"] = 4] = "Reconnected";
    /** The room fails to reconnect. If there is an interruption due to poor network quality, the SDK will retry internally, and enter this state after the reconnection fails. */
    ZegoRoomStateChangedReason[ZegoRoomStateChangedReason["ReconnectFailed"] = 5] = "ReconnectFailed";
    /** Kicked out of the room by the server. For example, if you log in to the room with the same user name in other places, and the local end is kicked out of the room, it will enter this state. */
    ZegoRoomStateChangedReason[ZegoRoomStateChangedReason["KickOut"] = 6] = "KickOut";
    /** Logout of the room is successful. It is in this state by default before logging into the room. When calling [logoutRoom] to log out of the room successfully or [switchRoom] to log out of the current room successfully, it will enter this state. */
    ZegoRoomStateChangedReason[ZegoRoomStateChangedReason["Logout"] = 7] = "Logout";
    /** Failed to log out of the room. Enter this state when calling [logoutRoom] fails to log out of the room or [switchRoom] fails to log out of the current room internally. */
    ZegoRoomStateChangedReason[ZegoRoomStateChangedReason["LogoutFailed"] = 8] = "LogoutFailed";
})(ZegoRoomStateChangedReason || (ZegoRoomStateChangedReason = {}));
/** Publish channel. */
export var ZegoPublishChannel;
(function (ZegoPublishChannel) {
    /** The main (default/first) publish channel. */
    ZegoPublishChannel[ZegoPublishChannel["Main"] = 0] = "Main";
    /** The auxiliary (second) publish channel */
    ZegoPublishChannel[ZegoPublishChannel["Aux"] = 1] = "Aux";
    /** The third publish channel */
    ZegoPublishChannel[ZegoPublishChannel["Third"] = 2] = "Third";
    /** The fourth publish channel */
    ZegoPublishChannel[ZegoPublishChannel["Fourth"] = 3] = "Fourth";
})(ZegoPublishChannel || (ZegoPublishChannel = {}));
/** Video rendering fill mode. */
export var ZegoViewMode;
(function (ZegoViewMode) {
    /** The proportional scaling up, there may be black borders */
    ZegoViewMode[ZegoViewMode["AspectFit"] = 0] = "AspectFit";
    /** The proportional zoom fills the entire View and may be partially cut */
    ZegoViewMode[ZegoViewMode["AspectFill"] = 1] = "AspectFill";
    /** Fill the entire view, the image may be stretched */
    ZegoViewMode[ZegoViewMode["ScaleToFill"] = 2] = "ScaleToFill";
})(ZegoViewMode || (ZegoViewMode = {}));
/** Mirror mode for previewing or playing the of the stream. */
export var ZegoVideoMirrorMode;
(function (ZegoVideoMirrorMode) {
    /** The mirror image only for previewing locally. This mode is used by default. When the mobile terminal uses a rear camera, this mode is still used by default, but it does not work. Local preview does not set mirroring. */
    ZegoVideoMirrorMode[ZegoVideoMirrorMode["OnlyPreviewMirror"] = 0] = "OnlyPreviewMirror";
    /** Both the video previewed locally and the far end playing the stream will see mirror image. */
    ZegoVideoMirrorMode[ZegoVideoMirrorMode["BothMirror"] = 1] = "BothMirror";
    /** Both the video previewed locally and the far end playing the stream will not see mirror image. */
    ZegoVideoMirrorMode[ZegoVideoMirrorMode["NoMirror"] = 2] = "NoMirror";
    /** The mirror image only for far end playing the stream. */
    ZegoVideoMirrorMode[ZegoVideoMirrorMode["OnlyPublishMirror"] = 3] = "OnlyPublishMirror";
})(ZegoVideoMirrorMode || (ZegoVideoMirrorMode = {}));
/** Publish stream status. */
export var ZegoPublisherState;
(function (ZegoPublisherState) {
    /** The state is not published, and it is in this state before publishing the stream. If a steady-state exception occurs in the publish process, such as AppID or Token are incorrect, or if other users are already publishing the stream, there will be a failure and enter this state. */
    ZegoPublisherState[ZegoPublisherState["NoPublish"] = 0] = "NoPublish";
    /** The state that it is requesting to publish the stream after the [startPublishingStream] function is successfully called. The UI is usually displayed through this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting state. */
    ZegoPublisherState[ZegoPublisherState["PublishRequesting"] = 1] = "PublishRequesting";
    /** The state that the stream is being published, entering the state indicates that the stream has been successfully published, and the user can communicate normally. */
    ZegoPublisherState[ZegoPublisherState["Publishing"] = 2] = "Publishing";
})(ZegoPublisherState || (ZegoPublisherState = {}));
/** Voice changer preset value. */
export var ZegoVoiceChangerPreset;
(function (ZegoVoiceChangerPreset) {
    /** No Voice changer */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["None"] = 0] = "None";
    /** Male to child voice (loli voice effect) */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["MenToChild"] = 1] = "MenToChild";
    /** Male to female voice (kindergarten voice effect) */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["MenToWomen"] = 2] = "MenToWomen";
    /** Female to child voice */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["WomenToChild"] = 3] = "WomenToChild";
    /** Female to male voice */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["WomenToMen"] = 4] = "WomenToMen";
    /** Foreigner voice effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Foreigner"] = 5] = "Foreigner";
    /** Autobot Optimus Prime voice effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["OptimusPrime"] = 6] = "OptimusPrime";
    /** Android robot voice effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Android"] = 7] = "Android";
    /** Ethereal voice effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Ethereal"] = 8] = "Ethereal";
    /** Magnetic(Male) voice effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["MaleMagnetic"] = 9] = "MaleMagnetic";
    /** Fresh(Female) voice effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["FemaleFresh"] = 10] = "FemaleFresh";
    /** Electronic effects in C major voice effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["MajorC"] = 11] = "MajorC";
    /** Electronic effects in A minor voice effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["MinorA"] = 12] = "MinorA";
    /** Electronic effects in harmonic minor voice effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["HarmonicMinor"] = 13] = "HarmonicMinor";
    /** Female Vitality Sound effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["FemaleEnergetic"] = 14] = "FemaleEnergetic";
    /** Richness effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["RichNess"] = 15] = "RichNess";
    /** Muffled effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Muffled"] = 16] = "Muffled";
    /** Roundness effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Roundness"] = 17] = "Roundness";
    /** Falsetto effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Falsetto"] = 18] = "Falsetto";
    /** Fullness effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Fullness"] = 19] = "Fullness";
    /** Clear effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Clear"] = 20] = "Clear";
    /** Hight effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["HighlyResonant"] = 21] = "HighlyResonant";
    /** Loud clear effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["LoudClear"] = 22] = "LoudClear";
    /** Minions effect */
    ZegoVoiceChangerPreset[ZegoVoiceChangerPreset["Minions"] = 23] = "Minions";
})(ZegoVoiceChangerPreset || (ZegoVoiceChangerPreset = {}));
/** Reverberation preset value. */
export var ZegoReverbPreset;
(function (ZegoReverbPreset) {
    /** No Reverberation */
    ZegoReverbPreset[ZegoReverbPreset["None"] = 0] = "None";
    /** Soft room reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["SoftRoom"] = 1] = "SoftRoom";
    /** Large room reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["LargeRoom"] = 2] = "LargeRoom";
    /** Concert hall reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["ConcertHall"] = 3] = "ConcertHall";
    /** Valley reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["Valley"] = 4] = "Valley";
    /** Recording studio reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["RecordingStudio"] = 5] = "RecordingStudio";
    /** Basement reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["Basement"] = 6] = "Basement";
    /** KTV reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["KTV"] = 7] = "KTV";
    /** Popular reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["Popular"] = 8] = "Popular";
    /** Rock reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["Rock"] = 9] = "Rock";
    /** Vocal concert reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["VocalConcert"] = 10] = "VocalConcert";
    /** Gramophone reverb effect */
    ZegoReverbPreset[ZegoReverbPreset["GramoPhone"] = 11] = "GramoPhone";
})(ZegoReverbPreset || (ZegoReverbPreset = {}));
/** Mode of Electronic Effects. */
export var ZegoElectronicEffectsMode;
(function (ZegoElectronicEffectsMode) {
    /** Major */
    ZegoElectronicEffectsMode[ZegoElectronicEffectsMode["Major"] = 0] = "Major";
    /** Minor */
    ZegoElectronicEffectsMode[ZegoElectronicEffectsMode["Minor"] = 1] = "Minor";
    /** Harmonic Minor */
    ZegoElectronicEffectsMode[ZegoElectronicEffectsMode["HarmonicMinor"] = 2] = "HarmonicMinor";
})(ZegoElectronicEffectsMode || (ZegoElectronicEffectsMode = {}));
/** Video configuration resolution and bitrate preset enumeration. The preset resolutions are adapted for mobile and desktop. On mobile, height is longer than width, and desktop is the opposite. For example, 1080p is actually 1080(w) x 1920(h) on mobile and 1920(w) x 1080(h) on desktop. */
export var ZegoVideoConfigPreset;
(function (ZegoVideoConfigPreset) {
    /** Set the resolution to 320x180, the default is 15 fps, the code rate is 300 kbps */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset180P"] = 0] = "Preset180P";
    /** Set the resolution to 480x270, the default is 15 fps, the code rate is 400 kbps */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset270P"] = 1] = "Preset270P";
    /** Set the resolution to 640x360, the default is 15 fps, the code rate is 600 kbps */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset360P"] = 2] = "Preset360P";
    /** Set the resolution to 960x540, the default is 15 fps, the code rate is 1200 kbps */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset540P"] = 3] = "Preset540P";
    /** Set the resolution to 1280x720, the default is 15 fps, the code rate is 1500 kbps */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset720P"] = 4] = "Preset720P";
    /** Set the resolution to 1920x1080, the default is 15 fps, the code rate is 3000 kbps */
    ZegoVideoConfigPreset[ZegoVideoConfigPreset["Preset1080P"] = 5] = "Preset1080P";
})(ZegoVideoConfigPreset || (ZegoVideoConfigPreset = {}));
/** Stream quality level. */
export var ZegoStreamQualityLevel;
(function (ZegoStreamQualityLevel) {
    /** Excellent */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Excellent"] = 0] = "Excellent";
    /** Good */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Good"] = 1] = "Good";
    /** Normal */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Medium"] = 2] = "Medium";
    /** Bad */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Bad"] = 3] = "Bad";
    /** Failed */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Die"] = 4] = "Die";
    /** Unknown */
    ZegoStreamQualityLevel[ZegoStreamQualityLevel["Unknown"] = 5] = "Unknown";
})(ZegoStreamQualityLevel || (ZegoStreamQualityLevel = {}));
/** Audio channel type. */
export var ZegoAudioChannel;
(function (ZegoAudioChannel) {
    /** Unknown */
    ZegoAudioChannel[ZegoAudioChannel["Unknown"] = 0] = "Unknown";
    /** Mono */
    ZegoAudioChannel[ZegoAudioChannel["Mono"] = 1] = "Mono";
    /** Stereo */
    ZegoAudioChannel[ZegoAudioChannel["Stereo"] = 2] = "Stereo";
})(ZegoAudioChannel || (ZegoAudioChannel = {}));
/** Audio codec ID. */
export var ZegoAudioCodecID;
(function (ZegoAudioCodecID) {
    /** Default, determined by the [scenario] when calling [createEngine]. */
    ZegoAudioCodecID[ZegoAudioCodecID["Default"] = 0] = "Default";
    /** Can be used for RTC and CDN streaming; bitrate range from 10kbps to 128kbps; supports stereo; latency is around 500ms. Server cloud transcoding is required when communicating with the Web SDK, and it is not required when relaying to CDN. */
    ZegoAudioCodecID[ZegoAudioCodecID["Normal"] = 1] = "Normal";
    /** Can be used for RTC and CDN streaming; good compatibility; bitrate range from 16kbps to 192kbps; supports stereo; latency is around 350ms; the sound quality is worse than [Normal] in the same (low) bitrate. Server cloud transcoding is required when communicating with the Web SDK, and it is not required when relaying to CDN. */
    ZegoAudioCodecID[ZegoAudioCodecID["Normal2"] = 2] = "Normal2";
    /** Not recommended; if you need to use it, please contact ZEGO technical support. Can only be used for RTC streaming. */
    ZegoAudioCodecID[ZegoAudioCodecID["Normal3"] = 3] = "Normal3";
    /** Not recommended; if you need to use it, please contact ZEGO technical support. Can only be used for RTC streaming. */
    ZegoAudioCodecID[ZegoAudioCodecID["Low"] = 4] = "Low";
    /** Not recommended; if you need to use it, please contact ZEGO technical support. Can only be used for RTC streaming; maximum bitrate is 16kbps. */
    ZegoAudioCodecID[ZegoAudioCodecID["Low2"] = 5] = "Low2";
    /** Can only be used for RTC streaming; bitrate range from 6kbps to 192kbps; supports stereo; latency is around 200ms; Under the same bitrate (low bitrate), the sound quality is significantly better than [Normal] and [Normal2]; low CPU overhead. Server cloud transcoding is not required when communicating with the Web SDK, and it is required when relaying to CDN. */
    ZegoAudioCodecID[ZegoAudioCodecID["Low3"] = 6] = "Low3";
})(ZegoAudioCodecID || (ZegoAudioCodecID = {}));
/** Video codec ID. */
export var ZegoVideoCodecID;
(function (ZegoVideoCodecID) {
    /** Default (H.264) */
    ZegoVideoCodecID[ZegoVideoCodecID["Default"] = 0] = "Default";
    /** Scalable Video Coding (H.264 SVC) */
    ZegoVideoCodecID[ZegoVideoCodecID["Svc"] = 1] = "Svc";
    /** VP8 */
    ZegoVideoCodecID[ZegoVideoCodecID["Vp8"] = 2] = "Vp8";
    /** H.265 */
    ZegoVideoCodecID[ZegoVideoCodecID["H265"] = 3] = "H265";
    /** Unknown Video Coding */
    ZegoVideoCodecID[ZegoVideoCodecID["Unknown"] = 100] = "Unknown";
})(ZegoVideoCodecID || (ZegoVideoCodecID = {}));
/** Video screen rotation direction. */
export var ZegoOrientation;
(function (ZegoOrientation) {
    /** Not rotate */
    ZegoOrientation[ZegoOrientation["PortraitUp"] = 0] = "PortraitUp";
    /** Rotate 90 degrees counterclockwise */
    ZegoOrientation[ZegoOrientation["LandscapeLeft"] = 1] = "LandscapeLeft";
    /** Rotate 180 degrees counterclockwise */
    ZegoOrientation[ZegoOrientation["PortraitDown"] = 2] = "PortraitDown";
    /** Rotate 270 degrees counterclockwise */
    ZegoOrientation[ZegoOrientation["LandscapeRight"] = 3] = "LandscapeRight";
})(ZegoOrientation || (ZegoOrientation = {}));
/** Video stream type */
export var ZegoVideoStreamType;
(function (ZegoVideoStreamType) {
    /** The type to be played depends on the network status */
    ZegoVideoStreamType[ZegoVideoStreamType["Default"] = 0] = "Default";
    /** small resolution type */
    ZegoVideoStreamType[ZegoVideoStreamType["Small"] = 1] = "Small";
    /** big resolution type */
    ZegoVideoStreamType[ZegoVideoStreamType["Big"] = 2] = "Big";
})(ZegoVideoStreamType || (ZegoVideoStreamType = {}));
/** Audio echo cancellation mode. */
export var ZegoAECMode;
(function (ZegoAECMode) {
    /** Aggressive echo cancellation may affect the sound quality slightly, but the echo will be very clean. */
    ZegoAECMode[ZegoAECMode["Aggressive"] = 0] = "Aggressive";
    /** Moderate echo cancellation, which may slightly affect a little bit of sound, but the residual echo will be less. */
    ZegoAECMode[ZegoAECMode["Medium"] = 1] = "Medium";
    /** Comfortable echo cancellation, that is, echo cancellation does not affect the sound quality of the sound, and sometimes there may be a little echo, but it will not affect the normal listening. */
    ZegoAECMode[ZegoAECMode["Soft"] = 2] = "Soft";
})(ZegoAECMode || (ZegoAECMode = {}));
/** Active Noise Suppression mode. */
export var ZegoANSMode;
(function (ZegoANSMode) {
    /** Soft ANS. In most instances, the sound quality will not be damaged, but some noise will remain. */
    ZegoANSMode[ZegoANSMode["Soft"] = 0] = "Soft";
    /** Medium ANS. It may damage some sound quality, but it has a good noise reduction effect. */
    ZegoANSMode[ZegoANSMode["Medium"] = 1] = "Medium";
    /** Aggressive ANS. It may significantly impair the sound quality, but it has a good noise reduction effect. */
    ZegoANSMode[ZegoANSMode["Aggressive"] = 2] = "Aggressive";
    /** AI mode ANS. It will cause great damage to music, so it can not be used for noise suppression of sound sources that need to collect background sound. Please contact ZEGO technical support before use. */
    ZegoANSMode[ZegoANSMode["AI"] = 3] = "AI";
})(ZegoANSMode || (ZegoANSMode = {}));
/** Video transmission mode when current bitrate is lower than the set minimum bitrate. */
export var ZegoTrafficControlMinVideoBitrateMode;
(function (ZegoTrafficControlMinVideoBitrateMode) {
    /** Stop video transmission when current bitrate is lower than the set minimum bitrate */
    ZegoTrafficControlMinVideoBitrateMode[ZegoTrafficControlMinVideoBitrateMode["NoVideo"] = 0] = "NoVideo";
    /** Video is sent at a very low frequency (no more than 2fps) which is lower than the set minimum bitrate */
    ZegoTrafficControlMinVideoBitrateMode[ZegoTrafficControlMinVideoBitrateMode["UltraLowFPS"] = 1] = "UltraLowFPS";
})(ZegoTrafficControlMinVideoBitrateMode || (ZegoTrafficControlMinVideoBitrateMode = {}));
/** Playing stream status. */
export var ZegoPlayerState;
(function (ZegoPlayerState) {
    /** The state of the flow is not played, and it is in this state before the stream is played. If the steady flow anomaly occurs during the playing process, such as AppID or Token are incorrect, it will enter this state. */
    ZegoPlayerState[ZegoPlayerState["NoPlay"] = 0] = "NoPlay";
    /** The state that the stream is being requested for playing. After the [startPlayingStream] function is successfully called, it will enter the state. The UI is usually displayed through this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting state. */
    ZegoPlayerState[ZegoPlayerState["PlayRequesting"] = 1] = "PlayRequesting";
    /** The state that the stream is being playing, entering the state indicates that the stream has been successfully played, and the user can communicate normally. */
    ZegoPlayerState[ZegoPlayerState["Playing"] = 2] = "Playing";
})(ZegoPlayerState || (ZegoPlayerState = {}));
/** Media event when playing. */
export var ZegoPlayerMediaEvent;
(function (ZegoPlayerMediaEvent) {
    /** Audio stuck event when playing */
    ZegoPlayerMediaEvent[ZegoPlayerMediaEvent["AudioBreakOccur"] = 0] = "AudioBreakOccur";
    /** Audio stuck event recovery when playing */
    ZegoPlayerMediaEvent[ZegoPlayerMediaEvent["AudioBreakResume"] = 1] = "AudioBreakResume";
    /** Video stuck event when playing */
    ZegoPlayerMediaEvent[ZegoPlayerMediaEvent["VideoBreakOccur"] = 2] = "VideoBreakOccur";
    /** Video stuck event recovery when playing */
    ZegoPlayerMediaEvent[ZegoPlayerMediaEvent["VideoBreakResume"] = 3] = "VideoBreakResume";
})(ZegoPlayerMediaEvent || (ZegoPlayerMediaEvent = {}));
/** Stream Resource Mode */
export var ZegoStreamResourceMode;
(function (ZegoStreamResourceMode) {
    /** Default mode. The SDK will automatically select the streaming resource according to the cdnConfig parameters set by the player config and the ready-made background configuration. */
    ZegoStreamResourceMode[ZegoStreamResourceMode["Default"] = 0] = "Default";
    /** Playing stream only from CDN. */
    ZegoStreamResourceMode[ZegoStreamResourceMode["OnlyCDN"] = 1] = "OnlyCDN";
    /** Playing stream only from L3. */
    ZegoStreamResourceMode[ZegoStreamResourceMode["OnlyL3"] = 2] = "OnlyL3";
    /** Playing stream only from RTC. */
    ZegoStreamResourceMode[ZegoStreamResourceMode["OnlyRTC"] = 3] = "OnlyRTC";
    /** CDN Plus mode. The SDK will automatically select the streaming resource according to the network condition. */
    ZegoStreamResourceMode[ZegoStreamResourceMode["CDNPlus"] = 4] = "CDNPlus";
})(ZegoStreamResourceMode || (ZegoStreamResourceMode = {}));
/** Update type. */
export var ZegoUpdateType;
(function (ZegoUpdateType) {
    /** Add */
    ZegoUpdateType[ZegoUpdateType["Add"] = 0] = "Add";
    /** Delete */
    ZegoUpdateType[ZegoUpdateType["Delete"] = 1] = "Delete";
})(ZegoUpdateType || (ZegoUpdateType = {}));
/** State of CDN relay. */
export var ZegoStreamRelayCDNState;
(function (ZegoStreamRelayCDNState) {
    /** The state indicates that there is no CDN relay */
    ZegoStreamRelayCDNState[ZegoStreamRelayCDNState["NoRelay"] = 0] = "NoRelay";
    /** The CDN relay is being requested */
    ZegoStreamRelayCDNState[ZegoStreamRelayCDNState["RelayRequesting"] = 1] = "RelayRequesting";
    /** Entering this status indicates that the CDN relay has been successful */
    ZegoStreamRelayCDNState[ZegoStreamRelayCDNState["Relaying"] = 2] = "Relaying";
})(ZegoStreamRelayCDNState || (ZegoStreamRelayCDNState = {}));
/** Reason for state of CDN relay changed. */
export var ZegoStreamRelayCDNUpdateReason;
(function (ZegoStreamRelayCDNUpdateReason) {
    /** No error */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["None"] = 0] = "None";
    /** Server error */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["ServerError"] = 1] = "ServerError";
    /** Handshake error */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["HandshakeFailed"] = 2] = "HandshakeFailed";
    /** Access point error */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["AccessPointError"] = 3] = "AccessPointError";
    /** Stream create failure */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["CreateStreamFailed"] = 4] = "CreateStreamFailed";
    /** Bad stream ID */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["BadName"] = 5] = "BadName";
    /** CDN server actively disconnected */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["CDNServerDisconnected"] = 6] = "CDNServerDisconnected";
    /** Active disconnect */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["Disconnected"] = 7] = "Disconnected";
    /** All mixer input streams sessions closed */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["MixStreamAllInputStreamClosed"] = 8] = "MixStreamAllInputStreamClosed";
    /** All mixer input streams have no data */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["MixStreamAllInputStreamNoData"] = 9] = "MixStreamAllInputStreamNoData";
    /** Internal error of stream mixer server */
    ZegoStreamRelayCDNUpdateReason[ZegoStreamRelayCDNUpdateReason["MixStreamServerInternalError"] = 10] = "MixStreamServerInternalError";
})(ZegoStreamRelayCDNUpdateReason || (ZegoStreamRelayCDNUpdateReason = {}));
/** Device type. */
export var ZegoDeviceType;
(function (ZegoDeviceType) {
    /** Unknown device type. */
    ZegoDeviceType[ZegoDeviceType["Unknown"] = 0] = "Unknown";
    /** Camera device. */
    ZegoDeviceType[ZegoDeviceType["Camera"] = 1] = "Camera";
    /** Microphone device. */
    ZegoDeviceType[ZegoDeviceType["Microphone"] = 2] = "Microphone";
    /** Speaker device. */
    ZegoDeviceType[ZegoDeviceType["Speaker"] = 3] = "Speaker";
    /** Audio device. (Other audio device that cannot be accurately classified into microphones or speakers.) */
    ZegoDeviceType[ZegoDeviceType["AudioDevice"] = 4] = "AudioDevice";
})(ZegoDeviceType || (ZegoDeviceType = {}));
/** The exception type for the device. */
export var ZegoDeviceExceptionType;
(function (ZegoDeviceExceptionType) {
    /** Unknown device exception. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["Unknown"] = 0] = "Unknown";
    /** Generic device exception. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["Generic"] = 1] = "Generic";
    /** Invalid device ID exception. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["InvalidId"] = 2] = "InvalidId";
    /** Device permission is not granted. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["PermissionNotGranted"] = 3] = "PermissionNotGranted";
    /** The capture frame rate of the device is 0. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["ZeroCaptureFps"] = 4] = "ZeroCaptureFps";
    /** The device is being occupied. */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["DeviceOccupied"] = 5] = "DeviceOccupied";
    /** The device is unplugged (not plugged in). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["DeviceUnplugged"] = 6] = "DeviceUnplugged";
    /** The device requires the system to restart before it can work (Windows platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["RebootRequired"] = 7] = "RebootRequired";
    /** The system media service is unavailable, e.g. when the iOS system detects that the current pressure is huge (such as playing a lot of animation), it is possible to disable all media related services (Apple platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["MediaServicesWereLost"] = 8] = "MediaServicesWereLost";
    /** The device is being occupied by Siri (Apple platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["SiriIsRecording"] = 9] = "SiriIsRecording";
    /** The device captured sound level is too low (Windows platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["SoundLevelTooLow"] = 10] = "SoundLevelTooLow";
    /** The device is being occupied, and maybe cause by iPad magnetic case (Apple platform only). */
    ZegoDeviceExceptionType[ZegoDeviceExceptionType["MagneticCase"] = 11] = "MagneticCase";
})(ZegoDeviceExceptionType || (ZegoDeviceExceptionType = {}));
/** Remote device status. */
export var ZegoRemoteDeviceState;
(function (ZegoRemoteDeviceState) {
    /** Device on */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Open"] = 0] = "Open";
    /** General device error */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["GenericError"] = 1] = "GenericError";
    /** Invalid device ID */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["InvalidID"] = 2] = "InvalidID";
    /** No permission */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["NoAuthorization"] = 3] = "NoAuthorization";
    /** Captured frame rate is 0 */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["ZeroFPS"] = 4] = "ZeroFPS";
    /** The device is occupied */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["InUseByOther"] = 5] = "InUseByOther";
    /** The device is not plugged in or unplugged */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Unplugged"] = 6] = "Unplugged";
    /** The system needs to be restarted */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["RebootRequired"] = 7] = "RebootRequired";
    /** System media services stop, such as under the iOS platform, when the system detects that the current pressure is huge (such as playing a lot of animation), it is possible to disable all media related services. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["SystemMediaServicesLost"] = 8] = "SystemMediaServicesLost";
    /** The remote user calls [enableCamera] or [muteMicrophone] to disable the camera or microphone. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Disable"] = 9] = "Disable";
    /** The remote user actively calls [mutePublishStreamAudio] or [mutePublishStreamVideo] to stop publish the audio or video stream. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Mute"] = 10] = "Mute";
    /** The device is interrupted, such as a phone call interruption, etc. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["Interruption"] = 11] = "Interruption";
    /** There are multiple apps at the same time in the foreground, such as the iPad app split screen, the system will prohibit all apps from using the camera. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["InBackground"] = 12] = "InBackground";
    /** CDN server actively disconnected */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["MultiForegroundApp"] = 13] = "MultiForegroundApp";
    /** The system is under high load pressure and may cause abnormal equipment. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["BySystemPressure"] = 14] = "BySystemPressure";
    /** The remote device is not supported to publish the device state. */
    ZegoRemoteDeviceState[ZegoRemoteDeviceState["NotSupport"] = 15] = "NotSupport";
})(ZegoRemoteDeviceState || (ZegoRemoteDeviceState = {}));
/** Audio route */
export var ZegoAudioRoute;
(function (ZegoAudioRoute) {
    /** Speaker */
    ZegoAudioRoute[ZegoAudioRoute["Speaker"] = 0] = "Speaker";
    /** Headphone */
    ZegoAudioRoute[ZegoAudioRoute["Headphone"] = 1] = "Headphone";
    /** Bluetooth device */
    ZegoAudioRoute[ZegoAudioRoute["Bluetooth"] = 2] = "Bluetooth";
    /** Receiver */
    ZegoAudioRoute[ZegoAudioRoute["Receiver"] = 3] = "Receiver";
    /** External USB audio device */
    ZegoAudioRoute[ZegoAudioRoute["ExternalUSB"] = 4] = "ExternalUSB";
    /** Apple AirPlay */
    ZegoAudioRoute[ZegoAudioRoute["AirPlay"] = 5] = "AirPlay";
})(ZegoAudioRoute || (ZegoAudioRoute = {}));
/** Mix stream content type. */
export var ZegoMixerInputContentType;
(function (ZegoMixerInputContentType) {
    /** Mix stream for audio only */
    ZegoMixerInputContentType[ZegoMixerInputContentType["Audio"] = 0] = "Audio";
    /** Mix stream for both audio and video */
    ZegoMixerInputContentType[ZegoMixerInputContentType["Video"] = 1] = "Video";
    /** Mix stream for video only */
    ZegoMixerInputContentType[ZegoMixerInputContentType["VideoOnly"] = 2] = "VideoOnly";
})(ZegoMixerInputContentType || (ZegoMixerInputContentType = {}));
/** Video frame buffer type. */
export var ZegoVideoBufferType;
(function (ZegoVideoBufferType) {
    /** Raw data type video frame */
    ZegoVideoBufferType[ZegoVideoBufferType["Unknown"] = 0] = "Unknown";
    /** Raw data type video frame */
    ZegoVideoBufferType[ZegoVideoBufferType["RawData"] = 1] = "RawData";
    /** Encoded data type video frame */
    ZegoVideoBufferType[ZegoVideoBufferType["EncodedData"] = 2] = "EncodedData";
    /** Texture 2D type video frame */
    ZegoVideoBufferType[ZegoVideoBufferType["GLTexture2D"] = 3] = "GLTexture2D";
    /** CVPixelBuffer type video frame */
    ZegoVideoBufferType[ZegoVideoBufferType["CVPixelBuffer"] = 4] = "CVPixelBuffer";
    /** Surface Texture type video frame */
    ZegoVideoBufferType[ZegoVideoBufferType["SurfaceTexture"] = 5] = "SurfaceTexture";
    /** GL_TEXTURE_EXTERNAL_OES type video frame */
    ZegoVideoBufferType[ZegoVideoBufferType["GLTextureExternalOES"] = 6] = "GLTextureExternalOES";
})(ZegoVideoBufferType || (ZegoVideoBufferType = {}));
/** Audio Config Preset. */
export var ZegoAudioConfigPreset;
(function (ZegoAudioConfigPreset) {
    /** Basic sound quality (16 kbps, Mono, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["BasicQuality"] = 0] = "BasicQuality";
    /** Standard sound quality (48 kbps, Mono, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["StandardQuality"] = 1] = "StandardQuality";
    /** Standard sound quality (56 kbps, Stereo, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["StandardQualityStereo"] = 2] = "StandardQualityStereo";
    /** High sound quality (128 kbps, Mono, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["HighQuality"] = 3] = "HighQuality";
    /** High sound quality (192 kbps, Stereo, ZegoAudioCodecIDDefault) */
    ZegoAudioConfigPreset[ZegoAudioConfigPreset["HighQualityStereo"] = 4] = "HighQualityStereo";
})(ZegoAudioConfigPreset || (ZegoAudioConfigPreset = {}));
/** Player state. */
export var ZegoMediaPlayerState;
(function (ZegoMediaPlayerState) {
    /** Not playing */
    ZegoMediaPlayerState[ZegoMediaPlayerState["NoPlay"] = 0] = "NoPlay";
    /** Playing */
    ZegoMediaPlayerState[ZegoMediaPlayerState["Playing"] = 1] = "Playing";
    /** Pausing */
    ZegoMediaPlayerState[ZegoMediaPlayerState["Pausing"] = 2] = "Pausing";
    /** End of play */
    ZegoMediaPlayerState[ZegoMediaPlayerState["PlayEnded"] = 3] = "PlayEnded";
})(ZegoMediaPlayerState || (ZegoMediaPlayerState = {}));
/** Player network event. */
export var ZegoMediaPlayerNetworkEvent;
(function (ZegoMediaPlayerNetworkEvent) {
    /** Network resources are not playing well, and start trying to cache data */
    ZegoMediaPlayerNetworkEvent[ZegoMediaPlayerNetworkEvent["BufferBegin"] = 0] = "BufferBegin";
    /** Network resources can be played smoothly */
    ZegoMediaPlayerNetworkEvent[ZegoMediaPlayerNetworkEvent["BufferEnded"] = 1] = "BufferEnded";
})(ZegoMediaPlayerNetworkEvent || (ZegoMediaPlayerNetworkEvent = {}));
/** AudioEffectPlayer state. */
export var ZegoAudioEffectPlayState;
(function (ZegoAudioEffectPlayState) {
    /** Not playing */
    ZegoAudioEffectPlayState[ZegoAudioEffectPlayState["NoPlay"] = 0] = "NoPlay";
    /** Playing */
    ZegoAudioEffectPlayState[ZegoAudioEffectPlayState["Playing"] = 1] = "Playing";
    /** Pausing */
    ZegoAudioEffectPlayState[ZegoAudioEffectPlayState["Pausing"] = 2] = "Pausing";
    /** End of play */
    ZegoAudioEffectPlayState[ZegoAudioEffectPlayState["PlayEnded"] = 3] = "PlayEnded";
})(ZegoAudioEffectPlayState || (ZegoAudioEffectPlayState = {}));
/** Audio capture source type. */
export var ZegoAudioSourceType;
(function (ZegoAudioSourceType) {
    /** Default audio capture source (the main channel uses custom audio capture by default; the aux channel uses the same sound as main channel by default) */
    ZegoAudioSourceType[ZegoAudioSourceType["Default"] = 0] = "Default";
    /** Use custom audio capture, refer to [enableCustomAudioIO] or [setAudioSource] */
    ZegoAudioSourceType[ZegoAudioSourceType["Custom"] = 1] = "Custom";
    /** Use media player as audio source, only support aux channel */
    ZegoAudioSourceType[ZegoAudioSourceType["MediaPlayer"] = 2] = "MediaPlayer";
    /** No audio source. This audio source type can only be used in [setAudioSource] interface, has no effect when used in [enableCustomAudioIO] interface */
    ZegoAudioSourceType[ZegoAudioSourceType["None"] = 3] = "None";
    /** Using microphone as audio source. This audio source type can only be used in [setAudioSource] interface, has no effect when used in [enableCustomAudioIO] interface */
    ZegoAudioSourceType[ZegoAudioSourceType["Microphone"] = 4] = "Microphone";
    /** Using main channel as audio source. Ineffective when used in main channel. This audio source type can only be used in [setAudioSource] interface, has no effect when used in [enableCustomAudioIO] interface */
    ZegoAudioSourceType[ZegoAudioSourceType["MainPublishChannel"] = 5] = "MainPublishChannel";
    /** Using screen capture as audio source. Typically used in mobile screen sharing scenarios. This audio source type can only be used in [setAudioSource] interface, has no effect when used in [enableCustomAudioIO] interface */
    ZegoAudioSourceType[ZegoAudioSourceType["ScreenCapture"] = 6] = "ScreenCapture";
})(ZegoAudioSourceType || (ZegoAudioSourceType = {}));
/** network speed test type */
export var ZegoNetworkSpeedTestType;
(function (ZegoNetworkSpeedTestType) {
    /** uplink */
    ZegoNetworkSpeedTestType[ZegoNetworkSpeedTestType["Uplink"] = 0] = "Uplink";
    /** downlink */
    ZegoNetworkSpeedTestType[ZegoNetworkSpeedTestType["Downlink"] = 1] = "Downlink";
})(ZegoNetworkSpeedTestType || (ZegoNetworkSpeedTestType = {}));
/** Publish or play stream event */
export var ZegoStreamEvent;
(function (ZegoStreamEvent) {
    /** Start publishing stream */
    ZegoStreamEvent[ZegoStreamEvent["PublishStart"] = 100] = "PublishStart";
    /** The first publish stream was successful */
    ZegoStreamEvent[ZegoStreamEvent["PublishSuccess"] = 101] = "PublishSuccess";
    /** Failed to publish stream for the first time */
    ZegoStreamEvent[ZegoStreamEvent["PublishFail"] = 102] = "PublishFail";
    /** Start retrying publishing stream */
    ZegoStreamEvent[ZegoStreamEvent["RetryPublishStart"] = 103] = "RetryPublishStart";
    /** Retry publishing stream successfully */
    ZegoStreamEvent[ZegoStreamEvent["RetryPublishSuccess"] = 104] = "RetryPublishSuccess";
    /** Failed to retry publishing stream */
    ZegoStreamEvent[ZegoStreamEvent["RetryPublishFail"] = 105] = "RetryPublishFail";
    /** End of publishing stream */
    ZegoStreamEvent[ZegoStreamEvent["PublishEnd"] = 106] = "PublishEnd";
    /** Start playing stream */
    ZegoStreamEvent[ZegoStreamEvent["PlayStart"] = 200] = "PlayStart";
    /** The first play stream was successful */
    ZegoStreamEvent[ZegoStreamEvent["PlaySuccess"] = 201] = "PlaySuccess";
    /** Failed to play stream for the first time */
    ZegoStreamEvent[ZegoStreamEvent["PlayFail"] = 202] = "PlayFail";
    /** Start retrying playing stream */
    ZegoStreamEvent[ZegoStreamEvent["RetryPlayStart"] = 203] = "RetryPlayStart";
    /** Retry playing stream successfully */
    ZegoStreamEvent[ZegoStreamEvent["RetryPlaySuccess"] = 204] = "RetryPlaySuccess";
    /** Failed to retry playing stream */
    ZegoStreamEvent[ZegoStreamEvent["RetryPlayFail"] = 205] = "RetryPlayFail";
    /** End of playing stream */
    ZegoStreamEvent[ZegoStreamEvent["PlayEnd"] = 206] = "PlayEnd";
})(ZegoStreamEvent || (ZegoStreamEvent = {}));
/** video capture source. */
export var ZegoVideoSourceType;
(function (ZegoVideoSourceType) {
    /** No capture, i.e. no video data. */
    ZegoVideoSourceType[ZegoVideoSourceType["None"] = 1] = "None";
    /** Video source from camera. */
    ZegoVideoSourceType[ZegoVideoSourceType["Camera"] = 2] = "Camera";
    /** Video source from custom capture. */
    ZegoVideoSourceType[ZegoVideoSourceType["Custom"] = 3] = "Custom";
    /** Video source from the main publish channel. When publishing the main channel, this value cannot be set. */
    ZegoVideoSourceType[ZegoVideoSourceType["MainPublishChannel"] = 4] = "MainPublishChannel";
    /** Video source from media player. */
    ZegoVideoSourceType[ZegoVideoSourceType["Player"] = 5] = "Player";
    /** Video source from screen capture. */
    ZegoVideoSourceType[ZegoVideoSourceType["ScreenCapture"] = 6] = "ScreenCapture";
})(ZegoVideoSourceType || (ZegoVideoSourceType = {}));
/**
 * Log config.
 *
 * Description: This parameter is required when calling [setlogconfig] to customize log configuration.
 * Use cases: This configuration is required when you need to customize the log storage path or the maximum log file size.
 * Caution: None.
 */
export class ZegoLogConfig {
    constructor() {
        this.logPath = '';
        this.logSize = 5 * 1024 * 1024;
    }
}
/**
 * Custom video process configuration.
 */
export class ZegoCustomVideoProcessConfig {
    constructor(bufferType) {
        this.bufferType = bufferType;
    }
}
/**
 * Custom audio configuration.
 */
export class ZegoCustomAudioConfig {
    constructor(sourceType) {
        this.sourceType = sourceType;
    }
}
/**
 * Profile for create engine
 *
 * Profile for create engine
 */
export class ZegoEngineProfile {
    constructor(appID, appSign, scenario) {
        this.appID = appID;
        this.appSign = appSign;
        this.scenario = scenario;
    }
}
/**
 * Advanced engine configuration.
 */
export class ZegoEngineConfig {
    constructor() {
    }
}
/**
 * Advanced room configuration.
 *
 * Configure maximum number of users in the room and authentication token, etc.
 */
export class ZegoRoomConfig {
    constructor(maxMemberCount, isUserStatusNotify, token) {
        this.maxMemberCount = maxMemberCount;
        this.isUserStatusNotify = isUserStatusNotify;
        this.token = token;
    }
}
/**
 * Video config.
 *
 * Configure parameters used for publishing stream, such as bitrate, frame rate, and resolution.
 * Developers should note that the width and height resolution of the mobile and desktop are opposite. For example, 360p, the resolution of the mobile is 360x640, and the desktop is 640x360.
 * When using external capture, the capture and encoding resolution of RTC cannot be set to 0*0, otherwise, there will be no video data in the publishing stream in the entire engine life cycle.
 */
export class ZegoVideoConfig {
    /**
     * Create video configuration with preset enumeration values
     */
    constructor(preset) {
        preset = preset ?? ZegoVideoConfigPreset.Preset360P;
        this.codecID = ZegoVideoCodecID.Default;
        this.keyFrameInterval = 2;
        switch (preset) {
            case ZegoVideoConfigPreset.Preset180P:
                this.captureWidth = 320;
                this.captureHeight = 180;
                this.encodeWidth = 320;
                this.encodeHeight = 180;
                this.fps = 15;
                this.bitrate = 300;
                break;
            case ZegoVideoConfigPreset.Preset270P:
                this.captureWidth = 480;
                this.captureHeight = 270;
                this.encodeWidth = 480;
                this.encodeHeight = 270;
                this.fps = 15;
                this.bitrate = 400;
                break;
            case ZegoVideoConfigPreset.Preset360P:
                this.captureWidth = 640;
                this.captureHeight = 360;
                this.encodeWidth = 640;
                this.encodeHeight = 360;
                this.fps = 15;
                this.bitrate = 600;
                break;
            case ZegoVideoConfigPreset.Preset540P:
                this.captureWidth = 960;
                this.captureHeight = 540;
                this.encodeWidth = 960;
                this.encodeHeight = 540;
                this.fps = 15;
                this.bitrate = 1200;
                break;
            case ZegoVideoConfigPreset.Preset720P:
                this.captureWidth = 1280;
                this.captureHeight = 720;
                this.encodeWidth = 1280;
                this.encodeHeight = 720;
                this.fps = 15;
                this.bitrate = 1500;
                break;
            case ZegoVideoConfigPreset.Preset1080P:
                this.captureWidth = 1920;
                this.captureHeight = 1080;
                this.encodeWidth = 1920;
                this.encodeHeight = 1080;
                this.fps = 15;
                this.bitrate = 3000;
                break;
        }
    }
}
/**
 * Voice changer parameter.
 *
 * Developer can use the built-in presets of the SDK to change the parameters of the voice changer.
 */
export class ZegoVoiceChangerParam {
    constructor(pitch) {
        this.pitch = pitch;
    }
}
/**
 * Audio reverberation advanced parameters.
 *
 * Developers can use the SDK's built-in presets to change the parameters of the reverb.
 */
export class ZegoReverbAdvancedParam {
    constructor() {
        this.roomSize = 0;
        this.reverberance = 0;
        this.damping = 0;
        this.wetOnly = false;
        this.wetGain = 0;
        this.dryGain = 0;
        this.toneLow = 100;
        this.toneHigh = 100;
        this.preDelay = 0;
        this.stereoWidth = 0;
    }
}
/**
 * Audio reverberation echo parameters.
 */
export class ZegoReverbEchoParam {
    constructor() {
        this.inGain = 0;
        this.outGain = 0;
        this.numDelays = 0;
        this.delay = new Uint16Array(7);
        this.decay = new Float32Array(7);
    }
}
/**
 * User object.
 *
 * Configure user ID and username to identify users in the room.
 * Note that the userID must be unique under the same appID, otherwise, there will be mutual kicks when logging in to the room.
 * It is strongly recommended that userID corresponds to the user ID of the business APP, that is, a userID and a real user are fixed and unique, and should not be passed to the SDK in a random userID. Because the unique and fixed userID allows ZEGO technicians to quickly locate online problems.
 */
export class ZegoUser {
    constructor(userID, userName) {
        this.userID = userID;
        this.userName = userName;
    }
}
/**
 * View related coordinates.
 */
export class ZegoRect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
/**
 * View object.
 *
 * Configure view object, view Mode, background color
 */
export class ZegoView {
    constructor(reactTag, viewMode, backgroundColor) {
        this.viewMode = viewMode;
        this.backgroundColor = backgroundColor;
        this.reactTag = reactTag;
    }
}
/**
 * Advanced publisher configuration.
 *
 * Configure room id
 */
export class ZegoPublisherConfig {
    constructor(roomID) {
        this.roomID = roomID;
    }
}
/**
 * CDN config object.
 *
 * Includes CDN URL and authentication parameter string
 */
export class ZegoCDNConfig {
    constructor(url, authParam) {
        this.url = url;
        this.authParam = authParam;
    }
}
/**
 * Advanced player configuration.
 *
 * Configure stream resource mode, CDN configuration and other advanced configurations.
 */
export class ZegoPlayerConfig {
    constructor(cdnConfig) {
        this.cdnConfig = cdnConfig;
    }
}
/**
 * Beauty configuration options.
 *
 * Configure the parameters of skin peeling, whitening and sharpening
 */
export class ZegoBeautifyOption {
    constructor(polishStep, whitenFactor, sharpenFactor) {
        this.polishStep = polishStep;
        this.whitenFactor = whitenFactor;
        this.sharpenFactor = sharpenFactor;
    }
}
/**
 * Beauty configuration param.
 *
 * Configure the whiten, rosy, smooth, and sharpen parameters for beauty.
 */
export class ZegoEffectsBeautyParam {
    constructor() {
        this.whitenIntensity = 50;
        this.rosyIntensity = 50;
        this.smoothIntensity = 50;
        this.sharpenIntensity = 50;
    }
}
/**
 * Mix stream audio configuration.
 *
 * Configure video frame rate, bitrate, and resolution for mixer task
 */
export class ZegoMixerAudioConfig {
    constructor(bitrate, channel, codecID) {
        this.bitrate = bitrate;
        this.channel = channel;
        this.codecID = codecID;
    }
}
/**
 * Mix stream video config object.
 *
 * Configure video frame rate, bitrate, and resolution for mixer task
 */
export class ZegoMixerVideoConfig {
    constructor(width, height, fps, bitrate) {
        this.width = width;
        this.height = height;
        this.fps = fps;
        this.bitrate = bitrate;
    }
}
/**
 * Mixer input.
 *
 * Configure the mix stream input stream ID, type, and the layout
 */
export class ZegoMixerInput {
    constructor(streamID, contentType, layout, soundLevelID) {
        this.streamID = streamID;
        this.contentType = contentType;
        this.layout = layout;
        this.soundLevelID = soundLevelID;
    }
}
/**
 * Mixer output object.
 *
 * Configure mix stream output target URL or stream ID
 */
export class ZegoMixerOutput {
    constructor(target) {
        this.target = target;
    }
}
/**
 * Mix stream task object.
 *
 * This class is the configuration class of the stream mixing task. When a stream mixing task is requested to the ZEGO RTC server, the configuration of the stream mixing task is required.
 * This class describes the detailed configuration information of this stream mixing task.
 */
export class ZegoMixerTask {
    constructor(taskID) {
        this.taskID = taskID;
        this.inputList = [];
        this.outputList = [];
        this.audioConfig = { bitrate: 48, channel: ZegoAudioChannel.Mono, codecID: ZegoAudioCodecID.Normal };
        this.videoConfig = { width: 360, height: 640, fps: 15, bitrate: 600 };
        this.enableSoundLevel = false;
    }
}
/**
 * Configuration for start sound level monitor.
 */
export class ZegoSoundLevelConfig {
    constructor(millisecond, enableVAD) {
        this.millisecond = millisecond;
        this.enableVAD = enableVAD;
    }
}
/**
 * Broadcast message info.
 *
 * The received object of the room broadcast message, including the message content, message ID, sender, sending time
 */
export class ZegoBroadcastMessageInfo {
    constructor(message, messageID, sendTime, fromUser) {
        this.message = message;
        this.messageID = messageID;
        this.sendTime = sendTime;
        this.fromUser = fromUser;
    }
}
/**
 * Barrage message info.
 *
 * The received object of the room barrage message, including the message content, message ID, sender, sending time
 */
export class ZegoBarrageMessageInfo {
    constructor(message, messageID, sendTime, fromUser) {
        this.message = message;
        this.messageID = messageID;
        this.sendTime = sendTime;
        this.fromUser = fromUser;
    }
}
/**
 * Audio configuration.
 *
 * Configure audio bitrate, audio channel, audio encoding for publishing stream
 */
export class ZegoAudioConfig {
    /**
     * Create a default audio configuration (ZegoAudioConfigPresetStandardQuality, 48 kbps, Mono, ZegoAudioCodecIDDefault)
     */
    constructor(preset) {
        preset = preset ?? ZegoAudioConfigPreset.StandardQuality;
        this.codecID = ZegoAudioCodecID.Default;
        switch (preset) {
            case ZegoAudioConfigPreset.BasicQuality:
                this.bitrate = 16;
                this.channel = ZegoAudioChannel.Mono;
                break;
            case ZegoAudioConfigPreset.StandardQuality:
                this.bitrate = 48;
                this.channel = ZegoAudioChannel.Mono;
                break;
            case ZegoAudioConfigPreset.StandardQualityStereo:
                this.bitrate = 56;
                this.channel = ZegoAudioChannel.Stereo;
                break;
            case ZegoAudioConfigPreset.HighQuality:
                this.bitrate = 128;
                this.channel = ZegoAudioChannel.Mono;
                break;
            case ZegoAudioConfigPreset.HighQualityStereo:
                this.bitrate = 192;
                this.channel = ZegoAudioChannel.Stereo;
                break;
            default:
                this.bitrate = 48;
                this.channel = ZegoAudioChannel.Mono;
                break;
        }
    }
}
/**
 * Network speed test config
 */
export class ZegoNetworkSpeedTestConfig {
    constructor(testUplink, expectedUplinkBitrate, testDownlink, expectedDownlinkBitrate) {
        this.testUplink = testUplink;
        this.expectedUplinkBitrate = expectedUplinkBitrate;
        this.testDownlink = testDownlink;
        this.expectedDownlinkBitrate = expectedDownlinkBitrate;
    }
}
/**
 * AudioEffectPlayer play configuration.
 */
export class ZegoAudioEffectPlayConfig {
    constructor(playCount, isPublishOut) {
        this.playCount = playCount;
        this.isPublishOut = isPublishOut;
    }
}
/**
 * Zego MediaPlayer.
 *
 * Yon can use ZegoMediaPlayer to play media resource files on the local or remote server, and can mix the sound of the media resource files that are played into the publish stream to achieve the effect of background music.
 */
export class ZegoMediaPlayer {
}
/**
 * Audio effect player.
 */
export class ZegoAudioEffectPlayer {
}
/**
 * Screen capture configuration parameters.
 */
export class ZegoScreenCaptureConfig {
    constructor(captureVideo, captureAudio, microphoneVolume, applicationVolume) {
        this.captureVideo = captureVideo;
        this.captureAudio = captureAudio;
        this.microphoneVolume = microphoneVolume;
        this.applicationVolume = applicationVolume;
    }
}
