function classMap(classes) {
	var classNames = []
	for (const key in classes) {
		const evaluationProperty = classes[key];
		if (evaluationProperty) {
			classNames.push(key)
		}
	}
	return classNames.join(" ").trim();
}

export {classMap}