#import "RCTZegoExpressEngine.h"
#import <ZegoExpressEngine/ZegoExpressEngine.h>
#import <React/RCTConvert.h>
#import "ZegoCustomVideoProcessManager.h"
#import "ZegoLog.h"

static NSString* PREFIX = @"im.zego.reactnative.";

static BOOL kIsInited = false;

# define RN_EVENT(oc_method_name) [NSString stringWithFormat:@"%@%@", PREFIX, oc_method_name]

@interface RCTZegoExpressNativeModule() <
ZegoEventHandler,
ZegoApiCalledEventHandler,
ZegoMediaPlayerEventHandler,
ZegoAudioEffectPlayerEventHandler
>

@property (nonatomic, assign) BOOL hasListeners;

@property (nonatomic, assign) BOOL pluginReported;

@property (nonatomic, strong) NSMutableDictionary<NSNumber *, ZegoMediaPlayer *> *mediaPlayerMap;
@property (nonatomic, strong) NSMutableDictionary<NSNumber *, ZegoAudioEffectPlayer *>* audioEffectPlayerMap;

@end

@implementation RCTZegoExpressNativeModule

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;  // only do this if your module initialization relies on calling UIKit!
}

- (NSDictionary *)constantsToExport
{
    return @{@"prefix": PREFIX};
}

-(void)startObserving {
    // Set up any upstream listeners or background tasks as necessary
    self.hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    // Remove upstream listeners, stop unnecessary background tasks
    self.hasListeners = NO;
}

- (void)reportPluginInfo {

    if (self.pluginReported) { return; }

    self.pluginReported = true;

    NSDictionary *advancedConfigMap = @{@"thirdparty_framework_info": @"reactnative",
                                        @"switch_media_source": @"true"
    };

    ZegoEngineConfig *configObject = [[ZegoEngineConfig alloc] init];
    configObject.advancedConfig = advancedConfigMap;

    [ZegoExpressEngine setEngineConfig:configObject];
}

RCT_EXPORT_METHOD(getVersion:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([ZegoExpressEngine getVersion]);
}

RCT_EXPORT_METHOD(createEngineWithProfile:(NSDictionary *)profileMap
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    // Report framework info
    [self reportPluginInfo];
    
    [ZegoExpressEngine setApiCalledCallback:self];

    unsigned int appID = (unsigned int)[RCTConvert NSUInteger:profileMap[@"appID"]];
    NSString *appSign = [RCTConvert NSString:profileMap[@"appSign"]];
    ZegoScenario scenario = [RCTConvert NSUInteger:profileMap[@"scenario"]];

    ZGLog(@"createEngineWithProfile: app id: %lu, app sign: %@, scenario: %td", (unsigned long)appID, appSign, scenario);

    ZegoEngineProfile *profile = [ZegoEngineProfile new];
    profile.appID = appID;
    profile.appSign = appSign;
    profile.scenario = scenario;
    [ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
    
    kIsInited = true;
    resolve(nil);
}

RCT_EXPORT_METHOD(createEngine:(NSUInteger)appID
                  appSign:(NSString *)appSign
                  isTestEnv:(BOOL)isTestEnv
                  scenario:(int)scenario
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    // Report framework info
    [self reportPluginInfo];
    
    [ZegoExpressEngine setApiCalledCallback:self];
    
    ZGLog(@"createEngine: app id: %lu, app sign: %@, test: %d, scenario: %d", (unsigned long)appID, appSign, isTestEnv, scenario);
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    [ZegoExpressEngine createEngineWithAppID:(unsigned int)appID appSign:appSign isTestEnv:isTestEnv scenario:(ZegoScenario)scenario eventHandler:self];
#pragma clang diagnostic pop
    kIsInited = true;
    resolve(nil);
}

RCT_EXPORT_METHOD(destroyEngine:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"destroyEngine");
    
    if(kIsInited) {
        [ZegoExpressEngine destroyEngine:^{
            resolve(nil);
        }];
        kIsInited = false;
    } else {
        resolve(nil);
    }
}

RCT_EXPORT_METHOD(setEngineConfig:(NSDictionary *)config
                  resover:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{

    // Report framework info
    [self reportPluginInfo];

    ZGLog(@"setEngineConfig: %@", config);
    
    ZegoEngineConfig *engineConfig = [[ZegoEngineConfig alloc] init];
    
    NSDictionary *logConfig = [RCTConvert NSDictionary:config[@"logConfig"]];
    if(logConfig) {
        ZegoLogConfig *logConfigObj = [[ZegoLogConfig alloc] init];
        NSString *logPath = [RCTConvert NSString:logConfig[@"logPath"]];
        if(logPath) {
            logConfigObj.logPath = logPath;
        }
        NSNumber *logSize = [RCTConvert NSNumber:logConfig[@"logSize"]];
        if(logSize) {
            logConfigObj.logSize = [logSize unsignedLongLongValue];
        }
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        engineConfig.logConfig = logConfigObj;
#pragma clang diagnostic pop
    }
    
    // 可能需要校验 kv 的类型
    NSDictionary *advancedConfig = [RCTConvert NSDictionary:config[@"advancedConfig"]];
    if(advancedConfig) {
        engineConfig.advancedConfig = advancedConfig;
    }
    
    [ZegoExpressEngine setEngineConfig:engineConfig];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setRoomMode:(int)mode
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [ZegoExpressEngine setRoomMode:(ZegoRoomMode)mode];
    resolve(nil);
}

RCT_EXPORT_METHOD(uploadLog:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [[ZegoExpressEngine sharedEngine] uploadLog];
    resolve(nil);
}

RCT_EXPORT_METHOD(callExperimentalAPI:(NSString *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *result = [[ZegoExpressEngine sharedEngine] callExperimentalAPI:params];
    resolve(result);
}

RCT_EXPORT_METHOD(loginRoom:(NSString *)roomID
                  user:(NSDictionary *)user
                  config:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"loginRoom: room id: %@, user: %@, config: %@", roomID, user, config);
    
    ZegoUser *userObj = [[ZegoUser alloc] initWithUserID:[RCTConvert NSString:user[@"userID"]] userName:[RCTConvert NSString:user[@"userName"]]];
    
    ZegoRoomConfig *configObj = [[ZegoRoomConfig alloc] init];
    if(config) {
        configObj.isUserStatusNotify = [RCTConvert BOOL:config[@"isUserStatusNotify"]];
        configObj.maxMemberCount = (unsigned int)[RCTConvert NSUInteger:config[@"maxMemberCount"]];
        configObj.token = [RCTConvert NSString:config[@"token"]];
    }
    [[ZegoExpressEngine sharedEngine] loginRoom:roomID user:userObj config:configObj callback:^(int errorCode, NSDictionary * _Nonnull extendedData) {
        NSString *extendedDataJsonString = @"{}";
        if (extendedData) {
            NSError *error;
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:extendedData options:0 error:&error];
            if (!jsonData) {
                ZGLog(@"[loginRoom] extendedData error: %@", error);
            }else{
                extendedDataJsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
            }
        }
        resolve(@{
            @"errorCode": @(errorCode),
            @"extendedData": extendedDataJsonString
        });
    }];
    
}

RCT_EXPORT_METHOD(logoutRoom:(NSString *)roomID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"logoutRoom: room id: %@", roomID);
    
    if (roomID) {
        [[ZegoExpressEngine sharedEngine] logoutRoomWithCallback:roomID callback:^(int errorCode, NSDictionary * _Nonnull extendedData) {
            NSString *extendedDataJsonString = @"{}";
            if (extendedData) {
                NSError *error;
                NSData *jsonData = [NSJSONSerialization dataWithJSONObject:extendedData options:0 error:&error];
                if (!jsonData) {
                    ZGLog(@"[logoutRoom] extendedData error: %@", error);
                }else{
                    extendedDataJsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
                }
            }
            resolve(@{
                @"errorCode": @(errorCode),
                @"extendedData": extendedDataJsonString
            });
        }];
    } else {
        [[ZegoExpressEngine sharedEngine] logoutRoomWithCallback:^(int errorCode, NSDictionary * _Nonnull extendedData) {
            NSString *extendedDataJsonString = @"{}";
            if (extendedData) {
                NSError *error;
                NSData *jsonData = [NSJSONSerialization dataWithJSONObject:extendedData options:0 error:&error];
                if (!jsonData) {
                    ZGLog(@"[logoutRoom] extendedData error: %@", error);
                }else{
                    extendedDataJsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
                }
            }
            resolve(@{
                @"errorCode": @(errorCode),
                @"extendedData": extendedDataJsonString
            });
        }];
    }
}

RCT_EXPORT_METHOD(switchRoom:(NSString *)fromRoomID
                  toRoomID:(NSString *)toRoomID
                  config:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"switchRoom. from room id: %@, to room id: %@", fromRoomID, toRoomID);
    
    ZegoRoomConfig *roomConfig = [[ZegoRoomConfig alloc] init];
    
    if (config) {
        roomConfig.isUserStatusNotify = [RCTConvert BOOL:config[@"isUserStatusNotify"]];
        roomConfig.maxMemberCount = (unsigned int)[RCTConvert NSUInteger:config[@"maxMemberCount"]];
        roomConfig.token = [RCTConvert NSString:config[@"token"]];
    }
    
    [[ZegoExpressEngine sharedEngine] switchRoom:fromRoomID toRoomID:toRoomID config:roomConfig];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(renewToken:(NSString *)roomID
                  token:(NSString *)token
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"renewToken. room id: %@, token: %@", roomID, token);
    
    [[ZegoExpressEngine sharedEngine] renewToken:token roomID:roomID];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setRoomExtraInfo:(NSString *)roomID
                  key:(NSString *)key
                  value:(NSString *)value
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setRoomExtraInfo. room id: %@, key: %@, value: %@", roomID, key, value);
    
    [[ZegoExpressEngine sharedEngine] setRoomExtraInfo:value forKey:key roomID:roomID callback:^(int errorCode) {
        resolve(@{@"errorCode": @(errorCode)});
    }];
}

RCT_EXPORT_METHOD(setStreamExtraInfo:(NSString *)extraInfo
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setStreamExtraInfo. extraInfo: %@, channel: %d", extraInfo, channel);
    
    [[ZegoExpressEngine sharedEngine] setStreamExtraInfo:extraInfo channel:(ZegoPublishChannel)channel callback:^(int errorCode) {
        resolve(@{@"errorCode": @(errorCode)});
    }];
}

RCT_EXPORT_METHOD(startPublishingStream:(NSString *)streamID
                  channel:(int)channel
                  config:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"startPublishingStream: stream id: %@ channel: %d", streamID, channel);

    if (config && config.count > 0) {
        ZegoPublisherConfig *publisherConfig = [[ZegoPublisherConfig alloc] init];
        publisherConfig.roomID = [RCTConvert NSString:config[@"roomID"]];
        publisherConfig.forceSynchronousNetworkTime = [RCTConvert int:config[@"forceSynchronousNetworkTime"]];
        [[ZegoExpressEngine sharedEngine] startPublishingStream:streamID config:publisherConfig channel:(ZegoPublishChannel)channel];
    } else {
        [[ZegoExpressEngine sharedEngine] startPublishingStream:streamID channel:(ZegoPublishChannel)channel];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(stopPublishingStream:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"stopPublishingStream: channel: %d", channel);
    
    [[ZegoExpressEngine sharedEngine] stopPublishingStream:(ZegoPublishChannel)channel];

    resolve(nil);
}

