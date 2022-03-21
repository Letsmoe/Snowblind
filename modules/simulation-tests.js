class Simulation {
	constructor() {

	}

	_convertScreen(x, axis = "y") {
		return x + (axis == "y" ? window.scrollY : window.scrollX);
	}

	mouseClick(options = {}) {
		let x,y, element;
		if (options.coordinates) {
			x = options.coordinates[0];
			y = options.coordinates[1];
		}
		if (options.element) {
			// Get x and y values somewhere inside the given element.
			let bBox = options.element.getBoundingClientRect();
			x = getNumberIn(bBox.x, bBox.x + bBox.width);
			y = getNumberIn(bBox.y, bBox.y + bBox.height);
			element = options.element
		} else {
			element = document.body
		}
		if (!x && !y) {
			// Check if x and y were assigned.
			throw new Error("Either `element` or `coordinates` must be provided.")
		}

		let evt = getMouseEvent("click", this._convertScreen(x), this._convertScreen(y), x, y);
		dispatchEvent(element, evt);
	}

	moveMouse(fromX, fromY, toX, toY, options = {}) {
		options = Object.assign({
			random: true,
			stepSize: 5,
			deviation: 10,
			duration: 500
		}, options)

		const stepSize = options.stepSize;

		const xDifference = toX - fromX;
		const yDifference = toY - fromY;

		const lDifference = Math.sqrt((xDifference) ** 2 + (yDifference) ** 2);
		const stepCount = Math.ceil(lDifference / stepSize);

		/**
		 * Randomify a value so mousemove events won't seem like a computer pulled them.
		 * @param {number} x The number to pull off a random amount of pixels
		 * @param {number} dMax Maximum deviation of the original value
		 */
		const randomness = (x, pullRandom = true) => {
			if (options.random && pullRandom) {
				// Deviate around dMax (- or +), so normalize between -1 and 1
				return x + ((Math.random() - 0.5) * 2) * options.deviation;
			} else {
				return x
			}
		}

		let timePerStep = options.duration / stepCount;

		const calcNext = (step) => {
			/**
			 * From and to values given in clientX, clientY format
			 * 
			 *				 --          -
			 *				 - -         -
			 *				 -  -        -
			 *   yDifference -   -       -   lDifference
			 *				 -    -      -
			 *				 -     -     -
			 *				 -      -    -
			 *				 ---------   -
			 *				    xDifference
			 */
			let pullRandom = step != 0 || step != stepCount;

			let clientX = randomness(fromX + step * (xDifference / stepCount), pullRandom)
			let clientY = randomness(fromY + step * (yDifference / stepCount), pullRandom)
			let screenX = randomness(clientX + window.scrollX, pullRandom)
			let screenY = randomness(clientY + window.scrollY, pullRandom)

			let evt = getMouseEvent("mousemove", screenX, screenY, clientX, clientY);
			dispatchEvent(document.body, evt);

			setTimeout(() => {
				if (step < stepCount) {
					calcNext(step + 1)
				}
			}, timePerStep)
		}
		calcNext(0)
	}
}

function getNumberIn(x, y) {
	let difference = y - x;
	return x + (Math.random() * difference);
}

function dispatchEvent(el, evt) {
	if (el.dispatchEvent) {
		el.dispatchEvent(evt)
	} else if (el.fireEvent) {
		el.fireEvent('on' + type, evt)
	}
	return evt;
}

function getMouseEvent(type, screenX, screenY, clientX, clientY, e = {}) {
	var evt;
	e = Object.assign({
		bubbles: true,
		cancelable: type != 'mousemove',
		view: window,
		detail: 0,
		screenX: screenX,
		screenY: screenY,
		clientX: clientX,
		clientY: clientY,
		ctrlKey: false,
		altKey: false,
		shiftKey: false,
		metaKey: false,
		button: 0,
		relatedTarget: undefined,
	}, e)
	if (typeof document.createEvent == 'function') {
		evt = new MouseEvent(type, e);
	} else if (document.createEventObject) {
		evt = document.createEventObject()
		for (prop in e) {
			evt[prop] = e[prop]
		}
		evt.button = {
			0: 1,
			1: 4,
			2: 2,
		} [evt.button] || evt.button
	}
	return evt
}

export default Simulation;