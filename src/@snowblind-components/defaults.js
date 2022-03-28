import {Snowblind} from "../ts-out/src/snowblind.js"

export const SIZES = ["xs", "sm", "md", "lg", "xl"];

const [obj, themeContext] = Snowblind.createContext({
	fn: {
		size: (obj) => {
			if (obj.sizes.hasOwnProperty(obj.size)) {
				return obj.sizes[obj.size];
			} else {
				return obj.size
			}
		},
		linearGradient: (angle, ...colors) => {
			return `linear-gradient(${angle}deg, ${colors.map((x,i) => `${x} ${i / colors.length * 100}%`).join(", ")})`
		},
		lighten: (color, alpha) => {
			return modifyColor(color, (x) => x + (255 - x) * alpha)
		},
		darken: function(color, alpha) {
			return modifyColor(color, (x) => x - (255 - x) * alpha)
		},
		rgba: function(hex, alpha = 1) {
			return transformColor(hex, alpha);
		}
	},
	spacing: {
		"xl": "32px",
		"lg": "24px",
		"md": "16px",
		"sm": "8px",
		"xs": "4px"
	},
	defaultRadius: {
		"xl": "32px",
		"lg": "24px",
		"md": "16px",
		"sm": "8px",
		"xs": "4px"
	},
	primaryColor: "#333",
	fontFamily: "Roboto, Helvetica, sans-serif",
	lineHeight: "20px",
	transitionTimingFunction: "ease",
	fontFamilyMonospace: "monospace",
	fontSizes: {
		"xl": "72px",
		"lg": "54px",
		"md": "32px",
		"sm": "18px",
		"xs": "14px"
	}
});
export {
	themeContext
}


/**
 * Convert a hex string to a css-rgb color
 * @param {String} hex A hex string consisting of a hash followed by 6 hex letters.
 * @returns {String} The hex value converted to an rgb value in the css-rgb format.
 */
function transformColor(hex, alpha) {
	let span = document.createElement("span");
	span.style.color = hex;
	let [r, g, b, a] = getRgbComponents(span.style.color);
	return `rgba(${r}, ${g}, ${b}, ${alpha || a || 1})`;
}

function modifyColor(color, modifier = (x) => x) {
	color = transformColor(color)
	let [r, g, b, a] = getRgbComponents(color);
	return `rgba(${modifier(r)}, ${modifier(g)}, ${modifier(b)}, ${a || 1})`;
}

function getRgbComponents(str) {
	// Match all `rgb(1,2,3)` and `rgba(1,2,3,0.1)` strings and write them to their individual components.
	let match = str.match(/rgba?\([ ]*?([\d]+)[ ]*?,[ ]*?([\d]+)[ ]*?,[ ]*?([\d]+)[ ]*?(?:(?=,),[ ]*?([.\d]+)[ ]*?\)|\))/);
	let r = parseInt(match[1])
	let g = parseInt(match[2])
	let b = parseInt(match[3])
	let a = parseFloat(match[4])
	return [r,g,b,a]
}