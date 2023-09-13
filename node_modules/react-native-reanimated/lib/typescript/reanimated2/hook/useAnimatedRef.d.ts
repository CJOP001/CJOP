import type { Component } from 'react';
import type { AnimatedRef } from './commonTypes';
interface MaybeScrollableComponent extends Component {
    getNativeScrollRef?: any;
    getScrollableNode?: any;
}
export declare function useAnimatedRef<T extends MaybeScrollableComponent>(): AnimatedRef<T>;
export {};
