import {html} from "../../src/html.js";
import {propTypes} from "../../modules/typecheck.js";
import {SIZES, themeContext} from "../defaults.js";
import { forwardRef, useContext } from "../../modules/hooks/index.js";

const Space = forwardRef((props, ref) => {
	const theme = useContext(themeContext);
	
	return () => {
		const width = theme.fn.size({size: props.w, sizes: theme.spacing})
		const height = theme.fn.size({size: props.h, sizes: theme.spacing})
		const display = "inline-block";

		return html`<span ref=${ref} sx=${{width, height, display}}></span>`
	}
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