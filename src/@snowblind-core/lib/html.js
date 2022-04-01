import { Snowblind } from "./snowblind.js";
import { ValueBinder, NodeInsertAfter, } from "./shared-internals.js";
import { SnowblindElement } from "./element.js";
import { MATCH_INDEX } from "./types.js";
function isInstance(el, type, mode = "or") {
    type = [type].flat(1);
    let map = type.map((x) => el instanceof x);
    return (mode == "or" ? map.indexOf(true) > -1 : map.indexOf(false) == -1);
}
function insertText(elem, text) {
    var textElement = document.createTextNode(text);
    elem.appendChild(textElement);
    return textElement;
}
function html(strings, ...vars) {
    var result = "", i = 0;
    for (const str of strings) {
        result +=
            str + (strings[strings.length - 1] === str ? "" : `{{${i++}}}`);
    }
    const template = document.createElement("template");
    result = result.replace(/<([A-z0-9]+)(.*?)\/>(?: |$|<[A-z]|\n)/g, "<$1 $2></$1>");
    template.innerHTML = result;
    if (template.content.children.length > 1) {
        throw new Error("Multiple elements must be wrapped in a single element.");
    }
    var walker = document.createTreeWalker(template.content, 1, null);
    let node;
    let foundInputs = 0;
    while ((node = walker.nextNode()) !== null) {
        const element = new SnowblindElement(node, vars, walker);
        node = element.node;
        if (isInstance(node, [HTMLTextAreaElement, HTMLInputElement])) {
            if (!node.hasAttribute("key")) {
                node.setAttribute("key", "input-" + foundInputs);
                foundInputs++;
            }
        }
        var lastItem;
        var childNodes = Array.from(node.childNodes);
        for (const children of childNodes) {
            if (children.nodeType === Node.TEXT_NODE) {
                var innerText = children.textContent;
                const matchArray = Array.from(innerText.matchAll(MATCH_INDEX));
                innerText = innerText.replace(MATCH_INDEX, (i) => {
                    return " ".repeat(i.length);
                });
                if (matchArray.length > 0) {
                    children.textContent = "";
                }
                var lastOffsetIndex = 0;
                for (let i = 0; i < matchArray.length; i++) {
                    const match = matchArray[i];
                    var index = parseInt(match[1]);
                    var value = vars[index];
                    var insertBefore = innerText.substring(lastOffsetIndex, match.index);
                    if (insertBefore !== "") {
                        lastItem = insertText(node, insertBefore);
                    }
                    const appendItem = (value) => {
                        if (isInstance(value, [HTMLElement, SVGElement, Text])) {
                            NodeInsertAfter(value, lastItem);
                            lastItem = value;
                        }
                        else if (Array.isArray(value)) {
                            value
                                .slice()
                                .map((x) => appendItem(x));
                        }
                        else {
                            if (value !== Object(value) ||
                                isInstance(value, ValueBinder)) {
                                lastItem = insertText(node, value);
                            }
                            else {
                                console.error("Only instances of HTMLElement, SVGElement, Text or Array are supported.");
                            }
                        }
                    };
                    appendItem(value);
                    if (i == matchArray.length - 1) {
                        children.remove();
                        var insertAfter = innerText.substring(match.index + match[0].length);
                        if (insertAfter != "") {
                            insertText(node, insertAfter);
                        }
                    }
                    lastOffsetIndex = match.index + value && value.length;
                }
            }
        }
    }
    const child = template.content.children[0];
    Snowblind.renderAllIn(child);
    return child;
}
export { html };
//# sourceMappingURL=html.js.map