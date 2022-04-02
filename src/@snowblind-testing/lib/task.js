import { currIt } from "./side-effects.js";
import { stats } from "./test.js";
class Task {
    constructor(fn, resultObject, async = false, opposite = false, registerResult = false) {
        this._isFinished = false;
        this.isAsync = false;
        this.wasOpposite = false;
        this.finishCallbacks = [];
        this._isFinished = false;
        this.properties = {};
        this.wasOpposite = opposite;
        this.isAsync = async;
        this.fn = fn;
        this.expected = resultObject.expected;
        this.args = resultObject.args;
        this.register = registerResult;
    }
    resolve() {
        // Check whether this.result.pass is true or false.
        let pass = this.wasOpposite ? !this.result.pass : this.result.pass;
        if (this.result && this.register) {
            this.info.name = this.result.message;
            this.info.awaiting = false;
            this.info.status = pass;
            stats.total++;
            if (pass)
                stats.passed++;
            else
                stats.failed++;
        }
        this._isFinished = true;
        this.finishCallbacks.map(x => x(this.result));
    }
    run() {
        if (this.register) {
            this.info = {
                name: "",
                status: false,
                awaiting: true,
                async: this.isAsync
            };
            currIt.current.expects.push(this.info);
        }
        if (this.isAsync) {
            // Wait for the result to resolve
            this.expected.then((result) => {
                this.result = this.fn(result, ...this.args);
                this.resolve();
            }).catch((err) => {
                throw new Error(err.message);
            });
        }
        else {
            this.result = this.fn(this.expected, ...this.args);
            this.resolve();
        }
    }
    get isFinished() {
        return this._isFinished;
    }
    onDidFinish(callback) {
        this.finishCallbacks.push(callback);
    }
}
export { Task };
