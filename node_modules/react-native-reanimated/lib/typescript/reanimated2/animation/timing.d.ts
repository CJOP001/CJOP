import type { EasingFunction, EasingFunctionFactory } from '../Easing';
import type { Animation, AnimationCallback, Timestamp, AnimatableValue } from '../commonTypes';
interface TimingConfig {
    duration?: number;
    easing?: EasingFunction | EasingFunctionFactory;
}
export type WithTimingConfig = TimingConfig;
export interface TimingAnimation extends Animation<TimingAnimation> {
    type: string;
    easing: EasingFunction;
    startValue: AnimatableValue;
    startTime: Timestamp;
    progress: number;
    toValue: AnimatableValue;
    current: AnimatableValue;
}
type withTimingType = <T extends AnimatableValue>(toValue: T, userConfig?: TimingConfig, callback?: AnimationCallback) => T;
export declare const withTiming: withTimingType;
export {};
