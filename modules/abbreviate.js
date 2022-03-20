(() => {
	String.prototype.replaceBetween = function (start, end, what) {
		return this.substring(0, start) + what + this.substring(end);
	};

	var _SnowblindAbbreviate = {
		abb(string, asString = true) {
			const specialChars = {
				">": () => {
					var parent = stack.shift(),
						child = stack.shift();
					parent.appendChild(child);
					stack.unshift(child)
				}, // Child
				"*": () => {
					var el = stack.shift(),
						count = stack.shift();

					const checkReplacements = (node, i) => {
						var Matches = []
						for (const j of Array.from(node.attributes)) {
							if ((Matches = Array.from(j.nodeValue.matchAll(/(?<!\\)\$+/g))).length > 0) {
								for (const Match of Matches) {
									var Padded = String(count - i + 1).padStart(Match[0].length, 0)
									node.setAttribute(j.nodeName, j.nodeValue.replaceBetween(Match.index, Match.index + Padded.length, Padded))
								}
							}
						}
					}
					for (let i = 0; i < count; i++) {
						var lastNode = el.cloneNode(true)
						lastNode.insertAfter(el)
						checkReplacements(lastNode, i)
					}
					el.remove()
					stack.unshift(lastNode)
				}, // Create Multiple
				"+": () => {
					var first = stack.shift(),
						last = stack.shift();
					last.insertAfter(first);
					stack.unshift(last)
				}, // Sibling
				"^": () => {
					var first = stack.shift(),
						last = stack.shift();
					last.insertAfter(first.parentElement);
					stack.unshift(last)
				}, // Go to parent
				"#": () => {
					var el = stack.shift();
					el.setAttribute("id", stack.shift())
					stack.unshift(el)
				}, // Add ID
				".": () => {
					var el = stack.shift();
					el.className = stack.shift()
					stack.unshift(el)
				}
			}
			/**
			 * () -> Grouping,
			 * {} -> Inner Value
			 * [] -> Custom Attribute string
			 */
			const bracketChars = {
				"(": ")",
				"[": "]",
				"{": "}",
			}

			const terminatingBrackets = {
				")": "(",
				"}": "{",
				"]": "["
			}
			const _string = string.trim();
			var isEscaped = false,
				elementName = "",
				stack = [],
				transforms = [],
				currentElement;
			var bracketContent = ""
			var inBrackets = false; // Assign the bracket type on change
			var lastOperator = "",
				container = document.createElement("div"),
				ifFirstInsertion = true;
			const makeElement = () => {
				currentElement = document.createElement(elementName)
				if (ifFirstInsertion) {
					container.appendChild(currentElement)
				}
				stack.push(currentElement)
			}
			const TestRegExp = new RegExp(/[0-9A-Za-zÀ-ÖØ-öø-ÿ$]+/) // Ignore ^ [] / ...
			for (let i = 0; i < _string.length + 1; i++) {
				const char = _string[i];
				// Check if char is an operator, else take it as part of string or nodename
				if (char === "\\") {
					isEscaped = !isEscaped
					continue
				}

				if (["*", "#", "."].indexOf(lastOperator) === -1) {
					const isPartOfTag = TestRegExp.test(char)
					if ((!isPartOfTag || char === undefined) && elementName) {
						makeElement();
						elementName = ""
					}
				}

				if ((specialChars[char] && !inBrackets) || char === undefined) {
					if (lastOperator === "*") {
						stack.push(parseInt(elementName))
						elementName = ""
					} else if ([".", "#"].indexOf(lastOperator) !== -1) {
						stack.push(elementName)
						elementName = ""
					}
					if (specialChars[char]) {
						transforms.push(specialChars[char])
					}
					lastOperator = char
					continue
				}

				if (bracketChars[char]) {
					inBrackets = bracketChars[char]
					continue
				} else if (terminatingBrackets[char]) {
					if (inBrackets === "}") {
						currentElement.innerText = bracketContent
					} else if (inBrackets === "]") {
						const toObject = Array.from(bracketContent.matchAll(/(.*?)=(?:(?=("|'))\2(.*?)\2|(.*?)(?: |$))/g)).map(x => [x[1].trim(), x[3] || x[4]])
						for (const i of toObject) {
							currentElement.setAttribute(i[0], i[1])
						}
					} else if (inBrackets === ")") {
						stack.push(this.abb(bracketContent, false)[0])
					}
					bracketContent = ""
					inBrackets = false
					continue
				} else if (inBrackets) {
					bracketContent += char
					continue
				}
				elementName += char;
			}
			transforms.map(x => x())
			const findParent = (e) => {
				if (e.parentElement) return findParent(e.parentElement)
				else return e;
			}
			return stack.map(x => {
				if (asString) return findParent(x).innerHTML
				else return findParent(x).children[0]
			})
		},

		ObjectCreate({tag, attributesList}) {
			var elem = document.createElement(arguments[0]);
			attributesList = arguments[1];
			for (const attr in attributesList) {
				var attributeValue = "";
				if (typeof attributesList[attr] === "object") {
					for (const subAttr in attributesList[attr]) {
						attributeValue += `${subAttr}:${attributesList[attr][subAttr]}`
					}
				}
				elem.setAttribute(attr, attributeValue || attributesList[attr]);
			}
			return elem.outerHTML
		}
	};
	if (window && window.Snowblind) {
		window.Snowblind = Object.assign(window.Snowblind, _SnowblindAbbreviate)
	} else {
		window.Snowblind = _SnowblindAbbreviate
	}
})();