RCT_EXPORT_METHOD(startPreview:(NSDictionary *)view
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"startPreview: view: %@, channel: %d", view, channel);

    ZegoCanvas *canvas = nil;

    if(view && view.count > 0) {
        NSNumber *viewTag = [RCTConvert NSNumber:view[@"reactTag"]];
        UIView *uiView = [self.bridge.uiManager viewForReactTag:viewTag];
        
        canvas = [[ZegoCanvas alloc] initWithView:uiView];
        canvas.viewMode = (ZegoViewMode)[RCTConvert int:view[@"viewMode"]];
        canvas.backgroundColor = [RCTConvert int:view[@"backgroundColor"]];
    }
    
    [[ZegoExpressEngine sharedEngine] startPreview:canvas channel: (ZegoPublishChannel)channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(stopPreview:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"stopPreview: channel: %d", channel);
    
    [[ZegoExpressEngine sharedEngine] stopPreview:(ZegoPublishChannel)channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(addPublishCdnUrl:(NSString *)streamID
                  targetURL:(NSString *)targetURL
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"addPublishCdnUrl: streamID: %@, URL:%@", streamID, targetURL);
    
    [[ZegoExpressEngine sharedEngine] addPublishCdnUrl:targetURL streamID:streamID callback:^(int errorCode) {
        resolve(@{@"errorCode": @(errorCode)});
    }];
}

RCT_EXPORT_METHOD(removePublishCdnUrl:(NSString *)streamID
                  targetURL:(NSString *)targetURL
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"removePublishCdnUrl: streamID: %@, URL:%@", streamID, targetURL);
    
    [[ZegoExpressEngine sharedEngine] removePublishCdnUrl:targetURL streamID:streamID callback:^(int errorCode) {
        resolve(@{@"errorCode": @(errorCode)});
    }];
}

RCT_EXPORT_METHOD(enablePublishDirectToCDN:(BOOL)enable
                  config:(NSDictionary *)config
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enablePublishDirectToCDN: enable: %d", enable);
    
    ZegoCDNConfig *cdnConfig = [[ZegoCDNConfig alloc] init];
    if (config && [config isKindOfClass:NSDictionary.class]) {
        cdnConfig.url = [RCTConvert NSString:config[@"url"]];
        cdnConfig.authParam = [RCTConvert NSString:config[@"authParam"]];
        cdnConfig.protocol = [RCTConvert NSString:config[@"protocol"]];
        cdnConfig.quicVersion = [RCTConvert NSString:config[@"quicVersion"]];
    }
    
    [[ZegoExpressEngine sharedEngine] enablePublishDirectToCDN:enable config:cdnConfig channel:(ZegoPublishChannel)channel];
    resolve(nil);
}

RCT_EXPORT_METHOD(setVideoConfig:(NSDictionary *)config
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setVideoConfig: config: %@, channel: %d", config, channel);
    
    ZegoVideoConfig * configObj = [[ZegoVideoConfig alloc] init];
    configObj.captureResolution = CGSizeMake([RCTConvert int:config[@"captureWidth"]], [RCTConvert int:config[@"captureHeight"]]);
    configObj.encodeResolution = CGSizeMake([RCTConvert int:config[@"encodeWidth"]], [RCTConvert int:config[@"encodeHeight"]]);
    configObj.bitrate = [RCTConvert int:config[@"bitrate"]];
    configObj.fps = [RCTConvert int:config[@"fps"]];
    configObj.codecID = (ZegoVideoCodecID)[RCTConvert int:config[@"codecID"]];
    
    [[ZegoExpressEngine sharedEngine] setVideoConfig:configObj channel:(ZegoPublishChannel)channel];
        
    resolve(nil);
}

RCT_EXPORT_METHOD(getVideoConfig:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoVideoConfig *config = [[ZegoExpressEngine sharedEngine] getVideoConfig:(ZegoPublishChannel)channel];
    
    resolve(@{@"captureWidth": @(config.captureResolution.width),
              @"captureHeight": @(config.captureResolution.height),
              @"encodeWidth": @(config.encodeResolution.width),
              @"encodeHeight": @(config.encodeResolution.height),
              @"bitrate": @(config.bitrate),
              @"fps": @(config.fps),
              @"codecID": @(config.codecID)
            });
}

