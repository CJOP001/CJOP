import type { StyleLayoutAnimation } from './commonTypes';
import type { SharedValue, AnimatableValue, AnimationObject } from '../commonTypes';
export declare function initialUpdaterRun<T>(updater: () => T): T;
type AnimationToDecoration<T extends AnimationObject | StyleLayoutAnimation, U extends AnimationObject | StyleLayoutAnimation> = T extends StyleLayoutAnimation ? Record<string, unknown> : U | (() => U) | AnimatableValue;
export declare function defineAnimation<T extends AnimationObject | StyleLayoutAnimation, // type that's supposed to be returned
U extends AnimationObject | StyleLayoutAnimation = T>(starting: AnimationToDecoration<T, U>, factory: () => T): T;
export declare function cancelAnimation<T>(sharedValue: SharedValue<T>): void;
export {};
