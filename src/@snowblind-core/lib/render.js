import { UpdateDispatcher } from "./shared-internals";
function render(parent, element) {
    UpdateDispatcher.next(element);
    let rendered = element.render();
    parent.appendChild(rendered);
    element.didUpdate();
    return rendered;
}
export { render };
//# sourceMappingURL=render.js.map