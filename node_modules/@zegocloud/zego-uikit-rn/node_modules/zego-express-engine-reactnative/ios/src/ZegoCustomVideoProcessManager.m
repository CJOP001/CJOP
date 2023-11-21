//
//  ZegoCustomVideoProcessManager.m
//  react-native-zego-express-engine
//
//  Created by zego on 2022/1/7.
//

#import "ZegoCustomVideoProcessManager.h"

@interface ZegoCustomVideoProcessManager ()

@property (nonatomic, weak) id<ZegoReactNativeCustomVideoProcessHandler> handler;

@end

@implementation ZegoCustomVideoProcessManager

+ (instancetype)sharedInstance {
    static ZegoCustomVideoProcessManager *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[ZegoCustomVideoProcessManager alloc] init];
    });
    return instance;
}

- (void)setCustomVideoProcessHandler:(id<ZegoReactNativeCustomVideoProcessHandler>)handler {
    self.handler = handler;
}

#pragma mark - ZegoCustomVideoProcessHandler
- (void)onCapturedUnprocessedCVPixelBuffer:(CVPixelBufferRef)buffer timestamp:(CMTime)timestamp channel:(ZegoPublishChannel)channel {
    if ([self.handler respondsToSelector:@selector(onProcessImageBuffer:)]) {
        [self.handler onProcessImageBuffer:buffer];
    }
    [[ZegoExpressEngine sharedEngine] sendCustomVideoProcessedCVPixelBuffer:buffer timestamp:timestamp channel:channel];
}

- (void)onStart:(ZegoPublishChannel)channel {
    if ([self.handler respondsToSelector:@selector(onStart:)]) {
        [self.handler onStart:(int)channel];
    }
}

- (void)onStop:(ZegoPublishChannel)channel {
    if ([self.handler respondsToSelector:@selector(onStop:)]) {
        [self.handler onStop:(int)channel];
    }
}

@end
