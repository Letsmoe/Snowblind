import { Snowblind } from "@snowblind/core";
function App() {
    return () => Snowblind.make("div", null);
}
Snowblind.render(document.body, Snowblind.make(App, null));
export { App };
