import { NativeModules, NativeEventEmitter } from 'react-native';
import * as zego from "../ZegoExpressDefines";
const { ZegoExpressNativeModule } = NativeModules;
const Prefix = ZegoExpressNativeModule.prefix;
const ZegoEvent = new NativeEventEmitter(ZegoExpressNativeModule);
let engine;
export class ZegoExpressEngineImpl {
    static getInstance() {
        if (engine) {
            return engine;
        }
        else {
            throw new Error('Get instance failed. Please create engine first');
        }
    }
    static async createEngine(appID, appSign, isTestEnv, scenario) {
        if (engine) {
            return engine;
        }
        await ZegoExpressNativeModule.createEngine(appID, appSign, isTestEnv, scenario);
        engine = new ZegoExpressEngineImpl();
        return engine;
    }
    static async createEngineWithProfile(profile) {
        if (engine) {
            return engine;
        }
        await ZegoExpressNativeModule.createEngineWithProfile(profile);
        engine = new ZegoExpressEngineImpl();
        return engine;
    }
    static destroyEngine() {
        engine = undefined;
        ZegoExpressEngineImpl._listeners.forEach((value, key) => {
            ZegoEvent.removeAllListeners(Prefix + key);
        });
        ZegoExpressEngineImpl._mediaPlayerMap.forEach((vaule, key) => {
            ZegoExpressNativeModule.destroyMediaPlayer(key);
        });
        ZegoExpressEngineImpl._listeners.clear();
        ZegoExpressEngineImpl._mediaPlayerMap.clear();
        // this.removeAllListeners();
        return ZegoExpressNativeModule.destroyEngine();
    }
    static setEngineConfig(config) {
        return ZegoExpressNativeModule.setEngineConfig(config);
    }
    static setRoomMode(mode) {
        return ZegoExpressNativeModule.setRoomMode(mode);
    }
    static getVersion() {
        return ZegoExpressNativeModule.getVersion();
    }
    getVersion() {
        return ZegoExpressNativeModule.getVersion();
    }
    uploadLog() {
        return ZegoExpressNativeModule.uploadLog();
    }
    callExperimentalAPI(params) {
        return ZegoExpressNativeModule.callExperimentalAPI(params);
    }
    on(event, callback) {
        const native_listener = (res) => {
            const { data } = res;
            // @ts-ignore
            callback(...data);
        };
        let map = ZegoExpressEngineImpl._listeners.get(event);
        if (map === undefined) {
            map = new Map();
            ZegoExpressEngineImpl._listeners.set(event, map);
        }
        map.set(callback, native_listener);
        ZegoEvent.addListener(Prefix + event, native_listener);
        ZegoExpressEngineImpl._listeners.set(event, map);
    }
    off(event, callback) {
        if (callback === undefined) {
            ZegoEvent.removeAllListeners(Prefix + event);
            ZegoExpressEngineImpl._listeners.delete(event);
        }
        else {
            const map = ZegoExpressEngineImpl._listeners.get(event);
            if (map === undefined)
                return;
            ZegoEvent.removeListener(Prefix + event, map.get(callback));
            map.delete(callback);
        }
    }
    loginRoom(roomID, user, config) {
        return ZegoExpressNativeModule.loginRoom(roomID, user, config);
    }
    logoutRoom(roomID) {
        return ZegoExpressNativeModule.logoutRoom(roomID);
    }
    switchRoom(fromRoomID, toRoomID, config) {
        return ZegoExpressNativeModule.switchRoom(fromRoomID, toRoomID, config);
    }
    renewToken(roomID, token) {
        return ZegoExpressNativeModule.renewToken(roomID, token);
    }
    setRoomExtraInfo(roomID, key, value) {
        return ZegoExpressNativeModule.setRoomExtraInfo(roomID, key, value);
    }
    setStreamExtraInfo(extraInfo, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.setStreamExtraInfo(extraInfo, channel);
    }
    sendBroadcastMessage(roomID, message) {
        return ZegoExpressNativeModule.sendBroadcastMessage(roomID, message);
    }
    sendBarrageMessage(roomID, message) {
        return ZegoExpressNativeModule.sendBarrageMessage(roomID, message);
    }
    sendCustomCommand(roomID, command, toUserList) {
        return ZegoExpressNativeModule.sendCustomCommand(roomID, command, toUserList);
    }
    startPublishingStream(streamID, channel = zego.ZegoPublishChannel.Main, config) {
        return ZegoExpressNativeModule.startPublishingStream(streamID, channel, config);
    }
    stopPublishingStream(channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.stopPublishingStream(channel);
    }
    startPreview(view, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.startPreview(view, channel);
    }
    stopPreview(channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.stopPreview(channel);
    }
    setVideoConfig(config, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.setVideoConfig(config, channel);
    }
    getVideoConfig(channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.getVideoConfig(channel);
    }
    setVideoMirrorMode(mode, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.setVideoMirrorMode(mode, channel);
    }
    setAppOrientation(mode, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.setAppOrientation(mode, channel);
    }
    setAudioConfig(config, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.setAudioConfig(config, channel);
    }
    getAudioConfig(channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.getAudioConfig(channel);
    }
    mutePublishStreamAudio(mute, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.mutePublishStreamAudio(mute, channel);
    }
    mutePublishStreamVideo(mute, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.mutePublishStreamVideo(mute, channel);
    }
    setCaptureVolume(volume) {
        return ZegoExpressNativeModule.setCaptureVolume(volume);
    }
    addPublishCdnUrl(streamID, targetURL) {
        return ZegoExpressNativeModule.addPublishCdnUrl(streamID, targetURL);
    }
    removePublishCdnUrl(streamID, targetURL) {
        return ZegoExpressNativeModule.removePublishCdnUrl(streamID, targetURL);
    }
    enablePublishDirectToCDN(enable, config, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.enablePublishDirectToCDN(enable, config, channel);
    }
    sendSEI(data, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.sendSEI(Array.from(data), channel);
    }
    enableHardwareEncoder(enable) {
        return ZegoExpressNativeModule.enableHardwareEncoder(enable);
    }
    enableH265EncodeFallback(enable) {
        return ZegoExpressNativeModule.enableH265EncodeFallback(enable);
    }
    isVideoEncoderSupported(codecID) {
        return ZegoExpressNativeModule.isVideoEncoderSupported(codecID);
    }
    startPlayingStream(streamID, view, config) {
        return ZegoExpressNativeModule.startPlayingStream(streamID, view, config);
    }
    stopPlayingStream(streamID) {
        return ZegoExpressNativeModule.stopPlayingStream(streamID);
    }
    setPlayVolume(streamID, volume) {
        return ZegoExpressNativeModule.setPlayVolume(streamID, volume);
    }
    setAllPlayStreamVolume(volume) {
        return ZegoExpressNativeModule.setAllPlayStreamVolume(volume);
    }
    setPlayStreamVideoType(streamID, streamType) {
        return ZegoExpressNativeModule.setPlayStreamVideoType(streamID, streamType);
    }
    takePublishStreamSnapshot(channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.takePublishStreamSnapshot(channel);
    }
    takePlayStreamSnapshot(streamID) {
        return ZegoExpressNativeModule.takePlayStreamSnapshot(streamID);
    }
    mutePlayStreamAudio(streamID, mute) {
        return ZegoExpressNativeModule.mutePlayStreamAudio(streamID, mute);
    }
    mutePlayStreamVideo(streamID, mute) {
        return ZegoExpressNativeModule.mutePlayStreamVideo(streamID, mute);
    }
    muteAllPlayStreamAudio(mute) {
        return ZegoExpressNativeModule.muteAllPlayStreamAudio(mute);
    }
    muteAllPlayStreamVideo(mute) {
        return ZegoExpressNativeModule.muteAllPlayStreamVideo(mute);
    }
    enableHardwareDecoder(enable) {
        return ZegoExpressNativeModule.enableHardwareDecoder(enable);
    }
    isVideoDecoderSupported(codecID) {
        return ZegoExpressNativeModule.isVideoDecoderSupported(codecID);
    }
    muteMicrophone(mute) {
        return ZegoExpressNativeModule.muteMicrophone(mute);
    }
    isMicrophoneMuted() {
        return ZegoExpressNativeModule.isMicrophoneMuted();
    }
    muteSpeaker(mute) {
        return ZegoExpressNativeModule.muteSpeaker(mute);
    }
    isSpeakerMuted() {
        return ZegoExpressNativeModule.isSpeakerMuted();
    }
    enableAudioCaptureDevice(enable) {
        return ZegoExpressNativeModule.enableAudioCaptureDevice(enable);
    }
    getAudioRouteType() {
        return ZegoExpressNativeModule.getAudioRouteType();
    }
    setAudioRouteToSpeaker(defaultToSpeaker) {
        return ZegoExpressNativeModule.setAudioRouteToSpeaker(defaultToSpeaker);
    }
    enableCamera(enable, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.enableCamera(enable, channel);
    }
    useFrontCamera(enable, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.useFrontCamera(enable, channel);
    }
    startSoundLevelMonitor(config) {
        return ZegoExpressNativeModule.startSoundLevelMonitor(config);
    }
    stopSoundLevelMonitor() {
        return ZegoExpressNativeModule.stopSoundLevelMonitor();
    }
    enableHeadphoneMonitor(enable) {
        return ZegoExpressNativeModule.enableHeadphoneMonitor(enable);
    }
    enableAEC(enable) {
        return ZegoExpressNativeModule.enableAEC(enable);
    }
    enableHeadphoneAEC(enable) {
        return ZegoExpressNativeModule.enableHeadphoneAEC(enable);
    }
    setAECMode(mode) {
        return ZegoExpressNativeModule.setAECMode(mode);
    }
    enableAGC(enable) {
        return ZegoExpressNativeModule.enableAGC(enable);
    }
    enableANS(enable) {
        return ZegoExpressNativeModule.enableANS(enable);
    }
    setANSMode(mode) {
        return ZegoExpressNativeModule.setANSMode(mode);
    }
    enableBeautify(feature, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.enableBeautify(feature, channel);
    }
    setBeautifyOption(option, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.setBeautifyOption(option, channel);
    }
    startNetworkSpeedTest(config, interval = 3000) {
        return ZegoExpressNativeModule.startNetworkSpeedTest(config, interval);
    }
    stopNetworkSpeedTest() {
        return ZegoExpressNativeModule.stopNetworkSpeedTest();
    }
    getNetworkTimeInfo() {
        return ZegoExpressNativeModule.getNetworkTimeInfo();
    }
    enableCustomAudioIO(enable, config, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.enableCustomAudioIO(enable, config, channel);
    }
    enableCustomVideoProcessing(enable, config, channel) {
        return ZegoExpressNativeModule.enableCustomVideoProcessing(enable, config, channel);
    }
    setVideoSource(source, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.setVideoSource(source, channel);
    }
    setAudioSource(source, channel = zego.ZegoPublishChannel.Main) {
        return ZegoExpressNativeModule.setAudioSource(source, channel);
    }
    startScreenCaptureInApp(config) {
        return ZegoExpressNativeModule.startScreenCaptureInApp(config);
    }
    startScreenCapture(config) {
        return ZegoExpressNativeModule.startScreenCapture(config);
    }
    stopScreenCapture() {
        return ZegoExpressNativeModule.stopScreenCapture();
    }
    updateScreenCaptureConfig(config) {
        return ZegoExpressNativeModule.updateScreenCaptureConfig(config);
    }
    async createMediaPlayer() {
        var index = await ZegoExpressNativeModule.createMediaPlayer();
        if (index >= 0) {
            var mediaPlayer = new ZegoMediaPlayerImpl(index);
            ZegoExpressEngineImpl._mediaPlayerMap.set(index, mediaPlayer);
            return mediaPlayer;
        }
        return null;
    }
    async destroyMediaPlayer(mediaPlayer) {
        var index = mediaPlayer.getIndex();
        if (index >= 0) {
            await ZegoExpressNativeModule.destroyMediaPlayer(index);
            ZegoExpressEngineImpl._mediaPlayerMap.delete(index);
            mediaPlayer.off("mediaPlayerStateUpdate");
            mediaPlayer.off("mediaPlayerNetworkEvent");
            mediaPlayer.off("mediaPlayerPlayingProgress");
        }
        return;
    }
    async createAudioEffectPlayer() {
        let index = await ZegoExpressNativeModule.createAudioEffectPlayer();
        if (index >= 0) {
            let player = new ZegoAudioEffectPlayerImpl(index);
            ZegoExpressEngineImpl._audioEffectPlayerMap.set(index, player);
            return player;
        }
        return null;
    }
    async destroyAudioEffectPlayer(audioEffectPlayer) {
        let index = audioEffectPlayer.getIndex();
        if (index >= 0) {
            await ZegoExpressNativeModule.destroyAudioEffectPlayer(index);
            ZegoExpressEngineImpl._audioEffectPlayerMap.delete(index);
            audioEffectPlayer.off("audioEffectPlayerStateUpdate");
        }
        return;
    }
    startMixerTask(task) {
        return ZegoExpressNativeModule.startMixerTask(task);
    }
    stopMixerTask(task) {
        return ZegoExpressNativeModule.stopMixerTask(task);
    }
    startEffectsEnv() {
        return ZegoExpressNativeModule.startEffectsEnv();
    }
    stopEffectsEnv() {
        return ZegoExpressNativeModule.stopEffectsEnv();
    }
    enableEffectsBeauty(enable) {
        return ZegoExpressNativeModule.enableEffectsBeauty(enable);
    }
    setEffectsBeautyParam(param) {
        return ZegoExpressNativeModule.setEffectsBeautyParam(param);
    }
    setVoiceChangerPreset(preset) {
        return ZegoExpressNativeModule.setVoiceChangerPreset(preset);
    }
    setVoiceChangerParam(param) {
        return ZegoExpressNativeModule.setVoiceChangerParam(param);
    }
    setAudioEqualizerGain(bandIndex, bandGain) {
        return ZegoExpressNativeModule.setAudioEqualizerGain(bandIndex, bandGain);
    }
    setReverbPreset(preset) {
        return ZegoExpressNativeModule.setReverbPreset(preset);
    }
    setReverbAdvancedParam(param) {
        return ZegoExpressNativeModule.setReverbAdvancedParam(param);
    }
    setReverbEchoParam(param) {
        return ZegoExpressNativeModule.setReverbEchoParam(param);
    }
    setElectronicEffects(enable, mode, tonal) {
        return ZegoExpressNativeModule.setElectronicEffects(enable, mode, tonal);
    }
}
ZegoExpressEngineImpl._listeners = new Map();
ZegoExpressEngineImpl._mediaPlayerMap = new Map();
ZegoExpressEngineImpl._audioEffectPlayerMap = new Map();
export class ZegoMediaPlayerImpl extends zego.ZegoMediaPlayer {
    constructor(index) {
        super();
        this._index = index;
    }
    on(event, callback) {
        const native_listener = (res) => {
            const { data, idx } = res;
            if (idx >= 0) {
                let mediaPlayer = ZegoExpressEngineImpl._mediaPlayerMap.get(idx);
                // @ts-ignore
                callback(mediaPlayer, ...data);
            }
        };
        let map = ZegoExpressEngineImpl._listeners.get(event);
        if (map === undefined) {
            map = new Map();
            ZegoExpressEngineImpl._listeners.set(event, map);
        }
        map.set(callback, native_listener);
        ZegoEvent.addListener(Prefix + event, native_listener);
        ZegoExpressEngineImpl._listeners.set(event, map);
    }
    off(event, callback) {
        if (callback === undefined) {
            ZegoEvent.removeAllListeners(Prefix + event);
            ZegoExpressEngineImpl._listeners.delete(event);
        }
        else {
            const map = ZegoExpressEngineImpl._listeners.get(event);
            if (map === undefined)
                return;
            ZegoEvent.removeListener(Prefix + event, map.get(callback));
            map.delete(callback);
        }
    }
    loadResource(path) {
        return ZegoExpressNativeModule.mediaPlayerLoadResource(this._index, path);
    }
    start() {
        return ZegoExpressNativeModule.mediaPlayerStart(this._index);
    }
    stop() {
        return ZegoExpressNativeModule.mediaPlayerStop(this._index);
    }
    pause() {
        return ZegoExpressNativeModule.mediaPlayerPause(this._index);
    }
    resume() {
        return ZegoExpressNativeModule.mediaPlayerResume(this._index);
    }
    setPlayerView(view) {
        return ZegoExpressNativeModule.mediaPlayerSetPlayerCanvas(this._index, view);
    }
    seekTo(millisecond) {
        return ZegoExpressNativeModule.mediaPlayerSeekTo(this._index, millisecond);
    }
    setPlaySpeed(speed) {
        return ZegoExpressNativeModule.mediaPlayerSetPlaySpeed(this._index, speed);
    }
    enableRepeat(enable) {
        return ZegoExpressNativeModule.mediaPlayerEnableRepeat(this._index, enable);
    }
    enableAux(enable) {
        return ZegoExpressNativeModule.mediaPlayerEnableAux(this._index, enable);
    }
    muteLocal(mute) {
        return ZegoExpressNativeModule.mediaPlayerMuteLocal(this._index, mute);
    }
    setVolume(volume) {
        return ZegoExpressNativeModule.mediaPlayerSetVolume(this._index, volume);
    }
    setPlayVolume(volume) {
        return ZegoExpressNativeModule.mediaPlayerSetPlayVolume(this._index, volume);
    }
    setPublishVolume(volume) {
        return ZegoExpressNativeModule.mediaPlayerSetPublishVolume(this._index, volume);
    }
    setProgressInterval(millisecond) {
        return ZegoExpressNativeModule.mediaPlayerSetProgressInterval(this._index, millisecond);
    }
    getPlayVolume() {
        return ZegoExpressNativeModule.mediaPlayerGetPlayVolume(this._index);
    }
    getPublishVolume() {
        return ZegoExpressNativeModule.mediaPlayerGetPublishVolume(this._index);
    }
    getTotalDuration() {
        return ZegoExpressNativeModule.mediaPlayerGetTotalDuration(this._index);
    }
    getCurrentProgress() {
        return ZegoExpressNativeModule.mediaPlayerGetCurrentProgress(this._index);
    }
    getAudioTrackCount() {
        return ZegoExpressNativeModule.mediaPlayerGetAudioTrackCount(this._index);
    }
    setAudioTrackIndex(index) {
        return ZegoExpressNativeModule.mediaPlayerSetAudioTrackIndex(this._index, index);
    }
    getCurrentState() {
        return ZegoExpressNativeModule.mediaPlayerGetCurrentState(this._index);
    }
    getIndex() {
        return this._index;
    }
}
export class ZegoAudioEffectPlayerImpl extends zego.ZegoAudioEffectPlayer {
    constructor(index) {
        super();
        this._index = index;
    }
    on(event, callback) {
        const native_listener = (res) => {
            const { data, idx } = res;
            if (idx >= 0) {
                let player = ZegoExpressEngineImpl._audioEffectPlayerMap.get(idx);
                // @ts-ignore
                callback(player, ...data);
            }
        };
        let map = ZegoExpressEngineImpl._listeners.get(event);
        if (map === undefined) {
            map = new Map();
            ZegoExpressEngineImpl._listeners.set(event, map);
        }
        map.set(callback, native_listener);
        ZegoEvent.addListener(Prefix + event, native_listener);
        ZegoExpressEngineImpl._listeners.set(event, map);
    }
    off(event, callback) {
        if (callback === undefined) {
            ZegoEvent.removeAllListeners(Prefix + event);
            ZegoExpressEngineImpl._listeners.delete(event);
        }
        else {
            const map = ZegoExpressEngineImpl._listeners.get(event);
            if (map === undefined)
                return;
            ZegoEvent.removeListener(Prefix + event, map.get(callback));
            map.delete(callback);
        }
    }
    start(audioEffectID, path, config) {
        return ZegoExpressNativeModule.audioEffectPlayerStart(this._index, audioEffectID, path, config);
    }
    stop(audioEffectID) {
        return ZegoExpressNativeModule.audioEffectPlayerStop(this._index, audioEffectID);
    }
    pause(audioEffectID) {
        return ZegoExpressNativeModule.audioEffectPlayerPause(this._index, audioEffectID);
    }
    resume(audioEffectID) {
        return ZegoExpressNativeModule.audioEffectPlayerResume(this._index, audioEffectID);
    }
    stopAll() {
        return ZegoExpressNativeModule.audioEffectPlayerStopAll(this._index);
    }
    pauseAll() {
        return ZegoExpressNativeModule.audioEffectPlayerPauseAll(this._index);
    }
    resumeAll() {
        return ZegoExpressNativeModule.audioEffectPlayerResumeAll(this._index);
    }
    seekTo(audioEffectID, millisecond) {
        return ZegoExpressNativeModule.audioEffectPlayerSeekTo(this._index, audioEffectID, millisecond);
    }
    setVolume(audioEffectID, volume) {
        return ZegoExpressNativeModule.audioEffectPlayerSetVolume(this._index, audioEffectID, volume);
    }
    setVolumeAll(volume) {
        return ZegoExpressNativeModule.audioEffectPlayerSetVolumeAll(this._index, volume);
    }
    getTotalDuration(audioEffectID) {
        return ZegoExpressNativeModule.audioEffectPlayerGetTotalDuration(this._index, audioEffectID);
    }
    getCurrentProgress(audioEffectID) {
        return ZegoExpressNativeModule.audioEffectPlayerGetCurrentProgress(this._index, audioEffectID);
    }
    loadResource(audioEffectID, path) {
        return ZegoExpressNativeModule.audioEffectPlayerLoadResource(this._index, audioEffectID, path);
    }
    unloadResource(audioEffectID) {
        return ZegoExpressNativeModule.audioEffectPlayerUnloadResource(this._index, audioEffectID);
    }
    getIndex() {
        return this._index;
    }
}
