import { mockFn } from "./mock";
declare global {
    interface Window {
        conductedTests: any[];
    }
}
declare const conductedTests: any[];
declare function beforeEach(callback: any): void;
declare function describe(description?: string, callback?: () => void): {
    description: string;
    tests: any[];
};
declare function it(description?: string, callback?: () => void, captureError?: (e: any) => never): any;
declare function expect(result: any): any;
export { it, expect, beforeEach, mockFn, describe, conductedTests };
//# sourceMappingURL=index.d.ts.map