RCT_EXPORT_METHOD(setVideoMirrorMode:(int)mode
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setVideoMirrorMode: mode: %d, channel: %d", mode, channel);
    
    [[ZegoExpressEngine sharedEngine] setVideoMirrorMode:(ZegoVideoMirrorMode)mode channel:(ZegoPublishChannel)channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setAppOrientation:(int)orientation
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setAppOrientation: ori: %d, channel: %d", orientation, channel);
    
    UIInterfaceOrientation  uiOrientation = UIInterfaceOrientationUnknown;
    switch (orientation) {
        case 0:
            uiOrientation = UIInterfaceOrientationPortrait;
            break;
        case 1:
            uiOrientation = UIInterfaceOrientationLandscapeRight;
            break;
        case 2:
            uiOrientation = UIInterfaceOrientationPortraitUpsideDown;
            break;
        case 3:
            uiOrientation = UIInterfaceOrientationLandscapeLeft;
        default:
            break;
    }
    [[ZegoExpressEngine sharedEngine] setAppOrientation:uiOrientation channel:(ZegoPublishChannel)channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setAudioConfig:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setAudioConfig: config: %@", config);
    
    ZegoAudioConfig *configObj = [[ZegoAudioConfig alloc] init];
    configObj.bitrate = [RCTConvert int:config[@"bitrate"]];
    configObj.channel = (ZegoAudioChannel)[RCTConvert NSInteger:config[@"channel"]];
    configObj.codecID = (ZegoAudioCodecID)[RCTConvert NSInteger:config[@"codecID"]];
    
    [[ZegoExpressEngine sharedEngine] setAudioConfig:configObj];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(getAudioConfig:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoAudioConfig *config = [[ZegoExpressEngine sharedEngine] getAudioConfig];
    
    resolve(@{@"bitrate": @(config.bitrate),
              @"channel": @(config.channel),
              @"codecID": @(config.codecID)
            });
}

RCT_EXPORT_METHOD(takePublishStreamSnapshot:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"takePublishStreamSnapshot. channel: %d", channel);
    
    [[ZegoExpressEngine sharedEngine] takePublishStreamSnapshot:^(int errorCode, ZGImage * _Nullable image) {
        NSString *imgBase64Str = nil;
        if (image) {
            NSData *imgData = UIImageJPEGRepresentation(image, 0.7);
            imgBase64Str = [imgData base64EncodedStringWithOptions:0];
        }
        resolve(@{@"errorCode": @(errorCode),
                  @"imageBase64": imgBase64Str});
    } channel:(ZegoPublishChannel)channel];
}

RCT_EXPORT_METHOD(takePlayStreamSnapshot:(NSString *)streamID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"takePlayStreamSnapshot. streamID: %@", streamID);
    
    [[ZegoExpressEngine sharedEngine] takePlayStreamSnapshot:streamID callback:^(int errorCode, ZGImage * _Nullable image) {
        NSString *imgBase64Str = nil;
        if (image) {
            NSData *imgData = UIImageJPEGRepresentation(image, 0.7);
            imgBase64Str = [imgData base64EncodedStringWithOptions:0];
        }
        resolve(@{@"errorCode": @(errorCode),
                  @"imageBase64": imgBase64Str});
    }];
}

RCT_EXPORT_METHOD(mutePublishStreamAudio:(BOOL)mute
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mutePublishStreamAudio: mute: %d, channel: %d", mute, channel);
    
    [[ZegoExpressEngine sharedEngine] mutePublishStreamAudio:mute channel:(ZegoPublishChannel)channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(mutePublishStreamVideo:(BOOL)mute
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mutePublishStreamVideo: mute: %d, channel: %d", mute, channel);
    
    [[ZegoExpressEngine sharedEngine] mutePublishStreamVideo:mute channel:(ZegoPublishChannel)channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setCaptureVolume:(int)volume
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setCaptureVolume: volume: %d", volume);
    
    [[ZegoExpressEngine sharedEngine] setCaptureVolume:(int)volume];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(sendSEI:(NSArray *)dataArray
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"sendSEI: data: %@, channel: %d", dataArray, channel);
    
    Byte* bytes = calloc(dataArray.count, sizeof(Byte));
    
    [dataArray enumerateObjectsUsingBlock:^(NSNumber* number, NSUInteger index, BOOL* stop){
        bytes[index] = number.integerValue;
    }];

    NSData *data = [[NSData alloc] initWithBytes:bytes length:dataArray.count];
    free(bytes);
    
    [[ZegoExpressEngine sharedEngine] sendSEI:data channel:(ZegoPublishChannel)channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableHardwareEncoder:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableHardwareEncoder: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableHardwareEncoder:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableH265EncodeFallback:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableH265EncodeFallback: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableH265EncodeFallback:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setVideoSource:(int)source
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setVideoSource. source: %d, channel: %d", source, channel);
    
    [ZegoExpressEngine.sharedEngine setVideoSource:(ZegoVideoSourceType)source channel:(ZegoPublishChannel)channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setAudioSource:(int)source
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setAudioSource. source: %d, channel: %d", source, channel);
    
    [ZegoExpressEngine.sharedEngine setAudioSource:(ZegoAudioSourceType)source channel:(ZegoPublishChannel)channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(isVideoEncoderSupported:(int)codecID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"isVideoEncoderSupported: codecID: %d", codecID);
    
    BOOL result = [[ZegoExpressEngine sharedEngine] isVideoEncoderSupported:(ZegoVideoCodecID)codecID];
    
    resolve(@(result));
}

RCT_EXPORT_METHOD(startPlayingStream:(NSString *)streamID
                  view:(NSDictionary *)view
                  config:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"startPlayingStream: stream id: %@, view: %@, config: %@", streamID, view, config);

    ZegoPlayerConfig *configObj = nil;

    if(config && config.count > 0) {
        ZegoPlayerConfig *configObj = [[ZegoPlayerConfig alloc] init];
        if(config[@"cdnConfig"] && [config[@"cdnConfig"] isKindOfClass:NSDictionary.class]) {
            NSDictionary *cdnConfig = [RCTConvert NSDictionary:config[@"cdnConfig"]];
            ZegoCDNConfig *cdnConfigObj = [[ZegoCDNConfig alloc] init];
            cdnConfigObj.url = [RCTConvert NSString:cdnConfig[@"url"]];
            cdnConfigObj.authParam = [RCTConvert NSString:cdnConfig[@"authParam"]];
            configObj.cdnConfig = cdnConfigObj;
        }
        if (config[@"videoLayer"]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
            configObj.videoLayer = [RCTConvert NSUInteger:config[@"videoLayer"]];
#pragma clang diagnostic pop
        }
        if (config[@"roomID"]) {
            configObj.roomID = [RCTConvert NSString:config[@"roomID"]];
        }
        if (config[@"videoCodecID"]) {
            configObj.videoCodecID = [RCTConvert NSUInteger:config[@"videoCodecID"]];
        }
        if (config[@"resourceMode"]) {
            configObj.resourceMode = [RCTConvert NSUInteger:config[@"resourceMode"]];
        }
    }

    ZegoCanvas *canvas = nil;

    if(view && view.count > 0) {
        NSNumber *viewTag = [RCTConvert NSNumber:view[@"reactTag"]];
        UIView *uiView = [self.bridge.uiManager viewForReactTag:viewTag];
        
        canvas = [[ZegoCanvas alloc] initWithView:uiView];
        canvas.viewMode = (ZegoViewMode)[RCTConvert int:view[@"viewMode"]];
        canvas.backgroundColor = [RCTConvert int:view[@"backgroundColor"]];
    }

    [[ZegoExpressEngine sharedEngine] startPlayingStream:streamID canvas:canvas config:configObj];

    resolve(nil);
}

RCT_EXPORT_METHOD(stopPlayingStream:(NSString *)streamID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"stopPlayingStream: stream id: %@", streamID);
    
    [[ZegoExpressEngine sharedEngine] stopPlayingStream:streamID];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setPlayVolume:(NSString *)streamID
                  volume:(int)volume
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setPlayVolume: volume: %d, streamID: %@", volume, streamID);
    
    [[ZegoExpressEngine sharedEngine] setPlayVolume:(int)volume streamID:streamID];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setAllPlayStreamVolume:(int)volume
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setAllPlayStreamVolume: volume: %d", volume);
    
    [[ZegoExpressEngine sharedEngine] setAllPlayStreamVolume:volume];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setPlayStreamVideoType:(NSString *)streamID
                  streamType:(int)type
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setPlayStreamVideoType: streamID:%@, streamType: %d", streamID, type);
    
    [[ZegoExpressEngine sharedEngine] setPlayStreamVideoType:(ZegoVideoStreamType)type streamID:streamID];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(mutePlayStreamAudio:(NSString *)streamID
                  mute:(BOOL)mute
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mutePlayStreamAudio: mute: %d, stream id: %@", mute, streamID);
    
    [[ZegoExpressEngine sharedEngine] mutePlayStreamAudio:mute streamID:streamID];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(muteAllPlayStreamAudio:(BOOL)mute
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"muteAllPlayStreamAudio: mute: %d", mute);
    
    [[ZegoExpressEngine sharedEngine] muteAllPlayStreamAudio:mute];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(mutePlayStreamVideo:(NSString *)streamID
                  mute:(BOOL)mute
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mutePlayStreamVideo: mute: %d, stream id: %@", mute, streamID);
    
    [[ZegoExpressEngine sharedEngine] mutePlayStreamVideo:mute streamID:streamID];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(muteAllPlayStreamVideo:(BOOL)mute
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"muteAllPlayStreamVideo: mute: %d", mute);
    
    [[ZegoExpressEngine sharedEngine] muteAllPlayStreamVideo:mute];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableHardwareDecoder:(BOOL)mute
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableHardwareDecoder: enable: %d", mute);
    
    [[ZegoExpressEngine sharedEngine] enableHardwareDecoder:mute];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(isVideoDecoderSupported:(int)codecID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"isVideoDecoderSupported: codecID: %d", codecID);
    
    BOOL result = [[ZegoExpressEngine sharedEngine] isVideoDecoderSupported:(ZegoVideoCodecID)codecID];
    
    resolve(@(result));
}

RCT_EXPORT_METHOD(muteMicrophone:(BOOL)mute
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"muteMicrophone: mute: %d", mute);
    
    [[ZegoExpressEngine sharedEngine] muteMicrophone:mute];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(isMicrophoneMuted:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([[ZegoExpressEngine sharedEngine] isMicrophoneMuted]));
}

RCT_EXPORT_METHOD(muteSpeaker:(BOOL)mute
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"muteSpeaker: mute: %d", mute);
    
    [[ZegoExpressEngine sharedEngine] muteSpeaker:mute];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(isSpeakerMuted:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([[ZegoExpressEngine sharedEngine] isSpeakerMuted]));
}

RCT_EXPORT_METHOD(enableAudioCaptureDevice:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableAudioCaptureDevice: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableAudioCaptureDevice:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(getAudioRouteType:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([[ZegoExpressEngine sharedEngine] getAudioRouteType]));
}

RCT_EXPORT_METHOD(setAudioRouteToSpeaker:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setAudioRouteToSpeaker: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] setAudioRouteToSpeaker:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableCamera:(BOOL)enable
                  channel:(NSInteger)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableCamera: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableCamera:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(useFrontCamera:(BOOL)enable
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"useFrontCamera: enable: %d, channel: %d", enable, channel);
    
    [[ZegoExpressEngine sharedEngine] useFrontCamera:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(startSoundLevelMonitor:(NSDictionary *)configMap
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoSoundLevelConfig *config = [[ZegoSoundLevelConfig alloc] init];
    if (configMap) {
        config.millisecond = (unsigned int)[RCTConvert NSUInteger:configMap[@"millisecond"]];
        config.enableVAD = [RCTConvert BOOL:configMap[@"enableVAD"]];
    }
    [[ZegoExpressEngine sharedEngine] startSoundLevelMonitorWithConfig:config];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(stopSoundLevelMonitor:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [[ZegoExpressEngine sharedEngine] stopSoundLevelMonitor];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableHeadphoneMonitor:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableHeadphoneMonitor: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableHeadphoneMonitor:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableAEC:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableAEC: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableAEC:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableHeadphoneAEC:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableHeadphoneAEC: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableHeadphoneAEC:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setAECMode:(int)mode
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setAECMode: mode: %d", mode);
    
    [[ZegoExpressEngine sharedEngine] setAECMode:(ZegoAECMode)mode];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableAGC:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableAGC: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableAGC:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableANS:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableANS: enable: %d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableANS:enable];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setANSMode:(int)mode
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setANSMode: mode: %d", mode);
    
    [[ZegoExpressEngine sharedEngine] setANSMode:(ZegoANSMode)mode];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(enableBeautify:(int)feature
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableBeautify: feature: %d, channel: %d", feature, channel);
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    [[ZegoExpressEngine sharedEngine] enableBeautify:(ZegoBeautifyFeature)feature channel:(ZegoPublishChannel)channel];
#pragma clang diagnostic pop
    
    resolve(nil);
}

RCT_EXPORT_METHOD(setBeautifyOption:(NSDictionary *)option
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setBeautifyOption: option: %@, channel: %d", option, channel);
    
    ZegoBeautifyOption *optionObj = [[ZegoBeautifyOption alloc] init];
    optionObj.polishStep = [RCTConvert double:option[@"polishStep"]];
    optionObj.sharpenFactor = [RCTConvert double:option[@"sharpenFactor"]];
    optionObj.whitenFactor = [RCTConvert double:option[@"whitenFactor"]];
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    [[ZegoExpressEngine sharedEngine] setBeautifyOption:optionObj];
#pragma clang diagnostic pop
    
    resolve(nil);
}

RCT_EXPORT_METHOD(sendBroadcastMessage:(NSString *)roomID
                  message:(NSString *)message
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"sendBroadcastMessage: roomID: %@, message: %@", roomID, message);

    [[ZegoExpressEngine sharedEngine] sendBroadcastMessage:message roomID:roomID callback:^(int errorCode, unsigned long long messageID) {
        resolve(@{@"errorCode": @(errorCode), @"messageID": @(messageID)});
    }];
}

RCT_EXPORT_METHOD(sendBarrageMessage:(NSString *)roomID
                  message:(NSString *)message
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"sendBarrageMessage: roomID: %@, message: %@", roomID, message);
    
    [[ZegoExpressEngine sharedEngine] sendBarrageMessage:message roomID:roomID callback:^(int errorCode, NSString * messageID) {
        resolve(@{@"errorCode": @(errorCode), @"messageID": messageID});
    }];
}

RCT_EXPORT_METHOD(sendCustomCommand:(NSString *)roomID
                  command:(NSString *)command
                  toUserList:(NSArray *)toUserList
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"sendCustomCommand: room id: %@, command: %@, to user list: %@", roomID, command, toUserList);
    
    NSMutableArray<ZegoUser *> *userListObject = nil;
    if (toUserList && toUserList.count > 0) {
        userListObject = [[NSMutableArray alloc] init];
        for(NSDictionary *userMap in toUserList) {
            ZegoUser *userObject = [[ZegoUser alloc] initWithUserID:userMap[@"userID"] userName:userMap[@"userName"]];
            [userListObject addObject:userObject];
        }
    }
    
    [[ZegoExpressEngine sharedEngine] sendCustomCommand:command toUserList:userListObject roomID:roomID callback:^(int errorCode) {
        resolve(@{@"errorCode": @(errorCode)});
    }];
}

RCT_EXPORT_METHOD(enableCustomAudioIO:(BOOL)enable
                  config:(NSDictionary *)configMap
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableCustomAudioIO. enable:%d, channel:%d", enable, channel);

    ZegoCustomAudioConfig *audioConfig = [[ZegoCustomAudioConfig alloc] init];
    if (configMap && [configMap isKindOfClass:NSDictionary.class]) {
        audioConfig.sourceType = [configMap[@"sourceType"] unsignedIntValue];
    }

    [[ZegoExpressEngine sharedEngine] enableCustomAudioIO:enable config:audioConfig channel:channel];
        
    resolve(nil);
}

RCT_EXPORT_METHOD(enableCustomVideoProcessing:(BOOL)enable
                  config:(NSDictionary *)config
                  channel:(int)channel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    ZGLog(@"enableCustomVideoProcessing. enable: %d", enable);
    
    ZegoCustomVideoProcessConfig *configObject = [[ZegoCustomVideoProcessConfig alloc] init];
    configObject.bufferType = ZegoVideoBufferTypeCVPixelBuffer;

    if (config && config[@"bufferType"]) {
        configObject.bufferType = [RCTConvert NSUInteger:config[@"bufferType"]];
    }
    if (enable) {
        [[ZegoExpressEngine sharedEngine] setCustomVideoProcessHandler:[ZegoCustomVideoProcessManager sharedInstance]];
    } else {
        [[ZegoExpressEngine sharedEngine] setCustomVideoProcessHandler:nil];
    }
    [[ZegoExpressEngine sharedEngine] enableCustomVideoProcessing:enable config:configObject channel:channel];
    
    resolve(nil);
}

RCT_EXPORT_METHOD(startScreenCaptureInApp:(NSDictionary *)configMap
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"startScreenCaptureInApp");

    ZegoScreenCaptureConfig *config = [[ZegoScreenCaptureConfig alloc] init];
    if (configMap && [configMap isKindOfClass:NSDictionary.class]) {
        config.captureAudio = [RCTConvert BOOL:configMap[@"captureAudio"]];
        config.captureVideo = [RCTConvert BOOL:configMap[@"captureVideo"]];
        config.applicationVolume = [RCTConvert int:configMap[@"applicationVolume"]];
        config.microphoneVolume = [RCTConvert int:configMap[@"microphoneVolume"]];

    }
    if (@available(iOS 12.0, *)) {
        [ZegoExpressEngine.sharedEngine startScreenCaptureInApp:config];
    } else {
        // Fallback on earlier versions
    }
        
    resolve(nil);
}

RCT_EXPORT_METHOD(startScreenCapture:(NSDictionary *)configMap
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"startScreenCapture");

    ZegoScreenCaptureConfig *config = [[ZegoScreenCaptureConfig alloc] init];
    if (configMap && [configMap isKindOfClass:NSDictionary.class]) {
        config.captureAudio = [RCTConvert BOOL:configMap[@"captureAudio"]];
        config.captureVideo = [RCTConvert BOOL:configMap[@"captureVideo"]];
        config.applicationVolume = [RCTConvert int:configMap[@"applicationVolume"]];
        config.microphoneVolume = [RCTConvert int:configMap[@"microphoneVolume"]];

    }
    if (@available(iOS 12.0, *)) {
        
        [ZegoExpressEngine.sharedEngine startScreenCapture:config];
        
        RPSystemBroadcastPickerView *broadcastPickerView = [[RPSystemBroadcastPickerView alloc] initWithFrame:CGRectMake(0, 0, 44, 44)];
        NSArray *bundlePathArray = [[NSBundle mainBundle] pathsForResourcesOfType:@"appex" inDirectory:@"PlugIns"];
        if (bundlePathArray.firstObject) {
            NSBundle *bundle = [NSBundle bundleWithPath:bundlePathArray.firstObject];
            if (bundle) {
                broadcastPickerView.preferredExtension = bundle.bundleIdentifier;
                for (UIView *subView in broadcastPickerView.subviews) {
                    if ([subView isMemberOfClass:[UIButton class]]) {
                        UIButton *button = (UIButton *)subView;
                        [button sendActionsForControlEvents:UIControlEventAllEvents];
                    }
                }
            }
        }
    } else {
        // Fallback on earlier versions
    }
        
    resolve(nil);
}

RCT_EXPORT_METHOD(stopScreenCapture:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"stopScreenCapture");

    if (@available(iOS 12.0, *)) {
        [ZegoExpressEngine.sharedEngine stopScreenCapture];
    } else {
        // Fallback on earlier versions
    }
        
    resolve(nil);
}

RCT_EXPORT_METHOD(updateScreenCaptureConfig:(NSDictionary *)configMap
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"updateScreenCaptureConfig");

    ZegoScreenCaptureConfig *config = [[ZegoScreenCaptureConfig alloc] init];
    if (configMap && [configMap isKindOfClass:NSDictionary.class]) {
        config.captureAudio = [RCTConvert BOOL:configMap[@"captureAudio"]];
        config.captureVideo = [RCTConvert BOOL:configMap[@"captureVideo"]];
        config.applicationVolume = [RCTConvert int:configMap[@"applicationVolume"]];
        config.microphoneVolume = [RCTConvert int:configMap[@"microphoneVolume"]];
    }
    if (@available(iOS 12.0, *)) {
        [ZegoExpressEngine.sharedEngine updateScreenCaptureConfig:config];
    } else {
        // Fallback on earlier versions
    }
        
    resolve(nil);
}

