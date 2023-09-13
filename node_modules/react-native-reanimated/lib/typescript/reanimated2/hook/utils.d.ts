import type { Context, NestedObjectValues, WorkletFunction, AnimationObject } from '../commonTypes';
import type { AnimatedStyle } from '../helperTypes';
import type { DependencyList } from './commonTypes';
import type { NativeSyntheticEvent } from 'react-native';
interface Handler<T, TContext extends Context> extends WorkletFunction {
    (event: T, context: TContext): void;
}
interface Handlers<T, TContext extends Context> {
    [key: string]: Handler<T, TContext> | undefined;
}
type useEventType = <T extends object>(handler: (e: T) => void, eventNames?: string[], rebuild?: boolean) => (e: NativeSyntheticEvent<T>) => void;
export declare const useEvent: useEventType;
type useHandlerType = <T, TContext extends Context = Record<string, never>>(handlers: Handlers<T, TContext>, deps?: DependencyList) => {
    context: TContext;
    doDependenciesDiffer: boolean;
    useWeb: boolean;
};
export declare const useHandler: useHandlerType;
export declare function buildWorkletsHash(handlers: Record<string, WorkletFunction> | Array<WorkletFunction>): string;
export declare function isAnimated(prop: NestedObjectValues<AnimationObject>): boolean;
export declare function shallowEqual(a: any, b: any): boolean;
export declare const validateAnimatedStyles: (styles: AnimatedStyle<any>) => void;
export {};
