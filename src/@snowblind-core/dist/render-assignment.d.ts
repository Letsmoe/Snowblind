import { SnowblindComponent } from "./types";
export default class RenderAssignment {
    _wasDestroyed: boolean;
    _renderIsFirstTime: boolean;
    _maxCopies: number;
    _copiesKeptAlive: number;
    _lastNode: HTMLElement;
    _Node: HTMLElement;
    Object: SnowblindComponent;
    constructor(obj: SnowblindComponent, options?: {
        replace?: HTMLElement;
    });
    Render(): void;
    reinitialize(): void;
    Destroy(): void;
}
//# sourceMappingURL=render-assignment.d.ts.map