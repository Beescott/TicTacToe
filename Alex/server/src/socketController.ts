import { SocketEvent } from './constants';

export class SocketController {
    private socketHandler: SocketIO.Server;

    constructor(handler: SocketIO.Server) {
        this.socketHandler = handler;
        this.listen();
    }

    private listen() {
        this.socketHandler.on(SocketEvent.CONNECT, (socket: any) => {
            console.log("New player connected!");

        });
    }
}