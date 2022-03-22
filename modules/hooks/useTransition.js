import {
	UpdateDispatcher
} from "/src/shared-internals.js";

function useTransition(obj, options) {
	UpdateDispatcher.subscribe((component) => {
		/**
		 * Animates the render cycle given CSS properties
		 */
		options = Object.assign({
			delay: 0,
			duration: 400,
			maxCopies: Infinity,
			timingFunction: (t, b, c, d) => {
				// Default easeInOutSine function
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			}
		}, options)
		component._maxCopies = options.maxCopies;
		component._usesTransition = true;
		const animateChange = (from, to, nodes) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					const startTime = performance.now()
					const matchRegExp = new RegExp(/([0-9.-]+)([A-z%]+)?/g)
					const convert = (i) => [undefined, null].indexOf(i) == -1 && i.toString().matchAll(matchRegExp);
					const interval = (lastExpectedCycle) => {
						const elapsed = performance.now() - startTime;
						if (elapsed >= options.duration) {
							/**
							 * Run one last time to clear lastly updated properties
							 */
							if (!lastExpectedCycle) {
								requestAnimationFrame(() => {
									interval(true)
								})
							}
							resolve()
						} else {
							requestAnimationFrame(() => {
								interval(false)
							})
						}
						for (const i in to) {
							var end = Array.from(convert(to[i]));
							if ([undefined, null].indexOf(from[i]) == -1) {
								var j = 0;
								var replaced = from[i].toString().replace(matchRegExp, (x, num, unit) => {
									num = parseFloat(num)
									var _to = parseFloat(end[j][1])
									j++
									var standardUnit = (["color", "background", "background-color"].indexOf(i) === -1) ? "px" : ""
									return options.timingFunction(elapsed, num, _to - num, options.duration).toString() + (unit || end[j - 1][2] || standardUnit)
								})
								for (const node of nodes) {
									node[0].style[i] = replaced
									if (lastExpectedCycle) {
										node[0].style[i] = to[i]
									}
								}
							}
						}
					}
					requestAnimationFrame(() => {
						interval(false)
					})
				}, options.delay)
			})
		}
		component.transitionFunction = {
			from: (callback) => {
				for (const i in obj.from) {
					component.Node.style[i] = obj.from[i];
				}
				callback()
			},
			render: (callback) => {
				animateChange(obj.render, obj.enter, component.Node).then(callback)
			},
			enter: (callback) => {
				animateChange(obj.from, obj.enter, component.Node).then(callback)
			},
			leave: (callback) => {
				animateChange(obj.enter, obj.leave, component.Node).then(callback)
			}
		}
	})
}

export {useTransition};