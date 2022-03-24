import {html} from "../../src/html.js";
import {propTypes} from "../../modules/typecheck.js";
import {SIZES} from "../defaults.js";
import { forwardRef } from "../../modules/hooks/index.js";

const Space = forwardRef((props, ref) => {
	/*
	*sx=${[(theme) => {
		const width = theme.fn.size({size: w, sizes: theme.spacing})
		const height = theme.fn.size({size: h, sizes: theme.spacing})

		return {width, height, minWidth, minHeight}
	}]}*/
	return () => html`<span ref=${ref}></span>`
})

Space.propTypes = {
	h: propTypes.oneOf(SIZES),
	w: propTypes.or(propTypes.oneOf(SIZES), propTypes.Number)
}

Space.defaultProps = {
	h: "md",
	w: "md",
}

window.expose({Space})

export {Space}