RCT_EXPORT_METHOD(createMediaPlayer:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"createMediaPlayer");
    if(!self.mediaPlayerMap) {
        self.mediaPlayerMap = [NSMutableDictionary dictionary];
    }
    
    ZegoMediaPlayer *mediaPlayer = [[ZegoExpressEngine sharedEngine] createMediaPlayer];
    if(mediaPlayer) {
        NSNumber *index = mediaPlayer.index;

        [mediaPlayer setEventHandler:self];
        self.mediaPlayerMap[index] = mediaPlayer;
        
        resolve(index);
    } else {
        resolve(@(-1));
    }
}

RCT_EXPORT_METHOD(destroyMediaPlayer:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"destroyMediaPlayer, index: %@", index);
    
    if(self.mediaPlayerMap) {
        ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];

        if (mediaPlayer) {
            [[ZegoExpressEngine sharedEngine] destroyMediaPlayer:mediaPlayer];
        }

        [self.mediaPlayerMap removeObjectForKey:index];
    }
    
    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerSetPlayerCanvas:(nonnull NSNumber *)index
                  view:(NSDictionary *)view
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerSetPlayerCanvas, index: %@, view: %@", index, view);
    
    NSNumber *viewTag = [RCTConvert NSNumber:view[@"reactTag"]];
    UIView *uiView = [self.bridge.uiManager viewForReactTag:viewTag];
    
    ZegoCanvas *canvas = [[ZegoCanvas alloc] initWithView:uiView];
    canvas.viewMode = (ZegoViewMode)[RCTConvert int:view[@"viewMode"]];
    canvas.backgroundColor = [RCTConvert int:view[@"backgroundColor"]];
    
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if (mediaPlayer) {
        [mediaPlayer setPlayerCanvas:canvas];
    }
    
    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerLoadResource:(nonnull NSNumber *)index
                  path:(NSString *)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerLoadResource, index: %@, view: %@", index, path);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if (mediaPlayer) {
        [mediaPlayer loadResource:path callback:^(int errorCode) {
            resolve(@{@"errorCode":@(errorCode)});
        }];
    }
}

RCT_EXPORT_METHOD(mediaPlayerStart:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerStart, index: %@", index);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer start];
    }
    
    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerStop:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerStop, index: %@", index);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer stop];
    }
    
    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerPause:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerPause, index: %@", index);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer pause];
    }
    
    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerResume:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerResume, index: %@", index);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer resume];
    }
    
    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerSeekTo:(nonnull NSNumber *)index
                  millisecond:(nonnull NSNumber *)millisecond
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerSeekTo, index: %@, sec: %@", index, millisecond);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];

    if (mediaPlayer) {

        [mediaPlayer seekTo:[millisecond unsignedLongLongValue] callback:^(int errorCode) {
            resolve(@{@"errorCode":@(errorCode)});
        }];
    }
}

RCT_EXPORT_METHOD(mediaPlayerEnableRepeat:(nonnull NSNumber *)index
                  enable:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerEnableRepeat, index: %@, enable: %d", index, enable);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];

    if(mediaPlayer) {
        [mediaPlayer enableRepeat:enable];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerSetPlaySpeed:(nonnull NSNumber *)index
                  speed:(float)speed
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerSetPlaySpeed, index: %@, float: %.1f", index, speed);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer setPlaySpeed:speed];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerEnableAux:(nonnull NSNumber *)index
                  enable:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerEnableAux, index: %@, enable: %d", index, enable);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer enableAux:enable];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerMuteLocal:(nonnull NSNumber *)index
                  mute:(BOOL)mute
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerMuteLocal, index: %@, mute: %d", index, mute);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer muteLocal:mute];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerSetVolume:(nonnull NSNumber *)index
                  volume:(int)volume
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerSetVolume, index: %@, volume: %d", index, volume);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer setVolume:volume];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerSetPlayVolume:(nonnull NSNumber *)index
                  volume:(int)volume
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerSetPlayVolume, index: %@, volume: %d", index, volume);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer setPlayVolume:volume];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerSetPublishVolume:(nonnull NSNumber *)index
                  volume:(int)volume
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerSetPublishVolume, index: %@, volume: %d", index, volume);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer setPublishVolume:volume];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerSetProgressInterval:(nonnull NSNumber *)index
                  millisecond:(nonnull NSNumber *)millisecond
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"mediaPlayerSetProgressInterval, index: %@, millisecond: %@", index, millisecond);
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer setProgressInterval:[millisecond unsignedLongLongValue]];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(mediaPlayerGetPlayVolume:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        resolve(@(mediaPlayer.playVolume));
    } else {
        resolve(@(0));
    }
}

RCT_EXPORT_METHOD(mediaPlayerGetPublishVolume:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        resolve(@(mediaPlayer.publishVolume));
    } else {
        resolve(@(0));
    }
}

RCT_EXPORT_METHOD(mediaPlayerGetTotalDuration:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        resolve(@(mediaPlayer.totalDuration));
    } else {
        resolve(@(0));
    }
}

RCT_EXPORT_METHOD(mediaPlayerGetCurrentProgress:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        resolve(@(mediaPlayer.currentProgress));
    } else {
        resolve(@(0));
    }
}

RCT_EXPORT_METHOD(mediaPlayerGetAudioTrackCount:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        resolve(@(mediaPlayer.audioTrackCount));
    } else {
        resolve(@(0));
    }
}

RCT_EXPORT_METHOD(mediaPlayerSetAudioTrackIndex:(nonnull NSNumber *)index
                  audioTrackIndex:(int)audioTrackIndex
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        [mediaPlayer setAudioTrackIndex:audioTrackIndex];
    }
    
    resolve(nil);
    
}

RCT_EXPORT_METHOD(mediaPlayerGetCurrentState:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZegoMediaPlayer *mediaPlayer = self.mediaPlayerMap[index];
    
    if(mediaPlayer) {
        resolve(@(mediaPlayer.currentState));
    } else {
        resolve(@(0));
    }
}

RCT_EXPORT_METHOD(createAudioEffectPlayer:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"createAudioEffectPlayer");
    if(!self.audioEffectPlayerMap) {
        self.audioEffectPlayerMap = [NSMutableDictionary dictionary];
    }
    
    ZegoAudioEffectPlayer *player = [[ZegoExpressEngine sharedEngine] createAudioEffectPlayer];
    if(player) {
        NSNumber *index = player.getIndex;

        [player setEventHandler:self];
        self.audioEffectPlayerMap[index] = player;
        
        resolve(index);
    } else {
        resolve(@(-1));
    }
    
}

RCT_EXPORT_METHOD(destroyAudioEffectPlayer:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"destroyAudioEffectPlayer, index: %@", index);
    if (self.audioEffectPlayerMap) {
        ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

        if (audioEffectPlayer) {
            [[ZegoExpressEngine sharedEngine] destroyAudioEffectPlayer:audioEffectPlayer];
        }
        
        [self.audioEffectPlayerMap removeObjectForKey:index];
    }
    
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerLoadResource:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  path:(NSString *)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerLoadResource, index:%@, audioEffectID: %@, path: %@", index, audioEffectID, path);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];
    
    if (audioEffectPlayer) {
      [audioEffectPlayer loadResource:path audioEffectID:[RCTConvert int:audioEffectID] callback:^(int errorCode) {
            resolve(@{@"errorCode": @(errorCode)});
        }];
    } else {
        resolve(nil);
    }
}

