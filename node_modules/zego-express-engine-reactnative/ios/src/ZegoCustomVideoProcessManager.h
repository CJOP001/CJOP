//
//  ZegoCustomVideoProcessManager.h
//  react-native-zego-express-engine
//
//  Created by zego on 2022/1/7.
//

#import <Foundation/Foundation.h>
#import <CoreVideo/CoreVideo.h>
#import <CoreMedia/CoreMedia.h>
#import <ZegoExpressEngine/ZegoExpressEngine.h>

NS_ASSUME_NONNULL_BEGIN

@protocol ZegoReactNativeCustomVideoProcessHandler <NSObject>

@optional

- (void)onStart:(int)channel;

- (void)onStop:(int)channel;

- (void)onProcessImageBuffer:(CVPixelBufferRef)buffer;

@end

@interface ZegoCustomVideoProcessManager : NSObject <ZegoCustomVideoProcessHandler>

+ (instancetype)sharedInstance;

/// Sets up the event callback handler for custom video processing.
///
/// Available since: 2.2.0 (Android/iOS/macOS native), 2.4.0 (Windows/macOS C++).
/// Description: When the developer opens the custom pre-processing, by calling [setCustomVideoProcessHandler], you can set the custom video pre-processing callback to obtain the original video data.
/// Use cases: After the developer collects the video data by himself or obtains the video data collected by the SDK, if the basic beauty and watermark functions of the SDK cannot meet the needs of the developer (for example, the beauty effect cannot meet the expectations), the ZegoEffects SDK can be used to perform the video Some special processing, such as beautifying, adding pendants, etc., this process is the pre-processing of custom video.
/// When to call: Called before [startPreview] and [startPublishingStream], otherwise it may cause the timing of obtaining video data to be too slow.
/// Restrictions: None.
/// Related APIs: Call [enableCustomVideoProcessing] function to enable custom video pre-processing callback.
///
/// @param handler Custom video process handler.Required: Yes.
- (void)setCustomVideoProcessHandler:(nullable id<ZegoReactNativeCustomVideoProcessHandler>)handler;


@end

NS_ASSUME_NONNULL_END
