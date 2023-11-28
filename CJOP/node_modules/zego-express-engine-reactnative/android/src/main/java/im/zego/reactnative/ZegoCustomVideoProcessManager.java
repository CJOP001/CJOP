package im.zego.reactnative;

import im.zego.zegoexpress.ZegoExpressEngine;
import im.zego.zegoexpress.callback.IZegoCustomVideoProcessHandler;
import im.zego.zegoexpress.constants.ZegoPublishChannel;

public class ZegoCustomVideoProcessManager {

    private static ZegoCustomVideoProcessManager singleton;

    private IZegoReactNativeCustomVideoProcessHandler mHandler;

    /**
     * Get the custom video capture manager instance
     */
    public static synchronized ZegoCustomVideoProcessManager getInstance() {
        if (singleton == null) {
            singleton = new ZegoCustomVideoProcessManager();
        }
        return singleton;
    }

    public void setCustomVideoProcessHandler(IZegoReactNativeCustomVideoProcessHandler handler) {
        mHandler = handler;
    }

    public IZegoCustomVideoProcessHandler rtcVideoProcessHandler = new IZegoCustomVideoProcessHandler() {

        @Override
        public void onStart(ZegoPublishChannel channel) {
            super.onStart(channel);

            if (mHandler != null) {
                mHandler.onStart(channel.value());
            }
        }

        @Override
        public void onStop(ZegoPublishChannel channel) {
            super.onStop(channel);

            if (mHandler != null) {
                mHandler.onStop(channel.value());
            }
        }

        @Override
        public void onCapturedUnprocessedTextureData(int textureID, int width, int height, long referenceTimeMillisecond, ZegoPublishChannel channel) {
            super.onCapturedUnprocessedTextureData(textureID, width, height, referenceTimeMillisecond, channel);

            if (mHandler != null) {
                textureID = mHandler.onProcessImage(textureID, width, height);
            }

            ZegoExpressEngine.getEngine().sendCustomVideoProcessedTextureData(textureID, width, height, referenceTimeMillisecond, channel);
        }
    };
}
