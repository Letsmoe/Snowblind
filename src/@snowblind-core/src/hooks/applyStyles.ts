function applyStyles(styles: { [key: string]: string | {} }): {
	[key: string]: string;
} {
	const makeRandomID = (length: number) => {
		var result = "";
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			);
		}
		return result;
	};

	// Add the styles to a global stylesheet
	let styleElement = document.createElement("style");
	document.head.appendChild(styleElement)
	let sheet = styleElement.sheet;
	let parentName = "";
	let currentItem: any;
	const readMap = {}

	const recurse = (styles: { [key: string]: string | {} }) => {
		for (const key in styles) {
			let value = styles[key];
			if (value === null) {
				currentItem.style[key] = "none";
			} else if (typeof value === "number") {
				currentItem.style[key] = value + "px";
			} else if (typeof value === "string") {
				currentItem.style[key] = value;
			} else {
				if (key.indexOf("&") > -1) {
					let correctKey = key.replace(/&/g, parentName)
					sheet.insertRule(`.${correctKey} {}`, 0);
					parentName = correctKey;
				} else {
					const id = makeRandomID(10);
					sheet.insertRule(`.${id} {}`, 0);
					parentName = id;
					readMap[key] = id;
				}
				currentItem = sheet.cssRules[0];
				recurse((value as {}));
			}
		}
	}
	recurse(styles);
	// Return a map from the human readable name to a randomly generated class name.
	return readMap;
}

export {applyStyles}