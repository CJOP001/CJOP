import type { Animation, AnimationCallback, AnimatableValue, Timestamp } from '../commonTypes';
interface DecayConfig {
    deceleration?: number;
    velocityFactor?: number;
    clamp?: number[];
    velocity?: number;
}
export type WithDecayConfig = DecayConfig;
export interface DecayAnimation extends Animation<DecayAnimation> {
    lastTimestamp: Timestamp;
    startTimestamp: Timestamp;
    initialVelocity: number;
    velocity: number;
    current: AnimatableValue;
}
type withDecayType = (userConfig: DecayConfig, callback?: AnimationCallback) => number;
export declare const withDecay: withDecayType;
export {};
