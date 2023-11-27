package im.zego.reactnative;

import android.app.Application;
import android.graphics.Bitmap;
import android.graphics.Rect;
import android.view.View;
import android.view.TextureView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import androidx.annotation.Nullable;
import im.zego.zegoexpress.*;
import im.zego.zegoexpress.callback.IZegoApiCalledEventHandler;
import im.zego.zegoexpress.callback.IZegoAudioEffectPlayerEventHandler;
import im.zego.zegoexpress.callback.IZegoAudioEffectPlayerLoadResourceCallback;
import im.zego.zegoexpress.callback.IZegoAudioEffectPlayerSeekToCallback;
import im.zego.zegoexpress.callback.IZegoDestroyCompletionCallback;
import im.zego.zegoexpress.callback.IZegoEventHandler;
import im.zego.zegoexpress.callback.IZegoIMSendBarrageMessageCallback;
import im.zego.zegoexpress.callback.IZegoIMSendBroadcastMessageCallback;
import im.zego.zegoexpress.callback.IZegoIMSendCustomCommandCallback;
import im.zego.zegoexpress.callback.IZegoMediaPlayerEventHandler;
import im.zego.zegoexpress.callback.IZegoMediaPlayerLoadResourceCallback;
import im.zego.zegoexpress.callback.IZegoMediaPlayerSeekToCallback;
import im.zego.zegoexpress.callback.IZegoMixerStartCallback;
import im.zego.zegoexpress.callback.IZegoMixerStopCallback;
import im.zego.zegoexpress.callback.IZegoPlayerTakeSnapshotCallback;
import im.zego.zegoexpress.callback.IZegoPublisherSetStreamExtraInfoCallback;
import im.zego.zegoexpress.callback.IZegoPublisherTakeSnapshotCallback;
import im.zego.zegoexpress.callback.IZegoPublisherUpdateCdnUrlCallback;
import im.zego.zegoexpress.callback.IZegoRoomLoginCallback;
import im.zego.zegoexpress.callback.IZegoRoomLogoutCallback;
import im.zego.zegoexpress.callback.IZegoRoomSetRoomExtraInfoCallback;
import im.zego.zegoexpress.constants.ZegoAECMode;
import im.zego.zegoexpress.constants.ZegoANSMode;
import im.zego.zegoexpress.constants.ZegoAudioChannel;
import im.zego.zegoexpress.constants.ZegoAudioCodecID;
import im.zego.zegoexpress.constants.ZegoAudioEffectPlayState;
import im.zego.zegoexpress.constants.ZegoAudioRoute;
import im.zego.zegoexpress.constants.ZegoAudioSourceType;
import im.zego.zegoexpress.constants.ZegoDeviceExceptionType;
import im.zego.zegoexpress.constants.ZegoDeviceType;
import im.zego.zegoexpress.constants.ZegoElectronicEffectsMode;
import im.zego.zegoexpress.constants.ZegoMediaPlayerNetworkEvent;
import im.zego.zegoexpress.constants.ZegoMediaPlayerState;
import im.zego.zegoexpress.constants.ZegoMixerInputContentType;
import im.zego.zegoexpress.constants.ZegoNetworkSpeedTestType;
import im.zego.zegoexpress.constants.ZegoOrientation;
import im.zego.zegoexpress.constants.ZegoPlayerMediaEvent;
import im.zego.zegoexpress.constants.ZegoPlayerState;
import im.zego.zegoexpress.constants.ZegoPlayerVideoLayer;
import im.zego.zegoexpress.constants.ZegoPublishChannel;
import im.zego.zegoexpress.constants.ZegoPublisherState;
import im.zego.zegoexpress.constants.ZegoRemoteDeviceState;
import im.zego.zegoexpress.constants.ZegoReverbPreset;
import im.zego.zegoexpress.constants.ZegoRoomMode;
import im.zego.zegoexpress.constants.ZegoRoomState;
import im.zego.zegoexpress.constants.ZegoRoomStateChangedReason;
import im.zego.zegoexpress.constants.ZegoScenario;
import im.zego.zegoexpress.constants.ZegoStreamEvent;
import im.zego.zegoexpress.constants.ZegoStreamQualityLevel;
import im.zego.zegoexpress.constants.ZegoStreamResourceMode;
import im.zego.zegoexpress.constants.ZegoUpdateType;
import im.zego.zegoexpress.constants.ZegoVideoBufferType;
import im.zego.zegoexpress.constants.ZegoVideoCodecID;
import im.zego.zegoexpress.constants.ZegoVideoMirrorMode;
import im.zego.zegoexpress.constants.ZegoVideoSourceType;
import im.zego.zegoexpress.constants.ZegoViewMode;
import im.zego.zegoexpress.constants.ZegoVideoStreamType;
import im.zego.zegoexpress.constants.ZegoVoiceChangerPreset;
import im.zego.zegoexpress.entity.ZegoAudioConfig;
import im.zego.zegoexpress.entity.ZegoAudioEffectPlayConfig;
import im.zego.zegoexpress.entity.ZegoBarrageMessageInfo;
import im.zego.zegoexpress.entity.ZegoBeautifyOption;
import im.zego.zegoexpress.entity.ZegoBroadcastMessageInfo;
import im.zego.zegoexpress.entity.ZegoCDNConfig;
import im.zego.zegoexpress.entity.ZegoCanvas;
import im.zego.zegoexpress.entity.ZegoCustomAudioConfig;
import im.zego.zegoexpress.entity.ZegoCustomVideoProcessConfig;
import im.zego.zegoexpress.entity.ZegoEffectsBeautyParam;
import im.zego.zegoexpress.entity.ZegoEngineConfig;
import im.zego.zegoexpress.entity.ZegoEngineProfile;
import im.zego.zegoexpress.entity.ZegoLogConfig;
import im.zego.zegoexpress.entity.ZegoMixerAudioConfig;
import im.zego.zegoexpress.entity.ZegoMixerInput;
import im.zego.zegoexpress.entity.ZegoMixerOutput;
import im.zego.zegoexpress.entity.ZegoMixerTask;
import im.zego.zegoexpress.entity.ZegoMixerVideoConfig;
import im.zego.zegoexpress.entity.ZegoNetworkSpeedTestConfig;
import im.zego.zegoexpress.entity.ZegoNetworkSpeedTestQuality;
import im.zego.zegoexpress.entity.ZegoNetworkTimeInfo;
import im.zego.zegoexpress.entity.ZegoPlayStreamQuality;
import im.zego.zegoexpress.entity.ZegoPlayerConfig;
import im.zego.zegoexpress.entity.ZegoPublisherConfig;
import im.zego.zegoexpress.entity.ZegoPublishStreamQuality;
import im.zego.zegoexpress.entity.ZegoReverbAdvancedParam;
import im.zego.zegoexpress.entity.ZegoReverbEchoParam;
import im.zego.zegoexpress.entity.ZegoRoomConfig;
import im.zego.zegoexpress.entity.ZegoRoomExtraInfo;
import im.zego.zegoexpress.entity.ZegoSoundLevelConfig;
import im.zego.zegoexpress.entity.ZegoStream;
import im.zego.zegoexpress.entity.ZegoStreamRelayCDNInfo;
import im.zego.zegoexpress.entity.ZegoUser;
import im.zego.zegoexpress.entity.ZegoVideoConfig;
import im.zego.zegoexpress.entity.ZegoVoiceChangerParam;

public class RCTZegoExpressNativeModule extends ReactContextBaseJavaModule {

    private static final String Prefix = "im.zego.reactnative.";

    private static boolean kIsInited = false;

    private static boolean pluginReported = false;

    private final ReactApplicationContext reactContext;

    private HashMap<Integer, ZegoMediaPlayer> mediaPlayerMap;
    private HashMap<Integer, ZegoAudioEffectPlayer> audioEffectPlayerMap;

