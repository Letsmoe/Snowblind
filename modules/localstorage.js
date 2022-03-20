(() => {
	/**
	 * List of watched keys and callbacks.
	 */
	const localStorageWatchKeys = {};
	const originalGetItem = localStorage.getItem.bind(localStorage)
	const originalSetItem = localStorage.setItem.bind(localStorage)
	const originalRemoveItem = localStorage.removeItem.bind(localStorage)

	localStorage.__proto__.watchItem = (key, callbacks, optionalConvertTo = "string", fallback = {}) => {
		const callbackFunction = (evt, data) => {
			if (callbacks[evt.type]) {
				callbacks[evt.type](evt, data)
			}
		}

		if (localStorageWatchKeys[key]) {
			/**
			 * Add to existing array
			 */
			localStorageWatchKeys[key].push(callbackFunction)
		} else {
			/**
			 * Create array first time
			 */
			localStorageWatchKeys[key] = [callbackFunction]
		}

		var result = localStorage.getItem(key);
		if (optionalConvertTo === "object") {
			try {
				result = JSON.parse(result);
			} catch (e) {
				console.error("Error parsing JSON, continuing with fallback.")
				result = fallback;
			}
		} else if (optionalConvertTo === "number") {
			result = parseFloat(result);
		}

		return result;
	}

	localStorage.removeItem = function (key) {
		var oldValue = originalGetItem(key);
		originalRemoveItem(key);
		if (localStorageWatchKeys.hasOwnProperty(key)) {
			var callbackEvent = new Event("removeItem");
			localStorageWatchKeys[key].map(callback => callback(callbackEvent, {
				key: key,
				oldValue: oldValue
			}))
		}
	}

	/**
	 * Set an item on the localStorage object, calling optional event handling.
	 * @param {String} key Key to set value on
	 * @param {Any} value Value to set
	 */
	localStorage.setItem = function (key, value) {
		var oldValue = originalGetItem(key);
		originalSetItem(key, value);
		if (localStorageWatchKeys.hasOwnProperty(key)) {
			var callbackEvent = new Event("setItem");
			localStorageWatchKeys[key].map(callback => callback(callbackEvent, {
				key: key,
				newValue: value,
				oldValue: oldValue
			}))
		}
	}
	/**
	 * Modified getItem method, use it to enable localStorage watching.
	 * @param {String} key Key to retrieve from localStorage
	 */
	localStorage.getItem = (key) => {
		var result = originalGetItem(key);
		if (localStorageWatchKeys.hasOwnProperty(key)) {
			var callbackEvent = new Event("getItem");
			localStorageWatchKeys[key].map(callback => callback(callbackEvent, {
				key: key,
				value: result
			}))
		}
	}
	return localStorage
})()

export default localStorage