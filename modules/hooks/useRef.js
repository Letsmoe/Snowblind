function useRef() {
	class SnowblindRef {
		constructor() {
			this.current = undefined;
		}
	}
	return new SnowblindRef();
}

export {useRef};