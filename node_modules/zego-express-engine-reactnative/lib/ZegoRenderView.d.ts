import { Component } from 'react';
import { ViewProps } from 'react-native';
export interface SurfaceViewProps extends ViewProps {
    zOrderMediaOverlay?: boolean;
    zOrderOnTop?: boolean;
}
export declare class ZegoSurfaceView extends Component<SurfaceViewProps, {}> {
    render(): any;
}
export declare class ZegoTextureView extends Component<{}> {
    render(): any;
}
