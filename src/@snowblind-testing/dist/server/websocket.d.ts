import { WebSocketServer, WebSocket } from "ws";
interface CustomWebSocket extends WebSocket {
    didReadInitials: boolean;
    _messageCapture: {
        id: string;
        callback: (id: string, data: string) => void;
    };
}
declare class SocketServer {
    port: number;
    private listeners;
    server: WebSocketServer;
    rooms: any[];
    connected: Map<CustomWebSocket, boolean>;
    constructor(port?: number, listeners?: Array<[string, Function]>);
    on(eventName: string, callback: Function): void;
    emit(data: object | string): void;
    _capture(socket: CustomWebSocket, eventID: string): Promise<unknown>;
    emitSingle(socket: CustomWebSocket, data: object | string): Promise<unknown>;
    getSockets(): CustomWebSocket[];
    _run(eventName: string, data: any): void;
    _connect(ws: CustomWebSocket): void;
}
export { SocketServer };
/**
 * eventLoop.onFilesDidChange(() => {
            [...this.connected.keys()].forEach((client) => {
                client.send(JSON.stringify({ command: "RELOAD" }));
            });
        });
 */ 
//# sourceMappingURL=websocket.d.ts.map