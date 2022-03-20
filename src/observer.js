class Observer {
	/**
	 * Instantiates a proxy based on a passed object supporting rerendering of components.
	 * @param {object} value The object a proxy should be attached to.
	 */
	constructor(value, onlyHasValue = false) {
		this.ID = Math.random().toString(36).substring(2, 15);
		this.boundRender = undefined
		const _Handler = {
			get(target, key) {
				if (key == '__isProxy') {
					return true
				}

				const prop = target[key];
				if (typeof prop == 'undefined') {
					return
				}

				// set value as proxy if object
				if (prop !== null) {
					var constructor = prop.constructor;
					if (!prop.__isProxy && constructor && ((constructor === ({}).constructor) || (constructor === ([]).constructor))) {
						target[key] = new Proxy(prop, _Handler);
					}
				}

				return target[key];
			},
			set: (x, y, z) => {
				try {
					x[y] = JSON.parse(z)
				} catch (e) {
					x[y] = z
				}
				if (this.boundRender) {
					if (this.debounce) {
						window.cancelAnimationFrame(this.debounce);
					}
					this.debounce = window.requestAnimationFrame(() => {
						this.boundRender.Render()
					})
				}
				return true
			}
		}
		this._value = new Proxy(value, _Handler);
		if (onlyHasValue === true) {
			this._value.toString = () => {
				return this._value.value
			}
		}
	}
}

export {
	Observer
}