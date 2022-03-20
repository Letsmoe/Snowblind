function styled(snowblindComponent, themingFunction) {
	const theme = snowblindComponent.hasOwnProperty("getTheme") ? getTheme() : null
	var newCSS = {}
	class ThemedComponent extends snowblindComponent {
		constructor(...args) {
			if (args.length == 0) {
				super({}, {hasTheme: newCSS})
			} else {
				super(...args, {hasTheme: newCSS})
			}
		}
	}

	function eachRecursive(obj, lastName) {
		const assignObj = {};
		for (var k in obj) {
			if (typeof obj[k] == "object" && obj[k] !== null)
				assignObj[k.replace(/\&/g, lastName)] = eachRecursive(obj[k], k);
			else
				assignObj[k] = obj[k]
		}
		return assignObj
	}

	const newTheme = themingFunction(theme);
	newCSS = eachRecursive(newTheme)

	return ThemedComponent
}

function createTheme(themeObj) {
	
}