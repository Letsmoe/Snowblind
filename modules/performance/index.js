import {startPerformanceMeasurement, stopPerformanceMeasurement} from "./performance-measurements.js"

const Perf = {
	start: startPerformanceMeasurement,
	stop: stopPerformanceMeasurement
}

export {Perf}