import { WebSocketServer, WebSocket } from "ws";
declare class SocketServer {
    port: number;
    connected: Map<WebSocket, boolean>;
    private listeners;
    server: WebSocketServer;
    constructor(port?: number, connected?: Map<WebSocket, boolean>, listeners?: Array<[string, Function]>);
    on(eventName: string, callback: Function): void;
    send(data: string): void;
    getSockets(): WebSocket[];
    _run(eventName: string, data: any): void;
    _establishConnection(ws: WebSocket): void;
}
export { SocketServer };
//# sourceMappingURL=websocket.d.ts.map