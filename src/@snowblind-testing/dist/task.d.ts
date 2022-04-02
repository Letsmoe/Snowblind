/**
 * NOTE: Tasks should register once they are being initialized.
 * Test Results may only be shown once every task iś finished.
 * In the meantime show a spinner at the left side to signal a running task.
 */
interface ResultObject {
    pass: boolean;
    message: string;
}
declare class Task {
    private finishCallbacks;
    private _isFinished;
    properties: {};
    isAsync: boolean;
    wasOpposite: boolean;
    fn: Function;
    result: ResultObject;
    expected: any;
    register: boolean;
    args: any[];
    info: {
        name: string;
        awaiting: boolean;
        status: boolean;
        async: boolean;
    };
    constructor(fn: Function, resultObject: {
        args: any[];
        expected: any;
    }, async?: boolean, opposite?: boolean, registerResult?: boolean);
    resolve(): void;
    run(): void;
    get isFinished(): boolean;
    onDidFinish(callback: Function): void;
}
export { Task };
//# sourceMappingURL=task.d.ts.map