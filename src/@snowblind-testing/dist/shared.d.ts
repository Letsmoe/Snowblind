import { SocketServer } from "./server/websocket.js";
declare function updateStats(): void;
declare const shared: {
    server: SocketServer;
    stats: any[];
    root: string;
    paths: string[];
};
export { updateStats, shared };
//# sourceMappingURL=shared.d.ts.map