RCT_EXPORT_METHOD(audioEffectPlayerUnloadResource:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerUnloadResource, index:%@, audioEffectID: %@", index, audioEffectID);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        [audioEffectPlayer unloadResource:[RCTConvert int:audioEffectID]];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerStart:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  path:(NSString *)path
                  config:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerStart, index:%@, audioEffectID: %@, path:%@, config:%@", index, audioEffectID, path, config);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        ZegoAudioEffectPlayConfig *audioEffectPlayerConfig = [[ZegoAudioEffectPlayConfig alloc] init];
        if (config && [config isKindOfClass:NSDictionary.class]) {
            audioEffectPlayerConfig.playCount = [RCTConvert int:config[@"playCount"]];
            audioEffectPlayerConfig.isPublishOut = [RCTConvert BOOL:config[@"isPublishOut"]];
        }

        [audioEffectPlayer start:audioEffectID.unsignedIntValue path:path config:audioEffectPlayerConfig];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerStop:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerStop, index:%@, audioEffectID: %@", index, audioEffectID);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        [audioEffectPlayer stop:[RCTConvert int:audioEffectID]];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerPause:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerPause, index:%@, audioEffectID: %@", index, audioEffectID);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        [audioEffectPlayer pause:[RCTConvert int:audioEffectID]];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerResume:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerResume, index:%@, audioEffectID: %@", index, audioEffectID);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        [audioEffectPlayer resume:[RCTConvert int:audioEffectID]];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerStopAll:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerStopAll, index:%@", index);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
    [audioEffectPlayer stopAll];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerPauseAll:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerPauseAll, index:%@", index);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        [audioEffectPlayer pauseAll];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerResumeAll:(nonnull NSNumber *)index
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerResumeAll, index:%@", index);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        [audioEffectPlayer resumeAll];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerSeekTo:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  millisecond:(nonnull NSNumber *)millisecond
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerSeekTo, index:%@, audioEffectID: %@, millisecond:%@", index, audioEffectID, millisecond);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];
  
    if (audioEffectPlayer) {

        [audioEffectPlayer seekTo:[RCTConvert NSInteger:millisecond] audioEffectID:[RCTConvert int:audioEffectID] callback:^(int errorCode) {
            resolve(@{@"errorCode": @(errorCode)});
        }];
    } else {
        resolve(nil);
    }
}

RCT_EXPORT_METHOD(audioEffectPlayerSetVolume:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  volume:(nonnull NSNumber *)volume
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerSetVolume, index:%@, audioEffectID: %@, volume: %@", index, audioEffectID, volume);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        [audioEffectPlayer setVolume:[RCTConvert int:volume] audioEffectID:[RCTConvert int:audioEffectID]];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerSetVolumeAll:(nonnull NSNumber *)index
                  volume:(nonnull NSNumber *)volume
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerSetVolumeAll, index:%@, volume: %@", index, volume);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        [audioEffectPlayer setVolumeAll:[RCTConvert int:volume]];
    }
    resolve(nil);
}

RCT_EXPORT_METHOD(audioEffectPlayerGetTotalDuration:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerGetTotalDuration, index:%@, audioEffectID: %@", index, audioEffectID);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        unsigned long long duration = [audioEffectPlayer getTotalDuration:[RCTConvert int:audioEffectID]];
        resolve(@(duration));
    } else {
        resolve(nil);
    }
}

RCT_EXPORT_METHOD(audioEffectPlayerGetCurrentProgress:(nonnull NSNumber *)index
                  audioEffectID:(nonnull NSNumber *)audioEffectID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"audioEffectPlayerGetCurrentProgress, index:%@, audioEffectID: %@", index, audioEffectID);
    ZegoAudioEffectPlayer *audioEffectPlayer = self.audioEffectPlayerMap[index];

    if (audioEffectPlayer) {
        unsigned long long progress = [audioEffectPlayer getCurrentProgress:[RCTConvert int:audioEffectID]];
        resolve(@(progress));
    } else {
        resolve(nil);
    }
}


RCT_EXPORT_METHOD(startMixerTask:(NSDictionary *)task
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"origin start task: %@", task);
    NSString *taskID = task[@"taskID"];
    ZegoMixerTask *taskObject = [[ZegoMixerTask alloc] initWithTaskID:taskID];

    // MixerInput
    NSArray<NSDictionary *> *inputListMap = task[@"inputList"];
    if (inputListMap && inputListMap.count > 0) {
        NSMutableArray<ZegoMixerInput *> *inputListObject = [[NSMutableArray alloc] init];
        for (NSDictionary *inputMap in inputListMap) {
            NSString *streamID = inputMap[@"streamID"];
            int contentType = [RCTConvert int:inputMap[@"contentType"]];
            
            int x = [RCTConvert int:inputMap[@"layout"][@"x"]];
            int y = [RCTConvert int:inputMap[@"layout"][@"y"]];
            int width = [RCTConvert int:inputMap[@"layout"][@"width"]];
            int height = [RCTConvert int:inputMap[@"layout"][@"height"]];
            CGRect rect = CGRectMake(x, y, width, height);
            // TODO: 这里需要测试外部传空时的情况
            unsigned int soundLevelID = (unsigned int)[RCTConvert NSUInteger:inputMap[@"soundLevelID"]];
            ZegoMixerInput *inputObject = [[ZegoMixerInput alloc] initWithStreamID:streamID contentType:(ZegoMixerInputContentType)contentType layout:rect soundLevelID:soundLevelID];
            [inputListObject addObject:inputObject];
        }
        [taskObject setInputList:inputListObject];
    }

    // MixerOutput
    NSArray<NSDictionary *> *outputListMap = task[@"outputList"];
    if (outputListMap && outputListMap.count > 0) {
        NSMutableArray<ZegoMixerOutput *> *outputListObject = [[NSMutableArray alloc] init];
        for (NSDictionary *outputMap in outputListMap) {
            NSString *target = outputMap[@"target"];
            ZegoMixerOutput *outputObject = [[ZegoMixerOutput alloc] initWithTarget:target];
            [outputListObject addObject:outputObject];
        }
        [taskObject setOutputList:outputListObject];
    }

    // AudioConfig
    NSDictionary *audioConfigMap = task[@"audioConfig"];
    if (audioConfigMap && audioConfigMap.count > 0) {
        int bitrate = [RCTConvert int:audioConfigMap[@"bitrate"]];
        int channel = [RCTConvert int:audioConfigMap[@"channel"]];
        int codecID = [RCTConvert int:audioConfigMap[@"codecID"]];
        ZegoMixerAudioConfig *audioConfigObject = [[ZegoMixerAudioConfig alloc] init];
        audioConfigObject.bitrate = bitrate;
        audioConfigObject.channel = (ZegoAudioChannel)channel;
        audioConfigObject.codecID = (ZegoAudioCodecID)codecID;

        [taskObject setAudioConfig:audioConfigObject];
    }

    // VideoConfig
    NSDictionary *videoConfigMap = task[@"videoConfig"];
    if (videoConfigMap && videoConfigMap.count > 0) {
        int width = [RCTConvert int:videoConfigMap[@"width"]];
        int height = [RCTConvert int:videoConfigMap[@"height"]];
        int fps = [RCTConvert int:videoConfigMap[@"fps"]];
        int bitrate = [RCTConvert int:videoConfigMap[@"bitrate"]];
        ZegoMixerVideoConfig *videoConfigObject = [[ZegoMixerVideoConfig alloc] init];
        videoConfigObject.resolution = CGSizeMake((CGFloat)width, (CGFloat)height);
        videoConfigObject.bitrate = bitrate;
        videoConfigObject.fps = fps;

        [taskObject setVideoConfig:videoConfigObject];
    }

    // Watermark
    /*NSDictionary *watermarkMap = task[@"watermark"];
    if (watermarkMap && watermarkMap.count > 0) {
        NSString *imageURL = watermarkMap[@"imageURL"];
        if (imageURL && [imageURL length] > 0) {
            int x = [RCTConvert int:watermarkMap[@"x"]];
            int y = [RCTConvert int:watermarkMap[@"y"]];
            int width = [RCTConvert int:watermarkMap[@"width"]];
            int height = [RCTConvert int:watermarkMap[@"height"]];
            CGRect rect = CGRectMake(x, y, width, height);
            ZegoWatermark *watermarkObject = [[ZegoWatermark alloc] initWithImageURL:imageURL layout:rect];

            [taskObject setWatermark:watermarkObject];
        }
    }*/

    // Background Image
    /*NSString *backgroundImageURL = task[@"backgroundImageURL"];
    if (backgroundImageURL.length > 0) {
        [taskObject setBackgroundImageURL:backgroundImageURL];
    }*/

    // Enable SoundLevel
    BOOL enableSoundLevel = [RCTConvert BOOL:task[@"enableSoundLevel"]];
    [taskObject enableSoundLevel:enableSoundLevel];

    // Set AdvancedConfig
    /*NSDictionary<NSString *, NSString *> *advancedConfig = task[@"advancedConfig"];
    [taskObject setAdvancedConfig:advancedConfig];*/

    [[ZegoExpressEngine sharedEngine] startMixerTask:taskObject callback:^(int errorCode, NSDictionary * _Nullable extendedData) {

        NSString *extendedDataJsonString = @"{}";
        if (extendedData) {
            NSError *error;
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:extendedData options:0 error:&error];
            if (!jsonData) {
                ZGLog(@"[startMixerTaskCallback] extendedData error: %@", error);
            }else{
                extendedDataJsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
            }
        }

        resolve(@{
            @"errorCode": @(errorCode),
            @"extendedData": extendedDataJsonString
        });
    }];
}

RCT_EXPORT_METHOD(stopMixerTask:(NSDictionary *)task
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"origin stop task: %@", task);
    NSString *taskID = task[@"taskID"];
        ZegoMixerTask *taskObject = [[ZegoMixerTask alloc] initWithTaskID:taskID];

        // MixerInput
        NSArray<NSDictionary *> *inputListMap = task[@"inputList"];
        if (inputListMap && inputListMap.count > 0) {
            NSMutableArray<ZegoMixerInput *> *inputListObject = [[NSMutableArray alloc] init];
            for (NSDictionary *inputMap in inputListMap) {
                NSString *streamID = inputMap[@"streamID"];
                int contentType = [RCTConvert int:inputMap[@"contentType"]];
                int x = [RCTConvert int:inputMap[@"x"]];
                int y = [RCTConvert int:inputMap[@"y"]];
                int width = [RCTConvert int:inputMap[@"width"]];
                int height = [RCTConvert int:inputMap[@"height"]];
                CGRect rect = CGRectMake(x, y, width, height);
                // TODO: 测试此
                unsigned int soundLevelID = (unsigned int)[RCTConvert NSUInteger:inputMap[@"soundLevelID"]];
                ZegoMixerInput *inputObject = [[ZegoMixerInput alloc] initWithStreamID:streamID contentType:(ZegoMixerInputContentType)contentType layout:rect soundLevelID:soundLevelID];
                [inputListObject addObject:inputObject];
            }
            [taskObject setInputList:inputListObject];
        }

        // MixerOutput
        NSArray<NSDictionary *> *outputListMap = task[@"outputList"];
        if (outputListMap && outputListMap.count > 0) {
            NSMutableArray<ZegoMixerOutput *> *outputListObject = [[NSMutableArray alloc] init];
            for (NSDictionary *outputMap in outputListMap) {
                NSString *target = outputMap[@"target"];
                ZegoMixerOutput *outputObject = [[ZegoMixerOutput alloc] initWithTarget:target];
                [outputListObject addObject:outputObject];
            }
            [taskObject setOutputList:outputListObject];
        }

        // no need to set audio config

        // no need to set video config

        // no need to set watermark

        // no need to set background image

        // no need to set enable sound level

        [[ZegoExpressEngine sharedEngine] stopMixerTask:taskObject callback:^(int errorCode) {
            resolve(@{@"errorCode": @(errorCode)});
        }];
}


 RCT_EXPORT_METHOD(startNetworkSpeedTest:(NSDictionary *)config
                   interval:(nonnull NSNumber *)interval
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)
 {
     ZGLog(@"startNetworkSpeedTest. interval:%@", interval);

     ZegoNetworkSpeedTestConfig *speedTestConfig = [[ZegoNetworkSpeedTestConfig alloc] init];
     speedTestConfig.testUplink = [RCTConvert BOOL:config[@"testUplink"]];
     speedTestConfig.expectedUplinkBitrate = [RCTConvert int:config[@"expectedUplinkBitrate"]];
     speedTestConfig.testDownlink = [RCTConvert BOOL:config[@"testDownlink"]];
     speedTestConfig.expectedDownlinkBitrate = [RCTConvert int:config[@"expectedDownlinkBitrate"]];
     
     [[ZegoExpressEngine sharedEngine] startNetworkSpeedTest:speedTestConfig interval:[RCTConvert int:interval]];
     resolve(nil);
 }

