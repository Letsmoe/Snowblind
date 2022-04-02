import {currIt} from "./side-effects.js";
import {stats} from "./test.js";

/**
 * NOTE: Tasks should register once they are being initialized.
 * Test Results may only be shown once every task iś finished. 
 * In the meantime show a spinner at the left side to signal a running task.
 */

interface ResultObject {
	pass: boolean;
	message: string;
}

class Task {
	private finishCallbacks : Array<Function>;
	private _isFinished : boolean = false;
	public properties: {};
	public isAsync: boolean = false;
	public wasOpposite: boolean = false;
	public fn: Function;
	public result : ResultObject;
	public expected: any;
	public register:boolean;
	public args: any[];
	public info: {name: string, awaiting: boolean, status: boolean, async: boolean};
	constructor(fn: Function, resultObject : {args: any[], expected: any}, async: boolean = false, opposite: boolean = false, registerResult: boolean = false) {
		this.finishCallbacks = []
		this._isFinished = false;
		this.properties = {};

		this.wasOpposite = opposite;
		this.isAsync = async;
		this.fn = fn;
		this.expected = resultObject.expected;
		this.args = resultObject.args;
		this.register = registerResult;
	}

	resolve(): void {
		// Check whether this.result.pass is true or false.
		let pass = this.wasOpposite ? !this.result.pass : this.result.pass;

		if (this.result && this.register) {
			this.info.name = this.result.message;
			this.info.awaiting = false;
			this.info.status = pass;
			stats.total++;
			if (pass) stats.passed++
			else stats.failed++
		}

		this._isFinished = true;
		this.finishCallbacks.map(x => x(this.result))
	}

	run(): void {
		if (this.register) {
			this.info = {
				name: "",
				status: false,
				awaiting: true,
				async: this.isAsync
			}

			currIt.current.expects.push(this.info);
		}

		if (this.isAsync) {
			// Wait for the result to resolve
			this.expected.then((result: ResultObject) => {
				this.result = this.fn(result, ...this.args)
				this.resolve()
			}).catch((err : Error) => {
				throw new Error(err.message);
			})
		} else {
			this.result = this.fn(this.expected, ...this.args)
			this.resolve()
		}
	}

	get isFinished() {
		return this._isFinished;
	}

	onDidFinish(callback : Function) {
		this.finishCallbacks.push(callback);
	}
}

export {Task}