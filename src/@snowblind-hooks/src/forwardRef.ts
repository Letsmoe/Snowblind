import { SnowblindRef } from "@snowblind/core"

function forwardRef(callback : Function) {
	return (props : Object, ref : SnowblindRef) => {
		return callback(props, ref)
	}
}

export {forwardRef}