RCT_EXPORT_METHOD(stopNetworkSpeedTest:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"stopNetworkSpeedTest");

    [[ZegoExpressEngine sharedEngine] stopNetworkSpeedTest];
    resolve(nil);
}

RCT_EXPORT_METHOD(getNetworkTimeInfo:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"getNetworkTimeInfo");

    ZegoNetworkTimeInfo *info = [[ZegoExpressEngine sharedEngine] getNetworkTimeInfo];
    
    resolve(@{@"timestamp": @(info.timestamp), @"maxDeviation": @(info.maxDeviation)});
}

RCT_EXPORT_METHOD(startEffectsEnv:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"startEffectsEnv");

    [[ZegoExpressEngine sharedEngine] startEffectsEnv];
    resolve(nil);
}

RCT_EXPORT_METHOD(stopEffectsEnv:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"stopEffectsEnv");

    [[ZegoExpressEngine sharedEngine] startEffectsEnv];
    resolve(nil);
}

RCT_EXPORT_METHOD(enableEffectsBeauty:(BOOL)enable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"enableEffectsBeauty. enable:%d", enable);
    
    [[ZegoExpressEngine sharedEngine] enableEffectsBeauty:enable];
    resolve(nil);
}

RCT_EXPORT_METHOD(setEffectsBeautyParam:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setEffectsBeautyParam.");
    
    ZegoEffectsBeautyParam *param = [[ZegoEffectsBeautyParam alloc] init];
    param.whitenIntensity = [RCTConvert int:config[@"whitenIntensity"]];
    param.rosyIntensity = [RCTConvert int:config[@"rosyIntensity"]];
    param.smoothIntensity = [RCTConvert int:config[@"smoothIntensity"]];
    param.sharpenIntensity = [RCTConvert int:config[@"sharpenIntensity"]];
    
    [[ZegoExpressEngine sharedEngine] setEffectsBeautyParam:param];
    resolve(nil);
}

RCT_EXPORT_METHOD(setVoiceChangerPreset:(int)preset
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setVoiceChangerPreset. preset: %d", preset);
    
    [[ZegoExpressEngine sharedEngine] setVoiceChangerPreset:(ZegoVoiceChangerPreset)preset];
    resolve(nil);
}

RCT_EXPORT_METHOD(setVoiceChangerParam:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setVoiceChangerParam.");
    
    ZegoVoiceChangerParam *param = [[ZegoVoiceChangerParam alloc] init];
    param.pitch = [RCTConvert int:config[@"pitch"]];
    
    [[ZegoExpressEngine sharedEngine] setVoiceChangerParam:param];
    resolve(nil);
}

RCT_EXPORT_METHOD(setAudioEqualizerGain:(int)bandIndex
                  bandGain:(float)bandGain
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setAudioEqualizerGain. bandIndex: %d, bandGain: %0.2f", bandIndex, bandGain);
    
    [[ZegoExpressEngine sharedEngine] setAudioEqualizerGain:bandIndex bandGain:bandGain];
    resolve(nil);
}

RCT_EXPORT_METHOD(setReverbPreset:(int)preset
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setReverbPreset. preset: %d", preset);
    
    [[ZegoExpressEngine sharedEngine] setReverbPreset:(ZegoReverbPreset)preset];
    resolve(nil);
}

RCT_EXPORT_METHOD(setReverbAdvancedParam:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setReverbAdvancedParam. ");
    
    ZegoReverbAdvancedParam *param = [[ZegoReverbAdvancedParam alloc] init];
    param.roomSize = [RCTConvert float:config[@"roomSize"]];
    param.reverberance = [RCTConvert float:config[@"reverberance"]];
    param.damping = [RCTConvert float:config[@"damping"]];
    param.wetOnly = [RCTConvert BOOL:config[@"wetOnly"]];
    param.wetGain = [RCTConvert float:config[@"wetGain"]];
    param.dryGain = [RCTConvert float:config[@"dryGain"]];
    param.toneLow = [RCTConvert float:config[@"toneLow"]];
    param.toneHigh = [RCTConvert float:config[@"toneHigh"]];
    param.preDelay = [RCTConvert float:config[@"preDelay"]];
    param.stereoWidth = [RCTConvert float:config[@"stereoWidth"]];
    
    [[ZegoExpressEngine sharedEngine] setReverbAdvancedParam:param];
    resolve(nil);
}

RCT_EXPORT_METHOD(setReverbEchoParam:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setReverbAdvancedParam. ");
    
    ZegoReverbEchoParam *param = [[ZegoReverbEchoParam alloc] init];
    param.numDelays = [RCTConvert int:config[@"numDelays"]];
    param.inGain = [RCTConvert float:config[@"inGain"]];
    param.outGain = [RCTConvert float:config[@"outGain"]];
    param.delay = [RCTConvert NSArray:config[@"delay"]];
    param.decay = [RCTConvert NSArray:config[@"decay"]];
    
    [[ZegoExpressEngine sharedEngine] setReverbEchoParam:param];
    resolve(nil);
}

RCT_EXPORT_METHOD(setElectronicEffects:(BOOL)enable
                  mode:(int)mode
                  tonal:(int)tonal
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    ZGLog(@"setElectronicEffects. enable: %d, mode: %d, tonal: %d", enable, mode, tonal);
    
    [[ZegoExpressEngine sharedEngine] setElectronicEffects:enable mode:(ZegoElectronicEffectsMode)mode tonal:tonal];
    resolve(nil);
}

#pragma mark - ZegoApiEventHander
- (void)onApiCalledResult:(int)errorCode funcName:(NSString *)funcName info:(NSString *)info {
    ZGLog(@"[onApiCalledResult] error: %d, func name: %@, info: %@", errorCode, funcName, info);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"apiCalledResult")
                           body:@{@"data":@[@(errorCode),
                                            funcName,
                                            info]
        }];
    }
}


# pragma mark ZegoEventHandler

# pragma mark engine
- (void)onDebugError:(int)errorCode funcName:(NSString *)funcName info:(NSString *)info
{
    ZGLog(@"[onDebugError] error: %d, func name: %@, info: %@", errorCode, funcName, info);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"debugError")
                           body:@{@"data":@[@(errorCode),
                                            funcName,
                                            info]
        }];
    }
}

- (void)onEngineStateUpdate:(ZegoEngineState)state {
    ZGLog(@"[onEngineStateUpdate] state: %td", state);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"engineStateUpdate")
                           body:@{@"data":@[@(state)]
        }];
    }
}

# pragma mark room
- (void)onRoomStateChanged:(ZegoRoomStateChangedReason)reason errorCode:(int)errorCode extendedData:(NSDictionary *)extendedData roomID:(NSString *)roomID {
    ZGLog(@"[onRoomStateChanged] reason: %td, error: %d", reason, errorCode);
    if(self.hasListeners) {
        NSString *extendDataStr = @"";
        if(extendedData) {
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:extendedData options:0 error:0];
            extendDataStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        }
        
        [self sendEventWithName:RN_EVENT(@"roomStateChanged")
                           body:@{@"data":@[roomID,
                                            @(reason),
                                            @(errorCode),
                                            extendDataStr]
        }];
    }
}

- (void)onRoomStateUpdate:(ZegoRoomState)state errorCode:(int)errorCode extendedData:(nullable NSDictionary *)extendedData roomID:(NSString *)roomID
{
    ZGLog(@"[onRoomStateUpdate] state: %lu, error: %d", (unsigned long)state, errorCode);
    if(self.hasListeners) {
        NSString *extendDataStr = @"";
        if(extendedData) {
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:extendedData options:0 error:0];
            extendDataStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        }
        
        [self sendEventWithName:RN_EVENT(@"roomStateUpdate")
                           body:@{@"data":@[roomID,
                                            @(state),
                                            @(errorCode),
                                            extendDataStr]
        }];
    }
}

- (void)onRoomUserUpdate:(ZegoUpdateType)updateType userList:(NSArray<ZegoUser *> *)userList roomID:(NSString *)roomID
{
    ZGLog(@"[onRoomUserUpdate] update type: %lu, user list: %@, room id: %@", (unsigned long)updateType, userList, roomID);
    if(self.hasListeners) {
        NSMutableArray *userListArray = [[NSMutableArray alloc] init];
        for (ZegoUser *user in userList) {
            [userListArray addObject:@{
                @"userID": user.userID,
                @"userName": user.userName
            }];
        }
        
        [self sendEventWithName:RN_EVENT(@"roomUserUpdate")
                           body:@{@"data":@[roomID,
                                            @(updateType),
                                            userListArray]
                                                         
        }];
    }
    
}

- (void)onRoomOnlineUserCountUpdate:(int)count roomID:(NSString *)roomID
{
    ZGLog(@"[onRoomOnlineUserCountUpdate] room id: %@, count: %d", roomID, count);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"roomOnlineUserCountUpdate")
                           body:@{@"data":@[roomID,
                                            @(count)]
                                                                    
        }];
    }
}

- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType streamList:(NSArray<ZegoStream *> *)streamList extendedData:(nullable NSDictionary *)extendedData roomID:(NSString *)roomID
{
    ZGLog(@"[RoomStreamUpdate] room id: %@, update type: %lu, stream list: %@", roomID, (unsigned long)updateType, streamList);
    if(self.hasListeners) {
        NSMutableArray *streamListArray = [[NSMutableArray alloc] init];
        for (ZegoStream *stream in streamList) {
            [streamListArray addObject:@{
                @"user": @{
                    @"userID": stream.user.userID,
                    @"userName": stream.user.userName
                },
                @"streamID": stream.streamID,
                @"extraInfo": stream.extraInfo
            }];
        }
        [self sendEventWithName:RN_EVENT(@"roomStreamUpdate")
                           body:@{@"data":@[roomID,
                                            @(updateType),
                                            streamListArray]
                                                           
        }];
    }
}

