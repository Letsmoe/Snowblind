import { Component } from "./component";
import { UpdateDispatcher } from "./shared-internals";
function render(parent, element) {
    if (element instanceof Component) {
        UpdateDispatcher.next(element);
        let rendered = element.render();
        parent.appendChild(rendered);
        element.didUpdate();
        return rendered;
    }
    else {
        parent.appendChild(element);
        return element;
    }
}
export { render };
//# sourceMappingURL=render.js.map