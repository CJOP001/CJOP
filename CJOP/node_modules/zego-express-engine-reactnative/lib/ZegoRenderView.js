import React, { Component } from 'react';
import { requireNativeComponent, Platform, View } from 'react-native';
const ZegoSurfaceViewManager = Platform.select({
    ios: View,
    android: requireNativeComponent('RCTZegoSurfaceView'), // * android.view.SurfaceView
});
const ZegoTextureViewManager = Platform.select({
    ios: View,
    android: requireNativeComponent('RCTZegoTextureView'), // * android.view.TextureView
});
export class ZegoSurfaceView extends Component {
    render() {
        return (<ZegoSurfaceViewManager {...this.props}/>);
    }
}
export class ZegoTextureView extends Component {
    render() {
        return (<ZegoTextureViewManager {...this.props}/>);
    }
}
