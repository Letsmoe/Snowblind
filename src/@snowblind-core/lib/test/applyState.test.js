import { Snowblind, applyState } from "../../dist/snowblind.min.js";
const ws = {
    identifier: null,
    socket: null
};
function App() {
    const [results, updateResults] = applyState([]);
    return () => (Snowblind.make("div", null,
        Snowblind.make("h1", null, "Snowblind Testing Viewer"),
        Snowblind.make(RefreshButton, null),
        Snowblind.make(Results, { results: results })));
}
function Result(props) {
    const data = props.data;
    return () => (Snowblind.make("div", null,
        Snowblind.make("h2", null, data)));
}
function Results(props) {
    return () => (Snowblind.make("div", null,
        Snowblind.make("h2", null, "Results"),
        Object.values(props.results).map((result) => {
            return Snowblind.make(Result, { data: result });
        })));
}
function pullResults() {
    ws.socket.send(JSON.stringify({
        protocol: "refresh",
        identifier: ws.identifier,
    }));
}
function RefreshButton() {
    return () => (Snowblind.make("button", { onClick: pullResults }, "Refresh"));
}
Snowblind.render(document.body, Snowblind.make(App, null));
//# sourceMappingURL=applyState.test.js.map