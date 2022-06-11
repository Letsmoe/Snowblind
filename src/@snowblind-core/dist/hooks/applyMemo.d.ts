/**
 * Creates a memoized state meaning it will only trigger a rerender once one of it's dependencies change reducing the amount of cycles per update.
 * @param callback A callback function, run once a dependency changes
 * @param dependencies A list of dependencies to observe for changes, once they change, they'll trigger a render cycle.
 * @returns A ValueBinder containing the newest information about the callbacks result.
 */
declare function applyMemo(callback: Function, dependencies: Array<any>): any;
export { applyMemo };
//# sourceMappingURL=applyMemo.d.ts.map