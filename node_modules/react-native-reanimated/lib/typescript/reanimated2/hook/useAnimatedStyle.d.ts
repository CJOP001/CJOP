import type { MutableRefObject } from 'react';
import type { DependencyList } from './commonTypes';
import type { ViewDescriptorsSet, ViewRefSet } from '../ViewDescriptorsSet';
import type { ImageStyle, RegisteredStyle, TextStyle, ViewStyle } from 'react-native';
import type { AnimatedStyle } from '../helperTypes';
export interface AnimatedStyleResult {
    viewDescriptors: ViewDescriptorsSet;
    initial: AnimatedStyle<any>;
    viewsRef: ViewRefSet<any>;
    animatedStyle?: MutableRefObject<AnimatedStyle<any>>;
}
export type AnimatedStyleProp<T> = AnimatedStyle<T> | RegisteredStyle<AnimatedStyle<T>>;
type useAnimatedStyleType = <T extends AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>>(updater: () => T, deps?: DependencyList | null) => T;
export declare const useAnimatedStyle: useAnimatedStyleType;
export {};