- (void)onRoomTokenWillExpire:(int)remainTimeInSecond roomID:(NSString *)roomID {
    ZGLog(@"[onRoomTokenWillExpire] room id: %@, remainTimeInSecond: %d", roomID, remainTimeInSecond);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"roomTokenWillExpire")
                           body:@{@"data":@[roomID,
                                            @(remainTimeInSecond)]
                                                                    
        }];
    }
}

- (void)onRoomExtraInfoUpdate:(NSArray<ZegoRoomExtraInfo *> *)roomExtraInfoList roomID:(NSString *)roomID {
    ZGLog(@"[onRoomExtraInfoUpdate] room id: %@, roomExtraInfoList: %@", roomID, roomExtraInfoList);
    if(self.hasListeners) {
        NSMutableArray *infoListArray = [[NSMutableArray alloc] init];
        for (ZegoRoomExtraInfo *info in roomExtraInfoList) {
            [infoListArray addObject:@{
                @"updateUser": @{
                    @"userID": info.updateUser.userID,
                    @"userName": info.updateUser.userName
                },
                @"key": info.key,
                @"value": info.value,
                @"updateTime": @(info.updateTime)
            }];
        }
        [self sendEventWithName:RN_EVENT(@"roomExtraInfoUpdate")
                           body:@{@"data":@[roomID, infoListArray]
                                                           
        }];
    }
}

- (void)onRoomStreamExtraInfoUpdate:(NSArray<ZegoStream *> *)streamList roomID:(NSString *)roomID {
    ZGLog(@"[onRoomStreamExtraInfoUpdate] room id: %@, streamList: %@", roomID, streamList);
    if(self.hasListeners) {
        NSMutableArray *streamListArray = [[NSMutableArray alloc] init];
        for (ZegoStream *stream in streamList) {
            [streamListArray addObject:@{
                @"user": @{
                    @"userID": stream.user.userID,
                    @"userName": stream.user.userName
                },
                @"streamID": stream.streamID,
                @"extraInfo": stream.extraInfo
            }];
        }
        [self sendEventWithName:RN_EVENT(@"roomStreamExtraInfoUpdate")
                           body:@{@"data":@[roomID, streamListArray]
                                                           
        }];
    }
}

# pragma mark publisher
- (void)onPublisherStateUpdate:(ZegoPublisherState)state errorCode:(int)errorCode extendedData:(nullable NSDictionary *)extendedData streamID:(NSString *)streamID
{
    ZGLog(@"[onPublisherStateUpdate] state: %lu, error: %d", (unsigned long)state, errorCode);
    if(self.hasListeners) {
        NSString *extendDataStr = @"";
        if(extendedData) {
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:extendedData options:0 error:0];
            extendDataStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        }
        
        [self sendEventWithName:RN_EVENT(@"publisherStateUpdate")
                           body:@{@"data":@[streamID,
                                            @(state),
                                            @(errorCode),
                                            extendDataStr]
        }];
    }
}

- (void)onPublisherQualityUpdate:(ZegoPublishStreamQuality *)quality streamID:(NSString *)streamID
{
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"publisherQualityUpdate")
                           body:@{@"data":@[streamID,
                                            @{@"videoCaptureFPS":@(quality.videoCaptureFPS),
                                              @"videoEncodeFPS":@(quality.videoEncodeFPS),
                                              @"videoSendFPS":@(quality.videoSendFPS),
                                              @"videoKBPS":@(quality.videoKBPS),
                                              @"audioCaptureFPS":@(quality.audioCaptureFPS),
                                              @"audioSendFPS":@(quality.audioSendFPS),
                                              @"audioKBPS":@(quality.audioKBPS),
                                              @"rtt":@(quality.rtt),
                                              @"packetLostRate":@(quality.packetLostRate),
                                              @"level":@(quality.level),
                                              @"isHardwareEncode":@(quality.isHardwareEncode),
                                              @"totalSendBytes":@(quality.totalSendBytes),
                                              @"audioSendBytes":@(quality.audioSendBytes),
                                              @"videoSendBytes":@(quality.videoSendBytes)}]
        }];
    }
}

- (void)onPublisherCapturedAudioFirstFrame
{
    ZGLog(@"[onPublisherCapturedAudioFirstFrame]");
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"publisherCapturedAudioFirstFrame") body:@{@"data":@[]}];
    }
    
}

- (void)onPublisherCapturedVideoFirstFrame:(ZegoPublishChannel)channel
{
    ZGLog(@"[PublisherCapturedVideoFirstFrame] channel: %lu", (unsigned long)channel);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"publisherCapturedVideoFirstFrame") body:@{@"data":@[@(channel)]}];
    }
}

- (void)onPublisherRenderVideoFirstFrame:(ZegoPublishChannel)channel {
    ZGLog(@"[publisherRenderVideoFirstFrame] channel: %lu", (unsigned long)channel);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"publisherRenderVideoFirstFrame") body:@{@"data":@[@(channel)]}];
    }
}

- (void)onPublisherVideoSizeChanged:(CGSize)size channel:(ZegoPublishChannel)channel
{
    ZGLog(@"[onPublisherVideoSizeChanged] size: (%f, %f), channel: %lu",size.width, size.height, (unsigned long)channel);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"publisherVideoSizeChanged")
                           body:@{@"data":@[@(size.width),
                                            @(size.height),
                                            @(channel)]
                                  
                           }];
    }
}

- (void)onPublisherRelayCDNStateUpdate:(NSArray<ZegoStreamRelayCDNInfo *> *)infoList streamID:(NSString *)streamID {
    ZGLog(@"[onPublisherRelayCDNStateUpdate] stream id: %@, infoList: %@", streamID, infoList);
    if(self.hasListeners) {
        NSMutableArray *infoListArray = [[NSMutableArray alloc] init];
        for (ZegoStreamRelayCDNInfo *info in infoList) {
            [infoListArray addObject:@{
                @"url": info.url,
                @"state": @(info.state),
                @"updateReason": @(info.updateReason),
                @"stateTime": @(info.stateTime)
            }];
        }
        [self sendEventWithName:RN_EVENT(@"publisherRelayCDNStateUpdate")
                           body:@{@"data":@[streamID, infoListArray]}];
    }
}

- (void)onPublisherVideoEncoderChanged:(ZegoVideoCodecID)fromCodecID toCodecID:(ZegoVideoCodecID)toCodecID channel:(ZegoPublishChannel)channel {
    ZGLog(@"[onPublisherVideoEncoderChanged] fromCodec: %td, toCodec: %td, channel: %td", fromCodecID, toCodecID, channel);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"publisherVideoEncoderChanged")
                           body:@{@"data":@[@(fromCodecID), @(toCodecID), @(channel)]}];
    }
}

- (void)onPublisherStreamEvent:(ZegoStreamEvent)eventID streamID:(NSString *)streamID extraInfo:(NSString *)extraInfo {
    ZGLog(@"[onPublisherStreamEvent] stream id: %@, event id: %td, extraInfo: %@", streamID, eventID, extraInfo);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"publisherStreamEvent")
                           body:@{@"data":@[@(eventID), streamID, extraInfo]}];
    }
}

# pragma mark player
- (void)onPlayerStateUpdate:(ZegoPlayerState)state errorCode:(int)errorCode extendedData:(nullable NSDictionary *)extendedData streamID:(NSString *)streamID
{
    ZGLog(@"[onPlayerStateUpdate] state: %lu, error: %d", (unsigned long)state, errorCode);
    if(self.hasListeners) {
        NSString *extendDataStr = @"";
        if(extendedData) {
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:extendedData options:0 error:0];
            extendDataStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        }
        
        [self sendEventWithName:RN_EVENT(@"playerStateUpdate")
                           body:@{@"data":@[streamID,
                                            @(state),
                                            @(errorCode),
                                            extendDataStr]
                           }];
    }
}

- (void)onPlayerQualityUpdate:(ZegoPlayStreamQuality *)quality streamID:(NSString *)streamID
{
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"playerQualityUpdate")
                           body:@{@"data":@[streamID,
                                            @{@"videoRecvFPS": @(quality.videoRecvFPS),
                                              @"videoDecodeFPS": @(quality.videoDecodeFPS),
                                              @"videoRenderFPS": @(quality.videoRenderFPS),
                                              @"videoKBPS": @(quality.videoKBPS),
                                              @"audioRecvFPS": @(quality.audioRecvFPS),
                                              @"audioDecodeFPS": @(quality.audioDecodeFPS),
                                              @"audioRenderFPS": @(quality.audioRenderFPS),
                                              @"audioKBPS": @(quality.audioKBPS),
                                              @"rtt": @(quality.rtt),
                                              @"packetLostRate": @(quality.packetLostRate),
                                              @"peerToPeerPacketLostRate": @(quality.peerToPeerPacketLostRate),
                                              @"peerToPeerDelay": @(quality.peerToPeerDelay),
                                              @"level": @(quality.level),
                                              @"delay": @(quality.delay),
                                              @"isHardwareDecode": @(quality.isHardwareDecode),
                                              @"totalRecvBytes": @(quality.totalRecvBytes),
                                              @"audioRecvBytes": @(quality.audioRecvBytes),
                                              @"videoRecvBytes": @(quality.videoRecvBytes)}]
                           }];
    }
}

- (void)onPlayerMediaEvent:(ZegoPlayerMediaEvent)event streamID:(NSString *)streamID
{
    ZGLog(@"[onPlayerMediaEvent] event: %lu, stream id: %@", (unsigned long)event, streamID);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"playerMediaEvent")
                           body:@{@"data":@[streamID,
                                            @(event)]
                           }];
    }
}

- (void)onPlayerRecvAudioFirstFrame:(NSString *)streamID
{
    ZGLog(@"[onPlayerRecvAudioFirstFrame] stream id: %@", streamID);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"playerRecvAudioFirstFrame")
                           body:@{@"data":@[streamID]}];
    }
}

- (void)onPlayerRecvVideoFirstFrame:(NSString *)streamID
{
    ZGLog(@"[onPlayerRecvVideoFirstFrame] stream id: %@", streamID);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"playerRecvVideoFirstFrame")
                           body:@{@"data":@[streamID]}];
    }
}

- (void)onPlayerRenderVideoFirstFrame:(NSString *)streamID
{
    ZGLog(@"[onPlayerRenderVideoFirstFrame] stream id: %@", streamID);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"playerRenderVideoFirstFrame")
                           body:@{@"data":@[streamID]}];
    }
}

- (void)onPlayerVideoSizeChanged:(CGSize)size streamID:(NSString *)streamID
{
    ZGLog(@"[onPlayerVideoSizeChanged] size: (%f, %f), stream id: %@", size.width, size.height, streamID);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"playerVideoSizeChanged")
                           body:@{@"data":@[streamID,
                                            @(size.width),
                                            @(size.height)]
                           }];
    }
}

