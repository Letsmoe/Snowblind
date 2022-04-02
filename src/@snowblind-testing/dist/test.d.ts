declare var stats: {
    describes: any[];
    failed: number;
    passed: number;
    total: number;
};
declare function expect(result: any, register?: boolean): any;
declare function it(desc: string, fn: Function): void;
declare function describe(desc: string, fn: Function): void;
export { describe, it, expect, stats, };
//# sourceMappingURL=test.d.ts.map