    public RCTZegoExpressNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RCTZegoExpressNativeModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("prefix", Prefix);
        return constants;
    }

    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {
        this.reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Prefix + eventName, params);
    }

    private WritableMap getCallbackArgs(Object ...objects) {
        WritableMap map = Arguments.createMap();
        WritableArray data = Arguments.createArray();
        for(Object obj : objects) {
            if(obj instanceof Integer) {
                data.pushInt((Integer) obj);
            } else if(obj instanceof Long) {
                data.pushInt(((Long) obj).intValue());
            } else if(obj instanceof String) {
                data.pushString((String) obj);
            } else if(obj instanceof Double) {
                data.pushDouble((Double)obj);
            } else if(obj instanceof Float) {
                data.pushDouble((Float)obj);
            } else if(obj instanceof Boolean) {
                data.pushBoolean((Boolean)obj);
            } else if(obj instanceof ReadableArray) {
                data.pushArray((ReadableArray) obj);
            } else if(obj instanceof ReadableMap) {
                data.pushMap((ReadableMap)obj);
            }
        }
        /*if(data.size() == 0) {
            data.pushNull();
        }*/
        map.putArray("data", data);

        return map;
    }

    private WritableMap getMediaPlayerCallbackArgs(int index, Object ...objects) {
        WritableMap map = Arguments.createMap();
        WritableArray data = Arguments.createArray();
        for(Object obj : objects) {
            if(obj instanceof Integer) {
                data.pushInt((Integer) obj);
            } else if(obj instanceof Long) {
                data.pushInt(((Long) obj).intValue());
            } else if(obj instanceof String) {
                data.pushString((String) obj);
            } else if(obj instanceof Double) {
                data.pushDouble((Double)obj);
            } else if(obj instanceof Float) {
                data.pushDouble((Float)obj);
            } else if(obj instanceof Boolean) {
                data.pushBoolean((Boolean)obj);
            } else if(obj instanceof ReadableArray) {
                data.pushArray((ReadableArray) obj);
            } else if(obj instanceof ReadableMap) {
                data.pushMap((ReadableMap)obj);
            }
        }
        /*if(data.size() == 0) {
            data.pushNull();
        }*/
        map.putArray("data", data);
        map.putInt("idx", index);
        return map;
    }

    private void reportPluginInfo() {

        if (pluginReported) { return; }

        pluginReported = true;

        HashMap<String, String> advancedConfigMap = new HashMap<>();
        advancedConfigMap.put("thirdparty_framework_info", "reactnative");

        ZegoEngineConfig configObject = new ZegoEngineConfig();
        configObject.advancedConfig = advancedConfigMap;

        ZegoExpressEngine.setEngineConfig(configObject);
    }

    // Required for rn built in EventEmitter Calls.
    @ReactMethod
    public void addListener(String eventName) {

    }

    @ReactMethod
    public void removeListeners(Integer count) {

    }

    @ReactMethod
    public void getVersion(Promise promise) {
        promise.resolve(ZegoExpressEngine.getVersion());
    }

    @ReactMethod
    public void createEngineWithProfile(ReadableMap profileParam, Promise promise) {

		// Report framework info
		reportPluginInfo();

        // Fix hot update did not destroy the engine
		if (ZegoExpressEngine.getEngine() != null) {
            ZegoExpressEngine.destroyEngine(null);
        }

        ZegoExpressEngine.setApiCalledCallback(zegoApiCalledEventHandler);

        double appID = profileParam.getDouble("appID");
		int scenario = profileParam.getInt("scenario");

        ZegoEngineProfile profile = new ZegoEngineProfile();
		profile.appID = (long) appID;
		profile.scenario = ZegoScenario.getZegoScenario(scenario);
		profile.application = (Application) this.reactContext.getApplicationContext();

        if (profileParam.hasKey("appSign")) {
            profile.appSign = profileParam.getString("appSign");
        }

		ZegoExpressEngine.createEngine(profile, zegoEventHandler);
        kIsInited = true;

        promise.resolve(null);
	}

    @ReactMethod
    public void createEngine(Double appID, String appSign, boolean isTestEnv, int scenario, Promise promise) {

        // Report framework info
        reportPluginInfo();

        // Fix hot update did not destroy the engine
        if (ZegoExpressEngine.getEngine() != null) {
            ZegoExpressEngine.destroyEngine(null);
        }

        ZegoExpressEngine.setApiCalledCallback(zegoApiCalledEventHandler);

        ZegoExpressEngine.createEngine(appID.longValue(), appSign, isTestEnv, ZegoScenario.getZegoScenario(scenario), (Application) this.reactContext.getApplicationContext(), zegoEventHandler);

        kIsInited = true;

        promise.resolve(null);
    }

    @ReactMethod
    public void destroyEngine(final Promise promise) {
        if(kIsInited) {
            ZegoExpressEngine.destroyEngine(new IZegoDestroyCompletionCallback() {
                @Override
                public void onDestroyCompletion() {
                    promise.resolve(null);
                }
            });
            kIsInited = false;
        } else {
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void setEngineConfig(ReadableMap config, Promise promise) {

        // Report framework info
        reportPluginInfo();

        ZegoEngineConfig configObj = new ZegoEngineConfig();
        ReadableMap logConfig = config.getMap("logConfig");
        if(logConfig != null) {
            ZegoLogConfig logConfigObj = new ZegoLogConfig();
            String logPath = logConfig.getString("logPath");
            if(logPath != null) {
                logConfigObj.logPath = logPath;
            }
            if (logConfig.hasKey("logSize")) {
                logConfigObj.logSize = logConfig.getInt("logSize");
            }
            configObj.logConfig = logConfigObj;
        }

        ReadableMap advancedConfig = config.getMap("advancedConfig");
        if(advancedConfig != null) {
            HashMap<String, Object> adMap = advancedConfig.toHashMap();
            for(Map.Entry<String, Object> entry: adMap.entrySet()) {
                configObj.advancedConfig.put(entry.getKey(), entry.getValue().toString());
            }
        }

        ZegoExpressEngine.setEngineConfig(configObj);

        promise.resolve(null);
    }

    @ReactMethod
    public void setRoomMode(int mode, Promise promise) {
        ZegoRoomMode roomMode = ZegoRoomMode.getZegoRoomMode(mode);

        ZegoExpressEngine.setRoomMode(roomMode);
        promise.resolve(null);
    }

    @ReactMethod
    public void uploadLog(Promise promise) {
        ZegoExpressEngine.getEngine().uploadLog();

        promise.resolve(null);
    }


    @ReactMethod
    public void callExperimentalAPI(String params, Promise promise) {
        String result = ZegoExpressEngine.getEngine().callExperimentalAPI(params);

        promise.resolve(result);
    }

    @ReactMethod
    public void loginRoom(String roomID, ReadableMap user, ReadableMap config, final Promise promise) {
        ZegoUser userObj = new ZegoUser(user.getString("userID"), user.getString("userName"));

        ZegoRoomConfig roomConfigObj = new ZegoRoomConfig();
        if(config != null) {
            if (config.hasKey("isUserStatusNotify")) {
                roomConfigObj.isUserStatusNotify = config.getBoolean("isUserStatusNotify");
            }
            if (config.hasKey("maxMemberCount")) {
                roomConfigObj.maxMemberCount = config.getInt("maxMemberCount");
            }
            if (config.hasKey("token")) {
                roomConfigObj.token = config.getString("token");
            }
        }
        ZegoExpressEngine.getEngine().loginRoom(roomID, userObj, roomConfigObj, new IZegoRoomLoginCallback() {
            @Override
            public void onRoomLoginResult(int errorCode, JSONObject extendedData) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", errorCode);
                returnMap.putString("extendedData", extendedData.toString());
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void logoutRoom(String roomID, final Promise promise) {
        if (roomID != null) {
            ZegoExpressEngine.getEngine().logoutRoom(roomID, new IZegoRoomLogoutCallback() {
                @Override
                public void onRoomLogoutResult(int errorCode, JSONObject extendedData) {
                    WritableMap returnMap = Arguments.createMap();
                    returnMap.putInt("errorCode", errorCode);
                    returnMap.putString("extendedData", extendedData.toString());
                    promise.resolve(returnMap);
                }
            });
        } else {
            ZegoExpressEngine.getEngine().logoutRoom(new IZegoRoomLogoutCallback() {
                @Override
                public void onRoomLogoutResult(int errorCode, JSONObject extendedData) {
                    WritableMap returnMap = Arguments.createMap();
                    returnMap.putInt("errorCode", errorCode);
                    returnMap.putString("extendedData", extendedData.toString());
                    promise.resolve(returnMap);
                }
            });
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void switchRoom(String fromRoomID, String toRoomID, ReadableMap config, Promise promise) {

        ZegoRoomConfig roomConfig = new ZegoRoomConfig();
        if (config != null) {
            if (config.hasKey("isUserStatusNotify")) {
                roomConfig.isUserStatusNotify = config.getBoolean("isUserStatusNotify");
            }
            if (config.hasKey("maxMemberCount")) {
                roomConfig.maxMemberCount = config.getInt("maxMemberCount");
            }
            if (config.hasKey("token")) {
                roomConfig.token = config.getString("token");
            }
        }
        ZegoExpressEngine.getEngine().switchRoom(fromRoomID, toRoomID, roomConfig);

        promise.resolve(null);
    }

	@ReactMethod
	public void renewToken(String roomID, String token, Promise promise) {
		ZegoExpressEngine.getEngine().renewToken(roomID, token);

		promise.resolve(null);
	}

    @ReactMethod
    public void setRoomExtraInfo(String roomID, String key, String value, final Promise promise) {
        ZegoExpressEngine.getEngine().setRoomExtraInfo(roomID, key, value, new IZegoRoomSetRoomExtraInfoCallback() {
            @Override
            public void onRoomSetRoomExtraInfoResult(int i) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", i);
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void setStreamExtraInfo(String extraInfo, int channel, final Promise promise) {
        ZegoExpressEngine.getEngine().setStreamExtraInfo(extraInfo, ZegoPublishChannel.getZegoPublishChannel(channel), new IZegoPublisherSetStreamExtraInfoCallback() {
            @Override
            public void onPublisherSetStreamExtraInfoResult(int i) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", i);
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void startPublishingStream(String streamID, int channel, ReadableMap config, Promise promise) {

        ZegoPublishChannel publishChannel = ZegoPublishChannel.getZegoPublishChannel(channel);

        if (config != null) {
            ZegoPublisherConfig publisherConfig = new ZegoPublisherConfig();
            publisherConfig.roomID = config.getString("roomID");
            publisherConfig.forceSynchronousNetworkTime = config.getInt("forceSynchronousNetworkTime");
            ZegoExpressEngine.getEngine().startPublishingStream(streamID, publisherConfig, publishChannel);
        } else {
            ZegoExpressEngine.getEngine().startPublishingStream(streamID, publishChannel);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void stopPublishingStream(int channel, Promise promise) {
        ZegoExpressEngine.getEngine().stopPublishingStream(ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void startPreview(final ReadableMap view, final int channel, final Promise promise) {

        if(view != null) {
            final int viewTag = view.getInt("reactTag");
            UIManagerModule uiMgr = this.reactContext.getNativeModule(UIManagerModule.class);
            uiMgr.addUIBlock(new UIBlock() {
                @Override
                public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                    View nativeView = nativeViewHierarchyManager.resolveView(viewTag);
                    ZegoCanvas canvas = null;
                    if(nativeView instanceof ZegoSurfaceView) {
                        ZegoSurfaceView sv = (ZegoSurfaceView)nativeView;
                        canvas = new ZegoCanvas(sv.getView());
                    } else if(nativeView instanceof TextureView) {
                        canvas = new ZegoCanvas(nativeView);
                    }

                    if (canvas != null) {
                        canvas.viewMode = ZegoViewMode.getZegoViewMode(view.getInt("viewMode"));
                        canvas.backgroundColor = view.getInt("backgroundColor");
                    }

                    ZegoExpressEngine.getEngine().startPreview(canvas, ZegoPublishChannel.getZegoPublishChannel(channel));

                    promise.resolve(null);
                }
            });
        } else {
            ZegoExpressEngine.getEngine().startPreview(null, ZegoPublishChannel.getZegoPublishChannel(channel));
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void stopPreview(int channel, Promise promise) {
        ZegoExpressEngine.getEngine().stopPreview(ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void addPublishCdnUrl(String streamID, String targetURL, final Promise promise) {
        ZegoExpressEngine.getEngine().addPublishCdnUrl(streamID, targetURL, new IZegoPublisherUpdateCdnUrlCallback() {
            @Override
            public void onPublisherUpdateCdnUrlResult(int i) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", i);
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void removePublishCdnUrl(String streamID, String targetURL, final Promise promise) {
        ZegoExpressEngine.getEngine().removePublishCdnUrl(streamID, targetURL, new IZegoPublisherUpdateCdnUrlCallback() {
            @Override
            public void onPublisherUpdateCdnUrlResult(int i) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", i);
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void enablePublishDirectToCDN(boolean enable, ReadableMap configMap, int channel, Promise promise) {

        ZegoCDNConfig cdnConfig = new ZegoCDNConfig();
        if (configMap != null) {
            cdnConfig.url = configMap.getString("url");
            cdnConfig.authParam = configMap.getString("authParam");
            cdnConfig.protocol = configMap.getString("protocol");
            cdnConfig.quicVersion = configMap.getString("quicVersion");
        }

        ZegoExpressEngine.getEngine().enablePublishDirectToCDN(enable, cdnConfig, ZegoPublishChannel.getZegoPublishChannel(channel));
        promise.resolve(null);
    }

    @ReactMethod
    public void setVideoConfig(ReadableMap config, int channel, Promise promise) {
        ZegoVideoConfig configObj = new ZegoVideoConfig();
        configObj.captureWidth = config.getInt("captureWidth");
        configObj.captureHeight = config.getInt("captureHeight");
        configObj.encodeWidth = config.getInt("encodeWidth");
        configObj.encodeHeight = config.getInt("encodeHeight");
        configObj.bitrate = config.getInt("bitrate");
        configObj.fps = config.getInt("fps");
        configObj.codecID = ZegoVideoCodecID.getZegoVideoCodecID(config.getInt("codecID"));

        ZegoExpressEngine.getEngine().setVideoConfig(configObj, ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void getVideoConfig(int channel, Promise promise) {
        ZegoVideoConfig config = ZegoExpressEngine.getEngine().getVideoConfig(ZegoPublishChannel.getZegoPublishChannel(channel));

        WritableMap map = Arguments.createMap();
        map.putInt("captureWidth", config.captureWidth);
        map.putInt("captureHeight", config.captureHeight);
        map.putInt("encodeWidth", config.encodeWidth);
        map.putInt("encodeHeight", config.encodeHeight);
        map.putInt("bitrate", config.bitrate);
        map.putInt("fps", config.fps);
        map.putInt("codecID", config.codecID.value());

        promise.resolve(map);
    }

    @ReactMethod
    public void setVideoMirrorMode(int mode, int channel, Promise promise) {
        ZegoExpressEngine.getEngine().setVideoMirrorMode(ZegoVideoMirrorMode.getZegoVideoMirrorMode(mode), ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void setAppOrientation(int orientation, int channel, Promise promise) {
        ZegoExpressEngine.getEngine().setAppOrientation(ZegoOrientation.getZegoOrientation(orientation), ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void setAudioConfig(ReadableMap config, Promise promise) {
        ZegoAudioConfig configObj = new ZegoAudioConfig();
        configObj.bitrate = config.getInt("bitrate");
        configObj.channel = ZegoAudioChannel.getZegoAudioChannel(config.getInt("channel"));
        configObj.codecID = ZegoAudioCodecID.getZegoAudioCodecID(config.getInt("codecID"));

        ZegoExpressEngine.getEngine().setAudioConfig(configObj);

        promise.resolve(null);
    }

    @ReactMethod
    public void getAudioConfig(Promise promise) {
        ZegoAudioConfig config = ZegoExpressEngine.getEngine().getAudioConfig();

        WritableMap map = Arguments.createMap();
        map.putInt("bitrate", config.bitrate);
        map.putInt("channel", config.channel.value());
        map.putInt("codecID", config.codecID.value());

        promise.resolve(map);
    }

    @ReactMethod
    public void takePublishStreamSnapshot(int channel, final Promise promise) {
        ZegoExpressEngine.getEngine().takePublishStreamSnapshot(new IZegoPublisherTakeSnapshotCallback() {
            @Override
            public void onPublisherTakeSnapshotResult(int i, Bitmap bitmap) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", i);
                returnMap.putString("imageBase64", ZegoUtils.bitmapToBase64(bitmap));

                promise.resolve(returnMap);
            }
        }, ZegoPublishChannel.getZegoPublishChannel(channel));
    }

    @ReactMethod
    public void takePlayStreamSnapshot(String streamID, final Promise promise) {
        ZegoExpressEngine.getEngine().takePlayStreamSnapshot(streamID, new IZegoPlayerTakeSnapshotCallback() {
            @Override
            public void onPlayerTakeSnapshotResult(int i, Bitmap bitmap) {
                WritableMap map = Arguments.createMap();
                map.putInt("errorCode", i);
                map.putString("imageBase64", ZegoUtils.bitmapToBase64(bitmap));

                promise.resolve(map);
            }
        });
    }

    @ReactMethod
    public void mutePublishStreamAudio(boolean mute, int channel, Promise promise) {
        ZegoExpressEngine.getEngine().mutePublishStreamAudio(mute, ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void mutePublishStreamVideo(boolean mute, int channel, Promise promise) {
        ZegoExpressEngine.getEngine().mutePublishStreamVideo(mute, ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void setCaptureVolume(int volume, Promise promise) {
        ZegoExpressEngine.getEngine().setCaptureVolume(volume);

        promise.resolve(null);
    }

    @ReactMethod
    public void sendSEI(ReadableArray data, int channel, Promise promise) {

        byte[] bytes = new byte[data.size()];
        for (int i = 0; i < data.size(); i++) {
            bytes[i] = (byte) data.getInt(i);
        }

        ZegoExpressEngine.getEngine().sendSEI(bytes, ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void enableHardwareEncoder(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableHardwareEncoder(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void enableH265EncodeFallback(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableH265EncodeFallback(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void isVideoEncoderSupported(int codecID, Promise promise) {
        promise.resolve(ZegoExpressEngine.getEngine().isVideoEncoderSupported(ZegoVideoCodecID.getZegoVideoCodecID(codecID)));
    }

    @ReactMethod
    public void setVideoSource(int source, int channel, Promise promise) {
        ZegoVideoSourceType sourceType = ZegoVideoSourceType.getZegoVideoSourceType(source);
        ZegoPublishChannel publishChannel = ZegoPublishChannel.getZegoPublishChannel(channel);

        int result = ZegoExpressEngine.getEngine().setVideoSource(sourceType, publishChannel);
        promise.resolve(result);
    }

    @ReactMethod
    public void setAudioSource(int source, int channel, Promise promise) {
        ZegoAudioSourceType sourceType = ZegoAudioSourceType.getZegoAudioSourceType(source);
        ZegoPublishChannel publishChannel = ZegoPublishChannel.getZegoPublishChannel(channel);

        int result = ZegoExpressEngine.getEngine().setAudioSource(sourceType, publishChannel);
        promise.resolve(result);
    }

    @ReactMethod
    public void startPlayingStream(final String streamID, final ReadableMap view, final ReadableMap config, final Promise promise) {

        ZegoPlayerConfig configObj = null;

        if(config != null) {
            configObj = new ZegoPlayerConfig();
            ZegoCDNConfig cdnConfigObj;
            if(config.hasKey("cdnConfig")) {
                cdnConfigObj = new ZegoCDNConfig();
                ReadableMap cdnConfig = config.getMap("cdnConfig");
                if (cdnConfig != null) {
                    cdnConfigObj.url = cdnConfig.getString("url");
                    cdnConfigObj.authParam = cdnConfig.getString("authParam");
                }
                configObj.cdnConfig = cdnConfigObj;
            }
            if (config.hasKey("videoLayer")) {
                configObj.videoLayer = ZegoPlayerVideoLayer.getZegoPlayerVideoLayer(config.getInt("videoLayer"));
            }
            if (config.hasKey("roomID")) {
                configObj.roomID = config.getString("roomID");
            }
            if (config.hasKey("videoCodecID")) {
                configObj.videoCodecID = ZegoVideoCodecID.getZegoVideoCodecID(config.getInt("videoCodecID"));
            }
            if (config.hasKey("resourceMode")) {
                configObj.resourceMode = ZegoStreamResourceMode.getZegoStreamResourceMode(config.getInt("resourceMode"));
            }
        }

        if (view != null) {
            final int viewTag = view.getInt("reactTag");
            UIManagerModule uiMgr = this.reactContext.getNativeModule(UIManagerModule.class);
            final ZegoPlayerConfig finalConfigObj = configObj;
            uiMgr.addUIBlock(new UIBlock() {
                @Override
                public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                    View nativeView = nativeViewHierarchyManager.resolveView(viewTag);
                    ZegoCanvas canvas = null;
                    if(nativeView instanceof ZegoSurfaceView) {
                        ZegoSurfaceView sv = (ZegoSurfaceView)nativeView;
                        canvas = new ZegoCanvas(sv.getView());
                    } else if(nativeView instanceof TextureView) {
                        canvas = new ZegoCanvas(nativeView);
                    }

                    if (canvas != null) {
                        canvas.viewMode = ZegoViewMode.getZegoViewMode(view.getInt("viewMode"));
                        canvas.backgroundColor = view.getInt("backgroundColor");
                    }

                    ZegoExpressEngine.getEngine().startPlayingStream(streamID, canvas, finalConfigObj);
                    promise.resolve(null);
                }
            });
        } else {
            ZegoExpressEngine.getEngine().startPlayingStream(streamID, null, configObj);
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void stopPlayingStream(String streamID, Promise promise) {
        ZegoExpressEngine.getEngine().stopPlayingStream(streamID);

        promise.resolve(null);
    }

    @ReactMethod
    public void setPlayVolume(String streamID, int volume, Promise promise) {
        ZegoExpressEngine.getEngine().setPlayVolume(streamID, volume);

        promise.resolve(null);
    }

    @ReactMethod
    public void setAllPlayStreamVolume(int volume, Promise promise) {
        ZegoExpressEngine.getEngine().setAllPlayStreamVolume(volume);

        promise.resolve(null);
    }

    @ReactMethod
    public void setPlayStreamVideoType(String streamID, int streamType, Promise promise) {
        ZegoExpressEngine.getEngine().setPlayStreamVideoType(streamID, ZegoVideoStreamType.getZegoVideoStreamType(streamType));

        promise.resolve(null);
    }

    @ReactMethod
    public void mutePlayStreamAudio(String streamID, boolean mute, Promise promise) {
        ZegoExpressEngine.getEngine().mutePlayStreamAudio(streamID, mute);

        promise.resolve(null);
    }

    @ReactMethod
    public void muteAllPlayStreamAudio(boolean mute, Promise promise) {
        ZegoExpressEngine.getEngine().muteAllPlayStreamAudio(mute);

        promise.resolve(null);
    }

    @ReactMethod
    public void mutePlayStreamVideo(String streamID, boolean mute, Promise promise) {
        ZegoExpressEngine.getEngine().mutePlayStreamVideo(streamID, mute);

        promise.resolve(null);
    }

    @ReactMethod
    public void muteAllPlayStreamVideo(boolean mute, Promise promise) {
        ZegoExpressEngine.getEngine().muteAllPlayStreamVideo(mute);

        promise.resolve(null);
    }

    @ReactMethod
    public void enableHardwareDecoder(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableHardwareDecoder(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void isVideoDecoderSupported(int codecID, Promise promise) {
        promise.resolve(ZegoExpressEngine.getEngine().isVideoDecoderSupported(ZegoVideoCodecID.getZegoVideoCodecID(codecID)));
    }


    @ReactMethod
    public void muteMicrophone(boolean mute, Promise promise) {
        ZegoExpressEngine.getEngine().muteMicrophone(mute);

        promise.resolve(null);
    }

    @ReactMethod
    public void isMicrophoneMuted(Promise promise) {
        promise.resolve(ZegoExpressEngine.getEngine().isMicrophoneMuted());
    }

    @ReactMethod
    public void muteSpeaker(boolean mute, Promise promise) {
        ZegoExpressEngine.getEngine().muteSpeaker(mute);

        promise.resolve(null);
    }

    @ReactMethod
    public void isSpeakerMuted(Promise promise) {
        promise.resolve(ZegoExpressEngine.getEngine().isSpeakerMuted());
    }

    @ReactMethod
    public void enableAudioCaptureDevice(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableAudioCaptureDevice(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void getAudioRouteType(Promise promise) {
        promise.resolve(ZegoExpressEngine.getEngine().getAudioRouteType().value());
    }

    @ReactMethod
    public void setAudioRouteToSpeaker(boolean defaultToSpeaker, Promise promise) {
        ZegoExpressEngine.getEngine().setAudioRouteToSpeaker(defaultToSpeaker);

        promise.resolve(null);
    }

    @ReactMethod
    public void enableCamera(boolean enable, int channel, Promise promise) {
        ZegoExpressEngine.getEngine().enableCamera(enable, ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void useFrontCamera(boolean enable, int channel, Promise promise) {
        ZegoExpressEngine.getEngine().useFrontCamera(enable, ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void startSoundLevelMonitor(ReadableMap config, Promise promise) {
        if (config != null) {
            ZegoSoundLevelConfig soundLevelConfig = new ZegoSoundLevelConfig();
            if (config.hasKey("millisecond")) {
                soundLevelConfig.millisecond = config.getInt("millisecond");
            }
            if (config.hasKey("enableVAD")) {
                soundLevelConfig.enableVAD = config.getBoolean("enableVAD");
            }
            ZegoExpressEngine.getEngine().startSoundLevelMonitor(soundLevelConfig);
        } else {
            ZegoExpressEngine.getEngine().startSoundLevelMonitor();
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void stopSoundLevelMonitor(Promise promise) {
        ZegoExpressEngine.getEngine().stopSoundLevelMonitor();

        promise.resolve(null);
    }

    @ReactMethod
    public void enableHeadphoneMonitor(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableHeadphoneMonitor(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void enableAEC(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableAEC(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void enableHeadphoneAEC(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableHeadphoneAEC(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void setAECMode(int mode, Promise promise) {
        ZegoExpressEngine.getEngine().setAECMode(ZegoAECMode.getZegoAECMode(mode));

        promise.resolve(null);
    }

    @ReactMethod
    public void enableAGC(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableAGC(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void enableANS(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableANS(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void setANSMode(int mode, Promise promise) {
        ZegoExpressEngine.getEngine().setANSMode(ZegoANSMode.getZegoANSMode(mode));

        promise.resolve(null);
    }

    @ReactMethod
    public void enableBeautify(int feature, int channel, Promise promise) {
        ZegoExpressEngine.getEngine().enableBeautify(feature, ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void setBeautifyOption(ReadableMap option, int channel, Promise promise) {
        ZegoBeautifyOption optionObj = new ZegoBeautifyOption();
        optionObj.polishStep = option.getDouble("polishStep");
        optionObj.whitenFactor = option.getDouble("whitenFactor");
        optionObj.sharpenFactor = option.getDouble("sharpenFactor");

        ZegoExpressEngine.getEngine().setBeautifyOption(optionObj, ZegoPublishChannel.getZegoPublishChannel(channel));

        promise.resolve(null);
    }

    @ReactMethod
    public void sendBroadcastMessage(String roomID, String message, final Promise promise) {
        ZegoExpressEngine.getEngine().sendBroadcastMessage(roomID, message, new IZegoIMSendBroadcastMessageCallback() {
            @Override
            public void onIMSendBroadcastMessageResult(int errorCode, long messageID) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", errorCode);
                returnMap.putDouble("messageID", messageID);
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void sendBarrageMessage(String roomID, String message, final Promise promise) {
        ZegoExpressEngine.getEngine().sendBarrageMessage(roomID, message, new IZegoIMSendBarrageMessageCallback() {
            @Override
            public void onIMSendBarrageMessageResult(int errorCode, String messageID) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", errorCode);
                returnMap.putString("messageID", messageID);
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void sendCustomCommand(String roomID, String command, ReadableArray toUserListArray, final Promise promise) {

        ArrayList<ZegoUser> toUserList = null;
        if(toUserListArray != null && toUserListArray.size() > 0) {
            toUserList = new ArrayList<>();
            for (Object userMapObj: toUserListArray.toArrayList()) {
                HashMap<String, Object> userMap = (HashMap<String, Object>)userMapObj;
                String userID = (String) userMap.get("userID");
                String userName = (String) userMap.get("userName");
                ZegoUser user = new ZegoUser(userID, userName);
                toUserList.add(user);
            }
        }

        ZegoExpressEngine.getEngine().sendCustomCommand(roomID, command, toUserList, new IZegoIMSendCustomCommandCallback() {
            @Override
            public void onIMSendCustomCommandResult(int errorCode) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", errorCode);
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void startMixerTask(ReadableMap taskMap, final Promise promise) {
        String taskID = taskMap.getString("taskID");
        ZegoMixerTask taskObject = new ZegoMixerTask(taskID);

        // MixerInput
        ReadableArray inputListMap = taskMap.getArray("inputList");
        if (inputListMap != null) {
            ArrayList<ZegoMixerInput> inputListObject= new ArrayList<>();
            for (Object inputMapObj: inputListMap.toArrayList()) {
                HashMap<String, Object> inputMap = (HashMap<String, Object>)inputMapObj;
                String streamID = (String) inputMap.get("streamID");
                int contentType = ZegoUtils.intValue((Number) inputMap.get("contentType"));;
                HashMap rectMap = (HashMap) inputMap.get("layout");
                int left = ZegoUtils.intValue((Number) rectMap.get("x"));
                int top = ZegoUtils.intValue((Number) rectMap.get("y"));
                int right = left + ZegoUtils.intValue((Number) rectMap.get("width"));
                int bottom = top + ZegoUtils.intValue((Number) rectMap.get("height"));
                Rect rect = new Rect(left, top, right, bottom);
                int soundLevelID = ZegoUtils.intValue((Number) inputMap.get("soundLevelID"));
                ZegoMixerInput inputObject = new ZegoMixerInput(streamID, ZegoMixerInputContentType.getZegoMixerInputContentType(contentType), rect, soundLevelID);
                inputListObject.add(inputObject);
            }
            taskObject.setInputList(inputListObject);
        }

        // MixerOutput
        ReadableArray outputListMap = taskMap.getArray("outputList");
        if (outputListMap != null) {
            ArrayList<ZegoMixerOutput> outputListObject = new ArrayList<>();
            for (Object outputMapObj: outputListMap.toArrayList()) {
                HashMap<String, Object> outputMap = (HashMap<String, Object>)outputMapObj;
                String target = (String) outputMap.get("target");
                ZegoMixerOutput outputObject = new ZegoMixerOutput(target);
                outputListObject.add(outputObject);
            }
            taskObject.setOutputList(outputListObject);
        }

        // AudioConfig
        ReadableMap audioConfigMap = taskMap.getMap("audioConfig");
        if (audioConfigMap != null) {
            int bitrate = audioConfigMap.getInt("bitrate");
            int channel = audioConfigMap.getInt("channel");
            int codecID = audioConfigMap.getInt("codecID");
            ZegoMixerAudioConfig audioConfigObject = new ZegoMixerAudioConfig();
            audioConfigObject.bitrate = bitrate;
            audioConfigObject.channel = ZegoAudioChannel.getZegoAudioChannel(channel);
            audioConfigObject.codecID = ZegoAudioCodecID.getZegoAudioCodecID(codecID);

            taskObject.setAudioConfig(audioConfigObject);
        }

        // VideoConfig
        ReadableMap videoConfigMap = taskMap.getMap("videoConfig");
        if (videoConfigMap != null) {
            int width = videoConfigMap.getInt("width");
            int height = videoConfigMap.getInt("height");
            int fps = videoConfigMap.getInt("fps");
            int bitrate = videoConfigMap.getInt("bitrate");
            ZegoMixerVideoConfig videoConfigObject = new ZegoMixerVideoConfig(width, height, fps, bitrate);

            taskObject.setVideoConfig(videoConfigObject);
        }

        // Watermark
        /*HashMap<String, Object> watermarkMap = call.argument("watermark");
        if (watermarkMap != null && !watermarkMap.isEmpty()) {
            String imageURL = (String) watermarkMap.get("imageURL");
            if (imageURL != null && imageURL.length() > 0) {
                int left = ZegoUtils.intValue((Number) watermarkMap.get("left"));
                int top = ZegoUtils.intValue((Number) watermarkMap.get("top"));
                int right = ZegoUtils.intValue((Number) watermarkMap.get("right"));
                int bottom = ZegoUtils.intValue((Number) watermarkMap.get("bottom"));
                Rect rect = new Rect(left, top, right, bottom);
                ZegoWatermark watermarkObject = new ZegoWatermark(imageURL, rect);

                taskObject.setWatermark(watermarkObject);
            }
        }*/

        // Background Image
        /*String backgroundImageURL = call.argument("backgroundImageURL");
        if (backgroundImageURL != null && backgroundImageURL.length() > 0) {
            taskObject.setBackgroundImageURL(backgroundImageURL);
        }*/

        // Enable SoundLevel
        boolean enableSoundLevel = taskMap.getBoolean("enableSoundLevel");
        taskObject.enableSoundLevel(enableSoundLevel);

        // Set AdvancedConfig
        /*HashMap<String, String> advancedConfig = call.argument("advancedConfig");
        taskObject.setAdvancedConfig(advancedConfig);*/

        ZegoExpressEngine.getEngine().startMixerTask(taskObject, new IZegoMixerStartCallback() {
            @Override
            public void onMixerStartResult(int errorCode, JSONObject extendedData) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", errorCode);
                returnMap.putString("extendedData", extendedData.toString());
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void stopMixerTask(ReadableMap taskMap, final Promise promise) {
        String taskID = taskMap.getString("taskID");
        ZegoMixerTask taskObject = new ZegoMixerTask(taskID);

        // MixerInput
        ReadableArray inputListMap = taskMap.getArray("inputList");
        if (inputListMap != null) {
            ArrayList<ZegoMixerInput> inputListObject= new ArrayList<>();
            for (Object inputMapObj: inputListMap.toArrayList()) {
                HashMap<String, Object> inputMap = (HashMap<String, Object>)inputMapObj;
                String streamID = (String) inputMap.get("streamID");
                int contentType = ZegoUtils.intValue((Number) inputMap.get("contentType"));;
                int left = ZegoUtils.intValue((Number) inputMap.get("x"));
                int top = ZegoUtils.intValue((Number) inputMap.get("y"));
                int right = left + ZegoUtils.intValue((Number) inputMap.get("width"));
                int bottom = top + ZegoUtils.intValue((Number) inputMap.get("height"));
                Rect rect = new Rect(left, top, right, bottom);
                int soundLevelID = ZegoUtils.intValue((Number) inputMap.get("soundLevelID"));
                ZegoMixerInput inputObject = new ZegoMixerInput(streamID, ZegoMixerInputContentType.getZegoMixerInputContentType(contentType), rect, soundLevelID);
                inputListObject.add(inputObject);
            }
            taskObject.setInputList(inputListObject);
        }

        // MixerOutput
        ReadableArray outputListMap = taskMap.getArray("inputList");
        if (outputListMap != null) {
            ArrayList<ZegoMixerOutput> outputListObject = new ArrayList<>();
            for (Object outputMapObj : outputListMap.toArrayList()) {
                HashMap<String, Object> outputMap = (HashMap<String, Object>)outputMapObj;
                String target = (String) outputMap.get("target");
                ZegoMixerOutput outputObject = new ZegoMixerOutput(target);
                outputListObject.add(outputObject);
            }
            taskObject.setOutputList(outputListObject);
        }

        // no need to set audio config

        // no need to set video config

        // no need to set watermark

        // no need to set background image

        // no need to set enable sound level

        ZegoExpressEngine.getEngine().stopMixerTask(taskObject, new IZegoMixerStopCallback() {
            @Override
            public void onMixerStopResult(int errorCode) {
                WritableMap returnMap = Arguments.createMap();
                returnMap.putInt("errorCode", errorCode);
                promise.resolve(returnMap);
            }
        });
    }

    @ReactMethod
    public void startEffectsEnv(Promise promise) {
        ZegoExpressEngine.getEngine().startEffectsEnv();

        promise.resolve(null);
    }

    @ReactMethod
    public void stopEffectsEnv(Promise promise) {
        ZegoExpressEngine.getEngine().stopEffectsEnv();

        promise.resolve(null);
    }


    @ReactMethod
    public void enableEffectsBeauty(boolean enable, Promise promise) {
        ZegoExpressEngine.getEngine().enableEffectsBeauty(enable);

        promise.resolve(null);
    }

    @ReactMethod
    public void setEffectsBeautyParam(ReadableMap configMap, Promise promise) {
        ZegoEffectsBeautyParam param = new ZegoEffectsBeautyParam();
        if (configMap != null) {
            param.sharpenIntensity = configMap.getInt("sharpenIntensity");
            param.rosyIntensity = configMap.getInt("rosyIntensity");
            param.smoothIntensity = configMap.getInt("smoothIntensity");
            param.whitenIntensity = configMap.getInt("whitenIntensity");
        }
        ZegoExpressEngine.getEngine().setEffectsBeautyParam(param);

        promise.resolve(null);
    }

    @ReactMethod
    public void setVoiceChangerPreset(int preset, Promise promise) {
        ZegoVoiceChangerPreset changerPreset = ZegoVoiceChangerPreset.getZegoVoiceChangerPreset(preset);
        ZegoExpressEngine.getEngine().setVoiceChangerPreset(changerPreset);

        promise.resolve(null);
    }

    @ReactMethod
    public void setVoiceChangerParam(ReadableMap configMap, Promise promise) {
        ZegoVoiceChangerParam param = new ZegoVoiceChangerParam();
        if (configMap != null) {
            param.pitch = configMap.getInt("pitch");
        }

        ZegoExpressEngine.getEngine().setVoiceChangerParam(param);
        promise.resolve(null);
    }

    @ReactMethod
    public void setAudioEqualizerGain(int bandIndex, float bandGain, Promise promise) {
        ZegoExpressEngine.getEngine().setAudioEqualizerGain(bandIndex, bandGain);

        promise.resolve(null);
    }

    @ReactMethod
    public void setReverbPreset(int preset, Promise promise) {
        ZegoReverbPreset reverbPreset = ZegoReverbPreset.getZegoReverbPreset(preset);
        ZegoExpressEngine.getEngine().setReverbPreset(reverbPreset);

        promise.resolve(null);
    }

    @ReactMethod
    public void setReverbAdvancedParam(ReadableMap configMap, Promise promise) {
        ZegoReverbAdvancedParam param = new ZegoReverbAdvancedParam();
        if (configMap != null) {
            param.roomSize = (float) configMap.getDouble("roomSize");
            param.reverberance = (float) configMap.getDouble("reverberance");
            param.damping = (float) configMap.getDouble("damping");
            param.wetOnly = configMap.getBoolean("wetOnly");
            param.wetGain = (float) configMap.getDouble("wetGain");
            param.dryGain = (float) configMap.getDouble("dryGain");
            param.toneLow = (float) configMap.getDouble("toneLow");
            param.toneHigh = (float) configMap.getDouble("toneHigh");
            param.preDelay = (float) configMap.getDouble("preDelay");
            param.stereoWidth = (float) configMap.getDouble("stereoWidth");
        }

        ZegoExpressEngine.getEngine().setReverbAdvancedParam(param);
        promise.resolve(null);
    }

    @ReactMethod
    public void setReverbEchoParam(ReadableMap configMap, Promise promise) {
        ZegoReverbEchoParam param = new ZegoReverbEchoParam();
        if (configMap != null) {
            param.numDelays = configMap.getInt("numDelays");
            param.inGain = (float) configMap.getDouble("inGain");
            param.outGain = (float) configMap.getDouble("outGain");
            ReadableArray delayArray = configMap.getArray("delay");
            if (delayArray.size() <= 7) {
                int[] delay = new int[7];
                for (int i = 0; i < delayArray.size(); i++) {
                    delay[i] = delayArray.getInt(i);
                }
                param.delay = delay;
            }

            ReadableArray decayArray = configMap.getArray("decay");
            if (decayArray.size() <= 7) {
                float[] decay = new float[7];
                for (int i = 0; i < decayArray.size(); i++) {
                    decay[i] = (float) decayArray.getDouble(i);
                }
                param.decay = decay;
            }
        }

        ZegoExpressEngine.getEngine().setReverbEchoParam(param);
        promise.resolve(null);
    }

    @ReactMethod
    public void setElectronicEffects(boolean enable, int mode, int tonal, Promise promise) {
        ZegoElectronicEffectsMode effectsMode = ZegoElectronicEffectsMode.getZegoElectronicEffectsMode(mode);

        ZegoExpressEngine.getEngine().setElectronicEffects(enable, effectsMode, tonal);
        promise.resolve(null);
    }

    @ReactMethod
    public void enableCustomAudioIO(boolean enable, ReadableMap configMap, int channel, Promise promise) {

        ZegoCustomAudioConfig audioConfig = new ZegoCustomAudioConfig();
        if (configMap != null && configMap.hasKey("sourceType")) {
            int sourceType = configMap.getInt("sourceType");
            audioConfig.sourceType = ZegoAudioSourceType.getZegoAudioSourceType(sourceType);
        }

        ZegoPublishChannel publishChannel = ZegoPublishChannel.getZegoPublishChannel(channel);
        ZegoExpressEngine.getEngine().enableCustomAudioIO(enable, audioConfig, publishChannel);

        promise.resolve(null);
    }

    @ReactMethod
    public void enableCustomVideoProcessing(boolean enable, ReadableMap configMap, int channel, Promise promise) {
        ZegoCustomVideoProcessConfig videoProcessConfig = new ZegoCustomVideoProcessConfig();
        videoProcessConfig.bufferType = ZegoVideoBufferType.GL_TEXTURE_2D;
        
        if (configMap != null && configMap.hasKey("bufferType")) {
            int bufferType = configMap.getInt("bufferType");
            videoProcessConfig.bufferType = ZegoVideoBufferType.getZegoVideoBufferType(bufferType);
        }
        if (enable) {
            ZegoExpressEngine.getEngine().setCustomVideoProcessHandler(ZegoCustomVideoProcessManager.getInstance().rtcVideoProcessHandler);
        } else {
            ZegoExpressEngine.getEngine().setCustomVideoProcessHandler(null);
        }

        ZegoPublishChannel publishChannel = ZegoPublishChannel.getZegoPublishChannel(channel);
        ZegoExpressEngine.getEngine().enableCustomVideoProcessing(enable, videoProcessConfig, publishChannel);

        promise.resolve(null);
    }

    @ReactMethod
    public void startScreenCapture(ReadableMap config, Promise promise) {
        ZegoExpressEngine.getEngine().startScreenCapture();

        promise.resolve(null);
    }

    @ReactMethod
    public void stopScreenCapture(Promise promise) {
        ZegoExpressEngine.getEngine().stopScreenCapture();

        promise.resolve(null);
    }

    @ReactMethod
    public void updateScreenCaptureConfig(ReadableMap config, Promise promise) {
        promise.resolve(null);
    }

    @ReactMethod
    public void startNetworkSpeedTest(ReadableMap configMap, int interval, Promise promise) {

        ZegoNetworkSpeedTestConfig testConfig = new ZegoNetworkSpeedTestConfig();
        if (configMap != null) {
            testConfig.testUplink = configMap.getBoolean("testUplink");
            testConfig.testDownlink = configMap.getBoolean("testDownlink");
            testConfig.expectedUplinkBitrate = configMap.getInt("expectedUplinkBitrate");
            testConfig.expectedDownlinkBitrate = configMap.getInt("expectedDownlinkBitrate");
        }

        ZegoExpressEngine.getEngine().startNetworkSpeedTest(testConfig, interval);
        promise.resolve(null);
    }

    @ReactMethod
    public void stopNetworkSpeedTest(Promise promise) {
        ZegoExpressEngine.getEngine().stopNetworkSpeedTest();
        promise.resolve(null);
    }

    @ReactMethod
    public void getNetworkTimeInfo(Promise promise) {
        ZegoNetworkTimeInfo info = ZegoExpressEngine.getEngine().getNetworkTimeInfo();
        WritableMap infoMap = Arguments.createMap();
        infoMap.putInt("maxDeviation", info.maxDeviation);
        infoMap.putDouble("timestamp", info.timestamp);
        promise.resolve(infoMap);
    }

    @ReactMethod
    public void createMediaPlayer(Promise promise) {
        if(this.mediaPlayerMap == null) {
            this.mediaPlayerMap = new HashMap<>();
        }

        ZegoMediaPlayer mediaPlayer = ZegoExpressEngine.getEngine().createMediaPlayer();

        if(mediaPlayer != null) {
            int index = mediaPlayer.getIndex();

            mediaPlayer.setEventHandler(new IZegoMediaPlayerEventHandler() {
                @Override
                public void onMediaPlayerStateUpdate(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerState state, int errorCode) {
                    super.onMediaPlayerStateUpdate(mediaPlayer, state, errorCode);

                    WritableMap args = getMediaPlayerCallbackArgs(mediaPlayer.getIndex(), state.value(), errorCode);
                    sendEvent("mediaPlayerStateUpdate", args);
                }

                @Override
                public void onMediaPlayerNetworkEvent(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerNetworkEvent networkEvent) {
                    super.onMediaPlayerNetworkEvent(mediaPlayer, networkEvent);

                    WritableMap args = getMediaPlayerCallbackArgs(mediaPlayer.getIndex(), networkEvent.value());
                    sendEvent("mediaPlayerNetworkEvent", args);
                }

                @Override
                public void onMediaPlayerPlayingProgress(ZegoMediaPlayer mediaPlayer, long millisecond) {
                    super.onMediaPlayerPlayingProgress(mediaPlayer, millisecond);

                    WritableMap args = getMediaPlayerCallbackArgs(mediaPlayer.getIndex(), millisecond);
                    sendEvent("mediaPlayerPlayingProgress", args);
                }
            });
            this.mediaPlayerMap.put(index, mediaPlayer);

            promise.resolve(index);
        } else {
            promise.resolve(-1);
        }
    }

    @ReactMethod
    public void destroyMediaPlayer(int index, Promise promise) {
        if(this.mediaPlayerMap != null) {
            ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);

            if(mediaPlayer != null) {
                ZegoExpressEngine.getEngine().destroyMediaPlayer(mediaPlayer);
            }
            this.mediaPlayerMap.remove(index);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerSetPlayerCanvas(final int index, final ReadableMap view, final Promise promise) {
        final int viewTag = view.getInt("reactTag");
        UIManagerModule uiMgr = this.reactContext.getNativeModule(UIManagerModule.class);
        uiMgr.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                View nativeView = nativeViewHierarchyManager.resolveView(viewTag);
                ZegoCanvas canvas = null;
                if(nativeView instanceof ZegoSurfaceView) {
                    ZegoSurfaceView sv = (ZegoSurfaceView)nativeView;
                    canvas = new ZegoCanvas(sv.getView());
                } else if(nativeView instanceof TextureView) {
                    canvas = new ZegoCanvas(nativeView);
                }

                if (canvas != null) {
                    canvas.viewMode = ZegoViewMode.getZegoViewMode(view.getInt("viewMode"));
                    canvas.backgroundColor = view.getInt("backgroundColor");
                }

                ZegoMediaPlayer mediaPlayer = mediaPlayerMap.get(index);
                if(mediaPlayer != null) {
                    mediaPlayer.setPlayerCanvas(canvas);
                }

                promise.resolve(null);
            }
        });
    }

    @ReactMethod
    public void mediaPlayerLoadResource(int index, String path, final Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.loadResource(path, new IZegoMediaPlayerLoadResourceCallback() {
                @Override
                public void onLoadResourceCallback(int errorCode) {
                    WritableMap map = Arguments.createMap();
                    map.putInt("errorCode", errorCode);
                    promise.resolve(map);
                }
            });
        }
    }

    @ReactMethod
    public void mediaPlayerStart(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.start();
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerStop(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.stop();
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerPause(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.pause();
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerResume(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.resume();
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerSeekTo(int index, double millisecond, final Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.seekTo((long) millisecond, new IZegoMediaPlayerSeekToCallback() {
                @Override
                public void onSeekToTimeCallback(int errorCode) {
                    WritableMap map = Arguments.createMap();
                    map.putInt("errorCode", errorCode);
                    promise.resolve(map);
                }
            });
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerEnableRepeat(int index, boolean enable, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.enableRepeat(enable);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerSetPlaySpeed(int index, float speed, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.setPlaySpeed(speed);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerEnableAux(int index, boolean enable, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.enableAux(enable);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerMuteLocal(int index, boolean mute, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.muteLocal(mute);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerSetVolume(int index, int volume, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.setVolume(volume);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerSetPlayVolume(int index, int volume, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.setPlayVolume(volume);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerSetPublishVolume(int index, int volume, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.setPublishVolume(volume);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerSetProgressInterval(int index, double millisecond, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.setProgressInterval((long) millisecond);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerGetPlayVolume(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            promise.resolve(mediaPlayer.getPlayVolume());
        } else {
            promise.resolve(0);
        }
    }

    @ReactMethod
    public void mediaPlayerGetPublishVolume(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            promise.resolve(mediaPlayer.getPublishVolume());
        } else {
            promise.resolve(0);
        }
    }

    @ReactMethod
    public void mediaPlayerGetTotalDuration(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            double duration = mediaPlayer.getTotalDuration();
            promise.resolve(duration);
        } else {
            promise.resolve(0);
        }
    }

    @ReactMethod
    public void mediaPlayerGetCurrentProgress(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            double progress = mediaPlayer.getCurrentProgress();
            promise.resolve(progress);
        } else {
            promise.resolve(0);
        }
    }

    @ReactMethod
    public void mediaPlayerGetAudioTrackCount(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            promise.resolve(mediaPlayer.getAudioTrackCount());
        } else {
            promise.resolve(0);
        }
    }

    @ReactMethod
    public void mediaPlayerSetAudioTrackIndex(int index, int audioTrackIndex, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            mediaPlayer.setAudioTrackIndex(audioTrackIndex);
        }
        
        promise.resolve(null);
    }

    @ReactMethod
    public void mediaPlayerGetCurrentState(int index, Promise promise) {
        ZegoMediaPlayer mediaPlayer = this.mediaPlayerMap.get(index);
        if(mediaPlayer != null) {
            promise.resolve(mediaPlayer.getCurrentState().value());
        } else {
            promise.resolve(0);
        }
    }


    @ReactMethod
    public void createAudioEffectPlayer(Promise promise) {
        if (this.audioEffectPlayerMap == null) {
            this.audioEffectPlayerMap = new HashMap<>();
        }

        ZegoAudioEffectPlayer audioEffectPlayer = ZegoExpressEngine.getEngine().createAudioEffectPlayer();

        if (audioEffectPlayer != null) {
            final int index = audioEffectPlayer.getIndex();

            audioEffectPlayer.setEventHandler(new IZegoAudioEffectPlayerEventHandler() {
                @Override
                public void onAudioEffectPlayStateUpdate(ZegoAudioEffectPlayer audioEffectPlayer, int audioEffectID, ZegoAudioEffectPlayState state, int errorCode) {
                    super.onAudioEffectPlayStateUpdate(audioEffectPlayer, audioEffectID, state, errorCode);

                    WritableMap args = getMediaPlayerCallbackArgs(audioEffectPlayer.getIndex(), audioEffectID, state.value(), errorCode);
                    sendEvent("audioEffectPlayerStateUpdate", args);
                }
            });
            this.audioEffectPlayerMap.put(index, audioEffectPlayer);

            promise.resolve(index);
        } else {
            promise.resolve(-1);
        }
    }

    @ReactMethod
    public void destroyAudioEffectPlayer(int index, Promise promise) {
        if (this.audioEffectPlayerMap != null) {
            ZegoAudioEffectPlayer audioEffectPlayer  = this.audioEffectPlayerMap.get(index);

            if (audioEffectPlayer != null) {
                ZegoExpressEngine.getEngine().destroyAudioEffectPlayer(audioEffectPlayer);
            }
            this.audioEffectPlayerMap.remove(index);
        }

        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerLoadResource(int index, int audioEffectID, String path, final Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.loadResource(audioEffectID, path, new IZegoAudioEffectPlayerLoadResourceCallback() {
                @Override
                public void onLoadResourceCallback(int errorCode) {
                    WritableMap map = Arguments.createMap();
                    map.putInt("errorCode", errorCode);
                    promise.resolve(map);
                }
            });
        } else {
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void audioEffectPlayerUnloadResource(int index, int audioEffectID, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.unloadResource(audioEffectID);
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerStart(int index, int audioEffectID, String path, ReadableMap config, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);
        if (audioEffectPlayer != null) {
            ZegoAudioEffectPlayConfig audioEffectPlayConfig = null;
            if (config != null) {
                audioEffectPlayConfig = new ZegoAudioEffectPlayConfig();
                audioEffectPlayConfig.playCount = config.getInt("playCount");
                audioEffectPlayConfig.isPublishOut = config.getBoolean("isPublishOut");
            }
            audioEffectPlayer.start(audioEffectID, path, audioEffectPlayConfig);
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerStop(int index, int audioEffectID, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.stop(audioEffectID);
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerPause(int index, int audioEffectID, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.pause(audioEffectID);
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerResume(int index, int audioEffect, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.resume(audioEffect);
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerStopAll(int index, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.stopAll();
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerPauseAll(int index, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.pauseAll();
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerResumeAll(int index, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.resumeAll();
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerSeekTo(int index, int audioEffectID, double millisecond, final Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.seekTo(audioEffectID, (long)millisecond, new IZegoAudioEffectPlayerSeekToCallback() {
                @Override
                public void onSeekToCallback(int errorCode) {
                    WritableMap map = Arguments.createMap();
                    map.putInt("errorCode", errorCode);
                    promise.resolve(map);
                }
            });
        } else {
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void audioEffectPlayerSetVolume(int index, int audioEffectID, int volume, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.setVolume(audioEffectID, volume);
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerSetVolumeAll(int index, int volume, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            audioEffectPlayer.setVolumeAll(volume);
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void audioEffectPlayerGetTotalDuration(int index, int audioEffectID, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            double duration = audioEffectPlayer.getTotalDuration(audioEffectID);
            promise.resolve(duration);
        } else {
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void audioEffectPlayerGetCurrentProgress(int index, int audioEffectID, Promise promise) {
        ZegoAudioEffectPlayer audioEffectPlayer = this.audioEffectPlayerMap.get(index);

        if (audioEffectPlayer != null) {
            double progress = audioEffectPlayer.getCurrentProgress(audioEffectID);
            promise.resolve(progress);
        } else {
            promise.resolve(null);
        }
    }

    private IZegoEventHandler zegoEventHandler = new IZegoEventHandler() {

        @Override
        public void onDebugError(int errorCode, String funcName, String info) {
            super.onDebugError(errorCode, funcName, info);

            WritableMap args = getCallbackArgs(errorCode, funcName, info);
            sendEvent("debugError", args);
        }

        @Override
        public void onRoomStateChanged(String s, ZegoRoomStateChangedReason zegoRoomStateChangedReason, int i, JSONObject jsonObject) {
            super.onRoomStateChanged(s, zegoRoomStateChangedReason, i, jsonObject);

            WritableMap args = getCallbackArgs(s, zegoRoomStateChangedReason.value(), i, jsonObject.toString());
            sendEvent("roomStateChanged", args);
        }

        @Override
        public void onRoomStateUpdate(String roomID, ZegoRoomState state, int errorCode, JSONObject extendedData) {
            super.onRoomStateUpdate(roomID, state, errorCode, extendedData);

            WritableMap args = getCallbackArgs(roomID, state.value(), errorCode, extendedData.toString());
            sendEvent("roomStateUpdate", args);
        }

        @Override
        public void onRoomUserUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoUser> userList) {
            super.onRoomUserUpdate(roomID, updateType, userList);

            WritableArray userListArray = Arguments.createArray();
            for (ZegoUser user : userList) {
                WritableMap userMap = Arguments.createMap();
                userMap.putString("userID", user.userID);
                userMap.putString("userName", user.userName);
                userListArray.pushMap(userMap);
            }
            WritableMap args = getCallbackArgs(roomID, updateType.value(), userListArray);
            sendEvent("roomUserUpdate", args);
        }

        @Override
        public void onRoomOnlineUserCountUpdate(String roomID, int count) {
            super.onRoomOnlineUserCountUpdate(roomID, count);

            WritableMap args = getCallbackArgs(roomID, count);
            sendEvent("roomOnlineUserCountUpdate", args);
        }

        @Override
		public void onRoomTokenWillExpire(String roomID, int remainTimeInSecond) {
			super.onRoomTokenWillExpire(roomID, remainTimeInSecond);

            WritableMap args = getCallbackArgs(roomID, remainTimeInSecond);
            sendEvent("roomTokenWillExpire", args);
		}

        @Override
        public void onRoomExtraInfoUpdate(String s, ArrayList<ZegoRoomExtraInfo> arrayList) {
            super.onRoomExtraInfoUpdate(s, arrayList);

            WritableArray infoListArray = Arguments.createArray();
            for (ZegoRoomExtraInfo info : arrayList) {
                WritableMap infoMap = Arguments.createMap();
                infoMap.putString("key", info.key);
                infoMap.putString("value", info.value);
                infoMap.putDouble("updateTime", info.updateTime);

                WritableMap userMap = Arguments.createMap();
                userMap.putString("userID", info.updateUser.userID);
                userMap.putString("userName", info.updateUser.userName);
                infoMap.putMap("updateUser", userMap);

                infoListArray.pushMap(infoMap);
            }
            WritableMap args = getCallbackArgs(s, infoListArray);
            sendEvent("roomExtraInfoUpdate", args);
        }

        @Override
        public void onRoomStreamExtraInfoUpdate(String s, ArrayList<ZegoStream> streamList) {
            super.onRoomStreamExtraInfoUpdate(s, streamList);

            WritableArray streamListArray = Arguments.createArray();
            for(ZegoStream stream : streamList) {
                WritableMap streamMap = Arguments.createMap();
                streamMap.putString("streamID", stream.streamID);
                streamMap.putString("extraInfo", stream.extraInfo);

                WritableMap userMap = Arguments.createMap();
                userMap.putString("userID", stream.user.userID);
                userMap.putString("userName", stream.user.userName);

                streamMap.putMap("user", userMap);

                streamListArray.pushMap(streamMap);
            }
            WritableMap args = getCallbackArgs(s, streamListArray);
            sendEvent("roomStreamExtraInfoUpdate", args);
        }

        @Override
        public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList, JSONObject extendedData) {
            super.onRoomStreamUpdate(roomID, updateType, streamList, extendedData);

            WritableArray streamListArray = Arguments.createArray();
            for(ZegoStream stream : streamList) {
                WritableMap streamMap = Arguments.createMap();
                streamMap.putString("streamID", stream.streamID);
                streamMap.putString("extraInfo", stream.extraInfo);

                WritableMap userMap = Arguments.createMap();
                userMap.putString("userID", stream.user.userID);
                userMap.putString("userName", stream.user.userName);

                streamMap.putMap("user", userMap);

                streamListArray.pushMap(streamMap);
            }
            WritableMap args = getCallbackArgs(roomID, updateType.value(), streamListArray);
            sendEvent("roomStreamUpdate", args);
        }

        @Override
        public void onPublisherStateUpdate(String streamID, ZegoPublisherState state, int errorCode, JSONObject extendedData) {
            super.onPublisherStateUpdate(streamID, state, errorCode, extendedData);

            WritableMap args = getCallbackArgs(streamID, state.value(), errorCode, extendedData.toString());
            sendEvent("publisherStateUpdate", args);
        }

        @Override
        public void onPublisherQualityUpdate(String streamID, ZegoPublishStreamQuality quality) {
            super.onPublisherQualityUpdate(streamID, quality);

            WritableMap qualityMap = Arguments.createMap();
            qualityMap.putDouble("videoCaptureFPS", quality.videoCaptureFPS);
            qualityMap.putDouble("videoEncodeFPS", quality.videoEncodeFPS);
            qualityMap.putDouble("videoSendFPS", quality.videoSendFPS);
            qualityMap.putDouble("videoKBPS", quality.videoKBPS);
            qualityMap.putDouble("audioCaptureFPS", quality.audioCaptureFPS);
            qualityMap.putDouble("audioSendFPS", quality.audioSendFPS);
            qualityMap.putDouble("audioKBPS", quality.audioKBPS);
            qualityMap.putInt("rtt", quality.rtt);
            qualityMap.putDouble("packetLostRate", quality.packetLostRate);
            qualityMap.putInt("level", quality.level.value());
            qualityMap.putBoolean("isHardwareEncode", quality.isHardwareEncode);
            qualityMap.putDouble("totalSendBytes", quality.totalSendBytes);
            qualityMap.putDouble("audioSendBytes", quality.audioSendBytes);
            qualityMap.putDouble("videoSendBytes", quality.videoSendBytes);

            WritableMap args = getCallbackArgs(streamID, qualityMap);
            sendEvent("publisherQualityUpdate", args);
        }

        @Override
        public void onPublisherCapturedAudioFirstFrame() {
            super.onPublisherCapturedAudioFirstFrame();

            WritableMap args = getCallbackArgs();
            sendEvent("publisherCapturedAudioFirstFrame", args);
        }

        @Override
        public void onPublisherCapturedVideoFirstFrame(ZegoPublishChannel channel) {
            super.onPublisherCapturedVideoFirstFrame(channel);

            WritableMap args = getCallbackArgs(channel.value());
            sendEvent("publisherCapturedVideoFirstFrame", args);
        }

        @Override
        public void onPublisherRenderVideoFirstFrame(ZegoPublishChannel zegoPublishChannel) {
            super.onPublisherRenderVideoFirstFrame(zegoPublishChannel);

            WritableMap args = getCallbackArgs(zegoPublishChannel.value());
            sendEvent("publisherRenderVideoFirstFrame", args);
        }

        @Override
        public void onPublisherVideoSizeChanged(int width, int height, ZegoPublishChannel channel) {
            super.onPublisherVideoSizeChanged(width, height, channel);

            WritableMap args = getCallbackArgs(width, height, channel.value());
            sendEvent("publisherVideoSizeChanged", args);
        }

        @Override
        public void onPublisherRelayCDNStateUpdate(String s, ArrayList<ZegoStreamRelayCDNInfo> arrayList) {
            super.onPublisherRelayCDNStateUpdate(s, arrayList);

            WritableArray infoListArray = Arguments.createArray();
            for (ZegoStreamRelayCDNInfo info : arrayList) {
                WritableMap infoMap = Arguments.createMap();
                infoMap.putString("url", info.url);
                infoMap.putInt("state", info.state.value());
                infoMap.putInt("updateReason", info.updateReason.value());
                infoMap.putDouble("stateTime", info.stateTime);

                infoListArray.pushMap(infoMap);
            }
            WritableMap args = getCallbackArgs(s, infoListArray);
            sendEvent("publisherRelayCDNStateUpdate", args);
        }

        @Override
        public void onPublisherVideoEncoderChanged(ZegoVideoCodecID zegoVideoCodecID, ZegoVideoCodecID zegoVideoCodecID1, ZegoPublishChannel zegoPublishChannel) {
            super.onPublisherVideoEncoderChanged(zegoVideoCodecID, zegoVideoCodecID1, zegoPublishChannel);

            WritableMap args = getCallbackArgs(zegoVideoCodecID.value(), zegoVideoCodecID1.value(), zegoPublishChannel.value());
            sendEvent("publisherVideoEncoderChanged", args);
        }

        @Override
        public void onPublisherStreamEvent(ZegoStreamEvent zegoStreamEvent, String s, String s1) {
            super.onPublisherStreamEvent(zegoStreamEvent, s, s1);

            WritableMap args = getCallbackArgs(zegoStreamEvent.value(), s, s1);
            sendEvent("publisherStreamEvent", args);
        }

        @Override
        public void onPlayerStateUpdate(String streamID, ZegoPlayerState state, int errorCode, JSONObject extendedData) {
            super.onPlayerStateUpdate(streamID, state, errorCode, extendedData);

            WritableMap args = getCallbackArgs(streamID, state.value(), errorCode, extendedData.toString());
            sendEvent("playerStateUpdate", args);
        }

        @Override
        public void onPlayerQualityUpdate(String streamID, ZegoPlayStreamQuality quality) {
            super.onPlayerQualityUpdate(streamID, quality);

            WritableMap qualityMap = Arguments.createMap();
            qualityMap.putDouble("videoRecvFPS", quality.videoRecvFPS);
            qualityMap.putDouble("videoDecodeFPS", quality.videoDecodeFPS);
            qualityMap.putDouble("videoRenderFPS", quality.videoRenderFPS);
            qualityMap.putDouble("videoKBPS", quality.videoKBPS);
            qualityMap.putDouble("audioRecvFPS", quality.audioRecvFPS);
            qualityMap.putDouble("audioDecodeFPS", quality.audioDecodeFPS);
            qualityMap.putDouble("audioRenderFPS", quality.audioRenderFPS);
            qualityMap.putDouble("audioKBPS", quality.audioKBPS);
            qualityMap.putInt("rtt", quality.rtt);
            qualityMap.putDouble("packetLostRate", quality.packetLostRate);
            qualityMap.putDouble("peerToPeerPacketLostRate", quality.peerToPeerPacketLostRate);
            qualityMap.putDouble("peerToPeerDelay", quality.peerToPeerDelay);
            qualityMap.putInt("level", quality.level.value());
            qualityMap.putInt("delay", quality.delay);
            qualityMap.putBoolean("isHardwareDecode", quality.isHardwareDecode);
            qualityMap.putDouble("totalRecvBytes", quality.totalRecvBytes);
            qualityMap.putDouble("audioRecvBytes", quality.audioRecvBytes);
            qualityMap.putDouble("videoRecvBytes", quality.videoRecvBytes);

            WritableMap args = getCallbackArgs(streamID, qualityMap);
            sendEvent("playerQualityUpdate", args);
        }

        @Override
        public void onPlayerMediaEvent(String streamID, ZegoPlayerMediaEvent event) {
            super.onPlayerMediaEvent(streamID, event);

            WritableMap args = getCallbackArgs(streamID, event);
            sendEvent("playerMediaEvent", args);
        }

        @Override
        public void onPlayerRecvAudioFirstFrame(String streamID) {
            super.onPlayerRecvAudioFirstFrame(streamID);

            WritableMap args = getCallbackArgs(streamID);
            sendEvent("playerRecvAudioFirstFrame", args);
        }

        @Override
        public void onPlayerRecvVideoFirstFrame(String streamID) {
            super.onPlayerRecvVideoFirstFrame(streamID);

            WritableMap args = getCallbackArgs(streamID);
            sendEvent("playerRecvVideoFirstFrame", args);
        }

        @Override
        public void onPlayerRenderVideoFirstFrame(String streamID) {
            super.onPlayerRenderVideoFirstFrame(streamID);

            WritableMap args = getCallbackArgs(streamID);
            sendEvent("playerRenderVideoFirstFrame", args);
        }

        @Override
        public void onPlayerVideoSizeChanged(String streamID, int width, int height) {
            super.onPlayerVideoSizeChanged(streamID, width, height);

            WritableMap args = getCallbackArgs(streamID, width, height);
            sendEvent("playerVideoSizeChanged", args);
        }

        @Override
        public void onCapturedSoundLevelUpdate(float soundLevel) {
            super.onCapturedSoundLevelUpdate(soundLevel);

            WritableMap args = getCallbackArgs(soundLevel);
            sendEvent("capturedSoundLevelUpdate", args);
        }

        @Override
        public void onRemoteSoundLevelUpdate(HashMap<String, Float> soundLevels) {
            super.onRemoteSoundLevelUpdate(soundLevels);

            WritableMap soundLevelsMap = Arguments.createMap();
            for(Map.Entry<String, Float> entry: soundLevels.entrySet()) {
                soundLevelsMap.putDouble(entry.getKey(), entry.getValue());
            }
            WritableMap args = getCallbackArgs(soundLevelsMap);
            sendEvent("remoteSoundLevelUpdate", args);
        }


        @Override
        public void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType, ZegoDeviceType deviceType, String deviceID) {
            super.onLocalDeviceExceptionOccurred(exceptionType, deviceType, deviceID);

            WritableMap args = getCallbackArgs(exceptionType.value(), deviceType.value(), deviceID);
            sendEvent("localDeviceExceptionOccurred", args);
        }

        @Override
        public void onRemoteCameraStateUpdate(String streamID, ZegoRemoteDeviceState state) {
            super.onRemoteCameraStateUpdate(streamID, state);

            WritableMap args = getCallbackArgs(streamID, state.value());
            sendEvent("remoteCameraStateUpdate", args);
        }

        @Override
        public void onRemoteMicStateUpdate(String streamID, ZegoRemoteDeviceState state) {
            super.onRemoteMicStateUpdate(streamID, state);

            WritableMap args = getCallbackArgs(streamID, state.value());
            sendEvent("remoteMicStateUpdate", args);
        }

        @Override
        public void onAudioRouteChange(ZegoAudioRoute zegoAudioRoute) {
            super.onAudioRouteChange(zegoAudioRoute);

            WritableMap args = getCallbackArgs(zegoAudioRoute.value());
            sendEvent("audioRouteChange", args);
        }

        @Override
        public void onIMRecvBroadcastMessage(String roomID, ArrayList<ZegoBroadcastMessageInfo> messageList){
            super.onIMRecvBroadcastMessage(roomID, messageList);

            WritableArray messageListArray = Arguments.createArray();
            for(ZegoBroadcastMessageInfo messageInfo : messageList) {
                WritableMap messageMap = Arguments.createMap();
                messageMap.putString("message", messageInfo.message);
                messageMap.putDouble("messageID", messageInfo.messageID);
                messageMap.putDouble("sendTime", messageInfo.sendTime);

                WritableMap userMap = Arguments.createMap();
                userMap.putString("userID", messageInfo.fromUser.userID);
                userMap.putString("userName", messageInfo.fromUser.userName);

                messageMap.putMap("fromUser", userMap);

                messageListArray.pushMap(messageMap);
            }
            WritableMap args = getCallbackArgs(roomID, messageListArray);
            sendEvent("IMRecvBroadcastMessage", args);
        }

        @Override
        public void onIMRecvBarrageMessage(String roomID, ArrayList<ZegoBarrageMessageInfo> messageList) {
            super.onIMRecvBarrageMessage(roomID, messageList);

            WritableArray messageListArray = Arguments.createArray();
            for(ZegoBarrageMessageInfo messageInfo : messageList) {
                WritableMap messageMap = Arguments.createMap();
                messageMap.putString("message", messageInfo.message);
                messageMap.putString("messageID", messageInfo.messageID);
                messageMap.putDouble("sendTime", messageInfo.sendTime);

                WritableMap userMap = Arguments.createMap();
                userMap.putString("userID", messageInfo.fromUser.userID);
                userMap.putString("userName", messageInfo.fromUser.userName);

                messageMap.putMap("fromUser", userMap);

                messageListArray.pushMap(messageMap);
            }
            WritableMap args = getCallbackArgs(roomID, messageListArray);
            sendEvent("IMRecvBarrageMessage", args);
        }

        @Override
        public void onIMRecvCustomCommand(String roomID, ZegoUser fromUser, String command) {
            super.onIMRecvCustomCommand(roomID, fromUser, command);

            WritableMap userMap = Arguments.createMap();
            userMap.putString("userID", fromUser.userID);
            userMap.putString("userName", fromUser.userName);

            WritableMap args = getCallbackArgs(roomID, userMap, command);
            sendEvent("IMRecvCustomCommand", args);
        }

        public void onMixerRelayCDNStateUpdate(String taskID, ArrayList<ZegoStreamRelayCDNInfo> infoList){
            super.onMixerRelayCDNStateUpdate(taskID, infoList);
            WritableArray infoListArray = Arguments.createArray();
            for(ZegoStreamRelayCDNInfo info : infoList) {
                WritableMap infoMap = Arguments.createMap();
                infoMap.putString("url", info.url);
                infoMap.putInt("state", info.state.value());
                infoMap.putInt("updateReason", info.updateReason.value());
                infoMap.putDouble("stateTime", info.stateTime);

                infoListArray.pushMap(infoMap);
            }
            WritableMap args = getCallbackArgs(taskID, infoListArray);
            sendEvent("mixerRelayCDNStateUpdate", args);

        }

        public void onMixerSoundLevelUpdate(HashMap<Integer, Float> soundLevels){
            super.onMixerSoundLevelUpdate(soundLevels);

            WritableMap soundLevelsMap = Arguments.createMap();
            for(Map.Entry<Integer, Float> entry: soundLevels.entrySet()) {
                // WritableMap 的 key 只能是 String 类型，到 JS 层会自动转换成 number
                soundLevelsMap.putDouble(entry.getKey().toString(), entry.getValue());
            }
            WritableMap args = getCallbackArgs(soundLevelsMap);
            sendEvent("mixerSoundLevelUpdate", args);
        }

        @Override
        public void onNetworkSpeedTestError(int i, ZegoNetworkSpeedTestType zegoNetworkSpeedTestType) {
            super.onNetworkSpeedTestError(i, zegoNetworkSpeedTestType);

            WritableMap args = getCallbackArgs(i, zegoNetworkSpeedTestType.value());
            sendEvent("networkSpeedTestError", args);
        }

        @Override
        public void onNetworkSpeedTestQualityUpdate(ZegoNetworkSpeedTestQuality zegoNetworkSpeedTestQuality, ZegoNetworkSpeedTestType zegoNetworkSpeedTestType) {
            super.onNetworkSpeedTestQualityUpdate(zegoNetworkSpeedTestQuality, zegoNetworkSpeedTestType);

            WritableMap qualityMap = Arguments.createMap();
            qualityMap.putInt("quality", zegoNetworkSpeedTestQuality.quality.value());
            qualityMap.putInt("rtt", zegoNetworkSpeedTestQuality.rtt);
            qualityMap.putInt("connectCost", zegoNetworkSpeedTestQuality.connectCost);
            qualityMap.putDouble("packetLostRate", zegoNetworkSpeedTestQuality.packetLostRate);

            WritableMap args = getCallbackArgs(qualityMap, zegoNetworkSpeedTestType.value());
            sendEvent("networkSpeedTestQualityUpdate", args);
        }

        @Override
        public void onNetworkQuality(String userID, ZegoStreamQualityLevel upstreamQuality, ZegoStreamQualityLevel downstreamQuality) {
            super.onNetworkQuality(userID, upstreamQuality, downstreamQuality);

            WritableMap args = getCallbackArgs(userID, upstreamQuality.value(), downstreamQuality.value());
            sendEvent("networkQuality", args);
        }
    };

    private IZegoApiCalledEventHandler zegoApiCalledEventHandler = new IZegoApiCalledEventHandler() {
        @Override
        public void onApiCalledResult(int i, String s, String s1) {
            super.onApiCalledResult(i, s, s1);

            WritableMap args = getCallbackArgs(i, s, s1);
            sendEvent("apiCalledResult", args);
        }
    };
}