# pragma mark device
- (void)onCapturedSoundLevelUpdate:(NSNumber *)soundLevel
{
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"capturedSoundLevelUpdate")
                           body:@{@"data":@[soundLevel]}];
    }
}

- (void)onRemoteSoundLevelUpdate:(NSDictionary<NSString *, NSNumber *> *)soundLevels
{
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"remoteSoundLevelUpdate")
                           body:@{@"data":@[soundLevels]}];
    }
}

- (void)onLocalDeviceExceptionOccurred:(ZegoDeviceExceptionType)exceptionType deviceType:(ZegoDeviceType)deviceType deviceID:(NSString *)deviceID
{
    ZGLog(@"[onLocalDeviceExceptionOccurred] exceptionType: %td, deviceType: %td, deviceID: %@", exceptionType, deviceType, deviceID);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"localDeviceExceptionOccurred")
                           body:@{@"data":@[@(exceptionType),
                                            @(deviceType),
                                            deviceID]
                           }];
    }
}

- (void)onRemoteCameraStateUpdate:(ZegoRemoteDeviceState)state streamID:(NSString *)streamID
{
    ZGLog(@"[onRemoteCameraStateUpdate] state: %lu, stream id: %@", (unsigned long)state, streamID);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"remoteCameraStateUpdate")
                           body:@{@"data":@[streamID,
                                            @(state)]
                           }];
    }
}

- (void)onRemoteMicStateUpdate:(ZegoRemoteDeviceState)state streamID:(NSString *)streamID
{
    ZGLog(@"[onRemoteMicStateUpdate] state: %lu, stream id: %@", (unsigned long)state, streamID);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"remoteMicStateUpdate")
                           body:@{@"data":@[streamID,
                                            @(state)]
                           }];
    }
}

- (void)onAudioRouteChange:(ZegoAudioRoute)audioRoute
{
    ZGLog(@"[onAudioRouteChange] audioRoute: %lu", (unsigned long)audioRoute);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"audioRouteChange")
                           body:@{@"data":@[@(audioRoute)]
                           }];
    }
}

#pragma mark IM

- (void)onIMRecvBroadcastMessage:(NSArray<ZegoBroadcastMessageInfo *> *)messageList roomID:(NSString *)roomID
{
    ZGLog(@"[onIMRecvBroadcastMessage] message list: %@, room id: %@", messageList, roomID);
    if(self.hasListeners) {
        NSMutableArray *messageListArray = [[NSMutableArray alloc] init];
        for (ZegoBroadcastMessageInfo *info in messageList) {
            [messageListArray addObject:@{
                @"message": info.message,
                @"messageID": @(info.messageID),
                @"sendTime": @(info.sendTime),
                @"fromUser": @{
                    @"userID": info.fromUser.userID,
                    @"userName": info.fromUser.userName
                }
            }];
        }
        [self sendEventWithName:RN_EVENT(@"IMRecvBroadcastMessage")
                           body:@{@"data":@[roomID,
                                            messageListArray]
                           }];
    }
}

- (void)onIMRecvBarrageMessage:(NSArray<ZegoBarrageMessageInfo *> *)messageList roomID:(NSString *)roomID
{
    ZGLog(@"[onIMRecvBarrageMessage] message list: %@, room id: %@", messageList, roomID);
    if(self.hasListeners) {
        NSMutableArray *messageListArray = [[NSMutableArray alloc] init];
        for (ZegoBarrageMessageInfo *info in messageList) {
            [messageListArray addObject:@{
                @"message": info.message,
                @"messageID": info.messageID,
                @"sendTime": @(info.sendTime),
                @"fromUser": @{
                    @"userID": info.fromUser.userID,
                    @"userName": info.fromUser.userName
                }
            }];
        }
        [self sendEventWithName:RN_EVENT(@"IMRecvBarrageMessage")
                           body:@{@"data":@[roomID,
                                            messageListArray]
                           }];
    }
}

- (void)onIMRecvCustomCommand:(NSString *)command fromUser:(ZegoUser *)fromUser roomID:(NSString *)roomID
{
    ZGLog(@"[onIMRecvCustomCommand] command: %@, from user: %@, room id: %@", command, fromUser, roomID);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"IMRecvCustomCommand")
                           body:@{@"data":@[roomID,
                                            @{@"userID": fromUser.userID,
                                              @"userName": fromUser.userName
                                            },
                                            command]
                           }];
    }
}

# pragma mark Mixer

- (void)onMixerRelayCDNStateUpdate:(NSArray<ZegoStreamRelayCDNInfo *> *)infoList taskID:(NSString *)taskID {
    ZGLog(@"[onMixerRelayCDNStateUpdate] infoList: %@, taskID: %@", infoList, taskID);
    if(self.hasListeners) {
        NSMutableArray *infoListArray = [[NSMutableArray alloc] init];
        for (ZegoStreamRelayCDNInfo *info in infoList) {
            [infoListArray addObject:@{
                @"url": info.url,
                @"state": @(info.state),
                @"updateReason": @(info.updateReason),
                @"stateTime": @(info.stateTime)
            }];
        }
        
        [self sendEventWithName:RN_EVENT(@"mixerRelayCDNStateUpdate")
                           body:@{@"data":@[taskID,
                                            infoListArray]
                           }];
    }
}

- (void)onMixerSoundLevelUpdate:(NSDictionary<NSNumber *, NSNumber *> *)soundLevels {
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"mixerSoundLevelUpdate")
                           body:@{@"data":@[soundLevels]}];
    }
}

# pragma mark MediaPlayer

- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer stateUpdate:(ZegoMediaPlayerState)state errorCode:(int)errorCode
{
    ZGLog(@"[onMediaPlayerStateUpdate] player: %@, state: %lu, error: %d", mediaPlayer, (unsigned long)state, errorCode);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"mediaPlayerStateUpdate")
                           body:@{@"data": @[@(state),
                                             @(errorCode)],
                                  @"idx": mediaPlayer.index
                           }];
    }
}

- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer networkEvent:(ZegoMediaPlayerNetworkEvent)networkEvent
{
    ZGLog(@"[onMediaPlayerNetworkEvent] player: %@, event: %lu", mediaPlayer, (unsigned long)networkEvent);
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"mediaPlayerNetworkEvent")
                           body:@{@"data": @[@(networkEvent)],
                                  @"idx": mediaPlayer.index
                           }];
    }
}

- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer playingProgress:(unsigned long long)millisecond
{
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"mediaPlayerPlayingProgress")
                           body:@{@"data": @[@(millisecond)],
                                  @"idx": mediaPlayer.index
                           }];
    }
}

# pragma mark audio
- (void)audioEffectPlayer:(ZegoAudioEffectPlayer *)audioEffectPlayer audioEffectID:(unsigned int)audioEffectID playStateUpdate:(ZegoAudioEffectPlayState)state errorCode:(int)errorCode {
  if (self.hasListeners) {
    [self sendEventWithName:RN_EVENT(@"audioEffectPlayerStateUpdate")
                       body:@{
                         @"data": @[@(audioEffectID), @(state), @(errorCode)],
                         @"idx": audioEffectPlayer.getIndex
                       }];
  }
}

#pragma mark - Network Speed Test
- (void)onNetworkSpeedTestError:(int)errorCode type:(ZegoNetworkSpeedTestType)type {
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"networkSpeedTestError")
                           body:@{@"data":@[@(errorCode), @(type)]}];
    }
}

- (void)onNetworkSpeedTestQualityUpdate:(ZegoNetworkSpeedTestQuality *)quality type:(ZegoNetworkSpeedTestType)type {
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"networkSpeedTestQualityUpdate")
                           body:@{@"data":@[@{
                               @"connectCost": @(quality.connectCost),
                               @"rtt": @(quality.rtt),
                               @"packetLostRate": @(quality.packetLostRate),
                               @"quality": @(quality.quality)
                           }, @(type)]}];
    }
}

- (void)onNetworkQuality:(NSString *)userID upstreamQuality:(ZegoStreamQualityLevel)upstreamQuality downstreamQuality:(ZegoStreamQualityLevel)downstreamQuality {
    if(self.hasListeners) {
        [self sendEventWithName:RN_EVENT(@"networkQuality")
                           body:@{@"data":@[userID, @(upstreamQuality), @(downstreamQuality)]}];
    }
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[
      RN_EVENT(@"debugError"),
      RN_EVENT(@"apiCalledResult"),
      RN_EVENT(@"engineStateUpdate"),
      RN_EVENT(@"roomStateChanged"),
      RN_EVENT(@"roomStateUpdate"),
      RN_EVENT(@"roomUserUpdate"),
      RN_EVENT(@"roomOnlineUserCountUpdate"),
      RN_EVENT(@"roomStreamUpdate"),
      RN_EVENT(@"roomTokenWillExpire"),
      RN_EVENT(@"roomExtraInfoUpdate"),
      RN_EVENT(@"roomStreamExtraInfoUpdate"),
      RN_EVENT(@"publisherStateUpdate"),
      RN_EVENT(@"publisherQualityUpdate"),
      RN_EVENT(@"publisherCapturedAudioFirstFrame"),
      RN_EVENT(@"publisherCapturedVideoFirstFrame"),
      RN_EVENT(@"publisherRenderVideoFirstFrame"),
      RN_EVENT(@"publisherRelayCDNStateUpdate"),
      RN_EVENT(@"publisherVideoSizeChanged"),
      RN_EVENT(@"publisherVideoEncoderChanged"),
      RN_EVENT(@"publisherStreamEvent"),
      RN_EVENT(@"playerStateUpdate"),
      RN_EVENT(@"playerQualityUpdate"),
      RN_EVENT(@"playerMediaEvent"),
      RN_EVENT(@"playerRecvAudioFirstFrame"),
      RN_EVENT(@"playerRecvVideoFirstFrame"),
      RN_EVENT(@"playerRenderVideoFirstFrame"),
      RN_EVENT(@"playerVideoSizeChanged"),
      RN_EVENT(@"capturedSoundLevelUpdate"),
      RN_EVENT(@"remoteSoundLevelUpdate"),
      RN_EVENT(@"localDeviceExceptionOccurred"),
      RN_EVENT(@"remoteCameraStateUpdate"),
      RN_EVENT(@"remoteMicStateUpdate"),
      RN_EVENT(@"audioRouteChange"),
      RN_EVENT(@"mediaPlayerStateUpdate"),
      RN_EVENT(@"mediaPlayerNetworkEvent"),
      RN_EVENT(@"mediaPlayerPlayingProgress"),
      RN_EVENT(@"audioEffectPlayerStateUpdate"),
      RN_EVENT(@"IMRecvBroadcastMessage"),
      RN_EVENT(@"IMRecvBarrageMessage"),
      RN_EVENT(@"IMRecvCustomCommand"),
      RN_EVENT(@"mixerRelayCDNStateUpdate"),
      RN_EVENT(@"mixerSoundLevelUpdate"),
      RN_EVENT(@"networkSpeedTestError"),
      RN_EVENT(@"networkSpeedTestQualityUpdate"),
      RN_EVENT(@"networkQuality")
      ];
}


@end
